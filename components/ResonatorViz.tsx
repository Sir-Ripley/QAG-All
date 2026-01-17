import React, { useEffect, useRef } from 'react';
import { PhysicsResult } from '../types';

interface ResonatorVizProps {
  physics: PhysicsResult;
  inputAmplitude: number;
}

const ResonatorViz: React.FC<ResonatorVizProps> = ({ physics, inputAmplitude }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05 + (physics.resonanceQuality * 0.1);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Draw background glow based on energy density
      const glowIntensity = Math.min(1, physics.energyDensity / 2000);
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, `rgba(56, 189, 248, ${0.2 + glowIntensity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(15, 23, 42, 0.5)`);
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw the Base-12 Channels (The Topological Constraint)
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // If levitating, shake gently or float up (simulated by scale/offset in a real 3D view, here just pulse)
      if (physics.isLevitating) {
        ctx.translate(0, Math.sin(time * 2) * 5);
      }

      // Draw Outer Shell
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw 12 Channels
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        ctx.rotate(angle);
        
        // Channel line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.strokeStyle = `rgba(148, 163, 184, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Wave packets traveling inward
        // Only show if there is input
        if (inputAmplitude > 0) {
            const waveCount = 3;
            for(let w=0; w<waveCount; w++) {
                const speed = 1 + physics.resonanceQuality * 2;
                // Waves move from radius to 0
                const wavePos = (time * speed + w * (radius/waveCount)) % radius;
                const currentR = radius - wavePos; // Moving inward
                
                // Opacity increases near center (Focusing effect)
                const opacity = (1 - (currentR/radius)) * inputAmplitude * 0.1;
                
                ctx.beginPath();
                ctx.arc(currentR, 0, 2, 0, Math.PI*2);
                ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
                ctx.fill();
            }
        }

        ctx.rotate(-angle);
      }

      // Draw The Core (Singularity)
      const coreSize = 10 + (physics.energyDensity / 100);
      const coreAlpha = Math.min(1, physics.energyDensity / 1000);
      
      ctx.beginPath();
      ctx.arc(0, 0, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 191, 36, ${coreAlpha})`; // Gold core
      ctx.shadowBlur = 20 * coreAlpha;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      if (physics.isLevitating) {
          ctx.font = 'bold 16px monospace';
          ctx.fillStyle = '#22c55e';
          ctx.textAlign = 'center';
          ctx.fillText("LEVITAION ACHIEVED", 0, radius + 40);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [physics, inputAmplitude]);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto bg-qag-panel rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
      <div className="absolute top-2 left-4 text-xs font-mono text-slate-400">
        FIG 1. BASE-12 TOPOLOGY
      </div>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="w-full h-full"
      />
    </div>
  );
};

export default ResonatorViz;