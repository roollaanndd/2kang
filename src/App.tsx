import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CMSProvider } from './context/CMSContext';
import { LanguageProvider } from './context/LanguageContext';

// Website — named exports
const WebsiteLayout = lazy(() =>
  import('./pages/website/WebsiteLayout').then(m => ({ default: m.WebsiteLayout }))
);
const Home = lazy(() =>
  import('./pages/website/Home').then(m => ({ default: m.Home }))
);
const Doctors = lazy(() =>
  import('./pages/website/Doctors').then(m => ({ default: m.Doctors }))
);
const Services = lazy(() =>
  import('./pages/website/Services').then(m => ({ default: m.Services }))
);
const Booking = lazy(() =>
  import('./pages/website/Booking').then(m => ({ default: m.Booking }))
);
const Promotions = lazy(() =>
  import('./pages/website/Promotions').then(m => ({ default: m.Promotions }))
);
const About = lazy(() =>
  import('./pages/website/About').then(m => ({ default: m.About }))
);
const Contact = lazy(() =>
  import('./pages/website/Contact').then(m => ({ default: m.Contact }))
);

// E-Kiosk
const KioskLayout = lazy(() => import('./pages/kiosk/KioskLayout'));

// Mobile PWA
const MobileLayout = lazy(() => import('./pages/mobile/MobileLayout'));

// Admin CMS
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF8F4' }}>
      <div className="text-center">
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.5 2 6 4.5 6 8c0 2 .8 3.5 1.5 5 .7 1.5 1 2.5 1 4 0 .6.4 1 1 1h5c.6 0 1-.4 1-1 0-1.5.3-2.5 1-4 .7-1.5 1.5-3 1.5-5 0-3.5-2.5-6-6-6z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
        <div
          className="w-8 h-8 mx-auto border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#E91E8C', borderTopColor: 'transparent' }}
        />
        <p className="mt-3 font-medium" style={{ color: '#E91E8C' }}>Memuat...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<WebsiteLayout />}>
              <Route index element={<Home />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="services" element={<Services />} />
              <Route path="booking" element={<Booking />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* E-Kiosk */}
            <Route path="/kiosk/*" element={<KioskLayout />} />

            {/* Mobile PWA */}
            <Route path="/mobile/*" element={<MobileLayout />} />
            <Route path="/app/*" element={<MobileLayout />} />

            {/* Admin CMS */}
            <Route path="/admin/*" element={<AdminLayout />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
    </CMSProvider>
  );
}
