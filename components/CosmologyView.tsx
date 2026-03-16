import React, { useState, useEffect } from 'react';
import { CosmologyState, CosmologyResult } from '../types';
import { calculateCosmology } from '../utils/physics';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CosmologyView: React.FC = () => {
  const [state, setState] = useState<CosmologyState>({
    distanceAU: 2.5,
    velocity: 30,
    dielectricConstant: 0.8,
    scaleFactor: 1.0
  });
  
  const [result, setResult] = useState<CosmologyResult>(calculateCosmology(state));
  const [dataPoints, setDataPoints] = useState<any[]>([]);

  useEffect(() => {
    setResult(calculateCosmology(state));
  }, [state]);

  // Generate graph data based on current dielectric constant
  useEffect(() => {
    const points = [];
    for(let d = 0.5; d <= 6.0; d+=0.5) {
        const res = calculateCosmology({ ...state, distanceAU: d });
        points.push({
            au: d,
            newton: res.newtonianGravity,
            qag: res.totalAcceleration
        });
    }
    setDataPoints(points);
  }, [state.dielectricConstant]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
            <h3 className="text-qag-accent font-bold mb-4 flex items-center gap-2">
                🌌 AVI Law: Eradicating Dark Matter
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Galactic Distance (kpc)</label>
                    <input 
                        type="range" min="0.1" max="50.0" step="0.5" 
                        value={state.distanceAU}
                        onChange={(e) => setState({...state, distanceAU: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span>Core</span>
                        <span>{state.distanceAU} kpc</span>
                        <span>Halo</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Cosmic Scale Factor (a)</label>
                    <input 
                        type="range" min="0.1" max="5.0" step="0.1" 
                        value={state.scaleFactor}
                        onChange={(e) => setState({...state, scaleFactor: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span>Singularity</span>
                        <span>{state.scaleFactor.toFixed(1)}</span>
                        <span>Expansion</span>
                    </div>
                </div>

                <div className="p-3 bg-qag-dark rounded border border-slate-700 text-xs text-slate-400 italic">
                    "Massive structures bind together naturally because they are surfing the resonant coherence wave of the vacuum floor itself."
                </div>
            </div>
        </div>

        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 font-mono text-sm space-y-2">
            <h4 className="text-xs text-slate-500 uppercase border-b border-slate-700 pb-2 mb-2">Galactic Theater Diagnostics</h4>
            <div className="flex justify-between">
                <span className="text-slate-400">QAG Hubble (H_qag):</span>
                <span className="text-white">{result.h_qag.toFixed(2)} km/s/Mpc</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-400">Vacuum Tension:</span>
                <span className="text-blue-400">{result.vacuumTension.toExponential(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-400">Recycling (R_qag):</span>
                <span className="text-qag-gold">{(result.recyclingCoefficient * 100).toFixed(2)}%</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 mb-1">COHERENCE STATUS</div>
                {result.recyclingCoefficient > 0.5 ? (
                    <div className="text-green-400 font-bold bg-green-900/20 p-2 rounded border border-green-700/50">
                        ✅ THEATER IS COHERENT
                    </div>
                ) : (
                    <div className="text-red-400 bg-red-900/20 p-2 rounded border border-red-700/50">
                        Dissonant State Detected
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="lg:col-span-8 bg-qag-panel rounded-xl border border-slate-700 p-4 min-h-[400px] relative overflow-hidden">
        <h4 className="text-xs text-slate-400 uppercase absolute top-4 left-4 z-10">Radial Acceleration Relation (RAR)</h4>
        
        {/* Simple Graphic for Comet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
            {/* Sun */}
            <div className="absolute top-1/2 left-[10%] w-16 h-16 bg-yellow-500 rounded-full blur-xl"></div>
            {/* Jupiter */}
            <div className="absolute top-1/2 right-[10%] w-12 h-12 bg-orange-700 rounded-full blur-xl"></div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="au" stroke="#94a3b8" label={{ value: 'Distance (AU)', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#38bdf8'}} />
                <Line type="monotone" dataKey="newton" stroke="#94a3b8" strokeDasharray="5 5" name="Newtonian" />
                <Line type="monotone" dataKey="qag" stroke="#38bdf8" strokeWidth={3} name="QAG (Total)" />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CosmologyView;