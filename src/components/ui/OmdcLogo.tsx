import { useContext } from 'react';
import { CMSContext } from '../../context/CMSContext';

interface OmdcLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: 'text-base', sub: 'text-[9px]' },
  md: { icon: 36, text: 'text-lg', sub: 'text-[10px]' },
  lg: { icon: 48, text: 'text-2xl', sub: 'text-xs' },
  xl: { icon: 64, text: 'text-4xl', sub: 'text-sm' },
};

export function OmdcLogo({ size = 'md', variant = 'default', showText = true }: OmdcLogoProps) {
  const cms = useContext(CMSContext);
  const logoUrl = cms?.cms?.logoUrl ?? null;

  const s = sizes[size];
  const textColor = variant === 'white' ? 'text-white' : variant === 'dark' ? 'text-gray-900' : 'text-[#E91E8C]';
  const subColor = variant === 'white' ? 'text-white/80' : 'text-gray-500';

  /* When a custom logo has been uploaded, render it as the complete logo mark.
     The uploaded image replaces both the tooth icon and the OMDC text. */
  if (logoUrl) {
    const h = s.icon * 1.5;
    return (
      <img
        src={logoUrl}
        alt="Logo"
        style={{
          height: h,
          maxWidth: h * 4,
          objectFit: 'contain',
          /* On white-variant backgrounds (hero/kiosk) keep the image as-is
             so the real brand colours show through. */
          filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          width: s.icon,
          height: s.icon,
          background: variant === 'white' ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
        }}
      >
        <svg
          width={s.icon * 0.6}
          height={s.icon * 0.64}
          viewBox="0 0 22 24"
          fill="none"
        >
          {/* Premium bicuspid tooth crown */}
          <path
            d="M7.8 3C5.7 3 4.2 4.6 4.2 6.6c0 1.3.5 2.5 1.1 3.5l2 3.5c.3.6.6 1.4.6 2.6v.3c0 .5.4.9.9.9h6.4c.5 0 .9-.4.9-.9v-.3c0-1.2.3-2 .6-2.6l2-3.5c.6-1 1.1-2.2 1.1-3.5C19.8 4.6 18.3 3 16.2 3c-1 0-1.9.4-2.5 1-.3.3-.8.5-1.2.5-.4 0-.9-.2-1.2-.5C10.7 3.4 9.8 3 7.8 3z"
            fill="white"
            opacity="0.95"
          />
          {/* Bicuspid cusp groove */}
          <path
            d="M11 3.8V7.8"
            stroke="rgba(233,30,140,0.28)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* 4-point sparkle — top right corner */}
          <path
            d="M18.2 1.5l.35 1 1 .35-1 .35-.35 1-.35-1-1-.35 1-.35z"
            fill="white"
            opacity="0.7"
          />
          {/* Shine dot — upper left */}
          <circle cx="7.6" cy="5.4" r="0.9" fill="white" opacity="0.42" />
        </svg>
      </div>
      {showText && (
        <div>
          <div className={`font-black leading-none tracking-wide ${s.text} ${textColor}`}>
            OMDC
          </div>
          <div className={`font-semibold leading-none tracking-widest uppercase ${s.sub} ${subColor}`}>
            DENTAL
          </div>
        </div>
      )}
    </div>
  );
}
