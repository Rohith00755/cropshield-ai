import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

export function DiseaseRiskGauge({ probability = 82, riskLevel = "moderate" }) {
  // SVG Semi-circle calculations
  const radius = 70;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  const colorClass = probability > 75 ? '#ef4444' : probability > 40 ? '#f59e0b' : '#10b981';

  return (
    <GlassCard className="p-5 flex flex-col items-center justify-between text-center space-y-3">
      <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
        AI Disease Risk Gauge
      </h3>

      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-44 h-24 flex items-end justify-center">
        <svg className="w-44 h-44 -rotate-180" viewBox="0 0 180 180">
          {/* Background Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
          {/* Value Progress Arc */}
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={colorClass}
            strokeWidth="14"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Value */}
        <div className="absolute bottom-1 text-center">
          <span className="text-3xl font-black font-mono text-gray-900 dark:text-white block leading-none">
            {probability}%
          </span>
          <span className={`text-[11px] font-extrabold uppercase ${probability > 75 ? 'text-rose-500' : 'text-amber-500'}`}>
            {probability > 75 ? '🔴 High Risk' : '🟠 Moderate Risk'}
          </span>
        </div>
      </div>

      {/* Visual Slider Spectrum */}
      <div className="w-full text-[10px] space-y-1">
        <div className="flex justify-between text-gray-400 font-mono font-bold">
          <span>Safe (0%)</span>
          <span className="text-amber-400">Moderate</span>
          <span>High (100%)</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 relative">
          <div 
            className="w-3 h-3 rounded-full bg-white border-2 border-gray-900 absolute -top-0.75 -translate-x-1/2 shadow-md"
            style={{ left: `${probability}%` }}
          />
        </div>
      </div>
    </GlassCard>
  );
}
export default DiseaseRiskGauge;
