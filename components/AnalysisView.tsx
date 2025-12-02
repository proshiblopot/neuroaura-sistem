import React from 'react';
import { AnalysisStatus, AnalysisResult } from '../types';
import { BookOpen, PenTool, Eye, Lightbulb, GraduationCap, HeartHandshake, Download } from 'lucide-react';

interface AnalysisViewProps {
  status: AnalysisStatus;
  result: AnalysisResult | null;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ status, result }) => {
  const handleDownload = () => {
    if (!result) return;

    const date = new Date().toLocaleDateString('uk-UA');
    const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    const reportContent = `
NEUROAURA - ЗВІТ НЕЙРОПСИХОЛОГІЧНОГО АНАЛІЗУ
Дата: ${date} о ${time}
--------------------------------------------------

1. МЕТОДИКА:
${result.methodology}

2. ГРАФІЧНИЙ АНАЛІЗ:
${result.graphic_analysis}

3. ДЕТАЛІЗАЦІЯ ТА ЗМІСТ:
${result.detailing}

4. ПСИХОЛОГІЧНІ ОСОБЛИВОСТІ:
${result.psycho_features}

5. ОЦІНКА КОГНІТИВНОГО РОЗВИТКУ:
Рівень: ${result.cognitive_level.level}
Обґрунтування: ${result.cognitive_level.reasoning}

6. РЕКОМЕНДАЦІЇ:
${result.recommendations}

--------------------------------------------------
Важлива примітка: Цей аналіз сформовано штучним інтелектом. Він є попереднім і не замінює професійної консультації лікаря або психолога.
`.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NeuroAura_Analiz_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (status === AnalysisStatus.LOADING) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center mt-6 min-h-[350px]">
        {/* Advanced Neural Galaxy Animation */}
        <div className="mb-8 relative w-32 h-32 flex items-center justify-center">
             <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="deepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4B0082" />
                        {/* Middle color removed for cleaner Indigo to Teal transition */}
                        <stop offset="100%" stopColor="#00CED1" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Outer Rotating Ring (Data Stream) */}
                <circle cx="50" cy="50" r="46" stroke="url(#deepGradient)" strokeWidth="1.5" strokeDasharray="10 5" strokeOpacity="0.3" className="animate-[spin_8s_linear_infinite]" />
                <circle cx="50" cy="50" r="46" stroke="url(#deepGradient)" strokeWidth="1" strokeDasharray="50 150" strokeLinecap="round" className="animate-[spin_3s_linear_infinite]" />
                
                {/* Middle Counter-Rotating Ring */}
                <circle cx="50" cy="50" r="38" stroke="#00CED1" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.4" className="animate-[spin_6s_linear_infinite_reverse]" />
                
                {/* Central Brain Network */}
                <g className="animate-[pulse_3s_ease-in-out_infinite]" filter="url(#glow)">
                    {/* Brain Outline Abstract */}
                    <path 
                        d="M50 25C40 25 32 30 28 38C26 42 26 48 28 55C25 58 24 64 26 68C28 73 34 75 38 74C41 78 48 78 52 76C56 78 62 76 64 72C68 70 68 64 66 60C70 56 72 48 70 42C68 34 60 25 50 25Z" 
                        fill="url(#deepGradient)" 
                        fillOpacity="0.15" 
                        stroke="url(#deepGradient)" 
                        strokeWidth="1.5"
                    />
                    
                    {/* Synaptic Connections (Nodes) */}
                    <circle cx="50" cy="35" r="2" fill="#4B0082" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <circle cx="35" cy="45" r="1.5" fill="#00CED1" className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
                    <circle cx="65" cy="45" r="1.5" fill="#00CED1" className="animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite_0.2s]" />
                    <circle cx="42" cy="60" r="2" fill="#4B0082" className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                    <circle cx="58" cy="60" r="2" fill="#4B0082" className="animate-[ping_2.7s_cubic-bezier(0,0,0.2,1)_infinite_0.7s]" />

                    {/* Connecting Circuit Lines */}
                    <path d="M50 35 L35 45" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M50 35 L65 45" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M35 45 L42 60" stroke="#00CED1" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M65 45 L58 60" stroke="#00CED1" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M42 60 L58 60" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                </g>
             </svg>
        </div>
        
        <h3 className="text-3xl font-bold mb-3" style={{ color: '#4B0082' }}>Штучний Інтелект міркує...</h3>
        <p className="text-slate-600 text-xl max-w-md animate-pulse">
            Виконується глибокий аналіз графомоторних ознак, символіки та композиції малюнка.
        </p>
      </div>
    );
  }

  if (status === AnalysisStatus.SUCCESS && result) {
    return (
      <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Блок 1: Методика */}
        <div className="bg-white rounded-xl p-6 border-l-4 shadow-sm" style={{ borderColor: '#4B0082' }}>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-8 h-8" style={{ color: '#4B0082' }} />
            <h3 className="font-bold text-2xl" style={{ color: '#4B0082' }}>МЕТОДИКА</h3>
          </div>
          <p className="text-slate-800 text-xl font-medium pl-11">
            {result.methodology}
          </p>
        </div>

        {/* Блок 2: Графічний аналіз */}
        <div className="bg-white rounded-xl p-7 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <PenTool className="w-8 h-8 text-slate-500" />
            <h3 className="font-bold text-2xl" style={{ color: '#4B0082' }}>ГРАФІЧНИЙ АНАЛІЗ</h3>
          </div>
          <p className="text-slate-800 leading-relaxed text-lg pl-11">
            {result.graphic_analysis}
          </p>
        </div>

        {/* Блок 3: Деталізація та Зміст */}
        <div className="bg-white rounded-xl p-7 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-slate-500" />
            <h3 className="font-bold text-2xl" style={{ color: '#4B0082' }}>ДЕТАЛІЗАЦІЯ ТА ЗМІСТ</h3>
          </div>
          <p className="text-slate-800 leading-relaxed text-lg pl-11">
            {result.detailing}
          </p>
        </div>

        {/* Блок 4: Психологічні особливості */}
        <div className="bg-white rounded-xl p-7 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-slate-500" />
            <h3 className="font-bold text-2xl" style={{ color: '#4B0082' }}>ПСИХОЛОГІЧНІ ОСОБЛИВОСТІ</h3>
          </div>
          <p className="text-slate-800 leading-relaxed text-lg pl-11">
            {result.psycho_features}
          </p>
        </div>

        {/* Блок 5: Оцінка Когнітивного Розвитку (Акцентний блок) */}
        <div className="rounded-xl p-7 shadow-md border" style={{ backgroundColor: '#F3F0FF', borderColor: '#4B0082' }}>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-9 h-9" style={{ color: '#4B0082' }} />
            <h3 className="font-bold text-3xl" style={{ color: '#4B0082' }}>ОЦІНКА РОЗВИТКУ</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4 pl-12">
            <span className="inline-flex items-center px-5 py-2 rounded-full text-lg font-bold bg-white shadow-sm" style={{ color: '#4B0082' }}>
              Рівень: {result.cognitive_level.level}
            </span>
          </div>
          <p className="text-slate-900 leading-relaxed text-xl pl-12">
            {result.cognitive_level.reasoning}
          </p>
        </div>

        {/* Блок 6: Рекомендації */}
        <div className="bg-gradient-to-r from-white to-slate-50 rounded-xl p-7 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <HeartHandshake className="w-8 h-8" style={{ color: '#00CED1' }} />
            <h3 className="font-bold text-2xl" style={{ color: '#4B0082' }}>РЕКОМЕНДАЦІЇ</h3>
          </div>
          <p className="text-slate-800 leading-relaxed text-lg pl-11 italic">
            {result.recommendations}
          </p>
        </div>

        {/* Кнопка скачування */}
        <div className="flex justify-center mt-8">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#4B0082] text-[#4B0082] rounded-xl font-bold hover:bg-[#F3F0FF] transition-all transform hover:scale-105 shadow-sm"
            >
                <Download className="w-5 h-5" />
                Завантажити Звіт
            </button>
        </div>

      </div>
    );
  }

  return null;
};