'use server';

import { AppointmentStatus, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value.length > 0 ? value : null;
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

function isValidDayOfWeek(dayOfWeek: number) {
  return Number.isInteger(dayOfWeek) && dayOfWeek >= 0 && dayOfWeek <= 6;
}

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function isStartBeforeEnd(startTime: string, endTime: string) {
  return startTime < endTime;
}

function revalidateAdmin() {
  revalidatePath('/');
  revalidatePath('/book');
  revalidatePath('/admin');
  revalidatePath('/admin/appointments');
  revalidatePath('/admin/barbers');
  revalidatePath('/admin/services');
  revalidatePath('/admin/products');
  revalidatePath('/admin/availability');
}

export async function createBarberAction(formData: FormData) {
  await requireAdmin();
  const name = text(formData, 'name');

  if (!name) {
    return;
  }

  await prisma.barber.create({
    data: {
      name,
      bio: optionalText(formData, 'bio'),
      avatarUrl: optionalText(formData, 'avatarUrl'),
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function updateBarberAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const name = text(formData, 'name');

  if (!id || !name) {
    return;
  }

  await prisma.barber.update({
    where: { id },
    data: {
      name,
      bio: optionalText(formData, 'bio'),
      avatarUrl: optionalText(formData, 'avatarUrl'),
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function deleteBarberAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');

  if (!id) {
    return;
  }

  const appointments = await prisma.appointment.count({
    where: { barberId: id },
  });

  if (appointments > 0) {
    await prisma.barber.updateMany({
      where: { id },
      data: { isActive: false },
    });
  } else {
    await prisma.barber.deleteMany({ where: { id } });
  }

  revalidateAdmin();
}

export async function createServiceAction(formData: FormData) {
  await requireAdmin();
  const name = text(formData, 'name');
  const price = Number(text(formData, 'price'));
  const duration = Number(text(formData, 'duration'));

  if (!name || !Number.isFinite(price) || !Number.isFinite(duration)) {
    return;
  }

  await prisma.service.create({
    data: {
      name,
      description: optionalText(formData, 'description'),
      imageUrl: optionalText(formData, 'imageUrl'),
      price: new Prisma.Decimal(price),
      duration,
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function updateServiceAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const name = text(formData, 'name');
  const price = Number(text(formData, 'price'));
  const duration = Number(text(formData, 'duration'));

  if (!id || !name || !Number.isFinite(price) || !Number.isFinite(duration)) {
    return;
  }

  await prisma.service.update({
    where: { id },
    data: {
      name,
      description: optionalText(formData, 'description'),
      imageUrl: optionalText(formData, 'imageUrl'),
      price: new Prisma.Decimal(price),
      duration,
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');

  if (!id) {
    return;
  }

  const appointments = await prisma.appointmentService.count({
    where: { serviceId: id },
  });

  if (appointments > 0) {
    await prisma.service.updateMany({
      where: { id },
      data: { isActive: false },
    });
  } else {
    await prisma.service.deleteMany({ where: { id } });
  }

  revalidateAdmin();
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const name = text(formData, 'name');
  const price = Number(text(formData, 'price'));

  if (!name || !Number.isFinite(price)) {
    return;
  }

  await prisma.product.create({
    data: {
      name,
      imageUrl: optionalText(formData, 'imageUrl'),
      price: new Prisma.Decimal(price),
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const name = text(formData, 'name');
  const price = Number(text(formData, 'price'));

  if (!id || !name || !Number.isFinite(price)) {
    return;
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      imageUrl: optionalText(formData, 'imageUrl'),
      price: new Prisma.Decimal(price),
      isActive: bool(formData, 'isActive'),
    },
  });
  revalidateAdmin();
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');

  if (!id) {
    return;
  }

  const appointments = await prisma.appointmentProduct.count({
    where: { productId: id },
  });

  if (appointments > 0) {
    await prisma.product.updateMany({
      where: { id },
      data: { isActive: false },
    });
  } else {
    await prisma.product.deleteMany({ where: { id } });
  }

  revalidateAdmin();
}

export async function upsertAvailabilityAction(formData: FormData) {
  await requireAdmin();
  const barberId = text(formData, 'barberId');
  const dayOfWeek = Number(text(formData, 'dayOfWeek'));
  const startTime = text(formData, 'startTime');
  const endTime = text(formData, 'endTime');

  if (
    !barberId ||
    !isValidDayOfWeek(dayOfWeek) ||
    !isValidTime(startTime) ||
    !isValidTime(endTime) ||
    !isStartBeforeEnd(startTime, endTime)
  ) {
    return;
  }

  await prisma.availability.upsert({
    where: { barberId_dayOfWeek: { barberId, dayOfWeek } },
    create: { barberId, dayOfWeek, startTime, endTime },
    update: { startTime, endTime },
  });
  revalidateAdmin();
}

export async function deleteAvailabilityAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');

  if (!id) {
    return;
  }

  await prisma.availability.deleteMany({ where: { id } });
  revalidateAdmin();
}

export async function deleteAppointmentAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');

  if (!id) {
    return;
  }

  await prisma.appointment.deleteMany({ where: { id } });
  revalidateAdmin();
}

export async function updateAppointmentStatusAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const status = text(formData, 'status') as AppointmentStatus;

  if (!id || !Object.values(AppointmentStatus).includes(status)) {
    return;
  }

  await prisma.appointment.update({ where: { id }, data: { status } });
  revalidateAdmin();
}
