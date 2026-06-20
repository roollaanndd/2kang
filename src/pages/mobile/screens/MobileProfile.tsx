/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, ClipboardList, Bell, Pill, Star, Gift, HelpCircle, LogOut,
  ChevronRight, Users, Shield, CheckCircle, X, ScrollText,
  Calendar, MapPin, Clock,
} from 'lucide-react';
import type { MobileState } from '../../../types';

interface MobileProfileProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';

// ── MENU GROUP CONFIG ─────────────────────────────────────────────────────────
const MENU_GROUPS = [
  {
    title: 'Akun',
    items: [
      { id: 'profile-data',  icon: User,          label: 'Data Diri',          sublabel: 'Informasi profil Anda',          screen: undefined     as undefined },
      { id: 'history',       icon: ClipboardList,  label: 'Riwayat Kunjungan', sublabel: 'Rekam medis & kunjungan',         screen: 'history'     as const    },
      { id: 'family',        icon: Users,          label: 'Profil Keluarga',    sublabel: 'Kelola anggota keluarga',         screen: 'family'      as const    },
    ],
  },
  {
    title: 'Medis',
    items: [
      { id: 'medical',       icon: Pill,           label: 'Riwayat Medis',      sublabel: 'Catatan & diagnosa Anda',         screen: 'medical'     as const    },
      { id: 'reviews',       icon: Star,           label: 'Ulasan Saya',        sublabel: 'Ulasan yang telah dibuat',        screen: undefined     as undefined },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { id: 'notifications', icon: Bell,           label: 'Notifikasi',         sublabel: 'Atur preferensi notifikasi',      screen: 'notifications' as const  },
      { id: 'promos',        icon: Gift,           label: 'Promo & Voucher',    sublabel: 'Voucher aktif Anda',              screen: 'promos'      as const    },
    ],
  },
  {
    title: 'Informasi',
    items: [
      { id: 'help',          icon: HelpCircle,     label: 'Bantuan',            sublabel: 'FAQ & hubungi kami',              screen: undefined     as undefined },
      { id: 'tnc',           icon: ScrollText,     label: 'Syarat & Ketentuan', sublabel: 'Perjanjian penggunaan layanan',    screen: undefined     as undefined },
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
Pemesanan janji temu melalui Aplikasi tunduk pada ketersediaan jadwal dokter. OMDC Dental berhak mengubah atau membatalkan jadwal dengan pemberitahuan sebelumnya. Kami mohon Anda hadir tepat waktu atau membatalkan minimal 2 jam sebelum jadwal.

6. PEMBATASAN TANGGUNG JAWAB
OMDC Dental tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan menggunakan Aplikasi, atau dari keputusan medis yang diambil berdasarkan informasi di Aplikasi. Konsultasikan selalu dengan dokter untuk keputusan medis.

7. PERUBAHAN KETENTUAN
OMDC Dental berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui Aplikasi. Penggunaan Aplikasi setelah perubahan dianggap sebagai penerimaan atas ketentuan yang baru.

8. HUKUM YANG BERLAKU
Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.

Dengan menekan "Saya Setuju", Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan di atas.`;

// ── T&C MODAL ─────────────────────────────────────────────────────────────────
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
        {/* Header */}
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

        {/* Scrollable content */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 20px',
          scrollbarWidth: 'none', lineHeight: 1.7,
        }}>
          {TNC_TEXT.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontSize: 13, color: para.match(/^\d+\./) ? DARK : '#4B5563',
              fontWeight: para.match(/^\d+\./) ? 700 : 400,
              marginBottom: 14,
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px 28px', borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
          {accepted ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px', borderRadius: 16,
              background: 'rgba(16,185,129,0.08)', border: '1.5px solid rgba(16,185,129,0.25)',
            }}>
              <CheckCircle size={18} color="#10B981" />
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

// ── MENU ITEM ─────────────────────────────────────────────────────────────────
function MenuItem({
  icon: Icon, label, sublabel, badge, delay = 0, onClick,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  sublabel?: string;
  badge?: React.ReactNode;
  delay?: number;
  onClick?: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 16px', borderRadius: 16, background: 'white',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(233,30,140,0.07)',
      }}>
        <Icon size={18} color={PINK} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13.5, fontWeight: 700, color: DARK, margin: 0, lineHeight: 1.2 }}>{label}</p>
        {sublabel && <p style={{ fontSize: 11, color: '#9CA3AF', margin: '2px 0 0' }}>{sublabel}</p>}
      </div>
      {badge}
      <ChevronRight size={15} color="#D1D5DB" />
    </motion.button>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function MobileProfile({ state, setState }: MobileProfileProps) {
  const [showTnC, setShowTnC] = useState(false);
  const user = state.user;
  const initial = user?.name?.[0]?.toUpperCase() ?? 'U';
  const tcAccepted = state.tcAccepted ?? false;

  const handleAcceptTnC = () => {
    setState({ tcAccepted: true });
  };

  const handleLogout = () => {
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
        style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: '#F8F9FB', scrollbarWidth: 'none' }}
      >
        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div style={{ position: 'relative', background: '#FFFFFF', paddingBottom: 28, overflow: 'hidden', flexShrink: 0 }}>
          {/* 3px gradient strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 2 }} />

          {/* Subtle dental geometry bg */}
          {[
            { x: 76, y: -6, s: 54, c: PINK, o: 0.06, r: [0, 4, 0] as [number, number, number] },
            { x: -4, y: 18, s: 60, c: AQUA, o: 0.05, r: [0, 0, 0] as [number, number, number] },
            { x: 84, y: 52, s: 20, c: PINK, o: 0.07, r: [0, 16, 0] as [number, number, number] },
            { x: 10, y: 70, s: 14, c: AQUA, o: 0.08, r: [0, 20, 0] as [number, number, number] },
          ].map((el, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o, pointerEvents: 'none' }}
              animate={{ y: [-6, 6, -6], rotate: el.r }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
            >
              <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke={el.c} strokeWidth="3" />
                <circle cx="50" cy="50" r="28" stroke={el.c} strokeWidth="1.5" strokeDasharray="7 5" />
              </svg>
            </motion.div>
          ))}

          {/* Avatar + info */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 48 }}>
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              style={{ position: 'relative' }}
            >
              {/* Outer ring */}
              <div style={{
                width: 96, height: 96, borderRadius: '50%',
                padding: 3,
                background: `linear-gradient(135deg, ${PINK}, ${ROSE}, ${AQUA})`,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '3px solid white',
                }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: 34, letterSpacing: -1 }}>{initial}</span>
                </div>
              </div>
              {/* Online indicator */}
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 16, height: 16, borderRadius: '50%',
                background: '#10B981', border: '2.5px solid white',
              }} />
              {/* T&C check badge */}
              {tcAccepted && (
                <div style={{
                  position: 'absolute', top: 2, right: 2,
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#10B981', border: '2px solid white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle size={13} color="white" />
                </div>
              )}
            </motion.div>

            {/* Name + email + record */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              style={{ textAlign: 'center', paddingHorizontal: 24 }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 900, color: DARK, margin: 0, letterSpacing: -0.5 }}>
                {user?.name ?? 'Pengguna'}
              </h2>
              <p style={{ fontSize: 13, color: '#9CA3AF', margin: '4px 0 10px' }}>{user?.email ?? ''}</p>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: 'rgba(233,30,140,0.08)', color: PINK,
                  border: '1px solid rgba(233,30,140,0.15)',
                }}>
                  📋 {user?.medicalRecordNo ?? 'RM-2024-001'}
                </span>
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: 'rgba(6,182,212,0.08)', color: '#0891B2',
                  border: '1px solid rgba(6,182,212,0.15)',
                }}>
                  ✦ Member
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STATS ROW ────────────────────────────────────────────── */}
        <div style={{ margin: '0 16px', marginTop: -14, zIndex: 5, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            style={{
              background: 'white', borderRadius: 20, padding: '14px 8px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
              border: '1px solid rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'stretch',
            }}
          >
            {[
              { value: '12', label: 'Kunjungan', Icon: Calendar, color: PINK },
              { value: '4.9', label: 'Rating', Icon: Star, color: '#F59E0B' },
              { value: '3', label: 'Aktif', Icon: Clock, color: AQUA },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, textAlign: 'center', paddingTop: 4, paddingBottom: 4,
                borderRight: i < 2 ? '1px solid #F3F4F6' : 'none',
              }}>
                <stat.Icon size={15} color={stat.color} style={{ margin: '0 auto 4px' }} />
                <p style={{ fontSize: 20, fontWeight: 900, color: DARK, margin: 0, lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: 10, color: '#9CA3AF', margin: '3px 0 0' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── MENU GROUPS ──────────────────────────────────────────── */}
        <div style={{ padding: '20px 16px 100px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {MENU_GROUPS.map((group, gi) => (
            <div key={group.title}>
              <p style={{
                fontSize: 10.5, fontWeight: 800, color: '#9CA3AF',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 10, paddingLeft: 4,
              }}>
                {group.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.items.map((item, ii) => {
                  const badge = item.id === 'tnc' ? (
                    tcAccepted
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: 20 }}>
                          <CheckCircle size={10} /> Disetujui
                        </span>
                      : <span style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '3px 8px', borderRadius: 20 }}>
                          Perlu disetujui
                        </span>
                  ) : undefined;

                  return (
                    <MenuItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      sublabel={item.sublabel}
                      badge={badge}
                      delay={gi * 0.06 + ii * 0.04}
                      onClick={() => handleMenuClick(item.id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '13px 16px', borderRadius: 16,
              background: '#FEF2F2', border: '1.5px solid #FEE2E2',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#FEE2E2',
            }}>
              <LogOut size={18} color="#EF4444" />
            </div>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: '#EF4444', flex: 1 }}>Keluar dari Akun</span>
          </motion.button>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#D1D5DB', marginTop: 4 }}>
            OMDC Dental v1.0.0 · © {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>

      {/* ── T&C MODAL ────────────────────────────────────────────────── */}
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
