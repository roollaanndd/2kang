import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
export type NotifType = 'reminder' | 'queue' | 'promo' | 'system';

export interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export type PushPermission = 'default' | 'granted' | 'denied' | 'unsupported';

export interface NotificationContextValue {
  notifications: Notif[];
  unreadCount: number;
  /** The most recently added notification (drives the in-app toast). */
  latest: Notif | null;
  permission: PushPermission;
  addNotification: (n: Omit<Notif, 'id' | 'read'> & Partial<Pick<Notif, 'id' | 'read'>>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  requestPushPermission: () => void;
}

// ── Seed data (Indonesian dental notifications) ────────────────────────────────
const SEED_NOTIFICATIONS: Notif[] = [
  {
    id: 'seed-1',
    type: 'reminder',
    title: 'Pengingat Janji Temu',
    body: 'Janji temu Anda dengan drg. Sarah Sella besok pukul 09:00. Datang 10 menit lebih awal ya!',
    time: '2 jam lalu',
    read: false,
  },
  {
    id: 'seed-2',
    type: 'queue',
    title: 'Antrean Dipanggil',
    body: 'Nomor antrean A016 sedang dipanggil. Segera menuju ruang periksa.',
    time: '5 jam lalu',
    read: false,
  },
  {
    id: 'seed-3',
    type: 'promo',
    title: 'Promo Scaling 30% OFF',
    body: 'Dapatkan diskon 30% untuk scaling gigi profesional. Berlaku hingga akhir bulan ini. Booking sekarang!',
    time: '1 hari lalu',
    read: false,
  },
  {
    id: 'seed-4',
    type: 'reminder',
    title: 'Kontrol Rutin 6 Bulanan',
    body: 'Sudah 6 bulan sejak kunjungan terakhir Anda. Kami sarankan pemeriksaan gigi rutin.',
    time: '3 hari lalu',
    read: true,
  },
  {
    id: 'seed-5',
    type: 'system',
    title: 'Profil Berhasil Diperbarui',
    body: 'Informasi profil Anda telah berhasil disimpan di sistem OMDC.',
    time: '1 minggu lalu',
    read: true,
  },
];

// ── Context ────────────────────────────────────────────────────────────────────
const NotificationContext = createContext<NotificationContextValue | null>(null);

function detectInitialPermission(): PushPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  const p = Notification.permission;
  if (p === 'granted') return 'granted';
  if (p === 'denied') return 'denied';
  return 'default';
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notif[]>(SEED_NOTIFICATIONS);
  const [latest, setLatest] = useState<Notif | null>(null);
  const [permission, setPermission] = useState<PushPermission>(detectInitialPermission);

  // Keep a ref to the current permission so addNotification stays referentially stable.
  const permissionRef = useRef(permission);
  permissionRef.current = permission;

  const unreadCount = notifications.reduce((acc, n) => (n.read ? acc : acc + 1), 0);

  const addNotification = useCallback<NotificationContextValue['addNotification']>((n) => {
    const notif: Notif = {
      id: n.id ?? `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: n.type,
      title: n.title,
      body: n.body,
      time: n.time,
      read: n.read ?? false,
    };
    setNotifications((prev) => [notif, ...prev]);
    setLatest(notif);

    // Fire a real OS push when permission has been granted.
    if (permissionRef.current === 'granted') {
      try {
        new Notification(notif.title, { body: notif.body });
      } catch {
        /* ignore — Notification construction can throw on some platforms */
      }
    }
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((x) => (x.id === id ? { ...x, read: true } : x)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((x) => ({ ...x, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id));
    setLatest((cur) => (cur && cur.id === id ? null : cur));
  }, []);

  const requestPushPermission = useCallback(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    try {
      const result = Notification.requestPermission();
      // Modern browsers return a Promise; older ones use a callback.
      if (result && typeof (result as Promise<NotificationPermission>).then === 'function') {
        (result as Promise<NotificationPermission>).then((p) => {
          setPermission(p === 'granted' ? 'granted' : p === 'denied' ? 'denied' : 'default');
        });
      }
    } catch {
      setPermission('unsupported');
    }
  }, []);

  // Simulate an incoming push ~12s after mount so the system visibly works.
  useEffect(() => {
    const t = setTimeout(() => {
      addNotification({
        type: 'queue',
        title: 'Antrean Anda segera dipanggil',
        body: 'Bersiaplah, antrean Anda akan segera dipanggil. Mohon menuju ruang tunggu.',
        time: 'Baru saja',
      });
    }, 12000);
    return () => clearTimeout(t);
  }, [addNotification]);

  const value: NotificationContextValue = {
    notifications,
    unreadCount,
    latest,
    permission,
    addNotification,
    markRead,
    markAllRead,
    dismiss,
    requestPushPermission,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
