import Link from 'next/link';

export function TopBarEditorial({ barberCount }: { barberCount: number }) {
  return (
    <div className="relative z-40 border-b border-ink/15 bg-paper/95 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/55">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-2 px-5 sm:px-8 md:px-12 lg:grid lg:grid-cols-3 lg:items-center lg:px-16 xl:px-20">
        <span>
          <b className="text-ink">Atelier Zero</b> · Vol. 01 / Temporada 2026
        </span>
        <span className="hidden text-center text-ink/65 md:block">
          Corte · Barba · Finalização
        </span>
        <span className="flex items-center gap-4 lg:justify-end">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
            Agenda aberta · {barberCount || 6} barbeiros
          </span>
          <Link
            href="/admin"
            className="text-ink underline decoration-ink/20 underline-offset-4 transition hover:text-coral"
          >
            Admin
          </Link>
        </span>
      </div>
    </div>
  );
}
