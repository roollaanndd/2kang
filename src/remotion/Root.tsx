import { Composition } from 'remotion';
import { OmdcPromo } from './compositions/OmdcPromo';
import { OmdcQueue } from './compositions/OmdcQueue';
import { OmdcOnboarding } from './compositions/OmdcOnboarding';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OmdcPromo"
        component={OmdcPromo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="OmdcPromoWide"
        component={OmdcPromo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="OmdcPromoStory"
        component={OmdcPromo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="OmdcQueue"
        component={OmdcQueue}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ queueNumber: 'A-024', currentServing: 'A-021' }}
      />
      <Composition
        id="OmdcOnboarding"
        component={OmdcOnboarding}
        durationInFrames={270}
        fps={30}
        width={390}
        height={844}
        defaultProps={{}}
      />
    </>
  );
};
