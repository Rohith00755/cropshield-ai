import React from 'react';
import { DollarSign, TrendingUp, ShieldCheck, Scale, Coins } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function FinancialROIInsightCard() {
  return (
    <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] font-bold">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#1F2937]">Estimated Savings & Crop Protection Value</h3>
            <p className="text-xs text-gray-500 font-medium">Direct harvest savings and return on early prevention treatment</p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-extrabold border border-[#C8E6C9]">
          18.3x Return Value
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Estimated Crop Saved</span>
          <span className="text-2xl font-extrabold text-[#1F2937] block">2.3 Tons</span>
          <span className="text-[10px] text-[#2E7D32] font-semibold">Calrose Rice Paddy</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#E8F5E9]/60 border border-[#C8E6C9] space-y-1">
          <span className="text-[10px] text-[#2E7D32] uppercase font-bold tracking-wider block">Potential Loss Avoided</span>
          <span className="text-2xl font-extrabold text-[#2E7D32] block">₹38,500</span>
          <span className="text-[10px] text-gray-600">$480 Net Value</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Spray Treatment Cost</span>
          <span className="text-2xl font-extrabold text-[#E53935] block">₹2,100</span>
          <span className="text-[10px] text-gray-500">Tricyclazole 75% WP</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#2E7D32] text-white space-y-1 shadow-md shadow-[#2E7D32]/20">
          <span className="text-[10px] text-[#A5D6A7] uppercase font-black tracking-wider block">Prevention Return Value</span>
          <span className="text-3xl font-extrabold block">18.3x</span>
          <span className="text-[10px] text-[#E8F5E9] font-medium">Every ₹1 Spent Saves ₹18.3</span>
        </div>

      </div>
    </GlassCard>
  );
}
export default FinancialROIInsightCard;
