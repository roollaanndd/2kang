import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { CURRENT_QUEUE, QUEUE_UPCOMING } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import { AnimatedDentalBg } from '../../../components/ui/AnimatedDentalBg';

const EASE = [0.32, 0.72, 0, 1] as const;

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
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        width: '100%',
        height: '100%',
        background: '#F8F9FB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 3px gradient strip at very top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
        flexShrink: 0,
      }} />

      {/* Animated premium dental-geometry background */}
      <AnimatedDentalBg />

      {/* Header */}
      <div style={{
        paddingTop: '28px',
        paddingBottom: '16px',
        paddingLeft: '60px',
        paddingRight: '60px',
        flexShrink: 0,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Live badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(233,30,140,0.2)',
          padding: '10px 28px',
          borderRadius: '40px',
          boxShadow: '0 2px 12px rgba(233,30,140,0.08)',
          marginBottom: '10px',
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: '#E91E8C',
              flexShrink: 0,
            }}
          />
          <span style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#E91E8C',
            letterSpacing: '2.5px',
          }}>
            {t ? 'LIVE QUEUE / ANTRIAN LANGSUNG' : 'ANTRIAN LANGSUNG / LIVE QUEUE'}
          </span>
        </div>

        <div style={{
          fontSize: '17px',
          fontWeight: '500',
          color: '#6B7280',
          marginTop: '4px',
        }}>
          {t ? 'Currently Being Called / Being Served' : 'Sedang Dipanggil / Sedang Dilayani'}
        </div>
      </div>

      {/* Main queue card area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 60px',
        gap: '24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`queue-${tick}`}
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ duration: 0.52, ease: EASE }}
            style={{ position: 'relative', textAlign: 'center' }}
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{
                scale: glowing ? [1, 1.07, 1] : 1,
                opacity: glowing ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '48px',
                border: '2px solid rgba(233,30,140,0.4)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{
                scale: glowing ? [1, 1.13, 1] : 1,
                opacity: glowing ? [0.2, 0.5, 0.2] : 0.1,
              }}
              transition={{ duration: 1.2, delay: 0.14, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-40px',
                borderRadius: '60px',
                border: '2px solid rgba(233,30,140,0.25)',
                pointerEvents: 'none',
              }}
            />

            {/* Double-bezel outer shell */}
            <div style={{
              padding: '8px',
              borderRadius: '40px',
              background: '#FFFFFF',
              border: '1px solid rgba(233,30,140,0.1)',
              boxShadow: '0 32px 80px rgba(233,30,140,0.14), 0 8px 24px rgba(233,30,140,0.06)',
            }}>
              {/* Inner core */}
              <div style={{
                background: 'linear-gradient(160deg, #FFF0F7 0%, #FFFFFF 50%, #F0FFFE 100%)',
                borderRadius: '32px',
                padding: '36px 72px 32px',
                minWidth: '380px',
              }}>
                {/* "NOMOR ANTRIAN" label — pink pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(233,30,140,0.08)',
                  border: '1px solid rgba(233,30,140,0.18)',
                  padding: '6px 20px',
                  borderRadius: '100px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#E91E8C',
                    letterSpacing: '2px',
                  }}>
                    {t ? 'QUEUE NUMBER / NOMOR ANTRIAN' : 'NOMOR ANTRIAN / QUEUE NUMBER'}
                  </span>
                </div>

                {/* Queue number display */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: '4px',
                }}>
                  <span style={{
                    fontSize: '80px',
                    fontWeight: '900',
                    color: '#FF6BB5',
                    lineHeight: '1',
                    letterSpacing: '-2px',
                  }}>
                    {queueLetter}
                  </span>
                  <span style={{
                    fontSize: '140px',
                    fontWeight: '900',
                    lineHeight: '1',
                    letterSpacing: '4px',
                    background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {queueNum}
                  </span>
                </div>

                {/* Service + Room info */}
                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1.5px solid rgba(233,30,140,0.15)',
                  display: 'flex',
                  gap: '32px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      letterSpacing: '1.5px',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                    }}>
                      {t ? 'Service' : 'Layanan'}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                      Scaling &amp; Polishing
                    </div>
                  </div>
                  <div style={{
                    width: '1px',
                    height: '36px',
                    background: 'linear-gradient(180deg, transparent, rgba(233,30,140,0.2), transparent)',
                  }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      letterSpacing: '1.5px',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                    }}>
                      {t ? 'Room' : 'Ruangan'}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                      {t ? 'Room 2' : 'Ruang 2'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Announcement strip */}
        <motion.div
          animate={{ scale: glowing ? [1, 1.04, 1] : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FFFFFF',
            border: `1px solid ${glowing ? 'rgba(233,30,140,0.3)' : 'rgba(233,30,140,0.12)'}`,
            borderRadius: '100px',
            padding: '10px 24px',
            boxShadow: glowing
              ? '0 4px 20px rgba(233,30,140,0.12)'
              : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'border-color 0.5s, box-shadow 0.5s',
          }}
        >
          <Volume2
            size={18}
            style={{
              color: glowing ? '#E91E8C' : '#9CA3AF',
              transition: 'color 0.5s',
            }}
          />
          <span style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#374151',
          }}>
            {t ? 'Queue being announced' : 'Antrian sedang diumumkan'}
          </span>
        </motion.div>
      </div>

      {/* Upcoming queues strip */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(233,30,140,0.08)',
        padding: '20px 60px 28px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: '700',
          color: '#9CA3AF',
          letterSpacing: '2.5px',
          marginBottom: '14px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          {t ? 'Next in Queue / Antrian Selanjutnya' : 'Antrian Selanjutnya / Next Queue'}
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}>
          {upcomingQueues.map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: EASE }}
              style={{
                backgroundColor: i === 0 ? 'rgba(233,30,140,0.06)' : '#FFFFFF',
                border: i === 0
                  ? '1px solid rgba(233,30,140,0.25)'
                  : '1px solid rgba(233,30,140,0.1)',
                borderRadius: '14px',
                padding: '12px 28px',
                fontSize: '22px',
                fontWeight: '800',
                color: i === 0 ? '#E91E8C' : '#6B7280',
                boxShadow: i === 0
                  ? '0 4px 16px rgba(233,30,140,0.1)'
                  : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {q}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div style={{
        position: 'absolute',
        bottom: '110px',
        left: '40px',
        zIndex: 5,
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(233,30,140,0.15)',
            backgroundColor: '#FFFFFF',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = 'rgba(233,30,140,0.45)';
            btn.style.boxShadow = '0 4px 16px rgba(233,30,140,0.12)';
            btn.style.color = '#E91E8C';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = 'rgba(233,30,140,0.15)';
            btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            btn.style.color = '#374151';
          }}
        >
          <ChevronLeft size={16} />
          {t ? 'Back' : 'Kembali'}
        </button>
      </div>
    </motion.div>
  );
}
