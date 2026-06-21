import { motion } from 'motion/react';

const PINK = '#E91E8C';
const AQUA = '#06B6D4';

type ShapeKind = 'tooth' | 'ring' | 'plus' | 'sparkle';
interface Shape {
  x: number; y: number; s: number; d: number; t: number; c: string; o: number; sh: ShapeKind;
}

/* Full-bleed shape set — for website sections & kiosk screens */
const SHAPES_LG: Shape[] = [
  { x: 90, y: -4, s: 92, d: 0, t: 15, c: PINK, o: 0.05, sh: 'tooth' },
  { x: 2, y: 8, s: 100, d: 1.6, t: 13, c: AQUA, o: 0.038, sh: 'ring' },
  { x: 78, y: 55, s: 28, d: 0.9, t: 9, c: PINK, o: 0.06, sh: 'plus' },
  { x: 4, y: 62, s: 68, d: 2.3, t: 17, c: PINK, o: 0.04, sh: 'tooth' },
  { x: 88, y: 72, s: 22, d: 1.2, t: 8, c: AQUA, o: 0.07, sh: 'sparkle' },
  { x: 50, y: 88, s: 72, d: 0.5, t: 12, c: PINK, o: 0.03, sh: 'ring' },
  { x: 94, y: 30, s: 22, d: 1.9, t: 10, c: AQUA, o: 0.06, sh: 'plus' },
  { x: 8, y: 30, s: 18, d: 0.3, t: 7, c: PINK, o: 0.08, sh: 'sparkle' },
  { x: 40, y: 3, s: 52, d: 3.2, t: 19, c: AQUA, o: 0.028, sh: 'tooth' },
  { x: 60, y: 10, s: 80, d: 2.6, t: 16, c: AQUA, o: 0.03, sh: 'ring' },
  { x: 20, y: 78, s: 16, d: 1.5, t: 8, c: PINK, o: 0.055, sh: 'sparkle' },
  { x: 66, y: 40, s: 24, d: 2.9, t: 13, c: PINK, o: 0.042, sh: 'plus' },
];

/* Compact shape set — for mobile panels & smaller surfaces */
const SHAPES_SM: Shape[] = [
  { x: 78, y: -8, s: 52, d: 0, t: 12, c: PINK, o: 0.06, sh: 'tooth' },
  { x: -4, y: 20, s: 56, d: 1.4, t: 10, c: AQUA, o: 0.05, sh: 'ring' },
  { x: 82, y: 55, s: 18, d: 0.7, t: 8, c: PINK, o: 0.07, sh: 'plus' },
  { x: 60, y: 78, s: 40, d: 2.1, t: 14, c: AQUA, o: 0.04, sh: 'ring' },
  { x: 8, y: 72, s: 14, d: 1.0, t: 7, c: AQUA, o: 0.08, sh: 'sparkle' },
  { x: 92, y: 80, s: 12, d: 0.2, t: 6, c: PINK, o: 0.09, sh: 'sparkle' },
  { x: 30, y: -5, s: 36, d: 2.8, t: 16, c: PINK, o: 0.04, sh: 'tooth' },
  { x: -2, y: 50, s: 16, d: 1.7, t: 9, c: PINK, o: 0.06, sh: 'plus' },
];

interface Props {
  /** 'lg' = full-screen surfaces (website/kiosk), 'sm' = compact panels (mobile) */
  size?: 'lg' | 'sm';
  /** Optional override of stacking context */
  zIndex?: number;
}

/**
 * Premium animated dental-geometry background.
 * Floating tooth outlines, concentric rings, plus crosses & sparkles at low
 * opacity. Replaces all radial-gradient "blob" decorations across the app for
 * a single, consistent, on-brand light background.
 */
export function AnimatedDentalBg({ size = 'lg', zIndex = 0 }: Props) {
  const shapes = size === 'lg' ? SHAPES_LG : SHAPES_SM;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex }} aria-hidden>
      {shapes.map((el, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o }}
          animate={{
            y: [-10, 10, -10],
            rotate: el.sh === 'ring' ? [0, 6, 0] : el.sh === 'plus' ? [0, 18, 0] : el.sh === 'sparkle' ? [0, 22, 0] : [0, 4, 0],
          }}
          transition={{ duration: el.t, repeat: Infinity, delay: el.d, ease: 'easeInOut' }}
        >
          {el.sh === 'tooth' && (
            <svg width={el.s} height={Math.round(el.s * 1.15)} viewBox="0 0 100 115" fill="none">
              <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                stroke={el.c} strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          )}
          {el.sh === 'ring' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke={el.c} strokeWidth="2.5" />
              <circle cx="50" cy="50" r="30" stroke={el.c} strokeWidth="1.5" strokeDasharray="7 5" />
            </svg>
          )}
          {el.sh === 'plus' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <path d="M50 18V82M18 50H82" stroke={el.c} strokeWidth="9" strokeLinecap="round" />
            </svg>
          )}
          {el.sh === 'sparkle' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100">
              <path d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45Z" fill={el.c} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
