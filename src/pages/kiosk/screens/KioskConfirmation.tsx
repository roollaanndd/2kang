import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, User, Stethoscope, Calendar, Clock, MapPin, Wrench, Lightbulb, ClipboardList, Check } from 'lucide-react';
import { CLINIC_NAME } from '../../../data/mockData';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskScreenProps } from '../KioskLayout';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

interface SummaryRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ icon, label, value, highlight }: SummaryRowProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '8px 0', borderBottom: '1px solid #F3F4F6',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        backgroundColor: '#FFF8F4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#E91E8C',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 500, marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: highlight ? '#E91E8C' : '#1A1A2E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      </div>
    </div>
  );
}

export function KioskConfirmation({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();

  const handleConfirm = () => {
    kioskSound('success');
    const nextQueue = 'A' + String(Math.floor(Math.random() * 10) + 18).padStart(3, '0');
    setState(prev => ({ ...prev, queueNumber: nextQueue }));
    goTo('payment');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{ width: '100%', height: '100%', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {/* 3px signature top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header — compact */}
      <div style={{ padding: '18px 56px 14px', paddingTop: '21px', backgroundColor: '#ffffff', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
        <div className="kd" style={{ fontSize: 26, fontWeight: 800, color: '#1A1A2E', marginBottom: 2 }}>
          {t ? 'Confirm Details' : 'Konfirmasi Data'}
        </div>
        <div style={{ fontSize: 14, color: '#6B7280' }}>
          {t ? 'Review your appointment details' : 'Periksa kembali data janji temu Anda'}
        </div>
      </div>

      {/* Content — flex:1 with minHeight:0 so it truly shrinks */}
      <div style={{ flex: 1, minHeight: 0, padding: portrait ? '14px 32px' : '14px 56px', display: 'flex', flexDirection: portrait ? 'column' : 'row', alignItems: 'stretch', gap: portrait ? 14 : 20, overflow: portrait ? 'auto' : 'hidden' }}>

        {/* Left: Summary card */}
        <div style={{ flex: portrait ? '0 0 auto' : 1, backgroundColor: '#ffffff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Pink gradient header */}
          <div style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', flexShrink: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff' }}>
              {t ? 'Appointment Summary' : 'Ringkasan Janji Temu'}
            </div>
          </div>
          {/* Rows — scrollable fallback */}
          <div style={{ flex: 1, overflowY: portrait ? 'visible' : 'auto', padding: '0 24px 12px' }}>
            <SummaryRow icon={<User size={16} />} label={t ? 'Patient Name' : 'Nama Pasien'} value={state.patientName || (t ? 'New Patient' : 'Pasien Baru')} />
            <SummaryRow icon={<Wrench size={16} />} label={t ? 'Service' : 'Layanan'} value={state.selectedService ? (t ? state.selectedService.nameEn : state.selectedService.name) : '-'} highlight />
            <SummaryRow icon={<Stethoscope size={16} />} label={t ? 'Doctor' : 'Dokter'} value={state.selectedDoctor?.name || '-'} />
            <SummaryRow icon={<Calendar size={16} />} label={t ? 'Date' : 'Tanggal'} value={state.selectedDate || '-'} />
            <SummaryRow icon={<Clock size={16} />} label={t ? 'Time' : 'Waktu'} value={state.selectedTime ? `${state.selectedTime} WIB` : '-'} highlight />
            <SummaryRow icon={<MapPin size={16} />} label={t ? 'Branch' : 'Cabang'} value={CLINIC_NAME} />
          </div>
        </div>

        {/* Right: Info boxes (stacks below summary in portrait) */}
        <div style={{ width: portrait ? '100%' : 260, flexShrink: 0, display: 'flex', flexDirection: portrait ? 'row' : 'column', flexWrap: portrait ? 'wrap' : 'nowrap', gap: 12 }}>
          <div style={{ backgroundColor: '#EFF6FF', borderRadius: 14, padding: '16px 18px', border: '1px solid #BFDBFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#1D4ED8', marginBottom: 6 }}><Lightbulb size={15} strokeWidth={2.5} /> {t ? 'Reminder' : 'Pengingat'}</div>
            <div style={{ fontSize: 13, color: '#D4A017', lineHeight: 1.55 }}>
              {t ? 'Please arrive 10 minutes early.' : 'Harap datang 10 menit sebelum jadwal.'}
            </div>
          </div>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: 14, padding: '16px 18px', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#15803D', marginBottom: 6 }}><ClipboardList size={15} strokeWidth={2.5} /> {t ? 'What to bring' : 'Yang perlu dibawa'}</div>
            <ul style={{ fontSize: 13, color: '#16A34A', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li>KTP / {t ? 'ID Card' : 'Kartu Identitas'}</li>
              <li>{t ? 'Medical record (if any)' : 'Kartu rekam medis (bila ada)'}</li>
              <li>{t ? 'Insurance card (if any)' : 'Kartu asuransi (bila ada)'}</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#FFF8F4', borderRadius: 14, padding: '16px 18px', border: '1px solid rgba(233,30,140,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#E91E8C', marginBottom: 4 }}><Clock size={15} strokeWidth={2.5} /> {t ? 'Booking expires in' : 'Konfirmasi dalam'}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#0D1421' }}>10 menit</div>
          </div>
        </div>
      </div>

      {/* Bottom bar — always visible, never displaced */}
      <div style={{ padding: '12px 40px', borderTop: '1px solid #F3F4F6', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 28px', borderRadius: 14,
            border: '2px solid #E5E7EB', backgroundColor: '#ffffff', color: '#6B7280',
            fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C'; (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLButtonElement).style.color = '#6B7280'; }}
        >
          <ChevronLeft size={18} />
          {t ? 'Correct' : 'Koreksi'}
        </button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 52px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', color: '#ffffff',
            fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
          }}
        >
          <Check size={20} strokeWidth={2.5} /> {t ? 'Confirm' : 'Konfirmasi'}
        </motion.button>
      </div>
    </motion.div>
  );
}
