import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  size?: 'sm' | 'md';
}
const styles = {
  primary: 'bg-[#1023d5] text-white',
  danger: 'bg-red-600 text-white',
  secondary: 'bg-gray-300 text-black',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: Props) {
  const pad = size === 'sm' ? 'px-3 py-0.5 text-xs' : 'px-4 py-1.5 text-sm';
  return <button className={`rounded font-medium ${pad} ${styles[variant]} ${className}`} {...props} />;
}