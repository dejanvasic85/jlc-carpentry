'use client';

import { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function Alert({ type, message, onClose, autoClose = true, autoCloseDelay = 5000 }: AlertProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const baseClasses = 'p-4 rounded-lg border flex items-start gap-3 transition-all duration-300';
  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const iconClasses = {
    success: 'text-green-400 flex-shrink-0 w-5 h-5 mt-0.5',
    error: 'text-red-400 flex-shrink-0 w-5 h-5 mt-0.5',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert" aria-live="polite" aria-atomic="true">
      {type === 'success' ? (
        <svg className={iconClasses.success} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className={iconClasses.error} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}

      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close alert"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
