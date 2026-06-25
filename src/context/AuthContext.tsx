/* eslint-disable */
import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type Role, loadRoles } from '../data/defaultRoles';

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  roleId: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

// Stored user strips the password field before writing to sessionStorage
type StoredUser = Omit<AdminUser, 'password'>;

// Demo seed accounts — override via VITE_ADMIN_DEFAULT_PASSWORD / VITE_OWNER_DEFAULT_PASSWORD
// In production replace this entire auth layer with a real backend (see src/services/api.ts).
const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'u1', name: 'Super Admin', username: 'admin',
    password: import.meta.env.VITE_ADMIN_DEFAULT_PASSWORD ?? 'Omdc#2025!Sa',
    email: 'admin@omdc.id', avatar: 'SA', roleId: 'owner', isActive: true,
    lastLogin: null, createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'u2', name: 'Dr. Owner', username: 'owner',
    password: import.meta.env.VITE_OWNER_DEFAULT_PASSWORD ?? 'Omdc#2025!Ow',
    email: 'owner@omdc.id', avatar: 'OW', roleId: 'owner', isActive: true,
    lastLogin: null, createdAt: '2024-01-01T00:00:00Z',
  },
];

// ─── LOGIN RATE LIMITING ───────────────────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface AttemptRecord { count: number; lockedUntil: number | null }
const attemptStore = new Map<string, AttemptRecord>();

function checkRateLimit(username: string): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  const rec = attemptStore.get(username) ?? { count: 0, lockedUntil: null };
  if (rec.lockedUntil && now < rec.lockedUntil) {
    return { allowed: false, remainingMs: rec.lockedUntil - now };
  }
  if (rec.lockedUntil && now >= rec.lockedUntil) {
    attemptStore.set(username, { count: 0, lockedUntil: null });
  }
  return { allowed: true };
}

function recordFailedAttempt(username: string): void {
  const rec = attemptStore.get(username) ?? { count: 0, lockedUntil: null };
  const next = rec.count + 1;
  attemptStore.set(username, {
    count: next,
    lockedUntil: next >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : null,
  });
}

function clearAttempts(username: string): void {
  attemptStore.delete(username);
}

// ─── USER STORAGE ──────────────────────────────────────────────────────────────
// Passwords are never written to localStorage.
// The user list is seeded from DEFAULT_USERS (in-memory) each session.
// Only non-sensitive fields are persisted (profile edits, role changes, etc.).

function stripPassword(user: AdminUser): StoredUser {
  const { password: _pw, ...rest } = user;
  return rest;
}

function loadUsers(): AdminUser[] {
  try {
    const s = localStorage.getItem('omdc_admin_users');
    if (s) {
      const stored: StoredUser[] = JSON.parse(s);
      // Re-merge stored profile data with in-memory passwords
      return DEFAULT_USERS.map(def => {
        const override = stored.find(u => u.id === def.id);
        return override ? { ...def, ...override, password: def.password } : def;
      });
    }
  } catch {}
  return DEFAULT_USERS;
}

function saveUsers(users: AdminUser[]): void {
  // Strip passwords before persisting
  localStorage.setItem('omdc_admin_users', JSON.stringify(users.map(stripPassword)));
}

// ─── SESSION STORAGE (sessionStorage clears on tab/browser close) ─────────────
const SESSION_KEY = 'omdc_session';

function loadStoredUser(): StoredUser | null {
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    if (s) return JSON.parse(s) as StoredUser;
  } catch {}
  return null;
}

function saveSession(user: AdminUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(stripPassword(user)));
}

function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
  // Also clear any legacy localStorage session keys
  localStorage.removeItem('omdc_current_user');
  localStorage.removeItem('omdc_admin_token');
}

// ─── IDLE TIMEOUT ─────────────────────────────────────────────────────────────
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
interface AuthContextValue {
  currentUser: StoredUser | null;
  currentRole: Role | null;
  users: AdminUser[];
  roles: Role[];
  isLoggedIn: boolean;
  hasPermission: (perm: string) => boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  saveUsers: (users: AdminUser[]) => void;
  saveRoles: (roles: Role[]) => void;
  refreshRoles: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AdminUser[]>(loadUsers);
  const [roles, setRoles] = useState<Role[]>(loadRoles);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(loadStoredUser);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentRole = currentUser
    ? (roles.find(r => r.id === currentUser.roleId) ?? null)
    : null;

  const hasPermission = useCallback((perm: string): boolean => {
    if (!currentRole) return false;
    return currentRole.permissions.includes(perm);
  }, [currentRole]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    clearSession();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    if (!currentUser) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(logout, IDLE_TIMEOUT_MS);
  }, [currentUser, logout]);

  useEffect(() => {
    if (!currentUser) return;
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetIdleTimer, { passive: true }));
    resetIdleTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [currentUser, resetIdleTimer]);

  const login = useCallback((username: string, password: string): { ok: boolean; error?: string } => {
    // Rate limit check
    const limit = checkRateLimit(username);
    if (!limit.allowed) {
      const mins = Math.ceil((limit.remainingMs ?? 0) / 60000);
      return { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${mins} menit.` };
    }

    const allUsers = loadUsers();
    const user = allUsers.find(u => u.username === username && u.password === password && u.isActive);

    if (!user) {
      recordFailedAttempt(username);
      return { ok: false, error: 'Username atau password salah, atau akun tidak aktif.' };
    }

    clearAttempts(username);
    const updated: AdminUser = { ...user, lastLogin: new Date().toISOString() };
    const nextUsers = allUsers.map(u => u.id === user.id ? updated : u);
    saveUsers(nextUsers);
    setUsers(nextUsers);
    saveSession(updated);
    setCurrentUser(stripPassword(updated));
    return { ok: true };
  }, []);

  const handleSaveUsers = useCallback((nextUsers: AdminUser[]) => {
    saveUsers(nextUsers);
    setUsers(nextUsers);
  }, []);

  const handleSaveRoles = useCallback((nextRoles: Role[]) => {
    localStorage.setItem('omdc_roles', JSON.stringify(nextRoles));
    setRoles(nextRoles);
  }, []);

  const refreshRoles = useCallback(() => setRoles(loadRoles()), []);

  return (
    <AuthContext.Provider value={{
      currentUser, currentRole, users, roles,
      isLoggedIn: !!currentUser,
      hasPermission, login, logout,
      saveUsers: handleSaveUsers,
      saveRoles: handleSaveRoles,
      refreshRoles,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
