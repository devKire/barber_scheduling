const steps = [
  ['01', 'Escolher', 'Selecione serviço, barbeiro e intenção do corte.'],
  ['02', 'Agendar', 'Veja horários disponíveis e reserve em poucos toques.'],
  ['03', 'Confirmar', 'Receba o resumo pronto para WhatsApp.'],
  ['04', 'Comparecer', 'Chegue no horário e deixe o ritual acontecer.'],
];

export function MethodProcess() {
  return (
    <section
      id="metodo"
      className="scroll-mt-28 px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-14 flex items-center justify-between border-t border-ink/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-ink/45">
          <span className="font-display text-lg italic text-coral">III.</span>
          <span>Método / processo</span>
          <span>04 passos</span>
        </div>
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Do gesto inicial à cadeira: agenda como ritual sem fricção
            <span className="text-coral">.</span>
          </h2>
          <p className="max-w-md text-base leading-7 text-ink/65 lg:pt-4">
            O fluxo mantém a decisão clara, reduz espera e entrega o resumo que
            o cliente precisa antes do atendimento.
          </p>
        </div>
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:before:absolute lg:before:left-12 lg:before:right-12 lg:before:top-12 lg:before:h-px lg:before:bg-ink/10">
          {steps.map(([num, title, copy], index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={num}
                className={`relative p-2 ${
                  isEven ? 'bg-paper text-ink' : 'bg-coral text-paper'
                }`}
              >
                <span
                  className={`relative z-10 mb-8 inline-block pr-4 font-display text-7xl italic leading-none ${
                    isEven ? 'bg-paper text-coral' : 'bg-coral text-paper'
                  }`}
                >
                  {num}
                </span>
                <h3 className="mb-4 flex items-center justify-between text-3xl font-black tracking-[-0.03em]">
                  {title}
                  {num !== '04' ? (
                    <span className={isEven ? 'text-ink/25' : 'text-paper/50'}>
                      →
                    </span>
                  ) : null}
                </h3>
                <p
                  className={`text-sm leading-6 ${
                    isEven ? 'text-ink/60' : 'text-paper/80'
                  }`}
                >
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
