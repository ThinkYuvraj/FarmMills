import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, FileText, ArrowLeft, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const TermsConditionsView: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="w" style={{ padding: '40px 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => {
          setActivePage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="clay-btn-secondary"
        style={{ padding: '8px 18px', fontSize: '13px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <ArrowLeft size={16} />
        <span>Return to Home</span>
      </button>

      {/* Header */}
      <div className="clay-card-static" style={{ padding: '36px', marginBottom: '32px', background: '#FBFDF5' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3F6B2C', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }} className="clay-badge">
          <FileText size={15} /> OFFICIAL POLICY · FARMERSMILL.IN
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#1E2B17', lineHeight: 1.15 }}>
          Terms &amp; Conditions
        </h1>
        <p className="subheading" style={{ marginTop: '10px' }}>
          Operated by Wholesome Harvest Company / Farmers Mill. Last revised: October 2026.
        </p>
      </div>

      {/* Document Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            1. Overview &amp; Acceptance of Terms
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            Welcome to Farmers Mill (accessible at <b>https://www.farmersmill.in/</b>), owned and operated by Wholesome Harvest Company ("Farmers Mill", "we", "us", or "our"). By visiting our website, ordering freshly milled chakki flours, cold woodpressed oils, spices, honey, or pickles, you agree to be bound by these Terms and Conditions. Please review them carefully before placing an order.
          </p>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            2. Milling on Order &amp; Product Freshness
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            Unlike commercial brands that distribute warehouse-stored grain products sitting on shelves for months, Farmers Mill grains are milled fresh strictly after your order is confirmed. Each package is stamped with the exact milling date and batch number. Because our products contain zero artificial preservatives, bleaching chemicals, or anti-caking agents, shelf life is naturally between 45 to 90 days. We advise patrons to store flours in cool, dry, airtight containers upon receipt.
          </p>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            3. Pricing &amp; Authoritative Server Billing
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            All prices are stated in Indian National Rupees (INR ₹) inclusive of applicable taxes. Pricing and promotional coupon discounts are validated authoritatively by our server at the time of checkout. We reserve the right to correct typographical errors or discontinue items without prior notice.
          </p>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            4. Order Cancellations &amp; Modifications
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            Because our stone chakkis and cold wood-press expellers begin custom milling and packing immediately upon order placement, customer-initiated cancellations directly on the website are restricted. If you need to modify or cancel an order, please promptly contact our support team at <b>+91-8826313986</b> or email <b>support@farmersmill.in</b> before your milling batch is processed. If an item is temporarily out of stock, we will notify you to either adjust your order with a partial refund or cancel for a full refund.
          </p>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            5. User Accounts &amp; Security
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            Patrons may register an account with their email address, mobile phone, Google, Apple ID, or biometric Passkeys. All password credentials are salted and hashed using industry-standard bcrypt hashing, and sessions are authorized through secure signed JSON Web Tokens (JWT). You are responsible for maintaining the confidentiality of your login credentials.
          </p>
        </div>

        <div className="clay-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '20px', color: '#1E2B17', marginBottom: '12px' }}>
            6. Governing Law &amp; FSSAI Compliance
          </h2>
          <p className="body-text" style={{ color: '#435538', lineHeight: 1.7 }}>
            All operations comply with the Food Safety and Standards Authority of India (FSSAI Lic. No: <b>10822999000142</b>). These Terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of Gurugram / Ghaziabad / Delhi NCR.
          </p>
        </div>

        {/* Support contact footer */}
        <div className="clay-inset" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <b style={{ color: '#1E2B17', fontSize: '15px', display: 'block' }}>Have questions about our terms?</b>
            <span style={{ fontSize: '13px', color: '#5C6E52' }}>Our team is available Mon – Sat from 7:00 AM to 8:30 PM.</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="tel:+918826313986" className="clay-btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Phone size={14} /> +91-8826313986
            </a>
            <a href="mailto:support@farmersmill.in" className="clay-btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Mail size={14} /> support@farmersmill.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
