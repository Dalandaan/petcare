import React from 'react';

interface HeaderProps {
  userRole?: string;
}

export const Header: React.FC<HeaderProps> = ({ userRole = 'Admin' }) => {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h2 className="font-bold text-gray-800">PetCare</h2>
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border">
        <span>👤 {userRole}</span>
      </div>
    </header>
  );
};