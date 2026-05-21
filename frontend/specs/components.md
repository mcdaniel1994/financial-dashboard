# Frontend Component Specifications

These specifications describe the proposed frontend component structure for the requested dashboard features. This file is a planning document only; it does not implement React components or add API calls to the application.

## Shared Data Contracts

The components in this document should use the response interfaces from `api-types.ts` and the query parameter interfaces from `param-types.ts`.

Date filters use the backend query parameter names `start_date` and `end_date`. Both values are optional strings in `YYYY-MM-DD` format. When both fields are empty, the frontend should omit both parameters and show all available data.

## Feature 1: Date Range Filter on Home Dashboard

### `DateRangeFilterControls`

Purpose:
Renders the start date and end date inputs near the top of the home dashboard and exposes changes to the parent dashboard view.

Props:

- `value: DateRangeFilter` - Current selected date range.
- `availableMinDate: string` - Earliest available backend date from `FacetsResponse.min_date`, formatted as `YYYY-MM-DD`.
- `availableMaxDate: string` - Latest available backend date from `FacetsResponse.max_date`, formatted as `YYYY-MM-DD`.
- `isLoading: boolean` - Whether the available date range is still loading.
- `errorMessage?: string` - Optional message to show if the facets request fails.
- `onChange: (nextValue: DateRangeFilter) => void` - Called when either date input changes.
- `onClear: () => void` - Called when the user clears the date filter.

Conditional rendering:

- Render both start and end inputs at all times.
- Disable inputs while `isLoading` is true.
- Show the available range once `availableMinDate` and `availableMaxDate` are available.
- Show a clear/reset control only when at least one date field has a value.

Loading state:

- Keep the inputs visible but disabled.
- Show a compact loading message or placeholder where the available date range hint will appear.

Error state:

- Keep the date inputs usable.
- Show `errorMessage` near the date range hint area.
- Do not block the dashboard from rendering existing unfiltered data solely because facets failed.

Empty state:

- If `value.start_date` and `value.end_date` are both empty, the dashboard should treat the filter as inactive and request all available data.

API data connection:

- Uses `GET /api/metrics/facets` to read `min_date` and `max_date`.
- Does not send parameters to the facets endpoint because the endpoint has no query parameters.
- Parent dashboard data requests should include `start_date` and/or `end_date` only when those fields are filled in.

### `AvailableDateRangeHint`

Purpose:
Displays the valid backend date range so users know which dates are meaningful.

Props:

- `minDate: string` - Earliest available date from the facets response, formatted as `YYYY-MM-DD`.
- `maxDate: string` - Latest available date from the facets response, formatted as `YYYY-MM-DD`.
- `isLoading: boolean` - Whether facets are loading.
- `errorMessage?: string` - Optional facets loading error.

Conditional rendering:

- Show the date range when both dates are present.
- Show a loading placeholder when `isLoading` is true.
- Show an error message when `errorMessage` is provided.

Loading state:

- Render a small loading placeholder instead of hiding the area.

Error state:

- Show a short message explaining that the available date range could not be loaded.

Empty state:

- If either `minDate` or `maxDate` is missing, show a fallback message that the available date range is unavailable.

API data connection:

- Receives values derived from `FacetsResponse`.

## Feature 2: Anomaly Alerts Table on Home Dashboard

### `AnomalyAlertsSection`

Purpose:
Owns the anomaly alert controls and table below the existing home dashboard charts.

Props:

- `dateRange: DateRangeFilter` - Active dashboard date filter shared with the home dashboard.
- `alerts: AlertsResponse` - Alert rows returned by `GET /api/metrics/alerts`.
- `params: AlertsParams` - Active alert request parameters.
- `isLoading: boolean` - Whether alerts are loading.
- `errorMessage?: string` - Optional alerts request error.
- `onParamsChange: (nextParams: AlertsParams) => void` - Called when alert-specific filters change.

Conditional rendering:

- Always render the section header and threshold input.
- Render the table when `alerts.length > 0`.
- Render the empty state when loading is false, there is no error, and `alerts.length === 0`.
- Render the error state when `errorMessage` is present.

Loading state:

- Show a table-shaped loading state or loading message below the controls.
- Keep the threshold input visible during loading.

Error state:

- Show a clear message that anomaly alerts could not be loaded.
- Keep the last selected threshold and date range visible so the user can understand which request failed.

Empty state:

- Show a clear empty state message when the response is an empty array.
- The table area must not disappear.
- Suggested meaning: no spending spikes matched the current threshold and date filters.

API data connection:

- Uses `GET /api/metrics/alerts`.
- Sends `threshold` as a query parameter.
- Sends `start_date` and `end_date` when the shared date range filter is active.
- May send `group_by` with valid values `day`, `week`, or `month`; backend default is `month`.

### `AnomalyThresholdInput`

Purpose:
Allows the user to configure the spike threshold used by the anomaly alerts endpoint.

Props:

- `value: number` - Current threshold ratio.
- `min: number` - Minimum allowed frontend threshold, expected to be `0.01`.
- `max: number` - Maximum allowed frontend threshold, expected to be `1.0`.
- `step: number` - Input step value for threshold changes.
- `onChange: (nextThreshold: number) => void` - Called when the threshold changes.
- `disabled?: boolean` - Whether the input is disabled.

Conditional rendering:

- Render the input whenever the anomaly alerts section is visible.
- Display the current ratio in a user-friendly way, such as a percentage label.

Loading state:

- Keep the control visible.
- Disable the input if changing the threshold during loading would create conflicting requests.

Error state:

- Leave the control visible so the user can adjust and retry.

Empty state:

- No separate empty state. Empty results are handled by `AnomalyAlertsTable`.

API data connection:

