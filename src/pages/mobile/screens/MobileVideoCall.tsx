import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Video, VideoOff, Volume2, PhoneOff, RotateCcw } from 'lucide-react';
import { haptic } from '../../../lib/haptics';
import { DOCTORS } from '../../../data/mockData';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function initials(name: string) {
  const clean = name.replace(/^drg\.\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MobileVideoCall({ state, setState }: Props) {
  const doctor = DOCTORS.find(d => d.id === state.activeChatDoctorId) ?? DOCTORS[0];
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setConnecting(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (connecting) return;
    const iv = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(iv);
  }, [connecting]);

  const endCall = () => {
    haptic('medium');
    setState({ screen: 'telemedicine' });
  };

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: '#0D1421', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Doctor "video" background — gradient avatar stand-in */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #1a1f35 0%, #0D1421 60%, #0d2035 100%)',
      }} />

      {/* Animated pulse rings behind avatar */}
      {connecting && (
        <>
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 120 + i * 60, height: 120 + i * 60,
                borderRadius: '50%',
                border: '1px solid rgba(233,30,140,0.2)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* Doctor avatar centered when connecting, moved to top area when connected */}
      <motion.div
        animate={{ top: connecting ? '50%' : '30%', transform: connecting ? 'translate(-50%,-50%)' : 'translate(-50%,-50%)' }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        style={{
          position: 'absolute', left: '50%',
          top: connecting ? '50%' : '30%',
          transform: 'translate(-50%,-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <div style={{
          width: 110, height: 110, borderRadius: 32,
          background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 900, fontSize: 38,
          boxShadow: '0 0 0 4px rgba(233,30,140,0.25), 0 0 0 8px rgba(233,30,140,0.10)',
          marginBottom: 14,
        }}>
          {initials(doctor.name)}
        </div>
        <p style={{ color: 'white', fontWeight: 900, fontSize: 18, marginBottom: 4, textAlign: 'center' }}>
          {doctor.name}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center' }}>
          {doctor.specialty}
        </p>
      </motion.div>

      {/* Status pill */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <AnimatePresence mode="wait">
          {connecting ? (
            <motion.div
              key="connecting"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                borderRadius: 20, padding: '6px 16px',
              }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#E91E8C', display: 'block' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.9, delay: i * 0.25, repeat: Infinity }}
                />
              ))}
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 700 }}>
                Menghubungkan...
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.4)',
                borderRadius: 20, padding: '6px 16px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block' }} />
              <span style={{ color: '#6EE7B7', fontSize: 13, fontWeight: 800 }}>
                {formatTime(elapsed)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Self-preview mini window */}
      {!camOff && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            position: 'absolute', bottom: 160, right: 16,
            width: 88, height: 120, borderRadius: 18,
            background: 'linear-gradient(135deg, #374151, #1F2937)',
            border: '2.5px solid rgba(255,255,255,0.18)',
            overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg, #4B5563, #6B7280)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)', fontWeight: 900, fontSize: 16,
          }}>
            SY
          </div>
          <div style={{
            position: 'absolute', bottom: 6, left: 6,
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
          }}>
            Anda
          </div>
        </motion.div>
      )}

      {/* Control bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px 20px 48px',
        background: 'linear-gradient(to top, rgba(13,20,33,0.98) 0%, transparent 100%)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        }}>
          {/* Mute */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { haptic('selection'); setMuted(p => !p); }}
            style={{
              width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: muted ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
            }}
          >
            {muted ? <MicOff size={22} color="#EF4444" /> : <Mic size={22} color="white" />}
            <span style={{ fontSize: 9, color: muted ? '#EF4444' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
              {muted ? 'Bisu' : 'Mikro'}
            </span>
          </motion.button>

          {/* Camera */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { haptic('selection'); setCamOff(p => !p); }}
            style={{
              width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: camOff ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
            }}
          >
            {camOff ? <VideoOff size={22} color="#EF4444" /> : <Video size={22} color="white" />}
            <span style={{ fontSize: 9, color: camOff ? '#EF4444' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
              {camOff ? 'Kamera' : 'Kamera'}
            </span>
          </motion.button>

          {/* End Call */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={endCall}
            style={{
              width: 68, height: 68, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
              boxShadow: '0 8px 28px rgba(239,68,68,0.5)',
            }}
          >
            <PhoneOff size={26} color="white" />
          </motion.button>

          {/* Speaker */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { haptic('selection'); setSpeakerOn(p => !p); }}
            style={{
              width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: speakerOn ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
            }}
          >
            <Volume2 size={22} color={speakerOn ? '#06B6D4' : 'white'} />
            <span style={{ fontSize: 9, color: speakerOn ? '#06B6D4' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
              Speaker
            </span>
          </motion.button>

          {/* Flip camera */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => haptic('selection')}
            style={{
              width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
            }}
          >
            <RotateCcw size={22} color="white" />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Balik</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
