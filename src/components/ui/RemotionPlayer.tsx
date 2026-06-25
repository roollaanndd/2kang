import { Player } from '@remotion/player';
import { OmdcPromo } from '../../remotion/compositions/OmdcPromo';
import { OmdcQueue } from '../../remotion/compositions/OmdcQueue';
import { OmdcOnboarding } from '../../remotion/compositions/OmdcOnboarding';

type CompositionId = 'OmdcPromo' | 'OmdcQueue' | 'OmdcOnboarding';

interface RemotionPlayerProps {
  composition: CompositionId;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  style?: React.CSSProperties;
  queueNumber?: string;
  currentServing?: string;
}

const COMPOSITIONS: Record<CompositionId, {
  component: React.FC<any>;
  durationInFrames: number;
  fps: number;
  defaultWidth: number;
  defaultHeight: number;
  defaultProps: Record<string, unknown>;
}> = {
  OmdcPromo: {
    component: OmdcPromo,
    durationInFrames: 180,
    fps: 30,
    defaultWidth: 1080,
    defaultHeight: 1080,
    defaultProps: {},
  },
  OmdcQueue: {
    component: OmdcQueue,
    durationInFrames: 300,
    fps: 30,
    defaultWidth: 1920,
    defaultHeight: 1080,
    defaultProps: { queueNumber: 'A-024', currentServing: 'A-021' },
  },
  OmdcOnboarding: {
    component: OmdcOnboarding,
    durationInFrames: 270,
    fps: 30,
    defaultWidth: 390,
    defaultHeight: 844,
    defaultProps: {},
  },
};

export function RemotionPlayer({
  composition,
  width,
  height,
  autoPlay = true,
  loop = true,
  controls = false,
  style,
  queueNumber,
  currentServing,
}: RemotionPlayerProps) {
  const config = COMPOSITIONS[composition];
  const inputProps = {
    ...config.defaultProps,
    ...(queueNumber !== undefined ? { queueNumber } : {}),
    ...(currentServing !== undefined ? { currentServing } : {}),
  };

  return (
    <Player
      component={config.component}
      durationInFrames={config.durationInFrames}
      fps={config.fps}
      compositionWidth={config.defaultWidth}
      compositionHeight={config.defaultHeight}
      style={{
        width: width ?? '100%',
        height: height ?? 'auto',
        borderRadius: 16,
        ...style,
      }}
      loop={loop}
      controls={controls}
      clickToPlay={!autoPlay}
      inputProps={inputProps}
    />
  );
}
