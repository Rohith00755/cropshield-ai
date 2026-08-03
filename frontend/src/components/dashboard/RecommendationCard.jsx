import React, { useState } from 'react';
import { Pill, Clock, CheckCircle2, Square, ShieldCheck } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function RecommendationCard({ result }) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Spray Tricyclazole fungicide before 9 AM", done: true },
    { id: 2, text: "Avoid excess irrigation in North Paddy Sector 4", done: false },
    { id: 3, text: "Check crop leaves tomorrow morning for moisture", done: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#1F2937]">Today's Recommendation</h3>
            <p className="text-xs text-gray-500 font-medium">Simple steps to protect your crop harvest today</p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold">
          High Priority
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase block">Recommended Treatment</span>
          <span className="text-sm font-extrabold text-[#2E7D32] block">{result?.fungicide || "Tricyclazole 75% WP"}</span>
          <span className="text-xs text-gray-600 font-medium">Dosage: 0.6 g / Liter water</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase block">Best Spraying Window</span>
          <span className="text-sm font-extrabold text-[#F9A825] block">Tomorrow 07:00 - 09:00 AM</span>
          <span className="text-xs text-gray-600 font-medium">Spray before 9 AM when wind is low</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase block">Estimated Outbreak</span>
          <span className="text-sm font-extrabold text-[#E53935] block">{result?.eta || "Within 48 Hours"}</span>
          <span className="text-xs text-gray-600 font-medium">Fungal spore risk</span>
        </div>
      </div>

      {/* Farmer Checklist */}
      <div className="p-5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-3">
        <span className="text-xs font-extrabold text-[#1F2937] uppercase tracking-wider block flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
          Today's Farmer Checklist
        </span>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 text-xs font-bold ${
                item.done 
                  ? 'bg-[#E8F5E9] border-[#C8E6C9] text-[#2E7D32]' 
                  : 'bg-white border-[#E5E7EB] text-gray-800 hover:border-[#2E7D32]/40'
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              <span>✔ {item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
export default RecommendationCard;
