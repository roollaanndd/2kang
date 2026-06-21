/* eslint-disable */
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Video, Phone, Send, Paperclip, Smile } from 'lucide-react';
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

interface Message {
  id: string;
  role: 'user' | 'doctor';
  text: string;
  time: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', role: 'doctor', text: 'Halo! Selamat datang di konsultasi online OMDC Dental. Ada yang bisa saya bantu hari ini? 😊', time: '10:30' },
  { id: 'm2', role: 'user', text: 'Dok, gigi saya sudah beberapa hari ini terasa ngilu saat minum air dingin. Kenapa ya?', time: '10:31' },
  { id: 'm3', role: 'doctor', text: 'Ngilu saat kontak dengan air dingin biasanya merupakan tanda sensitivitas gigi. Ada beberapa kemungkinan penyebabnya seperti email gigi yang aus, akar gigi terbuka, atau ada kavitas (lubang).', time: '10:33' },
  { id: 'm4', role: 'doctor', text: 'Apakah rasa ngilu hanya muncul saat dingin, atau juga terasa saat makan makanan manis atau panas?', time: '10:33' },
  { id: 'm5', role: 'user', text: 'Dingin dan manis dok. Kalau panas tidak terlalu.', time: '10:35' },
  { id: 'm6', role: 'doctor', text: 'Baik, itu mengarah ke hipersensitivitas dentin. Saya sarankan untuk sementara gunakan pasta gigi khusus gigi sensitif, dan hindari sikat gigi terlalu keras. Sebaiknya kita lakukan pemeriksaan langsung untuk memastikan tidak ada kavitas yang perlu ditangani.', time: '10:37' },
  { id: 'm7', role: 'user', text: 'Oke dok, saya akan buat jadwal kunjungan. Terima kasih banyak!', time: '10:38' },
  { id: 'm8', role: 'doctor', text: 'Sama-sama! Jaga kesehatan gigi ya. Jangan lupa sikat gigi dua kali sehari dan flossing. Sampai jumpa di klinik! 🦷✨', time: '10:39' },
];

export function MobileChatDetail({ state, setState }: Props) {
  const doctorIdx = DOCTORS.findIndex(d => d.id === state.activeChatDoctorId);
  const doctor = DOCTORS[doctorIdx >= 0 ? doctorIdx : 0];
  const [g1, g2] = AVATAR_COLORS[(doctorIdx >= 0 ? doctorIdx : 0) % AVATAR_COLORS.length];

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    haptic('selection');
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(ms => [...ms, { id: `u-${Date.now()}`, role: 'user', text, time }]);
    setInput('');
    // Simulate doctor reply
    setTimeout(() => {
      setMessages(ms => [...ms, {
        id: `d-${Date.now()}`,
        role: 'doctor',
        text: 'Terima kasih pesannya. Saya akan segera memeriksa dan membalas dalam beberapa menit. 😊',
        time,
      }]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      {/* 3px strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      {/* Custom header */}
      <div style={{ background: 'white', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', padding: '12px 16px 10px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button
          onClick={() => { haptic('light'); setState({ screen: 'telemedicine' }); }}
          style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6', border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <ArrowLeft size={18} color={INK} />
        </button>

        {/* Doctor avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 13,
            background: `linear-gradient(135deg, ${g1}, ${g2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: 15,
          }}>
            {initials(doctor.name)}
          </div>
          <span style={{ position: 'absolute', bottom: 1, right: -1, width: 11, height: 11, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 900, color: INK, margin: 0, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doctor.name}</p>
          <p style={{ fontSize: 10, color: '#10B981', margin: 0, fontWeight: 700 }}>● Online</p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => haptic('light')}
            style={{ width: 36, height: 36, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,182,212,0.09)', border: 'none', cursor: 'pointer' }}
          >
            <Phone size={16} color={AQUA} />
          </button>
          <button
            onClick={() => haptic('light')}
            style={{ width: 36, height: 36, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(233,30,140,0.09)', border: 'none', cursor: 'pointer' }}
          >
            <Video size={16} color={PINK} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '12px 16px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* Date divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 12px' }}>
          <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
          <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, flexShrink: 0 }}>Hari ini</span>
          <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
        </div>

        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          const showTime = i === messages.length - 1 || messages[i + 1]?.role !== msg.role;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', marginBottom: showTime ? 6 : 2 }}
            >
              <div style={{
                maxWidth: '78%', padding: '10px 14px', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: isUser ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : 'white',
                boxShadow: isUser ? '0 4px 12px rgba(233,30,140,0.22)' : '0 2px 8px rgba(0,0,0,0.06)',
                border: isUser ? 'none' : '1px solid rgba(0,0,0,0.05)',
              }}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: isUser ? 'white' : INK }}>
                  {msg.text}
                </p>
              </div>
              {showTime && (
                <span style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, paddingLeft: isUser ? 0 : 2, paddingRight: isUser ? 2 : 0 }}>
                  {msg.time}
                </span>
              )}
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '10px 16px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => haptic('light')} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <Paperclip size={18} color="#9CA3AF" />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#F8F9FB', borderRadius: 22, padding: '0 14px', border: '1.5px solid #F0F0F5' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan..."
              style={{ flex: 1, fontSize: 13, color: INK, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0' }}
            />
            <button onClick={() => haptic('light')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
              <Smile size={18} color="#9CA3AF" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={sendMessage}
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: input.trim() ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#F3F4F6',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: input.trim() ? '0 4px 14px rgba(233,30,140,0.30)' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            <Send size={17} color={input.trim() ? 'white' : '#9CA3AF'} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
