/* eslint-disable */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, HelpCircle, Star, CheckCircle, ArrowUpRight, ArrowDownLeft,
  CalendarPlus, UserPlus, ChevronDown,
} from 'lucide-react';
import type { MobileState } from '../../../types';
import { haptic } from '../../../lib/haptics';

interface MobileLoyaltyProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const INK = '#0D1421';
const GREY = '#6B7280';
const GREEN = '#D4A017';

const START_POINTS = 2450;
const NEXT_TIER = 'Platinum';
const NEXT_TIER_AT = 3000;

interface Reward {
  id: string;
  label: string;
  desc: string;
  cost: number;
  img: string;
}

const REWARDS: Reward[] = [
  {
    id: 'scaling',
    label: 'Scaling Gigi Gratis',
    desc: 'Pembersihan karang gigi menyeluruh.',
    cost: 1500,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKN6Qw9GHlnHepjBwCx7DBLEhU2q0wrjBrFsic6qATYGWMX2cMf1mevgWonyqPbcYSQ-GGZIMfu57H-2ISoH89bXk41tFa4MMCLyFrMHyQHpdIf7rQCClxsOGFuukApDeakCprq8p-jP_YGamQNayBP2yyQinD1D-_7pBivxSApIzFWBhy2wExpzaRiQZ4XQiIc9jqO2LXrASuGHm4JQBJajS_N1cl3sRy5SKtU-QtGvMwnuus5anLy9cf7p1YuFOOFS0LmWfq_bc',
  },
  {
    id: 'voucher50',
    label: 'Voucher Rp 50rb',
    desc: 'Potongan harga untuk perawatan.',
    cost: 500,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu936zTuo53v2NkJr1evq-Z2e0vC5-ipPx4oDXG0b-ITmoNk_m_MN1bGiAhGYB4chQ-hO6bKNzUFL1qjjEojYGvPspv3SWpn7Rn1rdGRe5DFGT58rgG4f4gumnYk8N0S4GCpOQjtWLSYmx4xjRzqdPcc5EdNFiNSkJ0LKnQV4P_09AHS0NNxGRPCGNGPsa_UE6zozNUywsh9bgalTOqhA_VYi5VXYA2b2Spdn2zYZMkQbMcCuh7SjjLoiGu7slbqieOPYZjmISn9g',
  },
  {
    id: 'kit',
    label: 'Kit Perawatan Gigi Premium',
    desc: 'Eksklusif merchandise OMDC.',
    cost: 800,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5IhizXxtomzoO4fbhWD0ESg2__XNijyJgo-V2PhQ4l8xPNBLF6REO9XLBlzwtyZx4_LCifd64MEd6n-m4s3MXuB3WhBEjEobSu1J2oSm4VO47gevbt2rCJApnFgY8niXi3X-LD825khO88JbIvJ0R8yDudnOd7NKgk3nUqR6qQjcylRmjZ2611D3mqI9UVDbNlCi2xPZfK2hjeMqY7v-wN3C6D5wLBR43UykoOdz3R8q4s_Gdi9C28RNat890-B0ET7my-3C1oRk',
  },
];

interface HistoryEntry {
  id: string;
  label: string;
  date: string;
  amount: number;
}

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 'h1', label: 'Perawatan Karies Gigi', date: '12 Okt 2023 · OMDC Mampang', amount: 250 },
  { id: 'h2', label: 'Tukar Voucher Rp 50rb', date: '05 Okt 2023 · App', amount: -500 },
  { id: 'h3', label: 'Konsultasi Dokter', date: '28 Sep 2023 · OMDC Bintaro', amount: 100 },
];

