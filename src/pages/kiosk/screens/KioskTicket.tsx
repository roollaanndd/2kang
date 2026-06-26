import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Printer, Home, Clock, Users, Smartphone } from 'lucide-react';
import { CURRENT_QUEUE } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import { OmdcBarcode } from '../../../components/ui/OmdcBarcode';
import { registerTransaction } from '../../../lib/omdcTransactions';

const AUTO_RETURN_SECONDS = 10;
const MINUTES_PER_PATIENT = 15;

export function KioskTicket({ state, setState, goTo }: KioskScreenProps) {
  const t = state.language === 'en';
  const [countdown, setCountdown] = useState(AUTO_RETURN_SECONDS);
  const queueNumber = state.queueNumber || 'A018';

  // OMDC code for this ticket. If the patient was recalled by scanning their
  // OMDC code we reuse it; otherwise we register a fresh kiosk transaction so
  // the printed barcode can be scanned to recall this visit later.
  const [omdcCode] = useState<string>(() => {
    if (state.omdcCode) return state.omdcCode;
    const txn = registerTransaction({
      patientName: state.patientName || 'Walk-in Patient',
      userId: state.patientName || `walkin-${queueNumber}`,
      serviceId: state.selectedService?.id,
      serviceName: state.selectedService?.name,
      doctorName: state.selectedDoctor?.name,
      date: state.selectedDate,
      time: state.selectedTime,
      queueNumber,
      source: 'kiosk',
    });
    return txn.code;
  });

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

  // ─── Estimated wait + people ahead, derived from the live "currently serving" number ───
  const myNum = parseInt(queueNumber.replace(/\D/g, ''), 10) || 18;
  const servingNum = parseInt(CURRENT_QUEUE.replace(/\D/g, ''), 10) || 17;
  const peopleAhead = Math.max(0, myNum - servingNum);
  const waitMinutes = Math.max(5, peopleAhead * MINUTES_PER_PATIENT);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #FFF8F4 0%, #F0FAFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Signature 3px top gradient strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header (flexShrink:0) */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '24px',
        paddingBottom: '8px',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.5 }}
          style={{ marginBottom: '8px' }}
        >
          <CheckCircle size={54} color="#D4A017" strokeWidth={1.75} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="kd" style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A2E', marginBottom: '2px' }}>
            {t ? 'Ticket Printed Successfully!' : 'Tiket Berhasil Dicetak!'}
          </div>
          <div style={{ fontSize: '16px', color: '#6B7280' }}>
            {t ? 'Please take your ticket and wait to be called' : 'Silakan ambil tiket dan menunggu Anda dipanggil'}
          </div>
        </motion.div>
      </div>

      {/* Middle — two-column content (flex:1, minHeight:0) */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '8px 56px',
      }}>
        {/* Left — ticket / queue card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5, type: 'spring' }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            boxShadow: '0 12px 50px rgba(233,30,140,0.16)',
            padding: '28px 44px 24px',
            textAlign: 'center',
            border: '2px solid #FCE7F3',
            position: 'relative',
            overflow: 'hidden',
            flex: '0 0 auto',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '7px',
            background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
          }} />

          <div style={{ fontSize: '16px', color: '#9CA3AF', fontWeight: '600', marginBottom: '4px', letterSpacing: '4px' }}>
            {t ? 'QUEUE NUMBER' : 'NOMOR ANTRIAN'}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
            <span className="kd" style={{ fontSize: '56px', fontWeight: '900', color: '#E91E8C', lineHeight: '1', letterSpacing: '-2px' }}>
              {queueLetter}
            </span>
            <span className="kd" style={{ fontSize: '88px', fontWeight: '900', color: '#E91E8C', lineHeight: '1', letterSpacing: '-4px' }}>
              {queueNum}
            </span>
          </div>

          {/* People-ahead + estimated-wait chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '18px' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 18px', borderRadius: '14px',
              backgroundColor: '#FFF8F4', border: '1px solid #FCE7F3',
            }}>
              <Users size={20} color="#E91E8C" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>
                  {t ? 'Ahead of you' : 'Di depan Anda'}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A2E' }}>
                  {peopleAhead} {t ? 'people' : 'orang'}
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 18px', borderRadius: '14px',
              backgroundColor: '#F0FAFF', border: '1px solid #CFF1FB',
            }}>
              <Clock size={20} color="#D4A017" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>
                  {t ? 'Est. wait' : 'Estimasi tunggu'}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0D1421' }}>
                  ~{waitMinutes} {t ? 'min' : 'menit'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service / time / doctor row */}
          <div style={{
            marginTop: '18px',
            fontSize: '14px',
            color: '#9CA3AF',
            borderTop: '1px dashed #E5E7EB',
            paddingTop: '14px',
            display: 'flex',
            gap: '18px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {state.selectedService && (
              <span>{t ? state.selectedService.nameEn : state.selectedService.name}</span>
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

        {/* Right — track-on-phone QR card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.5, type: 'spring' }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            boxShadow: '0 12px 50px rgba(6,182,212,0.14)',
            padding: '24px 30px',
            textAlign: 'center',
            border: '2px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            flex: '0 0 auto',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 16px', borderRadius: '100px',
            backgroundColor: '#F0FAFF', border: '1px solid #CFF1FB',
          }}>
            <Smartphone size={16} color="#06B6D4" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0E7490', letterSpacing: '0.5px' }}>
              {t ? 'YOUR OMDC CODE' : 'KODE OMDC ANDA'}
            </span>
          </div>

          {/* OMDC barcode card */}
          <div style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '2px solid #F3F4F6',
            boxShadow: 'inset 0 0 0 6px #ffffff, 0 6px 22px rgba(0,0,0,0.06)',
          }}>
            <OmdcBarcode code={omdcCode} height={92} moduleWidth={1.8} background="#ffffff" />
          </div>

          <div style={{ fontSize: '15px', fontWeight: '600', color: '#374151', maxWidth: '240px', lineHeight: '1.4' }}>
            {t
              ? 'Scan this code at any OMDC kiosk to instantly recall your visit'
              : 'Scan kode ini di kiosk OMDC untuk memanggil data kunjungan Anda'}
          </div>

          {/* Live print reminder */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '100px',
            backgroundColor: '#FFF8F4', border: '1px solid #FCE7F3',
          }}>
            <Printer size={16} color="#E91E8C" />
            <span style={{ fontSize: '13px', color: '#E91E8C', fontWeight: '600' }}>
              {t ? 'Printing your ticket…' : 'Tiket sedang dicetak…'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom action bar (flexShrink:0) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 40px 22px',
        }}
      >
        <button
          onClick={handleDone}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '16px 56px', borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            color: '#ffffff', fontSize: '19px', fontWeight: '800',
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
            style={{ fontSize: '14px', color: '#9CA3AF', textAlign: 'center' }}
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
