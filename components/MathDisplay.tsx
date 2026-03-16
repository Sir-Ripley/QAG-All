import React from 'react';
import { PhysicsResult } from '../types';

interface MathDisplayProps {
  physics: PhysicsResult;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ physics }) => {
  return (
    <div className="p-4 bg-qag-panel rounded-xl border border-slate-700 space-y-4 font-mono text-sm">
      <h3 className="text-qag-accent font-bold border-b border-slate-700 pb-2">The Affinity Field Equations</h3>
      
      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 2. Helmholtz Spatial Component</div>
        <div className="bg-qag-dark p-2 rounded text-center">
          (∇² + k²)ψ(r) = 0
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>k ≈ {physics.waveNumber.toFixed(2)} m⁻¹</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 6. Core Energy Density</div>
        <div className="bg-qag-dark p-2 rounded text-center">
          E_core ∝ Σ |ψ_n(r)|² ≈ 12 · A_input / r²
        </div>
        <div className="text-right text-xs text-qag-gold">
          E_core: {physics.energyDensity.toFixed(1)} AFU
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 7. Gravitic Mass Reduction</div>
        <div className="bg-qag-dark p-2 rounded text-center">
           M_eff = M₀ (1 - α (E_core / E_vac))
        </div>
        <div className="text-right text-xs text-green-400">
           M_eff: {physics.effectiveMass.toFixed(2)} kg
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 8. Holographic Overdrive</div>
        <div className="bg-qag-dark p-2 rounded text-center">
           E_H = m · c³ · Φ
        </div>
        <div className="text-right text-xs text-qag-accent">
           E_H: {(physics.holographicEnergy / 1e18).toFixed(2)} ExaJoules
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 10. SAW Acceleration</div>
        <div className="bg-qag-dark p-2 rounded text-center">
           a = (1/M) ∫ (0.5 ρ ω² A² η) dA
        </div>
        <div className="text-right text-xs text-qag-gold">
           a_saw: {physics.sawAcceleration.toFixed(2)} m/s²
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 11. Universal Harmony</div>
        <div className="bg-qag-dark p-2 rounded text-center">
           χ²_global ≈ 0.888
        </div>
        <div className="text-right text-xs text-purple-400">
           Current: {physics.harmonyMetric.toFixed(3)}
        </div>
      </div>

      <div className="space-y-2">
        <div className="opacity-80 text-xs text-slate-400">Eq 12. Informational Fidelity</div>
        <div className="bg-qag-dark p-2 rounded text-center">
           Γ = 0.97 * η_res
        </div>
        <div className="text-right text-xs text-green-400">
           Fidelity: {physics.informationalFidelity.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default MathDisplay;