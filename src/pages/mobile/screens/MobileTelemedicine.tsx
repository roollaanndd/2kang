/* eslint-disable */
import { motion } from 'motion/react';
import { Video, MessageCircle, Star, ChevronRight } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import { DOCTORS } from '../../../data/mockData';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const AQUA = '#06B6D4';
const INK = '#1A1A2E';

const AVATAR_COLORS: [string, string][] = [
  ['#E91E8C', '#FF6BB5'],
  ['#06B6D4', '#22D3EE'],
  ['#8B5CF6', '#C4B5FD'],
  ['#F59E0B', '#FCD34D'],
];

function initials(name: string) {
  const clean = name.replace(/^drg\.\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const RECENT_CHATS = [
  { doctorIdx: 0, lastMsg: 'Baik, kondisi gigi Anda sudah membaik. Lanjutkan perawatan rutin ya!', time: '10:42', unread: 1 },
  { doctorIdx: 1, lastMsg: 'Saya rekomendasikan scaling 3 bulan sekali untuk mencegah karang gigi.', time: 'Kemarin', unread: 0 },
  { doctorIdx: 2, lastMsg: 'Terima kasih sudah konsultasi, jangan lupa flossing setiap hari 😊', time: 'Sen', unread: 0 },
];

const ONLINE_DOCTOR_IDXS = [0, 2]; // doctors at these indices are "online"

export function MobileTelemedicine({ state, setState }: Props) {
  const onlineCount = ONLINE_DOCTOR_IDXS.length;

  const startChat = (doctorId: string) => {
    haptic('selection');
    setState({ screen: 'chat-detail', activeChatDoctorId: doctorId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      <MobileHeader title="Konsultasi Online" showBack onBack={() => setState({ screen: 'home' })} />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '14px 0 100px' }}>

        {/* Online banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ margin: '0 16px 18px', borderRadius: 16, padding: '12px 16px', background: 'rgba(16,185,129,0.07)', border: '1.5px solid rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.20)', flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>
            {onlineCount} dokter online sekarang — siap melayani konsultasi
          </span>
        </motion.div>

        {/* Available Doctors */}
        <div style={{ padding: '0 16px', marginBottom: 6 }}>
          <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px' }}>Dokter Tersedia</p>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4, marginBottom: 24 }}>
          {DOCTORS.filter(d => d.available).map((doctor, i) => {
            const [g1, g2] = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const isOnline = ONLINE_DOCTOR_IDXS.includes(i);
            return (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{
                  flexShrink: 0, width: 156, background: 'white', borderRadius: 20, padding: '16px 14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `linear-gradient(135deg, ${g1}, ${g2})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 900, fontSize: 18,
                    boxShadow: `0 4px 12px ${g1}44`,
                  }}>
                    {initials(doctor.name)}
                  </div>
                  {isOnline && (
                    <span style={{
                      position: 'absolute', bottom: 2, right: -2,
                      width: 13, height: 13, borderRadius: '50%',
                      background: '#10B981', border: '2.5px solid white',
                    }} />
                  )}
                </div>

                <p style={{ fontSize: 12, fontWeight: 800, color: INK, margin: '0 0 2px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {doctor.name}
                </p>
                <p style={{ fontSize: 10, color: '#9CA3AF', margin: '0 0 8px' }}>{doctor.specialty}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                  <Star size={10} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{doctor.rating}</span>
                  <span style={{ fontSize: 9, color: isOnline ? '#10B981' : '#9CA3AF', fontWeight: 700, marginLeft: 4 }}>
                    {isOnline ? '● Online' : '● Offline'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => startChat(doctor.id)}
                    disabled={!isOnline}
                    style={{
                      flex: 1, padding: '7px 0', borderRadius: 10, border: 'none', cursor: isOnline ? 'pointer' : 'not-allowed',
                      background: isOnline ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#F3F4F6',
                      color: isOnline ? 'white' : '#9CA3AF',
                      fontSize: 10, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    }}
                  >
                    <MessageCircle size={11} /> Chat
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => haptic('light')}
                    disabled={!isOnline}
                    style={{
                      width: 32, padding: '7px 0', borderRadius: 10, border: '1.5px solid rgba(6,182,212,0.30)', cursor: isOnline ? 'pointer' : 'not-allowed',
                      background: isOnline ? 'rgba(6,182,212,0.08)' : '#F9FAFB',
                      color: isOnline ? AQUA : '#D1D5DB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Video size={13} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Chats */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: 0 }}>Percakapan Terbaru</p>
            <button style={{ fontSize: 11, fontWeight: 700, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
              Semua <ChevronRight size={11} />
            </button>
          </div>
          <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            {RECENT_CHATS.map((chat, i) => {
              const doctor = DOCTORS[chat.doctorIdx];
              if (!doctor) return null;
              const [g1, g2] = AVATAR_COLORS[chat.doctorIdx % AVATAR_COLORS.length];
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startChat(doctor.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 14px',
                    borderBottom: i < RECENT_CHATS.length - 1 ? '1px solid #F3F4F6' : 'none',
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 14,
                      background: `linear-gradient(135deg, ${g1}, ${g2})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 900, fontSize: 16,
                    }}>
                      {initials(doctor.name)}
                    </div>
                    {ONLINE_DOCTOR_IDXS.includes(chat.doctorIdx) && (
                      <span style={{ position: 'absolute', bottom: 1, right: -1, width: 11, height: 11, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: INK, margin: '0 0 2px' }}>{doctor.name}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.lastMsg}</p>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{chat.time}</span>
                    {chat.unread > 0 && (
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: PINK, color: 'white', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Video consult promo */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ margin: '18px 16px 0', borderRadius: 20, padding: '16px 18px', background: 'linear-gradient(135deg, #EBF8FF, #F0F9FF)', border: '1.5px solid rgba(6,182,212,0.18)', display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 14, background: AQUA, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(6,182,212,0.35)' }}>
            <Video size={22} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: '#0C4A6E', margin: '0 0 3px' }}>Konsultasi Video Call</p>
            <p style={{ fontSize: 11, color: '#0E7490', margin: 0 }}>Tanya dokter gigi langsung via video — lebih cepat & akurat</p>
          </div>
          <ChevronRight size={16} color={AQUA} />
        </motion.div>
      </div>
    </motion.div>
  );
}
