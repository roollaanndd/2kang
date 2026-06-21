interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  height?: number;
}

export function WaveDivider({ fromColor = '#F8F9FB', toColor = '#FFFFFF', flip = false, height = 64 }: WaveDividerProps) {
  return (
    <div style={{ background: fromColor, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height, transform: flip ? 'scaleY(-1)' : 'none' }}>
        <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill={toColor} />
      </svg>
    </div>
  );
}
