import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';
import { MAP_RISK_ZONES } from '../../utils/mockData';
import { Play, RefreshCw, ShieldAlert } from 'lucide-react';

const createCustomIcon = (color, animate = false) => {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" fill-opacity="0.4" stroke="${color}" stroke-width="2.5"/>
      <circle cx="16" cy="16" r="6" fill="${color}"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: `custom-leaflet-marker ${animate ? 'animate-bounce' : ''}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

export function RiskMap({ height = "h-80" }) {
  const center = [38.5816, -121.4944];
  const [animatedRiskState, setAnimatedRiskState] = useState('safe'); // safe (green), moderate (yellow), high (red)
  const [isSimulating, setIsSimulating] = useState(false);

  // Feature 4: Map Marker Animation (Green -> Yellow -> Red)
  const handleSimulateRiskShift = () => {
    setIsSimulating(true);
    setAnimatedRiskState('safe'); // Green

    setTimeout(() => {
      setAnimatedRiskState('moderate'); // Yellow
    }, 1500);

    setTimeout(() => {
      setAnimatedRiskState('high'); // Red
      setIsSimulating(false);
    }, 3200);
  };

  const getMarkerColor = (baseLevel) => {
    const target = baseLevel === 'high' ? animatedRiskState : baseLevel;
    if (target === 'high') return '#ef4444';
    if (target === 'moderate') return '#f59e0b';
    return '#10b981';
  };

  return (
    <GlassCard className="p-4 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            GIS Risk Map
            {isSimulating && <span className="text-[10px] text-amber-400 font-mono font-bold animate-pulse">Shifting Green ➔ Yellow ➔ Red...</span>}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time sector disease vulnerability heatmap
          </p>
        </div>

        <button 
          onClick={handleSimulateRiskShift}
          disabled={isSimulating}
          className="px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono font-bold text-emerald-400 hover:bg-gray-800 flex items-center gap-1.5 transition-all shadow"
        >
          <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Simulating...' : 'Simulate Risk Shift'}</span>
        </button>
      </div>

      {/* Leaflet Map */}
      <div className={`w-full ${height} rounded-xl overflow-hidden relative border border-gray-200 dark:border-gray-800`}>
        <MapContainer 
          center={center} 
          zoom={13} 
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; ESRI ArcGIS World Imagery & OpenStreetMap'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {MAP_RISK_ZONES.map((zone) => {
            const color = getMarkerColor(zone.riskLevel);
            const icon = createCustomIcon(color, isSimulating || animatedRiskState === 'high');

            return (
              <React.Fragment key={zone.id}>
                <Circle 
                  center={zone.coords}
                  radius={500}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.4,
                    weight: 2.5
                  }}
                />
                <Marker position={zone.coords} icon={icon}>
                  <Popup>
                    <div className="p-1 space-y-1 text-xs text-gray-900">
                      <strong className="block font-bold text-sm">{zone.sectorName}</strong>
                      <p className="font-semibold text-rose-600">Threat Status: {animatedRiskState.toUpperCase()}</p>
                      <p>Soil Moisture: {zone.soilMoisture} • Temp: {zone.temp}</p>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </GlassCard>
  );
}
export default RiskMap;
