import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { Navbar } from '../../components/website/Navbar';
import { Footer } from '../../components/website/Footer';
import { useCMS } from '../../context/CMSContext';

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
          {/* Tooltip */}
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
                {/* Arrow */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t" style={{ borderColor: 'rgba(37,211,102,0.2)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            onClick={() => setTooltip(false)}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#25D366' }} />
            <MessageCircle size={26} className="text-white relative z-10" fill="white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WebsiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAFA' }}>
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
