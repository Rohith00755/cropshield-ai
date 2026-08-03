import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Wifi, 
  Battery, 
  RefreshCw, 
  Thermometer, 
  Droplets, 
  Waves, 
  Sun, 
  Wind,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { SENSOR_TELEMETRY } from '../utils/mockData';

export function IoTMonitoringPage() {
  const [telemetry, setTelemetry] = useState(SENSOR_TELEMETRY);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [streamTicks, setStreamTicks] = useState(0);

  // Simulated ESP32 MQTT Live Telemetry Stream
  useEffect(() => {
    let interval;
    if (isLiveStreaming) {
      interval = setInterval(() => {
        setStreamTicks(t => t + 1);
        setTelemetry(prev => ({
          ...prev,
          lastPing: "Just now",
          sensors: prev.sensors.map(s => {
            if (s.id === "S1") { // Temp
              const val = (28.4 + (Math.random() * 0.4 - 0.2)).toFixed(1);
              return { ...s, value: val };
            }
            if (s.id === "S2") { // Humidity
              const val = Math.min(95, Math.max(50, Math.round(78 + (Math.random() * 2 - 1))));
              return { ...s, value: `${val}` };
            }
            if (s.id === "S3") { // Soil A
              const val = Math.min(60, Math.max(20, Math.round(42 + (Math.random() * 2 - 1))));
              return { ...s, value: `${val}` };
            }
            return s;
          })
        }));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const iconMap = {
    Thermometer: Thermometer,
    Droplets: Droplets,
    Waves: Waves,
    Sun: Sun,
    Wind: Wind
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* ESP32 Gateway Header */}
      <GlassCard className="p-6 bg-gradient-to-r from-emerald-950/40 via-gray-900 to-gray-900 border-emerald-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">ESP32 Field Node Gateway #04</h2>
                <Badge variant="safe">MQTT Connected</Badge>
              </div>
              <p className="text-xs text-gray-400">
                Protocol: MQTT/TLS over Cellular 4G • Hardware Rev: ESP32-WROOM-32D
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span>{telemetry.batteryPercentage}% Solar Battery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>{telemetry.signalStrengthDbm} dBm</span>
            </div>

            <button 
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-4 py-2 rounded-xl font-bold font-sans flex items-center gap-2 transition-all ${
                isLiveStreaming 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30' 
                  : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500'
              }`}
            >
              {isLiveStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isLiveStreaming ? 'Pause MQTT Stream' : 'Start Live Telemetry'}</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Live Stream Indicator Status */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-gray-900/60 border border-gray-800 text-xs">
        <span className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
          <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 ${isLiveStreaming ? 'animate-ping' : ''}`} />
          {isLiveStreaming ? `Live Telemetry Streaming (Tick #${streamTicks})` : 'Streaming Paused'}
        </span>
        <span className="text-gray-400 font-mono">Last Packet Received: {telemetry.lastPing}</span>
      </div>

      {/* Sensor Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {telemetry.sensors.map((sensor) => {
          const Icon = iconMap[sensor.icon] || Cpu;
          const isWarning = sensor.status.includes('High') || sensor.status.includes('Low');

          return (
            <GlassCard key={sensor.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 font-mono">{sensor.id} • {sensor.name}</span>
                <div className={`w-9 h-9 rounded-xl ${isWarning ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-mono">{sensor.value}</span>
                  <span className="text-sm font-semibold text-gray-400">{sensor.unit}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Normal Range: {sensor.min} - {sensor.max} {sensor.unit}</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-xs">
                <span className="text-gray-400 font-medium">Condition:</span>
                <Badge variant={isWarning ? 'moderate' : 'safe'}>
                  {sensor.status}
                </Badge>
              </div>
            </GlassCard>
          );
        })}
      </div>

    </div>
  );
}
export default IoTMonitoringPage;
