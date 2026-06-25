/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, ClipboardList, Bell, Pill, Star, Gift, HelpCircle, LogOut,
  ChevronRight, Users, Shield, CheckCircle, X, ScrollText,
  Calendar, ArrowLeft, Edit3, Globe, Language,
} from 'lucide-react';
import type { MobileState } from '../../../types';
import { APP_VERSION } from '../../../version';
import { haptic } from '../../../lib/haptics';

interface MobileProfileProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

const MENU_GROUPS = [
  {
    title: 'Akun & Keamanan',
    items: [
      { id: 'profile-data',  icon: User,         label: 'Data Diri',         screen: undefined     as undefined },
      { id: 'medical',       icon: Pill,          label: 'Rekam Medis',       screen: 'medical'     as const    },
      { id: 'family',        icon: Users,         label: 'Keluarga',          screen: 'family'      as const    },
      { id: 'insurance',     icon: Shield,        label: 'Asuransi',          screen: undefined     as undefined },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { id: 'notifications', icon: Bell,          label: 'Notifikasi',        screen: 'notifications' as const  },
      { id: 'language',      icon: Globe,         label: 'Bahasa',            screen: undefined     as undefined, sublabel: 'Indonesia' },
      { id: 'help',          icon: HelpCircle,    label: 'Bantuan',           screen: undefined     as undefined },
    ],
  },
];

const TNC_TEXT = `Syarat dan Ketentuan Penggunaan Aplikasi OMDC Dental

Terakhir diperbarui: Januari 2025

1. PENERIMAAN KETENTUAN
Dengan menggunakan aplikasi OMDC Dental ("Aplikasi"), Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, mohon hentikan penggunaan Aplikasi.

2. PENGGUNAAN LAYANAN
Aplikasi ini disediakan untuk membantu pasien dalam pemesanan janji temu, melihat riwayat kunjungan, dan mengakses informasi layanan kesehatan gigi di OMDC Dental. Anda setuju untuk menggunakan Aplikasi hanya untuk tujuan yang sah dan sesuai dengan ketentuan ini.

3. PRIVASI DATA
Kami menghormati privasi Anda. Data pribadi Anda — termasuk nama, kontak, dan riwayat medis — hanya digunakan untuk keperluan layanan kesehatan dan tidak dibagikan kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.

4. DATA MEDIS
Informasi medis yang Anda berikan bersifat rahasia dan dilindungi. Hanya tenaga medis yang berwenang di OMDC Dental yang dapat mengakses rekam medis Anda sesuai prosedur klinis yang berlaku.

5. PEMESANAN JANJI TEMU
Pemesanan janji temu melalui Aplikasi tunduk pada ketersediaan jadwal dokter. OMDC Dental berhak mengubah atau membatalkan jadwal dengan pemberitahuan sebelumnya.

6. PERUBAHAN KETENTUAN
OMDC Dental berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui Aplikasi.`;

