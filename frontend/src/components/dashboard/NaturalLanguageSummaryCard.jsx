import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, AlertTriangle, Pill, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';

export function NaturalLanguageSummaryCard({ prediction }) {
  const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";
  const probability = prediction?.probability || 82;

  return (
    <GlassCard className="p-6 bg-gradient-to-br from-gray-900 via-[#0e1626] to-gray-900 border-2 border-emerald-500/40 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              🌾 Natural Language Farm Executive Summary
            </h3>
            <p className="text-xs text-gray-400">AI-synthesized agronomist brief & economic impact assessment</p>
          </div>
        </div>

        <Badge variant="safe" size="sm">
          Updated 3m ago
        </Badge>
      </div>

      {/* Narrative Narrative Body */}
      <div className="space-y-3 text-xs leading-relaxed text-gray-200">
        <p className="text-sm font-semibold text-emerald-400">
          {timeOfDay}, Alexander.
        </p>

        <p className="text-gray-300">
          Your rice field is healthy overall across Sector 1, 2, and 3. <strong className="text-amber-400">However...</strong> humidity has exceeded <strong className="text-rose-400 font-mono">85% for six consecutive hours</strong> in North Paddy Sector 4.
        </p>

        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-1">
          <span className="font-extrabold block text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> AI Outbreak Prediction:
          </span>
          <p className="font-medium">
            The XGBoost model predicts an <strong className="text-white font-mono underline">{probability}% probability of Rice Blast</strong> within 48 hours.
          </p>
        </div>

        {/* Action & Economics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block">Recommended Action</span>
            <span className="text-xs font-bold text-white block">Apply Tricyclazole within 24 hours</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">Yield Loss If Untreated</span>
            <span className="text-sm font-black text-amber-300 font-mono block">≈ 18% Total Harvest</span>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block">Savings If Treated Now</span>
            <span className="text-sm font-black text-cyan-300 font-mono block">₹14,200 ($180 / Acre)</span>
          </div>

        </div>
      </div>
    </GlassCard>
  );
}
export default NaturalLanguageSummaryCard;
