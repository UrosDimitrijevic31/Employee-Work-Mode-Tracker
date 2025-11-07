# Employee Work Mode Tracker

A full-stack web application for tracking where employees work each day (remote, office, vacation, sick leave, etc.) and providing managers with team visibility.

## Tech Stack

- Frontend: React 18 (Vite), TypeScript, TailwindCSS, shadcn/ui, React Router, TanStack Query
- Backend: Node.js (Express + TypeScript), JWT auth, Zod validation
- Database: PostgreSQL + Prisma ORM
- Infrastructure: Docker + docker-compose

## High-Level Features

- User authentication (JWT) with employee and manager roles
- Employees manage their daily work status via calendar
- Managers view team overview and filter by date/status
- CRUD for employees and work status entries

## Folder Structure (planned)

```
backend/
  src/
    config/
    middleware/
    routes/
    controllers/
    services/
    utils/
    prisma/
frontend/
  src/
    components/
    pages/
    hooks/
    lib/
    routes/
    styles/
    context/
```

## Quick Start (Development)

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (if running outside Docker)

### Environment Variables

- Backend:
  - Copy `backend/.env.sample` to `backend/.env`.
  - Keep `PORT=5000` and set a `JWT_SECRET` (used for signing JWTs).
  - You do not need to set `DATABASE_URL` when using Docker Compose (it is injected by compose for the container). For local host development, use `postgresql://ewm:ewm_password@localhost:5433/ewm_db?schema=public`.
- Frontend:

  - Create `frontend/.env` with:

    ```
    VITE_API_URL=http://localhost:5050/api
    ```

### Run with Docker

```bash
docker compose up -d --build
```

Services (host):

- Backend API: http://localhost:5050 (container listens on 5000)
- Frontend: http://localhost:5174 (container listens on 5173)
- Postgres: localhost:5433 (container 5432)

### Prisma Migrations & Seed

Initial setup (one-time per fresh DB):

```bash
# Apply migrations inside the backend container
docker exec -it ewm-backend sh -lc 'npx prisma migrate dev'

# Seed default users and sample work statuses
docker exec -it ewm-backend sh -lc 'npm run seed'
```

Health check:

```bash
curl http://localhost:5050/health
```

Login test:

```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"manager@example.com","password":"Password123!"}'
```

Use the returned JWT as `Authorization: Bearer <token>` for protected routes.

### Login credentials

Seeded users (from `backend/prisma/seed.ts`):

- Manager: `manager@example.com` / `Password123!`
- Employee: `employee@example.com` / `Password123!`
- Your account: `urosrgf@gmail.com` / `mateja1324!`

Frontend login page: http://localhost:5174/login

## API Overview (initial)

```
POST /auth/login
GET /employees
POST /employees
PUT /employees/:id
DELETE /employees/:id
GET /work-status
POST /work-status
PUT /work-status/:id
```

### Troubleshooting

- Port already in use:
  - Backend is mapped to host 5050 (not 5000) to avoid conflicts.
  - Frontend is mapped to host 5174 (not 5173) if 5173 is taken.
- Prisma engine errors in Docker:
  - Backend Docker image uses Debian slim and Prisma binary targets are configured for `linux-arm64-openssl-3.0.x`.
  - If you change Node base image/arch, run `docker compose build backend` to regenerate engines.

## Next Steps

- Implement backend scaffolding (Express + Prisma)
- Implement frontend scaffolding (Vite + Tailwind + shadcn)
- Add auth flow and protected routes
- Integrate Calendar UI and status selector

## License

MIT
