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

## Deployment (Render + Netlify)

### Backend on Render

1. Push this project to GitHub.
2. In Render, create a new **Web Service** and point it to the repository.
3. Set root directory to `backend`.
4. Use:
   - Build command: `npm install`
   - Start command: `npm start`
5. Add environment variables in Render:
   - `MONGODB_URI=<your-mongodb-connection-string>`
   - `CLIENT_ORIGIN=https://<your-netlify-site>.netlify.app`
   - `NODE_ENV=production`
6. Deploy and copy the backend URL (for example `https://task-orbit-api.onrender.com`).

### Frontend on Netlify

1. In Netlify, create a new site from the same repository.
2. Set base directory to `frontend`.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable:
   - `VITE_API_BASE_URL=https://<your-render-backend>.onrender.com/api`
5. Deploy the site.

### Final CORS Step

- Update backend `CLIENT_ORIGIN` in Render to your exact Netlify URL.
- If needed, you can allow multiple origins with comma-separated values:
  - `CLIENT_ORIGIN=http://localhost:5173,https://<your-netlify-site>.netlify.app`
