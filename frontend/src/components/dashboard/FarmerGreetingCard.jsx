import React from 'react';
import { Sun, CheckCircle2, AlertTriangle, ArrowRight, Sprout } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function FarmerGreetingCard({ farmerName = "Rohith" }) {
  const timeGreeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <GlassCard className="p-6 bg-gradient-to-r from-[#F4F8F1] via-white to-[#E8F5E9] border border-[#C8E6C9] shadow-sm relative overflow-hidden">
      
      {/* Decorative Leaf Pattern */}
      <div className="absolute right-4 top-4 text-[#2E7D32]/10 pointer-events-none">
        <Sprout className="w-32 h-32" />
      </div>

      <div className="space-y-3 relative z-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#F9A825] shadow-inner">
              <Sun className="w-7 h-7 animate-spin-slow text-[#F9A825]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                🌅 {timeGreeting}, {farmerName}
              </h1>
              <p className="text-sm font-semibold text-[#2E7D32]">
                Your Smart Farming Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#C8E6C9] shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
            <div>
              <span className="text-[10px] text-gray-500 font-bold block uppercase">Overall Farm Status</span>
              <span className="text-base font-extrabold text-[#2E7D32]">Healthy (92%)</span>
            </div>
          </div>
        </div>

        {/* Storytelling Banner */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-2 text-xs text-gray-700">
          <p className="text-sm font-bold text-[#1F2937]">
            Your farm is looking healthy today across Sector 1, 2, and 3.
          </p>
          <div className="flex items-center gap-2 text-[#E53935] font-extrabold text-xs">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>One field needs your attention: Rice Blast risk is increasing in Sector 4.</span>
          </div>
          <p className="text-xs text-[#2E7D32] font-bold">
            ✔ Spray today to protect your harvest.
          </p>
        </div>

      </div>
    </GlassCard>
  );
}
export default FarmerGreetingCard;
