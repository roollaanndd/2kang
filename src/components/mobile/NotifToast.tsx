import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, Calendar, Ticket, Tag, Info } from 'lucide-react';
import type { ComponentType } from 'react';
import { useNotifications, type NotifType } from '../../context/NotificationContext';
import { haptic } from '../../lib/haptics';

const PINK = '#E91E8C';

const TYPE_CONFIG: Record<NotifType, { Icon: ComponentType<{ size?: number; color?: string }>; bg: string; color: string }> = {
  reminder: { Icon: Calendar, bg: '#FFF8F4', color: '#E91E8C' },
  queue: { Icon: Ticket, bg: '#EFF6FF', color: '#D4A017' },
  promo: { Icon: Tag, bg: '#ECFDF5', color: '#D4A017' },
  system: { Icon: Info, bg: '#F3F4F6', color: '#6B7280' },
};

interface NotifToastProps {
  onOpen: () => void;
}

/**
 * In-app banner that slides down from the top of the phone frame when a new
 * notification arrives. Auto-dismisses after ~4s; tap to open the notifications screen.
 */
export function NotifToast({ onOpen }: NotifToastProps) {
  const { latest } = useNotifications();
  // Track the latest notification id we've shown so we only toast NEW arrivals.
  const [shownId, setShownId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!latest) return;
    if (latest.id === shownId) return;
    setShownId(latest.id);
    setVisible(true);
    haptic('medium');
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [latest, shownId]);

  const config = latest ? TYPE_CONFIG[latest.type] : null;
  const Icon = config?.Icon ?? Bell;

  return (
    <AnimatePresence>
      {visible && latest && config && (
        <motion.button
          key={latest.id}
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          onClick={() => {
            haptic('light');
            setVisible(false);
            onOpen();
          }}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
            padding: '12px 14px',
            borderRadius: 18,
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 32px rgba(233,30,140,0.18), 0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {/* Signature gradient accent strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)',
            }}
          />

          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: config.bg,
            }}
          >
            <Icon size={19} color={config.color} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {latest.title}
            </p>
            <p
              style={{
                fontSize: 11.5,
                color: '#6B7280',
                lineHeight: 1.35,
                marginTop: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {latest.body}
            </p>
          </div>

          <span style={{ fontSize: 11, fontWeight: 700, color: PINK, flexShrink: 0 }}>Lihat</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
