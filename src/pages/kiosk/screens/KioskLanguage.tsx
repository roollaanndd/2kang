import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';

export function KioskLanguage({ setState, goTo, goBack }: KioskScreenProps) {
  const selectLanguage = (lang: 'id' | 'en') => {
    setState(prev => ({ ...prev, language: lang }));
    goTo('main-menu');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        gap: '48px',
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: '40px',
            fontWeight: '800',
            color: '#E91E8C',
            marginBottom: '12px',
          }}>
            Pilih Bahasa
          </div>
          <div style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#6B7280',
          }}>
            Select Language
          </div>
        </motion.div>

        {/* Language buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '32px',
            width: '100%',
            maxWidth: '720px',
          }}
        >
          {/* Bahasa Indonesia */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => selectLanguage('id')}
            style={{
              flex: 1,
              padding: '48px 32px',
              borderRadius: '24px',
              border: 'none',
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 8px 32px rgba(233,30,140,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(233,30,140,0.45)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(233,30,140,0.3)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '72px', lineHeight: 1 }}>🇮🇩</span>
            <div style={{
              fontSize: '26px',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '0.3px',
            }}>
              Bahasa Indonesia
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
              Lanjutkan dalam Bahasa Indonesia
            </div>
          </motion.button>

          {/* English */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => selectLanguage('en')}
            style={{
              flex: 1,
              padding: '48px 32px',
              borderRadius: '24px',
              border: '3px solid #4FC3F7',
              background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 8px 32px rgba(79,195,247,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(79,195,247,0.45)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(79,195,247,0.3)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '72px', lineHeight: 1 }}>🇬🇧</span>
            <div style={{
              fontSize: '26px',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '0.3px',
            }}>
              English
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>
              Continue in English
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '20px 40px',
        borderTop: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: '14px',
            border: '2px solid #E5E7EB',
            backgroundColor: '#ffffff',
            color: '#6B7280',
            fontSize: '17px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
            (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
            (e.currentTarget as HTMLButtonElement).style.color = '#6B7280';
          }}
        >
          <ChevronLeft size={20} />
          Kembali
        </button>
      </div>
    </motion.div>
  );
}
