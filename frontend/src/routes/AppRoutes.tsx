import type { Screen, Pet, Owner, Appointment, ServiceItem } from '../types';
import { DashboardPage } from '../pages/DashboardPage';
import { PetsPage } from '../pages/PetsPage';
import { OwnersPage } from '../pages/OwnersPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { ServicesPage } from '../pages/ServicesPage';

interface Props {
  currentScreen: Screen;
  pets: Pet[]; owners: Owner[]; appointments: Appointment[]; services: ServiceItem[];
  onAddPet: (x: Omit<Pet, 'id'>) => void;
  onUpdatePet: (x: Pet) => void;
  onDeletePet: (id: number) => void;
  onAddOwner: (x: Omit<Owner, 'id'>) => void;
  onUpdateOwner: (x: Owner) => void;
  onDeleteOwner: (id: number) => void;
  onAddAppointment: (x: Omit<Appointment, 'id'>) => void;
  onUpdateAppointment: (x: Appointment) => void;
  onDeleteAppointment: (id: number) => void;
  onAddService: (x: Omit<ServiceItem, 'id'>) => void;
  onUpdateService: (x: ServiceItem) => void;
  onDeleteService: (id: number) => void;
}

export const AppRoutes = (p: Props) => {
  switch (p.currentScreen) {
    case 'pets':
      return <PetsPage pets={p.pets} onAddPet={p.onAddPet} onUpdatePet={p.onUpdatePet} onDeletePet={p.onDeletePet} />;
    case 'owners':
      return <OwnersPage owners={p.owners} onAddOwner={p.onAddOwner} onUpdateOwner={p.onUpdateOwner} onDeleteOwner={p.onDeleteOwner} />;
    case 'appointments':
      return (
        <AppointmentsPage
          pets={p.pets}
          owners={p.owners}
          services={p.services}
          appointments={p.appointments}
          onAddAppointment={p.onAddAppointment}
          onUpdateAppointment={p.onUpdateAppointment}
          onDeleteAppointment={p.onDeleteAppointment}
        />
      );
    case 'services':
      return <ServicesPage services={p.services} onAddService={p.onAddService} onUpdateService={p.onUpdateService} onDeleteService={p.onDeleteService} />;
    default:
      return <DashboardPage pets={p.pets} owners={p.owners} appointments={p.appointments} services={p.services} />;
  }
};