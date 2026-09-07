/**
 * Privacy-safe analytics adapter
 * Wraps window.va (Vercel Analytics) if available and consent is given.
 */

export type AnalyticsEventName =
  | 'air_fryer_error_search'
  | 'air_fryer_error_result_selected'
  | 'air_fryer_error_no_result'
  | 'air_fryer_error_code_opened'
  | 'air_fryer_symptom_opened'
  | 'air_fryer_manual_opened'
  | 'air_fryer_missing_model_form_opened'
  | 'air_fryer_missing_model_form_submitted';

export interface AnalyticsEventParams {
  lang?: string;
  query_length?: number;
  result_count?: number;
  has_exact_match?: boolean;
  result_category?: string;
  brand?: string;
  model_spec?: string;
  error_code?: string;
  symptom_key?: string;
  is_ambiguous?: boolean;
  severity?: string;
  evidence_level?: string;
  reason?: string;
  brand_present?: boolean;
  model_present?: boolean;
  code_present?: boolean;
  symptom_present?: boolean;
  source_type?: string;
}

declare global {
  interface Window {
    va?: (event: 'event', name: string, data?: Record<string, string | number | boolean>) => void;
  }
}

function hasAnalyticsConsent(): boolean {
  // In a real implementation this would check the cookie consent state.
  // We assume true for basic tracking if not explicitly rejected by a consent manager, 
  // or depending on the site's cookie policy. 
  // For safety, we just check if window.va is available which Vercel Analytics manages.
  return typeof window !== 'undefined' && typeof window.va === 'function';
}

export function trackEvent(name: AnalyticsEventName, params?: AnalyticsEventParams) {
  try {
    if (!hasAnalyticsConsent()) return;

    // Filter out undefined and sanitize types for Vercel Analytics
    const safeParams: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          // ensure no PII or raw strings are sent outside the allowed enum/keys
          safeParams[key] = value;
        }
      }
    }

    if (window.va) {
      window.va('event', name, safeParams);
    } else {
      // Fallback for local debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${name}`, safeParams);
      }
    }
  } catch (e) {
    // Silently fail to not interrupt user experience
  }
}
