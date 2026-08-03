import React from 'react';
import { Sprout, CloudSun, MapPin, Bot, ShieldAlert } from 'lucide-react';

export function QuickActionsRow({ onAction }) {
  const actions = [
    { id: 'predict', label: '🌾 Check My Crop', icon: Sprout, color: 'bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] text-white shadow-md shadow-[#2E7D32]/25 hover:shadow-lg' },
    { id: 'weather', label: '🌦 Weather Radar', icon: CloudSun, color: 'bg-white text-[#263238] border border-[#E0E8DC] hover:border-[#2E7D32]/50 hover:bg-[#F7FAF4] shadow-sm' },
    { id: 'map', label: '🗺 My Field Sector', icon: MapPin, color: 'bg-white text-[#263238] border border-[#E0E8DC] hover:border-[#2E7D32]/50 hover:bg-[#F7FAF4] shadow-sm' },
    { id: 'ai-assistant', label: '🤖 Ask CropShield AI', icon: Bot, color: 'bg-white text-[#263238] border border-[#E0E8DC] hover:border-[#2E7D32]/50 hover:bg-[#F7FAF4] shadow-sm' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            onClick={() => onAction(act.id)}
            className={`p-4 rounded-3xl font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 ${act.color}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{act.label}</span>
          </button>
        );
      })}
    </div>
  );
}
export default QuickActionsRow;
