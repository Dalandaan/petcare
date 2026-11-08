import { useState } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FormModal, type FieldDef } from '../components/ui/FormModal';
import type { Appointment, Pet, Owner, ServiceItem } from '../types';

type AppointmentInput = Omit<Appointment, 'id'>;
interface Props {
  appointments: Appointment[];
  pets?: Pet[];
  owners?: Owner[];
  services?: ServiceItem[];
  onAddAppointment: (a: AppointmentInput) => void | Promise<void>;
  onUpdateAppointment: (a: Appointment) => void | Promise<void>;
  onDeleteAppointment: (id: number) => void;
}

const unique = (list: string[]) => Array.from(new Set(list));

export const AppointmentsPage = ({
  appointments,
  pets = [],
  owners = [],
  services = [],
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
}: Props) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const close = () => { setAdding(false); setEditing(null); };

  const petNames = unique(pets.map((p) => p.name));
  const ownerNames = unique(owners.map((o) => o.name));
  const serviceNames = unique(services.map((s) => s.name));

  const fields: FieldDef[] = [
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'petName', label: 'Pet name', type: 'select', options: petNames },
    { key: 'owner', label: 'Owner', type: 'select', options: ownerNames },
    { key: 'service', label: 'Service', type: 'select', options: serviceNames },
    { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] },
  ];

  const empty: AppointmentInput = {
    date: '',
    petName: petNames[0] ?? '',
    owner: ownerNames[0] ?? '',
    service: serviceNames[0] ?? '',
    status: 'Pending',
  };

  return (
    <>
      <DataTable
        title="Appointments" addLabel="Add Appointment" rows={appointments}
        onAdd={() => setAdding(true)} onEdit={setEditing} onDelete={onDeleteAppointment}
        columns={[
          { header: 'ID', render: (a) => a.id },
          { header: 'Pet name', render: (a) => a.petName },
          { header: 'Owner', render: (a) => a.owner },
          { header: 'Service', render: (a) => a.service },
          { header: 'Status', render: (a) => <StatusBadge status={a.status} /> },
        ]}
      />
      {(adding || editing) && (
        <FormModal
          key={editing?.id ?? 'new'}
          title={editing ? 'Edit appointment' : 'Add appointment'}
          fields={fields}
          initial={editing ?? empty}
          onClose={close}
          onSave={async (v) => {
            const data = v as unknown as AppointmentInput;
            if (editing) await onUpdateAppointment({ ...data, id: editing.id });
            else await onAddAppointment(data);
            close();
          }}
        />
      )}
    </>
  );
};