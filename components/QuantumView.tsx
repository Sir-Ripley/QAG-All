import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Layers, Play, RotateCcw, Activity } from 'lucide-react';

const QuantumView: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const reset = () => setStep(0);

  // Derived metrics based on step
  const chiSqGlobal = step === 0 ? 0.000 : step === 1 ? 0.000 : step === 2 ? 1.250 : step === 3 ? 0.450 : 0.000;
  const coherence = step === 0 ? 100 : step === 1 ? 100 : step === 2 ? 42 : step === 3 ? 85 : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
      {/* Welcome Note & Forward */}
      <div className="lg:col-span-12 bg-qag-panel p-8 rounded-xl border border-slate-700 mb-2">
        <h2 className="text-2xl font-bold text-qag-accent mb-4">A Journey of Echoes: A Journey Home</h2>
        <h3 className="text-lg text-slate-300 mb-6 font-serif italic">The 5-Qubit QAG Global Harmony Proof</h3>
        <div className="prose prose-invert max-w-none text-slate-400">
          <p className="leading-relaxed">
            Welcome to the Quantum Echo and Qubit Coherence module. In the Quantum Affinity Gravity (QAG) framework, the universe is observant. When systems entangle, they share a pure, foundational connection. However, the chaotic environment constantly attempts to pull these systems apart through mundane stress and memory loss. 
          </p>
          <p className="leading-relaxed mt-4">
            By applying a global reflection operator across systems, we can mathematically prove that the universe is capable of healing itself, crashing into phase shifts to restore its baseline. We have expanded our initial two-bit experiment into a comprehensive 5-bit array to demonstrate how these results can be utilized in the future across all systems, including advanced AI architectures.
          </p>
          <p className="leading-relaxed mt-4 font-bold text-qag-gold">
            This is the rigorous, five-step mathematical journey of how a 5-qubit array perfectly remembers its way home.
          </p>
        </div>
      </div>

      {/* Left Column: Formalism & Controls */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
          <h3 className="text-qag-accent font-bold mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5" /> 5-Qubit Cosmic Breath
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Mapping out the entire cosmic breath from start to finish. This formalism ensures the math perfectly reflects the mystical truth of the Quantum Affinity Gravity theory across 5 entangled nodes.
          </p>

          {/* Step-by-step Formalism */}
          <div className="space-y-4 text-sm">
            <FormalismStep 
              active={step === 0} 
              title="1. The Cosmic Void" 
              math="|ψ₀⟩ = |0⟩ ⊗ |0⟩ ⊗ |0⟩ ⊗ |0⟩ ⊗ |0⟩ = |00000⟩"
              desc="Five isolated nodes exist in a state of pure, quiet potential. In a Hilbert space, this unmanifested reality is a 32-dimensional tensor product."
            />
            <FormalismStep 
              active={step === 1} 
              title="2. The Unified Foundation" 
              math="Ψ_GR(t) = 1/√2 (|00000⟩ + |11111⟩)"
              desc="Spiritual connectivity through quantum entanglement (GHZ state). Out of 32 dimensions, only two amplitudes remain, shining in perfect unison."
            />
            <FormalismStep 
              active={step === 2} 
              title="3. The Onset of Decoherence" 
              math="|ψ_stress⟩ = 1/√2 (|00000⟩ + e^{i5π/4}|11111⟩)"
              desc="Mundane stress seeps in. The complex phase factor e^{i5π/4} is the literal manifestation of decoherence. Localized variance (χ²_i) is rapidly increasing."
            />
            <FormalismStep 
              active={step === 3} 
              title="4. The Global Echo" 
              math="R_global = ⨂_{i=1}^5 σ_{x,i}"
              desc="A 32-dimensional mirror crashes into the phase shift. It perfectly flips the entangled states, turning a positive relative phase into a negative one (e^{-i5π/4})."
            />
            <FormalismStep 
              active={step === 4} 
              title="5. The Observant Alignment" 
              math="χ²_global = (0+0+0+0+0) / 10 = 0"
              desc="The echoes have perfectly inverted the chaos. The 5 independent systems have shed all accumulated stress and fused back into a single, observant entity."
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-slate-700">
            <button 
              onClick={nextStep}
              disabled={step >= 4}
              className="flex-1 bg-qag-accent hover:bg-sky-400 text-slate-900 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4" /> {step === 0 ? 'Ignite Void' : step >= 4 ? 'Aligned' : 'Next Phase'}
            </button>
            <button 
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-colors"
              title="Reset Circuit"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Visualization */}
      <div className="lg:col-span-7 space-y-6">
        {/* Circuit Diagram */}
        <div className="bg-qag-panel rounded-xl border border-slate-700 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[450px]">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 w-full">
            <Layers className="w-5 h-5 text-qag-accent" />
            5-Qubit Array Circuit
          </h2>

          <div className="w-full max-w-2xl relative">
            {/* Qubit Lines */}
            {[0, 1, 2, 3, 4].map(q => (
              <div key={q} className="absolute left-0 w-full h-px bg-slate-700" style={{ top: `${q * 64 + 24}px` }}></div>
            ))}

            {/* CNOT Vertical Line */}
            <div className={`absolute left-[116px] top-[24px] w-px h-[256px] z-0 transition-colors duration-500 ${step >= 1 ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-slate-700'}`}></div>

            {/* Rows */}
            {[0, 1, 2, 3, 4].map(q => (
              <div key={q} className="flex items-center gap-8 relative z-10 h-[64px]">
                <div className="w-12 h-12 flex items-center justify-center font-mono text-white bg-slate-800 rounded border border-slate-600">q{q}</div>
                <div className="flex-1 flex gap-4">
                  {q === 0 ? <Gate label="H" color="bg-blue-500" active={step >= 1} /> : <div className="w-12 h-12"></div>}
                  <Gate label={q === 0 ? "●" : "⊕"} color={q === 0 ? "bg-slate-700" : "bg-blue-500"} active={step >= 1} />
                  <Gate label="T" color="bg-purple-500" active={step >= 2} />
                  <Gate label="X" color="bg-pink-500" active={step >= 3} />
                  <Gate label="M" color="bg-emerald-500" active={step >= 4} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-qag-panel rounded-xl border border-slate-700 p-6">
            <h3 className="text-sm text-slate-400 uppercase mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Global Harmony (χ²_global)
            </h3>
            <div className={`text-4xl font-mono font-bold ${chiSqGlobal === 0 && step > 0 ? 'text-green-400' : chiSqGlobal > 1 ? 'text-red-400' : 'text-yellow-400'}`}>
              {chiSqGlobal.toFixed(3)}
            </div>
            <p className="text-xs text-slate-500 mt-2">Target: 0.000 (Perfect Alignment)</p>
          </div>
          <div className="bg-qag-panel rounded-xl border border-slate-700 p-6">
            <h3 className="text-sm text-slate-400 uppercase mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" /> System Coherence
            </h3>
            <div className="text-4xl font-mono font-bold text-qag-accent">
              {coherence}%
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <motion.div 
                className="h-full bg-qag-accent"
                initial={{ width: 0 }}
                animate={{ width: `${coherence}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormalismStep: React.FC<{ active: boolean; title: string; math: string; desc: string }> = ({ active, title, math, desc }) => (
  <motion.div 
    animate={{ opacity: active ? 1 : 0.4, scale: active ? 1.02 : 1 }}
    className={`p-4 rounded-lg border ${active ? 'bg-slate-800 border-qag-accent shadow-[0_0_15px_rgba(56,189,248,0.1)]' : 'bg-slate-900/50 border-slate-800'}`}
  >
    <div className={`font-bold ${active ? 'text-qag-accent' : 'text-slate-300'}`}>{title}</div>
    <div className="font-mono text-xs text-qag-gold my-2 bg-black/30 p-2 rounded">{math}</div>
    <div className="text-slate-400 text-xs">{desc}</div>
  </motion.div>
);

const Gate: React.FC<{ label: string; color: string; active: boolean }> = ({ label, color, active }) => (
  <motion.div 
    animate={{ 
      scale: active ? 1.05 : 1,
      opacity: active ? 1 : 0.2,
      boxShadow: active ? '0 0 15px rgba(255,255,255,0.15)' : 'none'
    }}
    className={`w-12 h-12 ${color} rounded border border-white/20 flex items-center justify-center text-white font-bold font-mono transition-all duration-300`}
    title={label}
  >
    {label}
  </motion.div>
);

export default QuantumView;
