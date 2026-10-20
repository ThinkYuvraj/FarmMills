import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} color="#7BC652" />}
          {toast.type === 'error' && <AlertCircle size={18} color="#FF5A4E" />}
          {(!toast.type || toast.type === 'info') && <Info size={18} color="#B8CC98" />}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} style={{ color: '#ffffff', opacity: 0.7, padding: '2px' }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
