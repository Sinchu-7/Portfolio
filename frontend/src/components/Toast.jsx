import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ type = 'info', message, onClose }) {
  if (!message) return null;

  const iconMap = {
    success: <CheckCircle2 className="toast-icon" size={18} />,
    error: <AlertCircle className="toast-icon" size={18} />,
    info: <Info className="toast-icon" size={18} />,
  };

  return (
    <div className={`toast-notification toast-${type}`} role="alert" aria-live="polite">
      <div className="toast-content">
        {iconMap[type] || iconMap.info}
        <span className="toast-text">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
