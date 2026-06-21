import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Phone, Mail, Calendar, Lock } from 'lucide-react';
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

interface MobileRegisterProps {
  setState: (s: Partial<MobileState>) => void;
}

export function MobileRegister({ setState }: MobileRegisterProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'M' as 'M' | 'F',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user: MobileUser = {
        ...MOCK_USER,
        name: form.name || MOCK_USER.name,
        phone: form.phone || MOCK_USER.phone,
        email: form.email || MOCK_USER.email,
        dob: form.dob || MOCK_USER.dob,
        gender: form.gender,
      };
      setState({ screen: 'otp', user });
    }, 800);
  };

  const inputStyle = {
    border: '1.5px solid #E5E7EB',
    color: '#1A1A2E',
    background: '#FAFAFA',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-white overflow-y-auto"
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-5 relative"
        style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <button
          onClick={() => setState({ screen: 'login' })}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.15)' }}
        >
          <ArrowLeft size={20} style={{ color: '#E91E8C' }} />
        </button>
        <div>
          <h1 className="text-xl font-black" style={{ color: '#111827' }}>Buat Akun Baru</h1>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Isi data diri Anda untuk mendaftar</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 flex flex-col gap-4">
        {/* Nama Lengkap */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>Nama Lengkap</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Nama lengkap sesuai KTP"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* No. HP */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>No. HP</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="tel"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="0812-3456-7890"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="email"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>Tanggal Lahir</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="date"
              value={form.dob}
              onChange={e => update('dob', e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="text-xs font-semibold mb-2 block" style={{ color: '#374151' }}>Jenis Kelamin</label>
          <div className="flex gap-3">
            {(['M', 'F'] as const).map(g => (
              <button
                key={g}
                onClick={() => update('gender', g)}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all active:scale-95"
                style={{
                  borderColor: form.gender === g ? '#E91E8C' : '#E5E7EB',
                  background: form.gender === g ? '#FFF5F9' : 'white',
                  color: form.gender === g ? '#E91E8C' : '#6B7280',
                }}
              >
                {g === 'M' ? '♂ Pria' : '♀ Wanita'}
              </button>
            ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="password"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              placeholder="Minimal 8 karakter"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>Konfirmasi Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="password"
              value={form.confirm}
              onChange={e => update('confirm', e.target.value)}
              placeholder="Ulangi password"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#E91E8C')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
          </div>
        </div>

        {/* Daftar Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center mt-2"
          style={{
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
          }}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : 'Daftar'}
        </button>

        <p className="text-center text-sm mt-1 mb-4" style={{ color: '#6B7280' }}>
          Sudah punya akun?{' '}
          <button onClick={() => setState({ screen: 'login' })} className="font-bold" style={{ color: '#E91E8C' }}>
            Masuk
          </button>
        </p>
      </div>
    </motion.div>
  );
}
