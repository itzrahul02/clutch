# Clutch — IIIT Kota Gaming Event Portal

Comprehensive repository for the Clutch event platform. This project provides a Node.js + Express backend with a React + Vite frontend to register teams, manage players, and send verification emails.

## Table of contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Backend API](#backend-api)
- [Frontend](#frontend)
- [Building & Deployment](#building--deployment)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

## Project Overview

Clutch is a small event registration platform for gaming tournaments. The backend stores games, teams and players in MongoDB, issues verification tokens to players, and sends verification emails. The frontend (React + Vite) consumes the backend API and provides user-facing registration flows.

## Features
- Create and list games
- Team registration (multiple players per team)
- Email verification for players
- Simple server-side rendered team list view
- Static frontend build served from `frontend/dist`

## Tech Stack
- Backend: Node.js, Express, Mongoose
- Frontend: React, Vite, Tailwind CSS
- Email: Nodemailer (Gmail SMTP)
- Deployment target: Vercel (see `vercel.json`)

## Repository Structure
- `index.js` — server entry
- `config/dbConnect.js` — MongoDB connection
- `routes/` — Express route definitions (`gamesRouter.js`, `teamRouter.js`, `playersRouter.js`)
- `controllers/` — route handlers
- `models/` — Mongoose schemas (`gamesModel.js`, `teamModel.js`, `playerModel.js`)
- `utils/` — `generateMail.js`, `sendMail.js`
- `frontend/` — React app (Vite)
- `vercel.json` — Vercel build & route configuration

See the source files for details.

## Prerequisites
- Node.js (>=16 recommended)
- npm or yarn
- MongoDB connection (Atlas or self-hosted)
- Gmail account (for sending email) or another SMTP provider

## Environment Variables
Create a `.env` file in the repository root with the following keys:

```
MONGO_URI=your_mongodb_connection_string
EMAIL=your_smtp_email@example.com
PASS=your_smtp_password_or_app_password
ENV=dev
```

- `MONGO_URI`: connection string for MongoDB
- `EMAIL` / `PASS`: SMTP credentials used by `utils/sendMail.js` (currently configured for Gmail)
- `ENV`: when set to `dev` the server listens on the configured `PORT` (see `index.js`)

Important: For Gmail, you may need to use an App Password and enable the appropriate account settings.

## Local Setup

1. Clone the repo and install dependencies (shortcut):

```bash
npm install
npm run insta
```

`npm run insta` will run `npm install` at root and then `cd frontend && npm install`.

2. Dev run (concurrently start backend and frontend):

```bash
npm run dev
```

3. If you prefer to run backend and frontend separately:

Backend only:

```bash
node index.js
```

Frontend only (in `frontend/`):

```bash
cd frontend
npm run dev
```

Note: The backend currently sets CORS origin to `http://localhost:5173` and listens on port `1234` (see `index.js`).

## Backend API

Base URL: `/api`

Endpoints:

- `GET /api/games` — list all games (uses `routes/gamesRouter.js` → `getAllGames`)
- `POST /api/games/add` — add a new game. Body example:

```json
{
  "name": "Game Name",
  "minPlayers": 1,
  "maxPlayers": 4,
  "rules": ["rule 1", "rule 2"],
  "img": "url_or_path"
}
```

- `POST /api/team` — register a team (uses `controllers/teamController.js`). Body example:

```json
{
  "gameName": "Game Name",
  "teamName": "Team Alpha",
  "contact": "9999999999",
  "teamPlayers": [
    { "name": "Player 1", "UID": "UID1", "IGN": "IGN1", "email": "p1@example.com" },
    { "name": "Player 2", "UID": "UID2", "IGN": "IGN2", "email": "p2@example.com" }
  ]
}
```

This endpoint will create player documents, create a team document linking the players, and send verification emails to each player.

- `GET /api/player/:token` — verify a player's email by token (handled by `controllers/playerController.js`). Visiting the token URL will mark the player as verified and redirect to `/`.

- `GET /api/team/:gameName` — server-rendered view (EJS) of teams registered for `gameName` (returns HTML rendered from `views/teams.ejs`).

## Frontend

The frontend is located in `frontend/` and uses Vite + React.

Useful commands (in `frontend/`):

- `npm run dev` — start dev server
- `npm run build` — build production assets to `frontend/dist`
- `npm run preview` — preview built assets

The frontend consumes the backend API under `/api/*` (see `src/components` for usage).

## Building & Deployment

1. Build the frontend:

```bash
npm run build
```

2. The root `vercel.json` is configured to deploy `index.js` as a Node server and `frontend/dist` as static assets. When deploying to Vercel, the server entry (`index.js`) handles API routes and serves the static frontend.

## Contributing

- Open an issue to discuss major changes.
- Create a branch per feature and open a pull request.
- Follow the existing code style.

## Notes & Gotchas
- `index.js` currently only starts the server when `ENV` equals `dev`. In other environments the app is exported (helpful for serverless or test setups).
- The `dev` script in root `package.json` references `concurrently` and `nodemon`. If you run `npm run dev` and encounter "command not found" errors, install those packages globally or add them to `devDependencies`.

## License & Contact
This project does not include a license file. Add a `LICENSE` if you want to open-source the code.

Contact: Rahul Sharma (project owner)
