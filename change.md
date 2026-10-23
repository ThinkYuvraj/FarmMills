# Farmers Mill – Change Log (`change.md`)

## Summary of All Changes & Enhancements

This document tracks all changes made to the Farmers Mill web application across backend services, client components, responsive layouts, SEO/GEO/AEO optimizations, and payment integration.

---

### 1. Build & Compilation Stability
- **Files Modified**:
  - `src/context/ShopContext.tsx`: Added `showToast` alias to `ShopContextType` and `ShopProvider` value object to resolve TypeScript compilation errors in `AdminDashboardView.tsx`.
  - `src/pages/AdminDashboardView.tsx`: Integrated with updated toast handler, ensuring clean `npm run build` with zero TypeScript errors.

---

### 2. Razorpay Credentials Integration
- **Files Modified/Created**:
  - `/.env`: Created environment file with `FRONTEND_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`.
  - `/server/config/razorpay.js`: Refactored to support dynamic initialization via `initRazorpay(keyId, keySecret)` and exported getter helpers `getRazorpayInstance()` and `isRazorpayConfigured()`.
  - `/server/services/razorpayService.js`: Added `updateCredentials({ keyId, keySecret, webhookSecret })` with `.env` persistence and `testConnection()` to test authentication against Razorpay servers.
  - `/server/controllers/paymentController.js`: Added `saveCredentials` and `testConnection` route controllers.
  - `/server/routes/payments.js`: Exposed `POST /api/payments/razorpay/save-credentials` and `GET /api/payments/razorpay/test-connection`.
  - `/src/services/api.ts`: Added frontend client methods `api.saveRazorpayCredentials` and `api.testRazorpayConnection`.
  - `/src/pages/AdminDashboardView.tsx`: Added interactive UI panel in the Payments tab to test gateway connectivity, enter Razorpay Key ID and Secret, and activate keys live.

---

### 3. Client Navigation & Privacy
- **Files Modified**:
  - `src/components/Navbar.tsx`:
    - **Removed Admin Console button** from the top client announcement bar so regular shoppers do not see internal store administration tools.
    - Added discrete internal triggers for store managers:
      - Direct route `#admin` or `?admin=true`
      - Typing `"admin"` into the search bar
      - Keyboard shortcut: `Ctrl+Shift+A` (or `Cmd+Shift+A` on macOS)
    - Fixed desktop navigation bar by removing inline `display: none`.
    - Integrated with responsive CSS classes.

---

### 4. Mobile & Tablet Responsiveness & App Experience
- **Files Modified/Created**:
  - `src/components/MobileBottomNav.tsx`: Created native app-like bottom navigation bar (Home, Shop, Subscribe, Track Order, and Cart drawer trigger with live badge counter).
  - `src/components/Navbar.tsx`: Removed remaining admin console trigger from mobile menu drawer; added clean quick navigation.
  - `src/components/CartDrawer.tsx`: Converted drawer on mobile (<640px) to a native iOS/Android bottom sheet with grab indicator pill (`---`) and smooth slide-up animation.
  - `src/components/CategoryProductSection.tsx`: Enhanced category cards to render as a smooth horizontal swipeable carousel on mobile devices instead of an overwhelming vertical stack.
  - `src/pages/ProductDetailView.tsx`, `src/pages/CheckoutView.tsx`, `src/pages/CartView.tsx`, `src/pages/HomeView.tsx`: Updated grid column definitions from fixed `minmax(340px, 1fr)` to flexible `minmax(min(100%, 300px), 1fr)`, preventing horizontal overflow on phones.
  - `src/index.css`: Added bottom padding for mobile main content to ensure bottom bar never obscures content; added smooth tap-action responsiveness.

---

### 5. SEO, GEO, AEO & LLM Optimization
- **Files Modified/Created**:
  - `/index.html`:
    - Updated title: `"Farmers Mill – Fresh Stoneground Chakki Atta, Pure Spices & Cold-Pressed Oils"`
    - Full OpenGraph metadata (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`).
    - Full Twitter / X Card metadata (`twitter:card`, `twitter:site`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`).
    - Geographic meta tags for India and metro deliveries (`geo.region: IN-KA`, `geo.placename: Bengaluru`, `geo.position`, `ICBM`).
    - Multi-entity Schema.org JSON-LD graph:
      - `Organization` (Farmers Mill entity and contact points)
      - `LocalBusiness` / `Store` (operating hours, delivery regions, physical address)
      - `WebSite` (with SearchAction search box markup)
      - `FAQPage` (Answer Engine Optimization for queries regarding cold stone milling, zero maida, wood-pressed oils, and NABL batch test certificates)
  - `/public/robots.txt`: Added search indexing rules with permissions for AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`).
  - `/public/sitemap.xml`: XML sitemap containing canonical routes for priority search engine indexing.
  - `/public/llms.txt`: Standardized context file for generative AI search engines, Perplexity, and LLM agents containing verified facts on milling processes, farm sources, and product catalog.

---

### 6. Deployment Documentation
- **Files Created**:
  - `/deployment/deployment-logs.md`: Comprehensive deployment and runtime audit logs.
  - `/deployment/issues-and-fixes.md`: Detailed record of all issues encountered and exact solutions applied.
  - `/change.md`: Summary of all changes across the codebase.
