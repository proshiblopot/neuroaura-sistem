import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100/90 backdrop-blur-sm border border-slate-200 p-6 sm:p-8 rounded-2xl my-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
          <ShieldCheck className="h-8 w-8 text-[#4B0082]" aria-hidden="true" />
        </div>
        <div>
          <h4 className="text-lg font-bold uppercase tracking-wide text-[#4B0082] mb-2">
            СИСТЕМА ПІДТРИМКИ ПРИЙНЯТТЯ РІШЕНЬ (DSS)
          </h4>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>NeuroAura</strong> — авторська алгоритмізована система автоматизованого аналізу проєктивного графічного матеріалу, яка застосовує до всіх протоколів однакову систему психодіагностичних критеріїв і тим самим виключає суб’єктивність конкретного людського оцінювача на етапі автоматизованої інтерпретації. 
            Результат системи є структурованим психодіагностичним висновком допоміжного (індикативного) характеру і використовується практичним психологом у комплексі з іншими діагностичними даними про дитину.
          </p>
        </div>
      </div>
    </div>
  );
};