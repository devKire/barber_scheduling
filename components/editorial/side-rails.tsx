export function SideRails() {
  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-10 items-center justify-center border-r border-ink/5 xl:flex">
        <span className="[writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.42em] text-ink/45">
          Barbearia · Editorial · Silenciosa
        </span>
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-0 z-30 hidden w-10 items-center justify-center border-l border-ink/5 xl:flex">
        <span className="rotate-180 [writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.42em] text-ink/45">
          Atelier Zero · Vol. 01 · Nº 001
        </span>
      </div>
    </>
  );
}
