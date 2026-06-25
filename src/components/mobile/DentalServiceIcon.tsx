import type { ReactNode } from 'react';

/* Per-service gradient + shadow palette, shared across home & booking so a
   given service always reads with the same colour identity. */
export const SERVICE_GRADIENTS = [
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#FF6BB5,#E91E8C)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#EC4899,#DB2777)',
  'linear-gradient(135deg,#14B8A6,#0D9488)',
];

export const SERVICE_SHADOWS = [
  '#E91E8C', '#B8860B', '#E91E8C', '#B8860B',
  '#B8860B', '#DC2626', '#DB2777', '#0D9488',
];

/** Custom dental glyph per service id (s1..s8). White strokes — sits on a
    coloured bezel. */
export function DentalServiceIcon({ id, size = 22 }: { id: string; size?: number }) {
  const p = {
    fill: 'none' as const,
    stroke: 'white' as const,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const svg = (children: ReactNode) => (
    <svg viewBox="0 0 24 24" width={size} height={size} {...p}>{children}</svg>
  );

  switch (id) {
    case 's1': // Pemeriksaan — tooth + check
      return svg(<>
        <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
        <path d="M9.5 9.5l2 2 3-3.5" />
      </>);
    case 's2': // Scaling — drop + sparkles
      return svg(<>
        <path d="M12 4c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 8.5 12 4 12 4z" />
        <path d="M5 6l1 1M6 5l-1 1M5.5 5.5h1" />
        <path d="M18 8l1 1M19 7l-1 1M18.5 7.5h1" />
        <path d="M17 3l.5.5M17.5 3l-.5.5M17 3.5h1" />
      </>);
    case 's3': // Tambal — tooth + filling
      return svg(<>
        <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
        <rect x="9.5" y="7.5" width="5" height="4" rx="1" strokeWidth="1.8" />
      </>);
    case 's4': // Cabut — tooth + up arrow
      return svg(<>
        <path d="M8.5 8C6.6 8 5 9.5 5 11.3c0 1.4.6 2.6 1.3 3.8.7 1.3 1.2 2.5 1.2 4.3 0 .4.5.6 1.2.6h6.6c.7 0 1.2-.2 1.2-.6 0-1.8.5-3 1.2-4.3.7-1.2 1.3-2.4 1.3-3.8C19 9.5 17.4 8 15.5 8c-.9 0-1.8.3-2.4.9-.3.3-.7.4-1.1.4-.4 0-.8-.1-1.1-.4C10.3 8.3 9.4 8 8.5 8z" />
        <path d="M12 7V2M9.5 4.5L12 2l2.5 2.5" />
      </>);
    case 's5': // Behel — teeth + wire
      return svg(<>
        <path d="M4 14 Q4 8 7 8 Q10 8 10 12 Q10 8 12 8 Q14 8 14 12 Q14 8 17 8 Q20 8 20 14" />
        <path d="M4 14 Q12 17 20 14" />
        <path d="M5.5 11 H18.5" strokeWidth="1.2" />
        <rect x="8.5" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
        <rect x="13.3" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
      </>);
    case 's6': // Implan — screw in bone
      return svg(<>
        <path d="M9.5 4h5l.5 2h-6l.5-2z" />
        <path d="M9.5 4C9 3 8 2 8 2h8s-1 1-1.5 2" />
        <rect x="10.5" y="6" width="3" height="2" rx="0.5" />
        <path d="M12 8v10" strokeWidth="2.4" />
        <path d="M10.5 10 H13.5 M10 12 H14 M10.5 14 H13.5 M11 16 H13" strokeWidth="1" />
        <path d="M7 15 Q12 13 17 15" strokeWidth="1.4" />
      </>);
    case 's7': // Saluran Akar — tooth + roots
      return svg(<>
        <path d="M9 3C7.3 3 6 4.5 6 6.2c0 1.3.5 2.4 1 3.5.6 1.2 1 2.4 1 4.3v.5c0 .8.4 1.5 1 1.5h6c.6 0 1-.7 1-1.5v-.5c0-1.9.4-3.1 1-4.3.5-1.1 1-2.2 1-3.5C18 4.5 16.7 3 15 3c-.8 0-1.6.4-2.1.9-.3.3-.5.4-.9.4s-.6-.1-.9-.4C10.6 3.4 9.8 3 9 3z" />
        <path d="M10 15 Q9.5 18 9 21" />
        <path d="M14 15 Q14.5 18 15 21" />
        <path d="M12 15 V20" />
        <path d="M10 9 Q12 7.5 14 9" strokeWidth="1.2" />
      </>);
    case 's8': // Veneer — tooth + shine
      return svg(<>
        <path d="M8.5 4C6.8 4 5.5 5.5 5.5 7.2c0 1.5.5 2.7 1.1 4 .7 1.4 1.1 2.8 1.1 4.8 0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1 0-2 .4-3.4 1.1-4.8.6-1.3 1.1-2.5 1.1-4C17.5 5.5 16.2 4 14.5 4c-.8 0-1.6.3-2.1.9-.2.2-.4.3-.4.3s-.2-.1-.4-.3C11.1 4.3 10.3 4 9.3 4" />
        <path d="M18 4 l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" />
        <path d="M16 8 l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3z" />
      </>);
    default:
      return svg(
        <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
      );
  }
}

/** Rounded double-bezel container that frames a DentalServiceIcon on a
    coloured gradient. */
export function ServiceIconBezel({
  gradient, shadowColor, size = 60, radius = 18, children,
}: {
  gradient: string; shadowColor: string; size?: number; radius?: number; children: ReactNode;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, padding: size * 0.067,
      background: 'white', boxShadow: `0 4px 16px ${shadowColor}30`, flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: radius - 4,
        background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}
