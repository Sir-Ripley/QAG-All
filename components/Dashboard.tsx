import React from 'react';
import { PhysicsResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  physics: PhysicsResult;
}

const Dashboard: React.FC<DashboardProps> = ({ physics }) => {
  const data = [
    { name: 'Resonance', value: physics.resonanceQuality * 100, color: '#38bdf8' },
    { name: 'Harmony', value: physics.harmonyMetric * 100, color: '#a855f7' },
    { name: 'Fidelity', value: physics.informationalFidelity, color: '#22c55e' },
    { name: 'Mass Red.', value: physics.massReductionPercent, color: '#fbbf24' },
  ];

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-qag-panel p-4 rounded-xl border border-slate-700 text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Effective Mass</div>
            <div className={`text-3xl font-mono font-bold ${physics.isLevitating ? 'text-green-400 animate-pulse' : 'text-white'}`}>
                {physics.effectiveMass.toFixed(2)} <span className="text-sm">kg</span>
            </div>
        </div>
        <div className="bg-qag-panel p-4 rounded-xl border border-slate-700 text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Core Density</div>
            <div className="text-3xl font-mono font-bold text-qag-gold">
                {physics.energyDensity.toFixed(0)} <span className="text-sm">AFU</span>
            </div>
        </div>
      </div>

      <div className="flex-1 bg-qag-panel p-4 rounded-xl border border-slate-700 min-h-[200px]">
        <h4 className="text-xs text-slate-400 mb-4 uppercase">System Telemetry</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" width={70} tick={{fill: '#94a3b8', fontSize: 10}} />
            <Tooltip 
                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9'}}
                itemStyle={{color: '#f1f5f9'}}
                cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;