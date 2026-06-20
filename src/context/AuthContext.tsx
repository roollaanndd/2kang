/* eslint-disable */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
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

const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'u1', name: 'Super Admin', username: 'admin', password: 'admin123',
    email: 'admin@omdc.id', avatar: 'SA', roleId: 'owner', isActive: true,
    lastLogin: null, createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'u2', name: 'Dr. Owner', username: 'owner', password: 'owner2024',
    email: 'owner@omdc.id', avatar: 'OW', roleId: 'owner', isActive: true,
    lastLogin: null, createdAt: '2024-01-01T00:00:00Z',
  },
];

function loadUsers(): AdminUser[] {
  try {
    const s = localStorage.getItem('omdc_admin_users');
    if (s) return JSON.parse(s);
  } catch {}
  localStorage.setItem('omdc_admin_users', JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function saveUsers(users: AdminUser[]): void {
  localStorage.setItem('omdc_admin_users', JSON.stringify(users));
}

interface AuthContextValue {
  currentUser: AdminUser | null;
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
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const s = localStorage.getItem('omdc_current_user');
      if (s) return JSON.parse(s);
    } catch {}
    return null;
  });

  const currentRole = currentUser
    ? (roles.find(r => r.id === currentUser.roleId) ?? null)
    : null;

  const hasPermission = useCallback((perm: string): boolean => {
    if (!currentRole) return false;
    return currentRole.permissions.includes(perm);
  }, [currentRole]);

  const login = useCallback((username: string, password: string): { ok: boolean; error?: string } => {
    const allUsers = loadUsers();
    const user = allUsers.find(u => u.username === username && u.password === password && u.isActive);
    if (!user) return { ok: false, error: 'Username atau password salah, atau akun tidak aktif.' };
    const updated = { ...user, lastLogin: new Date().toISOString() };
    const nextUsers = allUsers.map(u => u.id === user.id ? updated : u);
    saveUsers(nextUsers);
    setUsers(nextUsers);
    setCurrentUser(updated);
    localStorage.setItem('omdc_current_user', JSON.stringify(updated));
    localStorage.setItem('omdc_admin_token', `token-${user.id}-${Date.now()}`);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('omdc_current_user');
    localStorage.removeItem('omdc_admin_token');
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
