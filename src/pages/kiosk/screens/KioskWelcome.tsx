import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { CURRENT_QUEUE, SERVICES } from '../../../data/mockData';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskScreenProps } from '../KioskLayout';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';

const SERVICE_ICONS: Record<string, string> = {
  s1: 'M9 3C7 3 5.5 4.5 5.5 6.5c0 1.5.6 2.7 1.2 4 .7 1.4 1.1 2.9 1.1 5 0 .8.4 1.5 1 1.5h6.4c.6 0 1-.7 1-1.5 0-2.1.4-3.6 1.1-5 .6-1.3 1.2-2.5 1.2-4C18.5 4.5 17 3 15 3c-.8 0-1.6.3-2.1.9-.3.2-.5.4-.9.4s-.6-.2-.9-.4C10.6 3.3 9.8 3 9 3z',
  s2: 'M12 4c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 8.5 12 4 12 4z',
  s3: 'M9 3C7 3 5.5 4.5 5.5 6.5c0 1.5.6 2.7 1.2 4 .7 1.4 1.1 2.9 1.1 5 0 .8.4 1.5 1 1.5h6.4c.6 0 1-.7 1-1.5 0-2.1.4-3.6 1.1-5 .6-1.3 1.2-2.5 1.2-4C18.5 4.5 17 3 15 3c-.8 0-1.6.3-2.1.9-.3.2-.5.4-.9.4s-.6-.2-.9-.4C10.6 3.3 9.8 3 9 3z M9.5 7.5h5v4h-5z',
  s4: 'M12 7V2M9.5 4.5L12 2l2.5 2.5 M9 8C7 8 5.5 9.3 5.5 11c0 1.2.5 2.3 1.1 3.5.7 1.3 1.1 2.6 1.1 4.3 0 .5.4.7 1 .7h6.6c.6 0 1-.2 1-.7 0-1.7.4-3 1.1-4.3.6-1.2 1.1-2.3 1.1-3.5C18.5 9.3 17 8 15 8c-.8 0-1.6.3-2.1.9-.3.2-.5.3-.9.3s-.6-.1-.9-.3C10.6 8.3 9.8 8 9 8z',
  s5: 'M4 14 Q4 8 7 8 Q10 8 10 12 Q10 8 12 8 Q14 8 14 12 Q14 8 17 8 Q20 8 20 14 Q12 17 4 14z',
  s6: 'M9.5 4h5l.5 2h-6l.5-2z M12 6v12',
};

function ServiceMiniIcon({ id, size = 18 }: { id: string; size?: number }) {
  const path = SERVICE_ICONS[id] ?? SERVICE_ICONS.s1;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{
        fontSize: 52, fontWeight: 900, color: PINK, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums', letterSpacing: -2,
        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
      }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginTop: 4 }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

