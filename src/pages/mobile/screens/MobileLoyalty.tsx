/* eslint-disable */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Crown, Gift, Percent, Smile, MessageCircle,
  CalendarPlus, UserPlus, Star, CheckCircle, ArrowUpRight, ArrowDownLeft,
} from 'lucide-react';
import type { MobileState } from '../../../types';
import { haptic } from '../../../lib/haptics';
import { MobileHeader } from '../../../components/mobile/MobileHeader';

interface MobileLoyaltyProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const INK = '#111827';
const GREY = '#6B7280';
const GREY2 = '#9CA3AF';
const BG = '#F8F9FB';
const GREEN = '#10B981';

const START_POINTS = 2450;
const NEXT_TIER = 'Platinum';
const NEXT_TIER_AT = 3000;

interface Reward {
  id: string;
  label: string;
  cost: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

const REWARDS: Reward[] = [
  { id: 'scaling',    label: 'Gratis Scaling',    cost: 1500, icon: Smile },
  { id: 'disc50',     label: 'Diskon 50rb',       cost: 800,  icon: Percent },
  { id: 'whitening',  label: 'Voucher Whitening', cost: 2000, icon: Sparkles },
  { id: 'konsultasi', label: 'Free Konsultasi',   cost: 500,  icon: MessageCircle },
];

interface HistoryEntry {
  id: string;
  label: string;
  date: string;
  amount: number; // positive = earned, negative = redeemed
}

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 'h1', label: 'Kunjungan scaling',   date: '12 Jun 2026', amount: 150 },
  { id: 'h2', label: 'Tukar voucher diskon', date: '02 Jun 2026', amount: -800 },
  { id: 'h3', label: 'Referral teman',       date: '28 Mei 2026', amount: 200 },
  { id: 'h4', label: 'Ulasan layanan',       date: '20 Mei 2026', amount: 50 },
  { id: 'h5', label: 'Kunjungan konsultasi', date: '14 Mei 2026', amount: 100 },
];

const HOW_TO_EARN = [
  { id: 'book',   icon: CalendarPlus, label: 'Booking janji temu', sublabel: '+100 poin tiap kunjungan', color: PINK },
  { id: 'refer',  icon: UserPlus,     label: 'Ajak teman',         sublabel: '+200 poin per referral',   color: AQUA },
  { id: 'review', icon: Star,         label: 'Beri ulasan',        sublabel: '+50 poin per ulasan',      color: '#F59E0B' },
];

