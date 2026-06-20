import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  User, ClipboardList, Bell, Pill, Star, Gift, HelpCircle, LogOut, ChevronRight, Users,
} from 'lucide-react';
import type { MobileState, MobileScreen } from '../../../types';

interface MobileProfileProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const MENU_ITEMS: {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  screen?: MobileScreen;
  danger?: boolean;
}[] = [
  { icon: <User size={20} />, label: 'Data Diri', sublabel: 'Informasi profil Anda' },
  { icon: <ClipboardList size={20} />, label: 'Riwayat Kunjungan', sublabel: 'Rekam kunjungan sebelumnya', screen: 'history' },
  { icon: <Users size={20} />, label: 'Profil Keluarga', sublabel: 'Kelola anggota keluarga', screen: 'family' },
  { icon: <Bell size={20} />, label: 'Notifikasi', sublabel: 'Atur preferensi notifikasi', screen: 'notifications' },
  { icon: <Pill size={20} />, label: 'Riwayat Medis', sublabel: 'Catatan medis Anda', screen: 'medical' },
  { icon: <Star size={20} />, label: 'Ulasan Saya', sublabel: 'Ulasan yang telah dibuat' },
  { icon: <Gift size={20} />, label: 'Promo & Voucher', sublabel: 'Voucher aktif Anda', screen: 'promos' },
  { icon: <HelpCircle size={20} />, label: 'Bantuan', sublabel: 'FAQ & hubungi kami' },
  { icon: <LogOut size={20} />, label: 'Keluar', danger: true },
];

export function MobileProfile({ state, setState }: MobileProfileProps) {
  const user = state.user;
  const initial = user?.name?.[0]?.toUpperCase() ?? 'U';

  const handleMenu = (item: typeof MENU_ITEMS[number]) => {
    if (item.danger) {
      setState({ isLoggedIn: false, screen: 'onboarding', user: undefined, onboardingStep: 0 });
      return;
    }
    if (item.screen) setState({ screen: item.screen });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#F8F9FA' }}
    >
      {/* Header */}
      <div
        className="pt-12 pb-8 px-5 relative overflow-hidden"
        style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="flex flex-col items-center gap-3 relative z-10">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              border: '3px solid white',
              boxShadow: '0 4px 20px rgba(233,30,140,0.3)',
            }}
          >
            <span className="text-white font-black text-3xl">{initial}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-xl font-black" style={{ color: '#111827' }}>{user?.name ?? 'Pengguna'}</h2>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>{user?.email}</p>

            <div
              className="mt-2 px-3 py-1 rounded-full inline-block"
              style={{ background: '#FFF0F7', border: '1px solid rgba(233,30,140,0.15)' }}
            >
              <p className="text-xs font-semibold" style={{ color: '#E91E8C' }}>
                📋 {user?.medicalRecordNo ?? 'RM-2024-001'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-5 -mt-4 bg-white rounded-2xl px-4 py-3 flex items-center divide-x divide-gray-100 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {[
          { value: '12', label: 'Kunjungan' },
          { value: '4.9', label: 'Rating' },
          { value: '3', label: 'Aktif' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 text-center px-2">
            <p className="text-lg font-black" style={{ color: '#1A1A2E' }}>{stat.value}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="px-5 flex flex-col gap-2 pb-28">
        {MENU_ITEMS.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleMenu(item)}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white text-left transition-all active:scale-[0.98]"
            style={{
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              border: item.danger ? '1.5px solid #FEE2E2' : '1.5px solid transparent',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: item.danger ? '#FEF2F2' : '#FFF5F9',
                color: item.danger ? '#EF4444' : '#E91E8C',
              }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <p
                className="font-bold text-sm"
                style={{ color: item.danger ? '#EF4444' : '#1A1A2E' }}
              >
                {item.label}
              </p>
              {item.sublabel && (
                <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>
                  {item.sublabel}
                </p>
              )}
            </div>
            {!item.danger && (
              <ChevronRight size={16} style={{ color: '#D1D5DB' }} />
            )}
          </motion.button>
        ))}

        {/* Version */}
        <p className="text-center text-xs mt-4" style={{ color: '#D1D5DB' }}>
          OMDC Dental v1.0.0 • © 2024
        </p>
      </div>
    </motion.div>
  );
}
