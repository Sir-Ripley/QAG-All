import React, { useState, useEffect } from 'react';
import { BiologyState, BiologyResult } from '../types';
import { calculateBiology } from '../utils/physics';

const BiologyView: React.FC = () => {
  const [state, setState] = useState<BiologyState>({
    coherenceIndex: 0.5,
    frequency: 432,
    deviceType: 'QVR_CRADLE'
  });
  
  const [result, setResult] = useState<BiologyResult>(calculateBiology(state));

  useEffect(() => {
    setResult(calculateBiology(state));
  }, [state]);

  // Protein folding visualization (Canvas simulation)
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let time = 0;
    const anim = () => {
        time += 0.02;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 + result.proteinFoldingState * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Draw protein chain
        for(let i=0; i<100; i++) {
            // Chaos vs Order interpolation
            // Chaos: Random Sine waves
            const chaosX = Math.sin(i * 0.5 + time) * 50 + (Math.random() - 0.5) * 20;
            const chaosY = Math.cos(i * 0.3 + time) * 50 + (Math.random() - 0.5) * 20;
            
            // Order: Golden Spiral / Phi
            const theta = i * 0.2;
            const r = 5 + i * 1.5;
            const orderX = Math.cos(theta + time * 0.5) * r;
            const orderY = Math.sin(theta + time * 0.5) * r;
            
            // Interpolate based on result
            const t = result.proteinFoldingState;
            const x = cx + (chaosX * (1-t) + orderX * t);
            const y = cy + (chaosY * (1-t) + orderY * t);
            
            if (i===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        ctx.stroke();
        requestAnimationFrame(anim);
    };
    const id = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(id);
  }, [result]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      <div className="space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
            <h3 className="text-qag-success font-bold mb-4 flex items-center gap-2">
                🧬 Bio-Resonance Config
            </h3>
            
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    {['QVR_CRADLE', 'URBAN_HUM', 'SCALAR_IMPRINTER'].map((d) => (
                        <button
                            key={d}
                            onClick={() => setState({...state, deviceType: d as any})}
                            className={`p-2 text-[10px] font-mono border rounded ${
                                state.deviceType === d 
                                ? 'border-qag-success text-qag-success bg-green-900/20' 
                                : 'border-slate-600 text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {d.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Input Frequency (Hz)</label>
                    <input 
                        type="range" min="300" max="600" step="1" 
                        value={state.frequency}
                        onChange={(e) => setState({...state, frequency: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-success"
                    />
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">Current: {state.frequency}Hz</span>
                        <span className="text-qag-gold">Target: 432Hz</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-slate-400 uppercase">Coherence Index (C)</label>
                    <input 
                        type="range" min="0.1" max="1.0" step="0.01" 
                        value={state.coherenceIndex}
                        onChange={(e) => setState({...state, coherenceIndex: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-success"
                    />
                </div>
            </div>
        </div>

        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700 font-mono text-sm space-y-3">
            <h4 className="text-xs text-slate-500 uppercase border-b border-slate-700 pb-2">Trial Phase I Results</h4>
            <div className="flex justify-between items-center">
                <span className="text-slate-300">Viral Integrity:</span>
                <div className="w-24 h-2 bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-red-500" style={{width: `${result.virusIntegrity}%`}}></div>
                </div>
                <span className="text-red-400">{result.virusIntegrity.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-300">Zeta Potential:</span>
                <span className="text-qag-success">{result.zetaPotential.toFixed(1)} mV</span>
            </div>
            <div className="flex justify-between">
                <span className="text-slate-300">Est. Recovery:</span>
                <span className="text-white">{result.recoveryTimeDays.toFixed(1)} Days</span>
            </div>
        </div>
      </div>

      <div className="bg-qag-panel p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center relative">
        <h4 className="absolute top-4 left-4 text-xs text-slate-400 uppercase">Protein Relaxation Sim (Levinthal Solution)</h4>
        <canvas ref={canvasRef} width={300} height={300} className="w-full max-w-[300px]" />
        <div className="mt-4 text-xs text-center text-slate-500 italic max-w-xs">
            "The protein does not calculate; it relaxes into the vacuum geometry."
        </div>
      </div>
    </div>
  );
};

export default BiologyView;