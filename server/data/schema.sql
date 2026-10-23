-- ==============================================================================
-- FARMERS MILL - HOSTINGER SQL DATABASE SCHEMA (MySQL 8 / MariaDB)
-- Character Set: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NULL,
  `phone` VARCHAR(50) NULL,
  `auth_provider` VARCHAR(50) DEFAULT 'password',
  `google_connected` BOOLEAN DEFAULT FALSE,
  `apple_connected` BOOLEAN DEFAULT FALSE,
  `member_since` VARCHAR(50) DEFAULT 'Oct 2026',
  `addresses` JSON NULL,
  `passkeys` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `hindi_name` VARCHAR(255) NULL,
  `category` VARCHAR(100) NOT NULL,
  `subcategory` VARCHAR(100) NULL,
  `tagline` VARCHAR(255) NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `origin` VARCHAR(255) NULL,
  `shelf_life` VARCHAR(100) NULL,
  `milling_speed` VARCHAR(100) NULL,
  `stone_type` VARCHAR(100) NULL,
  `process_temp` VARCHAR(100) NULL,
  `rating` DECIMAL(3, 2) DEFAULT 5.00,
  `review_count` INT DEFAULT 0,
  `is_bestseller` BOOLEAN DEFAULT FALSE,
  `is_seasonal` BOOLEAN DEFAULT FALSE,
  `is_organic` BOOLEAN DEFAULT TRUE,
  `lab_certified` BOOLEAN DEFAULT TRUE,
  `benefits` JSON NULL,
  `pack_options` JSON NOT NULL,
  `nutritional_info` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_products_category` (`category`),
  INDEX `idx_products_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(100) NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `items` JSON NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `discount` DECIMAL(10, 2) DEFAULT 0.00,
  `delivery_fee` DECIMAL(10, 2) DEFAULT 0.00,
  `total` DECIMAL(10, 2) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Confirmed',
  `payment_method` VARCHAR(50) DEFAULT 'cod',
  `payment_status` VARCHAR(50) DEFAULT 'Pending',
  `razorpay_order_id` VARCHAR(100) NULL,
  `razorpay_payment_id` VARCHAR(100) NULL,
  `outlet_id` VARCHAR(100) DEFAULT 'outlet-mcc-rajnagar',
  `outlet_name` VARCHAR(255) DEFAULT 'MCC Signature Heights, Rajnagar Extension',
  `shipping_address` JSON NOT NULL,
  `tracking_events` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_orders_customer_email` (`customer_email`),
  INDEX `idx_orders_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(100) NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) NULL,
  `product_id` VARCHAR(100) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `pack_size` VARCHAR(50) NOT NULL,
  `frequency` VARCHAR(50) NOT NULL,
  `interval_days` INT DEFAULT 30,
  `price` DECIMAL(10, 2) NOT NULL,
  `discount_pct` INT DEFAULT 15,
  `next_delivery_date` VARCHAR(100) NULL,
  `status` VARCHAR(50) DEFAULT 'active',
  `delivery_address` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_subs_customer_email` (`customer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. COUPONS TABLE
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount_type` VARCHAR(20) NOT NULL, -- 'percentage' or 'flat'
  `discount_value` DECIMAL(10, 2) NOT NULL,
  `min_order_value` DECIMAL(10, 2) DEFAULT 0.00,
  `max_discount` DECIMAL(10, 2) NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `description` VARCHAR(255) NULL,
  INDEX `idx_coupons_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `product_id` VARCHAR(100) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `verified` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_reviews_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. FACTORY OUTLETS TABLE
CREATE TABLE IF NOT EXISTS `outlets` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `address` TEXT NOT NULL,
  `landmark` VARCHAR(255) NULL,
  `lat` DECIMAL(10, 6) NOT NULL,
  `lng` DECIMAL(10, 6) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `hours` VARCHAR(100) DEFAULT '7:00 AM - 8:00 PM',
  `is_primary` BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. LAB REPORTS TABLE
CREATE TABLE IF NOT EXISTS `lab_reports` (
  `product_id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `batch_number` VARCHAR(100) NOT NULL,
  `test_date` VARCHAR(100) NOT NULL,
  `laboratory` VARCHAR(255) NOT NULL,
  `parameters` JSON NOT NULL,
  INDEX `idx_lab_reports_batch` (`batch_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
