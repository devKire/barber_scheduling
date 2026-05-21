const highlights = [
  'Toalhas quentes',
  'Navalha limpa',
  'Produtos sem excesso',
  'Ritmo pontual',
];

export function TestimonialsAtmosphere() {
  return (
    <section className="border-y border-ink/10 bg-ink px-5 py-24 text-paper sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-14 flex items-center justify-between border-t border-paper/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-paper/45">
          <span className="font-display text-lg italic text-coral">IV.</span>
          <span>Atmosfera / depoimento</span>
          <span>silêncio funcional</span>
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <blockquote className="font-display text-5xl italic leading-[1.02] tracking-[-0.035em] md:text-7xl">
              “Atendimento direto, corte preciso e uma agenda que parece
              desenhada para não ocupar espaço mental.”
            </blockquote>
            <p className="mt-8 text-sm uppercase tracking-[0.22em] text-paper/45">
              — Cliente regular · Atelier Zero
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item}
                  className={`p-6 ${
                    isEven
                      ? 'bg-paper text-ink border border-ink/10'
                      : 'bg-ink text-paper border border-paper/15'
                  }`}
                >
                  <span className="font-display text-3xl italic text-coral">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-8 text-lg font-semibold">{item}</p>
                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isEven ? 'text-ink/55' : 'text-paper/55'
                    }`}
                  >
                    Detalhe de atmosfera para transformar espera em presença.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
