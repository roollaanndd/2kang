import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Printer, Home } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';

const AUTO_RETURN_SECONDS = 10;

export function KioskTicket({ state, setState, goTo }: KioskScreenProps) {
  const t = state.language === 'en';
  const [countdown, setCountdown] = useState(AUTO_RETURN_SECONDS);
  const queueNumber = state.queueNumber || 'A018';

  useEffect(() => {
    if (countdown <= 0) {
      setState({
        language: state.language,
        step: 'welcome',
      });
      goTo('welcome');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleDone = () => {
    setState({
      language: state.language,
      step: 'welcome',
    });
    goTo('welcome');
  };

  const queueLetter = queueNumber.charAt(0);
  const queueNum = queueNumber.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #FFF5F9 0%, #F0FAFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '28px',
      }}
    >
      {/* Success check animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.5 }}
      >
        <CheckCircle size={80} color="#10B981" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: '32px', fontWeight: '800', color: '#1A1A2E', marginBottom: '6px' }}>
          {t ? 'Ticket Printed Successfully! 🎉' : 'Tiket Berhasil Dicetak! 🎉'}
        </div>
        <div style={{ fontSize: '18px', color: '#6B7280' }}>
          {t ? 'Please take your ticket and wait to be called' : 'Silakan ambil tiket dan menunggu Anda dipanggil'}
        </div>
      </motion.div>

      {/* Queue number card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 12px 60px rgba(233,30,140,0.2)',
          padding: '40px 80px',
          textAlign: 'center',
          border: '3px solid #FCE7F3',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative dots */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '8px',
          background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #4FC3F7)',
          borderRadius: '28px 28px 0 0',
        }} />

        <div style={{ fontSize: '20px', color: '#9CA3AF', fontWeight: '600', marginBottom: '8px', letterSpacing: '4px' }}>
          {t ? 'QUEUE NUMBER' : 'NOMOR ANTRIAN'}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
          <span style={{
            fontSize: '72px',
            fontWeight: '900',
            color: '#E91E8C',
            lineHeight: '1',
            letterSpacing: '-2px',
          }}>
            {queueLetter}
          </span>
          <span style={{
            fontSize: '110px',
            fontWeight: '900',
            color: '#E91E8C',
            lineHeight: '1',
            letterSpacing: '-4px',
          }}>
            {queueNum}
          </span>
        </div>

        <div style={{
          marginTop: '16px',
          fontSize: '15px',
          color: '#9CA3AF',
          borderTop: '1px dashed #E5E7EB',
          paddingTop: '16px',
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {state.selectedService && (
            <span>
              {t ? state.selectedService.nameEn : state.selectedService.name}
            </span>
          )}
          {state.selectedTime && (
            <>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span>{state.selectedTime} WIB</span>
            </>
          )}
          {state.selectedDoctor && (
            <>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span>{state.selectedDoctor.name}</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Print reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 28px',
          backgroundColor: '#FFF5F9',
          borderRadius: '14px',
          border: '1px solid #FCE7F3',
        }}
      >
        <Printer size={20} color="#E91E8C" />
        <span style={{ fontSize: '16px', color: '#E91E8C', fontWeight: '600' }}>
          {t ? 'Your ticket is being printed...' : 'Tiket Anda sedang dicetak...'}
        </span>
      </motion.div>

      {/* Done button + countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
      >
        <button
          onClick={handleDone}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '18px 56px', borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            color: '#ffffff', fontSize: '20px', fontWeight: '800',
            cursor: 'pointer', boxShadow: '0 6px 24px rgba(233,30,140,0.4)',
          }}
        >
          <Home size={22} />
          {t ? 'Done / Return to Home' : 'Selesai / Kembali ke Awal'}
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={countdown}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{
              fontSize: '15px',
              color: '#9CA3AF',
              textAlign: 'center',
            }}
          >
            {t
              ? `Auto-return to home in ${countdown} seconds`
              : `Kembali otomatis ke awal dalam ${countdown} detik`}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
