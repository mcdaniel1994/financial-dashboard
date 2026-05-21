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

## Agent Skills Work

The `feature/agent-skills` branch now includes project-scoped agent skills in:

```text
.agents/skills
```

Installed reusable skills:

```text
.agents/skills/accessibility
.agents/skills/vercel-react-best-practices
.agents/skills/webapp-testing
```

The additional selected skill was `webapp-testing` because the memory bank already identified validation and testing depth as important next work for this dashboard.

A custom project skill was also added:

```text
.agents/skills/financial-dashboard-review/SKILL.md
```

This custom skill focuses on the financial dashboard's API contract, financial calculation correctness, chart accessibility, and validation workflow.

After syncing this branch with the latest `main`, the frontend specs are also present in:

```text
frontend/specs
```

The custom skill now points future agents to those specs before they change API contracts, query parameters, filters, alert tables, comparison views, or dashboard components.

## Skill-Driven Improvements

Accessibility improvements were made in the frontend:

- Decorative dashboard and KPI icons are hidden from assistive technology.
- Loading state now has a screen-reader status announcement.
- API error state now uses alert semantics.
- Chart cards now expose screen-reader-only data tables for income/outcome and profit margin values.
- Chart headings have explicit heading semantics.
- The browser page title now identifies the dashboard instead of using the generic Vite title.

React and performance-oriented improvements were also made:

- Fetched financial movements are stored once in `App.tsx`.
- KPI and monthly chart data are derived with `useMemo` instead of being stored as redundant state.
- The frontend fetch now uses an `AbortController` cleanup path.
- KPI calculation now totals income and outcome in one pass instead of multiple array passes.

Post-sync spec cleanup:

- `frontend/specs/api-types.ts` now uses array type aliases for direct array responses so the new specs pass the existing ESLint configuration.

## Latest Validation Results

Frontend validation passed:

```text
npm run lint
npm test
npx tsc -b --noEmit
npm run build
```

The production build completed successfully. Vite reported a non-failing chunk-size warning for the main JavaScript bundle.

Backend validation passed through the existing backend virtual environment:

```text
backend/.venv/bin/python -m pytest
```

Result:

```text
15 passed
```

A local browser smoke test rendered the dashboard with backend data using the backend on `127.0.0.1:8000` and the frontend on a Vite fallback port. Python Playwright was not installed locally, so the visual smoke test used headless Chrome instead of the `webapp-testing` skill's Python Playwright path.
