import type { HTMLAttributes } from 'react';

export function Card({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border border-neutral-300 bg-[#fbf7ef]/80 p-6 shadow-[8px_8px_0_#1c1917] ${className}`}
      {...props}
    />
  );
}
