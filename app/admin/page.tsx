import { AppointmentStatus } from '@prisma/client';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/admin/status-badge';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/money';
import { formatDateTime } from '@/lib/dates';

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [todayCount, pendingCount, barberCount, serviceCount, appointments] =
    await Promise.all([
      prisma.appointment.count({
        where: { startTime: { gte: today, lt: tomorrow } },
      }),
      prisma.appointment.count({
        where: { status: AppointmentStatus.PENDING },
      }),
      prisma.barber.count({ where: { isActive: true } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.appointment.findMany({
        where: { startTime: { gte: today } },
        include: { barber: true },
        orderBy: { startTime: 'asc' },
        take: 6,
      }),
    ]);

  const metrics = [
    ['Hoje', todayCount],
    ['Pendentes', pendingCount],
    ['Barbeiros ativos', barberCount],
    ['Serviços ativos', serviceCount],
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <section className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
          Dashboard
        </p>
        <h1 className="font-display mt-4 text-6xl leading-none">
          Operação do dia.
        </h1>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map(([label, value]) => (
          <Card key={label.toString()} className="shadow-none">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              {label}
            </p>
            <p className="font-display mt-4 text-5xl">{value}</p>
          </Card>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-4xl">Próximos agendamentos</h2>
          <Link
            href="/admin/appointments"
            className="text-sm font-semibold uppercase tracking-[0.2em]"
          >
            Ver todos
          </Link>
        </div>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="flex flex-col gap-3 shadow-none md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{appointment.customerName}</p>
                <p className="text-sm text-neutral-600">
                  {appointment.barber.name} ·{' '}
                  {formatDateTime(appointment.startTime)} ·{' '}
                  {formatCurrency(appointment.totalPrice)}
                </p>
              </div>
              <StatusBadge status={appointment.status} />
            </Card>
          ))}
          {appointments.length === 0 ? (
            <Card className="shadow-none">Sem agendamentos futuros.</Card>
          ) : null}
        </div>
      </section>
    </main>
  );
}
