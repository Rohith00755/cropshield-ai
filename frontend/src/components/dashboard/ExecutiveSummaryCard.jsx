import React from 'react';
import GlassCard from '../common/GlassCard';
import { Sprout } from 'lucide-react';

export function ExecutiveSummaryCard() {
  return (
    <GlassCard className="p-5 border-l-4 border-l-[#2E7D32] bg-white shadow-sm space-y-2 text-xs">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2">
        <Sprout className="w-4 h-4 text-[#2E7D32]" />
        <h3 className="font-extrabold text-sm text-[#1F2937]">Farm Health Overview</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1 text-gray-700 font-medium">
        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase">Farm Status</span>
          <strong className="text-[#2E7D32] text-sm">Healthy</strong>
        </div>

        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase">Trigger</span>
          <span className="text-[#F9A825] font-bold">Humidity &gt;85% for 6h</span>
        </div>

        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase">Rice Blast Risk</span>
          <strong className="text-[#E53935] text-sm">82% High Risk</strong>
        </div>

        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase">Recommended Action</span>
          <span className="text-gray-900 font-bold">Spray Tricyclazole in 24h</span>
        </div>

        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase">Estimated Savings</span>
          <strong className="text-[#2E7D32] text-sm">₹14,200</strong>
        </div>
      </div>
    </GlassCard>
  );
}
export default ExecutiveSummaryCard;
