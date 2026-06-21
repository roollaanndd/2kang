import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Shimmer loading placeholder — light theme, self-contained (no global CSS).
 * A soft grey block with a moving highlight sweep. Compose several to build
 * skeleton screens for cards, lists, avatars, etc.
 */
export function Skeleton({ width = '100%', height = 16, radius = 8, style, className }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
        borderRadius: radius,
        background: '#EAEDF2',
        ...style,
      }}
      aria-hidden
    >
      <motion.div
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

/** Convenience circle skeleton (avatars). */
export function SkeletonCircle({ size = 40, style }: { size?: number; style?: CSSProperties }) {
  return <Skeleton width={size} height={size} radius={size / 2} style={style} />;
}

/** Convenience text-line skeleton. */
export function SkeletonText({ width = '100%', height = 12, style }: { width?: number | string; height?: number; style?: CSSProperties }) {
  return <Skeleton width={width} height={height} radius={6} style={style} />;
}
