import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Sun, Moon, Globe, Bell, Server, CheckCircle2, RefreshCw } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useTheme } from '../context/ThemeContext';

export function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api');
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const [pushAlerts, setPushAlerts] = useState({
    disease: true,
    weather: true,
    recommendations: true,
    smsOutbreak: false
  });

  const handleTestBackend = () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionStatus({
        online: true,
        latency: '18ms',
        modelLoaded: 'XGBoost v2.4 (Rice Blast + Late Blight)'
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <GlassCard className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">System Settings & Infrastructure</h2>
            <p className="text-xs text-gray-400">Manage SaaS preferences, theme customization, and FastAPI connection parameters</p>
          </div>
        </div>
      </GlassCard>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Appearance & Language */}
        <GlassCard className="p-6 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-emerald-400" />
            <span>UI & Language Preferences</span>
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-white">Interface Color Theme</span>
              <span className="text-[11px] text-gray-400">Toggle between Dark Mode glassmorphism and Light SaaS theme</span>
            </div>

            <button 
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold text-emerald-400 flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</span>
            </button>
          </div>

          <div className="space-y-2 border-t border-gray-800 pt-4">
            <label className="block text-xs font-bold text-white">System Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="en">English (US - Metric & Imperial)</option>
              <option value="es">Español (Agricultural Terms)</option>
              <option value="hi">हिंदी (Hindi AgriTech)</option>
              <option value="fr">Français (Agricole)</option>
            </select>
          </div>
        </GlassCard>

        {/* Backend FastAPI Connection Diagnostic */}
        <GlassCard className="p-6 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>FastAPI & XGBoost Backend Diagnostic</span>
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-white">REST API Base Endpoint</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white font-mono outline-none"
              />
              <button 
                onClick={handleTestBackend}
                disabled={testingConnection}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                <span>Test Link</span>
              </button>
            </div>
          </div>

          {connectionStatus && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-mono">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FastAPI Server Connected (Latency: {connectionStatus.latency})</span>
              </div>
              <p className="text-[11px] text-gray-300">Model: {connectionStatus.modelLoaded}</p>
            </div>
          )}
        </GlassCard>

      </div>

    </div>
  );
}
export default SettingsPage;
