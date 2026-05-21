import type { Variants } from 'framer-motion';

// ─── Core Transition Presets ─────────────────────────────────────────────────

export const spring = {
  type: 'spring' as const,
  stiffness: 60,
  damping: 20,
  mass: 1,
};

export const easeOut = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const easeOutFast = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// ─── Reveal Variants ─────────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOut,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOut,
  },
};

export const riseLarge: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: easeOut,
  },
};

// ─── Stagger Container ───────────────────────────────────────────────────────

export function staggerContainer(stagger = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

// ─── Nav Slide ───────────────────────────────────────────────────────────────

export const navSlide: Variants = {
  visible: {
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 0.61, 0.36, 1] },
  },
  hidden: {
    y: '-100%',
    transition: { duration: 0.36, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ─── Viewport Config ─────────────────────────────────────────────────────────

export const viewport = {
  once: true,
  margin: '0px 0px -8% 0px',
  amount: 0.12,
} as const;
