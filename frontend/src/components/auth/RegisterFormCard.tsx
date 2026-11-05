import { useState } from 'react';
import { User, Mail, AtSign, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import { AuthField } from './AuthField';
import { Button } from '../ui/Button';
import { api } from '../../lib/api';

interface Props { onRegister: () => void; onBack: () => void }

export function RegisterFormCard({ onRegister, onBack }: Props) {
  const [f, setF] = useState({ fullName: '', email: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async () => {
    if (Object.values(f).some((v) => !v.trim())) return setError('Please fill in every field.');
    if (f.password !== f.confirm) return setError('Passwords do not match.');
    setError('');
    try {
      await api('/register', {
        method: 'POST',
        body: JSON.stringify({
          name: f.fullName,
          email: f.email,
          username: f.username,
          password: f.password,
        }),
      });
      onRegister();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed.');
    }
  };

  return (

<div className="bg-white rounded-2xl shadow p-6 md:p-8 w-full max-w-[560px] space-y-4 lg:scale-150">
      <div>
        <h2 className="text-lg font-semibold text-[#333762]">Create Your Account</h2>
        <p className="text-xs text-gray-600">Join PetCare and start booking grooming services your pets.</p>
      </div>
      <AuthField label="Full Name" icon={<User size={16} />} placeholder="Enter full name" value={f.fullName} onChange={set('fullName')} />
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AuthField label="Email Address" icon={<Mail size={16} />} placeholder="Enter email" value={f.email} onChange={set('email')} />
        <AuthField label="Username" icon={<AtSign size={16} />} placeholder="Enter username" value={f.username} onChange={set('username')} />
        <AuthField label="Password" icon={<Lock size={16} />} type="password" placeholder="Enter password" value={f.password} onChange={set('password')} />
        <AuthField label="Confirm Password" icon={<Lock size={16} />} type="password" placeholder="Confirm password" value={f.confirm} onChange={set('confirm')} />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <Button className="w-full flex items-center justify-center gap-2 py-2" onClick={submit}>
        <UserPlus size={16} /> Create Account
      </Button>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <hr className="flex-1 border-gray-400" /> or <hr className="flex-1 border-gray-400" />
      </div>
      <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-2" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Login
      </Button>
    </div>
  );
}