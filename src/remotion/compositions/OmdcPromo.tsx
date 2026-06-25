import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const CREAM = '#FFF8F4';

const services = [
  { icon: '🦷', label: 'Pemutihan Gigi' },
  { icon: '😁', label: 'Pemasangan Kawat' },
  { icon: '🔬', label: 'Scaling & Polishing' },
  { icon: '👑', label: 'Implan Gigi' },
];

function FloatingOrb({ x, y, size, delay, color }: {
  x: number; y: number; size: number; delay: number; color: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [delay, delay + 20], [0, 0.18], { extrapolateRight: 'clamp' });
  const yOffset = Math.sin((frame + delay * 3) / fps) * 12;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y + yOffset,
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      opacity,
      filter: 'blur(40px)',
    }} />
  );
}

function ServiceChip({ icon, label, index }: { icon: string; label: string; index: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 60 + index * 12;
  const scale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 200 } });
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'white',
      borderRadius: 20,
      padding: '18px 28px',
      boxShadow: '0 4px 24px rgba(233,30,140,0.12)',
      border: `2px solid rgba(233,30,140,0.10)`,
      transform: `scale(${scale})`,
      opacity,
    }}>
      <span style={{ fontSize: 36 }}>{icon}</span>
      <span style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e', fontFamily: 'sans-serif' }}>{label}</span>
    </div>
  );
}

export const OmdcPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [60, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 180 } });
  const ctaScale = spring({ frame: frame - 130, fps, config: { damping: 14, stiffness: 200 } });
  const ctaOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateRight: 'clamp' });

  const stripW = interpolate(frame, [0, 30], [0, width], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: 'Plus Jakarta Sans, sans-serif', overflow: 'hidden' }}>
      {/* Floating orbs */}
      <FloatingOrb x={-120} y={-120} size={500} delay={0} color={`radial-gradient(circle, ${PINK}55, transparent 70%)`} />
      <FloatingOrb x={width - 200} y={height - 300} size={400} delay={10} color={`radial-gradient(circle, ${GOLD}44, transparent 70%)`} />
      <FloatingOrb x={width / 2 - 150} y={height - 200} size={300} delay={5} color={`radial-gradient(circle, ${ROSE}33, transparent 70%)`} />

      {/* 3px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: 6, width: stripW,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`,
      }} />

      {/* Logo pill */}
      <Sequence from={5}>
        <div style={{
          position: 'absolute', top: 48, left: 60,
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'white',
          borderRadius: 100,
          padding: '12px 28px 12px 16px',
          boxShadow: '0 4px 20px rgba(233,30,140,0.14)',
          opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 22 }}>🦷</span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: PINK, letterSpacing: -0.5 }}>OMDC Dental</span>
        </div>
      </Sequence>

      {/* "Gratis Konsultasi" badge */}
      <div style={{
        position: 'absolute', top: 48, right: 60,
        background: `linear-gradient(135deg, ${GOLD}, #f5a623)`,
        borderRadius: 100,
        padding: '14px 28px',
        transform: `scale(${badgeScale})`,
        boxShadow: `0 8px 24px ${GOLD}55`,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>✨ Gratis Konsultasi</span>
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute',
        top: height * 0.22,
        left: 60, right: 60,
        textAlign: 'center',
        transform: `translateY(${titleY}px)`,
        opacity: titleOpacity,
      }}>
        <div style={{
          fontSize: width > 1200 ? 88 : 72,
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: -2,
          background: `linear-gradient(135deg, ${PINK} 0%, #c0196e 40%, ${GOLD} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Senyum Sehat,{'\n'}Percaya Diri Penuh
        </div>
        <div style={{
          fontSize: 30,
          fontWeight: 500,
          color: '#6b4c5e',
          marginTop: 20,
          opacity: subOpacity,
        }}>
          Klinik Gigi Terpercaya di Jakarta
        </div>
      </div>

      {/* Service chips */}
      <div style={{
        position: 'absolute',
        top: height * 0.54,
        left: 60, right: 60,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
      }}>
        {services.map((s, i) => (
          <ServiceChip key={s.label} icon={s.icon} label={s.label} index={i} />
        ))}
      </div>

      {/* CTA button */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: `translateX(-50%) scale(${ctaScale})`,
        opacity: ctaOpacity,
        background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
        borderRadius: 100,
        padding: '28px 72px',
        boxShadow: `0 12px 40px ${PINK}55`,
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>
          Booking Sekarang →
        </span>
      </div>
    </AbsoluteFill>
  );
};
