import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, QrCode, Phone, FileText, ChevronRight } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';

type CheckinMethod = 'qr' | 'phone' | 'medrecord' | null;

export function KioskCheckin({ state, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [method, setMethod] = useState<CheckinMethod>(null);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        goTo('ticket');
      }, 1800);
    }, 2000);
  };

  const CHECKIN_OPTIONS = [
    {
      id: 'qr' as CheckinMethod,
      icon: <QrCode size={40} strokeWidth={1.5} />,
      label: t ? 'Scan QR Code' : 'Scan QR Code',
      desc: t ? 'From app / booking confirmation' : 'Dari aplikasi / konfirmasi booking',
      color: '#E91E8C',
    },
    {
      id: 'phone' as CheckinMethod,
      icon: <Phone size={40} strokeWidth={1.5} />,
      label: t ? 'Mobile Number' : 'No. Handphone',
      desc: t ? 'Enter your registered phone number' : 'Masukkan nomor HP yang terdaftar',
      color: '#06B6D4',
    },
    {
      id: 'medrecord' as CheckinMethod,
      icon: <FileText size={40} strokeWidth={1.5} />,
      label: t ? 'Medical Record No.' : 'No. Rekam Medis',
      desc: t ? 'Enter your medical record number' : 'Masukkan nomor rekam medis Anda',
      color: '#FF6BB5',
    },
  ];

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
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        padding: '28px 60px 20px',
        paddingTop: '31px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div className="kd" style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Patient Check-in' : 'Check-in Pasien Lama'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Choose your check-in method' : 'Pilih metode check-in Anda'}
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '32px 60px',
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
      }}>
        {/* Method selection */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CHECKIN_OPTIONS.map((opt, index) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setMethod(opt.id); setInputValue(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px 28px',
                borderRadius: '18px',
                border: `2px solid ${method === opt.id ? opt.color : '#E5E7EB'}`,
                backgroundColor: method === opt.id ? opt.color + '10' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: method === opt.id ? `0 4px 20px ${opt.color}25` : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '72px', height: '72px', borderRadius: '18px',
                backgroundColor: method === opt.id ? opt.color : opt.color + '15',
                color: method === opt.id ? '#ffffff' : opt.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s',
              }}>
                {opt.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '20px', fontWeight: '700',
                  color: method === opt.id ? opt.color : '#1A1A2E',
                  marginBottom: '4px',
                }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '15px', color: '#9CA3AF' }}>{opt.desc}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Input area */}
        <div style={{ width: '380px', flexShrink: 0 }}>
          <AnimatePresence mode="wait">
            {method === null && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '2px dashed #E5E7EB',
                  color: '#9CA3AF',
                  textAlign: 'center',
                  padding: '32px',
                }}
              >
                <div style={{ fontSize: '48px' }}>👈</div>
                <div style={{ fontSize: '17px', fontWeight: '600' }}>
                  {t ? 'Select a check-in method on the left' : 'Pilih metode check-in di sebelah kiri'}
                </div>
              </motion.div>
            )}

            {method === 'qr' && (
              <motion.div
                key="qr-area"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '2px solid #FCE7F3',
                  padding: '32px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 4px 20px rgba(233,30,140,0.1)',
                }}
              >
                {/* QR scan animation */}
                <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    border: '3px solid #E91E8C',
                    borderRadius: '16px',
                  }} />
                  {/* Corner markers */}
                  {[
                    { top: 0, left: 0, borderRight: 'none', borderBottom: 'none' },
                    { top: 0, right: 0, borderLeft: 'none', borderBottom: 'none' },
                    { bottom: 0, left: 0, borderRight: 'none', borderTop: 'none' },
                    { bottom: 0, right: 0, borderLeft: 'none', borderTop: 'none' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      position: 'absolute', width: '28px', height: '28px',
                      border: '4px solid #E91E8C', ...s,
                      borderRadius: i === 0 ? '8px 0 0 0' : i === 1 ? '0 8px 0 0' : i === 2 ? '0 0 0 8px' : '0 0 8px 0',
                    }} />
                  ))}
                  {/* Scan line */}
                  <motion.div
                    animate={{ top: ['15%', '85%', '15%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute', left: '8px', right: '8px', height: '2px',
                      backgroundColor: '#E91E8C', borderRadius: '2px',
                      boxShadow: '0 0 8px rgba(233,30,140,0.6)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: '24px',
                    display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '4px',
                    opacity: 0.3,
                  }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} style={{
                        backgroundColor: Math.random() > 0.5 ? '#E91E8C' : 'transparent',
                        borderRadius: '2px',
                      }} />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.5' }}>
                  {t ? 'Point your QR code at the camera above' : 'Arahkan QR Code Anda ke kamera di atas'}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckin}
                  disabled={isProcessing || success}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                    background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                    color: '#ffffff', fontSize: '17px', fontWeight: '700',
                    cursor: isProcessing ? 'wait' : 'pointer',
                    boxShadow: '0 4px 16px rgba(233,30,140,0.35)',
                  }}
                >
                  {isProcessing ? '⏳ ' + (t ? 'Processing...' : 'Memproses...') :
                   success ? '✓ ' + (t ? 'Success!' : 'Berhasil!') :
                   t ? 'Simulate Scan' : 'Simulasi Scan'}
                </motion.button>
              </motion.div>
            )}

            {(method === 'phone' || method === 'medrecord') && (
              <motion.div
                key={`input-${method}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: `2px solid ${method === 'phone' ? '#06B6D4' : '#FF6BB5'}22`,
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A2E' }}>
                  {method === 'phone'
                    ? (t ? 'Enter Mobile Number' : 'Masukkan No. Handphone')
                    : (t ? 'Enter Medical Record No.' : 'Masukkan No. Rekam Medis')}
                </div>

                <input
                  type={method === 'phone' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={method === 'phone' ? '08xx xxxx xxxx' : 'RM-xxxxx'}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    fontSize: '24px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    border: `2px solid ${method === 'phone' ? '#06B6D4' : '#FF6BB5'}`,
                    borderRadius: '14px',
                    outline: 'none',
                    color: '#1A1A2E',
                    backgroundColor: '#F9FAFB',
                    boxSizing: 'border-box',
                  }}
                />

                {/* Numpad */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: '10px',
                }}>
                  {['1','2','3','4','5','6','7','8','9','*','0','⌫'].map(key => (
                    <button
                      key={key}
                      onClick={() => {
                        if (key === '⌫') setInputValue(v => v.slice(0, -1));
                        else setInputValue(v => v + key);
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '2px solid #E5E7EB',
                        backgroundColor: key === '⌫' ? '#FFF5F9' : '#ffffff',
                        color: key === '⌫' ? '#E91E8C' : '#1A1A2E',
                        fontSize: '20px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckin}
                  disabled={inputValue.length < 4 || isProcessing || success}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                    background: inputValue.length >= 4
                      ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
                      : '#E5E7EB',
                    color: inputValue.length >= 4 ? '#ffffff' : '#9CA3AF',
                    fontSize: '17px', fontWeight: '700',
                    cursor: inputValue.length >= 4 ? 'pointer' : 'not-allowed',
                    boxShadow: inputValue.length >= 4 ? '0 4px 16px rgba(233,30,140,0.35)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {isProcessing ? '⏳ ' + (t ? 'Processing...' : 'Memproses...') :
                   success ? '✓ ' + (t ? 'Checked in!' : 'Check-in Berhasil!') :
                   t ? 'Start Check-in' : 'Mulai Check-in'}
                  {!isProcessing && !success && <ChevronRight size={18} />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
