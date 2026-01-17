import React, { useState, useEffect } from 'react';
import { CosmologyState, CosmologyResult } from '../types';
import { calculateCosmology } from '../utils/physics';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CosmologyView: React.FC = () => {
  const [state, setState] = useState<CosmologyState>({
    distanceAU: 2.5,
    velocity: 30,
    dielectricConstant: 0.8
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
                ☄️ 3I/Atlas Parametrics
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Solar Distance (AU)</label>
                    <input 
                        type="range" min="0.1" max="6.0" step="0.1" 
                        value={state.distanceAU}
                        onChange={(e) => setState({...state, distanceAU: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span>Sun (0 AU)</span>
                        <span>{state.distanceAU} AU</span>
                        <span>Jupiter (5.2 AU)</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Dielectric Constant (Susceptibility)</label>
                    <input 
                        type="range" min="0.1" max="2.0" step="0.1" 
                        value={state.dielectricConstant}
                        onChange={(e) => setState({...state, dielectricConstant: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent"
                    />
                </div>
            </div>
        </div>

        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 font-mono text-sm space-y-2">
            <div className="flex justify-between">
                <span className="text-slate-400">Affinity Drift (a_ng):</span>
                <span className="text-qag-gold">{(result.affinityDrift * 1e5).toFixed(2)}e-5</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-400">Hill Sphere Resonance:</span>
                <span className={`${result.jupiterResonance > 0.8 ? 'text-qag-danger animate-pulse' : 'text-slate-200'}`}>
                    {(result.jupiterResonance * 100).toFixed(1)}%
                </span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 mb-1">STATUS</div>
                {result.isAntiTailVisible ? (
                    <div className="text-qag-gold font-bold bg-yellow-900/30 p-2 rounded border border-yellow-700">
                        ⚠️ PIEZOELECTRIC DISCHARGE DETECTED (ANTI-TAIL)
                    </div>
                ) : (
                    <div className="text-slate-400 bg-slate-800 p-2 rounded">
                        Vacuum Stress Nominal
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