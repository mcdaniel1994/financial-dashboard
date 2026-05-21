# Financial Dashboard Frontend Specs

This folder contains frontend specifications for the next dashboard features. These files define API contracts, query parameter shapes, component responsibilities, and expected UI behavior before any React implementation is added.

The specs are based on the FastAPI OpenAPI documentation at `http://localhost:8000/docs`.

## Files

- `api-types.ts` - TypeScript interfaces for backend API responses.
- `param-types.ts` - TypeScript interfaces for frontend query parameters.
- `components.md` - Proposed component breakdown and UI behavior.
- `README.md` - Feature-level data contract and behavior summary.

## Feature 1: Date Range Filter on Home Dashboard

### What the feature does

The home dashboard should let users filter dashboard data by optional start and end dates. If both date inputs are empty, the dashboard should show all available data.

The UI should also show the available backend date range near the inputs so users know which dates are valid.

### Endpoints consumed

- `GET /api/metrics/facets`

The facets endpoint does not accept query parameters. It returns available filter metadata, including `min_date` and `max_date`.

Future dashboard data requests should include `start_date` and `end_date` only when the user has entered date values.

### TypeScript types used

- `FacetsResponse`
- `DateRangeFilter`

### Valid parameter values

- `start_date?: string` - Optional date string in `YYYY-MM-DD` format.
- `end_date?: string` - Optional date string in `YYYY-MM-DD` format.

### Constraints

- Both date fields are optional.
- Empty date fields mean the date filter is inactive.
- Dates sent to the backend must use `YYYY-MM-DD`.
- The available date range should come from `FacetsResponse.min_date` and `FacetsResponse.max_date`.
- The frontend should not send parameters to `GET /api/metrics/facets` because the endpoint has no parameters.

### Edge cases

1. Both date fields are empty.
   - UI must show all available dashboard data.
   - UI should still show the available date range if facets loaded successfully.

2. Facets request fails.
   - UI must keep the date inputs visible.
   - UI should show a message that the available date range could not be loaded.
   - UI should not block the rest of the dashboard only because facets failed.

3. User selects a date outside the available range.
   - UI should show a validation message near the date inputs.
   - UI should not send an invalid date range until the user corrects it.

## Feature 2: Anomaly Alerts Table on Home Dashboard

### What the feature does

The home dashboard should show an anomaly alerts table below the existing charts. The table identifies periods where outcome spending increased compared with a rolling baseline.

Users should be able to adjust the spike threshold that controls which alerts are shown.

### Endpoints consumed

- `GET /api/metrics/alerts`

### TypeScript types used

- `AlertEntry`
- `AlertsResponse`
- `AlertsParams`
- `DateRangeFilter`

### Valid parameter values

- `threshold?: number` - Optional spike ratio. Backend default is `0.3`.
- `group_by?: "day" | "week" | "month"` - Optional period grouping. Backend default is `"month"`.
- `start_date?: string` - Optional date string in `YYYY-MM-DD` format.
- `end_date?: string` - Optional date string in `YYYY-MM-DD` format.
- `business_type?: "B2B" | "B2C"` - Optional business line filter.

### Constraints

- The assignment requires the threshold input to allow ratios from `0.01` through `1.0`.
- The current backend OpenAPI schema declares `threshold` with a minimum of `0` and no maximum.
- The frontend should enforce the assignment threshold range before sending requests.
- The default threshold should be `0.3`.
- The alerts table must respect the active date range filter by sending `start_date` and `end_date` when active.
- The table must not disappear when there are no alerts.

### Edge cases

1. Alerts response is an empty array.
   - UI must show a clear empty state message.
   - UI must keep the anomaly alerts section visible.

2. Threshold is outside the frontend range.
   - UI must show validation feedback.
   - UI should not send values below `0.01` or above `1.0`.

3. Alerts request fails.
   - UI must show an error message in the alerts section.
   - UI should keep the threshold control and current date filter visible.

4. Date range is active.
   - UI must send the active `start_date` and `end_date` with the alerts request.
   - UI should make it clear that the alerts shown are filtered by the selected dates.

## Feature 3: B2B vs B2C Comparison View

### What the feature does

The comparison view should show B2B and B2C revenue performance side by side. Each business line should display its top five income categories, and a chart below should compare total B2B income against total B2C income.

The comparison view should support the same optional date range format used by the home dashboard.

### Endpoints consumed

- `GET /api/metrics/categories/top`
- `GET /api/metrics/facets`

The top categories endpoint should be called separately for B2B and B2C.

B2B request:

- `operation_type=income`
- `limit=5`
- `business_type=B2B`
- optional `start_date`
- optional `end_date`

B2C request:

- `operation_type=income`
- `limit=5`
- `business_type=B2C`
- optional `start_date`
- optional `end_date`

### TypeScript types used

- `CategoryEntry`
- `TopCategoriesResponse`
- `TopCategoriesParams`
- `FacetsResponse`
- `DateRangeFilter`

### Valid parameter values

- `operation_type?: "income" | "outcome"` - For this feature, use `"income"`.
- `limit?: number` - Backend default is `5`; backend accepts `1` through `20`. For this feature, use `5`.
- `business_type?: "B2B" | "B2C"` - Required by the feature behavior to split the two business lines.
- `start_date?: string` - Optional date string in `YYYY-MM-DD` format.
- `end_date?: string` - Optional date string in `YYYY-MM-DD` format.

### Constraints

- The comparison must show B2B and B2C sections side by side on wide screens.
- Each section must show the top five income categories for that business line.
- Each table must include category name, total income, and percentage of group total.
- The backend returns `total_amount` but does not return percentage of group total.
- The frontend must derive percentage of group total from returned totals.
- The available categories and date range should be confirmed through `GET /api/metrics/facets`.

### Edge cases

1. B2B top categories response is empty.
   - B2B panel must show an empty state message.
   - B2C panel should still render if it has data.

2. B2C top categories response is empty.
   - B2C panel must show an empty state message.
   - B2B panel should still render if it has data.

3. Both B2B and B2C responses are empty.
   - Both panels must show empty state messages.
   - The comparison chart must show an empty state instead of a blank chart.

4. Group total is `0`.
   - UI must avoid dividing by zero when calculating percentage of group total.
   - UI should show `0%` or a not-available label for percentage.

5. Date range is active.
   - UI must send the active `start_date` and `end_date` in both B2B and B2C category requests.
   - UI should make it clear that the comparison reflects the selected period.
