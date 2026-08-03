import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle } from 'react-leaflet';
import L from 'leaflet';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { MAP_RISK_ZONES } from '../utils/mockData';
import { Layers, MapPin, ShieldAlert, CloudRain, Play, CheckCircle2, Pill, ArrowRight, X } from 'lucide-react';

const createCustomIcon = (color, isAnimated = false) => {
  const svg = `
    <svg width="44" height="44" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" fill-opacity="0.45" stroke="${color}" stroke-width="3"/>
      <circle cx="16" cy="16" r="6" fill="${color}"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: `custom-leaflet-marker ${isAnimated ? 'animate-bounce' : ''}`,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

export function InteractiveMapPage() {
  const [mapTile, setMapTile] = useState('sat'); // Default Satellite view
  const [animatedRiskState, setAnimatedRiskState] = useState('high'); // safe, moderate, high
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null); // Clicked farm details

  const center = [38.5816, -121.4944];

  // Farm Boundary Vector Polygon Coordinates (Sacramento Farm Sector 4)
  const farmBoundary = [
    [38.5920, -121.5050],
    [38.5910, -121.4750],
    [38.5680, -121.4780],
    [38.5700, -121.5080]
  ];

  // Trigger Green -> Yellow -> Red Risk Shift
  const handleSimulateRiskShift = () => {
    setIsSimulating(true);
    setAnimatedRiskState('safe'); // Green

    setTimeout(() => {
      setAnimatedRiskState('moderate'); // Yellow
    }, 1400);

    setTimeout(() => {
      setAnimatedRiskState('high'); // Red
      setIsSimulating(false);
    }, 3000);
  };

  const getMarkerColor = (baseLevel) => {
    const target = baseLevel === 'high' ? animatedRiskState : baseLevel;
    if (target === 'high') return '#ef4444';
    if (target === 'moderate') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top GIS Control Banner */}
      <GlassCard className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            GIS Precision Farm & Outbreak Heatmap ("Wow Factor")
          </h2>
          <p className="text-xs text-gray-400">
            Click farm markers to open AI prescriptions • Live Green ➔ Yellow ➔ Red Outbreak Risk Shift
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSimulateRiskShift}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Animating Risk Shift...' : 'Animate Green ➔ Yellow ➔ Red'}</span>
          </button>

          <button 
            onClick={() => setMapTile(mapTile === 'sat' ? 'osm' : 'sat')}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center gap-2 border border-gray-700 transition-all"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{mapTile === 'sat' ? 'Vector Map' : 'Satellite Imagery'}</span>
          </button>
        </div>
      </GlassCard>

      {/* Map Section */}
      <GlassCard className="p-2 relative overflow-hidden">
        
        {/* Risk Legend Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-gray-900/90 border border-gray-800 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs flex items-center gap-4 text-white shadow-xl">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 🟢 Safe
          </span>
          <span className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 🟡 Moderate
          </span>
          <span className="flex items-center gap-1.5 font-bold text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" /> 🔴 High Risk
          </span>
        </div>

        <div className="w-full h-[620px] rounded-xl overflow-hidden relative">
          <MapContainer 
            center={center} 
            zoom={13} 
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; ESRI ArcGIS World Imagery & OpenStreetMap'
              url={mapTile === 'sat' 
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            />

            {/* Farm Perimeter Polygon */}
            <Polygon 
              positions={farmBoundary}
              pathOptions={{
                color: '#10b981',
                weight: 3,
                dashArray: '6, 8',
                fillColor: '#10b981',
                fillOpacity: 0.15
              }}
            />

            {/* Risk Sector Markers */}
            {MAP_RISK_ZONES.map((zone) => {
              const color = getMarkerColor(zone.riskLevel);
              const icon = createCustomIcon(color, isSimulating || animatedRiskState === 'high');

              return (
                <React.Fragment key={zone.id}>
                  <Circle 
                    center={zone.coords}
                    radius={550}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.4,
                      weight: 2.5
                    }}
                  />
                  <Marker 
                    position={zone.coords} 
                    icon={icon}
                    eventHandlers={{
                      click: () => setSelectedFarm(zone)
                    }}
                  >
                    <Popup>
                      <div className="p-2 space-y-1 text-xs text-gray-900 min-w-[200px]">
                        <strong className="block font-bold text-sm text-gray-900">{zone.sectorName}</strong>
                        <p className="font-extrabold text-rose-600 text-sm">Rice Blast • 82% Risk</p>
                        <p className="font-bold text-emerald-700">Recommended Action: Spray within 24 hours</p>
                        <p className="text-[10px] text-gray-500">Soil Moisture: {zone.soilMoisture} • Temp: {zone.temp}</p>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
      </GlassCard>

      {/* Selected Farm Sector Popup Modal */}
      {selectedFarm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-md p-6 space-y-4 border-2 border-rose-500/80 shadow-2xl relative">
            <button 
              onClick={() => setSelectedFarm(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">{selectedFarm.sectorName}</h3>
                <p className="text-xs text-gray-400">Interactive Farm Sector Telemetry</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900 border border-rose-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-bold">Detected Threat:</span>
                <span className="font-black text-rose-400 text-sm">Rice Blast</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-bold">Outbreak Probability:</span>
                <span className="font-black font-mono text-rose-500 text-base">82%</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-800 pt-2">
                <span className="text-gray-400 font-bold">Recommended Spraying:</span>
                <span className="font-bold text-emerald-400">Spray within 24 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-bold">Prescribed Chemical:</span>
                <span className="font-semibold text-white">Tricyclazole 75% WP</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedFarm(null)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Acknowledge & Close Protocol
            </button>
          </GlassCard>
        </div>
      )}

    </div>
  );
}
export default InteractiveMapPage;
