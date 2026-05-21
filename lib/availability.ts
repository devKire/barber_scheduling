import { AppointmentStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  addMinutes,
  formatTime,
  parseLocalDate,
  setTimeOnDate,
} from '@/lib/dates';
import type { BookingSlot } from '@/lib/types';

const BLOCKING_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.PENDING,
  AppointmentStatus.CONFIRMED,
];

export async function getServicesDuration(serviceIds: string[]) {
  if (serviceIds.length === 0) {
    return 0;
  }

  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds }, isActive: true },
    select: { duration: true },
  });

  return services.reduce((total, service) => total + service.duration, 0);
}

export function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && endA > startB;
}

export async function getAvailableSlots({
  barberId,
  serviceIds,
  date,
}: {
  barberId: string;
  serviceIds: string[];
  date: string;
}): Promise<BookingSlot[]> {
  const duration = await getServicesDuration(serviceIds);

  if (!barberId || duration <= 0) {
    return [];
  }

  const selectedDate = parseLocalDate(date);
  const dayOfWeek = selectedDate.getDay();

  const availability = await prisma.availability.findUnique({
    where: { barberId_dayOfWeek: { barberId, dayOfWeek } },
  });

  if (!availability) {
    return [];
  }

  const windowStart = setTimeOnDate(selectedDate, availability.startTime);
  const windowEnd = setTimeOnDate(selectedDate, availability.endTime);
  const dayStart = new Date(selectedDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(selectedDate);
  dayEnd.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      barberId,
      status: { in: BLOCKING_STATUSES },
      startTime: { lte: dayEnd },
      endTime: { gte: dayStart },
    },
    select: { startTime: true, endTime: true },
  });

  const slots: BookingSlot[] = [];
  const now = new Date();

  for (
    let startsAt = new Date(windowStart);
    addMinutes(startsAt, duration) <= windowEnd;
    startsAt = addMinutes(startsAt, 30)
  ) {
    const endsAt = addMinutes(startsAt, duration);

    if (startsAt <= now) {
      continue;
    }

    const hasConflict = appointments.some((appointment) =>
      overlaps(startsAt, endsAt, appointment.startTime, appointment.endTime)
    );

    if (!hasConflict) {
      slots.push({
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        label: formatTime(startsAt),
      });
    }
  }

  return slots;
}

export async function hasAppointmentConflict({
  tx = prisma,
  barberId,
  startsAt,
  endsAt,
}: {
  tx?: Prisma.TransactionClient | typeof prisma;
  barberId: string;
  startsAt: Date;
  endsAt: Date;
}) {
  const conflict = await tx.appointment.findFirst({
    where: {
      barberId,
      status: { in: BLOCKING_STATUSES },
      startTime: { lt: endsAt },
      endTime: { gt: startsAt },
    },
    select: { id: true },
  });

  return Boolean(conflict);
}
