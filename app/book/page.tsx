import Link from 'next/link';
import { BookingForm } from '@/app/book/booking-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/brand/section-label';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BookPage() {
  const [barbers, services, products] = await Promise.all([
    prisma.barber.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, bio: true, avatarUrl: true },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        price: true,
        imageUrl: true,
      },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, price: true, imageUrl: true },
    }),
  ]);

  const hasBookingSetup = barbers.length > 0 && services.length > 0;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-20 lg:py-16">
      <header className="mb-14 flex items-center justify-between border-b border-neutral-950 pb-6">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.32em]"
        >
          Atelier Zero Barber
        </Link>
        <Link href="/">
          <Button variant="ghost">Voltar</Button>
        </Link>
      </header>

      {hasBookingSetup ? (
        <BookingForm
          barbers={barbers}
          services={services.map((service) => ({
            ...service,
            price: Number(service.price),
          }))}
          products={products.map((product) => ({
            ...product,
            price: Number(product.price),
          }))}
        />
      ) : (
        <Card>
          <h2 className="font-display text-4xl">Agenda ainda em montagem.</h2>
          <p className="mt-4 max-w-xl text-neutral-700">
            Cadastre ao menos um barbeiro ativo e um serviço ativo no painel
            administrativo para liberar os agendamentos públicos.
          </p>
          <Link href="/admin">
            <Button className="mt-6">Abrir admin</Button>
          </Link>
        </Card>
      )}
    </main>
  );
}
