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
  const subColor = variant === 'white' ? 'text-white/80' : 'text-[#06B6D4]';

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
          filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    );
  }

  /* Icon colors by variant */
  const outerFill = variant === 'white'
    ? 'rgba(255,255,255,0.25)'
    : 'url(#omdc-grad)';
  const toothFill = 'white';
  const toothOpacity = variant === 'white' ? 0.9 : 1;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0" style={{ width: s.icon, height: s.icon }}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="omdc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E91E8C" />
              <stop offset="100%" stopColor="#FF6BB5" />
            </linearGradient>
          </defs>
          {/* Outer heart-tooth shape: rounded top lobes + pointed bottom */}
          <path
            d="M32 58
               C32 58 8 42 8 24
               C8 16 14 10 20 10
               C24 10 28 12 30 15
               C30.8 16.4 31.4 17 32 17
               C32.6 17 33.2 16.4 34 15
               C36 12 40 10 44 10
               C50 10 56 16 56 24
               C56 42 32 58 32 58Z"
            fill={outerFill}
          />
          {/* Inner white tooth — bicuspid crown shape */}
          <path
            d="M32 52
               C32 52 14 38 14 24.5
               C14 19 18 15 22 15
               C24.6 15 27 16.4 28.4 18.2
               C29.2 19.2 30.4 19.8 32 19.8
               C33.6 19.8 34.8 19.2 35.6 18.2
               C37 16.4 39.4 15 42 15
               C46 15 50 19 50 24.5
               C50 38 32 52 32 52Z"
            fill={toothFill}
            opacity={toothOpacity}
          />
          {/* Center groove on inner tooth */}
          <path
            d="M32 20V28"
            stroke="#E91E8C"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={variant === 'white' ? 0.5 : 0.35}
          />
          {/* 4-point sparkle top-right */}
          <path
            d="M50 7 L51.2 10.2 L54.5 11 L51.2 11.8 L50 15 L48.8 11.8 L45.5 11 L48.8 10.2Z"
            fill={variant === 'white' ? 'white' : '#E91E8C'}
            opacity={0.7}
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
