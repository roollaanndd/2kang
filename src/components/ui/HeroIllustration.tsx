import { motion } from 'motion/react';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';

/* Floating sparkle orbit */
function Sparkle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.2, 0.7] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ originX: `${x}px`, originY: `${y}px` }}
    >
      <path
        d={`M${x} ${y - size} L${x + size * 0.25} ${y - size * 0.25} L${x + size} ${y} L${x + size * 0.25} ${y + size * 0.25} L${x} ${y + size} L${x - size * 0.25} ${y + size * 0.25} L${x - size} ${y} L${x - size * 0.25} ${y - size * 0.25} Z`}
        fill={PINK}
      />
    </motion.g>
  );
}

/* A single person silhouette — stylised and friendly */
function Person({
  cx, cy, scale = 1, skinTone = '#FDBCB4', shirtColor = PINK, hairColor = '#2D1B00', female = false,
}: {
  cx: number; cy: number; scale?: number; skinTone?: string; shirtColor?: string; hairColor?: string; female?: boolean;
}) {
  const s = scale;
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${s})`}>
      {/* Hair */}
      {female ? (
        <>
          <ellipse cx="0" cy="-52" rx="20" ry="24" fill={hairColor} />
          <ellipse cx="-18" cy="-38" rx="7" ry="18" fill={hairColor} />
          <ellipse cx="18" cy="-38" rx="7" ry="18" fill={hairColor} />
        </>
      ) : (
        <ellipse cx="0" cy="-54" rx="18" ry="16" fill={hairColor} />
      )}
      {/* Head */}
      <ellipse cx="0" cy="-42" rx="17" ry="19" fill={skinTone} />
      {/* Eyes */}
      <circle cx="-6" cy="-46" r="3.2" fill="#1F2937" />
      <circle cx="6" cy="-46" r="3.2" fill="#1F2937" />
      <circle cx="-5.2" cy="-46.8" r="1" fill="white" />
      <circle cx="6.8" cy="-46.8" r="1" fill="white" />
      {/* Smile */}
      <path d="M-8 -36 Q0 -30 8 -36" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Teeth */}
      <path d="M-6 -36 Q0 -31 6 -36" stroke="none" fill="white" opacity="0.8" />
      {/* Cheeks */}
      <ellipse cx="-13" cy="-40" rx="4.5" ry="3" fill={ROSE} opacity="0.35" />
      <ellipse cx="13" cy="-40" rx="4.5" ry="3" fill={ROSE} opacity="0.35" />
      {/* Body / shirt */}
      <path d="M-20 -20 C-22 -5 -22 20 -20 35 L20 35 C22 20 22 -5 20 -20 Z" fill={shirtColor} />
      {/* Collar */}
      <path d="M-8 -23 L0 -14 L8 -23" fill="white" opacity="0.3" />
      {/* Arms */}
      <path d="M-20 -18 C-32 -10 -36 5 -32 18" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M20 -18 C32 -10 36 5 32 18" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <rect x="-14" y="35" width="11" height="26" rx="5" fill="#374151" />
      <rect x="3" y="35" width="11" height="26" rx="5" fill="#374151" />
      {/* Shoes */}
      <ellipse cx="-8" cy="62" rx="9" ry="5" fill="#1F2937" />
      <ellipse cx="8" cy="62" rx="9" ry="5" fill="#1F2937" />
    </g>
  );
}

/* Child silhouette — smaller and cuter */
function Child({ cx, cy, skinTone = '#FDBCB4', shirtColor = GOLD, hairColor = '#2D1B00', female = false }: {
  cx: number; cy: number; skinTone?: string; shirtColor?: string; hairColor?: string; female?: boolean;
}) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(0.65)`}>
      {female ? (
        <>
          <ellipse cx="0" cy="-52" rx="20" ry="24" fill={hairColor} />
          <ellipse cx="-19" cy="-36" rx="7" ry="19" fill={hairColor} />
          <ellipse cx="19" cy="-36" rx="7" ry="19" fill={hairColor} />
        </>
      ) : (
        <ellipse cx="0" cy="-54" rx="18" ry="16" fill={hairColor} />
      )}
      <ellipse cx="0" cy="-42" rx="19" ry="21" fill={skinTone} />
      <circle cx="-6.5" cy="-46" r="3.5" fill="#1F2937" />
      <circle cx="6.5" cy="-46" r="3.5" fill="#1F2937" />
      <circle cx="-5.5" cy="-46.9" r="1.2" fill="white" />
      <circle cx="7.5" cy="-46.9" r="1.2" fill="white" />
      <path d="M-8 -34 Q0 -26 8 -34" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M-6 -34 Q0 -28 6 -34" stroke="none" fill="white" opacity="0.8" />
      <ellipse cx="-14" cy="-39" rx="5" ry="3.5" fill={ROSE} opacity="0.4" />
      <ellipse cx="14" cy="-39" rx="5" ry="3.5" fill={ROSE} opacity="0.4" />
      <path d="M-18 -18 C-20 -3 -20 18 -18 33 L18 33 C20 18 20 -3 18 -18 Z" fill={shirtColor} />
      <path d="M-20 -16 C-30 -6 -34 8 -30 20" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M20 -16 C30 -6 34 8 30 20" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />
      <rect x="-12" y="33" width="9" height="22" rx="4" fill="#374151" />
      <rect x="3" y="33" width="9" height="22" rx="4" fill="#374151" />
      <ellipse cx="-7" cy="55" rx="8" ry="4" fill="#1F2937" />
      <ellipse cx="7" cy="55" rx="8" ry="4" fill="#1F2937" />
    </g>
  );
}

