import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { Order } from '../types';
import { OrderTracker } from '../components/OrderTracker';
import { Search, Package, Sparkles, AlertCircle, ArrowRight, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

export const TrackOrderView: React.FC = () => {
  const { trackingOrderId, setTrackingOrderId, orders, latestOrder, setActivePage } = useShop();

  const [inputOrderId, setInputOrderId] = useState<string>(trackingOrderId || latestOrder?.id || orders[0]?.id || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Auto-search if trackingOrderId is provided
  useEffect(() => {
    if (trackingOrderId) {
      setInputOrderId(trackingOrderId);
      handleSearch(trackingOrderId);
    } else if (latestOrder) {
      setActiveOrder(latestOrder);
      setHasSearched(true);
    } else if (orders.length > 0) {
      setActiveOrder(orders[0]);
      setHasSearched(true);
    }
  }, [trackingOrderId]);

  const handleSearch = async (orderIdToSearch?: string) => {
    const rawId = (orderIdToSearch || inputOrderId).trim();
    if (!rawId) {
      setErrorMessage('Please enter a valid Order ID (e.g. FM-73914).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      // 1. Fetch from backend API
      const fetchedOrder = await api.getOrder(rawId);
      if (fetchedOrder) {
        setActiveOrder(fetchedOrder);
        setTrackingOrderId(fetchedOrder.id);
      } else {
        // Fallback to local state if server couldn't locate
        const localMatch = orders.find(
          (o) =>
            o.id.toUpperCase() === rawId.toUpperCase() ||
            o.id.replace(/\D/g, '') === rawId.replace(/\D/g, '')
        );
        if (localMatch) {
          setActiveOrder(localMatch);
          setTrackingOrderId(localMatch.id);
        } else {
          setActiveOrder(null);
          setErrorMessage(`No order found matching "${rawId}". Please check your order ID or receipt.`);
        }
      }
    } catch (err: any) {
      // Local fallback lookup
      const localMatch = orders.find(
        (o) =>
          o.id.toUpperCase() === rawId.toUpperCase() ||
          o.id.replace(/\D/g, '') === rawId.replace(/\D/g, '')
      );
      if (localMatch) {
        setActiveOrder(localMatch);
        setTrackingOrderId(localMatch.id);
      } else {
        setActiveOrder(null);
        setErrorMessage(`Could not retrieve order "${rawId}". Please ensure the ID is correct.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const selectSuggestedOrder = (ordId: string) => {
    setInputOrderId(ordId);
    handleSearch(ordId);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Hero Header */}
      <section style={{ background: '#1E2B17', color: '#ffffff', paddingTop: '56px', paddingBottom: '56px' }}>
        <div className="w" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#ffffff', lineHeight: 1.15 }}>
            Track Your Fresh Milling Order
          </h1>

          <p style={{ fontSize: '16px', color: '#B3C4A5', marginTop: '12px', maxWidth: '620px', margin: '12px auto 0' }}>
            Follow your grains from hopper scheduling to low-heat stone grinding, airtight sealing, and doorstep delivery.
          </p>

          {/* Search Box Form */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: 'flex',
              gap: '10px',
              background: '#ffffff',
              padding: '8px',
              borderRadius: '999px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
              maxWidth: '560px',
              margin: '32px auto 0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '16px' }}>
              <Search size={20} color="#5C6E52" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. FM-73914 or 73914)"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#1E2B17',
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn p"
              style={{ padding: '12px 28px', flex: 'none' }}
            >
              {isLoading ? (
                <span>Tracking...</span>
              ) : (
                <>
                  <span>Track Order</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Recent Orders Suggestion Chips */}
          {orders.length > 0 && (
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '13px' }}>
              <span style={{ color: '#8E9F84' }}>Your recent orders:</span>
              {orders.slice(0, 3).map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => selectSuggestedOrder(ord.id)}
                  style={{
                    background: inputOrderId === ord.id ? '#3F6B2C' : 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12.5px',
                    border: '1px solid rgba(225,235,203,0.25)'
                  }}
                >
                  #{ord.id} ({ord.date})
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Tracking Content */}
      <section className="w" style={{ maxWidth: '960px', marginTop: '40px' }}>
        {/* Error Notification */}
        {errorMessage && (
          <div
            className="card"
            style={{
              padding: '24px',
              background: '#FFF5F5',
              border: '1px solid #FED7D7',
              color: '#C53030',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '24px'
            }}
          >
            <AlertCircle size={24} style={{ flex: 'none' }} />
            <div>
              <b style={{ fontSize: '16px', display: 'block' }}>Order Not Found</b>
              <p style={{ fontSize: '14px', marginTop: '2px' }}>{errorMessage}</p>
              <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleSearch('FM-73914')}
                  style={{ color: '#3F6B2C', fontWeight: 600, textDecoration: 'underline', fontSize: '13px' }}
                >
                  Try demo order #FM-73914
                </button>
                <button
                  onClick={() => setActivePage('account')}
                  style={{ color: '#3F6B2C', fontWeight: 600, textDecoration: 'underline', fontSize: '13px' }}
                >
                  View all orders in My Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Order Tracker Component */}
        {activeOrder && (
          <OrderTracker
            order={activeOrder}
            onRefresh={() => handleSearch(activeOrder.id)}
            isRefreshing={isLoading}
          />
        )}

        {/* Empty State / Instructional Callout if no order active */}
        {!activeOrder && !errorMessage && !isLoading && (
          <div className="card" style={{ padding: '60px 32px', textAlign: 'center', background: '#ffffff' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F2F6E6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#3F6B2C' }}>
              <Package size={32} />
            </div>
            <h3 style={{ fontSize: '22px', marginTop: '16px', color: '#1E2B17' }}>Enter your order number to track</h3>
            <p style={{ color: '#5C6E52', fontSize: '15px', maxWidth: '480px', margin: '8px auto 24px' }}>
              You will find your 5-digit Order ID in your order confirmation screen, invoice receipt, or transaction notification.
            </p>
            {orders.length > 0 && (
              <button
                className="btn p"
                onClick={() => selectSuggestedOrder(orders[0].id)}
              >
                Track Latest Order (#{orders[0].id})
              </button>
            )}
          </div>
        )}

        {/* Freshness Commitment Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div className="card" style={{ padding: '24px', background: '#FBFDF5' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#E1EBCB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', marginBottom: '14px' }}>
              <Clock size={20} />
            </div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Dawn Milling Schedule</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              All chakki flours are ground at 5:00 AM each morning. Orders placed before midnight are cold-ground at dawn and delivered warm the same day.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', background: '#FBFDF5' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#E1EBCB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', marginBottom: '14px' }}>
              <ShieldCheck size={20} />
            </div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Cold Stone Grinding (&lt; 40°C)</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Industrial roller mills heat grains up to 90°C, destroying live enzymes. Our emery stone chakkis run at 280 RPM to safeguard nutrients.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', background: '#FBFDF5' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#E1EBCB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3F6B2C', marginBottom: '14px' }}>
              <HelpCircle size={20} />
            </div>
            <b style={{ fontSize: '16px', color: '#1E2B17', display: 'block' }}>Need Help with Order?</b>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', lineHeight: 1.5 }}>
              Questions about grain varieties, customized coarse grind, or delivery rescheduling? Chat directly with our Master Miller team on WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackOrderView;
