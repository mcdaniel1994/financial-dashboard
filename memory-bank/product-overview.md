# Product Overview

## What This Dashboard Shows

This project is a financial dashboard that shows business financial movement data in a visual and organized way.

The dashboard appears to focus on things like:

- Income and outcome movement
- KPI totals
- Monthly financial trends
- Category-level financial data
- B2B and B2C metrics
- Summary data
- Comparisons
- Alerts or anomaly candidates

The main purpose is to help someone quickly understand financial activity instead of reading raw financial records.

## Who Would Use It

This dashboard would likely be useful for a business owner, finance team, operations manager, or analyst who needs a quick view of financial performance.

The user is probably someone who wants to answer questions like:

- How is the business performing overall?
- What categories are driving activity?
- How do different business segments compare?
- Are there any unusual financial patterns?
- What do the monthly trends look like?

## Main Workflow

The main workflow is simple:

1. The backend provides financial movement data through FastAPI endpoints.
2. The frontend requests that data from the backend.
3. The frontend calculates or formats parts of the financial data.
4. The dashboard displays the results in a way that is easier to understand.
5. The user reviews KPIs, summaries, categories, comparisons, and alerts.

Right now, the project is using generated mock financial data rather than a live database.