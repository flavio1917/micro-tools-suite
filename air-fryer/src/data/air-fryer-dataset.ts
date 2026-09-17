import rawDb from './air-fryer-db.json';
import { overrides } from './air-fryer-overrides';

export function getEffectiveDataset() {
  const dataset = JSON.parse(JSON.stringify(rawDb));

  return dataset.map((model: any) => {
    const override = overrides[model.canonical_slug];
    
    // Apply overrides
    if (override) {
      if (override.route_slug) model.route_slug = override.route_slug;
      if (override.is_deduplication_validated !== undefined) {
        model.is_deduplication_validated = override.is_deduplication_validated;
      }
    }

    // Default route_slug if not set
    if (!model.route_slug) {
      model.route_slug = model.canonical_slug.split('-').slice(1).join('-');
    }

    // All models with error codes from the new import are considered indexable
    const hasErrorCodes = model.error_codes && model.error_codes.length >= 1;
    const hasSpecs = Object.keys(model.specs || {}).length >= 1;
    
    let isIndexable = !!(
      model.model_spec &&
      model.route_slug &&
      model.brand_slug &&
      hasErrorCodes &&
      hasSpecs
    );

    // Allow override to noindex
    if (override?.seo_status_override === 'noindex') {
      isIndexable = false;
    }

    model.seo_status = isIndexable ? 'indexable' : 'noindex';
    model.is_deduplication_validated = model.is_deduplication_validated ?? true;
    model.metadata = model.metadata || { parsing_status: 'parsed' };

    return model;
  });
}

export const effectiveAirFryerDb = getEffectiveDataset();
export default effectiveAirFryerDb;