- Updates `AlertsParams.threshold`.
- Default threshold should be `0.3`.
- Frontend should constrain user input to `0.01` through `1.0`, even though the current backend OpenAPI schema only declares a minimum of `0`.

### `AnomalyAlertsTable`

Purpose:
Displays anomaly alert rows returned by the backend.

Props:

- `alerts: AlertsResponse` - Array of alert rows.
- `isLoading: boolean` - Whether alerts are loading.
- `errorMessage?: string` - Optional alerts loading error.

Columns:

- `Period` - Uses `AlertEntry.period`.
- `Recorded outcome` - Uses `AlertEntry.outcome_total`.
- `Rolling average of previous 3 periods` - Uses `AlertEntry.baseline_average`.
- `Percentage increase` - Uses `AlertEntry.increase_ratio`, formatted as a percentage.

Conditional rendering:

- Show loading content when `isLoading` is true.
- Show the error message when `errorMessage` exists.
- Show the empty state when `alerts.length === 0`, loading is false, and there is no error.
- Show table rows when alerts are present.

Loading state:

- Show table headers with loading rows or a loading message.

Error state:

- Show an inline error message in the table area.

Empty state:

- Show a clear message such as `No anomaly alerts match the current filters.`
- Do not remove the table section entirely.

API data connection:

- Renders rows from `AlertsResponse`.

## Feature 3: B2B vs B2C Comparison View

### `B2BvsB2CComparisonPage`

Purpose:
Defines a new comparison page that compares income performance between B2B and B2C.

Props:

- `dateRange: DateRangeFilter` - Active comparison date range filter.
- `b2bCategories: TopCategoriesResponse` - Top income categories for B2B.
- `b2cCategories: TopCategoriesResponse` - Top income categories for B2C.
- `isLoading: boolean` - Whether comparison data is loading.
- `errorMessage?: string` - Optional request error.
- `onDateRangeChange: (nextValue: DateRangeFilter) => void` - Called when the comparison date range changes.

Conditional rendering:

- Render the date range controls at the top of the page.
- Render B2B and B2C sections side by side on wider screens.
- Stack the sections on narrow screens.
- Render the comparison chart below both sections.

Loading state:

- Show loading states in both category panels and the chart area.

Error state:

- Show the error message near the comparison content.
- Keep date controls visible so users can adjust filters and retry.

Empty state:

- If both groups are empty, show empty messages in each panel and show a chart empty state instead of a blank chart.

API data connection:

- Uses `GET /api/metrics/categories/top` twice:
- B2B request: `operation_type=income`, `limit=5`, `business_type=B2B`, plus active date range.
- B2C request: `operation_type=income`, `limit=5`, `business_type=B2C`, plus active date range.
- Uses `GET /api/metrics/facets` to confirm available categories, business types, and date range.

### `BusinessLineCategoryPanel`

Purpose:
Displays one business line section, either B2B or B2C.

Props:

- `businessType: "B2B" | "B2C"` - Business line represented by this panel.
- `categories: TopCategoriesResponse` - Top category rows for the business line.
- `groupTotal: number` - Sum of `total_amount` values used to calculate percentage of group total.
- `isLoading: boolean` - Whether this panel is loading.
- `errorMessage?: string` - Optional panel-specific error.

Conditional rendering:

- Show the panel title for the business line.
- Show the table when category rows exist.
- Show an empty state when no category rows are returned.

Loading state:

- Show a table-shaped loading state.

Error state:

- Show a panel-level error message.

Empty state:

- B2B panel: show a message that no B2B income categories matched the current filters.
- B2C panel: show a message that no B2C income categories matched the current filters.

API data connection:

- Receives rows from `TopCategoriesResponse` filtered by the matching `business_type`.

### `TopIncomeCategoriesTable`

Purpose:
Displays the top five income categories for one business line.

Props:

- `categories: TopCategoriesResponse` - Category rows returned by the backend.
- `groupTotal: number` - Total amount for this business line.

Columns:

- `Category name` - Uses `CategoryEntry.category`.
- `Total income` - Uses `CategoryEntry.total_amount`.
- `Percentage of group total` - Derived as `total_amount / groupTotal`.

Conditional rendering:

- Render table rows when `categories.length > 0`.
- Render an empty message when `categories.length === 0`.
- If `groupTotal` is `0`, show `0%` or a not-available label instead of dividing by zero.

Loading state:

- Loading is handled by `BusinessLineCategoryPanel`.

Error state:

- Error state is handled by `BusinessLineCategoryPanel`.

Empty state:

- Show a clear message that no top income categories are available for the selected business line and filters.

API data connection:

- Renders `CategoryEntry` rows from `GET /api/metrics/categories/top`.
- The backend returns `total_amount` but does not return percentage, so the frontend derives the percentage.

### `BusinessLineIncomeComparisonChart`

Purpose:
Compares total B2B income against total B2C income below the two category sections.

Props:

- `b2bTotal: number` - Total income amount for B2B based on the current data set.
- `b2cTotal: number` - Total income amount for B2C based on the current data set.
- `isLoading: boolean` - Whether chart data is loading.
- `errorMessage?: string` - Optional chart error.

Conditional rendering:

- Render the chart when at least one total is greater than `0`.
- Render an empty chart state when both totals are `0` and loading is false.
- Render an error state when `errorMessage` is present.

Loading state:

- Show a chart placeholder.

Error state:

- Show a message that the comparison chart could not be loaded.

Empty state:

- Show a message that there is no B2B or B2C income to compare for the current filters.

API data connection:

- Totals are derived from the B2B and B2C `TopCategoriesResponse` data used by the tables.
- If future implementation needs totals beyond top-five categories, the spec should be updated to identify a backend endpoint that returns full business-line totals.
