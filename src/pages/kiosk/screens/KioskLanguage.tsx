import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import type { KioskScreenProps } from '../KioskLayout';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';

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
        backgroundColor: '#F8F9FB',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 3px gradient strip at top */}
      <div
        style={{
          height: '3px',
          flexShrink: 0,
          background: 'linear-gradient(90deg, #E91E8C 0%, #FF6BB5 50%, #06B6D4 100%)',
        }}
      />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          gap: '40px',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
        >
          <OmdcLogo size="xl" variant="default" showText />
        </motion.div>

        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 20px',
            borderRadius: '999px',
            backgroundColor: 'rgba(233,30,140,0.08)',
            border: '1px solid rgba(233,30,140,0.18)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#E91E8C',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Pilih Bahasa / Select Language
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          style={{ textAlign: 'center', lineHeight: 1 }}
        >
          <div
            className="kd"
            style={{
              fontSize: '52px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}
          >
            Bahasa
          </div>
          <div
            style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#9CA3AF',
              letterSpacing: '0.01em',
            }}
          >
            Select your preferred language
          </div>
        </motion.div>

        {/* Language cards */}
        <div
          style={{
            display: 'flex',
            gap: '28px',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <LanguageCard
            lang="id"
            label="Bahasa Indonesia"
            subtitle="Lanjutkan dalam Bahasa Indonesia"
            flagText="🇮🇩"
            flagGradient="linear-gradient(135deg, #E91E8C, #FF6BB5)"
            innerTint="rgba(233,30,140,0.04)"
            hoverBorder="rgba(233,30,140,0.30)"
            hoverShadow="0 20px 60px rgba(233,30,140,0.15)"
            delay={0.26}
            onSelect={selectLanguage}
          />
          <LanguageCard
            lang="en"
            label="English"
            subtitle="Continue in English"
            flagText="🇬🇧"
            flagGradient="linear-gradient(135deg, #06B6D4, #0284C7)"
            innerTint="rgba(6,182,212,0.04)"
            hoverBorder="rgba(6,182,212,0.30)"
            hoverShadow="0 20px 60px rgba(6,182,212,0.15)"
            delay={0.36}
            onSelect={selectLanguage}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BackButton onPress={goBack} />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Language Card                                                         */
/* ------------------------------------------------------------------ */

interface LanguageCardProps {
  lang: 'id' | 'en';
  label: string;
  subtitle: string;
  flagText: string;
  flagGradient: string;
  innerTint: string;
  hoverBorder: string;
  hoverShadow: string;
  delay: number;
  onSelect: (lang: 'id' | 'en') => void;
}

function LanguageCard({
  lang,
  label,
  subtitle,
  flagText,
  flagGradient,
  innerTint,
  hoverBorder,
  hoverShadow,
  delay,
  onSelect,
}: LanguageCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ flex: 1 }}
    >
      <motion.button
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(lang)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          width: '100%',
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          background: 'none',
          display: 'block',
        }}
      >
        {/* Outer shell */}
        <div
          style={{
            borderRadius: '32px',
            padding: '8px',
            backgroundColor: '#ffffff',
            border: `1px solid ${hovered ? hoverBorder : 'rgba(0,0,0,0.06)'}`,
            boxShadow: hovered
              ? hoverShadow
              : '0 4px 24px rgba(0,0,0,0.06)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
        >
          {/* Inner core */}
          <div
            style={{
              borderRadius: '24px',
              padding: '56px 40px',
              backgroundColor: innerTint,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Flag circle */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: flagGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
                lineHeight: 1,
                flexShrink: 0,
                boxShadow: hovered
                  ? hoverShadow
                  : '0 4px 16px rgba(0,0,0,0.10)',
                transition: 'box-shadow 0.25s',
              }}
            >
              {flagText}
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#111827',
                  marginBottom: '6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#6B7280',
                }}
              >
                {subtitle}
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Back Button                                                           */
/* ------------------------------------------------------------------ */

function BackButton({ onPress }: { onPress: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '999px',
        border: '1px solid rgba(0,0,0,0.10)',
        backgroundColor: '#ffffff',
        color: hovered ? '#E91E8C' : '#6B7280',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'color 0.18s, border-color 0.18s',
        borderColor: hovered ? 'rgba(233,30,140,0.30)' : 'rgba(0,0,0,0.10)',
      }}
    >
      <ChevronLeft size={18} />
      Kembali
    </button>
  );
}
