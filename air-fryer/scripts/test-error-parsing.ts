import fs from 'fs';
import path from 'path';

// Helper function we want to test, copied from air-fryer-db.ts
function parseRawErrors(rawText: string | undefined, targetCode: string): string {
  if (!rawText) return '';
  const lines = rawText.split('\n');
  let capturing = false;
  let text = '';
  
  const isHeader = (line: string) => /^"?E\d+/i.test(line);
  const containsTarget = (line: string, code: string) => {
    const normalized = line.replace(/["'.]/g, '').trim().toUpperCase();
    const c = code.toUpperCase();
    if (normalized === c) return true;
    if (normalized.includes('/')) {
      return normalized.split('/').map(s => s.trim()).includes(c);
    }
    const rangeMatch = normalized.match(/E(\d+)\s*[-–]\s*E(\d+)/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      const targetNumMatch = c.match(/E(\d+)/);
      if (targetNumMatch) {
        const targetNum = parseInt(targetNumMatch[1], 10);
        return targetNum >= start && targetNum <= end;
      }
    }
    return false;
  };

  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;

    if (isHeader(cleanLine)) {
      if (containsTarget(cleanLine, targetCode)) {
        capturing = true;
        continue;
      } else if (capturing) {
        break;
      }
    }

    if (capturing) {
      text += line + '\n';
    }
  }
  return text.trim();
}

function testParsing() {
  const dbPath = path.join(process.cwd(), 'src/data/air-fryer-db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const philips = db.find((m: any) => m.model_spec === 'NA351');
  if (!philips) {
    throw new Error('Philips NA351 not found in dataset');
  }

  const rawErrors = philips._raw_errors;
  
  console.log('Testing E1...');
  const e1Text = parseRawErrors(rawErrors, 'E1');
  if (e1Text.includes('E4') || e1Text.includes('E12')) {
    console.error('FAIL: E1 contains E4 or E12');
    process.exit(1);
  }
  if (!e1Text) {
    console.error('FAIL: E1 is empty');
    process.exit(1);
  }
  console.log('E1 OK');

  console.log('Testing E4...');
  const e4Text = parseRawErrors(rawErrors, 'E4');
  if (e4Text.includes('E12')) {
    console.error('FAIL: E4 contains E12 block text. Extracted:', e4Text);
    process.exit(1);
  }
  if (!e4Text) {
    console.error('FAIL: E4 is empty');
    process.exit(1);
  }
  console.log('E4 OK');

  console.log('Testing E12...');
  const e12Text = parseRawErrors(rawErrors, 'E12');
  if (!e12Text) {
    console.error('FAIL: E12 is empty');
    process.exit(1);
  }
  console.log('E12 OK');
  
  console.log('All tests passed.');
}

testParsing();
