import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Bell, Download, Monitor, ChevronDown } from 'lucide-react';
import { OmdcLogo } from '../ui/OmdcLogo';

const SERVICES_MENU = [
  { label: 'Pemeriksaan Gigi', icon: '🦷', to: '/services' },
  { label: 'Scaling & Polishing', icon: '✨', to: '/services' },
  { label: 'Tambal Gigi', icon: '🔧', to: '/services' },
  { label: 'Cabut Gigi', icon: '❌', to: '/services' },
  { label: 'Behel / Ortodonsi', icon: '😁', to: '/services' },
  { label: 'Implan Gigi', icon: '🔩', to: '/services' },
  { label: 'Perawatan Saluran Akar', icon: '💊', to: '/services' },
  { label: 'Veneer Gigi', icon: '➕', to: '/services' },
];

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Layanan', to: '/services', hasMenu: true },
  { label: 'Dokter', to: '/doctors' },
  { label: 'Promo', to: '/promotions' },
  { label: 'Tentang', to: '/about' },
  { label: 'Kontak', to: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServicesEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
          boxShadow: scrolled ? '0 2px 24px rgba(233,30,140,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-0.5 transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)',
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <OmdcLogo size="md" variant="default" showText={true} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                if (link.hasMenu) {
                  return (
                    <div
                      key={link.to}
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    >
                      <button
                        className="relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-1 group"
                        style={{ color: isActive ? '#E91E8C' : '#374151' }}
                        onClick={() => setServicesOpen((v) => !v)}
                      >
                        <span className="relative z-10">{link.label}</span>
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-200"
                          style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#E91E8C' }}
                        />
                        {isActive && (
                          <span className="absolute inset-0 rounded-xl" style={{ background: '#FFF5F9' }} />
                        )}
                        <span
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: '#FFF5F9' }}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl shadow-2xl overflow-hidden z-50"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(233,30,140,0.12)',
                              minWidth: 420,
                              boxShadow: '0 20px 60px rgba(233,30,140,0.12)',
                            }}
                            onMouseEnter={handleServicesEnter}
                            onMouseLeave={handleServicesLeave}
                          >
                            <div className="p-4">
                              <p className="text-xs font-bold uppercase tracking-widest mb-3 px-2" style={{ color: '#E91E8C' }}>
                                Semua Layanan
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {SERVICES_MENU.map((svc) => (
                                  <Link
                                    key={svc.label}
                                    to={svc.to}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group/item"
                                    style={{ color: '#374151' }}
                                    onMouseEnter={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = '#FFF5F9';
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                                    }}
                                  >
                                    <span className="text-lg leading-none">{svc.icon}</span>
                                    <span className="text-sm font-semibold">{svc.label}</span>
                                  </Link>
                                ))}
                              </div>
                              <div
                                className="mt-3 mx-1 p-3 rounded-xl flex items-center justify-between"
                                style={{ background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.15)' }}
                              >
                                <div>
                                  <p className="text-xs font-bold" style={{ color: '#1A1A2E' }}>Butuh rekomendasi?</p>
                                  <p className="text-xs text-gray-500">Konsultasi gratis dengan dokter kami</p>
                                </div>
                                <Link
                                  to="/booking"
                                  className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                                  style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                                >
                                  Mulai
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 group"
                    style={{ color: isActive ? '#E91E8C' : '#374151' }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl" style={{ background: '#FFF5F9' }} />
                    )}
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: '#FFF5F9' }}
                    />
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#E91E8C' }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Kiosk link */}
              <Link
                to="/kiosk"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-50"
                style={{ color: '#374151' }}
              >
                <Monitor size={15} style={{ color: '#4FC3F7' }} />
                Coba Kiosk
              </Link>

              {/* Download App */}
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-50"
                style={{ color: '#374151' }}
              >
                <Download size={15} style={{ color: '#10B981' }} />
                Download App
              </Link>

              {/* Bell with badge */}
              <button
                className="relative p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50"
                aria-label="Notifikasi"
              >
                <Bell size={20} style={{ color: '#374151' }} />
                <span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-black"
                  style={{ background: '#E91E8C', fontSize: 9 }}
                >
                  1
                </span>
              </button>

              {/* CTA */}
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  boxShadow: '0 4px 14px rgba(233,30,140,0.3)',
                }}
              >
                Buat Janji
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl transition-colors duration-200"
              style={{ color: '#E91E8C' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 lg:hidden flex flex-col"
            style={{ background: 'white', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <OmdcLogo size="sm" variant="default" showText={true} />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl"
                style={{ background: '#FFF5F9', color: '#E91E8C' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer nav links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      color: isActive ? '#E91E8C' : '#374151',
                      background: isActive ? '#FFF5F9' : 'transparent',
                    }}
                  >
                    {link.label}
                    <ChevronRight size={16} style={{ color: '#E91E8C', opacity: isActive ? 1 : 0.3 }} />
                  </Link>
                );
              })}

              <div className="pt-2 pb-1" style={{ borderTop: '1px solid #f3f4f6' }}>
                <p className="text-xs font-bold uppercase tracking-widest px-4 py-2" style={{ color: '#9CA3AF' }}>
                  Platform Lain
                </p>
                <Link
                  to="/kiosk"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#374151' }}
                >
                  <Monitor size={16} style={{ color: '#4FC3F7' }} />
                  Coba Kiosk
                </Link>
                <Link
                  to="/app"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#374151' }}
                >
                  <Download size={16} style={{ color: '#10B981' }} />
                  Download App
                </Link>
              </div>
            </div>

            {/* Drawer footer CTA */}
            <div className="px-4 py-5" style={{ borderTop: '1px solid #f3f4f6' }}>
              <Link
                to="/booking"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  boxShadow: '0 4px 14px rgba(233,30,140,0.3)',
                }}
              >
                Buat Janji Sekarang
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
