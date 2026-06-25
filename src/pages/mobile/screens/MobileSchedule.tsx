import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TIME_SLOTS } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileScheduleProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

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
    if (!selectedDay || !selectedTime) return;
    haptic('light');
    const dateLabel = formatDateLabel(viewYear, viewMonth, selectedDay);
    setState({
      screen: 'booking-confirm',
      selectedDate: dateLabel,
      selectedTime,
    });
  };

  const back = () => setState({ screen: 'booking-doctor' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-white"
    >
      <MobileHeader title="Pilih Jadwal" showBack onBack={back} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Mini calendar */}
        <div className="px-5 pt-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: '#F3F4F6' }}
            >
              <ChevronLeft size={18} style={{ color: '#374151' }} />
            </button>
            <h3 className="font-black text-base" style={{ color: '#1A1A2E' }}>
              {MONTHS[viewMonth]} {viewYear}
            </h3>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: '#F3F4F6' }}
            >
              <ChevronRight size={18} style={{ color: '#374151' }} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-bold" style={{ color: '#9CA3AF' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} />;
              const past = isPast(day);
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              const selected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => { if (!past) { haptic('selection'); setSelectedDay(day); } }}
                  disabled={past}
                  className="flex items-center justify-center h-9 rounded-xl mx-0.5 transition-all active:scale-90 text-sm font-semibold"
                  style={{
                    background: selected
                      ? '#E91E8C'
                      : isToday
                      ? '#FFF8F4'
                      : 'transparent',
                    color: selected
                      ? 'white'
                      : past
                      ? '#D1D5DB'
                      : isToday
                      ? '#E91E8C'
                      : '#1A1A2E',
                    fontWeight: selected || isToday ? 800 : 600,
                    border: isToday && !selected ? '1.5px solid #E91E8C' : 'none',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected date label */}
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mx-5 mt-4 px-4 py-2.5 rounded-xl"
            style={{ background: '#FFF8F4' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#E91E8C' }}>
              📅 {formatDateLabel(viewYear, viewMonth, selectedDay)}
            </p>
          </motion.div>
        )}

        {/* Time slots */}
        <div className="px-5 mt-5">
          <h3 className="font-black text-sm mb-3" style={{ color: '#1A1A2E' }}>
            Pilih Jam
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.time}
                onClick={() => { if (slot.available) { haptic('selection'); setSelectedTime(slot.time); } }}
                disabled={!slot.available}
                className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                style={{
                  background: selectedTime === slot.time
                    ? '#E91E8C'
                    : !slot.available
                    ? '#F9FAFB'
                    : '#F3F4F6',
                  color: selectedTime === slot.time
                    ? 'white'
                    : !slot.available
                    ? '#D1D5DB'
                    : '#374151',
                  border: selectedTime === slot.time
                    ? '2px solid #E91E8C'
                    : '2px solid transparent',
                  textDecoration: !slot.available ? 'line-through' : 'none',
                }}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
            * Slot yang dicoret sudah tidak tersedia
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-white"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={handleContinue}
          disabled={!selectedDay || !selectedTime}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95 disabled:opacity-40"
          style={{
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
          }}
        >
          Lanjut
        </button>
      </div>
    </motion.div>
  );
}
