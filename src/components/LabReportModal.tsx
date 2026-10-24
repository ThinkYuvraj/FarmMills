import React from 'react';
import { useShop } from '../context/ShopContext';
import { LAB_REPORTS } from '../data/labReports';
import { X, ShieldCheck, CheckCircle2, Download, Printer, QrCode, FileText } from 'lucide-react';

export const LabReportModal: React.FC = () => {
  const { labReportProduct, closeLabReport, addToast } = useShop();

  if (!labReportProduct) return null;

  const report = LAB_REPORTS[labReportProduct.id] || LAB_REPORTS['fm-atta-chakki'];

  const handleDownload = () => {
    addToast(`Downloaded official NABL certificate ${report.id}`, 'success');
  };

  return (
    <div className="modal-overlay" onClick={closeLabReport}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '0', overflow: 'hidden' }}
      >
        {/* Mobile Sheet Drag Indicator Bar */}
        <div className="mobile-sheet-pill" style={{ display: 'none', justifyContent: 'center', paddingTop: '10px', background: '#1E2B17' }}>
          <div style={{ width: '44px', height: '5px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.3)' }} />
        </div>

        {/* Certificate Header */}
        <div style={{ background: '#1E2B17', color: '#FBFDF5', padding: '20px 24px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3F6B2C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={24} color="#7BC652" />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#B3C4A5', letterSpacing: '0.08em', fontWeight: 700, textTransform: 'uppercase' }}>
                  CERTIFIED TEST REPORT · NABL ACCREDITED
                </span>
                <h3 style={{ fontSize: '20px', color: '#ffffff', marginTop: '2px', lineHeight: 1.2 }}>
                  Purity &amp; Quality Test Certificate
                </h3>
              </div>
            </div>

            <button
              onClick={closeLabReport}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                flexShrink: 0
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '20px', fontSize: '13px', color: '#D2E0BC' }}>
            <div>
              <span>Product:</span>
              <b style={{ color: '#ffffff', display: 'block' }}>{report.productName}</b>
            </div>
            <div>
              <span>Batch No:</span>
              <b style={{ color: '#ffffff', display: 'block' }}>{report.batchNumber}</b>
            </div>
            <div>
              <span>Report ID:</span>
              <b style={{ color: '#ffffff', display: 'block' }}>{report.id}</b>
            </div>
            <div>
              <span>Testing Date:</span>
              <b style={{ color: '#ffffff', display: 'block' }}>{report.testDate}</b>
            </div>
          </div>
        </div>

        {/* Certificate Body */}
        <div style={{ padding: '28px', background: '#FBFDF5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <b style={{ fontSize: '14px', color: '#1E2B17' }}>Testing Laboratory:</b>
              <p style={{ fontSize: '13px', color: '#5C6E52', marginTop: '2px' }}>
                {report.labName} ({report.nablAccreditation})
              </p>
            </div>
            <span className="badge" style={{ background: '#E1EBCB', color: '#2E5020', fontSize: '12px' }}>
              ✓ 100% Passed Standards
            </span>
          </div>

          {/* Test Parameters Table */}
          <div style={{ border: '1px solid #D3E0BC', borderRadius: '14px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.4fr 1fr', padding: '12px 16px', background: '#F2F6E6', fontWeight: 700, fontSize: '12px', color: '#3F6B2C' }}>
              <span>TEST PARAMETER</span>
              <span>STANDARD</span>
              <span>LAB FINDING</span>
              <span style={{ textAlign: 'right' }}>RESULT</span>
            </div>

            {report.parameters.map((param, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr 1.4fr 1fr',
                  padding: '12px 16px',
                  borderTop: '1px solid #F2F6E6',
                  fontSize: '13px',
                  alignItems: 'center'
                }}
              >
                <b style={{ color: '#1E2B17' }}>{param.name}</b>
                <span style={{ color: '#5C6E52' }}>{param.standard}</span>
                <span style={{ color: '#1E2B17', fontWeight: 600 }}>{param.result}</span>
                <span style={{ textAlign: 'right', color: '#2E7D32', fontWeight: 700 }}>
                  ✓ {param.status}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantee Note */}
          <div style={{ marginTop: '20px', padding: '14px 18px', background: '#EDF3DF', borderRadius: '12px', border: '1px solid #D3E0BC', fontSize: '13px', color: '#2E5020', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} color="#3F6B2C" style={{ flex: 'none' }} />
            <span>
              <b>Farmers Mill 230+ Pesticide Freedom Guarantee:</b> All raw seeds and whole grains undergo pre-milling screening for chemical residues, artificial bleaching agents and heavy metals.
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#7E9171' }}>
              <QrCode size={18} color="#3F6B2C" />
              <span>Scan QR code printed on physical package to verify live report</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn g sm"
                onClick={() => window.print()}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} />
                <span>Print</span>
              </button>
              <button
                className="btn p sm"
                onClick={handleDownload}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={15} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
