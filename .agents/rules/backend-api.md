# Backend API Rules

These rules apply to the backend application in the `backend` folder.

## Backend Stack

The backend is built with:

- Python
- FastAPI

The main FastAPI setup is located in:

```text
backend/app/main.py
```

## API Routes

Backend API routes should live in:

```text
backend/app/routes.py
```

When adding or changing routes, keep the routing structure clear and easy to follow.

## Response Models

Use Pydantic models to define request and response shapes where possible.

This helps keep the API:

- Clear
- Typed
- Easier to validate
- Easier for the frontend to consume

For a financial dashboard, predictable response shapes are important because the frontend depends on consistent data.

## Mock Data

Be careful when working with generated mock data.

This project uses generated financial movement data, including:

```python
generate_mock_movements(seed=42)
```

The fixed seed helps make the data predictable. Do not replace deterministic mock data with random data unless the tests and documentation are updated to explain the change.

## Financial Calculations

When changing backend financial logic, do not only check that the API response has the right shape.

Also check whether the numbers are correct.

Financial dashboards need accurate calculations, not just successful responses.