const STATS = [
  { icon: '👥', v: '10.000+', l: 'Pasien Puas' },
  { icon: '🦷', v: '8', l: 'Dokter Spesialis' },
  { icon: '📅', v: 'Senin–Sabtu', l: 'Buka Setiap Hari' },
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const portrait = useIsPortrait();
  const [lang, setLang] = useState<'id' | 'en'>('id');

  const handleCheckin = () => {
    kioskSound('tap');
    setState(prev => ({ ...prev, language: lang }));
    goTo('language');
  };

  const handleQueue = (e: MouseEvent) => {
    e.stopPropagation();
    kioskSound('select');
    goTo('queue-display');
  };

  const handleServiceClick = (e: MouseEvent, svcId: string) => {
    e.stopPropagation();
    kioskSound('select');
    const svc = SERVICES.find(s => s.id === svcId);
    if (svc) setState(prev => ({ ...prev, selectedService: svc }));
    goTo('service-select');
  };

  const LABEL = {
    id: { welcome: '— SELAMAT DATANG —', title: 'Selamat\nDatang!', sub: 'Klinik Gigi Keluarga Terpercaya', checkin: 'MULAI CHECK-IN', cekAntrian: 'Cek Antrian', hint: 'Ketuk layar untuk memulai', nowServing: 'Antrian Saat Ini' },
    en: { welcome: '— WELCOME —', title: 'Welcome!', sub: 'Your Trusted Family Dental Clinic', checkin: 'START CHECK-IN', cekAntrian: 'Check Queue', hint: 'Tap screen to start', nowServing: 'Now Serving' },
  }[lang];

  const kiosk6Services = SERVICES.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: portrait ? 'column' : 'row',
        position: 'relative', overflow: 'hidden',
        background: '#FFF8F4',
      }}
    >
      {/* 3px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30,
      }} />

      {/* ── LEFT PANEL: Pink gradient ── */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: portrait ? '100%' : '42%', flexShrink: 0,
          height: portrait ? '40%' : '100%',
          background: `linear-gradient(160deg, ${PINK} 0%, ${ROSE} 65%, #ffd8e6 100%)`,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: portrait ? '32px 24px 24px' : '52px 40px 40px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Ambient glow spots */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
          <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
            <rect width={36} height={36} rx={10} fill="rgba(255,255,255,0.22)" />
            <path d="M12 10C10 10 8.5 11.8 8.5 14c0 2 .7 3.7 1.5 5.5.8 1.7 1.3 3.4 1.3 5.8 0 .4.3.7.7.7h8c.4 0 .7-.3.7-.7 0-2.4.5-4.1 1.3-5.8C22.8 17.7 23.5 16 23.5 14 23.5 11.8 22 10 20 10c-.9 0-1.8.4-2.3 1-.3.3-.5.4-.7.4s-.4-.1-.7-.4C15.8 10.4 14.9 10 14 10z"
              fill="white" opacity={0.9} />
            <path d="M16 16.5l1.5 1.5 2.5-3" stroke="rgba(233,30,140,0.8)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>OMDC</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em' }}>DENTAL</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            {LABEL.welcome}
          </div>
          <h1 style={{
            fontSize: portrait ? 42 : 64, fontWeight: 900, lineHeight: 1.05,
            color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif',
            letterSpacing: -2, margin: 0, whiteSpace: 'pre-line',
          }}>
            {LABEL.title}
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.80)', fontWeight: 500, marginTop: 10 }}>
            {LABEL.sub}
          </p>
        </div>

        {/* Stat chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 2 }}>
          {STATS.map(s => (
            <div key={s.v} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.30)',
              borderRadius: 14, padding: '10px 14px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Language toggle (bottom) */}
        <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 2 }}>
          {(['id', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={e => { e.stopPropagation(); kioskSound('tap'); setLang(l); }}
              style={{
                padding: '8px 22px', borderRadius: 100, fontSize: 13, fontWeight: 700,
                background: lang === l ? 'white' : 'rgba(255,255,255,0.18)',
                color: lang === l ? PINK : 'white',
                border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.30)',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em',
                transition: 'all 0.18s',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT PANEL: Cream editorial ── */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleCheckin}
        style={{
          flex: 1, height: '100%', cursor: 'pointer',
          background: '#FFF8F4',
          display: 'flex', flexDirection: 'column', gap: portrait ? 16 : 20,
          padding: portrait ? '24px 24px 24px' : '48px 48px 36px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Subtle tooth pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='70' viewBox='0 0 60 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C22 5 16 12 16 21c0 6 2 10 5 16 3 5 4 10 4 16 0 2 1.5 3 3 3h4c1.5 0 3-1 3-3 0-6 1-11 4-16 3-6 5-10 5-16C44 12 38 5 30 5z' fill='%23E91E8C'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 70px',
        }} />

        {/* Top row: clock + queue chip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <LiveClock />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(233,30,140,0.08)',
            border: `1px solid rgba(233,30,140,0.18)`,
            borderRadius: 20, padding: '8px 16px',
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: PINK, display: 'block', flexShrink: 0 }}
            />
            <span style={{ fontSize: 14, fontWeight: 700, color: PINK }}>
              {LABEL.nowServing}: {CURRENT_QUEUE}
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 2 }}>
          {/* Pulse rings behind primary button */}
          <div style={{ position: 'relative' }}>
            {[1, 2].map(n => (
              <motion.div
                key={n}
                animate={{ scale: [1, 1.05 + n * 0.03, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.6 }}
                style={{
                  position: 'absolute', inset: -(n * 8), borderRadius: 24,
                  border: `1.5px solid rgba(233,30,140,${n === 1 ? '0.30' : '0.15'})`,
                  pointerEvents: 'none',
                }}
              />
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckin}
              style={{
                width: '100%', height: 72,
                background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 100%)`,
                border: 'none', borderRadius: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                boxShadow: '0 10px 32px rgba(233,30,140,0.40), 0 2px 8px rgba(233,30,140,0.20)',
                position: 'relative', zIndex: 1,
              }}
            >
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-3-8-10V5l8-3 8 3v7c0 7-8 10-8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: 0.5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {LABEL.checkin}
              </span>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleQueue}
            style={{
              width: '100%', height: 56,
              background: 'white', border: `2px solid rgba(233,30,140,0.20)`,
              borderRadius: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: PINK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {LABEL.cekAntrian}
            </span>
          </motion.button>
        </div>

        {/* Service quick-access grid (3×2) */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, height: '100%' }}>
            {kiosk6Services.map((svc, i) => (
              <motion.button
                key={svc.id}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={e => handleServiceClick(e, svc.id)}
                style={{
                  background: 'white', border: `1px solid rgba(233,30,140,0.10)`,
                  borderRadius: 18, cursor: 'pointer', padding: '14px 10px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  minHeight: 80,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(233,30,140,0.28)',
                }}>
                  <ServiceMiniIcon id={svc.id} size={20} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: DARK, textAlign: 'center', lineHeight: 1.2 }}>
                  {svc.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Hint text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            position: 'relative', zIndex: 2,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: PINK }}>{LABEL.hint}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
