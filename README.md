# Smart Notes

Smart Notes is a full-stack notes application built around private, account-scoped workspaces. Users can register, authenticate with JWT-based sessions, and manage personal notes through a modern Next.js interface backed by an Express and MongoDB API.

The project is structured as a two-application repository:
- `frontend`: Next.js 14, React 18, TypeScript
- `backend`: Express 5, MongoDB, Mongoose, JWT authentication

## Overview

Smart Notes is designed as a personal note management experience rather than a shared playground. Each authenticated user works inside an isolated notes space, with note access protected through bearer-token authentication.

The frontend emphasizes a polished application experience:
- responsive dark UI
- modal-based create, edit, and read flows
- toast-based system feedback
- searchable notes collection
- client-side sorting for latest-first and oldest-first views
- markdown-style note rendering for headings, bold text, and lists

## Core Features

### Authentication and Access Control
- User registration and login
- JWT-protected note operations
- Private note ownership per account
- Persistent frontend session handling

### Notes Experience
- Create, view, edit, and delete notes
- Search notes by title and content
- Sort notes by latest first or oldest first
- Large reading modal for longer note content
- Markdown-style rendering support for:
  - `#`, `##`, `###` headings
  - `**bold**` text
  - bullet lists such as `- item` or `* item`
  - numbered lists such as `1. item`

### Frontend UX
- Responsive layout for desktop, tablet, and mobile
- Modern dark theme
- Animated app loader during startup
- Modal confirmations instead of browser alerts
- Toast notifications for success, error, and informational states

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Custom component-based UI architecture

### Backend
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- bcrypt

## Repository Structure

```text
backend-yt/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── notes/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── lib/
│   │   └── types/
│   ├── .env
│   └── package.json
└── README.md
```

## Environment Configuration

Create the following environment files before starting the application.

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

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB running locally, or a valid MongoDB connection string

## Installation

Install dependencies for both applications separately.

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

Run the backend and frontend in separate terminals.

### 1. Start MongoDB

Ensure MongoDB is available before launching the backend server.

### 2. Start the backend API

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the frontend application

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
- `npm run dev`: Starts the Express API with nodemon

### Frontend
- `npm run dev`: Starts the Next.js development server
- `npm run build`: Builds the production application
- `npm run start`: Starts the production build
- `npm run lint`: Runs Next.js ESLint checks

## API Surface

### Health / Warm-Up
- `GET /ping`

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Notes
- `GET /notes`
- `POST /notes`
- `GET /notes/:id`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

All `/notes` routes require a bearer token in the `Authorization` header.

## Frontend Architecture

The frontend is organized around reusable UI primitives and higher-level feature sections.

- `src/components/ui`: base UI building blocks such as buttons, inputs, modals, toasts, and loader components
- `src/components/sections`: page-level layout sections such as the landing experience and authenticated app shell
- `src/components/notes`: note-specific UI such as cards, editor modals, reader modal, and markdown rendering
- `src/lib`: API helpers and shared utilities
- `src/types`: shared TypeScript types

This separation keeps the interface modular, easier to maintain, and straightforward to extend.

## Product Experience Highlights

- Landing experience for sign in and registration
- Authenticated dashboard with private note access
- Modal-based note creation and editing for better writing space
- Full-size note reader for longer content
- Search and sorting controls for note browsing
- Mobile-responsive layouts and controls
- Startup loader with backend warm-up ping

## Notes

- The frontend uses `NEXT_PUBLIC_API_URL` for all API communication.
- The repository is intended to be run as two local services during development.
- Notes are stored as plain text and rendered on the frontend with lightweight markdown-style formatting.

## License

This project is currently provided without a dedicated license file. Add one before public distribution if licensing terms need to be explicit.
