import { PawPrint } from 'lucide-react';
import { RegisterFormCard } from '../components/auth/RegisterFormCard';

interface Props { onRegister: () => void; onBack: () => void }

export const RegisterPage = ({ onRegister, onBack }: Props) => (
  <div className="min-h-screen flex">
    <div className="w-[28%] bg-[#333762] text-white flex flex-col items-center justify-center gap-2">
      <PawPrint size={48} />
      <h1 className="text-4xl italic font-semibold">PetCare</h1>
    </div>
    <div className="flex-1 bg-gray-100 flex items-center justify-center">
      <RegisterFormCard onRegister={onRegister} onBack={onBack} />
    </div>
  </div>
);