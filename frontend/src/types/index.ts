
export type Screen =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'pets'
  | 'owners'
  | 'appointments'
  | 'services';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff';
  email: string;
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  owner: string;
  status: 'Active' | 'Inactive';
}

export interface Owner {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

export interface Appointment {
  id: number;
  date: string;
  petName: string;
  owner: string;
  service: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
}
