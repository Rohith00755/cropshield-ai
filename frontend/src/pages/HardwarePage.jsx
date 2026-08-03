import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, Radio, Thermometer, Droplets, Waves, Sun, Wind, CheckCircle2, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { SENSOR_TELEMETRY } from '../utils/mockData';

export function HardwarePage() {
  const [telemetry, setTelemetry] = useState(SENSOR_TELEMETRY);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <GlassCard className="p-6 bg-gradient-to-r from-emerald-950/40 via-gray-900 to-gray-900 border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">ESP32 IoT Field Gateway Hardware Node</h2>
                <Badge variant="safe">Hardware Online</Badge>
              </div>
              <p className="text-xs text-gray-400">
                Solar-Powered Micro-Climate Edge Sensor Gateway • Microcontroller: ESP32-WROOM-32D (Dual Core 240MHz)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span>{telemetry.batteryPercentage}% LiFePO4 Battery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>{telemetry.signalStrengthDbm} dBm (LTE-M)</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Hardware Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ESP32 Hardware Visual Mockup (1 Col) */}
        <GlassCard className="p-6 flex flex-col justify-between items-center text-center space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">ESP32 Node Hardware Specs</h3>
          
          <div className="w-48 h-48 rounded-2xl bg-gray-900 border-2 border-emerald-500/40 p-4 flex flex-col items-center justify-center relative shadow-2xl">
            <Cpu className="w-20 h-20 text-emerald-400 mb-2 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">ESP32 Gateway v3.1</span>
            <span className="text-[10px] text-emerald-400 font-mono">MQTT / TLS 1.3 Active</span>
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-1 text-xs text-gray-400 w-full text-left">
            <div className="flex justify-between py-1 border-b border-gray-800">
              <span>MCU Architecture:</span>
              <span className="font-mono text-white">Xtensa LX6 32-bit</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800">
              <span>Power Source:</span>
              <span className="font-mono text-white">5W Solar + 3.7V LiFePO4</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800">
              <span>Wireless Transceiver:</span>
              <span className="font-mono text-white">Cellular LTE-M + LoRaWAN</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Sampling Frequency:</span>
              <span className="font-mono text-emerald-400">15 Seconds</span>
            </div>
          </div>
        </GlassCard>

        {/* Live Sensor Telemetry Suite (2 Cols) */}
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span>Connected Industrial Sensor Array Telemetry</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {telemetry.sensors.map((s) => (
              <div key={s.id} className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-mono block">{s.id} • {s.name}</span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-2xl font-extrabold text-white font-mono">{s.value}</span>
                    <span className="text-xs text-gray-400">{s.unit}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Range: {s.min} - {s.max} {s.unit}</span>
                </div>

                <Badge variant={s.status.includes('High') || s.status.includes('Low') ? 'moderate' : 'safe'}>
                  {s.status}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
}
export default HardwarePage;
