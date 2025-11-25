import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, icon }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {icon && <span className="text-4xl">{icon}</span>}
            <h3 className="text-2xl font-bold leading-6" style={{ color: '#4B0082' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-2">
          <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 text-slate-700 font-bold text-lg rounded-xl hover:bg-slate-200 transition-colors"
          >
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  );
};