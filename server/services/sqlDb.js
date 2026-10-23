import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, '../data/schema.sql');

class SqlDatabase {
  constructor() {
    this.pool = null;
    this.isConnected = false;
    this.connectionError = null;
    this.initPool();
  }

  initPool() {
    const { host, user, password, name, port, ssl, connectionLimit, connectTimeout } = config.database;

    // Check if Hostinger SQL connection details are provided
    if (!host || !user || !name) {
      this.isConnected = false;
      this.connectionError = 'Hostinger SQL database credentials not set in environment (DB_HOST, DB_USER, DB_NAME).';
      return;
    }

    try {
      this.pool = mysql.createPool({
        host,
        user,
        password,
        database: name,
        port: port || 3306,
        waitForConnections: true,
        connectionLimit: connectionLimit || 50,
        queueLimit: config.database.queueLimit || 1000,
        connectTimeout: connectTimeout || 15000,
        idleTimeout: config.database.idleTimeout || 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        ssl: ssl || undefined,
        charset: 'utf8mb4'
      });

      // Test connection asynchronously
      this.testConnection();
    } catch (err) {
      this.isConnected = false;
      this.connectionError = err.message;
      console.warn('⚠️ Could not initialize MySQL pool for Hostinger database:', err.message);
    }
  }

  async testConnection() {
    if (!this.pool) return false;
    try {
      const conn = await this.pool.getConnection();
      await conn.ping();
      conn.release();
      this.isConnected = true;
      this.connectionError = null;
      console.log(`✅ [Hostinger SQL] Successfully connected to database: ${config.database.name} @ ${config.database.host}`);
      
      // Auto-initialize schema if needed
      await this.initSchema();
      return true;
    } catch (err) {
      this.isConnected = false;
      this.connectionError = err.message;
      console.warn(`⚠️ [Hostinger SQL] Connection failed (${err.code || err.message}). Operating in resilient fallback mode.`);
      return false;
    }
  }

  async initSchema() {
    if (!this.isConnected || !this.pool) return false;
    try {
      if (!fs.existsSync(schemaPath)) return false;
      const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

      // Split statements by semicolon
      const statements = schemaSql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('SET '));

      for (const statement of statements) {
        try {
          await this.pool.query(statement);
        } catch (stmtErr) {
          // Ignore individual table exists notices
          if (!stmtErr.message.includes('already exists')) {
            console.warn('Notice executing schema statement:', stmtErr.message);
          }
        }
      }
      console.log('✅ [Hostinger SQL] Tables verified and synced.');
      return true;
    } catch (err) {
      console.error('Failed to initialize SQL schema:', err);
      return false;
    }
  }

  async query(sql, params = []) {
    if (!this.isConnected || !this.pool) {
      throw new Error(this.connectionError || 'SQL Database not connected.');
    }
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async execute(sql, params = []) {
    if (!this.isConnected || !this.pool) {
      throw new Error(this.connectionError || 'SQL Database not connected.');
    }
    const [result] = await this.pool.execute(sql, params);
    return result;
  }

  getStatus() {
    return {
      connected: this.isConnected,
      engine: 'Hostinger MySQL / MariaDB',
      host: config.database.host || '(not configured)',
      database: config.database.name || '(not configured)',
      port: config.database.port || 3306,
      user: config.database.user ? `${config.database.user.slice(0, 3)}***` : '(not configured)',
      error: this.connectionError
    };
  }

  // --- Seed Initial Data into Hostinger SQL ---
  async seedInitialData(initialData) {
    if (!this.isConnected || !this.pool) {
      throw new Error('Cannot seed database: Hostinger SQL connection is not active.');
    }

    const stats = { products: 0, users: 0, reviews: 0, coupons: 0, orders: 0, outlets: 0 };

    // 1. Seed Products
    if (initialData.products && initialData.products.length > 0) {
      for (const p of initialData.products) {
        await this.pool.query(
          `INSERT INTO products (
            id, slug, name, hindi_name, category, subcategory, tagline, description,
            image, origin, shelf_life, milling_speed, stone_type, process_temp,
            rating, review_count, is_bestseller, is_seasonal, is_organic, lab_certified,
            benefits, pack_options, nutritional_info
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            name=VALUES(name), category=VALUES(category), image=VALUES(image),
            pack_options=VALUES(pack_options), rating=VALUES(rating), review_count=VALUES(review_count)`,
          [
            p.id,
            p.slug || p.id,
            p.name,
            p.hindiName || '',
            p.category,
            p.subcategory || '',
            p.tagline || '',
            p.description || '',
            p.image,
            p.origin || '',
            p.shelfLife || '',
            p.millingSpeed || '',
            p.stoneType || '',
            p.processTemp || '',
            p.rating || 5.0,
            p.reviewCount || 0,
            p.isBestseller ? 1 : 0,
            p.isSeasonal ? 1 : 0,
            p.isOrganic ? 1 : 0,
            p.labCertified ? 1 : 0,
            JSON.stringify(p.benefits || []),
            JSON.stringify(p.packOptions || []),
            JSON.stringify(p.nutritionalInfo || {})
          ]
        );
        stats.products++;
      }
    }

    // 2. Seed Users
    if (initialData.users && initialData.users.length > 0) {
      for (const u of initialData.users) {
        await this.pool.query(
          `INSERT INTO users (
            id, name, email, password_hash, phone, auth_provider,
            google_connected, apple_connected, member_since, addresses
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            name=VALUES(name), phone=VALUES(phone), addresses=VALUES(addresses)`,
          [
            u.id,
            u.name,
            u.email,
            u.passwordHash || null,
            u.phone || '',
            u.authProvider || 'password',
            u.googleConnected ? 1 : 0,
            u.appleConnected ? 1 : 0,
            u.memberSince || 'Oct 2026',
            JSON.stringify(u.addresses || [])
          ]
        );
        stats.users++;
      }
    }

    // 3. Seed Reviews
    if (initialData.reviews && initialData.reviews.length > 0) {
      for (const r of initialData.reviews) {
        await this.pool.query(
          `INSERT INTO reviews (id, product_id, user_name, rating, comment, verified)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE rating=VALUES(rating), comment=VALUES(comment)`,
          [
            r.id,
            r.productId,
            r.userName || r.user || 'Patron',
            r.rating || 5,
            r.comment || '',
            r.verified ? 1 : 0
          ]
        );
        stats.reviews++;
      }
    }

    // 4. Seed Coupons
    if (initialData.coupons && initialData.coupons.length > 0) {
      for (const c of initialData.coupons) {
        await this.pool.query(
          `INSERT INTO coupons (id, code, discount_type, discount_value, min_order_value, max_discount, is_active, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE discount_value=VALUES(discount_value), is_active=VALUES(is_active)`,
          [
            c.id || `cpn_${c.code.toLowerCase()}`,
            c.code,
            c.type || 'percentage',
            c.value || 10,
            c.minOrder || 0,
            c.maxDiscount || null,
            c.isActive ? 1 : 0,
            c.description || ''
          ]
        );
        stats.coupons++;
      }
    }

    return stats;
  }
}

export const sqlDb = new SqlDatabase();
export default sqlDb;
