import React from 'react';
import { AnalysisStatus, AnalysisResult } from '../types';
import { BookOpen, PenTool, Lightbulb, GraduationCap, HeartHandshake, Download, Activity, FileText, CheckCircle2 } from 'lucide-react';

interface AnalysisViewProps {
  status: AnalysisStatus;
  result: AnalysisResult | null;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ status, result }) => {
  const handleDownload = () => {
    if (!result) return;

    const date = new Date().toLocaleDateString('uk-UA');
    const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    const isScenarioA = result.cognitive_block?.score !== undefined && result.cognitive_block?.score !== null && result.cognitive_block.score >= 0;
    const scoreText = isScenarioA ? `${result.cognitive_block?.score} / 9 балів` : 'Якісна оцінка (без балів)';
    const levelText = result.cognitive_block?.level || result.cognitive_level?.level || '';

    const reportContent = `
NEUROAURA - ЗВІТ НЕЙРОПСИХОЛОГІЧНОГО АНАЛІЗУ
Дата: ${date} о ${time}
Методика / Об'єкти: ${result.methodology}
==================================================

БЛОК 1: ОСНОВНИЙ ДОСЛІДНИЦЬКИЙ БЛОК (КОГНІТИВНИЙ РОЗВИТОК)
--------------------------------------------------
Оцінка: ${scoreText}
Рівень когнітивного розвитку: ${levelText}

Критерії кодування / Оцінка структури:
${result.cognitive_block?.criteria_breakdown || result.cognitive_level?.reasoning || ''}

Структурна організація, деталі та оригінальність:
${result.cognitive_block?.structural_analysis || result.detailing || ''}


БЛОК 2: ДОДАТКОВИЙ ПРОЄКТИВНИЙ БЛОК (ЕМОЦІЙНО-ОСОБИСТІСНІ ІНДИКАТОРИ)
--------------------------------------------------
1. Графомоторний та формальний аналіз:
${result.projective_block?.graphomotor_analysis || result.graphic_analysis || ''}

2. Емоційний стан, самооцінка та соціальна адаптація:
${result.projective_block?.emotional_state || result.psycho_features || ''}

3. Проєктивні компоненти методики:
${result.projective_block?.projective_details || ''}

4. Орієнтовні рекомендації для психолога та батьків:
${result.projective_block?.recommendations || result.recommendations || ''}

==================================================
ПРИМІТКА СИСТЕМИ ПІДТРИМКИ РІШЕННЯ (DSS):
${result.dss_note || "NeuroAura функціонує як алгоритмізована система підтримки психодіагностичного рішення (DSS). Цей автоматизований висновок має виключно індикативний характер, не є самодостатнім клінічним діагнозом і повинен використовуватися психологом у комплексі з іншою інформацією про дитину."}
`.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NeuroAura_Protokol_${Date.now()}.txt`;
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
                    <path 
                        d="M50 25C40 25 32 30 28 38C26 42 26 48 28 55C25 58 24 64 26 68C28 73 34 75 38 74C41 78 48 78 52 76C56 78 62 76 64 72C68 70 68 64 66 60C70 56 72 48 70 42C68 34 60 25 50 25Z" 
                        fill="url(#deepGradient)" 
                        fillOpacity="0.15" 
                        stroke="url(#deepGradient)" 
                        strokeWidth="1.5"
                    />
                    
                    <circle cx="50" cy="35" r="2" fill="#4B0082" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <circle cx="35" cy="45" r="1.5" fill="#00CED1" className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
                    <circle cx="65" cy="45" r="1.5" fill="#00CED1" className="animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite_0.2s]" />
                    <circle cx="42" cy="60" r="2" fill="#4B0082" className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                    <circle cx="58" cy="60" r="2" fill="#4B0082" className="animate-[ping_2.7s_cubic-bezier(0,0,0.2,1)_infinite_0.7s]" />

                    <path d="M50 35 L35 45" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M50 35 L65 45" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M35 45 L42 60" stroke="#00CED1" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M65 45 L58 60" stroke="#00CED1" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M42 60 L58 60" stroke="#4B0082" strokeWidth="1" strokeOpacity="0.6" />
                </g>
             </svg>
        </div>
        
        <h3 className="text-3xl font-bold mb-3" style={{ color: '#4B0082' }}>Штучний Інтелект аналізує...</h3>
        <p className="text-slate-600 text-xl max-w-md animate-pulse">
            Виконується аналіз за протоколом: ідентифікація методики, когнітивний розвиток та проєктивні індикатори.
        </p>
      </div>
    );
  }

  if (status === AnalysisStatus.SUCCESS && result) {
    const cogBlock = result.cognitive_block;
    const projBlock = result.projective_block;

    const hasNumericScore = cogBlock?.score !== undefined && cogBlock?.score !== null && cogBlock.score >= 0;
    const score = hasNumericScore ? cogBlock.score! : 0;
    const scoreColor = score >= 7 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : score >= 4 ? 'text-indigo-700 bg-indigo-50 border-indigo-200' : 'text-amber-700 bg-amber-50 border-amber-200';

    return (
      <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Методика / Заголовок висновку */}
        <div className="bg-white rounded-xl p-6 border-l-4 shadow-sm" style={{ borderColor: '#4B0082' }}>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-7 h-7" style={{ color: '#4B0082' }} />
            <h3 className="font-bold text-xl" style={{ color: '#4B0082' }}>КРОК 1: ІДЕНТИФІКОВАНА МЕТОДИКА ТА ОБ'ЄКТИ</h3>
          </div>
          <p className="text-slate-800 text-lg font-medium pl-10">
            {result.methodology}
          </p>
        </div>

        {/* БЛОК 1: ОСНОВНИЙ ДОСЛІДНИЦЬКИЙ БЛОК (КОГНІТИВНИЙ РОЗВИТОК) */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border-2 border-[#4B0082]/20 relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#4B0082]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4B0082]">Дослідницький компонент</span>
                <h3 className="font-extrabold text-2xl text-slate-900">БЛОК 1: Основний дослідницький блок</h3>
                <p className="text-sm text-slate-500 font-medium">Когнітивний розвиток (структурна складність, диференційованість деталей та оригінальність)</p>
              </div>
            </div>

            {/* Score Badge */}
            {cogBlock && (
              <div className="flex items-center gap-2">
                {hasNumericScore ? (
                  <div className={`px-4 py-2 rounded-xl border font-bold text-base shadow-sm ${scoreColor}`}>
                    {score} / 9 балів
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-xl border font-bold text-base shadow-sm text-indigo-700 bg-indigo-50 border-indigo-200">
                    Якісна оцінка
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cognitive Level Banner */}
          <div className="rounded-xl p-4 mb-6 bg-[#F8F6FF] border border-[#E4DCFC] flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#4B0082] flex-shrink-0" />
            <div>
              <span className="text-sm font-semibold text-slate-500">Висновок когнітивного розвитку:</span>
              <div className="text-lg font-bold text-[#4B0082]">
                {cogBlock?.level || result.cognitive_level?.level || 'Оцінено'}
              </div>
            </div>
          </div>

          {/* Criteria breakdown */}
          {cogBlock?.criteria_breakdown && (
            <div className="mb-6 bg-slate-50 rounded-xl p-5 border border-slate-200/70">
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-base">
                <Activity className="w-5 h-5 text-[#4B0082]" />
                <span>
                  {hasNumericScore 
                    ? "Попунктна бінарна шкала кодування (за Гудінаф-Гаррісом, 9 критеріїв):" 
                    : "Оцінка когнітивних компонентів образу:"}
                </span>
              </div>
              <div className="text-slate-700 leading-relaxed text-base whitespace-pre-line pl-7">
                {cogBlock.criteria_breakdown}
              </div>
            </div>
          )}

          {/* Structural Analysis */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-base">
              <FileText className="w-5 h-5 text-[#4B0082]" />
              <span>Структурна організація, диференційованість деталей та оригінальність:</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pl-7">
              {cogBlock?.structural_analysis || result.detailing}
            </p>
          </div>
        </div>

        {/* БЛОК 2: ДОДАТКОВИЙ ПРОЄКТИВНИЙ БЛОК (ЕМОЦІЙНО-ОСОБИСТІСНІ ІНДИКАТОРИ) */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200">
          <div className="pb-4 mb-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-[#00CED1]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Проєктивний компонент</span>
              <h3 className="font-extrabold text-2xl text-slate-900">БЛОК 2: Додатковий проєктивний блок</h3>
              <p className="text-sm text-slate-500 font-medium">Емоційно-особистісні індикатори (індикативний аналіз за сукупністю ознак)</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Графомоторний аналіз */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <PenTool className="w-5 h-5 text-slate-600" />
                <h4 className="font-bold text-lg text-slate-800">1. Графомоторний та формальний аналіз (натиск, лінії, композиція)</h4>
              </div>
              <p className="text-slate-700 leading-relaxed text-base pl-7">
                {projBlock?.graphomotor_analysis || result.graphic_analysis}
              </p>
            </div>

            {/* Емоційний стан та соціальна адаптація */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <HeartHandshake className="w-5 h-5 text-[#4B0082]" />
                <h4 className="font-bold text-lg text-slate-800">2. Емоційний стан, самооцінка та соціальна адаптація</h4>
              </div>
              <p className="text-slate-700 leading-relaxed text-base pl-7">
                {projBlock?.emotional_state || result.psycho_features}
              </p>
            </div>

            {/* Проєктивні деталі */}
            {projBlock?.projective_details && (
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h4 className="font-bold text-lg text-slate-800">3. Проєктивні компоненти (Неіснуюча тварина / Будинок-Дерево-Людина)</h4>
                </div>
                <p className="text-slate-700 leading-relaxed text-base pl-7">
                  {projBlock.projective_details}
                </p>
              </div>
            )}

            {/* Рекомендації */}
            <div className="bg-gradient-to-r from-[#F3F0FF]/50 to-teal-50/50 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <HeartHandshake className="w-5 h-5 text-[#4B0082]" />
                <h4 className="font-bold text-lg text-[#4B0082]">4. Орієнтовні рекомендації для психолога та батьків</h4>
              </div>
              <p className="text-slate-800 leading-relaxed text-base pl-7 italic">
                {projBlock?.recommendations || result.recommendations}
              </p>
            </div>
          </div>
        </div>

        {/* Обов'язкова примітка DSS */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 text-amber-900 shadow-sm">
          <div className="font-bold text-sm uppercase tracking-wide text-amber-800 mb-1">
            ПРИМІТКА СИСТЕМИ ПІДТРИМКИ РІШЕННЯ (DSS)
          </div>
          <p className="text-sm text-amber-900 leading-relaxed">
            {result.dss_note || "NeuroAura функціонує як алгоритмізована система підтримки психодіагностичного рішення (DSS). Цей автоматизований висновок має виключно індикативний характер, не є самодостатнім клінічним діагнозом і повинен використовуватися психологом у комплексі з іншою інформацією про дитину."}
          </p>
        </div>

        {/* Кнопка скачування */}
        <div className="flex justify-center mt-8">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#4B0082] text-[#4B0082] rounded-xl font-bold hover:bg-[#F3F0FF] transition-all transform hover:scale-105 shadow-sm"
            >
                <Download className="w-5 h-5" />
                Завантажити Офіційний Протокол
            </button>
        </div>

      </div>
    );
  }

  return null;
};
