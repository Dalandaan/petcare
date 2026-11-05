import { useState } from 'react';
import { CircleUser, Lock } from 'lucide-react';
import { AuthHeader } from './AuthHeader';
import { AuthField } from './AuthField';
import { Button } from '../ui/Button';
import { api } from '../../lib/api';

interface Props { onLogin: () => void; onSignUp: () => void }

export function LoginFormCard({ onLogin, onSignUp }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!username.trim() || !password.trim()) return setError('Enter your username and password.');
    setError('');
    try {
      const { token } = await api<{ token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem('token', token);
      onLogin();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed.');
    }
  };

  return (
<div className="bg-white rounded-3xl shadow p-8 md:p-10 w-[440px] max-w-[92vw] space-y-5 md:scale-150">
      <AuthHeader />
      <div className="space-y-4 pt-2">
        <AuthField round icon={<CircleUser size={24} />} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <AuthField round icon={<Lock size={24} />} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <Button className="w-full rounded-full py-3 text-base" onClick={submit}>Log in</Button>
      <p className="text-center text-sm">
        Don't have Account?{' '}
        <button className="underline" onClick={onSignUp}>Sign up</button>
      </p>
    </div>
  );
}