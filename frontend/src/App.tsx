import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import type { Screen, Pet, Owner, Appointment, ServiceItem } from './types';
import * as mock from './data/mock';
import { Sidebar } from './components/common/SideBar';
import { Header } from './components/common/Header';
import { AppRoutes } from './routes/AppRoutes';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { api, ApiError } from './lib/api';

const newId = () => Date.now();

export default function App() {
  const [screen, setScreen] = useState<Screen>(localStorage.getItem('token') ? 'dashboard' : 'login');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [owners, setOwners] = useState<Owner[]>(mock.owners);
  const [appointments, setAppointments] = useState<Appointment[]>(mock.appointments);
  const [services, setServices] = useState<ServiceItem[]>(mock.services);

  const loggedIn = screen !== 'login' && screen !== 'register';

  useEffect(() => {
    if (!loggedIn) return;
    api<Pet[]>('/pets')
      .then(setPets)
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) {
          localStorage.removeItem('token');
          setPets([]);
          setScreen('login');
        } else {
          console.error(e);
        }
      });
  }, [loggedIn]);

  const logout = () => {
    api('/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('token');
    setPets([]);
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
            onAddOwner={(x) => setOwners([...owners, { ...x, id: newId() }])}
            onUpdateOwner={(x) => setOwners(owners.map((i) => (i.id === x.id ? x : i)))}
            onDeleteOwner={(id) => setOwners(owners.filter((i) => i.id !== id))}
            onAddAppointment={(x) => setAppointments([...appointments, { ...x, id: newId() }])}
            onUpdateAppointment={(x) => setAppointments(appointments.map((i) => (i.id === x.id ? x : i)))}
            onDeleteAppointment={(id) => setAppointments(appointments.filter((i) => i.id !== id))}
            onAddService={(x) => setServices([...services, { ...x, id: newId() }])}
            onUpdateService={(x) => setServices(services.map((i) => (i.id === x.id ? x : i)))}
            onDeleteService={(id) => setServices(services.filter((i) => i.id !== id))}
          />
        </main>
      </div>
    </div>
  );
}