function TnCModal({ accepted, onAccept, onClose }: { accepted: boolean; onAccept: () => void; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(13,20,33,0.6)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 36 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF', borderRadius: '28px 28px 0 0',
          maxHeight: '85vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{
          padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid rgba(0,0,0,0.06)', flexShrink: 0,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ScrollText size={20} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: DARK, margin: 0, lineHeight: 1.2 }}>Syarat & Ketentuan</h3>
            <p style={{ fontSize: 11, color: '#9CA3AF', margin: '2px 0 0' }}>OMDC Dental · Versi 2025</p>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, background: '#F3F4F6',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}>
            <X size={16} color="#6B7280" />
          </button>
        </div>
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 20px',
          scrollbarWidth: 'none', lineHeight: 1.7,
        }}>
          {TNC_TEXT.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontSize: 13, color: para.match(/^\d+\./) ? DARK : '#4B5563',
              fontWeight: para.match(/^\d+\./) ? 700 : 400, marginBottom: 14,
            }}>
              {para}
            </p>
          ))}
        </div>
        <div style={{ padding: '16px 20px 28px', borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
          {accepted ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px', borderRadius: 16,
              background: 'rgba(16,185,129,0.08)', border: '1.5px solid rgba(16,185,129,0.25)',
            }}>
              <CheckCircle size={18} color="#D4A017" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>Anda telah menyetujui ketentuan ini</span>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onAccept}
              style={{
                width: '100%', padding: '15px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                color: 'white', fontWeight: 800, fontSize: 15,
                boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <Shield size={17} />
              Saya Setuju & Menerima
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MobileProfile({ state, setState }: MobileProfileProps) {
  const [showTnC, setShowTnC] = useState(false);
  const user = state.user;
  const tcAccepted = state.tcAccepted ?? false;

  const handleAcceptTnC = () => setState({ tcAccepted: true });

  const handleLogout = () => {
    haptic('medium');
    setState({ isLoggedIn: false, screen: 'onboarding', user: undefined, onboardingStep: 0 });
  };

  const getScreenForItem = (id: string): MobileState['screen'] | undefined => {
    for (const group of MENU_GROUPS) {
      for (const item of group.items) {
        if (item.id === id) return item.screen as MobileState['screen'] | undefined;
      }
    }
    return undefined;
  };

  const handleMenuClick = (id: string) => {
    haptic('selection');
    if (id === 'tnc') { setShowTnC(true); return; }
    const screen = getScreenForItem(id);
    if (screen) setState({ screen });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFF8F4' }}
      >
        {/* 3px gradient strip */}
        <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)' }} />

        {/* Header */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 1px 8px rgba(233,30,140,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setState({ screen: 'home' })}
              style={{ display: 'flex', width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArrowLeft size={22} color={DARK} />
            </button>
            <h1 style={{ fontSize: 18, fontWeight: 900, color: PINK, letterSpacing: -0.3 }}>Profil</h1>
          </div>
          <button
            onClick={() => { haptic('light'); setState({ screen: 'notifications' }); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Bell size={22} color={DARK} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── Profile Card ── */}
            <div style={{
              background: 'white', borderRadius: 20, padding: '24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              border: '1px solid rgba(252,231,243,0.8)',
              boxShadow: '0 4px 20px rgba(233,30,140,0.05)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'relative', marginBottom: 14,
              }}>
                <img
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsJm6Hd3zuvQHAHO-2tZZTLKwucUMxPrVYakmwVrfOx5lQgn7H8rPUHO0E9FvxApcbh9i385scrC8chYANySbYJtsMy4Hmspv7NnWHRljsap8pRDF5UQ0HucY3JJW-PIzrYR6UHUTfU1WACFIsZKvj7SBe-Pv9OE-HUvpbBHmIqrKi6DWM87NPGer4TtoxBjkAFTi4X6ifT7hm35ORakGAiqThN9FxGY1br8lXTaEcAzDjpzPMDzLD00g"
                  alt="Profile Avatar"
                  style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
                />
                <button style={{
                  position: 'absolute', bottom: 2, right: 2,
                  background: PINK, border: 'none', borderRadius: '50%',
                  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 2px 8px rgba(233,30,140,0.3)',
                }}>
                  <Edit3 size={13} color="white" />
                </button>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 4 }}>
                {user?.name ?? 'Budi Santoso'}
              </h2>
              <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
                ID: {user?.medicalRecordNo ?? 'OMDC-88291'}
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(233,30,140,0.07)', color: PINK,
                padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
              }}>
                <Star size={14} fill={PINK} color={PINK} />
                Gold Member
              </div>
            </div>

            {/* ── Quick Stats ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { value: '12', label: 'Kunjungan', color: GOLD, icon: <Calendar size={24} color={GOLD} /> },
                { value: '2.450', label: 'Poin', color: ROSE, icon: (
                  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                )},
                { value: '4', label: 'Keluarga', color: PINK, icon: <Users size={24} color={PINK} /> },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'white', borderRadius: 18, padding: '14px 8px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  border: '1px solid rgba(252,231,243,0.8)',
                  boxShadow: '0 2px 10px rgba(233,30,140,0.04)',
                }}>
                  <div style={{ marginBottom: 8 }}>{stat.icon}</div>
                  <span style={{ fontSize: 18, fontWeight: 900, color: DARK, lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontSize: 10, color: '#6B7280', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Menu Groups ── */}
            {MENU_GROUPS.map((group) => (
              <section key={group.title} style={{
                background: 'white', borderRadius: 18, overflow: 'hidden',
                border: '1px solid rgba(252,231,243,0.8)',
                boxShadow: '0 2px 10px rgba(233,30,140,0.04)',
              }}>
                <div style={{ padding: '12px 18px 10px', background: 'rgba(249,250,251,0.5)', borderBottom: '1px solid #F3F4F6' }}>
                  <h3 style={{ fontSize: 11, fontWeight: 700, color: DARK, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {group.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {group.items.map((item, ii) => {
                    const Icon = item.icon;
                    const iconBg = group.title === 'Pengaturan' ? `rgba(6,182,212,0.10)` : 'rgba(233,30,140,0.08)';
                    const iconColor = group.title === 'Pengaturan' ? GOLD : PINK;
                    return (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMenuClick(item.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '14px 16px',
                          borderBottom: ii < group.items.length - 1 ? '1px solid #F9FAFB' : 'none',
                          background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                            background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Icon size={18} color={iconColor} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 500, color: DARK }}>{item.label}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {'sublabel' in item && item.sublabel && (
                            <span style={{ fontSize: 12, color: '#6B7280' }}>{item.sublabel}</span>
                          )}
                          <ChevronRight size={18} color="#6B7280" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* ── Logout ── */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              style={{
                width: '100%', background: 'white', borderRadius: 18,
                border: '1px solid #FEE2E2', padding: '14px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                fontSize: 14, fontWeight: 700, color: '#EF4444', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <LogOut size={18} color="#EF4444" />
              Keluar
            </motion.button>

            <p style={{ textAlign: 'center', fontSize: 11, color: '#D1D5DB', paddingBottom: 100 }}>
              OMDC Dental App v{APP_VERSION}
            </p>

          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showTnC && (
          <TnCModal
            accepted={tcAccepted}
            onAccept={handleAcceptTnC}
            onClose={() => setShowTnC(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
