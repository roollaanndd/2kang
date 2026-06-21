import { useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, Ticket, Tag, X } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileNotificationsProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

type NotifType = 'reminder' | 'queue' | 'promo' | 'info';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFS: Notification[] = [
  {
    id: 'n0',
    type: 'reminder',
    title: 'Pengingat: Kontrol Kawat Gigi',
    message: 'Jadwal kontrol kawat gigi Anda dengan drg. Sarah Sella hari ini pukul 14:00. Silakan tiba 10 menit lebih awal.',
    time: 'Hari ini, 08:00',
    read: false,
  },
  {
    id: 'n1',
    type: 'reminder',
    title: 'Janji Temu Besok',
    message: 'Anda memiliki janji dengan drg. Sarah Sella besok pukul 09:00. Jangan lupa datang tepat waktu!',
    time: '2 jam lalu',
    read: false,
  },
  {
    id: 'n2',
    type: 'queue',
    title: 'Antrian Anda Dipanggil',
    message: 'Nomor antrian A016 sedang dipanggil. Segera menuju klinik!',
    time: '1 hari lalu',
    read: false,
  },
  {
    id: 'n3',
    type: 'promo',
    title: 'Promo Scaling 30% OFF',
    message: 'Dapatkan diskon 30% untuk scaling gigi profesional. Berlaku hingga 31 Mei 2025. Booking sekarang!',
    time: '3 hari lalu',
    read: true,
  },
  {
    id: 'n4',
    type: 'reminder',
    title: 'Kontrol Gigi Rutin',
    message: 'Sudah 6 bulan sejak kunjungan terakhir Anda. Kami merekomendasikan pemeriksaan rutin.',
    time: '1 minggu lalu',
    read: true,
  },
  {
    id: 'n5',
    type: 'info',
    title: 'Profil Berhasil Diperbarui',
    message: 'Informasi profil Anda telah berhasil diperbarui.',
    time: '2 minggu lalu',
    read: true,
  },
  {
    id: 'n6',
    type: 'promo',
    title: 'Paket Whitening Spesial',
    message: 'Paket pemutihan gigi profesional diskon 15% untuk member OMDC. Terbatas!',
    time: '3 minggu lalu',
    read: true,
  },
];

const TYPE_CONFIG: Record<NotifType, { Icon: ComponentType<{ size?: number; color?: string }>; bg: string; color: string }> = {
  reminder: { Icon: Calendar, bg: '#FFF5F9', color: '#E91E8C' },
  queue: { Icon: Ticket, bg: '#EFF6FF', color: '#3B82F6' },
  promo: { Icon: Tag, bg: '#ECFDF5', color: '#10B981' },
  info: { Icon: Bell, bg: '#F3F4F6', color: '#6B7280' },
};

export function MobileNotifications({ state, setState }: MobileNotificationsProps) {
  const [notifs, setNotifs] = useState<Notification[]>(MOCK_NOTIFS);

  const unreadCount = notifs.filter(n => !n.read).length;

  const back = () => setState({ screen: 'home' });

  const dismiss = (id: string) => {
    haptic('light');
    setNotifs(n => n.filter(x => x.id !== id));
  };

  const markRead = (id: string) => {
    haptic('selection');
    setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  };

  const markAllRead = () => {
    haptic('success');
    setNotifs(n => n.map(x => ({ ...x, read: true })));
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
              onClick={markAllRead}
              className="text-[11px] font-bold"
              style={{ color: '#E91E8C' }}
            >
              Baca semua
            </button>
          ) : undefined
        }
      />

      {/* Unread count */}
      {unreadCount > 0 && (
        <div className="mx-5 mt-4 mb-2">
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
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell size={64} style={{ color: '#E5E7EB' }} />
            <p className="text-base font-bold mt-4" style={{ color: '#9CA3AF' }}>Tidak ada notifikasi</p>
            <p className="text-sm mt-1" style={{ color: '#D1D5DB' }}>Anda sudah membaca semua notifikasi</p>
          </div>
        ) : (
          notifs.map((notif, i) => {
            const { Icon, bg, color } = TYPE_CONFIG[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(notif.id)}
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
                        onClick={e => { e.stopPropagation(); dismiss(notif.id); }}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-all active:scale-90"
                        style={{ background: '#F3F4F6' }}
                      >
                        <X size={12} style={{ color: '#9CA3AF' }} />
                      </button>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: '#6B7280' }}>
                      {notif.message}
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
