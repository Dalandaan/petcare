import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';

export interface Column<T> { header: string; render: (row: T) => React.ReactNode }

interface Props<T> {
  title: string;
  addLabel: string;
  columns: Column<T>[];
  rows: T[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (id: number) => void;
}

export function DataTable<T extends { id: number }>({ title, addLabel, columns, rows, onAdd, onEdit, onDelete }: Props<T>) {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const visibleRows = q
    ? rows.filter((r) => Object.values(r).join(' ').toLowerCase().includes(q))
    : rows;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">{title}</h2>
        <Button onClick={onAdd}>+ {addLabel}</Button>
      </div>
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-2 bg-gray-300 rounded px-3 py-1 text-xs w-52">
          <Search size={14} />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-[#ececec] rounded-2xl p-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm text-left">
          <thead>
            <tr className="border-b border-gray-400">
              {columns.map((c) => <th key={c.header} className="py-2 px-2 font-semibold">{c.header}</th>)}
              <th className="py-2 px-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((r) => (
              <tr key={r.id} className="border-b border-gray-300">
                {columns.map((c) => <td key={c.header} className="py-3 px-2">{c.render(r)}</td>)}
                <td className="py-3 px-2 space-x-1 whitespace-nowrap">
                  <Button size="sm" onClick={() => onEdit?.(r)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete?.(r.id)}>Delete</Button>
                </td>
              </tr>
            ))}
            {visibleRows.length === 0 && (
              <tr>
                <td className="py-4 px-2 text-gray-500" colSpan={columns.length + 1}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}