import fs from 'fs';
import path from 'path';
import { hasCompleteTranslations } from '../src/data/i18n/error-content';

import { effectiveAirFryerDb } from '../src/data/air-fryer-dataset';

const VALID_SEVERITIES = ['safe_check', 'caution', 'stop_and_support'];
const VALID_EVIDENCE_LEVELS = ['model_specific', 'brand_generic', 'universal_guidance'];
const VALID_SEO_STATUSES = ['indexable', 'noindex', 'fallback_only'];

function loadDB() {
  return effectiveAirFryerDb;
}

function runValidation() {
  const models = loadDB();
  let hasBlockingErrors = false;
  let errors: string[] = [];
  let warnings: string[] = [];

  const seenSlugs = new Set<string>();

  for (const model of models) {
    const slug = model.canonical_slug;
    
    // Duplicate check
    if (seenSlugs.has(slug)) {
      if (model.seo_status === 'indexable') {
        errors.push(`[Error] Duplicate canonical_slug found on indexable model: ${slug}`);
        hasBlockingErrors = true;
      }
    }
    seenSlugs.add(slug);

    // Validate enum fields
    if (!VALID_SEO_STATUSES.includes(model.seo_status)) {
      errors.push(`[Error] Invalid seo_status '${model.seo_status}' for slug ${slug}`);
      hasBlockingErrors = true;
    }

    // Check error codes
    let hasValidSeverity = true;
    let hasValidEvidence = true;
    let hasValidSource = false;
    let hasTranslations = true;
    
    if (model.error_codes) {
      for (const ec of model.error_codes) {
        if (!VALID_SEVERITIES.includes(ec.severity)) {
          errors.push(`[Error] Invalid severity '${ec.severity}' in error code ${ec.code} for slug ${slug}`);
          hasBlockingErrors = true;
          hasValidSeverity = false;
        }
        if (!VALID_EVIDENCE_LEVELS.includes(ec.evidence_level)) {
          errors.push(`[Error] Invalid evidence_level '${ec.evidence_level}' in error code ${ec.code} for slug ${slug}`);
          hasBlockingErrors = true;
          hasValidEvidence = false;
        }
        if (ec.source && (ec.source.manual_url || ec.source.specs_url)) {
          hasValidSource = true;
        }
        
        // Translation check
        const transKey = `${model.brand_slug}.${model.model_spec}.${ec.code}`;
        const transResult = hasCompleteTranslations(transKey, ec.severity, model.seo_status === 'indexable');
        if (transResult !== true) {
          hasTranslations = false;
          if (model.seo_status === 'indexable') {
             errors.push(`[Error] Model ${slug} language ${transResult.lang} transKey ${transKey} failed: field ${transResult.field} - ${transResult.reason}`);
             hasBlockingErrors = true;
          }
        }
      }
    }
    
    if (model.source && (model.source.manual_url || model.source.specs_url)) {
      hasValidSource = true; // Overall source exists
    }

    // Validate indexable strictly
    if (model.seo_status === 'indexable') {
      const indexableConds = [
        !!model.model_spec,
        !!model.canonical_slug,
        !!model.primary_display_name,
        Object.keys(model.specs || {}).length >= 2,
        (model.error_codes || []).length >= 1,
        hasValidSeverity,
        hasValidEvidence,
        hasValidSource,
        model.is_deduplication_validated === true,
        hasTranslations
      ];
      
      if (!indexableConds.every(Boolean)) {
        const failedIdx = indexableConds.findIndex(c => !c);
        errors.push(`[Error] Model ${slug} is marked as 'indexable' but fails condition ${failedIdx} (dedup, translation, source, etc.).`);
        hasBlockingErrors = true;
      }
    }

    // Warn if potential ambiguous market variants exist but aren't resolved
    // This is not a blocking error, just a warning, but if they try to make it indexable it will be blocked.
    if (!model.is_deduplication_validated) {
      warnings.push(`[Warning] Model ${slug} deduplication is not yet validated by a human. (Status: ${model.metadata?.parsing_status})`);
    }
    
    if (model.metadata?.parsing_status === 'manual_review') {
       warnings.push(`[Warning] Model ${slug} requires manual review.`);
    }
  }

  console.log("=== VALIDATION REPORT ===");
  if (errors.length > 0) {
    console.log("ERRORS:");
    errors.forEach(e => console.log(e));
  }
  if (warnings.length > 0) {
    console.log("WARNINGS:");
    warnings.forEach(w => console.log(w));
  }
  
  if (!hasBlockingErrors && errors.length === 0) {
    console.log("Validation passed with 0 blocking errors.");
  } else {
    console.error("Validation failed with blocking errors.");
    process.exit(1);
  }
}

try {
  runValidation();
} catch (e) {
  console.error("Failed to run validation:", e);
  process.exit(1);
}
