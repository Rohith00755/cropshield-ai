import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Thermometer, Droplets, Waves, Sprout, Activity } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';
import { DIGITAL_TWIN_STATE } from '../../utils/mockData';

export function DigitalTwinCard() {
  const [twin, setTwin] = useState(DIGITAL_TWIN_STATE);

  // Feature 3: Live Sensor Micro-Fluctuation Animation (28.8°C -> 28.9°C -> 29.0°C -> 29.1°C)
  useEffect(() => {
    const interval = setInterval(() => {
      setTwin(prev => ({
        ...prev,
        temperature: (28.8 + Math.random() * 0.4).toFixed(1),
        humidity: Math.min(92, Math.max(80, Math.round(85 + (Math.random() * 2 - 1)))),
        soilMoisture: Math.min(80, Math.max(68, Math.round(74 + (Math.random() * 2 - 1)))),
        lastUpdated: "Just now"
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-5 bg-gradient-to-br from-emerald-950/30 via-gray-900 to-gray-900 border-emerald-500/30 relative overflow-hidden">
      
      {/* Background Pulse Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              Digital Twin of the Farm
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            </h3>
            <p className="text-[11px] text-gray-400">Real-time synchronized physical & virtual farm state</p>
          </div>
        </div>

        <Badge variant="safe" size="sm">
          <span className="font-mono">Live Twin Active</span>
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        
        <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold">Temperature</span>
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-xl font-extrabold text-white font-mono transition-all duration-300">
            {twin.temperature}°C
          </span>
          <span className="block text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" /> Live Stream
          </span>
        </div>

        <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold">Humidity</span>
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-xl font-extrabold text-rose-400 font-mono transition-all duration-300">
            {twin.humidity}%
          </span>
          <span className="block text-[10px] text-rose-400/80 font-semibold">High Condensation</span>
        </div>

        <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold">Soil Moisture</span>
            <Waves className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-xl font-extrabold text-emerald-400 font-mono transition-all duration-300">
            {twin.soilMoisture}%
          </span>
          <span className="block text-[10px] text-emerald-400/80">Capacitive Zone A</span>
        </div>

        <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold">Active Crop</span>
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-white block truncate">{twin.crop}</span>
          <span className="block text-[10px] text-gray-400">Calrose Variety</span>
        </div>

        <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800/80 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold">Growth Stage</span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-xs font-extrabold text-purple-300 block truncate">{twin.growthStage}</span>
          <span className="block text-[10px] text-gray-400">Heading Window</span>
        </div>

      </div>

    </GlassCard>
  );
}
export default DigitalTwinCard;
