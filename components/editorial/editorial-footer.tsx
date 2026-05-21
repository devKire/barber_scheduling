import Link from 'next/link';

const columns = [
  {
    title: 'Sobre',
    links: [
      ['Manifesto', '/'],
      ['Método', '#metodo'],
    ],
  },
  {
    title: 'Serviços',
    links: [
      ['Catálogo', '#servicos'],
      ['Agendar', '/book'],
    ],
  },
  {
    title: 'Barbeiros',
    links: [
      ['Equipe', '#barbeiros'],
      ['Agenda', '/book'],
    ],
  },
  {
    title: 'Contato',
    links: [
      ['WhatsApp', '/book'],
      ['Admin', '/admin'],
    ],
  },
];

export function EditorialFooter() {
  return (
    <footer className="border-t border-ink/15 px-5 pb-8 pt-16 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink font-display text-2xl italic">
                Ø
              </span>
              <span className="font-bold uppercase tracking-[0.2em]">
                Atelier Zero
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-6 text-ink/60">
              Barbearia editorial para rotinas sem ruído: corte, barba e
              finalização com agenda direta.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm text-ink/60">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="transition hover:text-coral">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 text-[11px] uppercase tracking-[0.18em] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-coral" />
            Atelier Zero · 2026 · Vol. 01
          </span>
          <span>São Paulo / Agenda aberta</span>
        </div>
        <div className="mt-10 overflow-hidden border-t border-ink/10 pt-8">
          <p className="whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-ink md:text-[13vw]">
            Zero<span className="font-display italic text-coral">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
