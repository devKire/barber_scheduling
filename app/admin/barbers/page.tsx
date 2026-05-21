import {
  createBarberAction,
  deleteBarberAction,
  updateBarberAction,
} from '@/app/actions/admin';
import { AdminImageCard } from '@/components/admin/admin-image-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { prisma } from '@/lib/prisma';

export default async function BarbersPage() {
  const barbers = await prisma.barber.findMany({ orderBy: { name: 'asc' } });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
        Equipe
      </p>
      <h1 className="font-display mt-4 text-6xl leading-none">Barbeiros.</h1>

      <Card className="mt-10 shadow-none">
        <h2 className="font-display text-3xl">Novo barbeiro</h2>
        <form
          action={createBarberAction}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <Input name="name" placeholder="Nome" required />
          <Input name="avatarUrl" placeholder="URL do avatar" />
          <Textarea
            name="bio"
            placeholder="Biografia"
            className="md:col-span-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input name="isActive" type="checkbox" defaultChecked /> Ativo
          </label>
          <Button className="md:justify-self-end">Criar</Button>
        </form>
      </Card>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {barbers.map((barber) => (
          <AdminImageCard key={barber.id} imageUrl={barber.avatarUrl}>
            <form action={updateBarberAction} className="grid gap-4">
              <input type="hidden" name="id" value={barber.id} />
              <Input name="name" defaultValue={barber.name} required />
              <Input
                name="avatarUrl"
                defaultValue={barber.avatarUrl ?? ''}
                placeholder="URL do avatar"
              />
              <Textarea
                name="bio"
                defaultValue={barber.bio ?? ''}
                placeholder="Biografia"
              />
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={barber.isActive}
                  />{' '}
                  Ativo
                </label>
                <Button variant="secondary">Salvar</Button>
              </div>
            </form>
            <form
              action={deleteBarberAction}
              className="mt-4 border-t border-neutral-300 pt-4"
            >
              <input type="hidden" name="id" value={barber.id} />
              <p className="mb-3 text-xs text-neutral-600">
                Se houver agendamentos vinculados, o barbeiro será apenas
                desativado para preservar o histórico.
              </p>
              <Button variant="ghost">Remover</Button>
            </form>
          </AdminImageCard>
        ))}
      </div>
    </main>
  );
}
