import Image from 'next/image';
import { LinkButton } from './link-button';

const heroImage =
  'https://images.pexels.com/photos/19287848/pexels-photo-19287848.jpeg';

export function EditorialHero({
  barberCount,
  serviceCount,
}: {
  barberCount: number;
  serviceCount: number;
}) {
  return (
    <section className="relative border-b border-ink/10 px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20 xl:px-20">
      <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        {/* HERO COPY */}
        <div className="flex min-h-[620px] flex-col justify-between border border-ink/15 bg-bone/35 p-6 shadow-[0_24px_80px_rgba(21,20,15,0.08)] sm:p-8 lg:p-10">
          <div>
            <p className="mb-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-coral before:h-px before:w-7 before:bg-coral">
              Agenda editorial · Nº 01
            </p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.055em] text-ink sm:text-7xl lg:text-8xl xl:text-9xl">
              Corte preciso para rotinas{' '}
              <em className="font-display font-medium italic tracking-[-0.035em]">
                sem ruído
              </em>
              <span className="text-coral">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink/70">
              Uma barbearia de estética silenciosa, agenda direta e serviços
              pensados como composição: forma, ritmo e acabamento.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/book">Iniciar agendamento</LinkButton>
              <LinkButton href="#servicos" variant="ghost">
                Ver serviços
              </LinkButton>
            </div>
          </div>

          <div className="mt-12 border-t border-ink/15 pt-6">
            <div className="grid gap-4 text-xs uppercase tracking-[0.18em] text-ink/60 sm:grid-cols-3">
              <span>
                <b className="block text-2xl tracking-tight text-ink">
                  {barberCount || 6}
                </b>{' '}
                barbeiros
              </span>
              <span>
                <b className="block text-2xl tracking-tight text-ink">
                  {serviceCount || 12}
                </b>{' '}
                serviços
              </span>
              <span>
                <b className="block text-2xl tracking-tight text-coral">●</b>{' '}
                agenda aberta
              </span>
            </div>
            <div className="mt-8 flex flex-col justify-between gap-3 border-t border-dashed border-ink/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-ink/45 sm:flex-row">
              <span>↳ São Paulo / ritual contemporâneo</span>
              <span className="font-mono tracking-normal">
                23.5505° S · 46.6333° W
              </span>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative min-h-[560px] overflow-hidden border border-ink bg-ink text-paper lg:min-h-0">
          <Image
            src={heroImage}
            alt="Interior de barbearia com cadeira e espelho em atmosfera editorial"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
            FIG. 01 / AZ-26
          </span>
          <span className="absolute right-5 top-5 text-right text-[10px] uppercase tracking-[0.2em] text-paper/70">
            Plate Nº 001
          </span>
          <span className="absolute bottom-5 left-5 font-mono text-[10px] text-paper/70">
            SHA · BARBERIA
          </span>
          <span className="absolute bottom-5 right-5 text-right text-[10px] uppercase tracking-[0.2em] text-paper/70">
            Composed in <span className="text-coral">Atelier Zero</span>
          </span>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 border border-paper/20 bg-ink/35 p-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/70 backdrop-blur">
            <span className="block">
              <b className="mr-2 text-coral">01</b>Cortar
            </span>
            <span className="block">
              <b className="mr-2 text-coral">02</b>Modelar
            </span>
            <span className="block">
              <b className="mr-2 text-coral">03</b>Finalizar
            </span>
            <span className="block">
              <b className="mr-2 text-coral">04</b>Entregar
            </span>
          </div>
          <div className="absolute inset-6 border border-paper/25" />
        </div>
      </div>
    </section>
  );
}
