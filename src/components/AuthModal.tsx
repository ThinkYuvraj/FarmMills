import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Phone, Mail, User } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useShop();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    // Perform login
    login(name || (isRegister ? 'New Patron' : 'Valued Patron'), phoneOrEmail || '+91 98765 43210');
  };

  const handleDemoLogin = () => {
    login('Priya Sharma', 'priya.sharma@example.com');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '32px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src="/images/farmers-mill-logo.png"
            alt="Farmers Mill"
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          />
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E1EBCB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#5C6E52', marginBottom: '20px' }}>
          Access your farm-fresh orders, saved addresses, and express repeat milling slots.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: '#E1EBCB', padding: '4px', borderRadius: '999px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setOtpSent(false); }}
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              background: !isRegister ? '#3F6B2C' : 'transparent',
              color: !isRegister ? '#ffffff' : '#1E2B17'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setOtpSent(false); }}
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              background: isRegister ? '#3F6B2C' : 'transparent',
              color: isRegister ? '#ffffff' : '#1E2B17'
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17', display: 'block', marginBottom: '4px' }}>
                Full Name
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
              Phone number or Email
            </label>
            <input
              type="text"
              placeholder="+91 98765 43210 or email"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {otpSent && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1E2B17' }}>Enter 4-digit OTP</label>
                <span style={{ fontSize: '12px', color: '#3F6B2C', fontWeight: 700 }}>Sent: 4829</span>
              </div>
              <input
                type="text"
                placeholder="Enter 4829"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                required
                className="input-field"
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '18px', fontWeight: 700 }}
              />
            </div>
          )}

          <button type="submit" className="btn p" style={{ width: '100%', padding: '14px', marginTop: '6px' }}>
            {otpSent ? 'Verify & Continue' : 'Send OTP Code'}
          </button>
        </form>

        <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#D3E0BC' }} />
          <span style={{ position: 'relative', background: '#FBFDF5', padding: '0 12px', fontSize: '12px', color: '#7E9171' }}>
            OR TEST WITH ONE CLICK
          </span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="btn g"
          style={{ width: '100%', padding: '12px' }}
        >
          <User size={16} />
          <span>Continue as Demo Patron (Priya Sharma)</span>
        </button>

        <p style={{ fontSize: '12px', color: '#7E9171', textAlign: 'center', marginTop: '18px' }}>
          By continuing, you agree to Farmers Mill Purity Terms and receive fresh batch alerts.
        </p>
      </div>
    </div>
  );
};
