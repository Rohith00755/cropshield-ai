import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Building2, ShieldCheck, Activity } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { STARTUP_METRICS } from '../../utils/mockData';

export function StartupMetricsCards() {
  const iconMap = [Award, Zap, Building2, ShieldCheck, Activity];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
      {STARTUP_METRICS.map((m, idx) => {
        const Icon = iconMap[idx] || Award;
        return (
          <GlassCard key={idx} className="p-3.5 flex flex-col justify-between border-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{m.label}</span>
              <Icon className={`w-4 h-4 ${m.color}`} />
            </div>
            
            <div className="my-1.5">
              <span className={`text-2xl font-black font-mono tracking-tight ${m.color}`}>
                {m.value}
              </span>
            </div>

            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">
              {m.subtitle}
            </p>
          </GlassCard>
        );
      })}
    </div>
  );
}
export default StartupMetricsCards;
