import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import { kioskSound } from '../../../lib/kioskSound';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const DAY_ABBR_ID = ['Min', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'];
const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function KioskDateSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const tod = new Date(today);
    tod.setHours(0, 0, 0, 0);
    return d < tod;
  };

  const isToday = (day: number) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();

  const formatDateStr = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return `${dayNames[d.getDay()]}, ${day} ${MONTH_NAMES_ID[viewMonth]} ${viewYear}`;
  };

  const handleSelect = (day: number) => {
    if (isPast(day)) return;
    kioskSound('select');
    setState(prev => ({ ...prev, selectedDate: formatDateStr(day) }));
    goTo('time-select');
  };

  const isSelected = (day: number) => {
    const str = formatDateStr(day);
    return state.selectedDate === str;
  };

  // Build calendar cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* 3px signature top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)',
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        padding: portrait ? '28px 32px 20px' : '28px 60px 20px',
        paddingTop: portrait ? '31px' : '31px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        {/* Step progress dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              height: 5, borderRadius: 3,
              width: n <= 3 ? 36 : 20,
              backgroundColor: n <= 3 ? '#E91E8C' : '#E5E7EB',
              transition: 'all 0.3s',
            }} />
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E91E8C', letterSpacing: '0.10em', textTransform: 'uppercase', marginLeft: 6 }}>
            {t ? 'Step 3 of 4' : 'Langkah 3 dari 4'}
          </span>
        </div>
        <div className="kd" style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Select Date' : 'Pilih Tanggal'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Choose your preferred appointment date' : 'Pilih tanggal kunjungan yang diinginkan'}
        </div>
      </div>

      {/* Calendar */}
      <div style={{
        flex: 1,
        padding: portrait ? '24px 28px' : '24px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '32px 40px',
          width: '100%',
          maxWidth: '680px',
        }}>
          {/* Month navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
          }}>
            <button
              onClick={handlePrevMonth}
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
                (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
                (e.currentTarget as HTMLButtonElement).style.color = '#374151';
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#1A1A2E' }}>
              {MONTH_NAMES_ID[viewMonth]} {viewYear}
            </div>
            <button
              onClick={handleNextMonth}
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
                (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
                (e.currentTarget as HTMLButtonElement).style.color = '#374151';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px',
            marginBottom: '10px',
          }}>
            {DAY_ABBR_ID.map(d => (
              <div key={d} style={{
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '700',
                color: '#9CA3AF',
                padding: '8px 0',
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px',
          }}>
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const past = isPast(day);
              const today_ = isToday(day);
              const selected = isSelected(day);

              let bg = 'transparent';
              let color = '#374151';
              let border = '2px solid transparent';
              let cursor = 'pointer';
              let opacity = 1;

              if (selected) {
                bg = '#E91E8C';
                color = '#ffffff';
                border = '2px solid #E91E8C';
              } else if (today_) {
                bg = '#FFF8F4';
                color = '#E91E8C';
                border = '2px solid #E91E8C';
              } else if (past) {
                color = '#D1D5DB';
                cursor = 'not-allowed';
                opacity = 0.5;
              }

              return (
                <button
                  key={day}
                  onClick={() => handleSelect(day)}
                  disabled={past}
                  style={{
                    height: '52px',
                    borderRadius: '12px',
                    border,
                    backgroundColor: bg,
                    color,
                    fontSize: '17px',
                    fontWeight: today_ || selected ? '800' : '500',
                    cursor,
                    opacity,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    if (past || selected) return;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFF8F4';
                    (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
                  }}
                  onMouseLeave={e => {
                    if (past || selected) return;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = today_ ? '#FFF8F4' : 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = today_ ? '#E91E8C' : '#374151';
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {state.selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '20px',
              padding: '14px 28px',
              backgroundColor: '#FFF8F4',
              borderRadius: '14px',
              border: '2px solid #FCE7F3',
              fontSize: '17px',
              fontWeight: '600',
              color: '#E91E8C',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <Check size={18} strokeWidth={2.5} /> {t ? 'Selected:' : 'Dipilih:'} {state.selectedDate}
          </motion.div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        backgroundColor: '#ffffff',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px', borderRadius: '14px',
            border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
            color: '#6B7280', fontSize: '17px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
            (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
            (e.currentTarget as HTMLButtonElement).style.color = '#6B7280';
          }}
        >
          <ChevronLeft size={20} />
          {t ? 'Back' : 'Kembali'}
        </button>
      </div>
    </motion.div>
  );
}
