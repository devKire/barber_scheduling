'use client';

import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { href: '#servicos', label: 'Serviços', num: '01' },
  { href: '#barbeiros', label: 'Barbeiros', num: '02' },
  { href: '#metodo', label: 'Preços', num: '03' },
  { href: '#contato', label: 'Contato', num: '04' },
];

export function HeadroomHeader() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (reduceMotion) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const delta = current - previous;

    if (current < 96) setHidden(false);
    else if (delta > 8) setHidden(true);
    else if (delta < -8) setHidden(false);
  });

  return (
    <motion.header
      initial={false}
      animate={hidden ? { y: '-105%' } : { y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.34,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 py-4 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink font-display text-2xl italic">
            Ø
          </span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.22em] sm:block">
            Atelier Zero
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-9 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-ink transition hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
            >
              {item.label}
              <span className="absolute -right-5 -top-2 text-[9px] text-ink/40 group-hover:text-coral">
                {item.num}
              </span>
            </Link>
          ))}
        </nav>

        <Link
          href="/book"
          className="rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-paper transition hover:bg-coral hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          Agendar
        </Link>
      </div>
    </motion.header>
  );
}
