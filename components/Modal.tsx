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
      <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            {icon && <span className="text-3xl sm:text-4xl">{icon}</span>}
            <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: '#4B0082' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto pr-2 flex-grow space-y-4">
          <div className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#F3F0FF] text-[#4B0082] font-bold text-base rounded-xl hover:bg-[#E0D4FC] transition-colors border border-[#E0D4FC]"
          >
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  );
};