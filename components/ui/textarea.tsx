import type { TextareaHTMLAttributes } from 'react';

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full border border-neutral-300 bg-[#fbf7ef] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 ${className}`}
      {...props}
    />
  );
}
