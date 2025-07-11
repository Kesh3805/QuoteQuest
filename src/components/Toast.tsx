import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, duration = 1800, actionLabel, onAction }) => {
  useEffect(() => {
    if (!actionLabel) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration, actionLabel]);

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      {actionLabel && onAction && (
        <button className="toast-action" onClick={onAction} tabIndex={0}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Toast; 