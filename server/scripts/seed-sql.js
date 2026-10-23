import { sqlDb } from '../services/sqlDb.js';
import { INITIAL_DATA } from '../data/initialData.js';
import { config } from '../config/index.js';

async function main() {
  console.log('🌾 Farmers Mill - Hostinger MySQL Database Setup & Seeder');
  console.log(`Connecting to: ${config.database.name || '(not set)'} @ ${config.database.host || '(not set)'}...`);

  if (!config.database.host || !config.database.user || !config.database.name) {
    console.error('❌ Missing database credentials.');
    console.error('Please configure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in your .env file.');
    console.error('Refer to HOSTINGER_DATABASE_SETUP.md for step-by-step instructions.');
    process.exit(1);
  }

  const isConnected = await sqlDb.testConnection();
  if (!isConnected) {
    console.error('❌ Failed to connect to Hostinger MySQL database.');
    console.error(`Reason: ${sqlDb.connectionError}`);
    console.error('💡 Tip: In Hostinger hPanel -> Databases -> Remote MySQL, ensure you allow remote connections from "%" or your server IP.');
    process.exit(1);
  }

  console.log('📋 Creating and verifying database tables from schema.sql...');
  await sqlDb.initSchema();

  console.log('🌱 Seeding fresh products, patrons, coupons, and lab certifications...');
  const stats = await sqlDb.seedInitialData(INITIAL_DATA);

  console.log('✨ Seed complete:');
  console.log(`   - Products: ${stats.products}`);
  console.log(`   - Patrons / Users: ${stats.users}`);
  console.log(`   - Reviews: ${stats.reviews}`);
  console.log(`   - Coupons: ${stats.coupons}`);
  console.log('🎉 Your Hostinger MySQL Database is fully initialized and operational!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error during seed:', err);
  process.exit(1);
});
