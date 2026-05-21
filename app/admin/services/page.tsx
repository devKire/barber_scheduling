import { createServiceAction, updateServiceAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/money';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { name: 'asc' } });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
        Catálogo
      </p>
      <h1 className="font-display mt-4 text-6xl leading-none">Serviços.</h1>

      <Card className="mt-10 shadow-none">
        <h2 className="font-display text-3xl">Novo serviço</h2>
        <form
          action={createServiceAction}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <Input name="name" placeholder="Nome" required />
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Preço"
            required
          />
          <Input
            name="duration"
            type="number"
            placeholder="Duração em minutos"
            required
          />
          <Input name="imageUrl" placeholder="URL da imagem" />
          <Textarea
            name="description"
            placeholder="Descrição"
            className="md:col-span-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input name="isActive" type="checkbox" defaultChecked /> Ativo
          </label>
          <Button className="md:justify-self-end">Criar</Button>
        </form>
      </Card>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="shadow-none">
            <form action={updateServiceAction} className="grid gap-4">
              <input type="hidden" name="id" value={service.id} />
              <Input name="name" defaultValue={service.name} required />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={Number(service.price)}
                  required
                />
                <Input
                  name="duration"
                  type="number"
                  defaultValue={service.duration}
                  required
                />
              </div>
              <Input
                name="imageUrl"
                defaultValue={service.imageUrl ?? ''}
                placeholder="URL da imagem"
              />
              <Textarea
                name="description"
                defaultValue={service.description ?? ''}
              />
              <p className="text-sm text-neutral-600">
                Atual: {formatCurrency(service.price)}
              </p>
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={service.isActive}
                  />{' '}
                  Ativo
                </label>
                <Button variant="secondary">Salvar</Button>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </main>
  );
}
