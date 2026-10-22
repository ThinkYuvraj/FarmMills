# Identified Issues & Applied Technical Fixes

This document records all architectural, functional, compilation, responsiveness, and SEO/AEO issues identified during deployment triage and their exact resolutions.

---

### Issue 1: TypeScript Build Compilation Failure
- **Severity**: Critical (Deployment Blocker)
- **Location**: `src/pages/AdminDashboardView.tsx:32:26`
- **Error Log**: `Property 'showToast' does not exist on type 'ShopContextType'`
- **Root Cause**: `ShopContext.tsx` exported `addToast`, but `AdminDashboardView.tsx` imported and referenced `showToast`.
- **Fix Applied**:
  1. Updated `ShopContextType` in `src/context/ShopContext.tsx` to include `showToast: (message: string, type?: 'success' | 'info' | 'error') => void`.
  2. Provided `showToast: addToast` in the `ShopProvider` context value object.
  3. Recompiled applet successfully with zero TypeScript errors.

---

### Issue 2: Admin Dashboard Button Exposed on Client View
- **Severity**: High (Privacy & UX Issue)
- **Location**: `src/components/Navbar.tsx:82-102`
- **Problem**: The top notification banner prominently displayed a `"⚙️ Admin Console"` link to all regular site visitors and customers.
- **Fix Applied**:
  1. Removed the client-facing button completely from the public header notification banner.
  2. Implemented discrete administrative access methods for store operators:
     - URL hash: `/#admin`
     - Query parameters: `?admin=true` or `?admin=1`
     - Header search keyword: typing `"admin"` into the search bar automatically routes to the Admin Dashboard
     - Keyboard shortcut: `Ctrl + Shift + A` (or `Cmd + Shift + A` on macOS) toggles between Admin Console and Storefront.

---

### Issue 3: Desktop Navigation Bar Invisibility Bug
- **Severity**: High (Navigation Usability)
- **Location**: `src/components/Navbar.tsx:158` & `src/components/Navbar.tsx:328`
- **Problem**: Both `.desktop-nav` and `.desktop-search` had `style={{ display: 'none' }}` hardcoded as inline styles, preventing the desktop navigation menu from showing on desktop monitors without custom viewport overrides.
- **Fix Applied**:
  1. Removed inline `display: 'none'` from both elements in `src/components/Navbar.tsx`.
  2. Defined centralized, clean media queries in `src/index.css`:
     - Mobile screens (<992px): `.desktop-nav` and `.desktop-search` hidden; mobile hamburger and search icon visible.
     - Desktop screens (>=992px): `.desktop-nav` and `.desktop-search` rendered as `flex`/`block`; mobile toggles hidden.

---

### Issue 4: Mobile & Tablet Responsiveness & Layout Overflow
- **Severity**: Medium (Mobile Experience)
- **Locations**: `src/index.css`, `src/pages/CheckoutView.tsx`, `src/pages/CartView.tsx`, `src/components/CartDrawer.tsx`
- **Problem**:
  - Small mobile viewports (<360px) experienced horizontal scroll due to fixed grid `minmax(340px, 1fr)`.
  - Buttons and header labels were crowded on narrow phone screens.
- **Fix Applied**:
  1. Added `overflow-x: hidden; max-width: 100vw;` to `html, body` in `src/index.css`.
  2. Added small screen media queries (<480px) that hide repetitive label text (`.sign-in-text`, `.cart-label`) while retaining crisp icons and badges.
  3. Responsive drawer and modal sizing: `<640px` screens use edge-to-edge padding and touch-friendly close targets.
  4. Added `.responsive-products-grid` utility and touch manipulation properties to buttons.

---

### Issue 5: Razorpay Credentials Integration & Live Gateway Readiness
- **Severity**: High (Payment Operations)
- **Locations**: `server/config/razorpay.js`, `server/services/razorpayService.js`, `server/controllers/paymentController.js`, `server/routes/payments.js`, `src/services/api.ts`, `src/pages/AdminDashboardView.tsx`
- **Problem**: Razorpay instance was frozen upon initial module load with static environment variables. If credentials were not present on server boot, it was impossible to supply test or live keys dynamically without server restart.
- **Fix Applied**:
  1. Upgraded `server/config/razorpay.js` with `initRazorpay(keyId, keySecret)` to re-instantiate Razorpay client dynamically at runtime.
  2. Added `saveCredentials` and `testConnection` endpoints:
     - `POST /api/payments/razorpay/save-credentials`: updates runtime memory and persists to `.env`.
     - `GET /api/payments/razorpay/test-connection`: tests authentication directly against Razorpay's API and returns live diagnostic status.
  3. Added interactive "Update Razorpay API Credentials" card and "Test Gateway Connection" button inside the Admin Dashboard under the Payments tab.
  4. Created `.env` file with environment placeholders.

---

### Issue 6: SEO, Geographic Location (GEO), Answer Engine Optimization (AEO) Deficiencies
- **Severity**: Medium (Search Visibility & AI Discovery)
- **Locations**: `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`
- **Problem**:
  - Missing structured data for e-commerce search snippets.
  - No GEO coordinates for local Indian delivery search.
  - No AEO FAQ schema for generative search engines (Perplexity, ChatGPT, Google SGE, Gemini).
  - Missing `robots.txt`, `sitemap.xml`, and `llms.txt`.
- **Fix Applied**:
  1. Enhanced `index.html` with full OpenGraph, Twitter Cards, GEO region tags (`IN-KA`, Bengaluru coordinates).
  2. Embedded Schema.org JSON-LD graph containing `Organization`, `LocalBusiness`, `WebSite`, and `FAQPage` addressing low-RPM chakki milling, zero maida, woodpressed extraction, and NABL batch reports.
  3. Created `public/robots.txt` granting explicit permission to modern AI bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`).
  4. Generated `public/sitemap.xml` for crawler discovery.
  5. Created `public/llms.txt` documenting all product categories, specifications, and milling standards for LLM agents.
