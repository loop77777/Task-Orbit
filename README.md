# Task Orbit - Full Stack Assignment

This project is a responsive Task Management Web Application built with the MERN stack.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Features

- Create a task
- Edit and delete tasks
- Mark tasks as completed/incomplete
- Fetch/store tasks through REST APIs
- Responsive UI for desktop and mobile

## Folder Structure

```text
AP mobility assignment/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
  frontend/
    src/
      components/
```

## Setup Instructions

### 1) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Environment variables in `backend/.env`:

- `PORT=5000`
- `MONGODB_URI=mongodb://127.0.0.1:27017/ap-mobility-tasks`
- `CLIENT_ORIGIN=http://localhost:5173`

### 2) Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend variable in `frontend/.env`:

- `VITE_API_BASE_URL=http://localhost:5000/api`

## API Endpoints

- `GET /api/health`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Assumptions and Additional Notes

- Assumption: MongoDB is running locally by default.
- Backend returns normalized task payload with `id` for easier frontend handling.
- Added lightweight error handling for invalid routes and API errors.
- UI emphasizes readability and fast interactions while staying responsive.
