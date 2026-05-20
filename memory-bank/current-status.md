# Current Status

## What Currently Runs

The project currently runs as a split frontend and backend application.

The frontend runs as a React, TypeScript, and Vite app.

The backend runs as a Python and FastAPI app.

Both services were able to start locally.

## Validated URLs

The following local URLs were validated:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- FastAPI docs: `http://localhost:8000/docs`

The FastAPI docs page loaded successfully, which confirms that the backend API was running and exposing its documentation.

## Current Data Source

The project is currently using generated mock financial movement data.

The backend uses:

```python
generate_mock_movements(seed=42)
```

The fixed seed helps keep the mock data predictable instead of random every time.

At this stage, I did not find evidence that the app is connected to a live database.

## Documentation and Rules Now Added

The project now includes documentation and rule files created during the assignment.

Documentation includes:

```text
docs/handover_validation.md
docs/engineering_practices.md
```

Agent rule files include:

```text
.agents/rules/project-structure.md
.agents/rules/frontend.md
.agents/rules/backend-api.md
.agents/rules/testing.md
.agents/rules/configuration.md
```

The memory bank now exists to preserve project context for future work.