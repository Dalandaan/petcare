import { PawPrint } from 'lucide-react';
import { RegisterFormCard } from '../components/auth/RegisterFormCard';

interface Props { onRegister: () => void; onBack: () => void }

export const RegisterPage = ({ onRegister, onBack }: Props) => (
  <div className="min-h-screen flex flex-col lg:flex-row">
    <div className="w-full lg:w-[28%] bg-[#333762] text-white flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-2 py-6 lg:py-0">
      <PawPrint size={48} />
      <h1 className="text-3xl lg:text-4xl italic font-semibold">PetCare</h1>
    </div>
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-[560px] lg:scale-150">
        <RegisterFormCard onRegister={onRegister} onBack={onBack} />
      </div>
    </div>
  </div>
);