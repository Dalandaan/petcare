import { PawPrint } from 'lucide-react';

export function AuthHeader({ subtitle = true }: { subtitle?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <PawPrint size={44} />
      <h1 className="text-4xl italic font-semibold leading-tight">PetCare</h1>
      {subtitle && <p className="text-[11px] font-medium mt-1">Pet Grooming Management System</p>}
    </div>
  );
}