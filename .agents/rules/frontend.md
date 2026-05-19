# Frontend Rules

These rules apply to the frontend application in the `frontend` folder.

## Frontend Stack

The frontend is built with:

- React
- TypeScript
- Vite

This was confirmed from `frontend/package.json`.

## Running Frontend Commands

Run frontend commands from inside the `frontend` folder.

For example:

```bash
cd frontend
npm run dev
```

Do not run frontend commands from the repository root unless a root-level package setup is added later.

## API Calls

Frontend API calls should use the project’s API path or configured API base URL.

Use one of the following patterns:

- `/api/...`
- `VITE_API_BASE_URL`

Avoid hardcoding backend URLs throughout the app. If the backend URL needs to change, it should be controlled from one clear place.

## Financial Logic

Keep financial calculations in reusable utility files when possible.

For this project, financial utility logic belongs in:

```text
frontend/src/lib
```

This keeps calculation logic separate from UI components and makes it easier to test.

## UI Components

Avoid placing too much business logic directly inside React components.

When possible:

- Keep UI components focused on rendering and user interaction.
- Move reusable calculations into utility functions.
- Keep API-related logic organized and easy to trace.