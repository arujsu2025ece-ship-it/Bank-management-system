# Bank Management System

Secure enterprise banking workspace - built incrementally. **Day 1:** repo setup, environment config,
dynamic system banner, and a responsive dashboard shell (Navbar, Sidebar, Task Cards).

## Run
```bash
git clone <your-repo-url> && cd bank-management-system
cp .env.example .env        # edit values
npm start                   # builds src/env.js from .env and serves on http://localhost:3000
```
No build tools needed: open `index.html` directly also works (uses `src/env.js`).

## Structure
```
.env.example            environment template (commit)   | .env  real values (git-ignored)
scripts/build-env.js    turns public .env values into src/env.js (secrets are never exported)
src/config.js           typed config from env
src/components/         SystemBanner, Navbar, Sidebar, TaskCard
src/data/tasks.js       sample banking tasks
src/styles/main.css     design tokens + responsive layout
```

## System banner
Priority order: offline > maintenance window > upcoming maintenance > custom `BANNER_MESSAGE` > non-production notice.
Set `BANNER_MAINTENANCE_START/END` (ISO dates) in `.env` to test.

## Roadmap
Auth & roles, accounts/transactions API, attachments, real-time updates, AI document assistant.
