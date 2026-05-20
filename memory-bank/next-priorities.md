# Next Priorities

## 1. Strengthen Financial Calculation Tests

The first priority should be adding stronger exact-value tests for financial calculations.

The project already has useful tests, but future tests should check actual expected totals when the input data is known.

This matters because financial dashboards need correct numbers, not only correct response shapes.

## 2. Improve Backend Route Tests

The backend route tests should be expanded to verify important calculated values, not just status codes and response fields.

Good future tests should check:

- Exact summary totals
- Expected comparison values
- Specific alert conditions
- Filtered results
- Edge cases

## 3. Add Manual Setup Documentation

The README should include a clear manual setup section for contributors who are not using Docker.

This should explain how to:

- Start the frontend
- Start the backend
- Open the FastAPI docs
- Run backend tests
- Run frontend tests

This would make the project easier for a new contributor to run without guessing.

## 4. Tighten Configuration for Production

The current CORS wildcard is acceptable for local development, but it should be changed before any production-style deployment.

A future production setup should define specific allowed origins instead of using:

```python
allow_origins=["*"]
```

## 5. Manage Backend Dependency Versions

Backend dependencies should eventually be pinned or managed through a more intentional dependency workflow.

This would help prevent future installs from pulling unexpected package versions.

## 6. Keep Agent Rules Updated

The `.agents/rules` files should stay tied to the actual repo.

If the project structure, testing setup, API design, or configuration changes later, the rules should be updated so future AI assistants and developers are not working from stale guidance.