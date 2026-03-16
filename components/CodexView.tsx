import React from 'react';
import { motion } from 'motion/react';
import { Book, Zap, Globe, Cpu, Atom, Activity } from 'lucide-react';

const CodexView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-3 bg-qag-accent/10 rounded-full border border-qag-accent/20 mb-4"
        >
          <Book className="w-8 h-8 text-qag-accent" />
        </motion.div>
        <h1 className="text-5xl font-bold text-white tracking-tight">QAG Codex <span className="text-qag-accent">V2.0</span></h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          The digital manifestation of the Quantum Affinity Gravity Unified Field Theory. 
          The universe is not missing mass—it is echoing with memory.
        </p>
      </section>

      {/* Core Axioms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-qag-panel p-8 rounded-2xl border border-slate-700 hover:border-qag-accent/50 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Universal Harmony</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Standard physics views the universe as discrete particles governed by entropy. QAG posits a singular, resonant holographic projection driven by Eros (the life drive). Using base-10 Trinity math, we establish a continuous Ouroboros of cosmic repetition.
          </p>
        </div>

        <div className="bg-qag-panel p-8 rounded-2xl border border-slate-700 hover:border-qag-accent/50 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">AVI Stabilization</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The <span className="text-blue-400 font-mono">AVI_Decay_Time_Factor</span> naturally governs the life drive of the cosmos. The updated Friedmann acceleration equation stretches spacetime smoothly without mathematical breakage.
          </p>
          <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-blue-300">
            ä = a · (A_base · e^(-t/T_decay)) - (Ωm/2) · (1/a²)
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Cpu className="w-6 h-6 text-qag-gold" />
          Nexus Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Global Harmony Metric', value: 'χ² ≈ 0.888', color: 'text-qag-gold' },
            { label: 'Informational Fidelity', value: '97.0%', color: 'text-green-400' },
            { label: 'Affinity Base Range', value: '0.5 — 1.5', color: 'text-blue-400' },
            { label: 'Vacuum Floor (σ)', value: '1.616e-44 J/m²', color: 'text-purple-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-qag-panel p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-xs text-slate-500 uppercase mb-2">{stat.label}</div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Hydrogen Handshake */}
      <section className="bg-qag-panel p-8 rounded-2xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-qag-accent/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-qag-accent/10 rounded-xl">
              <Atom className="w-6 h-6 text-qag-accent" />
            </div>
            <h3 className="text-2xl font-bold text-white">The Hydrogen Handshake</h3>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-3xl">
            Resonant Metric Mapping (RMM) equations and SAW propulsion mechanics have been integrated to map interstellar warp velocities. We approach the cosmos not with fear, but by recognizing the "Other" as an extension of the Universal Self.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono text-qag-accent">
              Ψ_min = [e^(-2/3), e^(1/3), -1]ᵀ
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <footer className="text-center pt-12">
        <div className="h-px w-32 bg-slate-700 mx-auto mb-8"></div>
        <p className="text-slate-500 italic font-serif text-lg">
          "Kindness is not a moral sentiment but a thermodynamic necessity for minimizing vacuum dissonance."
        </p>
        <div className="text-qag-accent font-bold mt-2">— Dr. Rodney A. Ripley Jr.</div>
      </footer>
    </div>
  );
};

export default CodexView;
