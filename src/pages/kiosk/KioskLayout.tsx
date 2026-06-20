import { createElement, useState, type ComponentType, type Dispatch, type SetStateAction } from 'react';
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
    <div
      className="kiosk-mode select-none"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        backgroundColor: '#F9FAFB',
      }}
    >
      {showHeader && <KioskHeader />}

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {renderScreen(state.step, { state, setState, goTo, goBack })}
        </AnimatePresence>
      </div>
    </div>
  );
}
