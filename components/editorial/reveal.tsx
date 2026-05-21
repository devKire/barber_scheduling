'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewport,
} from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  stagger?: boolean;
};

const variants = {
  up: fadeInUp,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
};

export function Reveal({
  children,
  className = '',
  direction = 'up',
  stagger = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer() : variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  direction = 'up',
}: Omit<RevealProps, 'stagger'>) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={variants[direction]}>
      {children}
    </motion.div>
  );
}
