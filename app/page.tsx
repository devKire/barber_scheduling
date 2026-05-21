import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/money';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/brand/section-label';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [barbers, services] = await Promise.all([
    prisma.barber.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      take: 4,
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      take: 6,
    }),
  ]);

  return (
    <main>
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 lg:px-16">
        <div className="flex flex-col justify-between border border-neutral-900 bg-[#f8f0e3]/70 p-6 md:p-10">
          <nav className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.32em]">
            <span>Atelier Zero Barber</span>
            <Link href="/admin" className="hover:text-[#8a3d2b]">
              Admin
            </Link>
          </nav>

          <div className="py-20 md:py-28">
            <SectionLabel>Agenda editorial</SectionLabel>
            <h1 className="font-display max-w-4xl text-6xl leading-[0.9] tracking-[-0.05em] md:text-8xl lg:text-9xl">
              Corte preciso para rotinas sem ruído.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-700">
              Uma barbearia de estética silenciosa, agenda direta e serviços
              pensados como composição: forma, ritmo e acabamento.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/book">
                <Button>Iniciar agendamento</Button>
              </Link>
              <a href="#servicos">
                <Button variant="secondary">Ver serviços</Button>
              </a>
            </div>
          </div>

          <div className="grid gap-4 border-t border-neutral-900 pt-6 text-sm uppercase tracking-[0.18em] text-neutral-700 sm:grid-cols-3">
            <span>Barba</span>
            <span>Cabelo</span>
            <span>Finalização</span>
          </div>
        </div>

        <aside className="relative min-h-[520px] overflow-hidden bg-neutral-950 p-6 text-stone-50 md:min-h-0">
          <div className="absolute inset-8 border border-stone-50/30" />
          <div className="absolute -right-16 top-24 h-64 w-64 rounded-full border border-stone-50/20" />
          <div className="absolute bottom-10 left-8 max-w-xs">
            <p className="font-display text-5xl leading-none">
              Monocle cut / quiet ritual
            </p>
            <p className="mt-6 text-sm leading-6 text-stone-300">
              Agende em minutos, escolha seu barbeiro e receba o resumo pronto
              para WhatsApp.
            </p>
          </div>
        </aside>
      </section>

      <section
        id="servicos"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16"
      >
        <SectionLabel>Catálogo</SectionLabel>
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-5xl leading-none tracking-[-0.04em] md:text-7xl">
            Serviços com preço claro e tempo reservado.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.length === 0 ? (
              <Card className="sm:col-span-2">
                Cadastre serviços no painel administrativo para liberar a
                agenda.
              </Card>
            ) : (
              services.map((service) => (
                <Card key={service.id} className="shadow-none">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a3d2b]">
                    {service.duration} min
                  </p>
                  <h3 className="font-display mt-5 text-3xl">{service.name}</h3>
                  {service.description ? (
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {service.description}
                    </p>
                  ) : null}
                  <p className="mt-6 text-lg font-semibold">
                    {formatCurrency(service.price)}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
        <SectionLabel>Barbeiros</SectionLabel>
        <div className="grid gap-4 md:grid-cols-4">
          {barbers.length === 0 ? (
            <Card className="md:col-span-4">
              Cadastre barbeiros ativos para iniciar os atendimentos.
            </Card>
          ) : (
            barbers.map((barber, index) => (
              <Card
                key={barber.id}
                className={index % 2 === 0 ? 'md:translate-y-8' : ''}
              >
                <div className="mb-8 aspect-[3/4] border border-neutral-300 bg-neutral-900" />
                <h3 className="font-display text-3xl">{barber.name}</h3>
                {barber.bio ? (
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {barber.bio}
                  </p>
                ) : null}
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#8a3d2b]">
                  Disponível
                </p>
              </Card>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
