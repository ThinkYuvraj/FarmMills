import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { Order, Product, SubscriptionItem, AdminStats } from '../types';
import {
  TrendingUp,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  Filter,
  Eye,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  Plus,
  Minus
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { setActivePage, showToast, openTrackOrder } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'payments' | 'inventory' | 'milling' | 'subscriptions'>('orders');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters for orders
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update modal / action
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const [statsData, ordersData, productsData, subsData] = await Promise.all([
        api.getAdminStats(),
        api.getOrders(),
        api.getProducts(),
        api.getSubscriptions()
      ]);

      setStats(statsData);
      setOrders(ordersData);
      setProducts(productsData);
      setSubscriptions(subsData);
    } catch (err: any) {
      showToast(err.message || 'Failed to load admin data', 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, customNote?: string) => {
    setIsUpdatingStatus(true);
    try {
      const note = customNote || `Status changed to ${newStatus} by Store Operations Manager.`;
      const updated = await api.updateAdminOrderStatus(orderId, newStatus, note);
      
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      showToast(`Order #${orderId} marked as ${newStatus}`, 'success');
      loadData(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to update order status', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Update payment status (e.g. for COD orders collected at door)
  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const updated = await api.updateAdminPaymentStatus(orderId, paymentStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      showToast(`Payment for #${orderId} marked as ${paymentStatus}`, 'success');
      loadData(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to update payment status', 'error');
    }
  };

  // Update stock level
  const handleUpdateStock = async (productId: string, packSize: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      const updated = await api.updateAdminProductStock(productId, packSize, newStock);
      setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));
      showToast(`Stock updated for ${packSize} to ${newStock} units`, 'success');
      loadData(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to update stock', 'error');
    }
  };

  // Update subscription status
  const handleUpdateSubscriptionStatus = async (subId: string, newStatus: string) => {
    try {
      await api.updateAdminSubscriptionStatus(subId, newStatus);
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === subId ? { ...s, status: newStatus as any } : s))
      );
      showToast(`Subscription ${subId} is now ${newStatus}`, 'success');
      loadData(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to update subscription', 'error');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'ALL') {
      if (!o.status.toLowerCase().includes(orderStatusFilter.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = (o.id || '').toLowerCase().includes(q);
      const matchName = (o.shippingAddress?.fullName || '').toLowerCase().includes(q);
      const matchPhone = (o.shippingAddress?.phone || '').includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div style={{ background: '#F2F6E6', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Admin Header Bar */}
      <div
        style={{
          background: '#1E2B17',
          color: '#FBFDF5',
          borderBottom: '1px solid #3F6B2C',
          padding: '14px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div
          className="w"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setActivePage('home')}
              className="btn g sm"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#E1EBCB',
                borderColor: 'rgba(225, 235, 203, 0.3)',
                padding: '6px 14px',
                fontSize: '13px'
              }}
              title="Return to public customer store"
            >
              <ArrowLeft size={15} />
              <span>Back to Store</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/images/farmers-mill-logo.png"
                alt="Farmers Mill"
                style={{ height: '32px', width: 'auto', background: '#ffffff', borderRadius: '6px', padding: '2px 6px' }}
              />
              <div>
                <b style={{ fontSize: '16px', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                  Operations &amp; Milling Admin Console
                </b>
                <span style={{ fontSize: '11.5px', color: '#A9BF93' }}>
                  Live Chakki Management · Order Fulfilment · Razorpay Payments
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                background: 'rgba(63, 107, 44, 0.4)',
                padding: '5px 12px',
                borderRadius: '999px',
                color: '#CBE3B0',
                border: '1px solid rgba(225, 235, 203, 0.2)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7BC652', animation: 'pulse 2s infinite' }} />
              <span>Chakkis Active (4 Units)</span>
            </div>

            <button
              onClick={() => loadData(true)}
              className="btn g sm"
              disabled={isRefreshing}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                borderColor: 'rgba(225, 235, 203, 0.3)',
                padding: '6px 12px',
                fontSize: '12.5px'
              }}
            >
              <RefreshCw size={14} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w" style={{ paddingTop: '28px' }}>
        {/* Top KPI Metrics Cards */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}
          >
            {/* Revenue Metric */}
            <div
              className="card"
              style={{
                padding: '20px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>Total Gross Revenue</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EDF3DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C' }}>
                  <TrendingUp size={18} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E2B17', marginTop: '8px' }}>
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: '#5C6E52', marginTop: '6px', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#2E7D32' }}>Online: ₹{stats.onlineRevenue}</span>
                <span>·</span>
                <span>COD: ₹{stats.codRevenue}</span>
              </div>
            </div>

            {/* Total Orders Metric */}
            <div
              className="card"
              style={{
                padding: '20px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>Orders Fulfilment</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EDF3DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C' }}>
                  <Package size={18} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E2B17', marginTop: '8px' }}>
                {stats.totalOrders} <span style={{ fontSize: '14px', fontWeight: 500, color: '#5C6E52' }}>Batches</span>
              </div>
              <div style={{ fontSize: '12px', color: '#5C6E52', marginTop: '6px' }}>
                <b style={{ color: '#D4A346' }}>{stats.orderStatusCounts.milling}</b> Milled on Chakki · <b style={{ color: '#2E7D32' }}>{stats.orderStatusCounts.delivered}</b> Delivered
              </div>
            </div>

            {/* Subscriptions Metric */}
            <div
              className="card"
              style={{
                padding: '20px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>Active Subscriptions</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EDF3DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C' }}>
                  <RotateCcw size={18} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E2B17', marginTop: '8px' }}>
                {stats.activeSubscriptionsCount} <span style={{ fontSize: '14px', fontWeight: 500, color: '#5C6E52' }}>Families</span>
              </div>
              <div style={{ fontSize: '12px', color: '#5C6E52', marginTop: '6px' }}>
                15% Recurring Discount · Bi-weekly &amp; Monthly
              </div>
            </div>

            {/* Inventory Units Metric */}
            <div
              className="card"
              style={{
                padding: '20px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#5C6E52', fontWeight: 600 }}>Stock Units in Mill</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EDF3DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C' }}>
                  <Layers size={18} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E2B17', marginTop: '8px' }}>
                {stats.totalStockUnits} <span style={{ fontSize: '14px', fontWeight: 500, color: '#5C6E52' }}>Packs</span>
              </div>
              <div style={{ fontSize: '12px', color: stats.lowStockItems.length > 0 ? '#D94436' : '#2E7D32', marginTop: '6px' }}>
                {stats.lowStockItems.length > 0 ? (
                  <span>⚠️ {stats.lowStockItems.length} packs low on stock</span>
                ) : (
                  <span>✅ All packs well-stocked</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid #D3E0BC',
            paddingBottom: '2px',
            marginBottom: '24px',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'orders', label: 'Order Fulfilment', icon: <Package size={17} />, count: orders.length },
            { id: 'payments', label: 'Payments & Razorpay', icon: <CreditCard size={17} /> },
            { id: 'inventory', label: 'Inventory & Packs', icon: <Layers size={17} />, count: products.length },
            { id: 'milling', label: 'Stone Chakkis Live', icon: <Activity size={17} /> },
            { id: 'subscriptions', label: 'Subscriptions', icon: <RotateCcw size={17} />, count: subscriptions.length }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px 12px 0 0',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14.5px',
                  color: isActive ? '#3F6B2C' : '#5C6E52',
                  background: isActive ? '#ffffff' : 'transparent',
                  border: isActive ? '1.5px solid #D3E0BC' : '1.5px solid transparent',
                  borderBottom: isActive ? '2px solid #ffffff' : 'none',
                  marginBottom: isActive ? '-2px' : '0',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '11.5px',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      background: isActive ? '#3F6B2C' : '#EDF3DF',
                      color: isActive ? '#ffffff' : '#5C6E52',
                      fontWeight: 700
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS FULFILMENT */}
        {activeTab === 'orders' && (
          <div>
            {/* Order Controls Bar */}
            <div
              className="card"
              style={{
                padding: '16px 20px',
                background: '#ffffff',
                border: '1px solid #D3E0BC',
                borderRadius: '16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#5C6E52', marginRight: '6px' }}>Filter:</span>
                {['ALL', 'Confirmed', 'Milled', 'Dispatched', 'Delivered', 'Cancelled'].map((st) => {
                  const isSel = orderStatusFilter === st;
                  return (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: isSel ? 700 : 500,
                        background: isSel ? '#3F6B2C' : '#EDF3DF',
                        color: isSel ? '#ffffff' : '#1E2B17',
                        border: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>

              {/* Search Orders */}
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="Search order ID, customer, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 14px 8px 34px',
                    borderRadius: '10px',
                    border: '1.5px solid #D3E0BC',
                    fontSize: '13px',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                />
                <Search size={15} style={{ position: 'absolute', left: '11px', top: '10px', color: '#5C6E52' }} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '10px', top: '8px', color: '#8E9F84' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Orders List / Table */}
            {filteredOrders.length === 0 ? (
              <div
                className="card"
                style={{
                  padding: '60px 20px',
                  background: '#ffffff',
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: '1px solid #D3E0BC'
                }}
              >
                <Package size={42} color="#8E9F84" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', color: '#1E2B17' }}>No orders found</h4>
                <p style={{ color: '#5C6E52', fontSize: '14px', marginTop: '4px' }}>
                  {searchQuery || orderStatusFilter !== 'ALL'
                    ? 'Try clearing your search query or filter tags.'
                    : 'Customer orders will appear here as soon as they are placed.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;
                  const isPaid = order.paymentStatus === 'PAID';

                  return (
                    <div
                      key={order.id}
                      className="card"
                      style={{
                        padding: '22px',
                        background: '#ffffff',
                        border: isSelected ? '2px solid #3F6B2C' : '1.5px solid #D3E0BC',
                        borderRadius: '16px',
                        boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Order Header & Customer */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                fontSize: '15px',
                                fontWeight: 800,
                                color: '#1E2B17',
                                letterSpacing: '0.02em',
                                background: '#EDF3DF',
                                padding: '4px 10px',
                                borderRadius: '8px'
                              }}
                            >
                              #{order.id}
                            </span>
                            <span style={{ fontSize: '13px', color: '#5C6E52' }}>{order.date}</span>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '999px',
                                background: isPaid ? '#DEF7EC' : '#FEF08A',
                                color: isPaid ? '#03543F' : '#854D0E',
                                textTransform: 'uppercase'
                              }}
                            >
                              {isPaid ? 'PAID' : 'PAYMENT PENDING (COD)'}
                            </span>
                          </div>

                          <div style={{ marginTop: '8px', fontSize: '14px', color: '#1E2B17' }}>
                            <b>{order.shippingAddress.fullName}</b> ·{' '}
                            <span style={{ color: '#5C6E52' }}>{order.shippingAddress.phone}</span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                            {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                          </div>
                          <div style={{ fontSize: '12.5px', color: '#3F6B2C', fontWeight: 600, marginTop: '4px' }}>
                            Slot: {order.deliverySlot || 'Standard Delivery'}
                          </div>
                        </div>

                        {/* Order Amount & Quick Status Actions */}
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1E2B17' }}>
                            ₹{order.total}
                          </div>
                          <span
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 700,
                              color: '#ffffff',
                              background: '#3F6B2C',
                              padding: '4px 12px',
                              borderRadius: '999px'
                            }}
                          >
                            Status: {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items row */}
                      <div
                        style={{
                          marginTop: '16px',
                          paddingTop: '14px',
                          borderTop: '1px solid #EDF3DF',
                          display: 'flex',
                          gap: '12px',
                          flexWrap: 'wrap'
                        }}
                      >
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#F9FBF5',
                              border: '1px solid #E1EBCB',
                              padding: '6px 12px',
                              borderRadius: '10px',
                              fontSize: '13px'
                            }}
                          >
                            <span style={{ fontWeight: 600, color: '#1E2B17' }}>{it.name}</span>
                            <span style={{ color: '#5C6E52' }}>({it.packSize})</span>
                            <span style={{ background: '#3F6B2C', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '1px 6px', borderRadius: '999px' }}>
                              &times;{it.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Action Controls Bar */}
                      <div
                        style={{
                          marginTop: '16px',
                          paddingTop: '14px',
                          borderTop: '1px dashed #D3E0BC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#5C6E52' }}>Advance Status:</span>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'Milled on Chakki', 'Slow stone milling completed at 38°C on Emery Chakki #1')}
                            disabled={isUpdatingStatus}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: order.status === 'Milled on Chakki' ? '#3F6B2C' : '#EDF3DF',
                              color: order.status === 'Milled on Chakki' ? '#ffffff' : '#1E2B17'
                            }}
                          >
                            🌾 Mark Milled
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'Packed & Dispatched', 'Airtight nitrogen flush packaging sealed & dispatched')}
                            disabled={isUpdatingStatus}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: order.status === 'Packed & Dispatched' ? '#3F6B2C' : '#EDF3DF',
                              color: order.status === 'Packed & Dispatched' ? '#ffffff' : '#1E2B17'
                            }}
                          >
                            🚚 Mark Dispatched
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'Delivered', 'Package safely handed over at customer doorstep')}
                            disabled={isUpdatingStatus}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: order.status === 'Delivered' ? '#2E7D32' : '#EDF3DF',
                              color: order.status === 'Delivered' ? '#ffffff' : '#1E2B17'
                            }}
                          >
                            ✅ Mark Delivered
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {!isPaid && (
                            <button
                              onClick={() => handleUpdatePaymentStatus(order.id, 'PAID')}
                              className="btn sm"
                              style={{
                                background: '#FEF08A',
                                color: '#854D0E',
                                border: '1px solid #FACC15',
                                padding: '6px 12px',
                                fontSize: '12px'
                              }}
                            >
                              💵 Collect COD Payment
                            </button>
                          )}
                          <button
                            onClick={() => openTrackOrder(order.id)}
                            className="btn g sm"
                            style={{ padding: '6px 14px', fontSize: '12px' }}
                          >
                            <Eye size={14} />
                            <span>Customer View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PAYMENTS & RAZORPAY */}
        {activeTab === 'payments' && (
          <div>
            {/* Razorpay Gateway Status Card */}
            {stats && (
              <div
                className="card"
                style={{
                  padding: '24px',
                  background: '#ffffff',
                  border: '1.5px solid #D3E0BC',
                  borderRadius: '16px',
                  marginBottom: '24px',
                  boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0B2545', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>Razorpay Payment Gateway</h3>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '999px',
                            background: stats.razorpayConfig.isTestMode ? '#FEF3D6' : '#DEF7EC',
                            color: stats.razorpayConfig.isTestMode ? '#946808' : '#03543F'
                          }}
                        >
                          {stats.razorpayConfig.isTestMode ? 'SANDBOX SIMULATOR (SAFE TEST MODE)' : 'LIVE PRODUCTION'}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '4px' }}>
                        Key ID: <code>{stats.razorpayConfig.keyId}</code> · Currency: {stats.razorpayConfig.currency} · Webhook: Active
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>Online Captures</span>
                      <b style={{ fontSize: '18px', color: '#2E7D32' }}>₹{stats.onlineRevenue}</b>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>COD Receivables</span>
                      <b style={{ fontSize: '18px', color: '#1E2B17' }}>₹{stats.codRevenue}</b>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Transactions Ledger */}
            <div
              className="card"
              style={{
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #D3E0BC', background: '#FBFDF5' }}>
                <h4 style={{ fontSize: '16px', color: '#1E2B17' }}>Transactions &amp; Authorizations Ledger</h4>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: '#F4F8EC', color: '#5C6E52', textAlign: 'left', borderBottom: '1px solid #D3E0BC' }}>
                      <th style={{ padding: '12px 18px' }}>Order ID</th>
                      <th style={{ padding: '12px 18px' }}>Date</th>
                      <th style={{ padding: '12px 18px' }}>Customer</th>
                      <th style={{ padding: '12px 18px' }}>Method</th>
                      <th style={{ padding: '12px 18px' }}>Gateway Ref</th>
                      <th style={{ padding: '12px 18px' }}>Amount</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                      <th style={{ padding: '12px 18px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => {
                      const isPaid = o.paymentStatus === 'PAID';
                      return (
                        <tr key={o.id} style={{ borderBottom: '1px solid #EDF3DF' }}>
                          <td style={{ padding: '14px 18px', fontWeight: 700, color: '#3F6B2C' }}>#{o.id}</td>
                          <td style={{ padding: '14px 18px', color: '#5C6E52' }}>{o.date}</td>
                          <td style={{ padding: '14px 18px', color: '#1E2B17', fontWeight: 600 }}>{o.shippingAddress.fullName}</td>
                          <td style={{ padding: '14px 18px', color: '#5C6E52' }}>{o.paymentMethod}</td>
                          <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontSize: '12px', color: '#1E2B17' }}>
                            {o.razorpayPaymentId || o.razorpayOrderId || '—'}
                          </td>
                          <td style={{ padding: '14px 18px', fontWeight: 700, color: '#1E2B17' }}>₹{o.total}</td>
                          <td style={{ padding: '14px 18px' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '999px',
                                background: isPaid ? '#DEF7EC' : '#FEF08A',
                                color: isPaid ? '#03543F' : '#854D0E'
                              }}
                            >
                              {isPaid ? 'PAID' : 'PENDING'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            {!isPaid ? (
                              <button
                                onClick={() => handleUpdatePaymentStatus(o.id, 'PAID')}
                                className="btn sm"
                                style={{ background: '#3F6B2C', color: '#ffffff', padding: '4px 10px', fontSize: '11.5px' }}
                              >
                                Mark Paid
                              </button>
                            ) : (
                              <span style={{ fontSize: '12px', color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Check size={14} /> Captured
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY & STOCK */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              className="card"
              style={{
                padding: '16px 20px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <h4 style={{ fontSize: '18px', color: '#1E2B17' }}>Active Milling Grains &amp; Pack Stock</h4>
                <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                  Adjust live stock per pack size. Low stock threshold alert triggers at &le; 25 units.
                </p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3F6B2C', background: '#EDF3DF', padding: '6px 14px', borderRadius: '999px' }}>
                Total Products: {products.length}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="card"
                  style={{
                    padding: '20px',
                    background: '#ffffff',
                    border: '1.5px solid #D3E0BC',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(30, 43, 23, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #D3E0BC' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#3F6B2C', textTransform: 'uppercase' }}>
                        {prod.category}
                      </span>
                      <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {prod.name}
                      </b>
                      <span style={{ fontSize: '11.5px', color: '#8E9F84' }}>Batch: {prod.batchCode || 'LIVE-2026'}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {prod.packOptions.map((opt) => {
                      const stock = opt.stock ?? 50;
                      const isLow = stock <= 25;
                      return (
                        <div
                          key={opt.size}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            background: isLow ? '#FFF7F7' : '#F9FBF5',
                            border: isLow ? '1px solid #FEB2B2' : '1px solid #E1EBCB',
                            borderRadius: '10px',
                            fontSize: '13px'
                          }}
                        >
                          <div>
                            <b style={{ color: '#1E2B17' }}>{opt.size}</b>
                            <span style={{ color: '#5C6E52', marginLeft: '6px' }}>₹{opt.price}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                fontSize: '11.5px',
                                fontWeight: 700,
                                color: isLow ? '#9B1C1C' : '#2E5220',
                                marginRight: '4px'
                              }}
                            >
                              {stock} units {isLow && '(Low)'}
                            </span>
                            <button
                              onClick={() => handleUpdateStock(prod.id, opt.size, stock, -5)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                background: '#ffffff',
                                border: '1px solid #D3E0BC',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1E2B17'
                              }}
                              title="Decrease 5 units"
                            >
                              <Minus size={13} />
                            </button>
                            <button
                              onClick={() => handleUpdateStock(prod.id, opt.size, stock, 10)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                background: '#3F6B2C',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff'
                              }}
                              title="Add 10 units from fresh milling"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STONE CHAKKIS LIVE */}
        {activeTab === 'milling' && stats && (
          <div>
            <div
              className="card"
              style={{
                padding: '24px',
                background: '#ffffff',
                border: '1.5px solid #D3E0BC',
                borderRadius: '16px',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>Cold Stone Emery Chakki Status</h3>
                  <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '4px' }}>
                    All chakkis are kept below 38°C to prevent thermal degradation of grain germ oil, vitamin B complex, and live enzymes.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Dispatched automated batch run command to Master Miller console!', 'success')}
                  className="btn p sm"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  ⚡ Trigger 5:00 AM Dawn Batch
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  marginTop: '24px'
                }}
              >
                {stats.millingChakkis.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      background: '#F9FBF5',
                      border: '1.5px solid #D3E0BC'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#3F6B2C', textTransform: 'uppercase' }}>
                        {c.status}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2E7D32', background: '#DEF7EC', padding: '2px 8px', borderRadius: '999px' }}>
                        {c.temperature}
                      </span>
                    </div>

                    <b style={{ fontSize: '15px', color: '#1E2B17', display: 'block', marginTop: '8px' }}>{c.id}</b>
                    <span style={{ fontSize: '12.5px', color: '#5C6E52', display: 'block', marginTop: '2px' }}>
                      Master: {c.miller}
                    </span>

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #EDF3DF', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5C6E52' }}>
                      <span>Speed: <b>{c.rpm} RPM</b></span>
                      <span>Capacity Load: <b>{c.load}</b></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div
            className="card"
            style={{
              background: '#ffffff',
              border: '1.5px solid #D3E0BC',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #D3E0BC', background: '#FBFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px', color: '#1E2B17' }}>Active Subscribe &amp; Save Memberships</h4>
                <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                  Weekly, bi-weekly, and monthly subscribers receiving automated freshly milled deliveries.
                </p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#3F6B2C', background: '#EDF3DF', padding: '6px 14px', borderRadius: '999px' }}>
                {subscriptions.length} Subscriptions
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#F4F8EC', color: '#5C6E52', textAlign: 'left', borderBottom: '1px solid #D3E0BC' }}>
                    <th style={{ padding: '12px 18px' }}>Sub ID</th>
                    <th style={{ padding: '12px 18px' }}>Product</th>
                    <th style={{ padding: '12px 18px' }}>Pack</th>
                    <th style={{ padding: '12px 18px' }}>Frequency</th>
                    <th style={{ padding: '12px 18px' }}>Next Batch</th>
                    <th style={{ padding: '12px 18px' }}>Discounted Rate</th>
                    <th style={{ padding: '12px 18px' }}>Status</th>
                    <th style={{ padding: '12px 18px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => {
                    const isActive = sub.status === 'ACTIVE';
                    return (
                      <tr key={sub.id} style={{ borderBottom: '1px solid #EDF3DF' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: '#3F6B2C' }}>#{sub.id}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1E2B17' }}>{sub.productName}</td>
                        <td style={{ padding: '14px 18px', color: '#5C6E52' }}>{sub.packSize}</td>
                        <td style={{ padding: '14px 18px', color: '#1E2B17' }}>{sub.frequency}</td>
                        <td style={{ padding: '14px 18px', color: '#5C6E52' }}>{sub.nextDeliveryDate}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: '#2E7D32' }}>₹{sub.discountedPrice}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '999px',
                              background: isActive ? '#DEF7EC' : '#FDE8E8',
                              color: isActive ? '#03543F' : '#9B1C1C'
                            }}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          {isActive ? (
                            <button
                              onClick={() => handleUpdateSubscriptionStatus(sub.id, 'PAUSED')}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                background: '#FEF3D6',
                                color: '#946808',
                                border: '1px solid #FACC15'
                              }}
                            >
                              Pause
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateSubscriptionStatus(sub.id, 'ACTIVE')}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                background: '#EDF3DF',
                                color: '#3F6B2C',
                                border: '1px solid #B8CC98'
                              }}
                            >
                              Resume
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
export default AdminDashboardView;
