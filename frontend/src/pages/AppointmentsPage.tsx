import { useState } from 'react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FormModal, type FieldDef } from '../components/ui/FormModal';
import type { Appointment } from '../types';

type AppointmentInput = Omit<Appointment, 'id'>;
interface Props {
  appointments: Appointment[];
  onAddAppointment: (a: AppointmentInput) => void;
  onUpdateAppointment: (a: Appointment) => void;
  onDeleteAppointment: (id: number) => void;
}

const fields: FieldDef[] = [
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'petName', label: 'Pet name' },
  { key: 'owner', label: 'Owner' },
  { key: 'service', label: 'Service' },
  { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] },
];
const empty: AppointmentInput = { date: '', petName: '', owner: '', service: '', status: 'Pending' };

export const AppointmentsPage = ({ appointments, onAddAppointment, onUpdateAppointment, onDeleteAppointment }: Props) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const close = () => { setAdding(false); setEditing(null); };

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
          onSave={(v) => {
            const data = v as unknown as AppointmentInput;
            if (editing) onUpdateAppointment({ ...data, id: editing.id });
            else onAddAppointment(data);
            close();
          }}
        />
      )}
    </>
  );
};