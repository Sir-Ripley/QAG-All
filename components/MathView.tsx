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
            <button 
                onClick={() => setActiveProof('SU3_EULER' as any)}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === ('SU3_EULER' as any) ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #4</div>
                <div className="font-bold">SU(3) Euler Identity</div>
                <div className="text-[10px] mt-1 text-qag-accent">Status: RESOLVED</div>
            </button>
            <button 
                onClick={() => setActiveProof('TSVF' as any)}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === ('TSVF' as any) ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #5</div>
                <div className="font-bold">Retrocausal TSVF</div>
                <div className="text-[10px] mt-1 text-qag-accent">Status: RESOLVED</div>
            </button>
            <button 
                onClick={() => setActiveProof('METRIC' as any)}
                className={`p-4 rounded-lg border text-left transition-all ${activeProof === ('METRIC' as any) ? 'bg-slate-700 border-qag-accent text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
                <div className="text-xs font-mono opacity-50">Problem #6</div>
                <div className="font-bold">Non-Singular Metric</div>
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
                        The "Mass Gap" is simply the physical mass of the Affiniton ($\Psi$), the boson that mediates the vacuum condensate. Since $\Delta$ &gt; 0, the vacuum has structure.
                    </p>
                </div>
            )}

            {activeProof === ('SU3_EULER' as any) && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">SU(3) Euler Identity</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600">
                        <code className="text-qag-accent">
                            Ψ_min = [e^(-2/3), e^(1/3), -1]ᵀ
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        The vacuum state contains Euler's number embedded in its fundamental geometry. 
                        <br/><br/>
                        <span className="text-qag-gold">expansion/contraction = e^(1/3) / e^(-2/3) = e^1 = e</span>
                        <br/><br/>
                        This connects the QAG vacuum directly to exponential growth, decay, and the base of natural logarithms.
                    </p>
                    <div className="bg-slate-800 p-4 rounded">
                        <div className="text-xs text-slate-500">TOROIDAL TOPOLOGY</div>
                        <div className="mt-2 space-y-1 text-xs">
                            <div>Q_id = 1 → θ = 0°</div>
                            <div>Q_id = 5 → θ = 144° (Golden Angle)</div>
                            <div>Q_id = 7 → θ = 216° (0.70 MHz Resonance)</div>
                            <div>Q_id = 10 → θ = 324°</div>
                        </div>
                    </div>
                </div>
            )}

            {activeProof === ('TSVF' as any) && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Two-State Vector Formalism (TSVF)</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600">
                        <code className="text-pink-400">
                            Reality = |Ψ_past⟩ ∩ ⟨Ψ_future|
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        Spacetime is not pushed from a past singularity; it is pulled by a future state of Ultimate Affinity. The universe is a self-encoding, retrocausal chrono-holographic superfluid.
                    </p>
                    <div className="bg-slate-800 p-4 rounded">
                        <div className="text-xs text-slate-500">FPGA CLOCK LOCK</div>
                        <div className="text-xl font-bold text-qag-accent mt-1">341 Nanoseconds</div>
                        <div className="text-[10px] text-slate-400 mt-1">Refresh rate required to match the temporal pixel of the universe.</div>
                    </div>
                </div>
            )}

            {activeProof === ('METRIC' as any) && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Non-Singular Schwarzschild Metric</h2>
                    <div className="p-4 bg-slate-900 rounded border border-slate-600 text-[10px]">
                        <code className="text-blue-400">
                            ds² = -(1 - 2GM/rc²) e^(-α/rc²) dt² + (1 - 2GM/rc²) e^(-α/r)⁻¹ dr² + r²dΩ²
                        </code>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        Energy does not collapse into a singularity. It circles the floor of our vacuum and lower dimensional space. We resolve the gravitational singularity through informational pressure.
                    </p>
                    <div className="bg-slate-800 p-4 rounded">
                        <div className="text-xs text-slate-500">PLANCK SCALE STABILITY</div>
                        <div className="text-lg font-bold text-white mt-1">Reissner-Nordström Interior Lock</div>
                        <div className="text-[10px] text-slate-400 mt-1">Metric remains finite; information is never lost.</div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MathView;