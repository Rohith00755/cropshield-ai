import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ArrowRight } from 'lucide-react';

export function ToastNotification({ toast, onClose, onViewRecommendation }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white border-2 border-[#E53935] rounded-3xl shadow-2xl p-5 text-[#1F2937]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E53935] text-white flex items-center justify-center font-bold shadow-md shadow-[#E53935]/30 flex-shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#1F2937] flex items-center gap-1">
                  🔔 Disease Risk Alert
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FFEBEE] text-[#E53935] font-extrabold">
                  Risk: {toast.risk || '82%'}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-[#E53935]">
                {toast.disease || "Rice Blast Detected"}
              </h4>

              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {toast.message || "Micro-climate humidity anomaly. Recommendation available."}
              </p>

              <button 
                onClick={onViewRecommendation}
                className="text-xs font-extrabold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1 pt-1.5 underline"
              >
                <span>View Recommendation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-xl bg-[#F7FAF4] text-gray-400 hover:text-gray-700 border border-[#E5E7EB]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default ToastNotification;
