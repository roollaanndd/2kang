import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from './Skeleton';

interface SmoothImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Border radius for the wrapper + placeholder (matches the image). */
  radius?: number | string;
  /** Style applied to the wrapper element. */
  wrapperStyle?: CSSProperties;
}

/**
 * Image that fades + scales in once loaded, sitting over a soft grey
 * shimmer placeholder so it never "pops" in. Light-theme, on-brand.
 */
export function SmoothImage({ src, alt = '', className, style, radius, wrapperStyle }: SmoothImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: radius,
        ...wrapperStyle,
      }}
    >
      {!loaded && (
        <Skeleton
          width="100%"
          height="100%"
          radius={typeof radius === 'number' ? radius : 0}
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(1.04)',
          transition: 'opacity 0.6s ease, transform 0.7s ease',
        }}
      />
    </span>
  );
}
