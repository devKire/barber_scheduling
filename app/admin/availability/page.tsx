import {
  deleteAvailabilityAction,
  upsertAvailabilityAction,
} from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { dayNames } from '@/lib/dates';
import { prisma } from '@/lib/prisma';

export default async function AvailabilityPage() {
  const [barbers, availability] = await Promise.all([
    prisma.barber.findMany({ orderBy: { name: 'asc' } }),
    prisma.availability.findMany({
      include: { barber: true },
      orderBy: [{ barber: { name: 'asc' } }, { dayOfWeek: 'asc' }],
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
        Agenda semanal
      </p>
      <h1 className="font-display mt-4 text-6xl leading-none">Horários.</h1>

      <Card className="mt-10 shadow-none">
        <h2 className="font-display text-3xl">Definir disponibilidade</h2>
        <form
          action={upsertAvailabilityAction}
          className="mt-6 grid gap-4 md:grid-cols-5"
        >
          <Select name="barberId" required>
            <option value="">Barbeiro</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.name}
              </option>
            ))}
          </Select>
          <Select name="dayOfWeek" required>
            {dayNames.map((day, index) => (
              <option key={day} value={index}>
                {day}
              </option>
            ))}
          </Select>
          <Input name="startTime" type="time" required />
          <Input name="endTime" type="time" required />
          <Button>Salvar</Button>
        </form>
      </Card>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {availability.map((item) => (
          <Card
            key={item.id}
            className="flex items-center justify-between gap-4 shadow-none"
          >
            <div>
              <h2 className="font-display text-3xl">{item.barber.name}</h2>
              <p className="text-sm text-neutral-600">
                {dayNames[item.dayOfWeek]} · {item.startTime} às {item.endTime}
              </p>
            </div>
            <form action={deleteAvailabilityAction}>
              <input type="hidden" name="id" value={item.id} />
              <Button variant="secondary">Remover</Button>
            </form>
          </Card>
        ))}
        {availability.length === 0 ? (
          <Card className="shadow-none">
            Nenhuma disponibilidade configurada.
          </Card>
        ) : null}
      </div>
    </main>
  );
}
