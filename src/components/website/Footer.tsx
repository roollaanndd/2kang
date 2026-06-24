import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, Heart, ArrowRight, Calendar } from 'lucide-react';
import { OmdcLogo } from '../ui/OmdcLogo';
import { IconLocation, IconPhone, IconMail, IconClock, IconKiosk, IconMobileApp } from '../ui/OmdcIcons';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_HOURS } from '../../data/mockData';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';

const NAV_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Layanan', to: '/services' },
  { label: 'Tim Dokter', to: '/doctors' },
  { label: 'Promo', to: '/promotions' },
  { label: 'Booking', to: '/booking' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Kontak', to: '/contact' },
];

const CONTACT_ITEMS = [
  { Icon: IconLocation, label: 'Alamat', value: CLINIC_ADDRESS },
  { Icon: IconPhone, label: 'Telepon', value: CLINIC_PHONE, href: `tel:${CLINIC_PHONE}` },
  { Icon: IconMail, label: 'Email', value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}` },
  { Icon: IconClock, label: 'Jam Buka', value: CLINIC_HOURS },
];

export function Footer() {
  return (
    <footer style={{ background: '#FFFFFF' }}>
      {/* ── PRE-FOOTER CTA BAND ─────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 50%, ${AQUA} 100%)`,
        padding: '44px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle geometric marks on the CTA band */}
        <div style={{ position: 'absolute', top: -24, right: 80, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 200, width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 10, left: 60, width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.10)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Jadwalkan Kunjungan Anda
              </p>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: 'white', lineHeight: 1.15, margin: 0 }}>
                Senyum Sehat Dimulai<br />dari Satu Langkah Kecil
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                to="/booking"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', borderRadius: 14,
                  background: 'white', color: PINK,
                  fontWeight: 800, fontSize: 15, textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
              >
                <Calendar size={17} />
                Booking Sekarang
              </Link>
              <a
                href={`tel:${CLINIC_PHONE}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 24px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.18)', color: 'white',
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                }}
              >
                <IconPhone size={16} color="#FFFFFF" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ─────────────────────────────────────────────── */}
      <div style={{ background: '#F8F9FB', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        {/* Signature gradient strip */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, alignItems: 'start' }}>

            {/* ── Brand Column ── */}
            <div style={{ gridColumn: 'span 1' }}>
              <OmdcLogo size="md" variant="default" showText />
              <p style={{ marginTop: 16, fontSize: 13.5, lineHeight: 1.7, color: '#6B7280', maxWidth: 240 }}>
                Klinik gigi modern dengan teknologi terkini, dokter spesialis berpengalaman, dan pelayanan terbaik untuk senyum sehat Anda.
              </p>
              {/* Social */}
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Youtube, label: 'Youtube' },
                ].map(({ Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    aria-label={label}
                    whileHover={{ y: -2, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: 40, height: 40, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'white', color: PINK,
                      border: `1.5px solid rgba(233,30,140,0.14)`,
                      boxShadow: '0 2px 8px rgba(233,30,140,0.08)',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
              {/* Emergency pill */}
              <div style={{
                marginTop: 20, padding: '12px 16px', borderRadius: 14,
                background: 'rgba(233,30,140,0.06)',
                border: `1px solid rgba(233,30,140,0.15)`,
              }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: PINK, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Layanan Darurat 24 / 7
                </p>
                <p style={{ fontSize: 15, fontWeight: 900, color: DARK }}>+62 812 9999 8888</p>
              </div>
            </div>

            {/* ── Navigation Column ── */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: DARK, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Navigasi
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_LINKS.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 14, color: '#6B7280', textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = PINK)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, flexShrink: 0 }} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Platform Links ── */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: DARK, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Platform
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Kiosk Antrian', to: '/kiosk', desc: 'Daftar antrian mandiri di klinik', Icon: IconKiosk },
                  { label: 'Aplikasi Mobile', to: '/app', desc: 'Booking & pantau antrian dari mana saja', Icon: IconMobileApp },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '14px 16px', borderRadius: 14,
                      background: 'white', textDecoration: 'none',
                      border: '1px solid rgba(233,30,140,0.08)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(233,30,140,0.22)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(233,30,140,0.10)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(233,30,140,0.08)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    }}
                  >
                    <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 11, background: 'rgba(233,30,140,0.07)', border: '1px solid rgba(233,30,140,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><link.Icon size={20} color={PINK} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 3 }}>{link.label}</div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF', lineHeight: 1.4 }}>{link.desc}</div>
                    </div>
                    <ArrowRight size={14} color={PINK} style={{ flexShrink: 0, marginTop: 2 }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Contact Column ── */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: DARK, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Hubungi Kami
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                  <li key={label} style={{ display: 'flex', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(233,30,140,0.07)',
                      border: '1px solid rgba(233,30,140,0.12)',
                      marginTop: 1,
                    }}>
                      <Icon size={15} color={PINK} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10.5, fontWeight: 700, color: DARK, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{ fontSize: 13.5, color: '#6B7280', textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = PINK)}
                          onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.5 }}>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: '#FFFFFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>
              © {new Date().getFullYear()} OMDC Dental. Hak cipta dilindungi.
            </p>
            <p style={{ fontSize: 12, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 5 }}>
              Dibuat dengan <Heart size={12} color={PINK} fill={PINK} /> untuk senyum Indonesia
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Kebijakan Privasi', 'Syarat & Ketentuan'].map(t => (
                <a
                  key={t} href="#"
                  style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = PINK)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
