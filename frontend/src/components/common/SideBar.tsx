
import React from 'react';
import type { Screen } from '../../types/index';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onLogout
}) => {
  const navItems: { id: Screen; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'pets', label: 'Pets', icon: '🐾' },
    { id: 'owners', label: 'Owners', icon: '👥' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'services', label: 'Services', icon: '✂️' }
  ];

  return (
    <aside className="w-64 bg-[#1b224d] text-white flex flex-col justify-between p-4 min-h-screen">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <span className="text-3xl">🐾</span>
          <div>
            <h1 className="font-bold text-lg">PetCare</h1>
            <p className="text-[10px] text-indigo-300">
              Grooming Management System
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                currentScreen === item.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-3 text-slate-300 hover:bg-white/10 rounded-lg text-sm w-full"
      >
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
};
