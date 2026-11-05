import React from 'react';
import type { Pet } from '../../types/index';

interface PetListTableProps {
  pets: Pet[];
  searchQuery: string;
  onEditPet: (pet: Pet) => void;
  onDeletePet: (id: number) => void;
}

const statusClass = (status?: string) =>
  status === 'Inactive' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700';

export const PetListTable: React.FC<PetListTableProps> = ({
  pets,
  searchQuery,
  onEditPet,
  onDeletePet,
}) => {
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPets.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-sm text-gray-500 shadow-sm">
        No pets found.
      </div>
    );
  }

  return (
    <>
      {/* Phones: one card per pet */}
      <div className="space-y-3 md:hidden">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 break-words">{pet.name}</p>
                <p className="text-xs text-gray-500">ID {pet.id}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs shrink-0 ${statusClass((pet as any).status)}`}>
                {(pet as any).status ?? 'Active'}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium">{pet.type}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Breed</dt>
                <dd className="font-medium break-words">{pet.breed}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Owner</dt>
                <dd className="font-medium break-words">{pet.owner}</dd>
              </div>
            </dl>

            <div className="mt-3 flex gap-2">
              <button
                className="flex-1 rounded border border-blue-200 py-1.5 text-xs font-medium text-blue-700"
                onClick={() => onEditPet(pet)}
              >
                Edit
              </button>
              <button
                className="flex-1 rounded border border-red-200 py-1.5 text-xs font-medium text-red-600"
                onClick={() => onDeletePet(pet.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and desktop: table */}
      <div className="hidden md:block bg-white rounded-xl border overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Pet Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Breed</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{pet.id}</td>
                <td className="p-3 font-semibold">{pet.name}</td>
                <td className="p-3">{pet.type}</td>
                <td className="p-3">{pet.breed}</td>
                <td className="p-3">{pet.owner}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${statusClass((pet as any).status)}`}>
                    {(pet as any).status ?? 'Active'}
                  </span>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button className="mr-3 text-blue-700 hover:underline" onClick={() => onEditPet(pet)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => onDeletePet(pet.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};