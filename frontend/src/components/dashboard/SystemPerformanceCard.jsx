import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function SystemPerformanceCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#1F2937]">System Performance & Field Sensor Telemetry</h3>
            <p className="text-xs text-gray-500 font-medium">Model accuracy, response times & field gateway sync</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-extrabold">
            94.2% Accuracy | 1.4s Speed
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 border-t border-[#E5E7EB] mt-4 overflow-hidden"
          >
            <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-center space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Prediction Accuracy</span>
              <span className="text-xl font-extrabold text-[#2E7D32] block">94.2%</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-center space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Prediction Time</span>
              <span className="text-xl font-extrabold text-[#2E7D32] block">1.4 sec</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-center space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Model Confidence</span>
              <span className="text-xl font-extrabold text-[#2E7D32] block">91.0%</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-center space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Monitored Farms</span>
              <span className="text-xl font-extrabold text-[#1F2937] block">1,250</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-center space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Field Sensor Sync</span>
              <span className="text-xl font-extrabold text-[#2E7D32] block">LIVE (15s)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
export default SystemPerformanceCard;
