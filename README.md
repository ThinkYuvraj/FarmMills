# 🌾 Farmers Mill — Direct Farm to Table Stone Milling Platform

A modern, full-stack eCommerce and artisan stone-milling application for **Farmers Mill**, inspired by traditional chakki milling craftsmanship and certified transparent food testing.

---

## 🌟 Features

### 🛒 Customer Storefront & Navigation
- **Interactive Product Type & Category Selector**: Choose directly between *Fresh Atta*, *Besan & Flours*, *Spices*, *Oils & Ghee*, and *Honey & Pickles* with live milling technique highlights.
- **Detailed Product Catalog**: Multi-pack selection (e.g. 500g, 1kg, 5kg), real-time pricing recalculations, nutrient breakdowns, farm origins, and shelf-life guidance.
- **Cart & Slide-over Drawer**: Live subtotal tracking, free delivery progress meter (threshold ₹499), and coupon code support.
- **NABL Lab Report Viewer**: Batch-level transparency modal displaying 230+ pesticide screening results, active curcumin content (3.82%), NMR honey testing, and official accreditation certificates.
- **Direct From the Mill Facility Walkthrough**: Interactive 4-step production journey from multi-stage destoning to low-RPM stone grinding (< 38°C) and eco-friendly airtight kraft packaging.
- **Routine Milling Subscriptions**: Subscribe & save 15% with customizable frequencies (Weekly, Every 2 Weeks, Monthly), morning delivery slot options, and pause/cancel flexibility.
- **Mill Coins Loyalty**: Signup reward banner for 100 Mill Coins redeemable against orders.

### ⚙️ Server & Backend Logic (`server/`)
- **Server-Authoritative Pricing Engine (`pricingService.js`)**: Prevents client-side price tampering by computing subtotals, delivery fees, and discounts strictly from the authoritative database.
- **Dynamic Coupon Validation (`couponService.js` / `coupons.js`)**: Enforces minimum cart amounts, first-order criteria (`WELCOME50`), percentage caps (`FARMERS10`, `PURE20`), and free shipping (`FREESHIP`).
- **Pincode & Logistics Engine (`logisticsService.js`)**: Zone-based serviceability resolution (Delhi-NCR, Bengaluru, Mumbai, Pune, Hyderabad) with 8:00 PM fresh milling cutoff scheduling.
- **Order Lifecycle & Tracking Timeline (`orderService.js`)**: Generates verifiable order records with chakki machine assignment, miller notes, and progress checkpoints.
- **Routine Milling Subscriptions (`subscriptionService.js`)**: Recurring billing logic with automated delivery scheduling.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/ThinkYuvraj/FarmMills.git
cd FarmMills

# Install dependencies
npm install
```

### Development
Start the unified fullstack development environment (Frontend + Express API):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend API Testing
Run the automated integration test suite across all 8 endpoints:
```bash
npm run test:api
```

### Standalone Backend Server
To run only the Express backend server:
```bash
npm run server
```
Server will run on [http://localhost:3001](http://localhost:3001).

### Production Build
Type-check with TypeScript and build the optimized production assets:
```bash
npm run build
```

---

## 📂 Project Structure

```
├── public/                 # Static assets, product photography, official brand logos
├── server/
│   ├── data/               # Persistent JSON database (store.json) & seed data
│   ├── routes/             # REST API routes (products, cart, coupons, pincodes, orders, subs)
│   ├── services/           # Authoritative business logic engines (pricing, logistics, orders)
│   ├── app.js              # Express app setup & CORS middleware
│   ├── index.js            # Standalone API server entry point (port 3001)
│   └── test-api.js         # Automated backend test suite
├── src/
│   ├── components/         # Navbar, Footer, ProductCard, CategorySelector, Modals, Banners
│   ├── context/            # React ShopContext with API client synchronization
│   ├── data/               # Catalog data, lab test records, customer reviews
│   ├── pages/              # HomeView, ShopView, ProductDetailView, CartView, CheckoutView, etc.
│   ├── services/           # Frontend API client (api.ts)
│   ├── types.ts            # Core TypeScript interfaces
│   ├── App.tsx             # Main view router
│   └── main.tsx            # React application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts          # Vite configuration with Express API Connect middleware
```

---

## 📜 License
Private & Proprietary — Farmers Mill. All rights reserved.
