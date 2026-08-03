import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  TrendingUp, 
  Cpu, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';

export function AIDiseaseTimeline({ diseaseName = "Rice Blast (Pyricularia oryzae)", eta = "48 Hours", riskLevel = "high" }) {
  const steps = [
    {
      label: "Today 08:00 AM",
      badge: "Baseline",
      title: "Environmental Monitoring",
      subtitle: "Overnight Humidity reached 86% peak.",
      icon: Calendar,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      label: "Condition Trigger",
      badge: "Threshold",
      title: "Humidity Increasing",
      subtitle: "Continuous 6-hour condensation accumulation.",
      icon: TrendingUp,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
    },
    {
      label: "AI Inference Engine",
      badge: "XGBoost v2.4",
      title: "AI Risk Prediction",
      subtitle: "Matched against 1.2M historical outbreak curves.",
      icon: Cpu,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      label: "Pathogen Output",
      badge: riskLevel === 'high' ? 'High Risk' : 'Moderate',
      title: diseaseName.split(' (')[0],
      subtitle: "Fungal spore germination pattern detected.",
      icon: ShieldAlert,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/30"
    },
    {
      label: "Expected Outbreak",
      badge: "Predictive ETA",
      title: eta,
      subtitle: "Estimated 2-day symptom manifestation.",
      icon: Clock,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    },
    {
      label: "Action Protocol",
      badge: "Prescription",
      title: "Recommended Spray (Today)",
      subtitle: "Foliar application of Tricyclazole 75% WP.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            AI Disease Prediction Predictive Workflow Timeline
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            End-to-end temporal lead trajectory from micro-climate anomaly to recommended treatment
          </p>
        </div>

        <Badge variant="safe" size="sm">
          72h Early Lead Time
        </Badge>
      </div>

      {/* Horizontal / Stacked Stepper Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800/80 flex flex-col justify-between relative group hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">{step.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${step.color}`}>
                  {step.badge}
                </span>
              </div>

              <div className="flex items-center gap-2 my-1">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${step.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900 dark:text-white truncate">{step.title}</h4>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-1">
                {step.subtitle}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-gray-400 dark:text-gray-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
export default AIDiseaseTimeline;
