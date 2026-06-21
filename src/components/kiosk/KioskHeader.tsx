import { useEffect, useState } from 'react';
import { OmdcLogo } from '../ui/OmdcLogo';
import { CURRENT_QUEUE } from '../../data/mockData';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';

const DAY_NAMES_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function formatDateTime(date: Date): string {
  const dayName = DAY_NAMES_ID[date.getDay()];
  const day = date.getDate();
  const month = MONTH_NAMES_ID[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${dayName}, ${day} ${month} ${year}  |  ${hours}:${minutes}`;
}

export function KioskHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="flex items-center justify-between flex-shrink-0"
      style={{
        height: '72px',
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #FCE7F3',
        boxShadow: '0 2px 8px rgba(233,30,140,0.08)',
        padding: '0 28px',
        position: 'relative',
      }}
    >
      {/* 3px brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})` }} />

      <OmdcLogo size="md" variant="default" />

      {/* Center: live queue display */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 }}>Sedang Dilayani</div>
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
          color: 'white',
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: 2,
          borderRadius: 12,
          padding: '6px 20px',
          boxShadow: `0 4px 16px ${PINK}44`,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {CURRENT_QUEUE}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 }}>Nomor Antrian</div>
        </div>
      </div>

      <div
        className="text-right font-semibold text-sm"
        style={{ color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}
      >
        {formatDateTime(now)}
      </div>
    </header>
  );
}
