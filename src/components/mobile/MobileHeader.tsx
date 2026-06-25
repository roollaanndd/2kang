import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
}: MobileHeaderProps) {
  return (
    <div className="flex-shrink-0">
      {!transparent && (
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
      )}
    <div
      className="flex items-center justify-between px-4 h-14"
      style={{
        background: transparent ? 'transparent' : 'white',
        boxShadow: transparent ? 'none' : '0 1px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="w-10 flex items-center justify-start">
        {showBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90"
            style={{ background: '#F3F4F6' }}
          >
            <ArrowLeft size={20} color="#1A1A2E" />
          </button>
        )}
      </div>

      <h1
        className="text-base font-bold tracking-tight flex-1 text-center"
        style={{ color: '#1A1A2E' }}
      >
        {title}
      </h1>

      <div className="w-10 flex items-center justify-end">
        {rightAction}
      </div>
    </div>
    </div>
  );
}
