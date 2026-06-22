import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import type { MobileState, MobileUser } from '../../../types';

const MOCK_USER: MobileUser = {
  id: 'u1',
  name: 'Andi Pratama',
  phone: '0812-3456-7890',
  email: 'andi@email.com',
  medicalRecordNo: 'RM-2024-001',
  dob: '1990-05-15',
  gender: 'M',
  photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs6GS81_oiSBE2Fm-wUrxc8BZMKDlng5av50nSHYR95I90yoNkFwxzf2_g0xyzcAOXzyNmcoB5-iz_Y_nFdENN_z4cXq7EloQfFA-Efz1oL0wzSjjNzEwkb4tE4kNd_BtIPN_gMnkVpM093qjp8HrF6FhBLJgyQPVuAgzSHFTXE8g8u2Km8kcNhe9joBPweI_4UCs2B-AnAic8dx9SX_0to4kTP1CiyodLY9JrqZjDuyLSHzj2GB8NF99GWwqYQy_WgViwLT5tZaI',
};

interface MobileLoginProps {
  setState: (s: Partial<MobileState>) => void;
}

export function MobileLogin({ setState }: MobileLoginProps) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setState({ screen: 'home', isLoggedIn: true, user: MOCK_USER });
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF', overflow: 'hidden' }}
    >
      {/* 3px gradient strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      {/* Logo area */}
      <div style={{ paddingTop: 56, paddingBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 56, height: 56, background: '#FFF5F9', borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12, boxShadow: '0 2px 8px rgba(233,30,140,0.08)',
          border: '1px solid rgba(233,30,140,0.08)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.5 2.8 1.2 4.1.7 1.3 1.1 2.7 1.1 4.6 0 .7.4 1.3 1 1.3h4.4c.6 0 1-.6 1-1.3 0-1.9.4-3.3 1.1-4.6.7-1.3 1.2-2.6 1.2-4.1C18.5 4 16.5 2 14 2c-.7 0-1.4.3-1.9.8-.1.1-.1.2-.1.2s0-.1-.1-.2C11.4 2.3 10.7 2 10 2" fill="#E91E8C" opacity="0.8"/>
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.5 2.8 1.2 4.1.7 1.3 1.1 2.7 1.1 4.6 0 .7.4 1.3 1 1.3h4.4c.6 0 1-.6 1-1.3 0-1.9.4-3.3 1.1-4.6.7-1.3 1.2-2.6 1.2-4.1C18.5 4 16.5 2 14 2" fill="#E91E8C"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0D1421', letterSpacing: -0.3 }}>OMDC Dental</h1>
      </div>

      {/* Form area */}
      <div style={{ flex: 1, padding: '0 24px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0D1421', marginBottom: 8 }}>Masuk</h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.5 }}>
            Senyum Sehat, Percaya Diri Penuh. Silakan masuk untuk melanjutkan.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flexShrink: 0 }}>
          {/* Email/Phone field */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Email / Nomor HP
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={18} style={{ position: 'absolute', left: 16, color: '#6B7280', flexShrink: 0 }} />
              <input
                type="text"
                value={identity}
                onChange={e => setIdentity(e.target.value)}
                placeholder="Masukkan email atau nomor HP"
                style={{
                  width: '100%', padding: '14px 16px 14px 48px',
                  background: 'rgba(255,245,249,0.6)', border: '1px solid #FCE7F3',
                  borderRadius: 16, fontSize: 14, color: '#0D1421', outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#FCE7F3')}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', left: 16, color: '#6B7280', flexShrink: 0 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                style={{
                  width: '100%', padding: '14px 48px 14px 48px',
                  background: 'rgba(255,245,249,0.6)', border: '1px solid #FCE7F3',
                  borderRadius: 16, fontSize: 14, color: '#0D1421', outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#FCE7F3')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{ position: 'absolute', right: 16, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} color="#6B7280" /> : <Eye size={18} color="#6B7280" />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
            <button
              onClick={() => setState({ screen: 'forgot-password' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#E91E8C' }}
            >
              Lupa password?
            </button>
          </div>

          {/* Login button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '16px 0', borderRadius: 16, border: 'none',
              background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)', color: 'white',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(233,30,140,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span style={{ width: 20, height: 20, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            ) : (
              <>Masuk <ArrowRight size={18} /></>
            )}
          </motion.button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0', flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>atau</span>
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, background: 'white', border: '1px solid #E5E7EB', borderRadius: 16,
            padding: '14px 0', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#0D1421',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google
          </button>
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, background: 'white', border: '1px solid #E5E7EB', borderRadius: 16,
            padding: '14px 0', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#0D1421',
          }}>
            <svg width="20" height="20" viewBox="0 0 814 1000" fill="#0D1421">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.7-60.3-158.2-127.2C60.2 734.6 0 617.2 0 504.6c0-119.2 78.8-182.4 154.8-182.4 77.5 0 119.2 42.4 166.9 42.4 45.4 0 92.7-44.9 166.9-44.9s126.8 48.2 126.8 48.2zm-97.1-175C631.1 120.6 653 72.3 653 24c0-6.4-.6-12.8-1.9-18.5-45 1.3-98.9 30.1-131.5 67.9-29.5 33.8-52.5 84.9-52.5 136.8 0 7.1 1.3 14.2 1.9 16.4 3.2.6 8.4 1.3 13.6 1.3 40.8 0 90.3-27.4 119.2-59.5z"/>
            </svg>
            Lanjutkan dengan Apple
          </button>
        </div>

        {/* Register link */}
        <div style={{ marginTop: 'auto', paddingTop: 32, textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontSize: 13, color: '#6B7280' }}>
            Belum punya akun?{' '}
            <button
              onClick={() => setState({ screen: 'register' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, color: '#E91E8C', fontSize: 13 }}
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
