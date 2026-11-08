import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import type { Screen, Pet, Owner, Appointment, ServiceItem } from './types';
import { Sidebar } from './components/common/SideBar';
import { Header } from './components/common/Header';
import { AppRoutes } from './routes/AppRoutes';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { api, ApiError } from './lib/api';

export default function App() {
  const [screen, setScreen] = useState<Screen>(localStorage.getItem('token') ? 'dashboard' : 'login');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const loggedIn = screen !== 'login' && screen !== 'register';

  const clearData = () => {
    setPets([]);
    setOwners([]);
    setServices([]);
    setAppointments([]);
  };

  useEffect(() => {
    if (!loggedIn) return;

    const handleError = (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) {
        localStorage.removeItem('token');
        clearData();
        setScreen('login');
      } else {
        console.error(e);
      }
    };

    api<Pet[]>('/pets').then(setPets).catch(handleError);
    api<Owner[]>('/owners').then(setOwners).catch(handleError);
    api<ServiceItem[]>('/services').then(setServices).catch(handleError);
    api<Appointment[]>('/appointments').then(setAppointments).catch(handleError);
  }, [loggedIn]);

  const logout = () => {
    api('/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('token');
    clearData();
    setMenuOpen(false);
    setScreen('login');
  };

  const navigate = (s: Screen) => {
    setScreen(s);
    setMenuOpen(false);
  };

  const addPet = async (x: Omit<Pet, 'id'>) => {
    const created = await api<Pet>('/pets', { method: 'POST', body: JSON.stringify(x) });
    setPets([created, ...pets]);
  };

  const updatePet = async (x: Pet) => {
    const updated = await api<Pet>(`/pets/${x.id}`, { method: 'PUT', body: JSON.stringify(x) });
    setPets(pets.map((i) => (i.id === updated.id ? updated : i)));
  };

  const deletePet = async (id: number) => {
    await api(`/pets/${id}`, { method: 'DELETE' });
    setPets(pets.filter((i) => i.id !== id));
  };

  const addOwner = async (x: Omit<Owner, 'id'>) => {
    const created = await api<Owner>('/owners', { method: 'POST', body: JSON.stringify(x) });
    setOwners([created, ...owners]);
  };

  const updateOwner = async (x: Owner) => {
    const updated = await api<Owner>(`/owners/${x.id}`, { method: 'PUT', body: JSON.stringify(x) });
    setOwners(owners.map((i) => (i.id === updated.id ? updated : i)));
  };

  const deleteOwner = async (id: number) => {
    await api(`/owners/${id}`, { method: 'DELETE' });
    setOwners(owners.filter((i) => i.id !== id));
  };

  const addService = async (x: Omit<ServiceItem, 'id'>) => {
    const created = await api<ServiceItem>('/services', { method: 'POST', body: JSON.stringify(x) });
    setServices([...services, created]);
  };

  const updateService = async (x: ServiceItem) => {
    const updated = await api<ServiceItem>(`/services/${x.id}`, { method: 'PUT', body: JSON.stringify(x) });
    setServices(services.map((i) => (i.id === updated.id ? updated : i)));
  };

  const deleteService = async (id: number) => {
    await api(`/services/${id}`, { method: 'DELETE' });
    setServices(services.filter((i) => i.id !== id));
  };

  // Appointments are saved with the ids of the chosen pet, owner and service
  const toAppointmentPayload = (x: Omit<Appointment, 'id'>) => {
    const pet = pets.find((p) => p.name === x.petName);
    const owner = owners.find((o) => o.name === x.owner);
    const service = services.find((s) => s.name === x.service);
    if (!pet || !owner || !service) {
      throw new Error('Please choose a pet, an owner and a service.');
    }
    return {
      date: x.date,
      status: x.status,
      pet_id: pet.id,
      owner_id: owner.id,
      service_id: service.id,
    };
  };

  const addAppointment = async (x: Omit<Appointment, 'id'>) => {
    const created = await api<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(toAppointmentPayload(x)),
    });
    setAppointments([...appointments, created]);
  };

  const updateAppointment = async (x: Appointment) => {
    const updated = await api<Appointment>(`/appointments/${x.id}`, {
      method: 'PUT',
      body: JSON.stringify(toAppointmentPayload(x)),
    });
    setAppointments(appointments.map((i) => (i.id === updated.id ? updated : i)));
  };

  const deleteAppointment = async (id: number) => {
    await api(`/appointments/${id}`, { method: 'DELETE' });
    setAppointments(appointments.filter((i) => i.id !== id));
  };

  if (screen === 'login')
    return <LoginPage onLogin={() => setScreen('dashboard')} onSignUp={() => setScreen('register')} />;
  if (screen === 'register')
    return <RegisterPage onRegister={() => setScreen('login')} onBack={() => setScreen('login')} />;

  return (
    <div className="app-zoom flex bg-white">
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar currentScreen={screen} onNavigate={navigate} onLogout={logout} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center border-b px-4 py-2 lg:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="p-1">
            <Menu size={24} />
          </button>
        </div>

        <Header />
        <main className="p-4 lg:p-6">
          <AppRoutes
            currentScreen={screen}
            pets={pets}
            owners={owners}
            appointments={appointments}
            services={services}
            onAddPet={addPet}
            onUpdatePet={updatePet}
            onDeletePet={deletePet}
            onAddOwner={addOwner}
            onUpdateOwner={updateOwner}
            onDeleteOwner={deleteOwner}
            onAddAppointment={addAppointment}
            onUpdateAppointment={updateAppointment}
            onDeleteAppointment={deleteAppointment}
            onAddService={addService}
            onUpdateService={updateService}
            onDeleteService={deleteService}
          />
        </main>
      </div>
    </div>
  );
}