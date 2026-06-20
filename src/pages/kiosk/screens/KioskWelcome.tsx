import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { CURRENT_QUEUE } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';

const TICKER_ITEMS = [
  `Antrian saat ini: ${CURRENT_QUEUE} - Scaling & Polishing - Ruang 2`,
  '4 Dokter Spesialis siap melayani Anda',
  'Booking Online • No Antrian Digital • Layanan Terbaik',
  'Buka Senin - Sabtu: 08.00 - 20.00 WIB',
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex(prev => (prev + 1) % TICKER_ITEMS.length);
        setTickerVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTouch = () => {
    setState(prev => ({ ...prev, step: 'language', language: 'id' }));
    goTo('language');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleTouch}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 50%, #FF8CC8 100%)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circles */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '80px', left: '-60px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '5%',
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '40px',
        paddingBottom: '80px',
      }}>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        >
          <OmdcLogo size="xl" variant="white" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-0.5px',
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            Senyum Sehat, Percaya Diri Penuh
          </div>
          <div style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            fontWeight: '400',
          }}>
            Gigi lebih sehat, senyum lebih percaya diri
          </div>
        </motion.div>

        {/* Pulsing touch indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ position: 'relative', marginTop: '24px' }}
        >
          {/* Animated rings */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: '-24px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.5)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.4)',
            }}
          />

          <div style={{
            padding: '20px 48px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '60px',
            border: '2px solid rgba(255,255,255,0.5)',
            backdropFilter: 'blur(8px)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#ffffff',
                textAlign: 'center',
                letterSpacing: '0.5px',
              }}
            >
              👆 Sentuh Layar untuk Memulai
            </motion.div>
            <div style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              marginTop: '4px',
            }}>
              Touch Screen to Start
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker strip */}
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          backgroundColor: 'rgba(26,26,46,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
        }}
      >
        <div style={{
          backgroundColor: '#E91E8C',
          color: 'white',
          fontSize: '12px',
          fontWeight: '800',
          padding: '4px 12px',
          borderRadius: '20px',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          INFO
        </div>

        <motion.div
          key={tickerIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: tickerVisible ? 1 : 0, x: tickerVisible ? 0 : -20 }}
          transition={{ duration: 0.35 }}
          style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500',
            flex: 1,
          }}
        >
          {TICKER_ITEMS[tickerIndex]}
        </motion.div>

        <div style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          4 Dokter Spesialis • Booking Online • No Antrian Digital
        </div>
      </motion.div>
    </motion.div>
  );
}
