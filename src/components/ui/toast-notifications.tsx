
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastNotificationsProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const ToastContext = React.createContext<{
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  clearToasts: () => void;
}>({
  showToast: () => {},
  clearToasts: () => {}
});

export const useToastNotifications = () => React.useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const clearToasts = () => {
    setToasts([]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 5000);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast, clearToasts }}>
      {children}
      <ToastNotifications toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastNotifications: React.FC<{ 
  toasts: ToastNotification[]; 
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}> = ({ toasts, onClose, position = 'top-right' }) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-full max-w-sm space-y-2 pointer-events-none`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            <div className={`
              rounded-lg p-4 shadow-lg flex items-start gap-3 
              ${toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-700' : 
                toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' :
                toast.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700' :
                'bg-blue-50 border-l-4 border-blue-500 text-blue-700'}
            `}>
              <div className="flex-1">
                <h4 className="font-medium">{toast.title}</h4>
                <p className="text-sm mt-1">{toast.message}</p>
              </div>
              <button
                onClick={() => onClose(toast.id)}
                className="h-6 w-6 rounded-full hover:bg-black/10 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotifications;
