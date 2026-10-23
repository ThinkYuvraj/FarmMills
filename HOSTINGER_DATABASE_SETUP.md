# 🗄️ Hostinger MySQL Database Integration Guide

This guide explains how to connect your **Farmers Mill** e-commerce application to your **Hostinger MySQL / MariaDB Database**.

---

## ⚡ Quick Summary
The application comes pre-configured with:
- **`mysql2/promise`**: Fast, non-blocking connection pool with automatic keep-alive and parameterization (anti-SQL injection).
- **`schema.sql`**: Production-grade DDL defining tables for `users`, `products`, `orders`, `subscriptions`, `coupons`, `reviews`, `outlets`, and `lab_reports`.
- **Automatic Background Synchronization**: Whenever patrons place orders, submit reviews, or register, data is written to both fast memory/file cache and your remote Hostinger MySQL database.
- **Resilient Fallback**: If Hostinger credentials are not set yet, or Hostinger is temporarily unreachable, the app operates without downtime using local store.

---

## 📋 Step-by-Step Setup in Hostinger

### Step 1: Create a MySQL Database in Hostinger hPanel
1. Log in to your [Hostinger Control Panel (hPanel)](https://hpanel.hostinger.com/).
2. Navigate to **Databases** > **MySQL Databases** (or **Management**).
3. Under **Create a New MySQL Database and Database User**:
   - **Database Name**: e.g., `u123456789_farmersmill` (note the prefix Hostinger assigns!)
   - **Username**: e.g., `u123456789_milluser`
   - **Password**: Enter a strong password and save it securely.
4. Click **Create**.

---

### Step 2: Enable Remote MySQL (CRITICAL)
By default, Hostinger blocks external connections to MySQL databases from outside their shared server. You must whitelist remote access:
1. In hPanel, go to **Databases** > **Remote MySQL**.
2. Under **IP (IPv4 or IPv6)**:
   - To allow access from any IP (recommended for cloud containers and dynamic server IPs), enter: `%`
   - Or enter the specific external IP of your hosting server.
3. Select your database name from the dropdown.
4. Click **Create / Save**.

---

### Step 3: Find Your Hostinger Database Host
In Hostinger hPanel > **MySQL Databases**, locate the **MySQL Host**.
- Standard Hostinger host formats look like:
  - `mysql.hostinger.in`
  - `srv1234.hstgr.io`
  - `193.203.166.xxx` (direct server IP)
  - `localhost` (only if the Node.js app runs on the same Hostinger VPS)

---

### Step 4: Configure Environment Variables in `.env`
Open or create the `.env` file in the root directory of the application:

```env
# Hostinger MySQL Connection Details
DB_HOST=srv1234.hstgr.io          # Your Hostinger MySQL Host
DB_USER=u123456789_milluser       # Your Hostinger Database User
DB_PASSWORD=YourSecurePassword123 # Your Hostinger Database User Password
DB_NAME=u123456789_farmersmill    # Your Hostinger Database Name
DB_PORT=3306                      # Default MySQL port is 3306
DB_SSL=false                      # Set to true if your Hostinger plan enforces SSL
```

---

### Step 5: Initialize Tables & Seed Initial Data
You have two options:

#### Option A: 1-Click Terminal Seeder (Recommended)
Run:
```bash
npm run db:seed
```
This script will:
1. Connect to Hostinger MySQL.
2. Automatically create all 8 database tables (`schema.sql`).
3. Seed all authentic products (Atta, Spices, Oils, Honey, Pickles), test patron Priya Sharma (Bcrypt hashed), coupons, and lab reports.

#### Option B: Hostinger phpMyAdmin Manual Import
1. In Hostinger hPanel, go to **Databases** > **phpMyAdmin** and click **Enter phpMyAdmin** next to your database.
2. Click the **Import** tab at the top.
3. Select `server/data/schema.sql` from this repository.
4. Click **Go** to execute and create all tables.

---

## 🔍 Step 6: Verify Connection
You can check connection health at any time:
1. Open your browser or API client to:
   ```
   GET /api/database/status
   ```
2. Response example:
   ```json
   {
     "success": true,
     "database": {
       "connected": true,
       "engine": "Hostinger MySQL / MariaDB",
       "host": "srv1234.hstgr.io",
       "database": "u123456789_farmersmill",
       "port": 3306,
       "livePing": true,
       "pingLatencyMs": "48ms"
     },
     "guidance": "Connected to Hostinger SQL database. All orders, patrons, and reviews are synced to your remote SQL database."
   }
   ```

---

## 🗃️ Database Table Architecture

| Table | Purpose | Key Columns |
| :--- | :--- | :--- |
| `products` | Flour, spice, and oil catalog | `id`, `slug`, `name`, `category`, `pack_options` (JSON), `rating` |
| `orders` | Customer purchases & tracking | `id`, `customer_name`, `items` (JSON), `total`, `status`, `payment_status` |
| `users` | Customer & admin patron accounts | `id`, `name`, `email`, `password_hash` (Bcrypt 10 rounds), `addresses` |
| `subscriptions`| Recurring chakki milling orders | `id`, `product_name`, `frequency`, `interval_days`, `status` |
| `reviews` | Customer ratings & feedback | `id`, `product_id`, `user_name`, `rating`, `comment` |
| `coupons` | Discounts & promo codes | `id`, `code`, `discount_type`, `discount_value`, `is_active` |
| `outlets` | Dispatch mills (e.g. Rajnagar Ext) | `id`, `name`, `address`, `lat`, `lng`, `hours` |
| `lab_reports` | NABL pesticide/purity lab test data | `product_id`, `batch_number`, `test_date`, `parameters` (JSON) |

---

## 🛠️ Common Troubleshooting

1. **`ETIMEDOUT` or `ECONNREFUSED`**:
   - Check that **Remote MySQL** is enabled in Hostinger hPanel with `%` allowed.
   - Verify `DB_PORT=3306`.
2. **`Access denied for user`**:
   - Ensure the user has been granted all privileges to the database in Hostinger hPanel.
   - Remember that Hostinger prefixes database and username (e.g. `u123456789_...`).
