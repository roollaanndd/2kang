import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import type { MobileState, MobileUser } from '../../../types';

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

interface MobileLoginProps {
  setState: (s: Partial<MobileState>) => void;
}

export function MobileLogin({ setState }: MobileLoginProps) {
  const [phone, setPhone] = useState('');
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
      className="flex flex-col h-full bg-white overflow-y-auto"
    >
      {/* Top decoration */}
      <div
        className="h-36 w-full flex-shrink-0"
        style={{ background: 'linear-gradient(160deg, #E91E8C 0%, #FF6BB5 100%)' }}
      >
        <div className="flex items-end justify-center h-full pb-0">
          <div
            className="w-full h-8 bg-white"
            style={{ borderRadius: '24px 24px 0 0' }}
          />
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 -mt-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="rounded-2xl p-3 -mt-12 relative z-10"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(233,30,140,0.15)' }}
          >
            <OmdcLogo size="md" variant="default" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-center mb-1" style={{ color: '#1A1A2E' }}>
          Selamat Datang Kembali!
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: '#6B7280' }}>
          Masuk ke akun Anda
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Phone/Email */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>
              No. HP / Email
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0812-3456-7890 atau email@..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none transition-all"
                style={{
                  border: '1.5px solid #E5E7EB',
                  color: '#1A1A2E',
                  background: '#FAFAFA',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm border outline-none transition-all"
                style={{
                  border: '1.5px solid #E5E7EB',
                  color: '#1A1A2E',
                  background: '#FAFAFA',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
                onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                {showPassword
                  ? <EyeOff size={16} style={{ color: '#9CA3AF' }} />
                  : <Eye size={16} style={{ color: '#9CA3AF' }} />
                }
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-xs font-semibold" style={{ color: '#E91E8C' }}>
              Lupa Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
            }}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : 'Masuk'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: '#E5E7EB' }} />
          <span className="text-xs" style={{ color: '#9CA3AF' }}>atau masuk dengan</span>
          <div className="flex-1 h-px" style={{ background: '#E5E7EB' }} />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all active:scale-95"
            style={{ border: '1.5px solid #E5E7EB', color: '#374151' }}
          >
            {/* Google G */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
            style={{ background: '#000000' }}
          >
            <svg width="16" height="18" viewBox="0 0 814 1000" fill="white">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.7-60.3-158.2-127.2C60.2 734.6 0 617.2 0 504.6c0-119.2 78.8-182.4 154.8-182.4 77.5 0 119.2 42.4 166.9 42.4 45.4 0 92.7-44.9 166.9-44.9s126.8 48.2 126.8 48.2zm-97.1-175C631.1 120.6 653 72.3 653 24c0-6.4-.6-12.8-1.9-18.5-45 1.3-98.9 30.1-131.5 67.9-29.5 33.8-52.5 84.9-52.5 136.8 0 7.1 1.3 14.2 1.9 16.4 3.2.6 8.4 1.3 13.6 1.3 40.8 0 90.3-27.4 119.2-59.5z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm mt-6" style={{ color: '#6B7280' }}>
          Belum punya akun?{' '}
          <button
            onClick={() => setState({ screen: 'register' })}
            className="font-bold"
            style={{ color: '#E91E8C' }}
          >
            Daftar Sekarang
          </button>
        </p>
      </div>
    </motion.div>
  );
}
