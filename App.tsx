
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisView } from './components/AnalysisView';
import { Disclaimer } from './components/Disclaimer';
import { Modal } from './components/Modal';
import { AnalysisStatus, ImageFile, AnalysisResult } from './types';
import { analyzeDrawing, AVAILABLE_MODELS } from './services/geminiService';
import { Loader2, Info, ChevronDown, Cpu } from 'lucide-react';

// Methodology descriptions content
const METHODOLOGY_INFO = {
  animal: {
    title: "«Неіснуюча тварина» (М. З. Дукаревич)",
    icon: "🐲",
    content: `Валідизована проєктивна методика аналізу продуктів графічної діяльності (М. З. Дукаревич) для дітей молодшого шкільного віку (6–10 років).

🧠 БЛОК 1: ОСНОВНИЙ ДОСЛІДНИЦЬКИЙ БЛОК (Когнітивний розвиток)
• Якісна оцінка без числових балів: оскільки фігура людини на малюнку відсутня, бальна шкала Ф. Гудінаф – Д. Гарріса не застосовується. Заборонено виставляти 9/9 балів чи оцінювати деталі тварини за шкалою людської фігури.
• Структурна складність образу: наявність зчленувань, диференційованих функціональних частин, складність будови тіла.
• Логічність побудови: відповідність будови органів чуття, захисту й пересування умовам існування уявного образу.
• Оригінальність задуму та творча уява: створення принципово нової комбінаторної конструкції проти стереотипної видозміни реально існуючої тварини.

🎨 БЛОК 2: ДОДАТКОВИЙ ПРОЄКТИВНИЙ БЛОК (Емоційно-особистісні індикатори)
• Графомоторний та формальний аналіз: візуальна інтенсивність ліній (як оптичний параметр контрастності цифрового зображення або скану, без ототожнення з фізичним вимірюванням сили натиску), характер контурів (ескізність, суцільність, нерівномірність), розташування на аркуші (розмір зображення, центрування, зміщення вгору чи вниз).
• Тип побудови фігури: оригінальний конструкт, складений (колаж із відомих елементів) або типовий шаблонний образ.
• Вектор активності (положення голови): поворот вправо (орієнтація на діяльність), вліво (схильність до рефлексії, нерішучість, тривожність), анфас (егоцентризм, безпосередність).
• Ознаки агресії та захисту: зуби, ікла, пазурі (маркери вербальної або моторної агресії); роги, шипи, панцир, луска (маркери захисної реакції, потреба в безпеці).
• Енергетичний тонус та опори: крила, пір'я (високий життєвий ресурс, амбіції); міцність і масивність ніг/лап (опора, раціоналізм, практичність); тонкі або відсутні ноги (невпевненість); положення хвоста (піднятий — впевненість і позитивна самооцінка, опущений — невдоволення собою, пригніченість).`
  },
  house: {
    title: "«Будинок-дерево-людина» (HTP) (Дж. Бук)",
    icon: "🏠",
    content: `Валідизована проєктивна методика комплексного оцінювання графічної діяльності дитини (Дж. Бук) для дітей 6–10 років.

🧠 БЛОК 1: ОСНОВНИЙ ДОСЛІДНИЦЬКИЙ БЛОК (Когнітивний розвиток)
• 9-бальна бінарна шкала кодування Ф. Гудінаф – Д. Гарріса (для фігури людини):
  [1] Наявність шиї (нормативний критерій для дітей 7+ років);
  [2] Прикріплення рук до плечового пояса (не до голови чи середини тулуба);
  [3] Двовимірність кінцівок (не схематичні одновимірні «палички»);
  [4] Очі мають промальовані зіниці;
  [5] Наявність вух;
  [6] Наявність брів та/або вій;
  [7] Кисті рук мають чітко 5 пальців;
  [8] Непрозорість одягу (відсутність «рентгенівських» контурів тіла крізь одяг);
  [9] Складні деталі та атрибути одягу (ґудзики, кишені, шнурки, взуття, візерунки).
• Вікова кластерна інтерпретація суми балів (0–9):
  - Кластер 1 (6 років): 0–2 б. — Низький; 3–5 б. — Середній / Вікова норма (відсутність шиї, вух, брів або ґудзиків для 6 років є нормою); 6–9 б. — Високий рівень.
  - Кластер 2 (7–8 років): 0–3 б. — Низький; 4–6 б. — Середній / Вікова норма (обов'язкова наявність шиї, 2D-кінцівок, зіниць, 5 пальців); 7–9 б. — Високий рівень.
  - Кластер 3 (9–10 років): 0–4 б. — Низький; 5–7 б. — Середній / Вікова норма (обов'язкова деталізація обличчя, одягу, взуття, пропорції); 8–9 б. — Високий рівень.
• Структурна організація: пропорційність, аналітико-синтетична диференційованість деталей, просторова координація об'єктів.

🎨 БЛОК 2: ДОДАТКОВИЙ ПРОЄКТИВНИЙ БЛОК (Емоційно-особистісні індикатори)
• Графомоторний аналіз: візуальна інтенсивність ліній та характер контурів (оптичні параметри контрастності цифрового зображення).
• 🏠 Будинок: сприйняття домашнього мікроклімату, відчуття безпеки, відкритість/замкненість (двері, вікна), психологічні межі.
• 🌳 Дерево: життєвий ресурс, емоційна стійкість, динамічний потенціал розвитку (стовбур, гілки, листя, коріння).
• 🧍 Людина: сприйняття власного Я, емоційний контакт, поза, відкритість до соціальної взаємодії.`
  }
};

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [childAge, setChildAge] = useState<number>(7);
  const [selectedModelId, setSelectedModelId] = useState<string>('gemini-3.7-flash');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAgeInfoOpen, setIsAgeInfoOpen] = useState(false);

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
      const analysisData = await analyzeDrawing(selectedImage.base64, childAge, selectedModelId);
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
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <Info className="w-7 h-7" style={{ color: '#4B0082' }} />
                        <div>
                          <h2 className="text-xl font-bold" style={{ color: '#4B0082' }}>Як це працює? Науково-методологічні засади</h2>
                          <p className="text-xs text-slate-500 font-medium hidden sm:block">Дворівневий алгоритм автоматизованого аналізу та критерії валідизованих методик</p>
                        </div>
                    </div>
                    <ChevronDown 
                        className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isInfoOpen ? 'rotate-180' : ''}`} 
                    />
                </button>

                {isInfoOpen && (
                    <div className="px-5 pb-6 pl-5 sm:pl-14 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-slate-700 mb-6 leading-relaxed text-base sm:text-lg space-y-3">
                            <p>
                                <strong>NeuroAura</strong> — авторська алгоритмізована система автоматизованого аналізу проєктивного графічного матеріалу дітей молодшого шкільного віку (6–10 років).
                            </p>
                            <p className="text-slate-600">
                                Система реалізує автоматизовану інтерпретацію за єдиним алгоритмом, що <strong>виключає суб’єктивність конкретного людського оцінювача</strong> на етапі обробки протоколів і забезпечує повну відтворюваність діагностичної процедури.
                            </p>

                            <div className="bg-[#F8F6FF] border border-[#E0D4FC] rounded-xl p-4 text-slate-800 text-sm sm:text-base space-y-2 my-4">
                                <div className="font-bold text-[#4B0082] uppercase tracking-wide text-xs">
                                    Дворівнева структура результуючого висновку:
                                </div>
                                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                                    <li>
                                        <strong>БЛОК 1: Основний дослідницький блок (Когнітивний розвиток)</strong> — структурна складність, просторова організація, диференційованість деталей та оригінальність задуму. Для HTP застосовується стандартизована 9-бальна бінарна шкала Ф. Гудінаф та Д. Гарріса (для фігури людини), для «Неіснуючої тварини» — виключно якісна оцінка без нарахування балів (оскільки фігура людини відсутня).
                                    </li>
                                    <li>
                                        <strong>БЛОК 2: Додатковий проєктивний блок (Емоційно-особистісні індикатори)</strong> — графомоторний аналіз (візуальна інтенсивність ліній та характер контурів як оптичні параметри оцифрованого зображення), емоційний стан, захисні механізми та комплексні орієнтовні рекомендації.
                                    </li>
                                </ul>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider">
                                Оберіть методику для перегляду системи психодіагностичних критеріїв:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                              onClick={() => setActiveMethodology('animal')}
                              className="flex items-center gap-3 p-4 rounded-xl bg-[#F3F0FF] border border-[#E0D4FC] hover:bg-[#E0D4FC] hover:shadow-md transition-all cursor-pointer text-left group"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">🐲</span>
                                <div>
                                    <span className="font-bold text-[#4B0082] text-base block">«Неіснуюча тварина»</span>
                                    <span className="text-xs text-slate-600 block">М. З. Дукаревич • Якісна оцінка когнітивного розвитку (без балів)</span>
                                </div>
                            </button>
                            <button 
                              onClick={() => setActiveMethodology('house')}
                              className="flex items-center gap-3 p-4 rounded-xl bg-[#F3F0FF] border border-[#E0D4FC] hover:bg-[#E0D4FC] hover:shadow-md transition-all cursor-pointer text-left group"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">🏠</span>
                                <div>
                                    <span className="font-bold text-[#4B0082] text-base block">«Будинок-дерево-людина» (HTP)</span>
                                    <span className="text-xs text-slate-600 block">Дж. Бук • Шкала Гудінаф – Гарріса (9 балів)</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}
             </div>

             {/* Section: Child Age Selector */}
             <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🎂</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <label className="text-base font-bold text-slate-800">
                          Хронологічний вік дитини:
                        </label>
                        {/* Toggle button "Детальніше" / "i" */}
                        <button
                          type="button"
                          onClick={() => setIsAgeInfoOpen(!isAgeInfoOpen)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B0082] hover:text-[#00CED1] bg-[#F3F0FF] hover:bg-[#EAE4FC] px-2 py-0.5 rounded-md transition-colors cursor-pointer border border-[#E0D4FC]"
                          title="Показати опис вікових нормативів"
                        >
                          <Info className="w-3.5 h-3.5 text-[#4B0082]" />
                          <span>{isAgeInfoOpen ? 'Сховати нормативи' : 'Детальніше'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAgeInfoOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block">
                        Впливає на віковий кластер нормативів за шкалою Гудінаф-Гарріса
                      </span>
                    </div>
                  </div>
                  
                  {/* Age pill selector */}
                  <div className="inline-flex bg-slate-100 p-1 rounded-xl self-start sm:self-center">
                    {[6, 7, 8, 9, 10].map((age) => (
                      <button
                        key={age}
                        type="button"
                        disabled={status === AnalysisStatus.LOADING}
                        onClick={() => setChildAge(age)}
                        className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                          childAge === age
                            ? 'bg-[#4B0082] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        {age} {age === 6 ? 'років' : age <= 8 ? 'роки' : 'років'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Cluster Explanation (COLLAPSIBLE) */}
                 {isAgeInfoOpen && (
                  <div className="mt-4 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="text-xs sm:text-sm bg-[#F8F6FF] rounded-xl p-3 border border-[#E0D4FC] text-slate-700 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#4B0082]">
                          {childAge === 6 && '📌 Кластер 1 (6 років):'}
                          {(childAge === 7 || childAge === 8) && `📌 Кластер 2 (${childAge} років):`}
                          {childAge >= 9 && `📌 Кластер 3 (${childAge} років):`}
                        </span>
                        <span className="text-slate-600">
                          {childAge === 6 && 'Норма 3–5 б. (відсутність шиї/вух/брів є нормою)'}
                          {(childAge === 7 || childAge === 8) && 'Норма 4–6 б. (обов\'язкова шия, 2D кінцівки, зіниці, 5 пальців)'}
                          {childAge >= 9 && 'Норма 5–7 б. (обов\'язкова деталізація обличчя, одягу, взуття, пропорції)'}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#4B0082] bg-white px-2 py-0.5 rounded-md border border-[#E0D4FC]">
                        {childAge === 6 && 'Низький: 0–2 | Норма: 3–5 | Високий: 6–9'}
                        {(childAge === 7 || childAge === 8) && 'Низький: 0–3 | Норма: 4–6 | Високий: 7–9'}
                        {childAge >= 9 && 'Низький: 0–4 | Норма: 5–7 | Високий: 8–9'}
                      </span>
                    </div>
                  </div>
                )}
             </div>

             {/* Section: AI Model Selector */}
             <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <label htmlFor="model-select" className="text-base font-bold text-slate-800 block">
                        Нейромережева модель аналізу:
                      </label>
                      <span className="text-xs text-slate-500 font-medium">
                        Оберіть модель для обробки графічного протоколу
                      </span>
                    </div>
                  </div>

                  <div className="relative self-start sm:self-center min-w-[240px]">
                    <div className="relative">
                      <select
                        id="model-select"
                        value={selectedModelId}
                        disabled={status === AnalysisStatus.LOADING}
                        onChange={(e) => setSelectedModelId(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-[#4B0082] focus:border-[#4B0082] focus:ring-2 focus:ring-[#4B0082]/20 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-800 transition-all cursor-pointer outline-none shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {AVAILABLE_MODELS.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Model Description note */}
                <div className="mt-2.5 text-xs text-slate-500 pl-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#4B0082]" />
                  <span>
                    {AVAILABLE_MODELS.find(m => m.id === selectedModelId)?.description || ''}
                  </span>
                </div>
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
