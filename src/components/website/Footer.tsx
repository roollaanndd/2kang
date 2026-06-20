import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { OmdcLogo } from '../ui/OmdcLogo';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_HOURS } from '../../data/mockData';

export function Footer() {
  return (
    <footer style={{ background: '#1A1A2E' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <OmdcLogo size="md" variant="white" showText={true} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#E91E8C';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Navigasi</h3>
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
                    className="text-sm transition-colors duration-200 hover:text-white flex items-center gap-2"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#E91E8C' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Platform Lain</h3>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'Kiosk Antrian', to: '/kiosk', desc: 'Daftar antrian mandiri' },
                { label: 'Aplikasi Mobile', to: '/app', desc: 'Booking dari smartphone' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(233,30,140,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <div className="text-sm font-semibold text-white">{link.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{link.desc}</div>
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="p-3 rounded-xl"
              style={{ background: 'rgba(233,30,140,0.12)', border: '1px solid rgba(233,30,140,0.25)' }}
            >
              <p className="text-xs font-semibold" style={{ color: '#FF6BB5' }}>Jam Darurat</p>
              <p className="text-sm text-white font-bold mt-1">+62 812 9999 8888</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>24 Jam / 7 Hari</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(233,30,140,0.15)' }}
                >
                  <MapPin size={14} style={{ color: '#E91E8C' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">Alamat</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{CLINIC_ADDRESS}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(233,30,140,0.15)' }}
                >
                  <Phone size={14} style={{ color: '#E91E8C' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">Telepon</p>
                  <a
                    href={`tel:${CLINIC_PHONE}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {CLINIC_PHONE}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(233,30,140,0.15)' }}
                >
                  <Mail size={14} style={{ color: '#E91E8C' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">Email</p>
                  <a
                    href={`mailto:${CLINIC_EMAIL}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {CLINIC_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(233,30,140,0.15)' }}
                >
                  <Clock size={14} style={{ color: '#E91E8C' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">Jam Buka</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{CLINIC_HOURS}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2025 OMDC Dental. Hak cipta dilindungi.
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Dibuat dengan <Heart size={12} style={{ color: '#E91E8C' }} /> untuk senyum Anda
          </p>
          <div className="flex gap-4">
            {['Kebijakan Privasi', 'Syarat & Ketentuan'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}
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
