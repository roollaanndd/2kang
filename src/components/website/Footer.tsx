import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { OmdcLogo } from '../ui/OmdcLogo';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_HOURS } from '../../data/mockData';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';

export function Footer() {
  return (
    <footer style={{ background: '#F8F9FB', borderTop: '1px solid rgba(233,30,140,0.08)' }}>
      {/* Subtle top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, #06B6D4)` }} />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <OmdcLogo size="md" variant="default" showText={true} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Klinik gigi modern dengan pelayanan terbaik, dokter spesialis berpengalaman, dan teknologi terkini untuk senyum sehat Anda.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Youtube, label: 'Youtube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'rgba(233,30,140,0.08)', color: PINK, border: '1px solid rgba(233,30,140,0.12)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = PINK;
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(233,30,140,0.08)';
                    (e.currentTarget as HTMLElement).style.color = PINK;
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5" style={{ color: '#111827' }}>Navigasi</h3>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Layanan', to: '/services' },
                { label: 'Tim Dokter', to: '/doctors' },
                { label: 'Promo', to: '/promotions' },
                { label: 'Tentang Kami', to: '/about' },
                { label: 'Kontak', to: '/contact' },
                { label: 'Buat Janji', to: '/booking' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200 flex items-center gap-2"
                    style={{ color: '#6B7280' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = PINK; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: PINK }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Links */}
          <div>
            <h3 className="font-bold text-base mb-5" style={{ color: '#111827' }}>Platform Lain</h3>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'Kiosk Antrian', to: '/kiosk', desc: 'Daftar antrian mandiri' },
                { label: 'Aplikasi Mobile', to: '/app', desc: 'Booking dari smartphone' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'white', border: '1px solid rgba(233,30,140,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#FFF0F7';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(233,30,140,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'white';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(233,30,140,0.08)';
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: '#111827' }}>{link.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{link.desc}</div>
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="p-3 rounded-xl"
              style={{ background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.2)' }}
            >
              <p className="text-xs font-semibold" style={{ color: PINK }}>Jam Darurat</p>
              <p className="text-sm font-bold mt-1" style={{ color: '#111827' }}>+62 812 9999 8888</p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>24 Jam / 7 Hari</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-5" style={{ color: '#111827' }}>Hubungi Kami</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, label: 'Alamat', value: CLINIC_ADDRESS },
                { Icon: Phone, label: 'Telepon', value: CLINIC_PHONE, href: `tel:${CLINIC_PHONE}` },
                { Icon: Mail, label: 'Email', value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}` },
                { Icon: Clock, label: 'Jam Buka', value: CLINIC_HOURS },
              ].map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(233,30,140,0.08)', border: '1px solid rgba(233,30,140,0.12)' }}
                  >
                    <Icon size={14} style={{ color: PINK }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: '#111827' }}>{label}</p>
                    {href ? (
                      <a href={href} className="text-sm transition-colors" style={{ color: '#6B7280' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = PINK; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
                      >{value}</a>
                    ) : (
                      <p className="text-sm" style={{ color: '#6B7280' }}>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            © 2025 OMDC Dental. Hak cipta dilindungi.
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: '#9CA3AF' }}>
            Dibuat dengan <Heart size={12} style={{ color: PINK }} /> untuk senyum Anda
          </p>
          <div className="flex gap-4">
            {['Kebijakan Privasi', 'Syarat & Ketentuan'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs transition-colors"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = PINK; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
