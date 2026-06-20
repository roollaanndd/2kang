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
          height={s.icon * 0.6}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C8.5 2 6 4.5 6 8c0 2 .8 3.5 1.5 5 .7 1.5 1 2.5 1 4 0 .6.4 1 1 1h5c.6 0 1-.4 1-1 0-1.5.3-2.5 1-4 .7-1.5 1.5-3 1.5-5 0-3.5-2.5-6-6-6z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M10 15v4M14 15v4M12 2v3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
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
