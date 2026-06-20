import { useEffect, useState } from 'react';
import { OmdcLogo } from '../ui/OmdcLogo';

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
  return `${dayName}, ${day} ${month} ${year} | ${hours}:${minutes}`;
}

export function KioskHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-8 flex-shrink-0"
      style={{
        height: '72px',
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #FCE7F3',
        boxShadow: '0 2px 8px rgba(233,30,140,0.08)',
      }}
    >
      <OmdcLogo size="md" variant="default" />

      <div
        className="text-right font-semibold text-base"
        style={{ color: '#4B5563' }}
      >
        {formatDateTime(now)}
      </div>
    </header>
  );
}
