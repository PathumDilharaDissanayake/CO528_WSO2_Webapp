# Repository Guidelines

## Project Structure & Module Organization
- `backend/` holds the Node.js/Express API. Core areas: `controllers/`, `routes/`, `models/`, `middleware/`, `validators/`, `config/`.
- `backend/tests/` contains Jest tests (e.g., `auth.test.js`).
- `frontend/` holds the React SPA (Vite). App code lives in `frontend/src/`, static assets in `frontend/public/`.
- `docs/` includes supporting documentation.
- `scripts/` contains local tooling such as `smoke-test.ps1`.

## Build, Test, and Development Commands
Run commands from the relevant subfolder.
- Backend dev server: `npm start` (uses nodemon, runs `backend/server.js`).
- Backend tests: `npm test` (Jest, Node environment).
- Frontend dev server: `npm run dev` (Vite).
- Frontend production build: `npm run build`.
- Frontend lint: `npm run lint` (ESLint).
- Frontend preview: `npm run preview`.
- Optional API smoke test (PowerShell): `./scripts/smoke-test.ps1`.

## Coding Style & Naming Conventions
- Language: JavaScript/JSX.
- Indentation: 2 spaces (follow existing files).
- Prefer clear, descriptive names: `camelCase` for variables/functions, `PascalCase` for React components, `kebab-case` for folders when needed.
- Frontend linting is enforced via ESLint (`frontend/.eslintrc.cjs`). Run `npm run lint` before PRs.

## Testing Guidelines
- Framework: Jest + Supertest (backend).
- Tests live in `backend/tests/` and match `**/*.test.js`.
- Add tests alongside new routes or auth logic; cover success and failure paths.
- Run all backend tests with `npm test` inside `backend/`.

## Commit & Pull Request Guidelines
- Recent history mixes short messages and Conventional Commits (e.g., `feat: ...`).
- Prefer Conventional Commits with a short imperative summary: `feat: add appointment approval`.
- PRs should include: a concise description, linked issue/task (if applicable), and UI screenshots for frontend changes.
- Note any DB or env changes (`backend/.env` uses Postgres via Sequelize).

## Configuration Tips
- Backend uses Postgres; environment variables live in `backend/.env` (e.g., `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`, `JWT_SECRET`).
- Keep secrets out of commits; document new env keys in README or this file.
