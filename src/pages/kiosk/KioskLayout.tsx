import { createElement, useEffect, useState, type ComponentType, type Dispatch, type SetStateAction } from 'react';
import { APP_VERSION } from '../../version';
import { AnimatePresence } from 'motion/react';
import type { KioskState, KioskStep } from '../../types';
import { KioskHeader } from '../../components/kiosk/KioskHeader';
import { KioskWelcome } from './screens/KioskWelcome';
import { KioskLanguage } from './screens/KioskLanguage';
import { KioskMainMenu } from './screens/KioskMainMenu';
import { KioskServiceSelect } from './screens/KioskServiceSelect';
import { KioskDoctorSelect } from './screens/KioskDoctorSelect';
import { KioskDateSelect } from './screens/KioskDateSelect';
import { KioskTimeSelect } from './screens/KioskTimeSelect';
import { KioskConfirmation } from './screens/KioskConfirmation';
import { KioskPayment } from './screens/KioskPayment';
import { KioskTicket } from './screens/KioskTicket';
import { KioskQueueDisplay } from './screens/KioskQueueDisplay';
import { KioskCheckin } from './screens/KioskCheckin';
import { KioskNewPatient } from './screens/KioskNewPatient';
import { KioskInfoPromo } from './screens/KioskInfoPromo';

/* Design canvas — all kiosk screens are authored at this resolution */
const DESIGN_W = 1280;
const DESIGN_H = 800;

const STEP_HISTORY: Record<KioskStep, KioskStep | null> = {
  'welcome': null,
  'language': 'welcome',
  'main-menu': 'language',
  'service-select': 'main-menu',
  'doctor-select': 'service-select',
  'date-select': 'doctor-select',
  'time-select': 'date-select',
  'confirmation': 'time-select',
  'payment': 'confirmation',
  'ticket': null,
  'queue-display': 'welcome',
  'checkin': 'main-menu',
  'new-patient': 'main-menu',
  'info-promo': 'main-menu',
};

const INITIAL_STATE: KioskState = {
  language: 'id',
  step: 'welcome',
};

export interface KioskScreenProps {
  state: KioskState;
  setState: Dispatch<SetStateAction<KioskState>>;
  goTo: (step: KioskStep) => void;
  goBack: () => void;
}

const SCREEN_MAP: Record<KioskStep, ComponentType<KioskScreenProps>> = {
  'welcome': KioskWelcome,
  'language': KioskLanguage,
  'main-menu': KioskMainMenu,
  'service-select': KioskServiceSelect,
  'doctor-select': KioskDoctorSelect,
  'date-select': KioskDateSelect,
  'time-select': KioskTimeSelect,
  'confirmation': KioskConfirmation,
  'payment': KioskPayment,
  'ticket': KioskTicket,
  'queue-display': KioskQueueDisplay,
  'checkin': KioskCheckin,
  'new-patient': KioskNewPatient,
  'info-promo': KioskInfoPromo,
};

function renderScreen(step: KioskStep, props: KioskScreenProps) {
  const Component = SCREEN_MAP[step];
  return createElement(Component, { ...props, key: step });
}

export default function KioskLayout() {
  const [state, setState] = useState<KioskState>(INITIAL_STATE);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const sx = window.innerWidth / DESIGN_W;
      const sy = window.innerHeight / DESIGN_H;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = (step: KioskStep) => {
    setState(prev => ({ ...prev, step }));
  };

  const goBack = () => {
    const prev = STEP_HISTORY[state.step];
    if (prev) {
      setState(s => ({ ...s, step: prev }));
    }
  };

  const showHeader = state.step !== 'welcome';

  return (
    /* Outer shell — fills the real viewport, centers the scaled canvas */
    <div
      className="kiosk-mode select-none"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D0D1A',
      }}
    >
      {/* Inner canvas — always DESIGN_W × DESIGN_H, scaled to fit viewport */}
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          /* Scale around center so it stays centred in the outer shell */
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          backgroundColor: '#F9FAFB',
          flexShrink: 0,
        }}
      >
        {showHeader && <KioskHeader />}

        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {renderScreen(state.step, { state, setState, goTo, goBack })}
          </AnimatePresence>
        </div>

        {/* Version badge — always visible in bottom-right corner of canvas */}
        <div style={{
          position: 'absolute',
          bottom: 10,
          right: 16,
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.04em',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '0 1px 3px rgba(0,0,0,0.4)',
          zIndex: 9999,
        }}>
          e-Kiosk v{APP_VERSION}
        </div>
      </div>
    </div>
  );
}
