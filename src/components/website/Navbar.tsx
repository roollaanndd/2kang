import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { OmdcLogo } from '../ui/OmdcLogo';

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Layanan', to: '/services' },
  { label: 'Dokter', to: '/doctors' },
  { label: 'Promo', to: '/promotions' },
  { label: 'Tentang', to: '/about' },
  { label: 'Kontak', to: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
        boxShadow: scrolled ? '0 2px 24px rgba(233,30,140,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
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
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 group"
                  style={{
                    color: isActive ? '#E91E8C' : '#374151',
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-xl"
                      style={{ background: '#FFF5F9' }}
                    />
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

          {/* CTA Button */}
          <div className="hidden lg:block">
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

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '400px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 py-4 border-t border-gray-100 bg-white space-y-1">
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
          <div className="pt-2">
            <Link
              to="/booking"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                boxShadow: '0 4px 14px rgba(233,30,140,0.3)',
              }}
            >
              Buat Janji Sekarang
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
