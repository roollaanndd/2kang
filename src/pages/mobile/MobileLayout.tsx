import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { MobileState } from '../../types/index';
import { APP_VERSION } from '../../version';
import { BottomNav } from '../../components/mobile/BottomNav';
import { NotifToast } from '../../components/mobile/NotifToast';
import { NotificationProvider } from '../../context/NotificationContext';
import { MobileOnboarding } from './screens/MobileOnboarding';
import { MobileLogin } from './screens/MobileLogin';
import { MobileRegister } from './screens/MobileRegister';
import { MobileOTP } from './screens/MobileOTP';
import { MobileCreatePin } from './screens/MobileCreatePin';
import { MobileForgotPassword } from './screens/MobileForgotPassword';
import { MobileHome } from './screens/MobileHome';
import { MobileBooking } from './screens/MobileBooking';
import { MobileDoctorSelect } from './screens/MobileDoctorSelect';
import { MobileSchedule } from './screens/MobileSchedule';
import { MobileBookingConfirm } from './screens/MobileBookingConfirm';
import { MobilePayment } from './screens/MobilePayment';
import { MobileQueue } from './screens/MobileQueue';
import { MobileProfile } from './screens/MobileProfile';
import { MobileMedical } from './screens/MobileMedical';
import { MobileNotifications } from './screens/MobileNotifications';
import { MobileHistory } from './screens/MobileHistory';
import { MobileFamily } from './screens/MobileFamily';
import { MobileLoyalty } from './screens/MobileLoyalty';
import { MobileDoctors } from './screens/MobileDoctors';
import { MobileSelectBranch } from './screens/MobileSelectBranch';
import { MobileDentalTracker } from './screens/MobileDentalTracker';
import { MobileInsurance } from './screens/MobileInsurance';
import { MobileEducation } from './screens/MobileEducation';
import { MobileTelemedicine } from './screens/MobileTelemedicine';
import { MobileChatDetail } from './screens/MobileChatDetail';
import { MobilePromos } from './screens/MobilePromos';
import { MobileVideoCall } from './screens/MobileVideoCall';
import { MobileDoctorDetail } from './screens/MobileDoctorDetail';

function ScreenTransitionBar({ screen }: { screen: string }) {
  const [active, setActive] = useState(false);
  const prevScreen = useRef(screen);

  useEffect(() => {
    if (screen === prevScreen.current) return;
    prevScreen.current = screen;
    setActive(true);
    const t = setTimeout(() => setActive(false), 500);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="mobile-ptbar"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1, transformOrigin: 'left' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
            zIndex: 9999, pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}

const INITIAL_STATE: MobileState = {
  screen: 'onboarding',
  isLoggedIn: false,
  onboardingStep: 0,
};

const HIDE_BOTTOMNAV_SCREENS = new Set([
  'onboarding', 'login', 'register', 'otp', 'create-pin', 'forgot-password',
  'booking-branch', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment',
  'chat-detail', 'video-call',
]);

export function MobileLayout() {
  const [state, setStateRaw] = useState<MobileState>(INITIAL_STATE);

  const setState = useCallback((partial: Partial<MobileState>) => {
    setStateRaw(prev => ({ ...prev, ...partial }));
  }, []);

  const showBottomNav = state.isLoggedIn && !HIDE_BOTTOMNAV_SCREENS.has(state.screen);

  const handleNavigation = (screen: MobileState['screen']) => {
    setState({ screen });
  };

  const renderScreen = () => {
    switch (state.screen) {
      case 'onboarding':
        return <MobileOnboarding state={state} setState={setState} />;
      case 'login':
        return <MobileLogin setState={setState} />;
      case 'register':
        return <MobileRegister setState={setState} />;
      case 'otp':
        return <MobileOTP state={state} setState={setState} />;
      case 'create-pin':
        return <MobileCreatePin state={state} setState={setState} />;
      case 'forgot-password':
        return <MobileForgotPassword setState={setState} />;
      case 'home':
        return <MobileHome state={state} setState={setState} />;
      case 'booking':
        return <MobileBooking state={state} setState={setState} />;
      case 'booking-branch':
        return <MobileSelectBranch state={state} setState={setState} />;
      case 'booking-doctor':
        return <MobileDoctorSelect state={state} setState={setState} />;
      case 'booking-schedule':
        return <MobileSchedule state={state} setState={setState} />;
      case 'booking-confirm':
        return <MobileBookingConfirm state={state} setState={setState} />;
      case 'booking-payment':
        return <MobilePayment state={state} setState={setState} />;
      case 'queue':
        return <MobileQueue state={state} setState={setState} />;
      case 'profile':
        return <MobileProfile state={state} setState={setState} />;
      case 'medical':
        return <MobileMedical state={state} setState={setState} />;
      case 'notifications':
        return <MobileNotifications state={state} setState={setState} />;
      case 'doctors':
        return <MobileDoctors state={state} setState={setState} />;
      case 'doctor-detail':
        return <MobileDoctorDetail state={state} setState={setState} />;
      case 'promos':
        return <MobilePromos state={state} setState={setState} />;
      case 'dental-tracker':
        return <MobileDentalTracker state={state} setState={setState} />;
      case 'insurance':
        return <MobileInsurance state={state} setState={setState} />;
      case 'education':
        return <MobileEducation state={state} setState={setState} />;
      case 'telemedicine':
        return <MobileTelemedicine state={state} setState={setState} />;
      case 'chat-detail':
        return <MobileChatDetail state={state} setState={setState} />;
      case 'video-call':
        return <MobileVideoCall state={state} setState={setState} />;
      case 'history':
        return <MobileHistory state={state} setState={setState} />;
      case 'family':
        return <MobileFamily state={state} setState={setState} />;
      case 'loyalty':
        return <MobileLoyalty state={state} setState={setState} />;
      default:
        return <MobileHome state={state} setState={setState} />;
    }
  };

  return (
    <NotificationProvider>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100dvh',
        background: '#E5E7EB',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 430,
          width: '100%',
          height: '100dvh',
          background: 'white',
          overscrollBehavior: 'contain',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ScreenTransitionBar screen={state.screen} />
        <NotifToast onOpen={() => setState({ screen: 'notifications' })} />

        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <div key={state.screen} style={{ position: 'absolute', inset: 0 }}>
              {renderScreen()}
            </div>
          </AnimatePresence>
        </div>

        {showBottomNav && (
          <BottomNav
            currentScreen={state.screen}
            onNavigate={handleNavigation}
          />
        )}

        {state.isLoggedIn && (
          <div style={{
            position: 'absolute',
            bottom: showBottomNav ? 68 : 8,
            right: 10,
            fontSize: 9,
            fontWeight: 600,
            color: 'rgba(0,0,0,0.2)',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 9999,
          }}>
            v{APP_VERSION}
          </div>
        )}
      </div>
    </div>
    </NotificationProvider>
  );
}

export default MobileLayout;
