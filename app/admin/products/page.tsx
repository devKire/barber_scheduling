import { createProductAction, updateProductAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/money';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
        Extras
      </p>
      <h1 className="font-display mt-4 text-6xl leading-none">Produtos.</h1>

      <Card className="mt-10 shadow-none">
        <h2 className="font-display text-3xl">Novo produto</h2>
        <form
          action={createProductAction}
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
          <Input name="imageUrl" placeholder="URL da imagem" />
          <label className="flex items-center gap-2 text-sm">
            <input name="isActive" type="checkbox" defaultChecked /> Ativo
          </label>
          <Button className="md:col-start-2 md:justify-self-end">Criar</Button>
        </form>
      </Card>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="shadow-none">
            <form action={updateProductAction} className="grid gap-4">
              <input type="hidden" name="id" value={product.id} />
              <Input name="name" defaultValue={product.name} required />
              <Input
                name="price"
                type="number"
                step="0.01"
                defaultValue={Number(product.price)}
                required
              />
              <Input
                name="imageUrl"
                defaultValue={product.imageUrl ?? ''}
                placeholder="URL da imagem"
              />
              <p className="text-sm text-neutral-600">
                Atual: {formatCurrency(product.price)}
              </p>
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={product.isActive}
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
