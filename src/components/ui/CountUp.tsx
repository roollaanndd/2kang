import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

interface CountUpProps {
  /** The final value as displayed, e.g. "10,000+", "4.9", "98%", "15+". */
  value: string;
  /** Animation duration in ms. */
  duration?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Counts a numeric value up from zero when it scrolls into view, preserving
 * any prefix/suffix and thousand-separators from the original string.
 * Self-contained (IntersectionObserver + rAF) — no external animation deps.
 */
export function CountUp({ value, duration = 1600, style, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const m = value.match(/^(\D*)([\d.,]+)(.*)$/s);
    if (!m) { setDisplay(value); return; }

    const prefix = m[1] ?? '';
    const numRaw = m[2];
    const suffix = m[3] ?? '';
    const hasComma = numRaw.includes(',');
    const cleaned = numRaw.replace(/,/g, '');
    const decimals = cleaned.includes('.') ? cleaned.split('.')[1].length : 0;
    const target = parseFloat(cleaned);
    if (isNaN(target)) { setDisplay(value); return; }

    const fmt = (n: number) => {
      let s = n.toFixed(decimals);
      if (hasComma) {
        const [int, dec] = s.split('.');
        s = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec ? '.' + dec : '');
      }
      return prefix + s + suffix;
    };

    setDisplay(fmt(0));

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(fmt(target * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(fmt(target));
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref} style={style} className={className}>{display}</span>;
}
