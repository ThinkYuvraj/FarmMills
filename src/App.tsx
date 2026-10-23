import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/Toast';
import { OutletPickerModal } from './components/OutletPickerModal';

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
import { TermsConditionsView } from './pages/TermsConditionsView';
import { ShippingReturnsView } from './pages/ShippingReturnsView';
import { LabReportModal } from './components/LabReportModal';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 380px)', width: '100%', overflowX: 'hidden' }}>
      {activePage === 'home' && <HomeView />}
      {activePage === 'shop' && <ShopView />}
      {activePage === 'product-detail' && <ProductDetailView />}
      {activePage === 'cart' && <CartView />}
      {activePage === 'checkout' && <CheckoutView />}
      {activePage === 'order-success' && <OrderSuccessView />}
      {activePage === 'story' && <OurStoryView />}
      {activePage === 'contact' && <OurStoryView />}
      {activePage === 'terms' && <TermsConditionsView />}
      {activePage === 'shipping' && <ShippingReturnsView />}
      {activePage === 'account' && <AccountView />}
      {activePage === 'subscriptions' && <SubscriptionsView />}
      {activePage === 'track-order' && <TrackOrderView />}
      {activePage === 'admin' && <AdminDashboardView />}
    </main>
  );
};

const AppShell: React.FC = () => {
  const { isOutletPickerOpen, setIsOutletPickerOpen, selectedOutlet, setSelectedOutlet } = useShop();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <MainContent />
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <AuthModal />
      <LabReportModal />
      <ToastContainer />
      <MobileBottomNav />

      {/* Factory Outlet Location Picker Modal */}
      <OutletPickerModal
        isOpen={isOutletPickerOpen}
        onClose={() => setIsOutletPickerOpen(false)}
        selectedOutlet={selectedOutlet}
        onSelectOutlet={setSelectedOutlet}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
};

export default App;
