import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
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

const INITIAL_STATE: MobileState = {
  screen: 'onboarding',
  isLoggedIn: false,
  onboardingStep: 0,
};

const HIDE_BOTTOMNAV_SCREENS = new Set([
  'onboarding', 'login', 'register', 'otp', 'create-pin', 'forgot-password',
  'booking', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment',
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
      case 'promos':
        return <MobileHome state={state} setState={setState} />;
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
        /* Fixed height — NOT minHeight — so child screens have a fixed container to scroll within */
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
        {/* In-app notification banner — slides down within the phone frame */}
        <NotifToast onOpen={() => setState({ screen: 'notifications' })} />

        {/* Screen area — fixed size so child screens can scroll internally */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {/* position:absolute + inset:0 gives each screen a fixed viewport to fill and scroll within */}
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

        {/* Version badge — bottom-right, only on logged-in screens */}
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
