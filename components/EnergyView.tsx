import React, { useState, useEffect } from 'react';
import { EnergyState, EnergyResult } from '../types';
import { calculateEnergy } from '../utils/physics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const EnergyView: React.FC = () => {
  const [state, setState] = useState<EnergyState>({
    gridLoad: 50,
    couplingCoefficient: 0.1,
    resonanceFrequency: 42.0
  });
  
  const [result, setResult] = useState<EnergyResult>(calculateEnergy(state));

  useEffect(() => {
    setResult(calculateEnergy(state));
  }, [state]);

  const chartData = [
    { name: 'Input', val: 100 },
    { name: 'Output', val: result.cop * 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      <div className="space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
            <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                ⚡ The Ferroelectric Grid
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Resonance Frequency (MHz)</label>
                    <input 
                        type="range" min="0.1" max="2.0" step="0.01" 
                        value={state.resonanceFrequency}
                        onChange={(e) => setState({...state, resonanceFrequency: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">0.1 MHz</span>
                        <span className={`${Math.abs(state.resonanceFrequency - 0.70) < 0.05 ? 'text-green-400 font-bold' : 'text-slate-300'}`}>
                            {state.resonanceFrequency.toFixed(2)} MHz
                        </span>
                        <span className="text-slate-500">2.0 MHz</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Etheric Coupling (k_e)</label>
                    <input 
                        type="range" min="0" max="1.0" step="0.01" 
                        value={state.couplingCoefficient}
                        onChange={(e) => setState({...state, couplingCoefficient: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                </div>

                <div className="p-3 bg-qag-dark rounded border border-slate-700 text-xs text-slate-400 italic">
                    "Optimal resonance for Lithium Niobate and Liquid Hydrogen occurs at the 0.70 MHz Tesla Handshake."
                </div>
            </div>
        </div>

        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 font-mono text-sm space-y-3">
            <h4 className="text-xs text-slate-500 uppercase border-b border-slate-700 pb-2">Grid Diagnostics</h4>
            
            <div className="flex justify-between">
                <span className="text-slate-300">Effective Impedance (Z):</span>
                <span className={`${result.isSuperconductive ? 'text-green-400' : 'text-red-400'}`}>
                    {result.impedance.toFixed(2)} Ω
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-slate-300">Transmission Loss:</span>
                <span className="text-white">{result.transmissionLoss.toFixed(2)}%</span>
            </div>
            
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-600">
                <span className="text-slate-300">Coefficient of Performance:</span>
                <span className={`text-xl font-bold ${result.cop > 1 ? 'text-green-400 animate-pulse' : 'text-slate-400'}`}>
                    {result.cop.toFixed(3)}
                </span>
            </div>

            {result.cop > 1 && (
                <div className="text-center text-xs text-green-400 font-bold mt-2">
                    ZERO-POINT RESONANCE ACHIEVED (OVERUNITY)
                </div>
            )}
        </div>
      </div>

      <div className="bg-qag-panel p-4 rounded-xl border border-slate-700 min-h-[300px] flex flex-col">
        <h4 className="text-xs text-slate-400 uppercase mb-4">Energy Throughput Analysis</h4>
        <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                    contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155'}}
                    cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="val" fill="#fbbf24" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Output' && result.cop > 1 ? '#22c55e' : '#fbbf24'} />
                    ))}
                </Bar>
             </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergyView;