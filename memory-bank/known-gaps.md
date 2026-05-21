# Known Gaps

## Testing Gaps

The backend has useful route tests, but some of the tests focus more on response shape than exact financial correctness.

For example, some tests check that fields exist or values are non-negative, but they do not always verify exact expected financial totals.

This matters because a financial dashboard can return the right-looking response while still showing wrong numbers.

Future developers should be careful when changing financial logic. Tests should verify actual calculated values when the mock data is known.

## Comparison and Alert Logic

The comparison and alert endpoints have tests, but they appear to mostly confirm that the expected fields are present.

That is helpful, but it does not fully prove that the comparison or alert logic is correct.

Future work should add stronger tests for specific comparison values and specific alert conditions.

## CORS Configuration

The backend currently allows all origins for CORS:

```python
allow_origins=["*"]
```

This is fine for local development, but it would be risky if copied into a production environment.

A production version should use a specific list of allowed frontend origins.

## Dependency Management

The backend dependencies are listed without pinned versions.

For example, `backend/requirements.txt` includes packages like:

```text
fastapi
uvicorn[standard]
```

without exact version numbers.

This could cause future installs to use different versions and create unexpected behavior.

## Documentation Gaps

The README documents the Docker setup, but manual setup required extra discovery.

For example, frontend commands need to be run from inside the `frontend` folder, not the repository root.

Future contributors who are not using Docker may need clearer instructions for:

- Starting the frontend manually
- Starting the backend manually
- Running backend tests
- Running frontend tests
- Accessing the API docs

## Frontend Bundle Size Warning

The frontend production build passes, but Vite reports that one generated JavaScript chunk is larger than 500 kB after minification.

This is not currently a build failure. It is most likely related to dashboard visualization and icon dependencies such as Recharts and Lucide.

Future work could investigate whether route-level code splitting, chart lazy loading, or safer package import optimization would reduce the bundle size without making the small dashboard harder to maintain.

## Browser Testing Tooling

The selected additional skill, `webapp-testing`, expects Python Playwright to be available for local browser automation.

Python Playwright was not installed in the available Python environments during the latest validation pass, so the browser smoke test used headless Chrome directly instead.

Future contributors can either install Playwright in an intentional local/testing environment or keep using another documented browser smoke-test path.
