# PetCare - Pet Grooming Management System

A school project with a Laravel (Sanctum) API backend and a React + TypeScript + Vite + Tailwind frontend.

## Requirements
- PHP 8.3+ and Composer
- Node.js and npm
- MySQL (Laragon works)

## Backend setup
```
cd backend
composer install
copy .env.example .env
php artisan key:generate
```
Create a MySQL database named `petcare`, then check the `DB_*` settings in `.env`.
```
php artisan migrate
php artisan serve
```
The API runs at http://127.0.0.1:8000

## Frontend setup
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Features
- Register and login (by username) with Sanctum tokens
- Pets: full CRUD through the Laravel API
- Owners API (Laravel)
- Owners, Appointments and Services pages (in progress)