import React from 'react';
import { ResearchModule } from '../types';

interface NavigationProps {
  activeModule: ResearchModule;
  setModule: (m: ResearchModule) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, setModule }) => {
  const tabs: {id: ResearchModule, label: string, icon: string}[] = [
    { id: 'PHYSICS', label: 'Base-12 Resonator', icon: '⚡' },
    { id: 'COSMOLOGY', label: 'Cosmo-Atlas', icon: '☄️' },
    { id: 'BIOLOGY', label: 'Bio-Resonance', icon: '🧬' },
    { id: 'CONSCIOUSNESS', label: 'Psychon Detector', icon: '👁️' },
    { id: 'ENERGY', label: 'Ether Grid', icon: '🔋' },
    { id: 'MATH', label: 'Source Code', icon: '📐' },
    { id: 'CODEX', label: 'QAG Codex', icon: '📖' },
    { id: 'CHAT', label: 'Dr. Ripley (AI)', icon: '🤖' },
  ];

  return (
    <nav className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-800/50 rounded-lg border border-slate-700 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setModule(tab.id)}
          className={`flex-1 min-w-[120px] px-3 py-3 rounded-md text-xs md:text-sm font-mono font-bold transition-all duration-200 flex flex-col md:flex-row items-center justify-center gap-2 whitespace-nowrap
            ${activeModule === tab.id 
              ? 'bg-qag-accent text-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;