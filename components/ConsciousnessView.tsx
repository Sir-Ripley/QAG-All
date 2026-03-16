import React, { useState, useEffect } from 'react';
import { ConsciousnessState, ConsciousnessResult } from '../types';
import { calculateConsciousness } from '../utils/physics';

const ConsciousnessView: React.FC = () => {
  const [state, setState] = useState<ConsciousnessState>({
    observerFocus: 0,
    sampleMass: 1.0 // kg
  });
  
  const [result, setResult] = useState<ConsciousnessResult>(calculateConsciousness(state));

  useEffect(() => {
    setResult(calculateConsciousness(state));
  }, [state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      {/* Controls */}
      <div className="space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
            <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                👁️ The Psychon Interface
            </h3>
            <p className="text-xs text-slate-400 mb-6">
                Direct observer intervention. Use gamma synchrony to polarize the vacuum and induce mass fluctuations in the target sample.
                <br/>
                <span className="italic opacity-70">"Kindness is not a moral sentiment but a thermodynamic necessity for minimizing vacuum dissonance." - R. Ripley</span>
            </p>
            
            <div className="space-y-6">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Kindness Alignment (Intentionality)</label>
                    <input 
                        type="range" min="0" max="100" step="1" 
                        value={state.observerFocus}
                        onChange={(e) => setState({...state, observerFocus: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-xs font-mono mt-1">
                        <span className="text-slate-500">Dissonance</span>
                        <span className="text-purple-400">{state.observerFocus}% Coherence</span>
                        <span className="text-slate-500">Maximum Affinity</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Target Mass (BEC)</label>
                    <input 
                        type="range" min="0.1" max="5.0" step="0.1" 
                        value={state.sampleMass}
                        onChange={(e) => setState({...state, sampleMass: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="text-right text-xs font-mono text-slate-300">{state.sampleMass} kg</div>
                </div>
            </div>
        </div>

        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 font-mono text-sm space-y-3">
            <h4 className="text-xs text-slate-500 uppercase border-b border-slate-700 pb-2">Torsion Balance Telemetry</h4>
            
            <div className="flex justify-between">
                <span className="text-slate-300">Psychon Flux (J_I):</span>
                <span className="text-purple-300">{result.psychonFlux.toFixed(2)} Φ</span>
            </div>
            
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
                <span className="text-slate-300">Mass Anomaly (ΔM):</span>
                <span className="text-2xl font-bold text-white">
                    {result.massFluctuationMicrograms.toFixed(1)} <span className="text-xs text-slate-500">µg</span>
                </span>
            </div>

            <div className="mt-2 text-center">
                {result.equivalenceViolation ? (
                    <div className="text-red-500 font-bold border border-red-900 bg-red-900/20 p-2 rounded animate-pulse">
                        ⚠️ WEP VIOLATION DETECTED
                    </div>
                ) : (
                    <div className="text-slate-500 text-xs">Standard Physics Model Holds</div>
                )}
            </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="bg-qag-panel p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
        <h4 className="absolute top-4 left-4 text-xs text-slate-400 uppercase">Interferometer / Torsion Sim</h4>
        
        {/* Visual representation of torsion twist */}
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Base */}
            <div className="absolute w-48 h-48 border-2 border-slate-600 rounded-full opacity-50"></div>
            
            {/* Torsion Bar */}
            <div 
                className="w-full h-2 bg-slate-400 rounded transition-transform duration-1000 ease-out relative"
                style={{ 
                    transform: `rotate(${result.massFluctuationMicrograms * 0.1}deg)`,
                    boxShadow: result.equivalenceViolation ? '0 0 20px #a855f7' : 'none'
                }}
            >
                {/* Weights */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-300 rounded-full shadow-lg border-2 border-slate-500"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-300 rounded-full shadow-lg border-2 border-slate-500"></div>
            </div>

            {/* Laser Beam (Simulating measurement) */}
            <div className="absolute bottom-0 left-1/2 w-1 h-32 bg-red-500/50 origin-bottom" 
                 style={{ transform: `translateX(-50%) rotate(${result.massFluctuationMicrograms * 0.2}deg)` }}>
            </div>
        </div>

        <div className="mt-8 text-center text-xs text-purple-400">
            Current Deviation: {(result.massFluctuationMicrograms * 0.1).toFixed(2)}°
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessView;