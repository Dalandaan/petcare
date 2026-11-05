import { useState } from 'react';
import { PetListTable } from '../components/pet/PetListTable';
import { PetFormModal, type PetInput } from '../components/pet/PetFormModal';
import type { Pet } from '../types';

interface Props {
  pets: Pet[];
  onAddPet: (p: PetInput) => void;
  onUpdatePet: (p: Pet) => void;
  onDeletePet: (id: number) => void;
}

export const PetsPage = ({ pets, onAddPet, onUpdatePet, onDeletePet }: Props) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <input
          className="min-w-0 flex-1 max-w-xs bg-white border border-gray-200 rounded px-3 py-2 text-sm"
          placeholder="Search pets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="shrink-0 whitespace-nowrap bg-[#333762] text-white rounded px-4 py-2 text-sm"
          onClick={() => setAdding(true)}
        >
          Add pet
        </button>
      </div>

      <PetListTable
        pets={pets}
        searchQuery={searchQuery}
        onEditPet={setEditing}
        onDeletePet={onDeletePet}
      />

      {(adding || editing) && (
        <PetFormModal
          key={editing?.id ?? 'new'}
          initial={editing}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSave={(data) => {
            if (editing) onUpdatePet({ ...data, id: editing.id });
            else onAddPet(data);
            setAdding(false);
            setEditing(null);
          }}
        />
      )}
    </>
  );
};