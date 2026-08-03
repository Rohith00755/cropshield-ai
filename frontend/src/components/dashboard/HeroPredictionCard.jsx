import React from 'react';
import { AlertTriangle, ArrowRight, Sprout, Sun } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function HeroPredictionCard({ prediction, onViewDetails }) {
  const diseaseName = prediction?.disease || "Rice Blast";
  const probability = prediction?.probability || 82;
  const eta = prediction?.eta || "48 Hours";
  const recommendation = prediction?.recommendation || "Spray Tricyclazole today.";

  return (
    <GlassCard className="w-full p-6 sm:p-8 bg-gradient-to-r from-[#FFF8F8] via-white to-[#F1F8E9] border border-[#E53935]/20 shadow-sm relative overflow-hidden">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Main Friendly Greeting & Warning */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#F9A825]">
              <Sun className="w-6 h-6 text-[#F9A825]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#263238]">
                🌅 Good Morning, Rohith
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                Your farm is healthy overall today. However...
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFEBEE] border border-[#E53935]/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#E53935] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> One field needs attention
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E53935] text-white font-extrabold">
                HIGH RISK ({probability}%)
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-[#263238] pt-1">
              {diseaseName} Risk
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              Expected within <strong className="text-[#263238]">{eta}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-1">
            <span className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-wider block">Recommended Action</span>
            <p className="text-base font-extrabold text-[#263238]">
              {recommendation}
            </p>
          </div>

          <div>
            <button
              onClick={onViewDetails}
              className="px-6 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-xs shadow-md shadow-[#2E7D32]/20 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>🌾 Check My Crop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Green Rice Plants Graphic Card */}
        <div className="w-full lg:w-72 p-6 rounded-3xl bg-[#E8F5E9] border border-[#C8E6C9] shadow-sm flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#2E7D32] shadow-sm">
            <Sprout className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#263238]">North Paddy Field</h3>
            <p className="text-xs text-[#607D8B] font-medium">Sacramento Sector 4 • 450 Acres</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white text-[#2E7D32] font-bold shadow-sm">
            🌾 Calrose Rice Variant
          </span>
        </div>

      </div>

    </GlassCard>
  );
}
export default HeroPredictionCard;
