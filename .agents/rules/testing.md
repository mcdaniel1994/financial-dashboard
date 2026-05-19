# Testing Rules

These rules apply to backend and frontend tests in this repository.

## Backend Testing

Backend tests use `pytest` and FastAPI `TestClient`.

Backend route tests are located in:

```text
backend/tests/test_routes.py
```

These tests should verify that API endpoints respond correctly and return the expected data.

## Frontend Testing

Frontend tests use Vitest.

Frontend test scripts are defined in:

```text
frontend/package.json
```

Frontend utility tests are located in places like:

```text
frontend/src/lib/financial-utils.test.ts
```

## Financial Calculation Tests

Financial calculations should have exact-value tests when possible.

For example, tests should not only check that a value exists or is non-negative. When the input data is known, tests should verify the expected output.

This matters because financial dashboards can look correct while still showing wrong numbers.

## Route Tests

Route tests should verify more than response shape when possible.

Good route tests should check:

- Status codes
- Required fields
- Filtering behavior
- Important calculated values
- Expected response structure

Checking only that fields exist is useful, but it may not catch calculation errors.

## Test Data

Use predictable test data.

If mock data is generated, prefer deterministic data with a fixed seed so test results are repeatable.