import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100/90 backdrop-blur-sm border border-slate-200 p-5 rounded-2xl my-8 shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-xs">
          <ShieldCheck className="h-6 w-6 text-[#4B0082]" aria-hidden="true" />
        </div>
        <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#4B0082]">
          СИСТЕМА ПІДТРИМКИ ПРИЙНЯТТЯ РІШЕНЬ (DSS)
        </h4>
      </div>
    </div>
  );
};