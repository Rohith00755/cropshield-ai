import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp, Info } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function ExplainableAIPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainReasons = [
    { reason: "Air Humidity (>85% for 6 hours)", percentage: 38, color: "bg-[#E53935]" },
    { reason: "Leaf Wetness & Overnight Dew", percentage: 27, color: "bg-[#F9A825]" },
    { reason: "Air Temperature Range (22-30°C)", percentage: 18, color: "bg-[#42A5F5]" },
    { reason: "Rice Crop Growth Stage (Tillering)", percentage: 11, color: "bg-[#2E7D32]" },
    { reason: "Wind Velocity & Spore Drift", percentage: 6, color: "bg-[#8E24AA]" },
  ];

  return (
    <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm">
      
      {/* Collapsible Accordion Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#263238] flex items-center gap-2">
              💡 Why This Warning?
            </h3>
            <p className="text-xs text-[#607D8B] font-medium">
              {isExpanded ? "Click to collapse main warning reasons" : "Click to view the top environmental reasons for this alert"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-extrabold">
            📌 Main Reasons
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-5 space-y-4 border-t border-[#E5E7EB] mt-5 overflow-hidden"
          >
            <div className="space-y-3 font-mono">
              <h4 className="text-xs font-bold text-[#607D8B] uppercase tracking-widest font-sans">
                📌 Main Reasons
              </h4>

              {mainReasons.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#263238] flex items-center gap-2 font-sans">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] inline-block" />
                      {item.reason}
                    </span>
                    <span className="font-extrabold text-[#2E7D32] text-sm font-sans">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[#F7FAF4] overflow-hidden p-0.5 border border-[#E5E7EB]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage * 2.5}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] flex items-center gap-3 text-xs text-[#263238]">
              <Info className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
              <span>
                <strong>Simple Explanation:</strong> High air humidity exceeding 85% overnight is responsible for 38% of the risk weight, creating ideal conditions for fungal spores.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </GlassCard>
  );
}
export default ExplainableAIPanel;
