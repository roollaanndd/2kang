import { createElement, useCallback, useEffect, useRef, useState, type ComponentType, type Dispatch, type SetStateAction } from 'react';
import { APP_VERSION } from '../../version';
import { AnimatePresence, motion } from 'motion/react';
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
import { useCMS } from '../../context/CMSContext';

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

// ─── IDLE SCREENSAVER ─────────────────────────────────────────────────────────
function IdleScreensaver({ onWake, primaryColor }: { onWake: () => void; primaryColor: string }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div
      key="screensaver"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onWake}
      onTouchStart={onWake}
      style={{
        position: 'absolute', inset: 0, zIndex: 9000,
        background: `linear-gradient(145deg, #0D0D1A 0%, #1a0a2e 40%, ${primaryColor}22 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: primaryColor, top: -200, right: -200,
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: '#4FC3F7', bottom: -150, left: -100,
          filter: 'blur(60px)',
        }}
      />

      {/* Logo / tooth */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 96, marginBottom: 24 }}
      >
        🦷
      </motion.div>

      {/* Clock */}
      <div style={{ fontSize: 88, fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1, marginBottom: 8 }}>
        {timeStr}
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginBottom: 48, fontWeight: 500 }}>
        {dateStr}
      </div>

      {/* Tap to start */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, #FF6BB5)`,
          borderRadius: 50, padding: '18px 56px',
          fontSize: 24, fontWeight: 700, color: 'white',
          boxShadow: `0 8px 40px ${primaryColor}60`,
        }}
      >
        ✋ Sentuh Layar untuk Memulai
      </motion.div>

      {/* Version */}
      <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
        e-Kiosk v{APP_VERSION}
      </div>
    </motion.div>
  );
}

export default function KioskLayout() {
  const { cms } = useCMS();
  const [state, setState] = useState<KioskState>(INITIAL_STATE);
  const [scale, setScale] = useState(1);
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutSec = cms.kioskSettings?.idleTimeoutSeconds ?? 30;
  const primary = cms.appearance?.primaryColor ?? '#E91E8C';

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIdle(false);
    timerRef.current = setTimeout(() => setIdle(true), timeoutSec * 1000);
  }, [timeoutSec]);

  useEffect(() => {
    resetTimer();
    const events = ['click', 'touchstart', 'mousemove', 'keydown'] as const;
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer]);

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

  const handleWake = useCallback(() => {
    setIdle(false);
    setState(INITIAL_STATE);
    resetTimer();
  }, [resetTimer]);

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

        {/* Version badge */}
        {!idle && (
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 16,
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(0,0,0,0.25)',
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 100,
          }}>
            e-Kiosk v{APP_VERSION}
          </div>
        )}

        {/* Idle screensaver overlay */}
        <AnimatePresence>
          {idle && <IdleScreensaver onWake={handleWake} primaryColor={primary} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