function useAnimatedNumber(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const fmt = (n: number) => n.toLocaleString('id-ID');

export function MobileLoyalty({ state, setState }: MobileLoyaltyProps) {
  const user = state.user;
  const [points, setPoints] = useState(START_POINTS);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const animatedPoints = useAnimatedNumber(points);

  const remaining = Math.max(0, NEXT_TIER_AT - points);
  const progress = Math.min(100, (points / NEXT_TIER_AT) * 100);

  const handleRedeem = (reward: Reward) => {
    if (points < reward.cost) return;
    haptic('success');
    setPoints(p => p - reward.cost);
    setHistory(h => [
      { id: `r-${reward.id}-${Date.now()}`, label: `Tukar ${reward.label}`, date: '22 Jun 2026 · App', amount: -reward.cost },
      ...h,
    ]);
    setRedeemed(reward.id);
    setTimeout(() => setRedeemed(curr => (curr === reward.id ? null : curr)), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFF8F4' }}
    >
      {/* 3px gradient strip */}
      <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)' }} />

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 1px 8px rgba(233,30,140,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => { haptic('selection'); setState({ screen: 'profile' }); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <ArrowLeft size={22} color={INK} />
          </button>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: PINK, letterSpacing: -0.3 }}>Loyalty &amp; Poin</h1>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%' }}>
          <HelpCircle size={22} color={INK} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '16px 16px 100px' }}>

        {/* ── Points Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          style={{
            position: 'relative', borderRadius: 20, padding: '24px',
            background: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 100%)',
            boxShadow: '0 10px 25px rgba(233,30,140,0.30)', overflow: 'hidden', color: 'white',
            marginBottom: 24,
          }}
        >
          {/* decorative circles */}
          <div style={{ position: 'absolute', top: -24, right: -24, width: 128, height: 128, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
          <div style={{ position: 'absolute', bottom: -24, left: -24, width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, marginBottom: 4 }}>Total Poin Anda</p>
              <h2 style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>
                {fmt(animatedPoints)}
              </h2>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(4px)',
              padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.30)',
            }}>
              <Star size={13} fill="white" color="white" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Gold Member</span>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
              <span style={{ opacity: 0.9 }}>Menuju {NEXT_TIER}</span>
              <span style={{ opacity: 0.9 }}>{fmt(remaining)} Poin lagi</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.20)', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ height: '100%', background: 'white', borderRadius: 999, boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Tier Badges ── */}
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 14 }}>Membership Tiers</h3>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -4px', padding: '0 4px 4px' }}>
            {/* Silver */}
            <div style={{
              flexShrink: 0, width: 120, background: 'white', borderRadius: 16,
              padding: 16, border: '1px solid #F3F4F6', opacity: 0.6,
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', marginBottom: 12,
                background: 'linear-gradient(135deg, #9CA3AF, #E5E7EB)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Star size={20} fill="white" color="white" />
              </div>
              <p style={{ fontWeight: 700, fontSize: 14, color: INK }}>Silver</p>
              <p style={{ fontSize: 10, color: GREY, marginTop: 4 }}>0 - 1.000 Poin</p>
            </div>

            {/* Gold (Active) */}
            <div style={{
              flexShrink: 0, width: 136, background: 'white', borderRadius: 16,
              padding: 16, border: `2px solid ${PINK}`,
              boxShadow: '0 8px 24px rgba(233,30,140,0.10)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              position: 'relative', transform: 'scale(1.05)',
            }}>
              <div style={{
                position: 'absolute', top: -12,
                background: PINK, color: 'white', fontSize: 9, fontWeight: 700,
                padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Current
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', marginBottom: 12,
                background: 'linear-gradient(135deg, #D4A017, #FBBF24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(245,158,11,0.3)',
              }}>
                <svg viewBox="0 0 24 24" width={26} height={26} fill="white">
                  <path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1z" />
                </svg>
              </div>
              <p style={{ fontWeight: 700, fontSize: 16, color: INK }}>Gold</p>
              <p style={{ fontSize: 10, color: GREY, marginTop: 4 }}>1.001 - 3.000 Poin</p>
            </div>

            {/* Platinum */}
            <div style={{
              flexShrink: 0, width: 120, background: 'white', borderRadius: 16,
              padding: 16, border: '1px solid #F3F4F6',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', marginBottom: 12,
                background: 'linear-gradient(135deg, #D4A017, #67E8F9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                  <path d="M6.5 2h11l4 8L12 22 2.5 10l4-8z" />
                </svg>
              </div>
              <p style={{ fontWeight: 700, fontSize: 14, color: INK }}>Platinum</p>
              <p style={{ fontSize: 10, color: GREY, marginTop: 4 }}>3.001+ Poin</p>
            </div>
          </div>
        </section>

        {/* ── Tukar Poin ── */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: INK }}>Tukar Poin</h3>
            <button style={{ fontSize: 13, fontWeight: 500, color: PINK, background: 'none', border: 'none', cursor: 'pointer' }}>
              Lihat Semua
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {REWARDS.slice(0, 2).map((reward) => {
              const affordable = points >= reward.cost;
              const isRedeemed = redeemed === reward.id;
              return (
                <motion.div
                  key={reward.id}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'white', borderRadius: 20, padding: 16,
                    border: '1px solid rgba(252,231,243,0.8)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    display: 'flex', flexDirection: 'column', opacity: affordable ? 1 : 0.7,
                  }}
                >
                  <div style={{ height: 96, borderRadius: 14, overflow: 'hidden', background: '#FDF2F8', marginBottom: 12 }}>
                    <img src={reward.img} alt={reward.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 13, color: INK, marginBottom: 4, lineHeight: 1.3 }}>{reward.label}</h4>
                  <p style={{ fontSize: 11, color: GREY, marginBottom: 12, flex: 1 }}>{reward.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: PINK, background: 'rgba(233,30,140,0.07)', padding: '4px 8px', borderRadius: 8, width: 'fit-content', marginBottom: 10 }}>
                    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {fmt(reward.cost)} Poin
                  </div>
                  <motion.button
                    whileTap={affordable ? { scale: 0.95 } : undefined}
                    onClick={() => handleRedeem(reward)}
                    disabled={!affordable || isRedeemed}
                    style={{
                      border: 'none', borderRadius: 12, padding: '8px',
                      fontSize: 12, fontWeight: 700, cursor: affordable && !isRedeemed ? 'pointer' : 'not-allowed',
                      color: isRedeemed ? GREEN : affordable ? 'white' : GREY,
                      background: isRedeemed ? 'rgba(16,185,129,0.12)' : affordable ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    {isRedeemed ? <><CheckCircle size={13} /> Berhasil</> : affordable ? 'Tukar' : 'Poin kurang'}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Full-width reward */}
          {REWARDS[2] && (() => {
            const reward = REWARDS[2];
            const affordable = points >= reward.cost;
            const isRedeemed = redeemed === reward.id;
            return (
              <div style={{
                marginTop: 14, background: 'white', borderRadius: 20, padding: 16,
                border: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ width: 80, height: 80, borderRadius: 14, overflow: 'hidden', background: '#FDF2F8', flexShrink: 0 }}>
                  <img src={reward.img} alt={reward.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, fontSize: 13, color: INK, marginBottom: 4 }}>{reward.label}</h4>
                  <p style={{ fontSize: 11, color: GREY, marginBottom: 8 }}>{reward.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: PINK, background: 'rgba(233,30,140,0.07)', padding: '3px 8px', borderRadius: 8 }}>
                      {fmt(reward.cost)} Poin
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRedeem(reward)}
                      disabled={!affordable || isRedeemed}
                      style={{
                        padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                        border: `1px solid ${PINK}`, background: 'white', color: PINK, cursor: affordable ? 'pointer' : 'not-allowed',
                      }}
                    >
                      {isRedeemed ? 'Berhasil' : 'Tukar'}
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ── Riwayat Poin ── */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: INK }}>Riwayat Poin</h3>
            <button style={{ fontSize: 13, fontWeight: 500, color: PINK, background: 'none', border: 'none', cursor: 'pointer' }}>Filter</button>
          </div>
          <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <AnimatePresence initial={false}>
              {history.map((h, i) => {
                const earned = h.amount > 0;
                return (
                  <motion.div
                    key={h.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                      borderBottom: i < history.length - 1 ? '1px solid #F9FAFB' : 'none',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: earned ? '#F0FDF4' : '#FDF2F8', color: earned ? GREEN : PINK,
                    }}>
                      {earned ? <ArrowUpRight size={18} color={GREEN} /> : <ArrowDownLeft size={18} color={PINK} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>{h.label}</p>
                      <p style={{ fontSize: 11, color: GREY, marginTop: 2 }}>{h.date}</p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 900, color: earned ? GREEN : PINK }}>
                      {earned ? '+' : '-'}{fmt(Math.abs(h.amount))}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <button style={{
            width: '100%', marginTop: 12, padding: '12px', fontSize: 13, fontWeight: 600,
            color: GREY, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}>
            Muat lebih banyak <ChevronDown size={16} />
          </button>
        </section>

      </div>
    </motion.div>
  );
}

export default MobileLoyalty;
