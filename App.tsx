
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisView } from './components/AnalysisView';
import { Disclaimer } from './components/Disclaimer';
import { Modal } from './components/Modal';
import { AnalysisStatus, ImageFile, AnalysisResult } from './types';
import { analyzeDrawing } from './services/geminiService';
import { Loader2, Info, ChevronDown, Cpu, Sparkles, Brain, Zap } from 'lucide-react';

// Methodology descriptions content
const METHODOLOGY_INFO = {
  animal: {
    title: "Неіснуюча тварина",
    icon: "🐲",
    content: `Проєктивна методика для дослідження особистості, рівня тривожності та самооцінки. 
    
    ШІ аналізує розташування на аркуші, функціональні деталі (крила, ноги) та характер ліній, щоб зрозуміти внутрішній світ дитини.`
  },
  house: {
    title: "Дім-Дерево-Родина",
    icon: "🏠",
    content: `Методика для комплексної оцінки соціальної адаптації.

    🏠 Дім: Символ фізичного Я та сприйняття домашньої атмосфери.
    
    🌳 Дерево: Життєва енергія та ресурси для розвитку.
    
    👨‍👩‍👧 Родина: Проєкція місця дитини в системі сімейних відносин.

    ШІ аналізує взаємозв'язок об'єктів та їх розміщення.`
  }
};

