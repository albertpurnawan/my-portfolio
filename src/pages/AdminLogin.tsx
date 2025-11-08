import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginWithPassword, loggingIn } = useAuthStore();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setMessage(null);
    const ok = await loginWithPassword(password);
    if (ok) navigate('/admin');
    else setMessage('Password salah.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm">Password Admin</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
            <Button onClick={handleLogin} disabled={loggingIn}>
              {loggingIn ? 'Memproses...' : 'Masuk'}
            </Button>
          </div>

          {message && <p className="text-sm text-gray-700">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
