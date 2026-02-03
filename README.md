Collaborative Project Management System

A full-stack project management solution designed to facilitate team collaboration, task tracking, and real-time communication. Built with a Django REST Framework backend and a React (TypeScript) frontend, utilizing a modern Service-Repository architectural pattern.

🚀 Tech Stack

Frontend

Core: React 18, TypeScript, Vite

State & Networking: TanStack Query (React Query), Axios

Styling: Tailwind CSS, Radix UI / Shadcn UI

Forms & Validation: React Hook Form, Zod

Architecture: Feature-based folder structure (Service -> Hook -> Component)

Backend

Core: Python 3.12, Django 5.0

API: Django REST Framework (DRF)

Authentication: JWT via dj-rest-auth (HTTPOnly Cookies for security)

Database: PostgreSQL

Async Tasks: Custom Django Management Commands (Overdue Checkers)

Infrastructure

Containerization: Docker, Docker Compose

Web Server: Nginx (Production serving)

Storage: AWS S3 (Optional/Configurable for Media)

✨ Key Features

🔐 Authentication & Security

Secure Auth: JWT-based authentication stored in HTTPOnly cookies (XSS protection).

Account Management: Sign up, Login, Password Reset (via SMTP email), and Profile Management.

Security Gates: Protected Routes on frontend; Permission Classes on backend.

📂 Project Workspaces

CRUD Operations: Create, Update, Delete projects.

Membership System: Invite users via email, manage roles (Admin/Editor/Viewer).

Dashboard: "Pinned" projects for quick access and status filtering.

✅ Task Management

Task Tracking: Assign tasks to members, set due dates, and toggle completion status.

Smart Filtering: Filter by assignee, status, or search text.

Audit Trail: System automatically records who completed a task and when.

💬 Team Communication

Project Chat: Integrated discussion threads for every project.

Reactions: Emoji reactions for messages.

Real-time Feel: Optimistic UI updates for instant feedback.

🔔 Notifications

System Alerts: Receive notifications for project invites and assignments.

Background Jobs: Automated management command checks for overdue tasks and flags them.

🛠️ Architecture Highlights

Frontend: The "Golden Pattern"

To ensure scalability, every feature (Projects, Tasks, etc.) follows a strict data flow:

Types: TypeScript interfaces define the contract.

Service: Raw Axios calls handle the network layer.

Hooks: React Query hooks manage caching, loading states, and background refetching.

Components: UI components are purely presentational and consume hooks.

Backend: Modular Design

Signals: Automatic profile creation upon user registration.

Custom Admin: Optimized Django Admin with inline models and autocomplete fields for performance.

Management Commands: Custom scripts to handle background maintenance logic.

🚀 Getting Started

Prerequisites

Node.js (v18+)

Python (v3.10+)

PostgreSQL (or Docker)

1. Backend Setup

# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment Variables
# Create a .env file in /backend/config/ based on the template below.

# Run Migrations
python manage.py migrate

# Create Superuser
python manage.py createsuperuser

# Run Server
python manage.py runserver


2. Frontend Setup

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run Development Server
npm run dev


The app will be available at http://localhost:5173.

🐳 Docker Deployment

The project includes a docker-compose.yml for orchestrating the entire stack (Frontend, Backend, Database, Nginx).

# Build and Run
docker-compose up --build


🧪 Testing

The backend includes a comprehensive test suite covering Models, Views, and Auth logic.

cd backend
python manage.py test


⚙️ Environment Variables

Create a .env file in the backend/ directory:

# Django
SECRET_KEY=your_secret_key_here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,backend

# Database (If using Postgres)
USE_POSTGRES=True
DB_NAME=project_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Email (For Password Resets)
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL=your_email@gmail.com

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000


📝 License

This project is created for the FSSD Module 5 Assessment.
