import type { FC } from 'react';
import { ToastItem } from '../types';

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="toast-container" id="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.isLeaving ? 'toast-leaving' : ''}`}
        >
          <span>{toast.icon}</span>
          <div>{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
