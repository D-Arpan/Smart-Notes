# Smart Notes

Smart Notes is a full-stack notes application with private user workspaces. Users can register, log in, and manage notes that are scoped to their own account. The frontend is built with Next.js and TypeScript, and the backend uses Express, MongoDB, Mongoose, and JWT authentication.

## Features

- User registration and login
- JWT-based protected note routes
- Private notes per user account
- Create, read, edit, and delete notes
- Search notes by title and content
- Latest-first and oldest-first sorting
- Scrollable full-note reader modal
- In-app modals and toast messages instead of browser alerts
- Responsive dark UI for desktop and mobile

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript
- Backend: Express 5, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure

```text
smart-notes/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── .env
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB connection string

## Environment Variables

Create the following environment files.

### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/Smart-Notes
JWT_SECRET=your_jwt_secret
```

### `frontend/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Running the Project

Run the backend and frontend in two separate terminals.

### 1. Start MongoDB

Make sure MongoDB is running before starting the backend.

### 2. Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

If PowerShell blocks `npm`, use `npm.cmd` instead.

## Available Scripts

### Backend

- `npm run dev` starts the Express server with nodemon

### Frontend

- `npm run dev` starts the Next.js development server
- `npm run build` creates a production build
- `npm run start` starts the production server
- `npm run lint` runs Next.js linting

## API Overview

### Auth Routes

- `POST /auth/register`
- `POST /auth/login`

### Notes Routes

- `GET /notes`
- `POST /notes`
- `GET /notes/:id`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

All `/notes` routes require a bearer token in the `Authorization` header.

## Frontend UX Highlights

- Landing page with register and login flow
- Auth modal with password visibility toggle
- Dashboard with note stats and sort toggle
- Dedicated create-note modal
- Read-note modal for longer note content
- Edit and delete confirmation modals
- Toast-based success, error, and info feedback

## Notes

- Notes are private to the authenticated user.
- The frontend expects the backend API base URL from `NEXT_PUBLIC_API_URL`.
- The application is designed to work with the current backend route structure in this repository.
