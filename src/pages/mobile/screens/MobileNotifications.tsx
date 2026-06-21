import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, Ticket, Tag, X, BellRing, Check, BellOff } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import { useNotifications, type NotifType } from '../../../context/NotificationContext';
import type { MobileState } from '../../../types';

interface MobileNotificationsProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const TYPE_CONFIG: Record<NotifType, { Icon: ComponentType<{ size?: number; color?: string }>; bg: string; color: string }> = {
  reminder: { Icon: Calendar, bg: '#FFF5F9', color: '#E91E8C' },
  queue: { Icon: Ticket, bg: '#EFF6FF', color: '#3B82F6' },
  promo: { Icon: Tag, bg: '#ECFDF5', color: '#10B981' },
  system: { Icon: Bell, bg: '#F3F4F6', color: '#6B7280' },
};

export function MobileNotifications({ setState }: MobileNotificationsProps) {
  const {
    notifications,
    unreadCount,
    permission,
    requestPushPermission,
    markRead,
    markAllRead,
    dismiss,
  } = useNotifications();

  const back = () => setState({ screen: 'home' });

  const handleDismiss = (id: string) => {
    haptic('light');
    dismiss(id);
  };

  const handleMarkRead = (id: string) => {
    haptic('selection');
    markRead(id);
  };

  const handleMarkAllRead = () => {
    haptic('success');
    markAllRead();
  };

  const handleEnable = () => {
    haptic('medium');
    requestPushPermission();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
      style={{ background: '#F8F9FA' }}
    >
      <MobileHeader
        title="Notifikasi"
        showBack
        onBack={back}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-bold"
              style={{ color: '#E91E8C' }}
            >
              Baca semua
            </button>
          ) : undefined
        }
      />

      {/* ── Permission card ── */}
      <div className="mx-5 mt-4">
        {permission === 'granted' ? (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#D1FAE5' }}
            >
              <Check size={18} color="#059669" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold" style={{ color: '#065F46' }}>Notifikasi Aktif</p>
              <p className="text-[11px] leading-snug" style={{ color: '#047857' }}>
                Anda akan menerima pengingat dan info antrean secara langsung.
              </p>
            </div>
          </div>
        ) : permission === 'denied' || permission === 'unsupported' ? (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#F3F4F6' }}
            >
              <BellOff size={18} color="#9CA3AF" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold" style={{ color: '#6B7280' }}>
                {permission === 'unsupported' ? 'Notifikasi Tidak Didukung' : 'Notifikasi Dinonaktifkan'}
              </p>
              <p className="text-[11px] leading-snug" style={{ color: '#9CA3AF' }}>
                {permission === 'unsupported'
                  ? 'Perangkat Anda tidak mendukung notifikasi push.'
                  : 'Aktifkan izin notifikasi melalui pengaturan browser Anda.'}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleEnable}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98]"
            style={{
              background: 'white',
              border: '1px solid #FECDD3',
              boxShadow: '0 4px 16px rgba(233,30,140,0.10)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#E91E8C,#FF6BB5)' }}
            >
              <BellRing size={19} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: '#111827' }}>Aktifkan Notifikasi</p>
              <p className="text-[11px] leading-snug" style={{ color: '#6B7280' }}>
                Dapatkan pengingat janji temu & info antrean secara real-time.
              </p>
            </div>
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ background: '#FFF5F9', color: '#E91E8C' }}
            >
              Izinkan
            </span>
          </button>
        )}
      </div>

      {/* Unread count */}
      {unreadCount > 0 && (
        <div className="mx-5 mt-3 mb-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: '#FFF5F9', border: '1px solid #FECDD3' }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ background: '#E91E8C' }}
            >
              {unreadCount}
            </span>
            <p className="text-xs font-semibold" style={{ color: '#E91E8C' }}>
              notifikasi belum dibaca
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-3 pb-24 flex flex-col gap-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell size={64} style={{ color: '#E5E7EB' }} />
            <p className="text-base font-bold mt-4" style={{ color: '#9CA3AF' }}>Tidak ada notifikasi</p>
            <p className="text-sm mt-1" style={{ color: '#D1D5DB' }}>Anda sudah membaca semua notifikasi</p>
          </div>
        ) : (
          notifications.map((notif, i) => {
            const { Icon, bg, color } = TYPE_CONFIG[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleMarkRead(notif.id)}
                className="relative bg-white rounded-2xl px-4 py-4 transition-all active:scale-[0.98] cursor-pointer"
                style={{
                  boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                  border: `1.5px solid ${!notif.read ? '#FECDD3' : 'transparent'}`,
                }}
              >
                {/* Unread indicator */}
                {!notif.read && (
                  <div
                    className="absolute top-4 left-4 w-2 h-2 rounded-full"
                    style={{ background: '#E91E8C' }}
                  />
                )}

                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon size={20} color={color} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p
                        className="text-sm font-bold leading-tight"
                        style={{ color: '#1A1A2E', fontWeight: !notif.read ? 800 : 600 }}
                      >
                        {notif.title}
                      </p>
                      <button
                        onClick={e => { e.stopPropagation(); handleDismiss(notif.id); }}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-all active:scale-90"
                        style={{ background: '#F3F4F6' }}
                      >
                        <X size={12} style={{ color: '#9CA3AF' }} />
                      </button>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: '#6B7280' }}>
                      {notif.body}
                    </p>
                    <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{notif.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
