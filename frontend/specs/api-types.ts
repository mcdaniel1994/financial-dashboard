/**
 * Response returned by GET /api/metrics/facets.
 */
export interface FacetsResponse {
  /**
   * Operation types present in the backend data.
   * Valid values are "income" and "outcome".
   */
  operation_types: string[];

  /**
   * Business line values present in the backend data.
   * Valid values are "B2B" and "B2C".
   */
  business_types: string[];

  /**
   * Financial movement categories present in the backend data.
   * Valid values are "suppliers", "sales", "operational", "administrative", and "others".
   */
  categories: string[];

  /**
   * Earliest available movement date in the backend data.
   * Format is YYYY-MM-DD.
   */
  min_date: string;

  /**
   * Latest available movement date in the backend data.
   * Format is YYYY-MM-DD.
   */
  max_date: string;
}

/**
 * Single anomaly alert returned by GET /api/metrics/alerts.
 */
export interface AlertEntry {
  /**
   * Time period represented by this alert.
   * Format depends on the group_by query parameter: day, week, or month.
   */
  period: string;

  /**
   * Total outcome amount recorded for the alert period.
   */
  outcome_total: number;

  /**
   * Rolling average outcome amount from the previous baseline periods.
   */
  baseline_average: number;

  /**
   * Ratio increase over the baseline average.
   * Example: 0.3 represents a 30% increase.
   */
  increase_ratio: number;
}

/**
 * Response returned by GET /api/metrics/alerts.
 * The backend returns the array directly.
 */
export type AlertsResponse = AlertEntry[];

/**
 * Single top category item returned by GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
  /**
   * Financial movement category name.
   * Valid values are "suppliers", "sales", "operational", "administrative", and "others".
   */
  category: string;

  /**
   * Operation type used for the category total.
   * Valid values are "income" and "outcome".
   */
  operation_type: string;

  /**
   * Total amount for this category after the endpoint filters are applied.
   */
  total_amount: number;
}

/**
 * Response returned by GET /api/metrics/categories/top.
 * The backend returns the array directly.
 */
export type TopCategoriesResponse = CategoryEntry[];
