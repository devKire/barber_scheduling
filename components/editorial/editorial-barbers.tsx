import Image from 'next/image';
import type { EditorialBarber } from './types';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function EditorialBarbers({ barbers }: { barbers: EditorialBarber[] }) {
  return (
    <section
      id="barbeiros"
      className="scroll-mt-28 border-y border-ink/10 bg-bone/45 px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-14 flex items-center justify-between border-t border-ink/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-ink/45">
          <span className="font-display text-lg italic text-coral">II.</span>
          <span>Barbeiros / escala</span>
          <span>Agenda aberta</span>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Mãos treinadas para acabamento limpo e presença discreta
            <span className="text-coral">.</span>
          </h2>
          <p className="max-w-md text-base leading-7 text-ink/65 lg:justify-self-end">
            Cada profissional opera como editor do seu próprio gesto: precisão,
            ritmo e uma assinatura silenciosa.
          </p>
        </div>

        {barbers.length === 0 ? (
          <div className="border border-dashed border-ink/25 bg-paper p-8 text-ink/65">
            Cadastre barbeiros ativos para iniciar os atendimentos.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {barbers.map((barber, index) => (
              <article
                key={barber.id}
                className={`group border border-ink/15 bg-paper p-5 transition hover:-translate-y-1 hover:border-ink ${index % 2 === 1 ? 'lg:translate-y-8' : ''}`}
              >
                <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-ink text-paper">
                  {barber.avatarUrl ? (
                    <Image
                      src={barber.avatarUrl}
                      alt={barber.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover opacity-90 transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-6xl italic text-paper/80">
                      {initials(barber.name)}
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Nº {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-[-0.035em]">
                  {barber.name}
                </h3>
                {barber.bio ? (
                  <p className="mt-3 text-sm leading-6 text-ink/60">
                    {barber.bio}
                  </p>
                ) : null}
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-coral/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />{' '}
                  Disponível
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
