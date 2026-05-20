/**
 * Shared optional date range query parameters for metrics endpoints.
 */
export interface DateRangeFilter {
  /**
   * Optional inclusive start date for filtered metrics.
   * Format must be YYYY-MM-DD.
   */
  start_date?: string;

  /**
   * Optional inclusive end date for filtered metrics.
   * Format must be YYYY-MM-DD.
   */
  end_date?: string;
}

/**
 * Query parameters sent to GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Minimum spike ratio required for an alert to be returned.
   * Defaults to 0.3. The frontend requirement limits this to 0.01 through 1.0,
   * while the current backend OpenAPI schema only declares a minimum of 0.
   */
  threshold?: number;

  /**
   * Time grouping used to calculate alert periods.
   * Valid values are "day", "week", and "month". Defaults to "month".
   */
  group_by?: "day" | "week" | "month";

  /**
   * Optional business line filter.
   * Valid values are "B2B" and "B2C".
   */
  business_type?: "B2B" | "B2C";
}

/**
 * Query parameters sent to GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Operation type to rank categories by.
   * Valid values are "income" and "outcome". Defaults to "outcome" in the backend.
   */
  operation_type?: "income" | "outcome";

  /**
   * Maximum number of category rows to return.
   * Defaults to 5. Backend accepts values from 1 through 20.
   */
  limit?: number;

  /**
   * Optional business line filter.
   * Valid values are "B2B" and "B2C".
   */
  business_type?: "B2B" | "B2C";
}
