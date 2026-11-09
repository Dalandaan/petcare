# PetCare - Pet Grooming Management System

A web-based system for managing a pet grooming business: pets, owners, grooming services and appointments.

**Student:** Dan Michael Pogoy, John Kycel Inoc
**Course / Section:** Bsit 3D
**Instructor:** Irene Eda

## Live Links

- **Backend API:** https://petcare-zmg3.onrender.com/api
- **Frontend:** http://localhost:5173/
- **Health check:** https://petcare-zmg3.onrender.com/up

> The backend runs on a free Render instance, which sleeps when idle. The first request after a while can take up to about a minute. Open the health check link first and wait for "Application up".

## Features

- Register and log in with a username (token-based authentication)
- Pets: add, view, edit, delete
- Owners: add, view, edit, delete
- Grooming services: add, view, edit, delete
- Appointments: each appointment is linked to a pet, an owner and a service, with a status (Pending, In Progress, Completed)
- Dashboard with totals and recent appointments
- Search box on every table
- Error messages shown in the forms when the server rejects a value
- Responsive layout for phones and desktops

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Laravel 13 with Laravel Sanctum |
| Database | PostgreSQL on Neon |
| Hosting | Render (Docker) for the backend |
| Tools | VS Code, Postman, Git and GitHub |

## Project Structure

    petcare/
      backend/    Laravel API (controllers, models, migrations, routes)
      frontend/   React + TypeScript app

## API Overview

All routes start with /api. Everything except register and login needs the header `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /register | Create an account |
| POST | /login | Log in and get a token |
| POST | /logout | Log out |
| GET, POST | /pets | List or add pets |
| PUT, DELETE | /pets/{id} | Update or delete a pet |
| GET, POST | /owners | List or add owners |
| PUT, DELETE | /owners/{id} | Update or delete an owner |
| GET, POST | /services | List or add services |
| PUT, DELETE | /services/{id} | Update or delete a service |
| GET, POST | /appointments | List or add appointments |
| PUT, DELETE | /appointments/{id} | Update or delete an appointment |

## Running the Frontend Locally

1. Install Node.js (LTS).
2. Open a terminal in the frontend folder.
3. Run `npm install`.
4. Check that `frontend/.env.development` contains `VITE_API_URL=https://petcare-zmg3.onrender.com/api`.
5. Run `npm run dev` and open http://localhost:5173

## Running the Backend Locally (optional)

1. Install PHP 8.3 with the pgsql extension, and Composer.
2. Open a terminal in the backend folder and run `composer install`.
3. Copy `.env.example` to `.env`, then set `APP_KEY` (run `php artisan key:generate`) and the `DB_*` values for your PostgreSQL database.
4. Run `php artisan migrate` and then `php artisan serve`.

## Deployment

- The backend is deployed on Render using `backend/Dockerfile.render`. Every push to the main branch redeploys it, and the migrations run on startup.
- Secrets (APP_KEY and the database password) are stored as Render environment variables and are never committed to GitHub.
- The database is a Neon PostgreSQL project.



