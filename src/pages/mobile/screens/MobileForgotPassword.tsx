import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, KeyRound } from 'lucide-react';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileForgotPasswordProps {
  setState: (s: Partial<MobileState>) => void;
}

export function MobileForgotPassword({ setState }: MobileForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email.trim()) return;
    haptic('selection');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      haptic('success');
    }, 1000);
  };

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
          <button
            onClick={() => setState({ screen: 'login' })}
            style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.15)', cursor: 'pointer' }}
          >
            <ArrowLeft size={18} color="#E91E8C" />
          </button>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 1 }}>Lupa Password?</h1>
            <p style={{ fontSize: 11, color: '#9CA3AF' }}>Kami akan mengirim kode reset</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 24px 40px' }}>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{
            width: 80, height: 80, borderRadius: 24,
            background: sent ? 'linear-gradient(135deg, #D4A017, #B8860B)' : 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, boxShadow: sent ? '0 8px 28px rgba(16,185,129,0.30)' : '0 8px 28px rgba(233,30,140,0.30)',
          }}
        >
          {sent
            ? <Mail size={36} color="white" />
            : <KeyRound size={36} color="white" />
          }
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: 280 }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A2E', marginBottom: 10 }}>Email Terkirim!</h2>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, marginBottom: 32 }}>
              Kami telah mengirim tautan reset password ke <strong style={{ color: '#1A1A2E' }}>{email}</strong>.
              Silakan cek email Anda.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setState({ screen: 'login' })}
              style={{ width: '100%', padding: '16px 0', borderRadius: 18, fontWeight: 800, fontSize: 15, color: 'white', background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(233,30,140,0.28)' }}
            >
              Kembali ke Login
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: 340 }}
          >
            <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', lineHeight: 1.65, marginBottom: 28 }}>
              Masukkan email yang terdaftar pada akun Anda dan kami akan mengirimkan kode verifikasi.
            </p>

            {/* Email input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 8 }}>
                Alamat Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={{
                    width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 14, paddingBottom: 14,
                    borderRadius: 14, fontSize: 14, border: '1.5px solid #E5E7EB', background: '#FAFAFA',
                    color: '#1A1A2E', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#E91E8C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.10)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Send button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSend}
              disabled={!email.trim() || loading}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 18, fontWeight: 800, fontSize: 16,
                color: email.trim() ? 'white' : '#9CA3AF',
                background: email.trim() ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#F3F4F6',
                border: 'none', cursor: email.trim() ? 'pointer' : 'default',
                boxShadow: email.trim() ? '0 8px 28px rgba(233,30,140,0.28)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 16,
              }}
            >
              {loading
                ? <span style={{ width: 22, height: 22, border: '2.5px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                : 'Kirim Kode Reset'
              }
            </motion.button>

            <button
              onClick={() => setState({ screen: 'login' })}
              style={{ width: '100%', background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#9CA3AF', cursor: 'pointer', textAlign: 'center' }}
            >
              Kembali ke Masuk
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