// ── Animated points counter ───────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
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
      { id: `r-${reward.id}-${Date.now()}`, label: `Tukar ${reward.label}`, date: '21 Jun 2026', amount: -reward.cost },
      ...h,
    ]);
    setRedeemed(reward.id);
    setTimeout(() => setRedeemed(curr => (curr === reward.id ? null : curr)), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}
    >
      <MobileHeader
        title="Poin & Reward"
        showBack
        onBack={() => { haptic('selection'); setState({ screen: 'profile' }); }}
      />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '16px 16px 100px' }}>
        {/* ── HERO MEMBERSHIP CARD ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          style={{
            position: 'relative',
            borderRadius: 24,
            padding: 20,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            boxShadow: '0 14px 36px rgba(233,30,140,0.30)',
            color: 'white',
          }}
        >
          {/* decorative rings (inside the card only) */}
          <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ position: 'absolute', bottom: -50, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 11,
                  background: 'rgba(255,255,255,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Crown size={18} color="white" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 900, letterSpacing: -0.3 }}>OMDC Gold</p>
                  <p style={{ margin: 0, fontSize: 10, opacity: 0.85 }}>Member sejak 2024</p>
                </div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.22)', letterSpacing: '0.05em',
              }}>
                OMDC REWARDS
              </span>
            </div>

            <div style={{ marginTop: 22 }}>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.85, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
                Total Poin
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>{fmt(animatedPoints)}</span>
                <span style={{ fontSize: 15, fontWeight: 800, opacity: 0.9 }}>Poin</span>
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, fontSize: 9.5, opacity: 0.75, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Member</p>
                <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 800 }}>{user?.name ?? 'Pengguna OMDC'}</p>
              </div>
              <Sparkles size={26} color="rgba(255,255,255,0.85)" />
            </div>
          </div>
        </motion.div>

        {/* ── TIER PROGRESS ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            marginTop: 14, background: 'white', borderRadius: 18, padding: 16,
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: INK }}>Menuju {NEXT_TIER}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: AQUA }}>{fmt(points)} / {fmt(NEXT_TIER_AT)}</span>
          </div>
          <div style={{ height: 10, borderRadius: 20, background: '#F3F4F6', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 20, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})` }}
            />
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: GREY }}>
            {remaining > 0
              ? <>Tinggal <b style={{ color: PINK }}>{fmt(remaining)} poin lagi</b> menuju {NEXT_TIER}!</>
              : <>Selamat! Anda telah mencapai tier {NEXT_TIER}.</>}
          </p>
        </motion.div>

        {/* ── REDEEMABLE REWARDS ───────────────────────────────────── */}
        <div style={{ marginTop: 22 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px 2px' }}>Tukar Poin</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {REWARDS.map((reward, i) => {
              const affordable = points >= reward.cost;
              const isRedeemed = redeemed === reward.id;
              const Icon = reward.icon;
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                  style={{
                    background: 'white', borderRadius: 18, padding: 14,
                    border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    display: 'flex', flexDirection: 'column', gap: 10,
                    opacity: affordable ? 1 : 0.62,
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 13,
                    background: 'rgba(233,30,140,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color={PINK} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: INK, lineHeight: 1.2 }}>{reward.label}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 11, fontWeight: 700, color: AQUA }}>{fmt(reward.cost)} poin</p>
                  </div>

                  <motion.button
                    whileTap={affordable ? { scale: 0.95 } : undefined}
                    onClick={() => handleRedeem(reward)}
                    disabled={!affordable || isRedeemed}
                    style={{
                      marginTop: 'auto', border: 'none', borderRadius: 12,
                      padding: '9px', fontSize: 12.5, fontWeight: 800,
                      cursor: affordable && !isRedeemed ? 'pointer' : 'not-allowed',
                      color: isRedeemed ? GREEN : affordable ? 'white' : GREY2,
                      background: isRedeemed
                        ? 'rgba(16,185,129,0.12)'
                        : affordable ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    {isRedeemed
                      ? <><CheckCircle size={14} /> Berhasil</>
                      : affordable ? 'Tukar' : 'Poin kurang'}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── POINTS HISTORY ───────────────────────────────────────── */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px 2px' }}>Riwayat Poin</p>
          <div style={{
            background: 'white', borderRadius: 18, overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
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
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 14px',
                      borderTop: i === 0 ? 'none' : '1px solid #F3F4F6',
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: earned ? 'rgba(16,185,129,0.10)' : 'rgba(233,30,140,0.08)',
                    }}>
                      {earned
                        ? <ArrowUpRight size={16} color={GREEN} />
                        : <ArrowDownLeft size={16} color={PINK} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: INK, lineHeight: 1.2 }}>{h.label}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: GREY2 }}>{h.date}</p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 900, color: earned ? GREEN : PINK }}>
                      {earned ? '+' : '-'}{fmt(Math.abs(h.amount))}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── HOW TO EARN ──────────────────────────────────────────── */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px 2px' }}>Cara Dapat Poin</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HOW_TO_EARN.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 13,
                    background: 'white', borderRadius: 16, padding: '13px 14px',
                    border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${item.color}14`,
                  }}>
                    <Icon size={19} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: INK, lineHeight: 1.2 }}>{item.label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: GREY2 }}>{item.sublabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MobileLoyalty;
