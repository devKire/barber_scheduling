import { AppointmentStatus } from '@prisma/client';
import { updateAppointmentStatusAction } from '@/app/actions/admin';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { formatDateTime } from '@/lib/dates';
import { formatCurrency } from '@/lib/money';

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
        {appointments.map((appointment) => (
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
                  {formatDateTime(appointment.startTime)}
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
              </div>
            </div>
          </Card>
        ))}
        {appointments.length === 0 ? (
          <Card className="shadow-none">Nenhum agendamento encontrado.</Card>
        ) : null}
      </div>
    </main>
  );
}
