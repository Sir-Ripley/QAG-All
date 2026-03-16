import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import ResonatorViz from './components/ResonatorViz';
import MathDisplay from './components/MathDisplay';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import CosmologyView from './components/CosmologyView';
import BiologyView from './components/BiologyView';
import ConsciousnessView from './components/ConsciousnessView';
import EnergyView from './components/EnergyView';
import MathView from './components/MathView';
import CodexView from './components/CodexView';
import QuantumView from './components/QuantumView';
import S5CipherView from './components/S5CipherView';
import { SimulationState, PhysicsResult, ResearchModule } from './types';
import { calculatePhysics } from './utils/physics';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ResearchModule>('PHYSICS');

  // Physics State (Resonator Tab)
  const [simState, setSimState] = useState<SimulationState>({
    inputAmplitude: 2.0,
    frequency: 700,
    couplingConstant: 0.5,
    radius: 0.2,
    qId: 7,
    retrocausalPull: 0.5,
    fpgaClock: 341
  });
  const [physics, setPhysics] = useState<PhysicsResult>(calculatePhysics(simState));

  useEffect(() => {
    setPhysics(calculatePhysics(simState));
  }, [simState]);

  const handleSliderChange = (key: keyof SimulationState, value: string) => {
    setSimState(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b border-slate-700 pb-6 mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight flex flex-col md:flex-row md:items-center justify-between">
          <span>
            <span className="text-qag-accent">RIPLEY & RIPLEY</span> RESEARCH
          </span>
          <span className="text-xs font-mono text-slate-500 mt-2 md:mt-0 px-2 py-1 bg-slate-800 rounded border border-slate-700">
            NEXUS TERMINAL v3.1.0
          </span>
        </h1>
        <p className="text-slate-400 mt-2 max-w-3xl">
          The definitive unified field interface. Accessing the <strong>QAG Codex</strong>, <strong>Resonant Healing Protocols</strong>, and <strong>Cosmic Affinity</strong> telemetry.
        </p>
      </header>

      <Navigation activeModule={activeModule} setModule={setActiveModule} />

      <main className="min-h-[600px]">
        {/* PHYSICS MODULE (Original) */}
        {activeModule === 'PHYSICS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            <div className="lg:col-span-5 space-y-6">
              <ResonatorViz physics={physics} inputAmplitude={simState.inputAmplitude} />
              <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 space-y-6">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <span className="text-qag-accent">⚡</span> Resonance Controls
                </h3>
                 {/* Q_id Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">Intentionality (Q_id)</label>
                    <span className="font-mono text-qag-accent">{simState.qId}</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1" 
                    value={simState.qId}
                    onChange={(e) => handleSliderChange('qId', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                </div>
                 {/* Frequency Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">Frequency (Om)</label>
                    <span className="font-mono text-qag-accent">{simState.frequency} Hz</span>
                  </div>
                  <input 
                    type="range" min="100" max="2000" step="10" 
                    value={simState.frequency}
                    onChange={(e) => handleSliderChange('frequency', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                </div>
                 {/* Input Amplitude */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">Input Amplitude</label>
                    <span className="font-mono text-qag-accent">{simState.inputAmplitude.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.1" 
                    value={simState.inputAmplitude}
                    onChange={(e) => handleSliderChange('inputAmplitude', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                </div>
                 {/* Coupling */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">Coupling (α)</label>
                    <span className="font-mono text-qag-accent">{simState.couplingConstant.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1.0" step="0.05" 
                    value={simState.couplingConstant}
                    onChange={(e) => handleSliderChange('couplingConstant', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                </div>
                 {/* Retrocausal Pull */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">Retrocausal Pull (Future State)</label>
                    <span className="font-mono text-qag-accent">{simState.retrocausalPull.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1.0" step="0.01" 
                    value={simState.retrocausalPull}
                    onChange={(e) => handleSliderChange('retrocausalPull', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                </div>
                 {/* FPGA Clock */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="text-slate-300">FPGA Temporal Clock (ns)</label>
                    <span className="font-mono text-qag-accent">{simState.fpgaClock} ns</span>
                  </div>
                  <input 
                    type="range" min="100" max="1000" step="1" 
                    value={simState.fpgaClock}
                    onChange={(e) => handleSliderChange('fpgaClock', e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                  />
                  <div className="text-[10px] text-slate-500 italic">Target: 341ns for Chrono-Holographic Latency Lock</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Dashboard physics={physics} />
              <MathDisplay physics={physics} />
            </div>
          </div>
        )}

        {/* COSMOLOGY MODULE */}
        {activeModule === 'COSMOLOGY' && <CosmologyView />}

        {/* BIOLOGY MODULE */}
        {activeModule === 'BIOLOGY' && <BiologyView />}

        {/* NEW MODULES */}
        {activeModule === 'CONSCIOUSNESS' && <ConsciousnessView />}
        {activeModule === 'ENERGY' && <EnergyView />}
        {activeModule === 'MATH' && <MathView />}
        {activeModule === 'QUANTUM' && <QuantumView />}
        {activeModule === 'S5_CIPHER' && <S5CipherView />}
        {activeModule === 'CODEX' && <CodexView />}

        {/* CHAT MODULE */}
        {activeModule === 'CHAT' && (
          <div className="max-w-4xl mx-auto">
             <ChatInterface />
          </div>
        )}
      </main>
      <Analytics />
    </div>
  );
};

export default App;