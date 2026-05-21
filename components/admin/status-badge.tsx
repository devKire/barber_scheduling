import { AppointmentStatus } from '@prisma/client';

const labels: Record<AppointmentStatus, string> = {
  PENDING: 'Pendente',
  CONFIRMED: 'Confirmado',
  CANCELED: 'Cancelado',
  COMPLETED: 'Concluído',
};

const styles: Record<AppointmentStatus, string> = {
  PENDING: 'border-amber-700 text-amber-800',
  CONFIRMED: 'border-emerald-700 text-emerald-800',
  CANCELED: 'border-red-700 text-red-800',
  COMPLETED: 'border-neutral-700 text-neutral-700',
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
