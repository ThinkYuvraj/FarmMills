import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShieldCheck,
  Mail,
  User,
  Lock,
  Phone,
  Fingerprint,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    signup,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    loginWithPasskey
  } = useShop();

  const [mode, setMode] = useState<'signin' | 'signup' | 'passkey'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        await signup(name, email, password, phone);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      // toast shown in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      // toast shown
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithApple();
    } catch (err) {
      // toast shown
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithPasskey(email);
    } catch (err) {
      // toast shown
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          padding: '32px',
          borderRadius: '24px',
          background: '#ffffff',
          boxShadow: '0 24px 60px rgba(30, 43, 23, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <img
            src="/images/farmers-mill-logo.png"
            alt="Farmers Mill"
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
          />
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#E1EBCB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E3415'
            }}
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#5C6E52', marginBottom: '20px' }}>
          {mode === 'signup'
            ? 'Join our farm patron circle for priority morning stone-milling & exclusive member discounts.'
            : 'Sign in to track live chakki milling, manage subscriptions, and access saved addresses.'}
        </p>

        {/* 3-Way Mode Switcher */}
        <div style={{ display: 'flex', background: '#F2F6E6', padding: '4px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #D3E0BC' }}>
          <button
            type="button"
            onClick={() => setMode('signin')}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              background: mode === 'signin' ? '#3F6B2C' : 'transparent',
              color: mode === 'signin' ? '#ffffff' : '#1E2B17',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              background: mode === 'signup' ? '#3F6B2C' : 'transparent',
              color: mode === 'signup' ? '#ffffff' : '#1E2B17',
              transition: 'all 0.2s'
            }}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode('passkey')}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              background: mode === 'passkey' ? '#3F6B2C' : 'transparent',
              color: mode === 'passkey' ? '#ffffff' : '#1E2B17',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transition: 'all 0.2s'
            }}
          >
            <Fingerprint size={14} />
            <span>Passkey</span>
          </button>
        </div>

        {/* Passkey Biometric Dedicated Mode */}
        {mode === 'passkey' ? (
          <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#F2F6E6',
                border: '2px solid #D3E0BC',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3F6B2C'
              }}
            >
              <Fingerprint size={38} />
            </div>

            <h3 style={{ fontSize: '20px', color: '#1E2B17' }}>Sign In with Passkey</h3>
            <p style={{ fontSize: '13.5px', color: '#5C6E52', marginTop: '6px', maxWidth: '320px', margin: '6px auto 20px' }}>
              Authenticate instantaneously using Touch ID, Face ID, or your device screen lock without entering passwords.
            </p>

            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                Account Email (Optional)
              </label>
              <input
                type="email"
                placeholder="priya.sharma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handlePasskeyLogin}
              className="btn p lg"
              style={{ width: '100%', padding: '14px' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Verifying Biometric...</span>
                </>
              ) : (
                <>
                  <Fingerprint size={18} />
                  <span>Use Face ID / Touch ID</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Email / Password Form */
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '12px', color: '#5C6E52', background: 'none', border: 'none' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn p"
              style={{ width: '100%', padding: '14px', marginTop: '6px' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Processing...</span>
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>Create Patron Account</span>
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0 16px' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#D3E0BC' }} />
          <span style={{ position: 'relative', background: '#ffffff', padding: '0 12px', fontSize: '12px', color: '#7E9171', fontWeight: 600 }}>
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social & Passkey Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Sign in with Google */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="btn g"
            style={{
              width: '100%',
              padding: '11px',
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
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Sign in with Apple */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleAppleLogin}
            className="btn g"
            style={{
              width: '100%',
              padding: '11px',
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

        <p style={{ fontSize: '12px', color: '#7E9171', textAlign: 'center', marginTop: '18px' }}>
          By continuing, you agree to Farmers Mill Purity Charter &amp; encrypted authentication terms.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
