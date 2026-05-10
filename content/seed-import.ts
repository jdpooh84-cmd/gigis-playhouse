/**
 * Content Seed Importer
 * 
 * Imports generated content into the database via the tRPC API.
 * Run with: npx tsx content/seed-import.ts
 * 
 * This script can also be used to export the generated content as JSON files
 * for the client-side seed data.
 */
import { allLessons, allFlashcards } from './generate-content';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(__dirname, '..', 'client', 'src', 'lib');

// Export as TypeScript seed files
function exportSeedFiles() {
  // Lessons
  const lessonsContent = `// Auto-generated content corpus — ${allLessons.length} lessons
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY — regenerate with: npx tsx content/generate-content.ts

import type { Lesson } from './types';

export const GENERATED_LESSONS: Lesson[] = ${JSON.stringify(allLessons, null, 2)};
`;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'generated-lessons.ts'),
    lessonsContent
  );
  console.log(`✅ Wrote ${allLessons.length} lessons to client/src/lib/generated-lessons.ts`);

  // Flashcards
  const flashcardsContent = `// Auto-generated flashcard corpus — ${allFlashcards.length} cards
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY — regenerate with: npx tsx content/generate-content.ts

import type { Flashcard } from './types';

export const GENERATED_FLASHCARDS: Flashcard[] = ${JSON.stringify(allFlashcards, null, 2)};
`;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'generated-flashcards.ts'),
    flashcardsContent
  );
  console.log(`✅ Wrote ${allFlashcards.length} flashcards to client/src/lib/generated-flashcards.ts`);

  // Also export as JSON for potential DB seeding
  const jsonDir = path.join(__dirname, 'json');
  if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir);

  fs.writeFileSync(
    path.join(jsonDir, 'lessons.json'),
    JSON.stringify(allLessons, null, 2)
  );
  fs.writeFileSync(
    path.join(jsonDir, 'flashcards.json'),
    JSON.stringify(allFlashcards, null, 2)
  );
  console.log(`✅ Wrote JSON seed files to content/json/`);

  // Summary
  console.log(`\\n📊 Content Summary:`);
  console.log(`   Lessons: ${allLessons.length}`);
  console.log(`   Flashcards: ${allFlashcards.length}`);
  console.log(`   Grade Bands: pre-k, kindergarten, grade-1, grade-2, grade-3`);
  console.log(`   Domains: literacy, math, science, social-emotional`);
  console.log(`   Days per path: 30`);
}

exportSeedFiles();
