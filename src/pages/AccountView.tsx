import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, MapPin, User, LogOut, Package, Clock, CheckCircle2, Repeat, Plus } from 'lucide-react';

export const AccountView: React.FC = () => {
  const { user, orders, logout, setActivePage, addToCart, setIsCartDrawerOpen, addToast } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  if (!user) {
    return (
      <div className="w" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px' }}>Please sign in to view your account</h2>
        <p style={{ marginTop: '10px', color: '#5C6E52' }}>Access your orders, saved addresses and delivery slots.</p>
        <button className="btn p" onClick={() => setActivePage('home')} style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      const prod = PRODUCTS.find((p) => p.id === item.id) || PRODUCTS[0];
      const pack = prod.packOptions.find((o) => o.size === item.packSize) || prod.packOptions[0];
      addToCart(prod, pack, item.quantity);
    });
    setIsCartDrawerOpen(true);
    addToast('Previous batch items added to cart!', 'success');
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#5C6E52', display: 'flex', gap: '6px' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C' }}>Home</a>
          <span>/</span>
          <span>My account</span>
          <span>/</span>
          <b style={{ color: '#1E2B17', textTransform: 'capitalize' }}>{activeTab}</b>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', marginTop: '10px' }}>
          Welcome, {user.name}
        </h1>

        {/* 2 Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            marginTop: '28px',
            alignItems: 'start'
          }}
        >
          {/* Sidebar Nav */}
          <nav
            className="card"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxWidth: '280px',
              background: '#ffffff'
            }}
          >
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                background: activeTab === 'orders' ? '#E1EBCB' : 'transparent',
                color: activeTab === 'orders' ? '#3F6B2C' : '#1E2B17',
                textAlign: 'left'
              }}
            >
              <Package size={18} />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                background: activeTab === 'addresses' ? '#E1EBCB' : 'transparent',
                color: activeTab === 'addresses' ? '#3F6B2C' : '#1E2B17',
                textAlign: 'left'
              }}
            >
              <MapPin size={18} />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                background: activeTab === 'profile' ? '#E1EBCB' : 'transparent',
                color: activeTab === 'profile' ? '#3F6B2C' : '#1E2B17',
                textAlign: 'left'
              }}
            >
              <User size={18} />
              <span>Profile Settings</span>
            </button>

            <div style={{ height: '1px', background: '#D3E0BC', margin: '8px 0' }} />

            <button
              onClick={() => {
                logout();
                setActivePage('home');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                color: '#D94436',
                textAlign: 'left'
              }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </nav>

          {/* Main Content Area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17' }}>Past &amp; Active Orders</h3>

                {orders.length === 0 ? (
                  <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: '#5C6E52' }}>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="card" style={{ padding: '24px', background: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D3E0BC', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <b style={{ fontSize: '18px', color: '#1E2B17' }}>Order #{ord.id}</b>
                          <span style={{ fontSize: '13px', color: '#5C6E52', marginLeft: '10px' }}>{ord.date}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span
                            className="badge"
                            style={{
                              background: ord.status === 'Delivered' ? '#E1EBCB' : '#FEF3D6',
                              color: ord.status === 'Delivered' ? '#2E5020' : '#946808'
                            }}
                          >
                            ● {ord.status}
                          </span>
                          <b style={{ fontSize: '18px', color: '#1E2B17' }}>₹{ord.total}</b>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
                        {ord.items.map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div className="ph" style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
                                <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <b style={{ fontSize: '14px', color: '#1E2B17' }}>{it.name}</b>
                                <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>
                                  {it.packSize} · Qty: {it.quantity}
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div style={{ borderTop: '1px solid #D3E0BC', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <span style={{ fontSize: '13px', color: '#5C6E52' }}>
                          Payment: <b>{ord.paymentMethod}</b>
                        </span>
                        <button
                          onClick={() => handleReorder(ord)}
                          className="btn g sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Repeat size={14} />
                          <span>Reorder This Fresh Batch</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17' }}>Saved Delivery Addresses</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="card" style={{ padding: '20px', background: '#ffffff', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <b style={{ fontSize: '16px', color: '#1E2B17' }}>{addr.tag}</b>
                        {addr.isDefault && (
                          <span className="badge" style={{ fontSize: '10px', padding: '2px 8px' }}>Default</span>
                        )}
                      </div>
                      <p style={{ fontSize: '14px', color: '#435538', lineHeight: 1.5 }}>
                        {addr.address}<br />
                        {addr.city} - {addr.pincode}
                      </p>
                      <button className="btn g sm" style={{ marginTop: '14px', padding: '6px 14px' }}>
                        Edit Address
                      </button>
                    </div>
                  ))}

                  <div
                    className="card"
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #B8CC98',
                      background: 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => addToast('Address editor opened in modal', 'info')}
                  >
                    <Plus size={24} color="#3F6B2C" />
                    <b style={{ color: '#3F6B2C', marginTop: '8px' }}>Add New Address</b>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card" style={{ padding: '32px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '24px', color: '#1E2B17', marginBottom: '20px' }}>Profile Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Full Name</label>
                    <input type="text" defaultValue={user.name} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input type="email" defaultValue={user.email} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Phone Number</label>
                    <input type="tel" defaultValue={user.phone} className="input-field" />
                  </div>
                </div>
                <button
                  className="btn p"
                  onClick={() => addToast('Profile changes saved successfully!', 'success')}
                  style={{ marginTop: '24px' }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
