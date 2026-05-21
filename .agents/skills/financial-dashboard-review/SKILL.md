---
name: financial-dashboard-review
description: Review this Financial Dashboard repo for API contract safety, financial calculation correctness, frontend accessibility, and validation readiness. Use when changing dashboard data flows, financial calculations, charts, mock data, FastAPI routes, or React dashboard components.
license: MIT
---

# Financial Dashboard Review

Use this project-specific skill before making changes that affect financial data, dashboard rendering, or the frontend/backend contract.

## What To Inspect First

- Read `AGENTS.md`, `.agents/rules`, and `memory-bank`.
- Confirm whether the change is frontend-only, backend-only, or full-stack.
- Check the relevant files before editing:
  - Frontend specs and contracts: `frontend/specs`
  - Backend routes and models: `backend/app/routes.py`
  - Backend tests: `backend/tests/test_routes.py`
  - Frontend dashboard: `frontend/src/App.tsx`
  - Financial utilities: `frontend/src/lib/financial-utils.ts`
  - Frontend tests: `frontend/src/lib/financial-utils.test.ts`

## API Contract Checklist

- Keep FastAPI response models clear and typed with Pydantic when possible.
- Keep frontend TypeScript types aligned with backend response shapes.
- Check `frontend/specs/api-types.ts` and `frontend/specs/param-types.ts` before changing API contracts or query parameters.
- If behavior changes away from the planned frontend specs, update the specs or document why they are no longer current.
- Avoid hardcoding backend origins in components; use `/api/...` or `VITE_API_BASE_URL`.
- Preserve deterministic mock data unless tests and docs are updated.
- If route filters change, test status codes, filtering behavior, and returned fields.

## Financial Correctness Checklist

- Verify exact values when deterministic input data is known.
- Do not rely only on response shape tests for totals, deltas, percentages, or alerts.
- Check edge cases such as zero income, zero previous period, empty data, and date boundaries.
- Keep reusable calculations in `frontend/src/lib` instead of burying them in UI components.

## Dashboard Accessibility Checklist

- Prefer semantic landmarks, headings, and native elements.
- Treat decorative icons as hidden from assistive technology.
- Announce loading and error states with status or alert semantics.
- Provide text or table alternatives for chart data.
- Keep future table and filter components consistent with `frontend/specs/components.md`.
- Avoid using color as the only way to communicate financial meaning.

## Validation Checklist

- For frontend changes, inspect `frontend/package.json` and run available scripts such as lint, tests, type check, and build.
- For backend route or calculation changes, run backend pytest checks.
- For visual dashboard changes, run a local browser smoke test and check for console errors.
- Update `memory-bank` with skills used, files changed, validation results, and follow-up work.
