# Tech Stack

## Frontend Stack

The frontend is built with:

- React
- TypeScript
- Vite

This was confirmed from `frontend/package.json`.

The frontend also includes utility code for financial calculations, such as KPI calculations, monthly data aggregation, currency formatting, and percentage formatting.

## Backend Stack

The backend is built with:

- Python
- FastAPI

The main backend setup is in:

```text
backend/app/main.py
```

The backend API routes are in:

```text
backend/app/routes.py
```

The backend also uses Pydantic models to define financial movement data and API response shapes.

## Testing Tools

The backend uses:

- `pytest`
- FastAPI `TestClient`

The backend route tests are in:

```text
backend/tests/test_routes.py
```

The frontend uses:

- Vitest

The frontend test scripts are defined in:

```text
frontend/package.json
```

The frontend also has utility tests, including:

```text
frontend/src/lib/financial-utils.test.ts
```

## Running the Services

Docker Compose is the documented full-stack startup path.

The project can be started with:

```bash
docker compose up --build
```

When running services manually, the frontend and backend need to be handled from their own folders.

Frontend commands should be run from:

```text
frontend
```

Backend commands should be run from:

```text
backend
```

The validated local service URLs were:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- FastAPI docs: `http://localhost:8000/docs`