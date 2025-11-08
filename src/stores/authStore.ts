import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  loggingIn: boolean;
  loginWithPassword: (password: string) => Promise<boolean>;
  logout: () => void;
}

// Admin password hash from env (SHA-256 hex)
const PASSWORD_HASH = (
  (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string) ||
  (import.meta.env.ADMIN_PASSWORD_HASH as string) ||
  // fallback: SHA-256('AdminJAP') for local/dev convenience
  '7bcac177e8a868355f9f03666667cee93e1f47aa11163c33ce18161e74712732'
);

async function sha256Hex(input: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      loggingIn: false,
      async loginWithPassword(password: string) {
        try {
          set({ loggingIn: true });
          const hashed = await sha256Hex(password);
          const ok = hashed === PASSWORD_HASH;
          if (ok) {
            set({ isAuthenticated: true, loggingIn: false });
          } else {
            set({ loggingIn: false });
          }
          return ok;
        } catch {
          set({ loggingIn: false });
          return false;
        }
      },
      logout() {
        set({ isAuthenticated: false });
      },
    }),
    { name: 'auth-store' }
  )
);
