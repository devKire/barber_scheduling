import { LinkButton } from './link-button';

export function FinalCta() {
  return (
    <section
      id="contato"
      className="scroll-mt-28 px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto grid max-w-[1480px] gap-10 border border-ink bg-bone p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-12">
        <div>
          <p className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-coral before:h-px before:w-7 before:bg-coral">
            Agenda aberta
          </p>
          <h2 className="max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.055em] md:text-8xl">
            Agende seu horário<span className="text-coral">.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-7 text-ink/65">
            Escolha serviço, profissional e horário. O resumo fica pronto para
            confirmar no WhatsApp.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/book">Agendar agora</LinkButton>
            <LinkButton href="#servicos" variant="ghost">
              Rever serviços
            </LinkButton>
          </div>
        </div>
        <div className="flex min-h-[320px] flex-col justify-between bg-ink p-6 text-paper">
          <span className="text-[11px] uppercase tracking-[0.22em] text-paper/50">
            ● Agenda aberta
          </span>
          <p className="font-display text-5xl italic leading-none">
            Zero ruído. Só horário, corte e acabamento.
          </p>
          <span className="font-mono text-[11px] text-paper/45">
            ATELIER ZERO · 2026 · VOL. 01
          </span>
        </div>
      </div>
    </section>
  );
}
