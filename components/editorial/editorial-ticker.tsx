'use client';

import { motion, useReducedMotion } from 'framer-motion';

const districts = [
  ['Vila Madalena', '23.55°S'],
  ['Pinheiros', '46.68°W'],
  ['Jardins', '001'],
  ['Higienópolis', 'SP'],
  ['Centro', 'Nº 05'],
  ['Moema', 'AZ'],
];

const barbers = [
  ['@zero.rafa', 'corte seco'],
  ['@atelier.gus', 'barba navalha'],
  ['@linea.marc', 'degradê limpo'],
  ['@noir.dan', 'finalização'],
  ['@bone.vic', 'textura'],
  ['@silence.leo', 'ritual'],
];

function TickerRow({
  items,
  reverse = false,
}: {
  items: string[][];
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const content = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap py-1"
        animate={
          reduceMotion
            ? undefined
            : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: reverse ? 44 : 38, ease: 'linear', repeat: Infinity }
        }
      >
        {content.map(([primary, secondary], index) => (
          <span
            key={`${primary}-${index}`}
            className="inline-flex items-baseline gap-3 text-xs uppercase tracking-[0.18em] text-ink/65"
          >
            <span className="text-lg leading-none text-coral">·</span>
            <span className="font-mono text-[11px] tracking-normal text-ink/45">
              {secondary}
            </span>
            <span className="font-semibold text-ink">{primary}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function EditorialTicker() {
  return (
    <section
      className="border-y border-ink/10 bg-paper py-6"
      aria-label="Agenda editorial em movimento"
    >
      <div className="mx-auto grid max-w-[1480px] gap-5 px-5 sm:px-8 md:px-12 lg:grid-cols-[240px_1fr] lg:items-center lg:px-16 xl:px-20">
        <div className="flex items-center gap-3 border-ink/10 lg:border-r lg:pr-8">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
            Campo aberto
            <span className="block font-normal text-ink/45">
              bairros · mãos · ritmo
            </span>
          </span>
        </div>
        <div className="grid gap-2 overflow-hidden">
          <TickerRow items={districts} />
          <TickerRow items={barbers} reverse />
        </div>
      </div>
    </section>
  );
}
