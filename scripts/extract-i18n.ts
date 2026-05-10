/**
 * i18n String Extraction Script
 * 
 * Scans client source files for hardcoded English strings and generates
 * a report of strings that should be extracted to locale files.
 * 
 * Usage: npx tsx scripts/extract-i18n.ts
 */
import * as fs from 'fs';
import * as path from 'path';

const CLIENT_SRC = path.join(__dirname, '..', 'client', 'src');
const IGNORE_DIRS = ['node_modules', 'ui', 'i18n'];
const IGNORE_FILES = ['types.ts', 'const.ts', 'utils.ts', 'trpc.ts'];

interface ExtractedString {
  file: string;
  line: number;
  text: string;
  context: string;
}

const extracted: ExtractedString[] = [];

function scanFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(CLIENT_SRC, filePath);

  lines.forEach((line, idx) => {
    // Look for JSX text content (strings in JSX elements)
    const jsxTextMatch = line.match(/>\s*([A-Z][a-z][\w\s'!?.,:;]+)\s*</g);
    if (jsxTextMatch) {
      jsxTextMatch.forEach(match => {
        const text = match.replace(/^>\s*/, '').replace(/\s*<$/, '').trim();
        if (text.length > 3 && text.length < 200 && !text.match(/^[A-Z_]+$/)) {
          extracted.push({
            file: relativePath,
            line: idx + 1,
            text,
            context: line.trim().substring(0, 100),
          });
        }
      });
    }

    // Look for string literals in common patterns
    const patterns = [
      /title[=:]\s*["']([^"']+)["']/g,
      /label[=:]\s*["']([^"']+)["']/g,
      /placeholder[=:]\s*["']([^"']+)["']/g,
      /description[=:]\s*["']([^"']+)["']/g,
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const text = match[1];
        if (text.length > 3 && !text.match(/^[a-z-]+$/) && !text.startsWith('/') && !text.startsWith('http')) {
          extracted.push({
            file: relativePath,
            line: idx + 1,
            text,
            context: line.trim().substring(0, 100),
          });
        }
      }
    });
  });
}

function walkDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      if (IGNORE_FILES.includes(entry.name)) continue;
      scanFile(fullPath);
    }
  }
}

console.log('🔍 Scanning for hardcoded strings...\n');
walkDir(CLIENT_SRC);

// Deduplicate
const unique = new Map<string, ExtractedString>();
extracted.forEach(e => {
  if (!unique.has(e.text)) unique.set(e.text, e);
});

const results = Array.from(unique.values());
console.log(`Found ${results.length} unique hardcoded strings:\n`);

// Group by file
const byFile = new Map<string, ExtractedString[]>();
results.forEach(r => {
  const list = byFile.get(r.file) || [];
  list.push(r);
  byFile.set(r.file, list);
});

byFile.forEach((strings, file) => {
  console.log(`📄 ${file} (${strings.length} strings)`);
  strings.slice(0, 5).forEach(s => {
    console.log(`   L${s.line}: "${s.text}"`);
  });
  if (strings.length > 5) console.log(`   ... and ${strings.length - 5} more`);
  console.log('');
});

// Write report
const reportPath = path.join(__dirname, '..', 'i18n-extraction-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Full report written to: i18n-extraction-report.json`);
console.log(`   Total strings to extract: ${results.length}`);
