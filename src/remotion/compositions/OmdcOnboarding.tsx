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

const slides = [
  {
    emoji: '🦷',
    title: 'Senyum Sehat\nPercaya Diri',
    subtitle: 'Klinik gigi modern untuk keluarga Indonesia',
    bg: `linear-gradient(160deg, ${PINK} 0%, ${ROSE} 60%, #ffd8e6 100%)`,
  },
  {
    emoji: '📅',
    title: 'Booking\nMudah',
    subtitle: 'Jadwalkan kunjungan kapan saja, di mana saja',
    bg: `linear-gradient(160deg, ${GOLD} 0%, #f5a623 60%, #ffdfa0 100%)`,
  },
  {
    emoji: '🏆',
    title: 'Dokter\nTerpercaya',
    subtitle: '8 spesialis berpengalaman siap melayani Anda',
    bg: `linear-gradient(160deg, ${ROSE} 0%, ${PINK} 60%, #ffd8e6 100%)`,
  },
];

const SLIDE_FRAMES = 90;

function Slide({ emoji, title, subtitle, bg }: typeof slides[0]) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 180 } });
  const titleY = interpolate(frame, [20, 40], [40, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: CREAM,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      {/* Gradient card */}
      <div style={{
        width: '100%',
        borderRadius: 36,
        background: bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 40px',
        boxShadow: '0 20px 60px rgba(233,30,140,0.25)',
        marginBottom: 40,
      }}>
        <div style={{
          fontSize: 120,
          transform: `scale(${emojiScale})`,
          marginBottom: 24,
        }}>
          {emoji}
        </div>
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.1,
          textAlign: 'center',
          letterSpacing: -1.5,
          textShadow: '0 4px 20px rgba(0,0,0,0.12)',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}>
          {title}
        </div>
      </div>
      <div style={{
        fontSize: 28,
        fontWeight: 500,
        color: '#6b4c5e',
        textAlign: 'center',
        opacity: subOpacity,
        lineHeight: 1.4,
      }}>
        {subtitle}
      </div>
    </AbsoluteFill>
  );
}

export const OmdcOnboarding: React.FC = () => {
  return (
    <AbsoluteFill>
      {slides.map((slide, i) => (
        <Sequence key={i} from={i * SLIDE_FRAMES} durationInFrames={SLIDE_FRAMES}>
          <Slide {...slide} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
