import type { Pet, Owner, Appointment, ServiceItem } from '../types';

export const pets: Pet[] = [
  { id: 1, name: 'Bella', type: 'Dog', breed: 'Golden Retriever', age: 3, owner: 'Santos', status: 'Active' },
  { id: 2, name: 'Max', type: 'Cat', breed: 'Persian', age: 2, owner: 'Garcia', status: 'Active' },
  { id: 3, name: 'Mochi', type: 'Dog', breed: 'Shih Tzu', age: 4, owner: 'Reyes', status: 'Active' },
  { id: 4, name: 'Charlie', type: 'Cat', breed: 'Siamese', age: 1, owner: 'Dela Cruz', status: 'Active' },
];

export const owners: Owner[] = [
  { id: 1, name: 'Santos, Maria', phone: '09223314234', email: 'Maria@gmail.com', status: 'Active' },
  { id: 2, name: 'Garcia, Juan', phone: '09956562343', email: 'Juan@gmail.com', status: 'Active' },
  { id: 3, name: 'Reyes, Anna', phone: '09956562343', email: 'Reyes@gmail.com', status: 'Active' },
  { id: 4, name: 'Dela Cruz, Paolo', phone: '09223314234', email: 'Paolo@gmail.com', status: 'Active' },
];

export const appointments: Appointment[] = [
  { id: 1, date: '2025-10-21', petName: 'Bella', owner: 'Santos', service: 'Bathing', status: 'Pending' },
  { id: 2, date: '2025-10-22', petName: 'Max', owner: 'Garcia', service: 'Haircut', status: 'In Progress' },
  { id: 3, date: '2025-10-23', petName: 'Mochi', owner: 'Reyes', service: 'Nail Trim', status: 'Completed' },
  { id: 4, date: '2025-10-24', petName: 'Charlie', owner: 'Dela Cruz', service: 'Full Groom', status: 'Pending' },
];

export const services: ServiceItem[] = [
  { id: 1, name: 'Bathing', description: 'Full body bath and blow dry', price: 2 },
  { id: 2, name: 'Haircut', description: 'Trimming and styling', price: 3 },
  { id: 3, name: 'Nail Trim', description: 'Nail clipping', price: 1 },
  { id: 4, name: 'Ear Cleaning', description: 'Clean ears and remove dirt', price: 2 },
  { id: 5, name: 'Full groom', description: 'Bath, haircut, nail trim, ear cleaning', price: 5 },
];