import { createElement, useCallback, useEffect, useRef, useState, type ComponentType, type Dispatch, type SetStateAction } from 'react';
import { APP_VERSION } from '../../version';
import { AnimatePresence, motion } from 'motion/react';
import { Hand } from 'lucide-react';
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
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';
import { kioskSound } from '../../lib/kioskSound';
import { KioskOrientationProvider, type KioskOrientation } from '../../context/KioskOrientationContext';

/* Accessibility-mode persistence */
const A11Y_STORAGE_KEY = 'omdc:kiosk:a11y';

function readA11yPref(): boolean {
  try {
    return localStorage.getItem(A11Y_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeA11yPref(on: boolean): void {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, on ? '1' : '0');
  } catch {
    /* no-op — private mode / storage unavailable */
  }
}

/* Design canvas — screens are authored landscape; portrait swaps the axes.
   Both orientations are scaled to fit the real viewport (see scale effect). */
const LANDSCAPE = { w: 1280, h: 800 };
const PORTRAIT = { w: 820, h: 1180 };

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
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Signature top gradient strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${primaryColor}, #FF6BB5, #06B6D4)`, zIndex: 20 }} />

      {/* Animated premium dental-geometry background — light, no blur */}
      <AnimatedDentalBg />

      {/* Logo / tooth */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 96, marginBottom: 24, position: 'relative', zIndex: 10 }}
      >
        🦷
      </motion.div>

      {/* Clock */}
      <div className="kd" style={{ fontSize: 96, fontWeight: 900, color: '#0D1421', letterSpacing: '-3px', lineHeight: 1, marginBottom: 10, fontVariantNumeric: 'tabular-nums', position: 'relative', zIndex: 10 }}>
        {timeStr}
      </div>
      <div style={{ fontSize: 22, color: '#9CA3AF', marginBottom: 48, fontWeight: 500, position: 'relative', zIndex: 10 }}>
        {dateStr}
      </div>

      {/* Tap to start */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, #FF6BB5)`,
          borderRadius: 60, padding: '20px 60px',
          fontSize: 24, fontWeight: 800, color: 'white',
          boxShadow: `0 16px 50px ${primaryColor}40`,
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 14,
        }}
      >
        <Hand size={26} strokeWidth={2.2} /> Sentuh Layar untuk Memulai
      </motion.div>

      {/* Version */}
      <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 12, color: 'rgba(0,0,0,0.25)', fontWeight: 600, zIndex: 10 }}>
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
  const [a11y, setA11y] = useState<boolean>(readA11yPref);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutSec = cms.kioskSettings?.idleTimeoutSeconds ?? 30;
  const primary = cms.appearance?.primaryColor ?? '#E91E8C';

  /* Auto-detect orientation from the real viewport — no manual selection needed. */
  const [orientation, setOrientation] = useState<KioskOrientation>(() =>
    window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'
  );
  const design = orientation === 'portrait' ? PORTRAIT : LANDSCAPE;

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

  /* Single effect: re-evaluate orientation AND scale on every resize / rotate. */
  useEffect(() => {
    const update = () => {
      const newOri: KioskOrientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
      const d = newOri === 'portrait' ? PORTRAIT : LANDSCAPE;
      setOrientation(newOri);
      setScale(Math.min(window.innerWidth / d.w, window.innerHeight / d.h));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  const handleWake = useCallback(() => {
    setIdle(false);
    setState(INITIAL_STATE);
    resetTimer();
  }, [resetTimer]);

  const toggleA11y = useCallback(() => {
    kioskSound('tap');
    setA11y(prev => {
      const next = !prev;
      writeA11yPref(next);
      return next;
    });
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
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F4F6FB 0%, #FDF2F8 50%, #ECFEFF 100%)',
      }}
    >
      {/* Stitch design-system tokens (OMDC Light Organic 2026) — scoped to the kiosk.
          Headlines use the Plus Jakarta Sans display face (loaded in index.html),
          body keeps Inter. Mirrors the website/mobile Stitch integration. */}
      <style>{`
        .kiosk-mode .kd {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }
        .kiosk-mode .kd-grad {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      `}</style>

      {/* Accessibility-mode focus affordance — scoped to the canvas, purely presentational */}
      {a11y && (
        <style>{`
          .kiosk-a11y :focus { outline: 4px solid #06B6D4 !important; outline-offset: 2px !important; }
          .kiosk-a11y :focus-visible { outline: 4px solid #06B6D4 !important; outline-offset: 2px !important; }
          .kiosk-a11y button, .kiosk-a11y [role="button"] { outline-offset: 2px; }
          .kiosk-a11y button:focus, .kiosk-a11y [role="button"]:focus { box-shadow: 0 0 0 4px rgba(6,182,212,0.45) !important; }
        `}</style>
      )}

      {/* Inner canvas — design.w × design.h (orientation-aware), scaled to fit viewport */}
      <div
        className={a11y ? 'kiosk-a11y' : undefined}
        style={{
          width: design.w,
          height: design.h,
          /* Scale around center so it stays centred in the outer shell */
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          /* High-contrast / high-readability treatment when accessibility mode is ON.
             Purely presentational — does not affect layout or the scale math. */
          filter: a11y ? 'contrast(1.18) saturate(1.12)' : undefined,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          backgroundColor: '#F9FAFB',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <KioskOrientationProvider orientation={orientation}>
          {showHeader && <KioskHeader />}

          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait">
              {renderScreen(state.step, { state, setState, goTo, goBack })}
            </AnimatePresence>
          </div>
        </KioskOrientationProvider>

        {/* Accessibility-mode active indicator */}
        {a11y && !idle && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 120,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 16px',
            borderRadius: 999,
            background: 'linear-gradient(135deg, #06B6D4, #0EA5C4)',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.08em',
            boxShadow: '0 6px 20px rgba(6,182,212,0.35)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="4" r="2" fill="#FFFFFF" />
              <path d="M4 8h16M12 8v5M12 13l-3 7M12 13l3 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            MODE AKSESIBILITAS AKTIF
          </div>
        )}

        {/* Accessibility toggle — bottom-left, on-brand, light theme */}
        {!idle && (
          <button
            type="button"
            onClick={toggleA11y}
            aria-pressed={a11y}
            aria-label={a11y ? 'Matikan Mode Aksesibilitas' : 'Aktifkan Mode Aksesibilitas'}
            title={a11y ? 'Matikan Mode Aksesibilitas' : 'Aktifkan Mode Aksesibilitas'}
            style={{
              position: 'absolute',
              bottom: 14,
              left: 16,
              zIndex: 120,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 999,
              border: a11y ? '2px solid #06B6D4' : '1.5px solid rgba(233,30,140,0.25)',
              background: a11y ? '#ECFEFF' : '#FFFFFF',
              color: a11y ? '#0E7490' : '#E91E8C',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: a11y ? '0 6px 20px rgba(6,182,212,0.25)' : '0 4px 14px rgba(233,30,140,0.15)',
              userSelect: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="4" r="2.2" fill="currentColor" />
              <path d="M4 8h16M12 8v5.5M12 13.5l-3.2 7M12 13.5l3.2 7"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Aksesibilitas
          </button>
        )}

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
