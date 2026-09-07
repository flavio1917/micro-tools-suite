import rawDb from './air-fryer-db.json';
import { overrides } from './air-fryer-overrides';
import { hasCompleteTranslations } from './i18n/error-content';
import fs from 'fs';
import path from 'path';

export function getEffectiveDataset() {
  const dataset = JSON.parse(JSON.stringify(rawDb));
  
  let auditData: any[] = [];
  try {
    const auditPath = path.join(process.cwd(), 'scripts', 'editorial-audit-philips.json');
    if (fs.existsSync(auditPath)) {
      auditData = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
    }
  } catch (e) {
    // Ignore in browser/edge
  }

  return dataset.map((model: any) => {
    const override = overrides[model.canonical_slug];
    
    // Apply overrides
    if (override) {
      if (override.route_slug) model.route_slug = override.route_slug;
      if (override.is_deduplication_validated !== undefined) model.is_deduplication_validated = override.is_deduplication_validated;
      
      if (override.errors && model.error_codes) {
        for (const ec of model.error_codes) {
          const ecOverride = override.errors[ec.code];
          if (ecOverride) {
            if (ecOverride.severity) ec.severity = ecOverride.severity;
            if (ecOverride.evidence_level) ec.evidence_level = ecOverride.evidence_level;
          }
        }
      }
    }

    // Default route_slug if not set
    if (!model.route_slug) {
      model.route_slug = model.canonical_slug.split('-').slice(1).join('-');
    }

    // Calculate SEO status dynamically based on quality gate
    let isIndexable = true;
    const conds = [
      model.model_spec,
      model.route_slug,
      model.brand_slug,
      model.primary_display_name,
      model.is_deduplication_validated,
      model.metadata?.parsing_status === 'parsed',
      !model.metadata?.duplicate_group,
      Object.keys(model.specs || {}).length >= 2,
      model.error_codes && model.error_codes.length >= 1,
    ];

    if (!conds.every(Boolean)) {
      isIndexable = false;
    }

    if (isIndexable) {
      // Check translations and editorial status
      for (const ec of model.error_codes) {
        const transKey = `${model.brand_slug}.${model.model_spec}.${ec.code}`;
        const transResult = hasCompleteTranslations(transKey, ec.severity, true);
        if (transResult !== true) {
          isIndexable = false;
          break;
        }

        // Check audit status if server environment
        if (typeof process !== 'undefined' && auditData.length > 0) {
          const auditPass = auditData.some(a => a.model_spec === model.model_spec && a.code === ec.code && a.audit_result === 'pass');
          if (!auditPass) {
             isIndexable = false;
             break;
          }
        }
      }
    }

    // Only allow manual overrides if it's NOINDEX, cannot override to INDEXABLE if fails quality gate
    if (override && override.seo_status_override === 'noindex') {
      isIndexable = false;
    }

    model.seo_status = isIndexable ? 'indexable' : 'noindex';

    return model;
  });
}

export const effectiveAirFryerDb = getEffectiveDataset();
export default effectiveAirFryerDb;
