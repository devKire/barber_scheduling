'use server';

import { AppointmentStatus, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getAvailableSlots, hasAppointmentConflict } from '@/lib/availability';
import { prisma } from '@/lib/prisma';
import type { ActionResult, BookingSlot } from '@/lib/types';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getStrings(formData: FormData, key: string) {
  return formData.getAll(key).filter((value): value is string => {
    return typeof value === 'string' && value.length > 0;
  });
}

export async function getSlotsAction(input: {
  barberId: string;
  serviceIds: string[];
  date: string;
}): Promise<ActionResult<BookingSlot[]>> {
  if (!input.barberId || input.serviceIds.length === 0 || !input.date) {
    return { ok: true, data: [] };
  }

  const slots = await getAvailableSlots(input);
  return { ok: true, data: slots };
}

export async function createBookingAction(
  _previousState: ActionResult<{ whatsappUrl: string }>,
  formData: FormData
): Promise<ActionResult<{ whatsappUrl: string }>> {
  const customerName = getString(formData, 'customerName');
  const customerPhone = getString(formData, 'customerPhone');
  const barberId = getString(formData, 'barberId');
  const startsAtValue = getString(formData, 'startsAt');
  const serviceIds = getStrings(formData, 'serviceIds');
  const productIds = getStrings(formData, 'productIds');

  const fieldErrors: Record<string, string[]> = {};

  if (customerName.length < 3) {
    fieldErrors.customerName = ['Informe o nome completo.'];
  }

  if (customerPhone.replace(/\D/g, '').length < 10) {
    fieldErrors.customerPhone = ['Informe um WhatsApp válido.'];
  }

  if (!barberId) {
    fieldErrors.barberId = ['Escolha um barbeiro.'];
  }

  if (serviceIds.length === 0) {
    fieldErrors.serviceIds = ['Escolha ao menos um serviço.'];
  }

  if (!startsAtValue) {
    fieldErrors.startsAt = ['Escolha um horário disponível.'];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: 'Revise os campos destacados.', fieldErrors };
  }

  const startsAt = new Date(startsAtValue);

  if (Number.isNaN(startsAt.getTime())) {
    return { ok: false, error: 'Horário inválido.' };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const [barber, services, products] = await Promise.all([
        tx.barber.findFirst({ where: { id: barberId, isActive: true } }),
        tx.service.findMany({
          where: { id: { in: serviceIds }, isActive: true },
          orderBy: { name: 'asc' },
        }),
        tx.product.findMany({
          where: { id: { in: productIds }, isActive: true },
          orderBy: { name: 'asc' },
        }),
      ]);

      if (!barber || services.length !== serviceIds.length) {
        return { ok: false as const, error: 'Seleção indisponível.' };
      }

      const duration = services.reduce(
        (total, service) => total + service.duration,
        0
      );
      const endsAt = new Date(startsAt.getTime() + duration * 60_000);
      const hasConflict = await hasAppointmentConflict({
        tx,
        barberId,
        startsAt,
        endsAt,
      });

      if (hasConflict) {
        return {
          ok: false as const,
          error: 'Este horário acabou de ser reservado.',
        };
      }

      const servicesTotal = services.reduce(
        (total, service) => total + Number(service.price),
        0
      );
      const productsTotal = products.reduce(
        (total, product) => total + Number(product.price),
        0
      );
      const totalPrice = new Prisma.Decimal(servicesTotal + productsTotal);

      const appointment = await tx.appointment.create({
        data: {
          customerName,
          customerPhone,
          barberId,
          startTime: startsAt,
          endTime: endsAt,
          totalPrice,
          status: AppointmentStatus.PENDING,
          services: {
            create: services.map((service) => ({
              serviceId: service.id,
              priceAtTime: service.price,
            })),
          },
          products: {
            create: products.map((product) => ({
              productId: product.id,
              quantity: 1,
              priceAtTime: product.price,
            })),
          },
        },
        include: {
          barber: true,
          services: { include: { service: true } },
          products: { include: { product: true } },
        },
      });

      return { ok: true as const, appointment };
    });

    if (!result.ok) {
      return result;
    }

    revalidatePath('/');
    revalidatePath('/book');
    revalidatePath('/admin');
    revalidatePath('/admin/appointments');

    const serviceNames = result.appointment.services
      .map((item) => item.service.name)
      .join(', ');
    const productNames = result.appointment.products
      .map((item) => `${item.product.name} (${item.quantity})`)
      .join(', ');
    const message = [
      'Olá! Quero confirmar meu agendamento:',
      `Nome: ${result.appointment.customerName}`,
      `Barbeiro: ${result.appointment.barber.name}`,
      `Serviços: ${serviceNames}`,
      productNames ? `Extras: ${productNames}` : '',
      `Data: ${result.appointment.startTime.toLocaleString('pt-BR')}`,
      `Total: R$ ${Number(result.appointment.totalPrice).toFixed(2)}`,
    ]
      .filter(Boolean)
      .join('\n');

    return {
      ok: true,
      message:
        'Agendamento criado. Envie a mensagem pelo WhatsApp para finalizar.',
      data: {
        whatsappUrl: `https://wa.me/?text=${encodeURIComponent(message)}`,
      },
    };
  } catch {
    return { ok: false, error: 'Não foi possível criar o agendamento.' };
  }
}
