# Configuration Rules

These rules apply to project configuration, dependencies, and local development setup.

## Files That Should Not Be Committed

Do not commit generated or local-only files such as:

- `.venv`
- `node_modules`
- `.DS_Store`
- `__pycache__`

These files are local development artifacts and should not be part of the repository.

## CORS Configuration

The backend currently allows all origins for CORS:

```python
allow_origins=["*"]
```

This is acceptable for local development, but it should not be copied directly into a production setup.

For production, use a specific list of allowed frontend origins.

## Backend Dependencies

Backend dependencies should be intentionally managed.

The current `backend/requirements.txt` lists dependencies such as:

```text
fastapi
uvicorn[standard]
```

without pinned versions.

This can be risky because future installs may pull different package versions. If one of those versions introduces a breaking change, the backend could behave differently or fail unexpectedly.

If this project becomes more production-like, backend dependencies should be pinned to known working versions or managed through a lockfile-based workflow.

## Docker Compose

Docker Compose is the documented full-stack startup path for this project.

Use:

```bash
docker compose up --build
```

when starting both frontend and backend together through Docker.

## Manual Setup

If running services manually, use the correct folder for each service.

Frontend commands should be run from:

```text
frontend
```

Backend commands should be run from:

```text
backend
```

If manual setup instructions are expanded later, document the exact commands for starting the frontend, backend, API docs, and tests.