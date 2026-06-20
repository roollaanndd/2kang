import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, User, Stethoscope, Calendar, Clock, MapPin, Wrench } from 'lucide-react';
import { CLINIC_NAME, CLINIC_ADDRESS } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';

interface SummaryRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ icon, label, value, highlight }: SummaryRowProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '18px 0',
      borderBottom: '1px solid #F3F4F6',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: '#FFF5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#E91E8C',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: '500', marginBottom: '2px' }}>
          {label}
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: highlight ? '#E91E8C' : '#1A1A2E',
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export function KioskConfirmation({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';

  const handleConfirm = () => {
    // Generate queue number
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
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '28px 60px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Confirm Details' : 'Konfirmasi Data'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Please review your appointment details before confirming' : 'Mohon periksa kembali data janji temu Anda'}
        </div>
      </div>

      {/* Summary card */}
      <div style={{
        flex: 1,
        padding: '28px 60px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '32px',
      }}>
        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '32px 36px',
          maxWidth: '640px',
        }}>
          {/* Top pink bar */}
          <div style={{
            margin: '-32px -36px 24px',
            padding: '18px 36px',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            borderRadius: '24px 24px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              fontSize: '18px', fontWeight: '800', color: '#ffffff',
            }}>
              {t ? 'Appointment Summary' : 'Ringkasan Janji Temu'}
            </div>
          </div>

          <SummaryRow
            icon={<User size={20} />}
            label={t ? 'Patient Name' : 'Nama Pasien'}
            value={state.patientName || (t ? 'New Patient' : 'Pasien Baru')}
          />
          <SummaryRow
            icon={<Wrench size={20} />}
            label={t ? 'Service' : 'Layanan'}
            value={state.selectedService
              ? (t ? state.selectedService.nameEn : state.selectedService.name)
              : '-'}
            highlight
          />
          <SummaryRow
            icon={<Stethoscope size={20} />}
            label={t ? 'Doctor' : 'Dokter'}
            value={state.selectedDoctor?.name || '-'}
          />
          <SummaryRow
            icon={<Calendar size={20} />}
            label={t ? 'Date' : 'Tanggal'}
            value={state.selectedDate || '-'}
          />
          <SummaryRow
            icon={<Clock size={20} />}
            label={t ? 'Time' : 'Waktu'}
            value={state.selectedTime ? `${state.selectedTime} WIB` : '-'}
            highlight
          />
          <SummaryRow
            icon={<MapPin size={20} />}
            label={t ? 'Branch' : 'Cabang'}
            value={`${CLINIC_NAME}, ${CLINIC_ADDRESS}`}
          />
        </div>

        {/* Right side info */}
        <div style={{
          width: '280px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div style={{
            backgroundColor: '#EFF6FF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #BFDBFE',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1D4ED8', marginBottom: '8px' }}>
              💡 {t ? 'Reminder' : 'Pengingat'}
            </div>
            <div style={{ fontSize: '14px', color: '#3B82F6', lineHeight: '1.5' }}>
              {t
                ? 'Please arrive 10 minutes before your scheduled appointment time.'
                : 'Harap datang 10 menit sebelum waktu janji temu Anda.'}
            </div>
          </div>

          <div style={{
            backgroundColor: '#F0FDF4',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #BBF7D0',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#15803D', marginBottom: '8px' }}>
              📋 {t ? 'What to bring' : 'Yang perlu dibawa'}
            </div>
            <ul style={{ fontSize: '14px', color: '#16A34A', lineHeight: '1.8', paddingLeft: '16px', margin: 0 }}>
              <li>KTP / {t ? 'ID Card' : 'Kartu Identitas'}</li>
              <li>{t ? 'Medical record (if any)' : 'Kartu rekam medis (jika ada)'}</li>
              <li>{t ? 'Insurance card (if applicable)' : 'Kartu asuransi (jika ada)'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
          {t ? 'Correct' : 'Koreksi'}
        </button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '16px 48px', borderRadius: '14px', border: 'none',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            color: '#ffffff', fontSize: '19px', fontWeight: '800',
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
          }}
        >
          ✓ {t ? 'Confirm →' : 'Konfirmasi →'}
        </motion.button>
      </div>
    </motion.div>
  );
}
