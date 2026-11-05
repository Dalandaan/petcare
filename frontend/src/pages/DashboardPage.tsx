import React from 'react';
import { StatCard } from '../components/common/StatCard';
import type { Pet, Owner, Appointment, ServiceItem } from '../types';

interface DashboardPageProps {
  pets: Pet[];
  owners: Owner[];
  appointments: Appointment[];
  services: ServiceItem[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ pets, owners, appointments, services }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800">Dashboard</h3>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Pets" value={pets.length} icon="🐾" />
      <StatCard label="Total Owners" value={owners.length} icon="👥" />
      <StatCard label="Total Appointments" value={appointments.length} icon="📅" />
      <StatCard label="Services Offers" value={services.length} icon="✂️" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl border shadow-sm min-w-0">
        <h4 className="font-semibold text-sm mb-3">Recent appointments</h4>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-xs text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Pet name</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-2 whitespace-nowrap">{a.date}</td>
                  <td className="p-2">{a.petName}</td>
                  <td className="p-2">{a.owner}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                      a.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      a.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm min-w-0">
        <h4 className="font-semibold text-sm mb-3">Upcoming Appointments</h4>
        <div className="space-y-2">
          {appointments.map((a) => (
            <div key={a.id} className="p-2.5 border rounded-lg flex flex-wrap justify-between items-center gap-1 text-xs bg-gray-50">
              <span>📅 {a.date} - <strong>{a.petName}</strong> ({a.service})</span>
              <span className="text-gray-500">{a.owner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);