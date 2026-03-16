import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Share2, Database, Activity, Code, Copy, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const S5CipherView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [alpha, setAlpha] = useState(0.1);
  const [rAff, setRaff] = useState(15.0);
  const [mRatio, setMratio] = useState(1.2);
  const [rResonance, setRresonance] = useState(0.80);
  const [nNodes, setNnodes] = useState(12);

  const pythonCode = `import os
import requests
import zipfile
import io
import numpy as np
import pandas as pd
from scipy.optimize import curve_fit

# --- PROJECT NEXUS CONFIGURATION ---
# Project ID: qag-v2-32133194-bcde5
# Author: Rodney A. Ripley Jr.
# Theory: Quantum Affinity Gravity (QAG) - S5 Hive Brain Injection

class QAG_Master_Validator:
    """
    Automated Validity Sensor for the QAG Unified Field Theory.
    Downloads SPARC data and validates the S5 Base 12 Echo across all galaxies.
    """
    def __init__(self):
        self.data_dir = "sparc_data"
        self.results = []
        self.total_chi_sq = 0
        self.total_dof = 0
        self.sparc_url = "http://astroweb.cwru.edu/SPARC/Rotmod_LTG.zip"

    def download_sparc(self):
        if not os.path.exists(self.data_dir):
            print(f"📡 Downloading SPARC Registry from {self.sparc_url}...")
            r = requests.get(self.sparc_url)
            z = zipfile.ZipFile(io.BytesIO(r.content))
            z.extractall(self.data_dir)
            print("💎 Registry Extracted.")

    def qag_soul_wave_s5(self, r, r_aff, alpha, m_ratio, v_disk, v_gas, v_bulge=0):
        """
        THE S5 BASE 12 HIVE BRAIN EQUATION
        Injecting the 5-sphere resonance echo into the baryonic mass.
        """
        # Summing baryonic contributions with m_ratio (Mass-to-Light)
        v_bary_sq = (m_ratio * (v_disk**2 + v_bulge**2)) + v_gas**2
        v_bary = np.sqrt(np.maximum(v_bary_sq, 0))
        
        # S5 Base 12 Echo Circuitry
        N_nodes = 12
        R_resonance = 0.80 # Dimensional resonance retention for S5
        
        # Calculate the Total Echo Signal (E) across the hive brain
        E_total = sum([R_resonance**n for n in range(1, N_nodes + 1)])
        
        # The Quantum Lift now processes the 5D echo to immediately effect the 3D state
        quantum_lift = 10 ** ((alpha * E_total) * (r / r_aff))
        return v_bary * quantum_lift

    def validate_galaxy(self, filepath):
        # Load SPARC .dat file: Rad(1) Vobs(2) errV(3) Vgas(4) Vdisk(5) Vbul(6)
        try:
            data = pd.read_csv(filepath, sep='\\s+', skiprows=3, header=None, 
                               names=['r', 'v_obs', 'v_err', 'v_gas', 'v_disk', 'v_bulge'])
            
            # Optimization wrapper routing to the new S5 code injection
            def fit_func(r, r_aff, alpha, m_ratio):
                return self.qag_soul_wave_s5(r, r_aff, alpha, m_ratio, data['v_disk'], data['v_gas'], data['v_bulge'])

            # Fit the S5 Echo Law to the observed 3D data
            popt, _ = curve_fit(fit_func, data['r'], data['v_obs'], 
                                p0=[15.0, 0.1, 1.2], 
                                sigma=data['v_err'], 
                                bounds=([0.1, 0.0, 0.1], [100.0, 2.0, 5.0]),
                                maxfev=10000)

            v_pred = fit_func(data['r'], *popt)
            chi_sq = np.sum(((data['v_obs'] - v_pred) / data['v_err'])**2)
            dof = len(data['r']) - len(popt)
            
            if dof > 0:
                self.total_chi_sq += chi_sq
                self.total_dof += dof
                return {"Galaxy": os.path.basename(filepath), "r_aff": popt[0], 
                        "alpha": popt[1], "m_ratio": popt[2], "Fidelity": chi_sq/dof}
        except Exception as e:
            return None

    def run_full_validation(self):
        self.download_sparc()
        print("🔍 SCANNING HIGHER-DIMENSIONAL RESONANT SECTOR...")
        
        files = [f for f in os.listdir(self.data_dir) if f.endswith('.dat')]
        for f in files:
            res = self.validate_galaxy(os.path.join(self.data_dir, f))
            if res:
                self.results.append(res)
        
        # --- THE ABSOLUTE TRUTH SCORE ---
        master_score = self.total_chi_sq / self.total_dof
        
        df_results = pd.DataFrame(self.results)
        df_results.to_csv("qag_s5_master_report.csv", index=False)
        
        print("\\n" + "🌀" * 40)
        print(f"🌌 S5 HIVE BRAIN GLOBAL FIDELITY SCORE: {master_score:.5f}")
        print(f"📊 REPORT SAVED: qag_s5_master_report.csv")
        print("🌀" * 40)
        
        if master_score < 0.05:
            print("💎 STATUS: MULTIDIMENSIONAL HARMONY DETECTED. VALIDITY CONFIRMED! Peace and love.")

if __name__ == "__main__":
    validator = QAG_Master_Validator()
    validator.run_full_validation()`;

  const copyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock Galaxy Data (e.g., NGC 3198)
  const mockGalaxy = useMemo(() => {
    // Extended high-resolution dataset
    const r = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30];
    const v_gas = [5, 10, 15, 20, 25, 30, 32, 35, 38, 40, 41, 42, 43, 44, 45, 45, 45, 45, 45];
    const v_disk = [30, 50, 70, 80, 88, 95, 98, 100, 102, 105, 106, 105, 102, 98, 95, 92, 90, 88, 85];
    const v_obs = [35, 60, 85, 90, 100, 110, 115, 120, 125, 130, 133, 135, 138, 139, 140, 141, 142, 142, 142];
    const v_err = [3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

    // Calculate E_total
    let E_total = 0;
    for (let n = 1; n <= nNodes; n++) {
      E_total += Math.pow(rResonance, n);
    }

    const points = [];
    let chiSq = 0;

    for (let i = 0; i < r.length; i++) {
      const v_bary_sq = (mRatio * Math.pow(v_disk[i], 2)) + Math.pow(v_gas[i], 2);
      const v_bary = Math.sqrt(Math.max(v_bary_sq, 0));
      
      // The Wave Function Simulation: Ψ_QAG(t, M)
      // We simulate the temporal echo effect on the spatial geometry
      const timeDilationFactor = 1 + (E_total * 0.01); // Simplified chrono-holographic delay
      const effectiveRadius = r[i] / timeDilationFactor;
      
      const quantum_lift = Math.pow(10, (alpha * E_total) * (effectiveRadius / rAff));
      const v_pred = v_bary * quantum_lift;

      chiSq += Math.pow((v_obs[i] - v_pred) / v_err[i], 2);

      points.push({
        r: r[i],
        v_obs: v_obs[i],
        v_pred: v_pred,
        v_bary: v_bary
      });
    }

    const dof = r.length - 3; // 3 parameters: alpha, r_aff, m_ratio
    const reducedChiSq = chiSq / dof;

    return { points, reducedChiSq, E_total };
  }, [alpha, rAff, mRatio, rResonance, nNodes]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
      {/* Left Column: Python Script & Info */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-qag-accent font-bold flex items-center gap-2">
              <Code className="w-5 h-5" /> S5 Hive Brain Injection (Python)
            </h3>
            <button 
              onClick={copyCode}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 transition-colors text-xs font-mono"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            This is the <strong>Chrono-Holographic Cipher</strong>. Use this testable, experimental code to automatically download the SPARC galaxy database and validate the S5 Base 12 Echo across 175+ galaxies.
          </p>
          
          <div className="relative">
            <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-[10px] text-qag-accent overflow-x-auto h-[400px] overflow-y-auto custom-scrollbar">
              <code>{pythonCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Web App Simulator */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-qag-panel p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-qag-gold" />
            Live S5 Echo Validation Simulator
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 uppercase">
                  <span>Alpha (α)</span>
                  <span className="font-mono text-qag-accent">{alpha.toFixed(3)}</span>
                </div>
                <input type="range" min="0" max="0.5" step="0.001" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 uppercase">
                  <span>Affinity Radius (r_aff)</span>
                  <span className="font-mono text-qag-accent">{rAff.toFixed(1)} kpc</span>
                </div>
                <input type="range" min="5" max="50" step="0.5" value={rAff} onChange={(e) => setRaff(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 uppercase">
                  <span>Mass-to-Light (M/L)</span>
                  <span className="font-mono text-qag-accent">{mRatio.toFixed(2)}</span>
                </div>
                <input type="range" min="0.1" max="3.0" step="0.05" value={mRatio} onChange={(e) => setMratio(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-qag-accent" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 uppercase">
                  <span>S5 Resonance (R)</span>
                  <span className="font-mono text-purple-400">{rResonance.toFixed(2)}</span>
                </div>
                <input type="range" min="0.1" max="0.99" step="0.01" value={rResonance} onChange={(e) => setRresonance(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 uppercase">
                  <span>Nodes (Base 12)</span>
                  <span className="font-mono text-purple-400">{nNodes}</span>
                </div>
                <input type="range" min="1" max="24" step="1" value={nNodes} onChange={(e) => setNnodes(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400" />
              </div>
            </div>

            {/* Live Metrics */}
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-500 uppercase mb-1">Total Echo Signal (E_total)</div>
                <div className="text-2xl font-bold text-purple-400 font-mono">{mockGalaxy.E_total.toFixed(3)}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-500 uppercase mb-1">Mock Galaxy Fidelity (χ²/ν)</div>
                <div className={`text-2xl font-bold font-mono ${mockGalaxy.reducedChiSq < 1.5 ? 'text-green-400' : mockGalaxy.reducedChiSq < 3.0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {mockGalaxy.reducedChiSq.toFixed(4)}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Target: ~1.0</div>
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGalaxy.points} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="r" stroke="#94a3b8" label={{ value: 'Radius (kpc)', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#94a3b8" label={{ value: 'Velocity (km/s)', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8' }} />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="v_obs" stroke="#ffffff" strokeWidth={2} dot={{ r: 4 }} name="Observed (v_obs)" />
                <Line type="monotone" dataKey="v_bary" stroke="#94a3b8" strokeDasharray="5 5" name="Baryonic (v_bary)" />
                <Line type="monotone" dataKey="v_pred" stroke="#38bdf8" strokeWidth={3} name="S5 Echo Prediction" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S5CipherView;
