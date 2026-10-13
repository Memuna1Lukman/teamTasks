# Frontend

React + Vite client for the FastAPI task manager in `../Backend`.

## Start

```bash
cd Frontend
npm install
npm run dev
```

The API defaults to `http://localhost:8000`. To change it, copy `.env.example` to `.env` and set `VITE_API_URL`.

## Structure

- `src/api` — HTTP client and backend endpoint modules
- `src/components` — reusable UI components
- `src/context` — application-wide auth state
- `src/hooks` — reusable React hooks
- `src/pages` — page-level UI
