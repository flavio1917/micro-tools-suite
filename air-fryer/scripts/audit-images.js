import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../src/data/air-fryer-db.json');
const fotoDir = path.resolve(__dirname, '../../Foto');
const reportPath = path.resolve(__dirname, 'image-mapping-report.json');

const EXCLUDED_MODELS = ['cosori-caf-dc601-kus', 'cosori-caf-r901-aus'];

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, ' ').trim();
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function auditImages() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const report = {
    matches: [],
    mismatches: [],
    missing_images: [],
    ambiguous_images: [],
    excluded_images: []
  };

  const brands = ['Philips', 'Cosori'];

  brands.forEach(brand => {
    const brandDir = path.join(fotoDir, brand);
    if (!fs.existsSync(brandDir)) return;

    const folders = fs.readdirSync(brandDir, { withFileTypes: true }).filter(d => d.isDirectory());
    
    folders.forEach(folderEnt => {
      const folderName = folderEnt.name;
      const folderPath = path.join(brandDir, folderName);
      
      const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
      
      // Trova i modelli corrispondenti
      const matchedModels = db.filter(m => m.brand_slug === brand.toLowerCase() && normalize(m.primary_display_name) === normalize(folderName));
      
      if (matchedModels.length === 0) {
        // Mismatch
        report.mismatches.push({
          folder: `Foto/${brand}/${folderName}`,
          file: files[0] || null,
          expected_model: null,
          model_spec: null,
          status: 'mismatch',
          reason: 'no matching primary_display_name in db'
        });
        return;
      }

      matchedModels.forEach(model => {
        const isAmbiguous = !model.is_deduplication_validated || model.metadata?.parsing_status === 'manual_review' || !!model.metadata?.duplicate_group;
        const variantSlug = isAmbiguous ? slugify(model.primary_display_name) : undefined;
        
        const item = {
          brand: brand.toLowerCase(),
          folder_name: folderName,
          file_name: files.length === 1 ? files[0] : null,
          extension: files.length === 1 ? path.extname(files[0]) : null,
          expected_canonical_slug: model.canonical_slug,
          expected_model_spec: model.model_spec,
          expected_primary_display_name: model.primary_display_name,
          folder_matches_dataset: true,
          file_matches_folder: false,
          is_ambiguous: isAmbiguous,
          variant_slug: variantSlug,
          status: '',
          note: ''
        };

        if (files.length === 0) {
           item.status = 'missing';
           item.note = 'No image found in folder';
           report.missing_images.push(item);
           return;
        }
        
        if (files.length > 1) {
           item.status = 'ambiguous';
           item.note = 'Multiple images found in folder';
           report.ambiguous_images.push(item);
           return;
        }

        const fileName = files[0];
        const fileNameNoExt = path.basename(fileName, path.extname(fileName));
        
        if (normalize(fileNameNoExt) !== normalize(folderName) && !normalize(fileNameNoExt).includes(normalize(folderName))) {
           // Eccezione per Philips Serie 1000 / Serie 2000.webp come richiesto dal PO
           if (folderName === 'Airfryer Serie 1000' && fileName === 'Airfryer Serie 2000.webp') {
             item.file_matches_folder = true;
             item.status = 'match';
             item.note = 'Forced match by PO decision';
             report.matches.push(item);
             return;
           } else {
             report.mismatches.push({
               folder: `Foto/${brand}/${folderName}`,
               file: fileName,
               expected_model: folderName,
               model_spec: model.model_spec,
               status: 'mismatch',
               reason: 'filename does not match folder/model'
             });
             return;
           }
        }

        item.file_matches_folder = true;
        item.status = 'match';
        item.note = 'Ready to copy';
        report.matches.push(item);
      });
    });
  });

  const publicImagesDir = path.resolve(__dirname, '../public/images/air-fryers');
  
  report.matches.forEach(item => {
    const srcPath = path.join(fotoDir, item.brand === 'philips' ? 'Philips' : 'Cosori', item.folder_name, item.file_name);
    const destDir = path.join(publicImagesDir, item.brand);
    
    const destFileName = item.is_ambiguous 
      ? `${item.expected_canonical_slug}-${item.variant_slug}.webp` 
      : `${item.expected_canonical_slug}.webp`;
      
    const destPath = path.join(destDir, destFileName);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(srcPath, destPath);
  });

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Audit complete. Report written to ${reportPath}`);
  console.log(`Matches: ${report.matches.length}`);
  console.log(`Mismatches: ${report.mismatches.length}`);
  console.log(`Copied ${report.matches.length} valid images to public/images/air-fryers/`);
}

auditImages();
