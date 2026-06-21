import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { Navbar } from '../../components/website/Navbar';
import { Footer } from '../../components/website/Footer';
import { useCMS } from '../../context/CMSContext';
import { SplashScreen } from '../../components/ui/SplashScreen';
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';

// ── Page-transition loading bar ──────────────────────────────────────────────
function PageTransitionBar() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;
    setActive(true);
    const t = setTimeout(() => setActive(false), 650);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="ptbar"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1, transformOrigin: 'left' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`,
            zIndex: 9990, pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}

function WhatsAppButton() {
  const { cms } = useCMS();
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const wa = cms.contact.whatsapp;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (!wa) return null;

  const href = `https://wa.me/${wa.replace(/[^0-9]/g, '')}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative bg-white rounded-2xl shadow-xl px-4 py-3 max-w-[200px]"
                style={{ border: '1px solid rgba(37,211,102,0.2)' }}
              >
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <X size={10} className="text-gray-600" />
                </button>
                <p className="text-xs font-semibold text-gray-800 leading-snug">Ada pertanyaan? Chat kami!</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Respon cepat via WhatsApp</p>
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t" style={{ borderColor: 'rgba(37,211,102,0.2)' }} />
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            onClick={() => setTooltip(false)}
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#25D366' }} />
            <MessageCircle size={26} className="text-white relative z-10" fill="white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 60, pointerEvents: 'none' }} aria-hidden>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        transition: 'width 0.1s linear', willChange: 'width',
      }} />
    </div>
  );
}

export function WebsiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* First-load splash */}
      <SplashScreen />

      {/* Fixed dental-geometry background — visible on all pages */}
      <div
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          overflow: 'hidden', opacity: 0.55,
        }}
        aria-hidden
      >
        <AnimatedDentalBg size="lg" />
      </div>

      {/* Page-transition bar */}
      <PageTransitionBar />

      <div className="min-h-screen flex flex-col" style={{ background: '#FAFAFA', position: 'relative', zIndex: 1 }}>
        <ReadingProgressBar />
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-18">
          <div key={location.pathname}>
            <Outlet />
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
