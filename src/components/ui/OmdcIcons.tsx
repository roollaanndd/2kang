import React, { type CSSProperties } from 'react';

interface IconProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

// Shared tooth base path — 48×48 viewBox
const T = 'M24 4C16.3 4 10 9.8 10 17c0 4.5 1.7 8.2 3.8 12.1C15.7 32.8 17 37 17 43c0 .6.4 1 1 1h12c.6 0 1-.4 1-1 0-6 1.3-10.2 3.2-13.9C36.3 25.2 38 21.5 38 17 38 9.8 31.7 4 24 4z';

// s1 — Pemeriksaan: tooth + magnifier
export function IconCheckup({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      {/* tooth, offset slightly left */}
      <path d="M20 5C13.4 5 8 10.1 8 16.5c0 4 1.5 7.3 3.3 10.7C13 30.6 14.2 34.4 14.2 40c0 .6.4 1 1 1h9.6c.6 0 1-.4 1-1 0-5.6 1.2-9.4 2.9-12.8C30.5 23.8 32 20.5 32 16.5 32 10.1 26.6 5 20 5z"
        stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* magnifier ring */}
      <circle cx="37" cy="35" r="6" stroke={color} strokeWidth="2.2" />
      {/* magnifier cross-hair */}
      <path d="M34.7 32.7l4.6 4.6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="41" y1="41" x2="44.5" y2="44.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// s2 — Scaling & Polishing: tooth + sparkle jets
export function IconScaling({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      <path d={T} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* jet lines */}
      <path d="M36 9l5-4M37.5 16l6.5-1M36 23l5 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* sparkle dot */}
      <circle cx="38.5" cy="16" r="2.2" fill={color} />
    </svg>
  );
}

// s3 — Tambal Gigi: tooth + patch fill
export function IconFilling({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      <path d={T} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* cavity outline */}
      <rect x="17.5" y="17" width="13" height="10" rx="3.5" stroke={color} strokeWidth="1.8" />
      {/* filled patch */}
      <rect x="17.5" y="17" width="13" height="10" rx="3.5" fill={color} fillOpacity="0.22" />
      {/* center diamond */}
      <path d="M24 19.5l2.5 3L24 25l-2.5-2.5z" fill={color} />
    </svg>
  );
}

// s4 — Cabut Gigi: tooth + upward extraction arrow
export function IconExtraction({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      <path d={T} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* arrow shaft */}
      <line x1="24" y1="3" x2="24" y2="10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* arrowhead */}
      <path d="M20 7l4-5 4 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* motion lines */}
      <path d="M16 14l-3.5-2.5M32 14l3.5-2.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// s5 — Kawat Gigi / Behel: row of teeth + wire + brackets
export function IconBraces({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      {/* left tooth */}
      <path d="M9 14C6.4 14 4.5 15.9 4.5 18.3c0 2 .7 3.7 1.6 5.3C7 25.4 7.5 27 7.5 29.5c0 .3.2.5.5.5H13c.3 0 .5-.2.5-.5 0-2.5.5-4.1 1.4-5.9.9-1.6 1.6-3.3 1.6-5.3C16.5 15.9 14.6 14 12 14z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* center tooth */}
      <path d="M24 12C21 12 18.5 14.2 18.5 17c0 2.2.8 4 1.9 5.9C21.4 24.8 22 27 22 30c0 .3.2.5.5.5H25.5c.3 0 .5-.2.5-.5 0-3 .6-5.2 1.6-7.1C28.6 21 29.5 19.2 29.5 17 29.5 14.2 27 12 24 12z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* right tooth */}
      <path d="M39 14C36.4 14 34.5 15.9 34.5 18.3c0 2 .7 3.7 1.6 5.3C37 25.4 37.5 27 37.5 29.5c0 .3.2.5.5.5H43c.3 0 .5-.2.5-.5 0-2.5.5-4.1 1.4-5.9.9-1.6 1.6-3.3 1.6-5.3C45.5 15.9 43.6 14 41 14z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* wire */}
      <path d="M4.5 19.5h39" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* brackets */}
      <rect x="9" y="17" width="5" height="5" rx="1.2" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.3" />
      <rect x="21.5" y="15.5" width="5" height="5" rx="1.2" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.3" />
      <rect x="34.5" y="17" width="5" height="5" rx="1.2" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

// s6 — Implan Gigi: titanium post + crown
export function IconImplant({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      {/* crown */}
      <path d="M14 16l3-10h14l3 10z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.1" />
      <path d="M14 16h20v3H14z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.08" />
      {/* post shaft */}
      <rect x="21" y="19" width="6" height="18" rx="2.5" stroke={color} strokeWidth="2" />
      {/* screw threads */}
      <path d="M21 23h6M21 27h6M21 31h6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      {/* jaw arch */}
      <path d="M10 38 Q12 43 24 44 Q36 43 38 38" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// s7 — Veneer / Crown: tooth + decorative porcelain shell
export function IconVeneer({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      {/* base tooth (muted) */}
      <path d={T} stroke={color} strokeWidth="2.2" strokeLinejoin="round" opacity="0.35" />
      {/* crown veneer shell */}
      <path d="M11 26L14.5 12l5.5 7 4-9 4 9 5.5-7L37 26H11z"
        stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.12" />
      {/* 4-point sparkle */}
      <path d="M38 9l1.1 3.2 3.2 1.1-3.2 1.1L38 17.6l-1.1-3.2-3.2-1.1 3.2-1.1z" fill={color} />
    </svg>
  );
}

// s8 — Bleaching: tooth + lightning bolt
export function IconBleaching({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      <path d={T} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      {/* lightning bolt */}
      <path d="M27 7l-6 11h6l-5.5 11" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* small sparkle top-right */}
      <path d="M38 7l.8 2.5L41.5 10.3l-2.7.8-.8 2.5-.8-2.5L34.5 10.3l2.7-.8z" fill={color} opacity="0.75" />
      {/* tiny sparkle */}
      <path d="M41 19l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" fill={color} opacity="0.5" />
    </svg>
  );
}

// OMDC Brand Mark — tooth silhouette + medical cross (trademark icon)
export function OmdcBrandMark({ size = 48, color = '#E91E8C', style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style} className={className}>
      <path d={T} fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 15v18M15 24h18" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Map from CMS service id (string '1'–'8') to icon component
const SERVICE_MAP: Record<string, (p: IconProps) => React.ReactElement> = {
  '1': IconCheckup,
  '2': IconScaling,
  '3': IconFilling,
  '4': IconExtraction,
  '5': IconBraces,
  '6': IconImplant,
  '7': IconVeneer,
  '8': IconBleaching,
};

export function OmdcServiceIcon({ id, size = 32, color = '#E91E8C', style, className }: { id: string } & IconProps) {
  const Icon = SERVICE_MAP[id] ?? OmdcBrandMark;
  return <Icon size={size} color={color} style={style} className={className} />;
}
