import type { ComponentType } from 'react';
import { useState } from 'react';
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
  reminder: { Icon: Calendar, bg: '#FDF2F8', color: '#E91E8C' },
  queue: { Icon: Ticket, bg: '#ECFEFF', color: '#D4A017' },
  promo: { Icon: Tag, bg: '#ECFEFF', color: '#FF6BB5' },
  system: { Icon: Bell, bg: '#F3F4F6', color: '#6B7280' },
};

const FILTER_OPTIONS = ['Semua', 'Janji Temu', 'Promo', 'Antrian'] as const;
type FilterOption = typeof FILTER_OPTIONS[number];

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

  const [activeFilter, setActiveFilter] = useState<FilterOption>('Semua');

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

  // Group notifications into today vs yesterday/older
  const todayNotifs = notifications.filter((_, i) => i < 2);
  const olderNotifs = notifications.filter((_, i) => i >= 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFF8F4' }}
    >
      {/* 3px gradient strip */}
      <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)' }} />

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 1px 8px rgba(233,30,140,0.06)',
      }}>
        <div style={{ width: 40 }} />
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#0D1421', letterSpacing: -0.3 }}>Notifikasi</h1>
        <button
          onClick={handleMarkAllRead}
          style={{ fontSize: 11, fontWeight: 600, color: '#E91E8C', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Tandai semua
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column' }}>

        {/* ── Filter chips ── */}
        <div style={{
          display: 'flex', gap: 8, padding: '12px 16px',
          overflowX: 'auto', scrollbarWidth: 'none',
          position: 'sticky', top: 0, background: 'rgba(255,245,249,0.97)',
          backdropFilter: 'blur(8px)', zIndex: 10, flexShrink: 0,
        }}>
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              onClick={() => { haptic('light'); setActiveFilter(filter); }}
              style={{
                flexShrink: 0, padding: '7px 16px', borderRadius: 999,
                fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none',
                background: activeFilter === filter ? '#E91E8C' : 'white',
                color: activeFilter === filter ? 'white' : '#6B7280',
                boxShadow: activeFilter === filter
                  ? '0 4px 12px rgba(233,30,140,0.20)'
                  : '0 1px 4px rgba(0,0,0,0.06)',
                border: activeFilter === filter ? 'none' : '1px solid rgba(252,231,243,0.8)',
              } as any}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Permission card ── */}
        {permission !== 'granted' && (
          <div style={{ padding: '0 16px 8px' }}>
            {permission === 'denied' || permission === 'unsupported' ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 18,
                background: '#F9FAFB', border: '1px solid #E5E7EB',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BellOff size={18} color="#9CA3AF" />
                </div>
                <p style={{ fontSize: 12, color: '#6B7280', flex: 1 }}>
                  {permission === 'unsupported' ? 'Notifikasi tidak didukung perangkat ini.' : 'Notifikasi dinonaktifkan. Aktifkan di pengaturan browser.'}
                </p>
              </div>
            ) : (
              <button
                onClick={handleEnable}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', borderRadius: 18, textAlign: 'left',
                  background: 'white', border: '1px solid #FECDD3',
                  boxShadow: '0 4px 16px rgba(233,30,140,0.10)', cursor: 'pointer',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 14, background: 'linear-gradient(135deg,#E91E8C,#FF6BB5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BellRing size={18} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0D1421' }}>Aktifkan Notifikasi</p>
                  <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Dapatkan pengingat janji temu real-time.</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: '#FFF8F4', color: '#E91E8C', flexShrink: 0 }}>
                  Izinkan
                </span>
              </button>
            )}
          </div>
        )}

        {/* ── Notifications list ── */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 100 }}>
          {notifications.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
              <Bell size={56} color="#E5E7EB" />
              <p style={{ fontSize: 15, fontWeight: 700, color: '#9CA3AF', marginTop: 16 }}>Tidak ada notifikasi</p>
              <p style={{ fontSize: 13, color: '#D1D5DB', marginTop: 4 }}>Anda sudah membaca semua notifikasi</p>
            </div>
          ) : (
            <>
              {/* Today group */}
              {todayNotifs.length > 0 && (
                <section>
                  <h2 style={{ fontSize: 13, fontWeight: 700, color: '#0D1421', marginBottom: 12, paddingLeft: 2 }}>Hari Ini</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {todayNotifs.map((notif, i) => {
                      const { Icon, bg, color } = TYPE_CONFIG[notif.type];
                      return (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleMarkRead(notif.id)}
                          style={{
                            background: 'white', borderRadius: 20, padding: '16px',
                            position: 'relative', display: 'flex', gap: 12, cursor: 'pointer',
                            border: !notif.read ? '1px solid rgba(252,231,243,0.8)' : '1px solid rgba(252,231,243,0.8)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          {/* Unread dot */}
                          {!notif.read && (
                            <div style={{
                              position: 'absolute', top: 16, right: 16,
                              width: 10, height: 10, borderRadius: '50%',
                              background: '#E91E8C',
                              boxShadow: '0 0 8px rgba(233,30,140,0.4)',
                            }} />
                          )}
                          <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, border: '1px solid rgba(252,231,243,0.6)' }}>
                            <Icon size={20} color={color} />
                          </div>
                          <div style={{ flex: 1, paddingRight: !notif.read ? 16 : 0 }}>
                            <h3 style={{ fontSize: 13, fontWeight: !notif.read ? 800 : 600, color: '#0D1421', marginBottom: 4 }}>
                              {notif.title}
                            </h3>
                            <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5, marginBottom: 6 }}>
                              {notif.body}
                            </p>
                            <span style={{ fontSize: 10, fontWeight: 500, color: '#E91E8C' }}>{notif.time}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Older notifications */}
              {olderNotifs.length > 0 && (
                <section>
                  <h2 style={{ fontSize: 13, fontWeight: 700, color: '#0D1421', marginBottom: 12, paddingLeft: 2, opacity: 0.8 }}>Kemarin</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {olderNotifs.map((notif, i) => {
                      const { Icon, bg, color } = TYPE_CONFIG[notif.type];
                      return (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleMarkRead(notif.id)}
                          style={{
                            background: 'rgba(255,255,255,0.65)', borderRadius: 20, padding: '16px',
                            position: 'relative', display: 'flex', gap: 12, cursor: 'pointer',
                            border: '1px solid rgba(252,231,243,0.6)',
                          }}
                        >
                          <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, border: '1px solid rgba(252,231,243,0.6)' }}>
                            <Icon size={20} color={color} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#0D1421', marginBottom: 4 }}>
                              {notif.title}
                            </h3>
                            <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5, marginBottom: 6 }}>
                              {notif.body}
                            </p>
                            <span style={{ fontSize: 10, color: '#6B7280' }}>{notif.time}</span>
                          </div>
                          <button
                            onClick={e => { e.stopPropagation(); handleDismiss(notif.id); }}
                            style={{
                              width: 20, height: 20, borderRadius: '50%', background: '#F3F4F6',
                              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', flexShrink: 0,
                            }}
                          >
                            <X size={12} color="#9CA3AF" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
}
