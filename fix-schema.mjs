/**
 * Direct SQL migration to sync the database schema.
 * Adds missing columns to users and sponsors tables.
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL not set'); process.exit(1); }

const conn = await mysql.createConnection(url);

async function columnExists(table, column) {
  const [rows] = await conn.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  );
  return rows.length > 0;
}

async function addColumnIfMissing(table, column, definition) {
  if (await columnExists(table, column)) {
    console.log(`  ✓ ${table}.${column} already exists`);
    return;
  }
  const sql = `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`;
  await conn.execute(sql);
  console.log(`  + ${table}.${column} created`);
}

async function dropColumnIfExists(table, column) {
  if (!(await columnExists(table, column))) {
    return;
  }
  const sql = `ALTER TABLE \`${table}\` DROP COLUMN \`${column}\``;
  await conn.execute(sql);
  console.log(`  - ${table}.${column} dropped (old column)`);
}

try {
  console.log('\n=== Syncing users table ===');
  await addColumnIfMissing('users', 'planType', "ENUM('free','gold','family') NOT NULL DEFAULT 'free'");
  await addColumnIfMissing('users', 'trialStart', 'TIMESTAMP NULL');
  await addColumnIfMissing('users', 'stripeCustomerId', 'VARCHAR(128) NULL');
  await addColumnIfMissing('users', 'stripeSubscriptionId', 'VARCHAR(128) NULL');
  await addColumnIfMissing('users', 'onboardingComplete', 'BOOLEAN NOT NULL DEFAULT FALSE');
  await addColumnIfMissing('users', 'coppaConsent', 'BOOLEAN NOT NULL DEFAULT FALSE');
  await addColumnIfMissing('users', 'affiliateCode', 'VARCHAR(32) NULL');
  await addColumnIfMissing('users', 'referredBy', 'VARCHAR(32) NULL');

  console.log('\n=== Syncing sponsors table ===');
  // Drop old columns that no longer exist in schema
  await dropColumnIfExists('sponsors', 'tagline');
  await dropColumnIfExists('sponsors', 'ctaUrl');
  await dropColumnIfExists('sponsors', 'ctaLabel');
  await dropColumnIfExists('sponsors', 'monthlyBudget');
  await dropColumnIfExists('sponsors', 'startDate');
  await dropColumnIfExists('sponsors', 'endDate');

  // Add new sponsor columns
  await addColumnIfMissing('sponsors', 'contactName', 'VARCHAR(100) NULL');
  await addColumnIfMissing('sponsors', 'contactEmail', 'VARCHAR(150) NULL');
  await addColumnIfMissing('sponsors', 'companyWebsite', 'VARCHAR(250) NULL');
  await addColumnIfMissing('sponsors', 'shortDescription', 'VARCHAR(150) NULL');
  await addColumnIfMissing('sponsors', 'tierId', "ENUM('TIER-FRIEND','TIER-SUPPORTER','TIER-CHAMPION') NOT NULL DEFAULT 'TIER-FRIEND'");
  await addColumnIfMissing('sponsors', 'sponsoredDomain', 'VARCHAR(50) NULL');
  await addColumnIfMissing('sponsors', 'billingCycle', "ENUM('monthly','annually') NOT NULL DEFAULT 'monthly'");
  await addColumnIfMissing('sponsors', 'stripeCustomerId', 'VARCHAR(128) NULL');
  await addColumnIfMissing('sponsors', 'stripeSubscriptionId', 'VARCHAR(128) NULL');
  await addColumnIfMissing('sponsors', 'activatedAt', 'TIMESTAMP NULL');
  await addColumnIfMissing('sponsors', 'expiresAt', 'TIMESTAMP NULL');

  console.log('\n=== Verifying lessonFeedback table ===');
  // Check if lessonFeedback table exists
  const [tables] = await conn.execute(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lessonFeedback'`
  );
  if (tables.length === 0) {
    await conn.execute(`
      CREATE TABLE lessonFeedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        childId INT NOT NULL,
        userId INT NOT NULL,
        lessonId VARCHAR(64) NOT NULL,
        domain VARCHAR(64) NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  + lessonFeedback table created');
  } else {
    console.log('  ✓ lessonFeedback table exists');
  }

  console.log('\n=== All schema changes applied successfully ===\n');
} catch (err) {
  console.error('Migration error:', err.message);
  process.exit(1);
} finally {
  await conn.end();
}
