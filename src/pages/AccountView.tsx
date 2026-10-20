import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import {
  ShoppingBag,
  MapPin,
  User,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  Repeat,
  Plus,
  Fingerprint,
  ShieldCheck,
  Key,
  Laptop,
  Smartphone,
  Trash2,
  Sparkles,
  Truck,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    user,
    orders,
    logout,
    setActivePage,
    addToCart,
    setIsCartDrawerOpen,
    addToast,
    openTrackOrder,
    signup,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    loginWithPasskey,
    registerPasskey
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'security' | 'addresses' | 'profile'>('orders');

  // Login / Signup Form state (when logged out)
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'passkey'>('signin');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Passkey state
  const [passkeyLabel, setPasskeyLabel] = useState('');
  const [isRegisteringKey, setIsRegisteringKey] = useState(false);

  // If user is not logged in, show the comprehensive Login/Signup Dashboard
  if (!user) {
    const handleAuthSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        if (authMode === 'signup') {
          await signup(signupName, loginEmail, loginPassword, signupPhone);
        } else {
          await loginWithEmail(loginEmail, loginPassword);
        }
      } catch (err) {
        // handled in context
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div style={{ paddingBottom: '90px' }}>
        <section style={{ background: '#1E2B17', color: '#ffffff', paddingTop: '48px', paddingBottom: '48px', textAlign: 'center' }}>
          <div className="w" style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '12px', background: 'rgba(225,235,203,0.15)', color: '#E1EBCB', padding: '4px 12px', borderRadius: '999px', fontWeight: 700 }}>
              🌿 FARM PATRON DASHBOARD
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', color: '#ffffff', marginTop: '12px' }}>
              Account Access &amp; Login
            </h1>
            <p style={{ fontSize: '15px', color: '#B3C4A5', marginTop: '8px' }}>
              Sign in with password, biometric Passkey, Google or Apple to manage your orders and chakki subscriptions.
            </p>
          </div>
        </section>

        <section className="w" style={{ maxWidth: '500px', marginTop: '-24px' }}>
          <div className="card" style={{ padding: '36px', background: '#ffffff', boxShadow: '0 12px 36px rgba(30,43,23,0.1)' }}>
            {/* Mode Switcher */}
            <div style={{ display: 'flex', background: '#F2F6E6', padding: '4px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #D3E0BC' }}>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  background: authMode === 'signin' ? '#3F6B2C' : 'transparent',
                  color: authMode === 'signin' ? '#ffffff' : '#1E2B17',
                  transition: 'all 0.2s'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  background: authMode === 'signup' ? '#3F6B2C' : 'transparent',
                  color: authMode === 'signup' ? '#ffffff' : '#1E2B17',
                  transition: 'all 0.2s'
                }}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('passkey')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  background: authMode === 'passkey' ? '#3F6B2C' : 'transparent',
                  color: authMode === 'passkey' ? '#ffffff' : '#1E2B17',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  transition: 'all 0.2s'
                }}
              >
                <Fingerprint size={15} />
                <span>Passkey</span>
              </button>
            </div>

            {/* Passkey Mode */}
            {authMode === 'passkey' ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F2F6E6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3F6B2C', border: '1px solid #D3E0BC' }}>
                  <Fingerprint size={32} />
                </div>
                <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>Biometric Fast Sign In</h3>
                <p style={{ fontSize: '13.5px', color: '#5C6E52', margin: '6px auto 20px', maxWidth: '340px' }}>
                  Use Touch ID, Face ID or Windows Hello security key to sign in securely without typing passwords.
                </p>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="priya.sharma@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    try {
                      await loginWithPasskey(loginEmail);
                    } catch (e) {} finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="btn p lg"
                  style={{ width: '100%', padding: '14px' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Verifying Passkey...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint size={18} />
                      <span>Verify with Face ID / Touch ID</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {authMode === 'signup' && (
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="input-field"
                    />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                    Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="input-field"
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '12px', color: '#5C6E52' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="input-field"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn p lg"
                  style={{ width: '100%', padding: '14px', marginTop: '6px' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Authenticating...</span>
                    </>
                  ) : authMode === 'signup' ? (
                    <>
                      <span>Create Account &amp; Access Dashboard</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Social Authentication Section */}
            <div style={{ position: 'relative', textAlign: 'center', margin: '22px 0 16px' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#D3E0BC' }} />
              <span style={{ position: 'relative', background: '#ffffff', padding: '0 12px', fontSize: '12px', color: '#7E9171', fontWeight: 600 }}>
                OR SIGN IN WITH
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => loginWithGoogle()}
                className="btn g"
                style={{
                  width: '100%',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: '1.5px solid #D3E0BC',
                  background: '#ffffff',
                  color: '#1E2B17',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => loginWithApple()}
                className="btn g"
                style={{
                  width: '100%',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: '1.5px solid #1E2B17',
                  background: '#1E2B17',
                  color: '#ffffff',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <svg width="17" height="17" viewBox="0 0 170 170" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.85-11.72-14.44-6.41-10.22-11.39-21.73-14.93-34.53-3.55-12.8-5.32-24.81-5.32-36.03 0-16.14 4.12-29.41 12.37-39.81 8.24-10.4 18.52-15.75 30.82-16.03 4.8 0 10.15 1.25 16.06 3.76 5.91 2.5 9.77 3.82 11.58 3.94 1.34-.12 5.4-1.51 12.18-4.18 6.78-2.67 12.44-3.88 16.99-3.64 12.8.68 23.3 5.37 31.5 14.07-11.19 6.79-16.69 16.27-16.5 28.44.18 9.53 3.86 17.5 11.05 23.91 7.18 6.41 15.67 10.18 25.47 11.31-2.24 6.78-4.86 13.77-7.86 20.97zM119.22 33.06c0-7.39 2.67-14.54 8.01-21.45 5.34-6.91 12.01-11.13 20.02-12.67.79 3.16 1.18 6.07 1.18 8.74 0 7.42-2.73 14.73-8.2 21.94-5.46 7.21-12.21 11.38-20.25 12.51-.27-2.68-.76-5.7-1.47-9.07h.71z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      const prod = PRODUCTS.find((p) => p.id === item.id) || PRODUCTS[0];
      const pack = prod.packOptions.find((o) => o.size === item.packSize) || prod.packOptions[0];
      addToCart(prod, pack, item.quantity);
    });
    setIsCartDrawerOpen(true);
    addToast('Previous batch items added to cart!', 'success');
  };

  const handleAddNewPasskey = async () => {
    setIsRegisteringKey(true);
    try {
      await registerPasskey(passkeyLabel || 'MacBook Touch ID / Phone Biometric');
      setPasskeyLabel('');
    } catch (err) {
      // toast shown in context
    } finally {
      setIsRegisteringKey(false);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <section className="w" style={{ paddingTop: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#5C6E52', display: 'flex', gap: '6px' }}>
          <a onClick={() => setActivePage('home')} style={{ color: '#3F6B2C' }}>Home</a>
          <span>/</span>
          <span>Patron Dashboard</span>
          <span>/</span>
          <b style={{ color: '#1E2B17', textTransform: 'capitalize' }}>{activeTab}</b>
        </div>

        {/* Dashboard Profile Banner */}
        <div
          className="card"
          style={{
            marginTop: '20px',
            padding: '28px 32px',
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#E1EBCB',
                color: '#2E5220',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '24px',
                border: '2px solid #3F6B2C'
              }}
            >
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '26px', color: '#1E2B17' }}>{user.name}</h1>
                <span style={{ fontSize: '12px', background: '#E1EBCB', color: '#1E3415', padding: '3px 10px', borderRadius: '999px', fontWeight: 700 }}>
                  Active Patron
                </span>
                {user.googleConnected && (
                  <span style={{ fontSize: '11px', background: '#E8F0FE', color: '#1967D2', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    Google Linked
                  </span>
                )}
                {user.appleConnected && (
                  <span style={{ fontSize: '11px', background: '#F1F3F4', color: '#202124', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    Apple Linked
                  </span>
                )}
              </div>
              <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '2px' }}>
                {user.email} · {user.phone} · Member since {user.memberSince || '2026'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActivePage('track-order')}
              className="btn g sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Truck size={15} />
              <span>Track Orders</span>
            </button>
            <button
              onClick={logout}
              className="btn g sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D94436', borderColor: '#F5C6CB' }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 2 Column Dashboard Layout */}
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
              <span>Orders &amp; Tracking ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                background: activeTab === 'security' ? '#E1EBCB' : 'transparent',
                color: activeTab === 'security' ? '#3F6B2C' : '#1E2B17',
                textAlign: 'left'
              }}
            >
              <Key size={18} />
              <span>Security &amp; Passkeys</span>
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
              <span>Saved Addresses ({user.addresses?.length || 1})</span>
            </button>

            <div style={{ height: '1px', background: '#D3E0BC', margin: '8px 0' }} />

            <button
              onClick={logout}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>Milling Batches &amp; Orders</h3>
                  <button onClick={() => setActivePage('track-order')} className="btn g sm" style={{ display: 'flex', gap: '6px' }}>
                    <Truck size={14} />
                    <span>Track with Order ID</span>
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: '#5C6E52' }}>You have not placed any orders yet.</p>
                    <button className="btn p sm" onClick={() => setActivePage('shop')} style={{ marginTop: '16px' }}>
                      Browse Fresh Flours &amp; Spices
                    </button>
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
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => openTrackOrder(ord.id)}
                            className="btn p sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Truck size={14} />
                            <span>Track Delivery</span>
                          </button>
                          <button
                            onClick={() => handleReorder(ord)}
                            className="btn g sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Repeat size={14} />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Security & Passkeys Tab (Modern Auth Dashboard) */}
            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>Security, Identity &amp; Passkeys</h3>
                  <p style={{ fontSize: '14px', color: '#5C6E52', marginTop: '4px' }}>
                    Manage biometric passkeys, social logins, and multi-device authentication credentials.
                  </p>
                </div>

                {/* Passkeys Section */}
                <div className="card" style={{ padding: '24px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <b style={{ fontSize: '17px', color: '#1E2B17', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Fingerprint size={20} color="#3F6B2C" />
                        <span>Biometric Passkeys (Touch ID / Face ID)</span>
                      </b>
                      <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                        Passkeys let you sign in with your fingerprint, facial recognition or device PIN.
                      </p>
                    </div>

                    <span style={{ fontSize: '12px', background: '#E1EBCB', color: '#2E5220', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
                      FIDO2 / WebAuthn
                    </span>
                  </div>

                  {/* Registered passkeys list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '16px 0' }}>
                    {user.passkeys && user.passkeys.length > 0 ? (
                      user.passkeys.map((pk) => (
                        <div
                          key={pk.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#F8FAF2',
                            border: '1px solid #D3E0BC'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Laptop size={20} color="#3F6B2C" />
                            <div>
                              <b style={{ fontSize: '14px', color: '#1E2B17' }}>{pk.name}</b>
                              <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>
                                Added on {pk.createdAt} {pk.lastUsedAt && `· Last used ${pk.lastUsedAt}`}
                              </span>
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 600 }}>Active</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '16px', background: '#F8FAF2', borderRadius: '12px', border: '1px dashed #D3E0BC', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: '#5C6E52' }}>
                          No passkeys registered on this device yet. Add one below for 1-click biometric sign-ins.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Add Passkey Form */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      placeholder="Passkey label (e.g. My MacBook Air / iPhone)"
                      value={passkeyLabel}
                      onChange={(e) => setPasskeyLabel(e.target.value)}
                      className="input-field"
                      style={{ flex: 1, minWidth: '220px' }}
                    />
                    <button
                      type="button"
                      disabled={isRegisteringKey}
                      onClick={handleAddNewPasskey}
                      className="btn p sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {isRegisteringKey ? (
                        <>
                          <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add Biometric Passkey</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Connected Identity Accounts */}
                <div className="card" style={{ padding: '24px', background: '#ffffff' }}>
                  <b style={{ fontSize: '17px', color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                    Connected Identity Providers
                  </b>
                  <p style={{ fontSize: '13px', color: '#5C6E52', marginBottom: '16px' }}>
                    Link third-party social accounts to sign in seamlessly across devices.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Google */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', background: '#F8FAF2', border: '1px solid #D3E0BC' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <div>
                          <b style={{ fontSize: '14px', color: '#1E2B17' }}>Google Account</b>
                          <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>
                            {user.googleConnected ? 'Connected & Verified' : 'Not linked'}
                          </span>
                        </div>
                      </div>

                      {user.googleConnected ? (
                        <span style={{ fontSize: '12px', background: '#E8F0FE', color: '#1967D2', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                          Connected
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => loginWithGoogle()}
                          className="btn g sm"
                        >
                          Link Google
                        </button>
                      )}
                    </div>

                    {/* Apple */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', background: '#F8FAF2', border: '1px solid #D3E0BC' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="20" height="20" viewBox="0 0 170 170" fill="#1E2B17">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.85-11.72-14.44-6.41-10.22-11.39-21.73-14.93-34.53-3.55-12.8-5.32-24.81-5.32-36.03 0-16.14 4.12-29.41 12.37-39.81 8.24-10.4 18.52-15.75 30.82-16.03 4.8 0 10.15 1.25 16.06 3.76 5.91 2.5 9.77 3.82 11.58 3.94 1.34-.12 5.4-1.51 12.18-4.18 6.78-2.67 12.44-3.88 16.99-3.64 12.8.68 23.3 5.37 31.5 14.07-11.19 6.79-16.69 16.27-16.5 28.44.18 9.53 3.86 17.5 11.05 23.91 7.18 6.41 15.67 10.18 25.47 11.31-2.24 6.78-4.86 13.77-7.86 20.97zM119.22 33.06c0-7.39 2.67-14.54 8.01-21.45 5.34-6.91 12.01-11.13 20.02-12.67.79 3.16 1.18 6.07 1.18 8.74 0 7.42-2.73 14.73-8.2 21.94-5.46 7.21-12.21 11.38-20.25 12.51-.27-2.68-.76-5.7-1.47-9.07h.71z" />
                        </svg>
                        <div>
                          <b style={{ fontSize: '14px', color: '#1E2B17' }}>Apple ID</b>
                          <span style={{ fontSize: '12px', color: '#5C6E52', display: 'block' }}>
                            {user.appleConnected ? 'Connected & Verified' : 'Not linked'}
                          </span>
                        </div>
                      </div>

                      {user.appleConnected ? (
                        <span style={{ fontSize: '12px', background: '#F1F3F4', color: '#202124', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                          Connected
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => loginWithApple()}
                          className="btn g sm"
                        >
                          Link Apple
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Session Sign Out Action Card */}
                <div className="card" style={{ padding: '24px', background: '#FFF5F5', border: '1px solid #FED7D7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <b style={{ fontSize: '16px', color: '#C53030' }}>Sign Out from Session</b>
                    <p style={{ fontSize: '13px', color: '#742A2A', marginTop: '2px' }}>
                      Terminates your current session token. You can sign back in anytime via Passkey or Password.
                    </p>
                  </div>
                  <button onClick={logout} className="btn sm" style={{ background: '#D94436', color: '#ffffff', padding: '10px 20px', borderRadius: '999px' }}>
                    Sign Out Now
                  </button>
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '22px', color: '#1E2B17' }}>Saved Delivery Addresses</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {user.addresses?.map((addr) => (
                    <div key={addr.id} className="card" style={{ padding: '20px', background: '#ffffff', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <b style={{ fontSize: '16px', color: '#1E2B17' }}>{addr.tag}</b>
                        {addr.isDefault && (
                          <span style={{ fontSize: '11px', background: '#E1EBCB', color: '#3F6B2C', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '14px', color: '#5C6E52', lineHeight: '1.5' }}>
                        {addr.address}<br />
                        {addr.city} - {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountView;
