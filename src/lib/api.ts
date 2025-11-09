export function adminHeaders() {
  const passHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string) || (import.meta.env.ADMIN_PASSWORD_HASH as string) || '';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (passHash) headers['x-admin-password-hash'] = passHash;
  return headers;
}

