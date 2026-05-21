import type { ButtonHTMLAttributes } from 'react';

const variants = {
  primary: 'border-neutral-950 bg-neutral-950 text-stone-50 hover:bg-[#5b2f24]',
  secondary:
    'border-neutral-950 bg-transparent text-neutral-950 hover:bg-neutral-950 hover:text-stone-50',
  ghost:
    'border-transparent bg-transparent text-neutral-950 hover:border-neutral-300',
};

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center border px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
