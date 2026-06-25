import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Delete } from 'lucide-react';
import { haptic } from '../../../lib/haptics';
import type { MobileState, MobileUser } from '../../../types';

interface MobileCreatePinProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PIN_LENGTH = 6;

const MOCK_USER: MobileUser = {
  id: 'u1',
  name: 'Andi Pratama',
  phone: '0812-3456-7890',
  email: 'andi@email.com',
  medicalRecordNo: 'RM-2024-001',
  dob: '1990-05-15',
  gender: 'M',
  photo: '',
};

const PAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
];

export function MobileCreatePin({ state, setState }: MobileCreatePinProps) {
  const [phase, setPhase] = useState<'create' | 'confirm'>('create');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const current = phase === 'create' ? pin : confirmPin;
  const setCurrentPin = phase === 'create' ? setPin : setConfirmPin;

  const handleKey = (key: string) => {
    if (key === 'del') {
      haptic('light');
      setCurrentPin(prev => prev.slice(0, -1));
      setError('');
      return;
    }
    if (current.length >= PIN_LENGTH) return;
    haptic('light');
    const next = current + key;
    setCurrentPin(next);
    setError('');

    if (next.length === PIN_LENGTH) {
      if (phase === 'create') {
        setTimeout(() => setPhase('confirm'), 180);
      } else {
        if (next === pin) {
          setSuccess(true);
          haptic('success');
          setTimeout(() => {
            setState({ screen: 'home', isLoggedIn: true, user: state.user ?? MOCK_USER });
          }, 900);
        } else {
          haptic('error');
          setError('PIN tidak cocok. Coba lagi.');
          setConfirmPin('');
        }
      }
    }
  };

  const title = success
    ? 'PIN Berhasil Dibuat!'
    : phase === 'create'
      ? 'Buat PIN'
      : 'Konfirmasi PIN';

  const subtitle = success
    ? 'Selamat datang di OMDC Dental!'
    : phase === 'create'
      ? 'Masukkan 6 digit PIN keamanan Anda'
      : 'Masukkan ulang PIN untuk konfirmasi';

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}
    >
      {/* Header */}
      <div style={{ position: 'relative', padding: '52px 20px 20px', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!success && (
            <button
              onClick={() => phase === 'confirm' ? (setPhase('create'), setConfirmPin(''), setError('')) : setState({ screen: 'otp' })}
              style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.15)', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} color="#E91E8C" />
            </button>
          )}
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 1 }}>{title}</h1>
            <p style={{ fontSize: 11, color: '#9CA3AF' }}>{subtitle}</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px 24px' }}>

        {/* Success state */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 40 }}
            >
              <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg, #D4A017, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 40px rgba(16,185,129,0.35)' }}>
                <svg viewBox="0 0 24 24" width={44} height={44} fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p style={{ fontWeight: 800, fontSize: 18, color: '#1A1A2E' }}>PIN Dibuat!</p>
              <p style={{ fontSize: 13, color: '#9CA3AF' }}>Mengarahkan ke beranda…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <>
            {/* Phase indicator */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              {['Buat', 'Konfirmasi'].map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: i <= (phase === 'confirm' ? 1 : 0) ? '#E91E8C' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i <= (phase === 'confirm' ? 1 : 0) ? 'white' : '#9CA3AF' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: i <= (phase === 'confirm' ? 1 : 0) ? '#E91E8C' : '#9CA3AF' }}>{label}</span>
                  {i < 1 && <div style={{ width: 24, height: 2, background: phase === 'confirm' ? '#E91E8C' : '#F3F4F6', borderRadius: 1 }} />}
                </div>
              ))}
            </div>

            {/* PIN dots */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
              {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={i === current.length - 1 && current.length > 0 ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: i < current.length ? '#E91E8C' : '#F0F0F5',
                    border: `2px solid ${i < current.length ? '#E91E8C' : '#E5E7EB'}`,
                    boxShadow: i < current.length ? '0 2px 8px rgba(233,30,140,0.30)' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: 12, color: '#EF4444', fontWeight: 600, marginTop: 8, marginBottom: 4 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Numpad */}
            <div style={{ marginTop: 32, width: '100%', maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PAD.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  {row.map((key, ki) => (
                    <motion.button
                      key={ki}
                      whileTap={key ? { scale: 0.88 } : {}}
                      onClick={() => key && handleKey(key)}
                      style={{
                        width: 76, height: 76,
                        borderRadius: 22,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: key === '' ? 'transparent' : key === 'del' ? '#FFF0F7' : 'white',
                        border: key === 'del' ? '1.5px solid rgba(233,30,140,0.20)' : key === '' ? 'none' : '1.5px solid #F0F0F5',
                        boxShadow: key && key !== 'del' && key !== '' ? '0 3px 10px rgba(0,0,0,0.06)' : 'none',
                        cursor: key ? 'pointer' : 'default',
                        fontSize: 24, fontWeight: 800, color: '#1A1A2E',
                      }}
                    >
                      {key === 'del'
                        ? <Delete size={20} color="#E91E8C" />
                        : key
                      }
                    </motion.button>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