const MODELS = [
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', desc: 'Найвищий інтелект', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'gemini-3.5-flash-thinking', name: 'Gemini 3.5 Flash (Thinking)', desc: 'Стабільний та глибокий аналіз', icon: <Cpu className="w-4 h-4" /> },
  { id: 'gemini-3-flash-preview-thinking', name: 'Gemini 3.0 Flash (Thinking)', desc: 'Швидкий аналіз з мисленням', icon: <Zap className="w-4 h-4" /> },
];

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  // Model Selection State
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.1-pro-preview');

  // Modal State
  const [activeMethodology, setActiveMethodology] = useState<keyof typeof METHODOLOGY_INFO | null>(null);

  const handleImageSelected = (image: ImageFile | null) => {
    setSelectedImage(image);
    if (status === AnalysisStatus.SUCCESS || status === AnalysisStatus.ERROR) {
      setStatus(AnalysisStatus.IDLE);
      setResult(null);
      setErrorMsg(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setStatus(AnalysisStatus.LOADING);
    setErrorMsg(null);
    // Auto-close info when analysis starts to focus on loader
    setIsInfoOpen(false);

    try {
      const analysisData = await analyzeDrawing(selectedImage.base64, selectedModel);
      setResult(analysisData);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(AnalysisStatus.ERROR);
      setErrorMsg(error.message || "Не вдалося проаналізувати малюнок. Спробуйте ще раз.");
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setStatus(AnalysisStatus.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Main Content Area */}
        <div className="space-y-8">
          
          {/* Section 1: Upload */}
          <section>
             {/* Info Block (Collapsible) */}
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 transition-all duration-300 overflow-hidden">
                <button 
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none bg-white hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Info className="w-7 h-7" style={{ color: '#4B0082' }} />
                        <h2 className="text-xl font-bold" style={{ color: '#4B0082' }}>Як це працює?</h2>
                    </div>
                    <ChevronDown 
                        className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isInfoOpen ? 'rotate-180' : ''}`} 
                    />
                </button>

                {isInfoOpen && (
                    <div className="px-5 pb-6 pl-14 animate-in fade-in slide-in-from-top-1 duration-200">
                        <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                            NeuroAura використовує алгоритми штучного інтелекту для аналізу дитячих малюнків. 
                            Система визначає рівень деталізації, графомоторні навички та просторове мислення, 
                            надаючи попередню оцінку когнітивного розвитку, <strong>калібровану спеціально для дітей 6-10 років</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                              onClick={() => setActiveMethodology('animal')}
                              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F3F0FF] border border-[#E0D4FC] hover:bg-[#E0D4FC] hover:shadow-md transition-all cursor-pointer text-left"
                            >
                                <span className="text-2xl">🐲</span>
                                <span className="font-bold text-[#4B0082] text-lg">Неіснуюча тварина</span>
                            </button>
                            <button 
                              onClick={() => setActiveMethodology('house')}
                              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F3F0FF] border border-[#E0D4FC] hover:bg-[#E0D4FC] hover:shadow-md transition-all cursor-pointer text-left"
                            >
                                <span className="text-2xl">🏠</span>
                                <span className="font-bold text-[#4B0082] text-lg">Дім-Дерево-Родина</span>
                            </button>
                        </div>
                    </div>
                )}
             </div>

             <div className="mb-6">
               {/* Clean uploader container without extra styling as ImageUploader handles it */}
               <ImageUploader 
                    image={selectedImage} 
                    onImageSelected={handleImageSelected} 
                    disabled={status === AnalysisStatus.LOADING}
                />
             </div>

             {/* Action Button - MOVED ABOVE MODELS */}
             <div className="flex justify-center mb-6">
                {status === AnalysisStatus.SUCCESS ? (
                   <button
                   onClick={handleReset}
                   className="flex items-center justify-center gap-2 text-slate-600 hover:text-[#00CED1] py-3 px-8 rounded-xl font-bold text-lg transition-all duration-200 border border-slate-200 hover:border-[#00CED1] bg-white"
                 >
                   ⟳ Новий аналіз
                 </button>
                ) : (
                  <button
                    onClick={handleAnalyze}
                    disabled={!selectedImage || status === AnalysisStatus.LOADING}
                    className="flex items-center justify-center gap-2 text-white font-bold py-4 px-10 text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                        background: 'linear-gradient(90deg, #4B0082 0%, #00CED1 100%)',
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {status === AnalysisStatus.LOADING ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Аналізуємо...
                      </>
                    ) : (
                      <>🔍 Розпочати Аналіз</>
                    )}
                  </button>
                )}
             </div>

             {/* Model Selection - MOVED BELOW ACTION BUTTON */}
             {status !== AnalysisStatus.SUCCESS && (
               <div className="mb-6 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-6 h-6 text-[#4B0082]" />
                    <h3 className="font-bold text-slate-700 text-lg">Оберіть модель аналізу:</h3>
                  </div>
                  {/* Changed grid layout to 3 columns on sm+ screens for alignment */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                          selectedModel === model.id
                            ? 'border-[#4B0082] bg-[#F3F0FF] shadow-md transform scale-[1.02]'
                            : 'border-slate-100 bg-white hover:border-[#4B0082]/30 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <span className={selectedModel === model.id ? 'text-[#4B0082]' : 'text-slate-500'}>
                            {model.icon}
                          </span>
                          {model.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 pl-6">{model.desc}</div>
                        {selectedModel === model.id && (
                          <div className="absolute top-3 right-3 w-3 h-3 bg-[#4B0082] rounded-full shadow-sm ring-2 ring-white"></div>
                        )}
                      </button>
                    ))}
                  </div>
               </div>
             )}

             {/* Error Message */}
             {status === AnalysisStatus.ERROR && (
                <div className="bg-red-50 text-red-700 p-5 rounded-xl text-lg border border-red-100 flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 font-bold">
                     <span>⚠️</span> Помилка
                  </div>
                  <div>{errorMsg}</div>
                </div>
              )}
          </section>

          {/* Section 2: Results */}
          {(status === AnalysisStatus.SUCCESS || status === AnalysisStatus.LOADING) && (
             <section>
                <AnalysisView status={status} result={result} />
             </section>
          )}

          <Disclaimer />
        </div>
      </main>

      {/* Modal for Methodology Details */}
      <Modal 
        isOpen={!!activeMethodology}
        onClose={() => setActiveMethodology(null)}
        title={activeMethodology ? METHODOLOGY_INFO[activeMethodology].title : ''}
        content={activeMethodology ? METHODOLOGY_INFO[activeMethodology].content : ''}
        icon={activeMethodology ? METHODOLOGY_INFO[activeMethodology].icon : ''}
      />
    </div>
  );
};

export default App;
