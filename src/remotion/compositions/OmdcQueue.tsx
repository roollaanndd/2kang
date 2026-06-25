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

interface OmdcQueueProps extends Record<string, unknown> {
  queueNumber: string;
  currentServing: string;
}

export const OmdcQueue: React.FC<OmdcQueueProps> = ({ queueNumber, currentServing }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const cardScale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 160 } });
  const numberScale = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 120 } });
  const rowOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });

  const pulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.95, 1.05]
  );

  const stripW = interpolate(frame, [0, 30], [0, width], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: 'Plus Jakarta Sans, sans-serif', overflow: 'hidden' }}>
      {/* 3px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: 6, width: stripW,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`,
      }} />

      {/* Header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 90,
        background: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px',
        boxShadow: '0 2px 16px rgba(233,30,140,0.08)',
        opacity: headerOpacity,
      }}>
        <span style={{ fontSize: 28, fontWeight: 900, color: PINK }}>OMDC Dental — Antrian</span>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#888' }}>Lantai 1 · Poli Umum</span>
      </div>

      {/* Main queue card */}
      <div style={{
        position: 'absolute',
        top: 140, left: 60, right: 60,
        background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 60%, #ffd8e6 100%)`,
        borderRadius: 32,
        padding: '60px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        boxShadow: `0 20px 60px ${PINK}44`,
        transform: `scale(${cardScale})`,
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
          Nomor Antrian Anda
        </div>
        <div style={{
          fontSize: 160,
          fontWeight: 900,
          color: 'white',
          lineHeight: 1,
          letterSpacing: -4,
          fontVariantNumeric: 'tabular-nums',
          transform: `scale(${pulse})`,
          textShadow: '0 4px 32px rgba(0,0,0,0.15)',
        }}>
          {queueNumber}
        </div>
        <div style={{
          marginTop: 24,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: 100,
          padding: '12px 32px',
          fontSize: 24,
          fontWeight: 600,
          color: 'white',
        }}>
          Sedang dilayani: {currentServing}
        </div>
      </div>

      {/* Info row */}
      <Sequence from={60}>
        <div style={{
          position: 'absolute',
          bottom: 60, left: 60, right: 60,
          display: 'flex', gap: 24,
          opacity: rowOpacity,
        }}>
          {[
            { label: 'Menunggu', value: '11 orang' },
            { label: 'Estimasi', value: '~22 menit' },
            { label: 'Dokter Aktif', value: '3 dokter' },
          ].map((item) => (
            <div key={item.label} style={{
              flex: 1,
              background: 'white',
              borderRadius: 20,
              padding: '28px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(233,30,140,0.10)',
              border: `2px solid rgba(233,30,140,0.08)`,
            }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: PINK }}>{item.value}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: '#999', marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
