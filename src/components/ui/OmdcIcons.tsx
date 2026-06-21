import React, { type CSSProperties } from 'react';

interface IconProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
  strokeWidth?: number;
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

// ─── BESPOKE UI ICON SET ──────────────────────────────────────────────
// Drawn in the OMDC house style: 24-grid, rounded line, tooth-derived cues.
// No third-party / generic icon packs.

// Nav · Home — friendly house with a tooth-arch roof
export function IconHome({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.6 10.4V19a1 1 0 0 0 1 1H17.4a1 1 0 0 0 1-1v-8.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20v-4.2c0-1.4 1.1-2.3 2.5-2.3s2.5.9 2.5 2.3V20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Nav · Booking — calendar with a tooth tick
export function IconCalendarTooth({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3.2" stroke={color} strokeWidth={strokeWidth} />
      <path d="M3.5 9.5h17M8 3.2v3.4M16 3.2v3.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M9 14.2l2.2 2.2 4-4.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Nav · Queue — numbered queue ticket
export function IconQueue({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V9a2 2 0 0 0 0 6v2.5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5V15a2 2 0 0 0 0-6z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M12 8.5v7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="0.4 3" />
    </svg>
  );
}

// Nav · Doctor — tooth with a care heartbeat pulse
export function IconDoctorTooth({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M12 3.4c-3.4 0-6 2.4-6 5.4 0 1.9.8 3.4 1.6 5 .9 1.6 1.2 3.3 1.2 5.6 0 .3.2.5.5.5h1.1c.3 0 .5-.2.5-.5l.2-3c0-.6.4-1 .9-1s.9.4.9 1l.2 3c0 .3.2.5.5.5h1.1c.3 0 .5-.2.5-.5 0-2.3.3-4 1.2-5.6.8-1.6 1.6-3.1 1.6-5 0-3-2.6-5.4-6-5.4z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M8.6 9.4h1.5l1 1.9 1.3-3 .8 1.6h1.6" stroke={color} strokeWidth={strokeWidth * 0.85} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Nav · Profile — person bust
export function IconProfile({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <circle cx="12" cy="8" r="3.6" stroke={color} strokeWidth={strokeWidth} />
      <path d="M5 19.4c0-3.4 3.1-5.4 7-5.4s7 2 7 5.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

// Star — rating
export function IconStar({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M12 3.5l2.55 5.17 5.7.83-4.13 4.02.98 5.68L12 16.9l-5.1 2.3.98-5.68L3.75 9.5l5.7-.83z" fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

// Smile — happy patient
export function IconSmile({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M8.4 13.2c.8 1.6 2.1 2.5 3.6 2.5s2.8-.9 3.6-2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="9" cy="9.6" r="1" fill={color} /><circle cx="15" cy="9.6" r="1" fill={color} />
    </svg>
  );
}

// Phone — call
export function IconPhone({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M6.5 4h3l1.4 4-2 1.4a11 11 0 0 0 5.7 5.7l1.4-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

// Location — clinic pin with tooth dot
export function IconLocation({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <path d="M12 21c4-4.2 6-7.5 6-10.4A6 6 0 0 0 6 10.6C6 13.5 8 16.8 12 21z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="12" cy="10.4" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

// Clock — hours
export function IconClock({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 7.5V12l3 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mail — email
export function IconMail({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M4.5 7.5 12 13l7.5-5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mobile app — phone device
export function IconMobileApp({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M10 5.2h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="12" cy="18.2" r="1" fill={color} />
    </svg>
  );
}

// Kiosk — counter monitor
export function IconKiosk({ size = 24, color = '#E91E8C', strokeWidth = 1.9, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}>
      <rect x="3.5" y="4" width="17" height="11.5" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M9 19.5h6M12 15.5v4M7 8.4h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
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
