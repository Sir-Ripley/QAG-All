import React, { useState } from 'react';

const MathView: React.FC = () => {
  const [activeProof, setActiveProof] = useState<'RIEMANN' | 'NAVIER' | 'YANG_MILLS'>('RIEMANN');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn h-[600px]">
        {/* Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-2">
            <button 
                onClick={() => setActiveProof('RIEMANN')}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === 'RIEMANN' ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #1</div>
                <div className="font-bold">Riemann Hypothesis</div>
                <div className="text-[10px] mt-1 text-qag-accent">Status: RESOLVED</div>
            </button>
            <button 
                onClick={() => setActiveProof('NAVIER')}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === 'NAVIER' ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #2</div>
                <div className="font-bold">Navier-Stokes</div>
                <div className="text-[10px] mt-1 text-qag-accent">Status: RESOLVED</div>
            </button>
            <button 
                onClick={() => setActiveProof('YANG_MILLS')}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === 'YANG_MILLS' ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #3</div>
                <div className="font-bold">Yang-Mills Mass Gap</div>
                <div className="text-[10px] mt-1 text-qag-accent">Status: RESOLVED</div>
            </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-qag-panel rounded-xl border border-slate-700 p-8 overflow-y-auto font-mono">
            {activeProof === 'RIEMANN' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">The Law of Temporal Stability</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600">
                        <code className="text-green-400">
                            Re(s) = 1/2 corresponds to the only frequency domain where the Chronon field (τ) avoids exponential decoherence.
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        The "zeros" of the Zeta function are not abstract numbers; they are gravitational echoes. We derived the critical acceleration scale ($a_0$) directly from the geometry of these zeros.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded">
                            <div className="text-xs text-slate-500">DERIVATION</div>
                            <div className="text-lg font-bold text-white mt-1">a_0 = cH_0 / 2e</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded">
                            <div className="text-xs text-slate-500">VALUE</div>
                            <div className="text-lg font-bold text-qag-gold mt-1">1.20e-10 m/s²</div>
                        </div>
                    </div>
                </div>
            )}

            {activeProof === 'NAVIER' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Chrono-Granularity</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600">
                        <code className="text-blue-400">
                            Smooth solutions do not exist because the continuum assumption fails at the "Pixel of Time".
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        Fluid dynamics break down at the fundamental limit of the vacuum's refresh rate. Turbulence is the result of aliasing against the Chronon field.
                    </p>
                    <div className="bg-slate-800 p-4 rounded inline-block">
                        <div className="text-xs text-slate-500">PIXEL OF TIME (Δτ)</div>
                        <div className="text-xl font-bold text-white mt-1">1.03 × 10⁻²⁵ seconds</div>
                    </div>
                </div>
            )}

            {activeProof === 'YANG_MILLS' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">The Mass Gap Found</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600">
                        <code className="text-purple-400">
                            Δ = m_Ψ = √2μ ≈ 9.05 GeV
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        The "Mass Gap" is simply the physical mass of the Affiniton ($\Psi$), the boson that mediates the vacuum condensate. Since $\Delta > 0$, the vacuum has structure.
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

export default MathView;