/* Dental cross badge */
function DentalBadge({ x, y }: { x: number; y: number }) {
  return (
    <motion.g
      animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originX: `${x}px`, originY: `${y}px` }}
    >
      <rect x={x - 24} y={y - 24} width="48" height="48" rx="14" fill="white" opacity="0.95" filter="url(#shadow)" />
      <path d={`M${x} ${y - 12} L${x} ${y + 12} M${x - 12} ${y} L${x + 12} ${y}`} stroke={PINK} strokeWidth="5" strokeLinecap="round" />
    </motion.g>
  );
}

/* Star rating badge */
function RatingBadge({ x, y }: { x: number; y: number }) {
  return (
    <motion.g
      animate={{ y: [4, -4, 4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      <rect x={x - 44} y={y - 24} width="88" height="48" rx="14" fill="white" opacity="0.96" filter="url(#shadow)" />
      <text x={x - 32} y={y + 6} fontSize="18" fill="#FBBF24">★</text>
      <text x={x - 12} y={y + 6} fontSize="14" fontWeight="800" fill="#111827">4.9</text>
      <text x={x + 14} y={y + 1} fontSize="9" fill="#9CA3AF" fontWeight="600">Rating</text>
      <text x={x + 14} y={y + 11} fontSize="9" fill="#9CA3AF">Pasien</text>
    </motion.g>
  );
}

/* Patients count badge */
function PatientsBadge({ x, y }: { x: number; y: number }) {
  return (
    <motion.g
      animate={{ y: [-3, 5, -3] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      <rect x={x - 50} y={y - 24} width="100" height="48" rx="14" fill="white" opacity="0.96" filter="url(#shadow)" />
      {[0, 1, 2].map(i => (
        <circle key={i} cx={x - 22 + i * 14} cy={y - 2} r="9" fill={[PINK, GOLD, ROSE][i]} opacity="0.9" />
      ))}
      <text x={x + 24} y={y + 4} fontSize="12" fontWeight="800" fill="#111827">+20K</text>
      <text x={x - 44} y={y + 18} fontSize="8" fill="#9CA3AF" fontWeight="600">Pasien Puas</text>
    </motion.g>
  );
}

export function HeroIllustration({ width = 520, height = 560 }: { width?: number; height?: number }) {
  const groundY = height - 80;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%" height="100%"
      style={{ maxWidth: width, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.12)" />
        </filter>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PINK} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={PINK} stopOpacity="0.06" />
          <stop offset="100%" stopColor={ROSE} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PINK} stopOpacity="0.08" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background arc / stage */}
      <ellipse cx={width / 2} cy={groundY + 18} rx={width * 0.52} ry={60} fill="url(#groundGrad)" />

      {/* Decorative circles behind */}
      <circle cx={width * 0.72} cy={height * 0.22} r={120} fill="url(#circleGrad)" />
      <circle cx={width * 0.22} cy={height * 0.72} r={80} fill="url(#circleGrad)" />

      {/* Subtle grid dots */}
      {[...Array(5)].map((_, row) =>
        [...Array(6)].map((_, col) => (
          <circle key={`${row}-${col}`} cx={60 + col * 80} cy={60 + row * 90} r="2.5" fill={PINK} opacity="0.08" />
        ))
      )}

      {/* Floating sparkles */}
      <Sparkle x={55}  y={110} size={8}  delay={0} />
      <Sparkle x={460} y={80}  size={6}  delay={0.6} />
      <Sparkle x={490} y={300} size={9}  delay={1.2} />
      <Sparkle x={30}  y={380} size={7}  delay={1.8} />
      <Sparkle x={380} y={480} size={5}  delay={0.9} />

      {/* Floating dental cross */}
      <DentalBadge x={88} y={165} />

      {/* Family — Dad (left), Child (center-left), Mom (center-right) */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        {/* Dad */}
        <Person
          cx={width * 0.3} cy={groundY}
          skinTone="#D4956A" shirtColor={PINK} hairColor="#1C1C1C"
        />
      </motion.g>

      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        {/* Child (girl) */}
        <Child
          cx={width * 0.5} cy={groundY - 20}
          skinTone="#FDBCB4" shirtColor={GOLD} hairColor="#2D1B00" female
        />
      </motion.g>

      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      >
        {/* Mom */}
        <Person
          cx={width * 0.68} cy={groundY}
          skinTone="#C68B5A" shirtColor={ROSE} hairColor="#3D1C02" female
        />
      </motion.g>

      {/* Floating info badges */}
      <RatingBadge x={420} y={175} />
      <PatientsBadge x={108} y={420} />

      {/* Bottom tooth icon */}
      <motion.g
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: `${width * 0.82}px`, originY: `${height * 0.82}px` }}
      >
        <g transform={`translate(${width * 0.82}, ${height * 0.82})`}>
          <path d="M0 -30 C-14 -30 -24 -18 -24 -6 C-24 2 -20 10 -16 18 C-12 26 -10 30 -10 38 C-10 41 -8 43 -5 43 L5 43 C8 43 10 41 10 38 C10 30 12 26 16 18 C20 10 24 2 24 -6 C24 -18 14 -30 0 -30 Z"
            fill={PINK} opacity="0.15" />
          <path d="M0 -30 C-14 -30 -24 -18 -24 -6 C-24 2 -20 10 -16 18 C-12 26 -10 30 -10 38 C-10 41 -8 43 -5 43 L5 43 C8 43 10 41 10 38 C10 30 12 26 16 18 C20 10 24 2 24 -6 C24 -18 14 -30 0 -30 Z"
            stroke={PINK} strokeWidth="2" fill="none" opacity="0.6" />
        </g>
      </motion.g>

      {/* Ground line */}
      <line x1={width * 0.08} y1={groundY + 35} x2={width * 0.92} y2={groundY + 35} stroke={PINK} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.2" />
    </svg>
  );
}
