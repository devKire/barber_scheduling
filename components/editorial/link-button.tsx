import Link from 'next/link';

const variants = {
  primary:
    'border-ink bg-ink text-paper hover:-translate-y-0.5 hover:bg-coral hover:text-white',
  secondary:
    'border-ink/25 bg-bone text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper',
  ghost:
    'border-ink/15 bg-transparent text-ink hover:-translate-y-0.5 hover:border-coral hover:text-coral',
};

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
