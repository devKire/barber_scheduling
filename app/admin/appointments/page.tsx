import { AppointmentStatus } from '@prisma/client';
import {
  deleteAppointmentAction,
  updateAppointmentStatusAction,
} from '@/app/actions/admin';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { formatDateTime } from '@/lib/dates';
import { formatCurrency } from '@/lib/money';
import Link from 'next/link';

function translateAppointmentStatus(status: AppointmentStatus): string {
  const statusMap: Record<AppointmentStatus, string> = {
    [AppointmentStatus.PENDING]: 'Aguardando confirmação',
    [AppointmentStatus.CONFIRMED]: 'Confirmado',
    [AppointmentStatus.CANCELED]: 'Cancelado',
    [AppointmentStatus.COMPLETED]: 'Finalizado',
  };

  return statusMap[status] || status; // fallback para o valor original se não encontrar
}

function getWhatsappContactUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');

  if (!digits) {
    return null;
  }

  const phoneWithCountry = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
}

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      barber: true,
      services: { include: { service: true } },
      products: { include: { product: true } },
    },
    orderBy: { startTime: 'desc' },
    take: 100,
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
        Agenda
      </p>
      <h1 className="font-display mt-4 text-6xl leading-none">Agendamentos.</h1>

      <div className="mt-10 space-y-4">
        {appointments.map((appointment) => {
          const appointmentDate = formatDateTime(appointment.startTime);
          const translatedStatus = translateAppointmentStatus(
            appointment.status
          );
          const whatsappUrl = getWhatsappContactUrl(
            appointment.customerPhone,
            `Olá, ${appointment.customerName}. Referente ao seu agendamento no Atelier Zero Barber para ${appointmentDate}. Status atual: ${translatedStatus}.`
          );
          return (
            <Card key={appointment.id} className="shadow-none">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-3xl">
                      {appointment.customerName}
                    </h2>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    {appointment.customerPhone} · {appointment.barber.name} ·{' '}
                    {appointmentDate}
                  </p>
                  <p className="mt-4 text-sm">
                    Serviços:{' '}
                    {appointment.services
                      .map((item) => item.service.name)
                      .join(', ') || '—'}
                  </p>
                  <p className="mt-1 text-sm">
                    Produtos:{' '}
                    {appointment.products
                      .map((item) => item.product.name)
                      .join(', ') || '—'}
                  </p>
                  <p className="mt-4 font-semibold">
                    {formatCurrency(appointment.totalPrice)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {whatsappUrl ? (
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border-neutral-950 bg-neutral-950 text-stone-50 hover:bg-[#5b2f24] inline-flex min-h-11 items-center justify-center border px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Contatar
                    </Link>
                  ) : null}
                  {[
                    AppointmentStatus.CONFIRMED,
                    AppointmentStatus.CANCELED,
                    AppointmentStatus.COMPLETED,
                  ].map((status) => (
                    <form key={status} action={updateAppointmentStatusAction}>
                      <input type="hidden" name="id" value={appointment.id} />
                      <input type="hidden" name="status" value={status} />
                      <Button
                        variant="secondary"
                        className="min-h-0 px-3 py-2 text-xs"
                      >
                        {status === 'CONFIRMED'
                          ? 'Confirmar'
                          : status === 'CANCELED'
                            ? 'Cancelar'
                            : 'Concluir'}
                      </Button>
                    </form>
                  ))}
                  <form action={deleteAppointmentAction}>
                    <input type="hidden" name="id" value={appointment.id} />
                    <Button
                      variant="ghost"
                      className="min-h-0 px-3 py-2 text-xs"
                    >
                      Excluir
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          );
        })}
        {appointments.length === 0 ? (
          <Card className="shadow-none">Nenhum agendamento encontrado.</Card>
        ) : null}
      </div>
    </main>
  );
}
