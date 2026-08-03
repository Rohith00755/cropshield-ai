import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Waves, Sprout, Clock } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export function FarmHealthSummaryRow() {
  const [telemetry, setTelemetry] = useState({
    temp: 29.0,
    humidity: 86,
    soil: 74,
    crop: "Rice (Calrose)",
    stage: "Tillering"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        temp: (28.8 + Math.random() * 0.4).toFixed(1),
        humidity: Math.min(90, Math.max(82, Math.round(86 + (Math.random() * 2 - 1)))),
        soil: Math.min(78, Math.max(70, Math.round(74 + (Math.random() * 2 - 1))))
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: "Temperature", value: `${telemetry.temp}°C`, status: "Normal", icon: Thermometer, color: "text-[#2E7D32] bg-[#E8F5E9] border-[#C8E6C9]" },
    { label: "Humidity", value: `${telemetry.humidity}%`, status: "High Risk", icon: Droplets, color: "text-[#E53935] bg-[#FFEBEE] border-[#FFCDD2]" },
    { label: "Soil Moisture", value: `${telemetry.soil}%`, status: "Optimal", icon: Waves, color: "text-[#2E7D32] bg-[#E8F5E9] border-[#C8E6C9]" },
    { label: "Active Crop", value: telemetry.crop, status: "Healthy", icon: Sprout, color: "text-[#2E7D32] bg-[#E8F5E9] border-[#C8E6C9]" },
    { label: "Growth Stage", value: telemetry.stage, status: "Active Growth", icon: Clock, color: "text-[#0284C7] bg-[#E0F2FE] border-[#BAE6FD]" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <GlassCard key={idx} className="p-5 flex flex-col justify-between space-y-3 bg-white border border-[#E0E8DC] hover:border-[#2E7D32] shadow-sm hover:shadow-md transition-all rounded-3xl group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-[#607D8B] uppercase tracking-wider">{c.label}</span>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${c.color} transition-transform group-hover:scale-110`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#263238] tracking-tight block">
                {c.value}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" title="Live Telemetry" />
            </div>

            <div className="pt-1">
              <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${c.color}`}>
                {c.status}
              </span>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
export default FarmHealthSummaryRow;
