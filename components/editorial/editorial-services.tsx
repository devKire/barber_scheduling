import Image from 'next/image';
import Link from 'next/link';
import type { EditorialService } from './types';

export function EditorialServices({
  services,
}: {
  services: EditorialService[];
}) {
  return (
    <section
      id="servicos"
      className="scroll-mt-28 px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-14 flex items-center justify-between border-t border-ink/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-ink/45">
          <span className="font-display text-lg italic text-coral">I.</span>
          <span>Serviços / catálogo</span>
          <span>{String(services.length).padStart(2, '0')} ativos</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-coral before:h-px before:w-7 before:bg-coral">
              Catálogo editorial
            </p>
            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Serviços com preço claro e tempo reservado
              <span className="text-coral">.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-ink/65">
              Escolha o ritual, veja duração e valor antes de confirmar. Sem
              ruído, sem troca de contexto.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="border border-dashed border-ink/25 bg-bone p-8 text-ink/65">
              Cadastre serviços ativos no painel administrativo para liberar a
              agenda.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href="/book"
                  className="group relative overflow-hidden border border-ink/15 bg-bone p-6 transition hover:-translate-y-1 hover:border-ink hover:shadow-[12px_12px_0_#15140f]"
                >
                  <article>
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="font-display text-3xl italic text-coral">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="rounded-full border border-ink/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">
                        {service.durationLabel}
                      </span>
                    </div>
                    {service.imageUrl ? (
                      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-ink">
                        <Image
                          src={service.imageUrl}
                          alt={service.name}
                          fill
                          sizes="(min-width: 1024px) 28vw, 50vw"
                          className="object-cover opacity-85 transition group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-3xl font-black tracking-[-0.03em]">
                      {service.name}
                    </h3>
                    {service.description ? (
                      <p className="mt-4 text-sm leading-6 text-ink/60">
                        {service.description}
                      </p>
                    ) : null}
                    <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                      <span className="text-lg font-bold">
                        {service.priceLabel}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-coral transition group-hover:bg-coral group-hover:text-white">
                        ↗
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
