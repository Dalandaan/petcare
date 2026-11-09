import { useState } from 'react';
import type { Pet } from '../../types';
import { Button } from '../ui/Button';

export type PetInput = Omit<Pet, 'id'>;

interface Props {
  initial?: Pet | null;
  onSave: (pet: PetInput) => void | Promise<void>;
  onClose: () => void;
}

const empty: PetInput = { name: '', type: 'Dog', breed: '', age: 0, owner: '', status: 'Active' };
const field = 'w-full bg-gray-200 rounded px-3 py-2 text-sm';

export function PetFormModal({ initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<PetInput>(initial ?? empty);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof PetInput>(k: K, v: PetInput[K]) => setForm({ ...form, [k]: v });

  const handleSave = async () => {
    if (saving) return;
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[520px] max-w-[92vw] space-y-3">
        <h3 className="text-lg font-medium">{initial ? 'Edit pet' : 'Add pet'}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label>Pet Name
            <input className={field} value={form.name} onChange={(e) => set('name', e.target.value)} />
          </label>
          <label>Owner
            <input className={field} value={form.owner} onChange={(e) => set('owner', e.target.value)} />
          </label>
          <label>Pet Type
            <select className={field} value={form.type} onChange={(e) => set('type', e.target.value)}>
              <option>Dog</option>
              <option>Cat</option>
            </select>
          </label>
          <label>Age
            <input type="number" className={field} value={form.age} onChange={(e) => set('age', Number(e.target.value))} />
          </label>
          <label>Breed
            <input className={field} value={form.breed} onChange={(e) => set('breed', e.target.value)} />
          </label>
          <label>Status
            <select className={field} value={form.status} onChange={(e) => set('status', e.target.value as PetInput['status'])}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={handleSave}>{saving ? 'Saving...' : 'Save'}</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}