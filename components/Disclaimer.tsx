import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100/80 backdrop-blur-sm border border-slate-200 p-8 rounded-2xl my-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
          <ShieldCheck className="h-8 w-8 text-indigo-600" aria-hidden="true" />
        </div>
        <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Важлива примітка</h4>
          <p className="text-lg text-slate-600 leading-relaxed">
            Цей інструмент — лише помічник для попереднього аналізу. Штучний інтелект може помилятися. 
            Будь ласка, звертайтеся до кваліфікованого дитячого психолога для професійної діагностики та консультацій.
          </p>
        </div>
      </div>
    </div>
  );
};