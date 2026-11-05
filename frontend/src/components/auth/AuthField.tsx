import type { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon: ReactNode;
  round?: boolean;
}

export function AuthField({ label, icon, round, className = '', ...props }: Props) {
  return (
    <label className={`block text-xs ${className}`}>
      {label && <span className="font-medium">{label}<span className="text-red-500"> *</span></span>}
      <div className={`flex items-center gap-2 bg-gray-200 px-3 py-2 mt-1 ${round ? 'rounded-full' : 'rounded'}`}>
        {icon}
        <input className="bg-transparent outline-none w-full text-sm" {...props} />
      </div>
    </label>
  );
}