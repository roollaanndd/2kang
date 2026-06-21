import { motion } from 'motion/react';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';

/* FDI tooth numbering, laid out left→right as the dentist faces the patient.
   Upper arch: Q1 (18→11) then Q2 (21→28).  Lower arch: Q4 (48→41) then Q3 (31→38). */
const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

/* Tooth type per FDI position (last digit) → drives the glyph silhouette. */
function toothType(fdi: number): 'molar' | 'premolar' | 'canine' | 'incisor' {
  const pos = fdi % 10;
  if (pos >= 6) return 'molar';
  if (pos >= 4) return 'premolar';
  if (pos === 3) return 'canine';
  return 'incisor';
}

function ToothGlyph({ type, active }: { type: ReturnType<typeof toothType>; active: boolean }) {
  const stroke = active ? '#FFFFFF' : '#C9CED6';
  const fill = active ? 'rgba(255,255,255,0.22)' : '#FFFFFF';
  const sw = 1.4;
  // Crown widths by type for a recognisable silhouette.
  const w = type === 'molar' ? 17 : type === 'premolar' ? 14 : type === 'canine' ? 12 : 11;
  return (
    <svg width={w} height={20} viewBox={`0 0 ${w} 20`} fill="none" style={{ display: 'block' }}>
      {type === 'molar' && (
        <path d={`M3 2 Q${w / 2} 0 ${w - 3} 2 Q${w - 1} 7 ${w - 3} 11 Q${w - 4} 19 ${w - 5} 14 Q${w / 2} 17 5 14 Q4 19 3 11 Q1 7 3 2 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      )}
      {type === 'premolar' && (
        <path d={`M3 2 Q${w / 2} 0 ${w - 3} 2 Q${w - 1} 8 ${w - 3} 12 Q${w / 2} 18 3 12 Q1 8 3 2 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      )}
      {(type === 'canine') && (
        <path d={`M${w / 2} 1 Q${w - 2} 4 ${w - 3} 11 Q${w - 4} 18 ${w / 2} 18 Q3 18 2 11 Q1 4 ${w / 2} 1 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      )}
      {type === 'incisor' && (
        <path d={`M3 2 Q${w / 2} 1 ${w - 3} 2 Q${w - 2} 9 ${w - 4} 14 Q${w / 2} 18 4 14 Q2 9 3 2 Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      )}
    </svg>
  );
}

function Tooth({ fdi, active, onToggle }: { fdi: number; active: boolean; onToggle: (n: number) => void }) {
  const type = toothType(fdi);
  return (
    <button
      type="button"
      onClick={() => onToggle(fdi)}
      aria-pressed={active}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: 'transparent', border: 'none', padding: '2px 1px', cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <motion.div
        animate={active ? { scale: 1.08 } : { scale: 1 }}
        whileTap={{ scale: 0.86 }}
        transition={{ type: 'spring', stiffness: 480, damping: 24 }}
        style={{
          width: 26, height: 28, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: active ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : '#F7F8FA',
          border: `1px solid ${active ? PINK : '#EAEDF2'}`,
          boxShadow: active ? '0 4px 12px rgba(233,30,140,0.32)' : 'none',
        }}
      >
        <ToothGlyph type={type} active={active} />
      </motion.div>
      <span style={{ fontSize: 8, fontWeight: 700, color: active ? PINK : '#B6BCC6', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {fdi}
      </span>
    </button>
  );
}

interface OdontogramProps {
  selected: number[];
  onToggle: (fdi: number) => void;
}

/**
 * Interactive full-mouth dental chart (FDI numbering). Patients tap teeth to
 * flag where it hurts during booking. Upper & lower arches with a quadrant
 * mirror line; light-themed and on-brand.
 */
export function Odontogram({ selected, onToggle }: OdontogramProps) {
  const sel = new Set(selected);

  const Arch = ({ teeth, label }: { teeth: number[]; label: string }) => (
    <div>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>
        {label}
      </div>
      {/* Curved arch: a subtle bow via small per-tooth vertical offset around centre */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 1, overflowX: 'auto', paddingBottom: 2 }}>
        {teeth.map((fdi, i) => {
          // bow: ends sit lower, centre sits higher (smile arch)
          const dist = Math.abs(i - (teeth.length - 1) / 2);
          const lift = Math.round((((teeth.length - 1) / 2) - dist) * 1.4);
          return (
            <div key={fdi} style={{ transform: `translateY(${label.includes('ATAS') ? -lift : lift}px)` }}>
              <Tooth fdi={fdi} active={sel.has(fdi)} onToggle={onToggle} />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Arch teeth={UPPER} label="RAHANG ATAS" />
      {/* Mirror divider with R / L markers (patient orientation) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: '#C9CED6' }}>KANAN</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #E5E7EB 20%, #E5E7EB 80%, transparent)' }} />
        <span style={{ fontSize: 9, fontWeight: 800, color: '#C9CED6' }}>KIRI</span>
      </div>
      <Arch teeth={LOWER} label="RAHANG BAWAH" />
    </div>
  );
}
