# Project Platform (Module 5 Assessment)

Full-stack project platform built with:

* **Backend:** Django + Django REST Framework (DRF), JWT auth (SimpleJWT), dj-rest-auth + allauth, PostgreSQL
* **Frontend:** React + Vite + TypeScript, TailwindCSS, shadcn/ui + Radix UI, React Router, TanStack React Query

Repo structure:

```txt
source-code/
  backend/   # Django API
  frontend/  # React app
```

---

## Features

### Authentication (Backend)

* Register (`/api/auth/register/`)
* Login (`/api/auth/login/`)
* Logout (`/api/auth/logout/`)
* Current user (`/api/auth/users/me/`)
* JWT refresh (`/api/auth/token/refresh/`)
* Password reset flow:

  * Request reset: `/api/auth/password/reset/`
  * Confirmation redirect: `/api/auth/password/reset/confirm/<uidb64>/<token>/`
  * Submit new password: `/api/auth/password/reset/confirm/submit/`

### Projects (Backend)

* CRUD endpoints via DRF `ModelViewSet` under:

  * `/api/projects/`
  * `/api/projects/<id>/`
* Search support using DRF `SearchFilter`:

  * `GET /api/projects/?search=<query>`
  * Searches: `title`, `owner__email`, `description`, `status`
* Pin/unpin a project:

  * `POST /api/projects/<id>/pin/`
  * Toggles pinned state for the current user
* Projects include:

  * `title`, `description`, `status` (`pending | active | complete | archived`)
  * `start_date`, `end_date`
  * `owner`
  * membership model exists (`ProjectMembership`) with access levels and invite status
  * pinned model (`PinnedProject`) for per-user pinning

### Frontend

* React SPA with Vite + TypeScript
* TailwindCSS styling + component patterns from shadcn/ui + Radix
* React Router for navigation
* TanStack React Query + Axios for API calls
* Password reset UI flow exists in `src/features/auth/components/password-reset-flow/`

---

## Tech Stack

### Backend

* Django 5.x
* Django REST Framework
* dj-rest-auth + django-allauth
* djangorestframework-simplejwt
* django-cors-headers
* django-filter
* PostgreSQL (via `psycopg2-binary`)
* python-decouple for environment variables

### Frontend

* React 18 + TypeScript
* Vite
* TailwindCSS
* Radix UI + shadcn/ui configuration
* React Router
* TanStack React Query
* Axios
* Framer Motion
* react-three/fiber + drei

---

## Getting Started

### Prerequisites

* **Node.js** (18+ recommended)
* **Python** 3.10+
* **PostgreSQL** running locally

---

## Backend Setup (Django)

### 1) Create and activate a virtual environment

```bash
cd source-code/backend
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .venv\\Scripts\\activate   # Windows PowerShell
```

### 2) Install dependencies

```bash
pip install -r requirements.txt
```

### 3) Configure environment variables

Create a `backend/.env` file:

```env
SECRET_KEY=your-secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

CSRF_TRUSTED_ORIGINS=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173
CORS_ALLOW_CREDENTIALS=True

USE_POSTGRES=True
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=5432

EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL="Your App <your_email@example.com>"
```

### 4) Create the database

```bash
createdb your_db_name
```

### 5) Run migrations

```bash
python manage.py migrate
```

### 6) Start the server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup (React)

### 1) Install dependencies

```bash
cd source-code/frontend
npm install
```

### 2) Configure environment variables

Create `frontend/.env`:

```env
VITE_BASE_URL="http://127.0.0.1:8000"
```

### 3) Start the dev server

```bash
npm run dev
```

---

## API Quick Reference

### Auth

* `POST /api/auth/register/`
* `POST /api/auth/login/`
* `POST /api/auth/logout/`
* `GET  /api/auth/users/me/`
* `POST /api/auth/token/refresh/`
* `POST /api/auth/password/reset/`
* `GET  /api/auth/password/reset/confirm/<uidb64>/<token>/`
* `POST /api/auth/password/reset/confirm/submit/`

### Projects

* `GET    /api/projects/`
* `POST   /api/projects/`
* `GET    /api/projects/<id>/`
* `PUT    /api/projects/<id>/`
* `PATCH  /api/projects/<id>/`
* `DELETE /api/projects/<id>/`
* `POST   /api/projects/<id>/pin/`

Search:

* `GET /api/projects/?search=<query>`

---

## Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
python manage.py runserver
python manage.py migrate
python manage.py createsuperuser
```

## Notes

Assessment project for **FSSD 2025 – Module 5**.

