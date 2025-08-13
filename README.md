# VoomGo Admin (React + Vite)

Simple steps to run and configure the project.

## Prerequisites
- Node.js 18+ and npm

## 1) Install dependencies
```bash
npm install
```

## 2) Environment variables
Create a `.env` file in the project root with:
```bash
# API base URL
VITE_API_BASE_URL=https://voomgo.zadulmead.org/api/v1
```

Notes:
- You can point `VITE_API_BASE_URL` to your local backend (e.g. `http://localhost:5000/api/v1`).
- No other env is required to start. Tokens are stored in localStorage by the app.

## 3) Start the dev server
```bash
npm run dev
```

## 4) Build for production
```bash
npm run build
npm run preview
```

## Tech used
- React, TypeScript, Vite
- Zustand (auth store), TanStack Query (data fetching/cache)
- Axios (API)
- Lucide icons, Tailwind styles

