/* eslint-disable */
import { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, ChevronRight, Clock } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import { PROMOTIONS } from '../../../data/mockData';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const INK = '#1A1A2E';

const SERVICE_CATS = ['Semua', 'Scaling', 'Bleaching', 'Behel', 'Tambal', 'Implan'];

const EXTENDED_PROMOS = [
  ...PROMOTIONS,
  {
    id: 'p5', title: 'Paket Keluarga', description: 'Daftar bersama keluarga dan dapatkan diskon spesial untuk setiap anggota baru yang bergabung.', discount: 20, validUntil: '31 Agt 2026', color: 'linear-gradient(135deg, #FF6BB5, #C4B5FD)', bgColor: '#F5F3FF', service: 'Konsultasi',
  },
  {
    id: 'p6', title: 'Promo Ulang Tahun', description: 'Rayakan hari jadimu bersama OMDC! Dapatkan diskon spesial di bulan ulang tahunmu.', discount: 30, validUntil: '31 Des 2026', color: 'linear-gradient(135deg, #EC4899, #F9A8D4)', bgColor: '#FDF2F8', service: 'Semua Layanan',
  },
];

function FeaturedBanner({ onBook }: { onBook: () => void }) {
  const promo = EXTENDED_PROMOS[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ margin: '0 16px 18px', borderRadius: 22, overflow: 'hidden', boxShadow: '0 8px 28px rgba(233,30,140,0.22)' }}
    >
      {/* Gradient header */}
      <div style={{ background: promo.color, padding: '20px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -30, right: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>
                Promo Utama
              </span>
              <p style={{ fontSize: 20, fontWeight: 900, color: 'white', margin: '4px 0 0', lineHeight: 1.2 }}>{promo.title}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 14, padding: '8px 14px', flexShrink: 0 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>-{promo.discount}%</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, margin: 0 }}>{promo.description}</p>
        </div>
      </div>

      {/* White footer */}
      <div style={{ background: 'white', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9CA3AF', fontSize: 11 }}>
          <Clock size={11} /> Berlaku s/d {promo.validUntil}
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => { haptic('medium'); onBook(); }}
          style={{
            padding: '8px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            color: 'white', fontSize: 12, fontWeight: 800,
            boxShadow: '0 4px 12px rgba(233,30,140,0.28)',
          }}
        >
          Klaim Sekarang
        </motion.button>
      </div>
    </motion.div>
  );
}

export function MobilePromos({ state, setState }: Props) {
  const [activeCat, setActiveCat] = useState('Semua');
  const rest = EXTENDED_PROMOS.slice(1);

  const filtered = activeCat === 'Semua'
    ? rest
    : rest.filter(p => p.service.toLowerCase().includes(activeCat.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)', zIndex: 10 }} />

      <MobileHeader title="Promo & Diskon" showBack onBack={() => setState({ screen: 'home' })} />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* Stats banner */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: 'linear-gradient(135deg, #FFF8F4, #FFF0F8)', borderRadius: 16, padding: '12px 16px', border: '1.5px solid rgba(233,30,140,0.12)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: PINK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Tag size={17} color="white" />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: 0 }}>{EXTENDED_PROMOS.length} Promo Aktif</p>
              <p style={{ fontSize: 10, color: '#9CA3AF', margin: 0 }}>Hemat lebih banyak dengan promo eksklusif OMDC</p>
            </div>
          </div>
        </div>

        {/* Featured */}
        <FeaturedBanner onBook={() => setState({ screen: 'booking' })} />

        {/* Category filter */}
        <div style={{ padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4, marginBottom: 16 }}>
          {SERVICE_CATS.map(cat => {
            const active = cat === activeCat;
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.94 }}
                onClick={() => { haptic('light'); setActiveCat(cat); }}
                style={{
                  flexShrink: 0, padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 700,
                  background: active ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : 'white',
                  color: active ? 'white' : '#6B7280',
                  boxShadow: active ? '0 4px 14px rgba(233,30,140,0.25)' : '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Promo list */}
        <div style={{ padding: '0 16px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {/* Color header */}
              <div style={{ background: promo.color, padding: '16px 16px 18px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{promo.service}</span>
                    <p style={{ fontSize: 16, fontWeight: 900, color: 'white', margin: '3px 0 0', lineHeight: 1.2 }}>{promo.title}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '6px 12px', flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>-{promo.discount}%</span>
                  </div>
                </div>
              </div>
              {/* White body */}
              <div style={{ padding: '12px 16px 14px' }}>
                <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.55, margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {promo.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> Berlaku s/d {promo.validUntil}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => { haptic('medium'); setState({ screen: 'booking' }); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '7px 14px', borderRadius: 11, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                      color: 'white', fontSize: 11, fontWeight: 800,
                      boxShadow: '0 3px 10px rgba(233,30,140,0.24)',
                    }}
                  >
                    Klaim <ChevronRight size={11} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Tag size={48} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 12px' }} />
              <p style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 600 }}>Belum ada promo untuk kategori ini</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
