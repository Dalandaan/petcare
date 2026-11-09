import { useState } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FormModal, type FieldDef } from '../components/ui/FormModal';
import type { Owner } from '../types';

type OwnerInput = Omit<Owner, 'id'>;
interface Props {
  owners: Owner[];
  onAddOwner: (o: OwnerInput) => void | Promise<void>;
  onUpdateOwner: (o: Owner) => void | Promise<void>;
  onDeleteOwner: (id: number) => void;
}

const fields: FieldDef[] = [
  { key: 'name', label: 'Full Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
];
const empty: OwnerInput = { name: '', phone: '', email: '', status: 'Active' };

export const OwnersPage = ({ owners, onAddOwner, onUpdateOwner, onDeleteOwner }: Props) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Owner | null>(null);
  const close = () => { setAdding(false); setEditing(null); };

  return (
    <>
      <DataTable
        title="Owner Records" addLabel="Add Owner" rows={owners}
        onAdd={() => setAdding(true)} onEdit={setEditing} onDelete={onDeleteOwner}
        columns={[
          { header: 'ID', render: (o) => o.id },
          { header: 'Name', render: (o) => o.name },
          { header: 'Phone', render: (o) => o.phone },
          { header: 'Email', render: (o) => o.email },
          { header: 'Status', render: (o) => <StatusBadge status={o.status} /> },
        ]}
      />
      {(adding || editing) && (
        <FormModal
          key={editing?.id ?? 'new'}
          title={editing ? 'Edit owner' : 'Add owner'}
          fields={fields}
          initial={editing ?? empty}
          onClose={close}
          onSave={async (v) => {
            const data = v as unknown as OwnerInput;
            if (editing) await onUpdateOwner({ ...data, id: editing.id });
            else await onAddOwner(data);
            close();
          }}
        />
      )}
    </>
  );
};