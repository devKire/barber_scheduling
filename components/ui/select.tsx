import type { SelectHTMLAttributes } from 'react';

export function Select({
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full border border-neutral-300 bg-[#fbf7ef] px-4 py-3 text-sm outline-none transition focus:border-neutral-950 ${className}`}
      {...props}
    />
  );
}
