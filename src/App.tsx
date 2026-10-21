import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/Toast';

import { HomeView } from './pages/HomeView';
import { ShopView } from './pages/ShopView';
import { ProductDetailView } from './pages/ProductDetailView';
import { CartView } from './pages/CartView';
import { CheckoutView } from './pages/CheckoutView';
import { OrderSuccessView } from './pages/OrderSuccessView';
import { OurStoryView } from './pages/OurStoryView';
import { AccountView } from './pages/AccountView';
import { SubscriptionsView } from './pages/SubscriptionsView';
import { TrackOrderView } from './pages/TrackOrderView';
import { AdminDashboardView } from './pages/AdminDashboardView';
import { LabReportModal } from './components/LabReportModal';

const MainContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 380px)' }}>
      {activePage === 'home' && <HomeView />}
      {activePage === 'shop' && <ShopView />}
      {activePage === 'product-detail' && <ProductDetailView />}
      {activePage === 'cart' && <CartView />}
      {activePage === 'checkout' && <CheckoutView />}
      {activePage === 'order-success' && <OrderSuccessView />}
      {activePage === 'story' && <OurStoryView />}
      {activePage === 'contact' && <OurStoryView />}
      {activePage === 'account' && <AccountView />}
      {activePage === 'subscriptions' && <SubscriptionsView />}
      {activePage === 'track-order' && <TrackOrderView />}
      {activePage === 'admin' && <AdminDashboardView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <QuickViewModal />
        <AuthModal />
        <LabReportModal />
        <ToastContainer />
      </div>
    </ShopProvider>
  );
};

export default App;
