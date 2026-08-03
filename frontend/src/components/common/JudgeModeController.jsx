import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Sparkles, Award, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function JudgeModeController({ isJudgeMode, setIsJudgeMode, currentTab, setCurrentTab }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const demoSequence = [
    { tab: 'dashboard', label: '1. Command Center & Digital Twin', highlight: 'Showing Real-Time Field Telemetry & Digital Twin' },
    { tab: 'dashboard', label: '2. XGBoost AI Predictive Workflow Timeline', highlight: '72-Hour Outbreak Lead Time & Prescription' },
    { tab: 'hardware', label: '3. ESP32 Edge IoT Node Telemetry', highlight: 'Live Solar Gateway Battery & Sensor Array' },
    { tab: 'analytics', label: '4. Pathogen Distribution & Analytics', highlight: '30-Day Risk Trajectory & Compliance Reports' },
    { tab: 'map', label: '5. GIS Satellite Risk Map', highlight: 'Spatial Outbreak Heatmaps & Sector Polygons' },
    { tab: 'ai-assistant', label: '6. AgriBot AI Agronomist', highlight: 'Interactive 24/7 AI Prescription Assistant' },
    { tab: 'investor', label: '7. Seed Funding & Market Vision', highlight: '$14.8B TAM & Unfair Competitive Advantage' },
  ];

  useEffect(() => {
    let timer;
    if (isJudgeMode && !isPaused) {
      timer = setInterval(() => {
        setStepIndex(prev => {
          const next = (prev + 1) % demoSequence.length;
          setCurrentTab(demoSequence[next].tab);
          if (next === 1 || next === 6) {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          }
          return next;
        });
      }, 6500);
    }
    return () => clearInterval(timer);
  }, [isJudgeMode, isPaused]);

  if (!isJudgeMode) return null;

  const currentStep = demoSequence[stepIndex];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl bg-gradient-to-r from-emerald-950 via-gray-900 to-emerald-950 border-2 border-emerald-500/80 rounded-2xl shadow-2xl p-3 text-white backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-gray-950 flex items-center justify-center font-bold animate-pulse shadow-md">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-emerald-400 font-mono uppercase tracking-wider">
                  🎬 JUDGE MODE ACTIVE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Auto-Demo Step {stepIndex + 1}/{demoSequence.length}
                </span>
              </div>
              <p className="text-xs text-white font-bold truncate">
                {currentStep.highlight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            <button 
              onClick={() => {
                setStepIndex(prev => (prev + 1) % demoSequence.length);
                setCurrentTab(demoSequence[(stepIndex + 1) % demoSequence.length].tab);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => setIsJudgeMode(false)}
              className="p-1.5 rounded-xl bg-gray-800 hover:bg-rose-500/20 hover:text-rose-400 text-gray-400 transition-colors"
              title="Exit Judge Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default JudgeModeController;
