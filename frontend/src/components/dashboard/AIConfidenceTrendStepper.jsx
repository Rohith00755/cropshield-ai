import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function AIConfidenceTrendStepper({ probability = 82 }) {
  const trendSteps = [
    { label: "Yesterday", value: "61%", status: "Baseline", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { label: "Today 08:00 AM", value: "74%", status: "Rising Humidity", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { label: "Now (Live)", value: `${probability}%`, status: "High Risk Outbreak", color: "text-rose-400 bg-rose-500/10 border-rose-500/30 font-extrabold" }
  ];

  return (
    <GlassCard className="p-5 flex flex-col justify-between space-y-3 border-emerald-500/30">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
            AI Outbreak Risk Trend Trajectory
          </h3>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center gap-1 animate-pulse">
          <ArrowUpRight className="w-3 h-3 text-rose-400" />
          Increasing Risk
        </span>
      </div>

      {/* Stepper Timeline Progression */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {trendSteps.map((step, idx) => (
          <div 
            key={idx}
            className={`p-3 rounded-xl border flex flex-col justify-between space-y-1 relative ${step.color}`}
          >
            <span className="text-[10px] text-gray-400 font-mono block uppercase">{step.label}</span>
            <span className="text-2xl font-black font-mono tracking-tight block">{step.value}</span>
            <span className="text-[9px] font-bold block truncate">{step.status}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 font-mono">
        <span>Micro-Climate Acceleration: +21% in 24h</span>
        <span className="text-rose-400 font-bold">ETA: 48 Hours</span>
      </div>
    </GlassCard>
  );
}
export default AIConfidenceTrendStepper;
