import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Pill, 
  Droplet, 
  Sun, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';

export function RecommendationPanel({ result }) {
  if (!result) {
    return (
      <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[360px] text-center border-dashed">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-3 animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          Awaiting Disease Prediction Run
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
          Fill in the environmental parameters and click "Predict Disease Outbreak Risk" to render AI recommendations.
        </p>
      </GlassCard>
    );
  }

  const isHighRisk = result.riskLevel === 'high';
  const isModerate = result.riskLevel === 'moderate';

  return (
    <GlassCard className="p-6 space-y-6">
      {/* Header Result */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={result.riskLevel === 'high' ? 'high' : result.riskLevel === 'moderate' ? 'moderate' : 'safe'}>
              {result.riskLevel === 'high' ? 'High Threat Alert' : result.riskLevel === 'moderate' ? 'Moderate Risk' : 'Low Outbreak Risk'}
            </Badge>
            <span className="text-xs font-mono text-gray-400">ETA: {result.eta}</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            {result.disease}
          </h3>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="text-center px-2">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">Risk Probability</span>
            <span className={`text-xl font-black ${isHighRisk ? 'text-rose-500' : isModerate ? 'text-amber-500' : 'text-emerald-500'}`}>
              {result.riskPercentage || `${result.probability}%`}
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
          <div className="text-center px-2">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">AI Confidence</span>
            <span className="text-xl font-black text-emerald-500 font-mono">
              {result.confidenceText || `${result.confidence}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Fungicide & Spray Window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Fungicide */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Pill className="w-4 h-4" />
            <span>Recommended Chemical Fungicide</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {result.fungicide || "Tricyclazole 75% WP"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {result.recommendation}
          </p>
        </div>

        {/* Best Spray Time */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
            <Sun className="w-4 h-4" />
            <span>Optimal Spraying Window</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {result.bestSprayingTime || "Tomorrow Morning 07:00 - 10:00 AM"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Dew condensation subsides by 7 AM. Low wind velocity (&lt;10 km/h) prevents chemical drift.
          </p>
        </div>

      </div>

      {/* Actionable Measures Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Preventive Protocols & Agronomic Directives
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.preventiveMeasures?.map((measure, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800/80 text-xs text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{measure}</span>
            </div>
          )) || (
            <>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800/80 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Improve field drainage to prevent waterlogging around plant crown.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800/80 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Pause high nitrogen top-dressing during high humidity periods.</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fertilizer & Irrigation Advice Footer */}
      <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span><strong>Fertilizer Advice:</strong> {result.fertilizerAdvice || "Apply Potash (K2O) to strengthen plant cuticle defense against fungal hyphae penetration."}</span>
        </div>
        <button 
          onClick={() => alert("Report downloaded as PDF!")}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs whitespace-nowrap transition-colors"
        >
          Export Action Plan
        </button>
      </div>

    </GlassCard>
  );
}
export default RecommendationPanel;
