import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  loggingIn: boolean;
  loginWithPassword: (password: string) => Promise<boolean>;
  logout: () => void;
}

// Admin password hash from env (SHA-256 hex)
const PASSWORD_ENV = (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string) || (import.meta.env.ADMIN_PASSWORD_HASH as string) || '';

async function sha256Hex(input: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function looksLikeSha256Hex(s?: string): boolean {
  return !!s && /^[a-fA-F0-9]{64}$/.test(s);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      loggingIn: false,
      async loginWithPassword(password: string) {
        try {
          set({ loggingIn: true });
          const input = (password || '').trim();
          const hashed = await sha256Hex(input);
          let targetHash = PASSWORD_ENV;
          if (!looksLikeSha256Hex(targetHash)) {
            // If env contains plaintext, hash it on the fly
            targetHash = await sha256Hex(targetHash);
          }
          const ok = targetHash && hashed === targetHash;
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
