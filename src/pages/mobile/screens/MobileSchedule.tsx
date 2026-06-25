import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Check } from 'lucide-react';
import { TIME_SLOTS } from '../../../data/mockData';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileScheduleProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const DARK = '#0D1421';
const MUTED = '#6B7280';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const STEPS = ['Layanan', 'Dokter', 'Jadwal', 'Konfirmasi'];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function formatDateLabel(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  return d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function MobileSchedule({ state, setState }: MobileScheduleProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(state.selectedTime ?? null);

  const cells = buildCalendar(viewYear, viewMonth);
  const canContinue = selectedDay !== null && selectedTime !== null;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(v => v - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(v => v + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const handleContinue = () => {
    if (!canContinue) return;
    haptic('light');
    setState({
      screen: 'booking-confirm',
      selectedDate: formatDateLabel(viewYear, viewMonth, selectedDay!),
      selectedTime: selectedTime!,
    });
  };

  const doctorName = state.selectedDoctor?.name ?? 'drg. Sarah Wijaya';
  const doctorSpec = state.selectedDoctor?.specialty ?? 'Umum';
  const serviceName = state.selectedService?.name ?? 'Pemeriksaan';

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      {/* 3px brand strip */}
      <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, #06B6D4)` }} />

      {/* Header */}
      <div style={{
        flexShrink: 0, background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12 }}>
          <button
            onClick={() => setState({ screen: 'booking-doctor' })}
            style={{ width: 38, height: 38, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ChevronLeft size={20} color={DARK} />
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Pilih Jadwal</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(233,30,140,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: PINK }}>3/4</span>
          </div>
        </div>

        {/* Booking step progress */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px 14px', gap: 0 }}>
          {STEPS.map((step, i) => {
            const done = i < 2;
            const active = i === 2;
            const future = i > 2;
            return (
              <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: done ? PINK : active ? 'white' : '#F3F4F6',
                    border: done ? 'none' : active ? `2px solid ${PINK}` : '2px solid #E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {done ? (
                      <Check size={13} color="white" strokeWidth={3} />
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 800, color: active ? PINK : '#9CA3AF' }}>{i + 1}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 9, fontWeight: active ? 700 : done ? 600 : 500, color: done ? PINK : active ? DARK : '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: done ? PINK : '#E5E7EB', margin: '0 4px', marginBottom: 14, borderRadius: 1 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '12px 16px 100px' }}>

        {/* Doctor & Service context card */}
        <div style={{
          background: 'white', borderRadius: 18, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12,
          border: '1px solid rgba(233,30,140,0.1)',
          boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(233,30,140,0.25)',
          }}>
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 2 }}>{doctorName}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{doctorSpec} · {serviceName}</div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(233,30,140,0.06)',
            border: '1px solid rgba(233,30,140,0.12)',
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: PINK }}>Terpilih</span>
          </div>
        </div>

        {/* Calendar Card */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '16px',
          marginBottom: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}>
          {/* Month header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button
              onClick={prevMonth}
              style={{ width: 34, height: 34, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={16} color="#374151" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CalendarDays size={16} color={PINK} />
              <span style={{ fontSize: 15, fontWeight: 900, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {MONTHS[viewMonth]} {viewYear}
              </span>
            </div>
            <button
              onClick={nextMonth}
              style={{ width: 34, height: 34, borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={16} color="#374151" />
            </button>
          </div>

          {/* Day labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 6 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#9CA3AF', padding: '2px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px 2px' }}>
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} />;
              const past = isPast(day);
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              const selected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => { if (!past) { haptic('selection'); setSelectedDay(day); } }}
                  disabled={past}
                  style={{
                    height: 36, borderRadius: 10, border: 'none', cursor: past ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13,
                    background: selected
                      ? `linear-gradient(135deg, ${PINK}, ${ROSE})`
                      : isToday ? '#FFF5F9' : 'transparent',
                    color: selected ? 'white' : past ? '#D1D5DB' : isToday ? PINK : DARK,
                    fontWeight: selected || isToday ? 800 : 500,
                    outline: isToday && !selected ? `1.5px solid ${PINK}` : 'none',
                    boxShadow: selected ? '0 4px 10px rgba(233,30,140,0.3)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Selected date label */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  marginTop: 12, padding: '8px 12px', borderRadius: 10,
                  background: 'rgba(233,30,140,0.05)',
                  border: '1px solid rgba(233,30,140,0.1)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <CalendarDays size={13} color={PINK} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: PINK }}>
                    {formatDateLabel(viewYear, viewMonth, selectedDay)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Time Slots Card */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Clock size={15} color={PINK} />
            <span style={{ fontSize: 14, fontWeight: 800, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Waktu Tersedia</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {TIME_SLOTS.map(slot => {
              const isSelected = selectedTime === slot.time;
              const unavailable = !slot.available;
              return (
                <button
                  key={slot.time}
                  onClick={() => { if (!unavailable) { haptic('selection'); setSelectedTime(slot.time); } }}
                  disabled={unavailable}
                  style={{
                    padding: '11px 8px', borderRadius: 12, border: 'none', cursor: unavailable ? 'default' : 'pointer',
                    background: isSelected ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : unavailable ? '#F9FAFB' : '#F3F4F6',
                    color: isSelected ? 'white' : unavailable ? '#D1D5DB' : '#374151',
                    fontSize: 13, fontWeight: 700,
                    textDecoration: unavailable ? 'line-through' : 'none',
                    boxShadow: isSelected ? '0 4px 12px rgba(233,30,140,0.28)' : 'none',
                    outline: isSelected ? 'none' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10 }}>
            * Slot yang dicoret sudah penuh
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 24px', background: 'white',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <motion.button
          whileTap={{ scale: canContinue ? 0.97 : 1 }}
          onClick={handleContinue}
          style={{
            width: '100%', padding: '15px', borderRadius: 16, border: 'none',
            cursor: canContinue ? 'pointer' : 'default',
            background: canContinue
              ? `linear-gradient(135deg, ${PINK}, ${ROSE})`
              : '#E5E7EB',
            color: canContinue ? 'white' : '#9CA3AF',
            fontSize: 15, fontWeight: 800,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: canContinue ? '0 8px 24px rgba(233,30,140,0.3)' : 'none',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {canContinue ? 'Konfirmasi Jadwal' : 'Pilih Tanggal & Waktu'}
          {canContinue && <ChevronRight size={18} color="white" />}
        </motion.button>
      </div>
    </motion.div>
  );
}
