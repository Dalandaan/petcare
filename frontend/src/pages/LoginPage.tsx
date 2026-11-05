import { LoginFormCard } from '../components/auth/LoginFormCard';

interface Props { onLogin: () => void; onSignUp: () => void }

export const LoginPage = ({ onLogin, onSignUp }: Props) => (
  <div className="min-h-screen bg-[#e5e2e0] flex items-center justify-center">
    <LoginFormCard onLogin={onLogin} onSignUp={onSignUp} />
  </div>
);