import { useState } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { FormModal, type FieldDef } from '../components/ui/FormModal';
import type { ServiceItem } from '../types';

type ServiceInput = Omit<ServiceItem, 'id'>;
interface Props {
  services: ServiceItem[];
  onAddService: (s: ServiceInput) => void | Promise<void>;
  onUpdateService: (s: ServiceItem) => void | Promise<void>;
  onDeleteService: (id: number) => void;
}

const fields: FieldDef[] = [
  { key: 'name', label: 'Service Name' },
  { key: 'description', label: 'Description' },
  { key: 'price', label: 'Price', type: 'number' },
];
const empty: ServiceInput = { name: '', description: '', price: 0 };

export const ServicesPage = ({ services, onAddService, onUpdateService, onDeleteService }: Props) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const close = () => { setAdding(false); setEditing(null); };

  return (
    <>
      <DataTable
        title="Grooming Services" addLabel="Add Service" rows={services}
        onAdd={() => setAdding(true)} onEdit={setEditing} onDelete={onDeleteService}
        columns={[
          { header: 'ID', render: (s) => s.id },
          { header: 'Service Name', render: (s) => s.name },
          { header: 'Description', render: (s) => s.description },
          { header: 'Price', render: (s) => `$ ${s.price}` },
        ]}
      />
      {(adding || editing) && (
        <FormModal
          key={editing?.id ?? 'new'}
          title={editing ? 'Edit service' : 'Add service'}
          fields={fields}
          initial={editing ?? empty}
          onClose={close}
          onSave={async (v) => {
            const data = v as unknown as ServiceInput;
            if (editing) await onUpdateService({ ...data, id: editing.id });
            else await onAddService(data);
            close();
          }}
        />
      )}
    </>
  );
};