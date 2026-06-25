/* eslint-disable */
import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, CheckCircle, Lock, Calendar, ChevronRight, Zap } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const GOLD = '#D4A017';
const INK = '#1A1A2E';

const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const STREAK_DAYS = [true, true, true, true, true, true, true];

interface Habit { id: string; icon: string; label: string; time: string; done: boolean }
const INITIAL_HABITS: Habit[] = [
  { id: 'morning', icon: '☀️', label: 'Sikat Gigi Pagi', time: '07:00 pagi', done: true },
  { id: 'night', icon: '🌙', label: 'Sikat Gigi Malam', time: '21:00 malam', done: false },
  { id: 'floss', icon: '🧵', label: 'Flossing', time: 'Siang hari', done: false },
  { id: 'mouthwash', icon: '💧', label: 'Obat Kumur', time: 'Setelah makan', done: true },
];

interface Achievement { id: string; emoji: string; label: string; sub: string; earned: boolean }
const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', emoji: '🔥', label: '7 Hari Streak', sub: 'Konsisten sepekan', earned: true },
  { id: 'a2', emoji: '⭐', label: 'Kunjungan Perdana', sub: 'Pertama check-up', earned: true },
  { id: 'a3', emoji: '🏆', label: '30 Hari Streak', sub: 'Konsisten sebulan', earned: false },
  { id: 'a4', emoji: '✍️', label: 'Pengulas Aktif', sub: 'Beri 3 ulasan', earned: false },
  { id: 'a5', emoji: '🧵', label: 'Rajin Flossing', sub: 'Flossing 14 hari', earned: true },
  { id: 'a6', emoji: '💎', label: 'Member Platinum', sub: 'Raih tier tertinggi', earned: false },
];

function HealthRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const grade = score >= 90 ? 'Sempurna' : score >= 80 ? 'Sangat Baik' : 'Baik';
  const gradeColor = score >= 90 ? '#D4A017' : score >= 80 ? GOLD : '#D4A017';

  return (
    <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
      <svg width={130} height={130} viewBox="0 0 130 130">
        <defs>
          <linearGradient id="ringGradDT" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={PINK} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>
        <circle cx={65} cy={65} r={r} fill="none" stroke="#F3F4F6" strokeWidth={12} />
        <motion.circle
          cx={65} cy={65} r={r} fill="none"
          stroke="url(#ringGradDT)" strokeWidth={12} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          transform="rotate(-90 65 65)"
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 30, fontWeight: 900, color: INK, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 9, fontWeight: 800, color: gradeColor, marginTop: 2 }}>{grade}</span>
      </div>
    </div>
  );
}

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color }}>{value}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 10, background: '#F3F4F6', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 10, background: color }}
        />
      </div>
    </div>
  );
}

export function MobileDentalTracker({ state, setState }: Props) {
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const doneCount = habits.filter(h => h.done).length;

  const toggleHabit = (id: string) => {
    haptic('selection');
    setHabits(hs => hs.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)', zIndex: 10 }} />

      <MobileHeader title="Dental Tracker" showBack onBack={() => setState({ screen: 'home' })} />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '16px 16px 100px' }}>

        {/* Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'white', borderRadius: 22, padding: 18, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: 14 }}
        >
          <p style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            Skor Kesehatan Gigi
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <HealthRing score={85} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <MiniBar label="Menyikat Gigi" value={90} color={PINK} />
              <MiniBar label="Flossing" value={70} color={GOLD} />
              <MiniBar label="Kunjungan Klinik" value={85} color="#D4A017" />
            </div>
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 12, background: 'rgba(233,30,140,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={13} color={PINK} />
            <span style={{ fontSize: 11, color: INK, fontWeight: 600 }}>
              Skormu naik <b style={{ color: PINK }}>+5 poin</b> minggu ini! Terus pertahankan 💪
            </span>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
          style={{ background: 'white', borderRadius: 22, padding: 18, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(233,30,140,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={18} color={PINK} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 900, color: INK, margin: 0 }}>7 Hari 🔥</p>
                <p style={{ fontSize: 10, color: '#9CA3AF', margin: 0 }}>Berturut-turut</p>
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.10)', color: '#D4A017' }}>
              Minggu Ini
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            {WEEK_DAYS.map((day, i) => (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#9CA3AF' }}>{day}</span>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: STREAK_DAYS[i] ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#F3F4F6',
                    boxShadow: STREAK_DAYS[i] ? '0 2px 8px rgba(233,30,140,0.30)' : 'none',
                  }}
                >
                  {STREAK_DAYS[i]
                    ? <CheckCircle size={13} color="white" />
                    : <span style={{ fontSize: 9, color: '#D1D5DB' }}>–</span>
                  }
                </motion.div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#D4A017', fontWeight: 700, marginTop: 12, textAlign: 'center' }}>
            🎉 Streak sempurna minggu ini! Pertahankan terus!
          </p>
        </motion.div>

        {/* Habits */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          style={{ background: 'white', borderRadius: 22, padding: 18, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: 0 }}>Kebiasaan Hari Ini</p>
            <span style={{ fontSize: 11, fontWeight: 700, color: PINK }}>{doneCount}/{habits.length} selesai</span>
          </div>
          {habits.map((habit, i) => (
            <motion.button
              key={habit.id}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleHabit(habit.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 0', borderBottom: i < habits.length - 1 ? '1px solid #F3F4F6' : 'none',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: habit.done ? 'rgba(233,30,140,0.08)' : '#F9FAFB', fontSize: 18 }}>
                {habit.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: habit.done ? INK : '#6B7280', margin: 0, textDecoration: habit.done ? 'none' : 'none' }}>{habit.label}</p>
                <p style={{ fontSize: 10, color: '#9CA3AF', margin: '1px 0 0' }}>{habit.time}</p>
              </div>
              <motion.div
                animate={{ scale: habit.done ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: habit.done ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#F3F4F6',
                  border: habit.done ? 'none' : '1.5px solid #E5E7EB',
                }}
              >
                {habit.done && <CheckCircle size={14} color="white" />}
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px 2px' }}>Pencapaian</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                style={{
                  background: 'white', borderRadius: 18, padding: 14,
                  border: `1.5px solid ${ach.earned ? 'rgba(233,30,140,0.15)' : '#F3F4F6'}`,
                  boxShadow: ach.earned ? '0 4px 16px rgba(233,30,140,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                  opacity: ach.earned ? 1 : 0.55,
                  display: 'flex', flexDirection: 'column', gap: 8,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {!ach.earned && (
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <Lock size={11} color="#D1D5DB" />
                  </div>
                )}
                <div style={{ width: 40, height: 40, borderRadius: 13, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ach.earned ? 'rgba(233,30,140,0.07)' : '#F9FAFB' }}>
                  {ach.emoji}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: ach.earned ? INK : '#9CA3AF', lineHeight: 1.2 }}>{ach.label}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 10, color: '#B0B7C3' }}>{ach.sub}</p>
                </div>
                {ach.earned && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, fontWeight: 700, color: '#D4A017' }}>
                    <CheckCircle size={9} color="#D4A017" /> Diraih
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { haptic('medium'); setState({ screen: 'booking' }); }}
          style={{
            width: '100%', padding: '15px 20px', borderRadius: 18, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'white', fontSize: 14, fontWeight: 800,
          }}
        >
          <Calendar size={17} />
          Jadwalkan Perawatan Rutin
          <ChevronRight size={17} />
        </motion.button>
      </div>
    </motion.div>
  );
}
