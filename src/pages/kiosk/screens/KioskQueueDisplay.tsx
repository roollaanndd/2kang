import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { CURRENT_QUEUE, QUEUE_UPCOMING } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';

export function KioskQueueDisplay({ state, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [currentQueue] = useState(CURRENT_QUEUE);
  const [upcomingQueues] = useState(QUEUE_UPCOMING);
  const [tick, setTick] = useState(0);
  const [glowing, setGlowing] = useState(true);

  // Simulate periodic "call" animation (glow pulse)
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setGlowing(true);
      setTimeout(() => setGlowing(false), 1200);
      setTimeout(() => setGlowing(true), 1600);
      setTimeout(() => setGlowing(false), 2800);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const queueLetter = currentQueue.charAt(0);
  const queueNum = currentQueue.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #1A1A2E 0%, #2D1B54 50%, #1A1A2E 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(233,30,140,0.12) 0%, transparent 70%)',
      }} />

      {/* Header text */}
      <div style={{
        padding: '32px 60px 20px',
        flexShrink: 0,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(233,30,140,0.15)',
          border: '1px solid rgba(233,30,140,0.3)',
          padding: '10px 28px',
          borderRadius: '40px',
          marginBottom: '8px',
        }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: '#E91E8C',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#FF6BB5', letterSpacing: '2px' }}>
            {t ? 'LIVE QUEUE' : 'ANTRIAN LANGSUNG'}
          </span>
        </div>

        <div style={{
          fontSize: '22px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.7)',
          marginTop: '8px',
        }}>
          {t ? 'Currently Being Called / Being Served' : 'Sedang Dipanggil / Sedang Dilayani'}
        </div>
      </div>

      {/* Main queue number */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 60px',
        gap: '20px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`queue-${tick}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{ position: 'relative', textAlign: 'center' }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{
                scale: glowing ? [1, 1.08, 1] : 1,
                opacity: glowing ? [0.4, 0.7, 0.4] : 0.25,
              }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute',
                inset: '-24px',
                borderRadius: '32px',
                border: '2px solid #E91E8C',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{
                scale: glowing ? [1, 1.15, 1] : 1,
                opacity: glowing ? [0.2, 0.4, 0.2] : 0.1,
              }}
              transition={{ duration: 1.2, delay: 0.15 }}
              style={{
                position: 'absolute',
                inset: '-44px',
                borderRadius: '44px',
                border: '2px solid #E91E8C',
                pointerEvents: 'none',
              }}
            />

            {/* Queue number display */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(233,30,140,0.4)',
              borderRadius: '28px',
              padding: '32px 72px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '6px',
                marginBottom: '8px',
              }}>
                {t ? 'QUEUE NUMBER' : 'NOMOR ANTRIAN'}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
                <span style={{
                  fontSize: '80px',
                  fontWeight: '900',
                  color: '#FF6BB5',
                  lineHeight: '1',
                }}>
                  {queueLetter}
                </span>
                <span style={{
                  fontSize: '130px',
                  fontWeight: '900',
                  color: '#E91E8C',
                  lineHeight: '1',
                  letterSpacing: '-4px',
                  textShadow: '0 0 40px rgba(233,30,140,0.6)',
                }}>
                  {queueNum}
                </span>
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(233,30,140,0.3)',
                display: 'flex',
                gap: '32px',
                justifyContent: 'center',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
                    {t ? 'SERVICE' : 'LAYANAN'}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff' }}>
                    Scaling & Polishing
                  </div>
                </div>
                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
                    {t ? 'ROOM' : 'RUANGAN'}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff' }}>
                    {t ? 'Room 2' : 'Ruang 2'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Sound icon */}
        <motion.div
          animate={{ scale: glowing ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: glowing ? '#E91E8C' : 'rgba(255,255,255,0.3)',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'color 0.5s',
          }}
        >
          <Volume2 size={20} />
          {t ? 'Queue being announced' : 'Antrian sedang diumumkan'}
        </motion.div>
      </div>

      {/* Upcoming queues strip */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 60px',
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2px',
          marginBottom: '14px',
          textAlign: 'center',
        }}>
          {t ? 'NEXT IN QUEUE / ANTRIAN SELANJUTNYA' : 'ANTRIAN SELANJUTNYA / NEXT QUEUE'}
        </div>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
        }}>
          {upcomingQueues.map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '14px',
                padding: '12px 28px',
                fontSize: '22px',
                fontWeight: '800',
                color: i === 0 ? '#4FC3F7' : 'rgba(255,255,255,0.6)',
              }}
            >
              {q}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back button overlay */}
      <div style={{
        position: 'absolute',
        bottom: '110px',
        left: '40px',
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px', fontWeight: '600',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          <ChevronLeft size={18} />
          {t ? 'Back' : 'Kembali'}
        </button>
      </div>
    </motion.div>
  );
}
