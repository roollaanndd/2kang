import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileOTPProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const BOX_COUNT = 6;
const RESEND_SECONDS = 60;

export function MobileOTP({ state, setState }: MobileOTPProps) {
  const [digits, setDigits] = useState<string[]>(Array(BOX_COUNT).fill(''));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = char;
    setDigits(next);
    if (char && i < BOX_COUNT - 1) {
      inputRefs.current[i + 1]?.focus();
    }
    if (next.every(d => d !== '') && char) {
      haptic('success');
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (digits.some(d => d === '')) return;
    haptic('success');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setState({ screen: 'create-pin' });
    }, 900);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setDigits(Array(BOX_COUNT).fill(''));
    setCountdown(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
  };

  const isComplete = digits.every(d => d !== '');

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}
    >
      {/* Header */}
      <div style={{ position: 'relative', padding: '52px 20px 20px', background: 'white', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setState({ screen: 'register' })}
            style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.15)', cursor: 'pointer' }}
          >
            <ArrowLeft size={18} color="#E91E8C" />
          </button>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 1 }}>Verifikasi OTP</h1>
            <p style={{ fontSize: 11, color: '#9CA3AF' }}>Kode dikirim ke nomor Anda</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 28px rgba(233,30,140,0.30)' }}
        >
          <MessageSquare size={36} color="white" />
        </motion.div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', lineHeight: 1.65, maxWidth: 260, marginBottom: 32 }}>
          Masukkan 6 digit kode OTP yang telah dikirim ke nomor HP Anda
        </p>

        {/* OTP boxes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {digits.map((d, i) => (
            <motion.div
              key={i}
              animate={d ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              <input
                ref={el => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                style={{
                  width: 46,
                  height: 56,
                  borderRadius: 14,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#1A1A2E',
                  border: `2px solid ${d ? '#E91E8C' : '#E5E7EB'}`,
                  background: d ? '#FFF0F8' : '#FAFAFA',
                  outline: 'none',
                  transition: 'all 0.18s',
                  caretColor: 'transparent',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#E91E8C'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.12)'; }}
                onBlur={e => { if (!d) e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </motion.div>
          ))}
        </div>

        {/* Resend */}
        <div style={{ marginBottom: 32, marginTop: 10 }}>
          {countdown > 0 ? (
            <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>
              Kirim ulang dalam <span style={{ color: '#E91E8C', fontWeight: 700 }}>{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#E91E8C', cursor: 'pointer' }}
            >
              Kirim ulang kode
            </button>
          )}
        </div>

        {/* Verify button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleVerify}
          disabled={!isComplete || loading}
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 18,
            fontWeight: 800,
            fontSize: 16,
            color: 'white',
            background: isComplete
              ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
              : '#E5E7EB',
            border: 'none',
            cursor: isComplete ? 'pointer' : 'default',
            boxShadow: isComplete ? '0 8px 28px rgba(233,30,140,0.28)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? <span style={{ width: 22, height: 22, border: '2.5px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
            : <span style={{ color: isComplete ? 'white' : '#9CA3AF' }}>Verifikasi</span>
          }
        </motion.button>
      </div>
    </motion.div>
  );
}
