import { useState } from 'react';
import { Button } from './Button';

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
  options?: string[];
}
export type Values = Record<string, string | number>;

interface Props {
  title: string;
  fields: FieldDef[];
  initial: object;
  onSave: (values: Values) => void;
  onClose: () => void;
}

const inputClass = 'w-full bg-gray-200 rounded px-3 py-2 text-sm';

export function FormModal({ title, fields, initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<Values>(initial as Values);
  const set = (key: string, value: string | number) => setForm({ ...form, [key]: value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[480px] space-y-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {fields.map((f) => (
            <label key={f.key}>
              {f.label}
              {f.type === 'select' ? (
                <select className={inputClass} value={form[f.key]} onChange={(e) => set(f.key, e.target.value)}>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={f.type ?? 'text'}
                  className={inputClass}
                  value={form[f.key]}
                  onChange={(e) => set(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                />
              )}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={() => onSave(form)}>Save</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}