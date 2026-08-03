# Boulder Log — Backend/Frontend Pipeline

This documents the data pipeline connecting the mobile app to the backend: **MongoDB Atlas → Express server → Expo (React Native) app**. Confirmed working end-to-end as of this test.

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  MongoDB Atlas   │ ◄──► │  Express server   │ ◄──► │   Expo app        │
│  (cloud database)│      │  server-test/     │      │   mobile/          │
│                  │      │  port 3001        │      │   port 8081        │
└─────────────────┘      └──────────────────┘      └──────────────────┘
```

- **MongoDB Atlas** — free-tier cloud database, stores app data
- **Express server** (`server-test/`) — REST API, connects to MongoDB via Mongoose, runs on port `3001`
- **Expo app** (`mobile/`) — React Native frontend, fetches data from the Express server over HTTP

Both the backend and frontend run as separate processes inside the same GitHub Codespace, each with its own forwarded port.

## Project structure

```
cs624-team-project/
├── server-test/       # Express + MongoDB backend
│   ├── index.js
│   ├── .env            # MONGODB_URI, PORT (not committed)
│   └── .gitignore
└── mobile/             # Expo React Native frontend
    ├── app/(tabs)/index.tsx
    ├── .env            # EXPO_PUBLIC_API_URL (not committed)
    └── .gitignore
```

## Environment variables

**`server-test/.env`**
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/boulderlog?retryWrites=true&w=majority
PORT=3001
```

**`mobile/.env`**
```
EXPO_PUBLIC_API_URL=https://<your-codespace-name>-3001.app.github.dev
```
This must point at the **backend's** forwarded port (3001), not the Expo dev server's own port (8081) — a common mix-up.

Neither `.env` file is committed to git — both are covered by their respective `.gitignore`.

## Running it locally (in Codespaces)

**1. Start the backend** (in one terminal):
```bash
cd server-test
node index.js
```
Expect to see:
```
✅ Connected to MongoDB
Server running on port 3001
```

**2. Forward and unlock the backend port:**
- Codespaces **Ports** tab → find port `3001` → set visibility to **Public**
- Visit `<forwarded-url>/api/ping` once in a browser to confirm it responds and to clear any GitHub confirmation prompt

**3. Start the frontend** (in a second terminal):
```bash
cd mobile
npx expo start --tunnel
```

**4. Test on a real device:**
Scan the QR code with **Expo Go** (recommended — more reliable than the web preview for this project). The app should show a live status message confirming it reached the backend.

## API reference (test route)

| Method | Endpoint | Response |
|---|---|---|
| GET | `/api/ping` | `{ "ok": true, "message": "Backend is alive" }` |

This route exists purely to confirm connectivity. Real feature routes (`/api/accessories`, `/api/problems`, etc.) build on this same server and pattern.

## Known gotchas

- **`.env` changes require a full restart** — Expo only reads `EXPO_PUBLIC_*` variables at startup, not on hot reload. Stop (`Ctrl+C`) and rerun `expo start` after any `.env` edit.
- **Codespaces ports reset on restart** — if the Codespace stops and restarts, forwarded URLs can change. Re-check `mobile/.env` matches the current port 3001 URL before assuming something broke.
- **Web browser testing is less reliable than the phone** — this project hit repeated caching/routing issues in the browser preview that didn't reproduce on a real device via Expo Go. Prefer testing on a phone.
- **Every screen file must have `export default`** — Expo Router shows an "Unmatched Route" error if a screen component isn't exported as the default export.
- **Double-check which port a `.env` URL points to** — `8081` is the Expo dev server itself; `3001` is the backend. Mixing these up causes 404s that look like connection failures.

## Status

✅ MongoDB Atlas connected
✅ Express server running and responding
✅ Backend port forwarded and reachable from outside the Codespace
✅ Expo app successfully fetching from the backend and rendering the response

Pipeline confirmed working — ready to build real feature endpoints (Accessories CRUD, Problems CRUD) on top of this foundation.
