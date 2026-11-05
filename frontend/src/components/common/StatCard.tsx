import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl border shadow-sm flex items-center gap-2 sm:gap-4 min-w-0">
    <span className="text-2xl sm:text-3xl shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[11px] sm:text-xs text-gray-500 leading-tight break-words">{label}</p>
      <p className="text-lg sm:text-xl font-bold">{value}</p>
    </div>
  </div>
);