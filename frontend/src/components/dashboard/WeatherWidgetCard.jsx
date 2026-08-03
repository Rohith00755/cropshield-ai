import React from 'react';
import { Sun, CloudRain, Droplets, Wind } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function WeatherWidgetCard() {
  return (
    <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
        <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Sun className="w-4 h-4 text-[#F9A825]" /> Today's Weather
        </h3>
        <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
          Sacramento Field
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        
        <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold block uppercase">Temperature</span>
          <span className="text-2xl font-extrabold text-[#1F2937] block flex items-center justify-center gap-1">
            ☀ 29°C
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold block uppercase">Forecast</span>
          <span className="text-sm font-extrabold text-[#42A5F5] block flex items-center justify-center gap-1 pt-1">
            <CloudRain className="w-4 h-4 text-[#42A5F5]" /> Rain Tomorrow
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#FFEBEE] border border-[#E53935]/20 space-y-1">
          <span className="text-[10px] text-[#E53935] font-bold block uppercase">Humidity</span>
          <span className="text-2xl font-extrabold text-[#E53935] block flex items-center justify-center gap-1">
            <Droplets className="w-4 h-4" /> 86%
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-1">
          <span className="text-[10px] text-gray-500 font-bold block uppercase">Wind Speed</span>
          <span className="text-lg font-extrabold text-gray-800 block flex items-center justify-center gap-1 pt-1">
            <Wind className="w-4 h-4 text-gray-400" /> 6 km/h
          </span>
        </div>

      </div>
    </GlassCard>
  );
}
export default WeatherWidgetCard;
