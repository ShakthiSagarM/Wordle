import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '@/utils/types';

interface ToastContextProps {
  addToast: (message: string, type: 'success' | 'error' | 'warning' | 'info', size?: 's' | 'm' | 'l') => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info', size: 's' | 'm' | 'l' = 'm') => {
    const id = Math.random().toString(36).substring(7);
    setToasts([...toasts, { id, message, type, size }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return <ToastContext.Provider value={{ addToast, removeToast, toasts }}>{children}</ToastContext.Provider>;
};
