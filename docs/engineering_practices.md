## Engineering Practices Notes

## Good Practice 1

**Category:** Testing

**What I found:**  
The backend tests are testing real API endpoints instead of only checking isolated files or functions.

**Where:**  
`backend/tests/test_routes.py`

**Evidence:**  
The tests call several backend endpoints, including:

- `/health`
- `/api/metrics`
- `/api/metrics/b2b`
- `/api/metrics/b2c`
- `/api/metrics/facets`
- `/api/metrics/summary`
- `/api/metrics/categories/top`
- `/api/metrics/comparison`
- `/api/metrics/alerts`

**Why it matters:**  
This is helpful because it gives confidence that the backend routes actually respond and return the expected basic structure. It is not just testing code in isolation. It is checking the API behavior that the frontend depends on.

---

## Good Practice 2

**Category:** Testing

**What I found:**  
The backend uses deterministic mock data in the tests.

**Where:**  
The backend uses:

`generate_mock_movements(seed=42)`

**Why it matters:**  
This is good because the mock data should be predictable each time the tests run. That makes the tests more reliable and easier to debug.

---

## Good Practice 3

**Category:** Architecture

**What I found:**  
The frontend calculation logic is separated into utility functions instead of being written directly inside the UI component.

**Where:**  
`frontend/src/lib/financial-utils.ts`

This logic is then used by:

`frontend/src/App.tsx`

**Why it matters:**  
This is a good practice because calculations like KPI totals, monthly aggregation, currency formatting, and percentage formatting can be tested separately from the UI. It keeps the main app component cleaner and makes the financial logic easier to reuse and maintain.

---

## Good Practice 4

**Category:** Type Safety / API Design

**What I found:**  
The backend uses Pydantic models and typed values to define financial movement data and API response shapes.

**Where:**  
`backend/app/routes.py`

**Why it matters:**  
This makes the backend API easier to understand because the expected data structure is written clearly in the code. It also helps validate the data being returned from the API, which is important for a financial dashboard where the frontend depends on consistent response shapes.

---

## Good Practice 5

**Category:** Developer Experience

**What I found:**  
The project includes a Docker Compose setup for running the frontend and backend services together.

**Where:**  
`docker-compose.yml`

**Why it matters:**  
This is useful because contributors can start both services from one setup instead of having to manually start the frontend and backend separately. That makes the project easier to run, especially for someone opening the repo for the first time.

---

## Risky Practice 1

**Category:** Testing

**What I found:**  
Some backend tests check the response shape, but they do not deeply verify whether the financial calculations are actually correct.

**Where:**  
For example, `test_metrics_summary_by_month_returns_balances` checks that certain keys exist and values are non-negative, but it does not appear to verify exact totals.

**Why it matters:**  
For a financial dashboard, the numbers matter a lot. A test could pass because the response has the right shape, even if the actual financial totals are wrong.

**Possible improvement:**  
Add tests that verify exact expected totals from known mock data.

---

## Risky Practice 2

**Category:** Testing

**What I found:**  
The comparison and alerts tests seem to focus mostly on structure.

**Where:**  
Examples:

- `test_metrics_comparison_returns_delta_fields`
- `test_metrics_alerts_returns_anomaly_candidates`

**Why it matters:**  
This confirms that the response includes the expected fields, but it does not fully prove that the comparison or alert logic is correct. Since these features are tied to financial insight, they probably need stronger correctness tests.

**Possible improvement:**  
Add tests that check specific comparison values and specific alert conditions based on controlled mock data.

---

## Risky Practice 3

**Category:** Security / Configuration

**What I found:**  
The backend CORS setup allows all origins.

**Where:**  
`backend/app/main.py`

**Evidence:**  

`allow_origins=["*"]`

**Why it matters:**  
This is acceptable for local development, but it would be risky if copied into a production setup. It means the backend is open to requests from any origin.

**Possible improvement:**  
Use a specific list of allowed frontend origins for production instead of allowing everything.

---

## Risky Practice 4

**Category:** Dependency Management

**What I found:**  
The backend dependencies are not pinned to specific versions.

**Where:**  
`backend/requirements.txt`

**Evidence:**  
The file lists packages like:

- `fastapi`
- `uvicorn[standard]`

without exact version numbers.

**Why it matters:**  
This could cause problems later because a future install may pull in newer versions of the packages. If one of those versions introduces a breaking change, the backend could behave differently or fail unexpectedly.

**Possible improvement:**  
Pin backend dependencies to known working versions, or use a lockfile-based workflow.

---

## Risky Practice 5

**Category:** Documentation / Developer Experience

**What I found:**  
The README explains the Docker setup, but the manual setup required extra discovery.

**Where:**  
`README.md`

**Compared with:**  
The actual manual steps needed to run the frontend and backend separately.

**Why it matters:**  
This could slow down contributors who are not using Docker. For example, someone may not immediately know that frontend commands need to be run inside the `frontend` folder, or how to run backend and frontend tests manually.

**Possible improvement:**  
Add a manual setup section to the README that explains how to run the frontend, backend, API docs, and tests without Docker.