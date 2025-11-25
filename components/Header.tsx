import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-4">
      <div className="max-w-3xl mx-auto px-4 flex items-center gap-6">
        <div className="flex-shrink-0 select-none transform hover:scale-110 hover:rotate-3 transition-transform duration-300 cursor-pointer group">
           {/* Symbolic Non-Existent Animal Logo */}
           <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4B0082" />
                  <stop offset="100%" stopColor="#00CED1" />
                </linearGradient>
                <filter id="glowLogo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <g className="group-hover:animate-bounce">
                {/* Body - Abstract organic shape */}
                <path 
                  d="M50 25C30 25 15 40 20 60C22 75 35 85 50 85C70 85 85 75 80 55C75 35 65 25 50 25Z" 
                  fill="url(#logoGradient)" 
                  stroke="#4B0082" 
                  strokeWidth="2"
                />
                
                {/* Spots on body */}
                <circle cx="30" cy="65" r="4" fill="#00CED1" fillOpacity="0.6" />
                <circle cx="70" cy="50" r="6" fill="#00CED1" fillOpacity="0.6" />
                <circle cx="25" cy="50" r="3" fill="#00CED1" fillOpacity="0.6" />

                {/* Eye - Single large eye symbolizing observation/psychology */}
                <g>
                  <circle cx="50" cy="50" r="14" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="6" fill="#4B0082" />
                  <circle cx="52" cy="48" r="2" fill="white" />
                </g>

                {/* Antennae - Sensory perception */}
                <path d="M35 30C30 15 20 10 15 15" stroke="#4B0082" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <circle cx="15" cy="15" r="4" fill="#00CED1" />
                
                <path d="M65 30C70 15 80 10 85 15" stroke="#4B0082" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <circle cx="85" cy="15" r="4" fill="#00CED1" />

                {/* Small Wing - Imagination */}
                <path d="M75 55C90 50 95 65 82 70" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.3" />
                
                {/* Smile */}
                <path d="M42 70Q50 75 58 70" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </g>
           </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-6xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4B0082] to-[#00CED1]">
            NeuroAura
          </h1>
          <p className="text-slate-500 text-lg font-bold leading-tight">
            Система нейромережевого аналізу когнітивного розвитку дітей молодшого шкільного віку (6-10 років)
          </p>
        </div>
      </div>
      {/* Divider line */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <hr className="border-t border-slate-200" />
      </div>
    </header>
  );
};