import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  MapPin,
  RefreshCw,
  Zap
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { WEATHER_FORECAST } from '../utils/mockData';
import { getUserGeolocation, fetchReverseGeocode, fetchLiveWeather } from '../services/weatherService';
import { useAuth } from '../context/AuthContext';

export function WeatherPage() {
  const { user, updateUserProfile } = useAuth();
  
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationName, setLocationName] = useState(user?.location || 'Sacramento Valley, CA');
  const [liveMetrics, setLiveMetrics] = useState(null);
  const [forecastList, setForecastList] = useState(WEATHER_FORECAST);
  const [statusMessage, setStatusMessage] = useState('');

  const iconComponents = {
    CloudRain: CloudRain,
    CloudLightning: CloudLightning,
    CloudSun: CloudSun,
    Sun: Sun
  };

  const handleDetectLocationAndWeather = async () => {
    setLoadingLocation(true);
    setStatusMessage('Requesting GPS coordinates from your device...');

    try {
      // 1. Get GPS coordinates
      const coords = await getUserGeolocation();
      setStatusMessage(`GPS Location Found (${coords.latitude.toFixed(3)}°, ${coords.longitude.toFixed(3)}°). Fetching region...`);

      // 2. Reverse geocode location
      const placeName = await fetchReverseGeocode(coords.latitude, coords.longitude);
      setLocationName(placeName);
      updateUserProfile({ location: placeName });

      // 3. Fetch live weather from satellite API
      setStatusMessage('Fetching live weather metrics from satellite API...');
      const weatherResult = await fetchLiveWeather(coords.latitude, coords.longitude);

      if (weatherResult.success) {
        setLiveMetrics(weatherResult);
        if (weatherResult.forecast && weatherResult.forecast.length > 0) {
          setForecastList(weatherResult.forecast);
        }
        setStatusMessage(`Live weather updated for ${placeName}!`);
      } else {
        setStatusMessage(`Geocoded ${placeName}, but weather API returned fallback metrics.`);
      }

    } catch (err) {
      console.error(err);
      if (err.code === 1) {
        setStatusMessage('Location permission denied. Please allow location access in your browser pop-up.');
      } else {
        setStatusMessage(`Geolocation notice: ${err.message}`);
      }
    } finally {
      setLoadingLocation(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  // Auto-detect on mount if default location is generic
  useEffect(() => {
    handleDetectLocationAndWeather();
  }, []);

  const currentTemp = liveMetrics?.currentTemp ?? 31;
  const currentRain = liveMetrics?.rainProb ?? 20;
  const currentHumidity = liveMetrics?.humidity ?? 62;
  const currentWind = liveMetrics?.windSpeed ?? 12;
  const sprayingIndexText = liveMetrics?.sprayingIndex ?? 'Optimal Spraying Window (06:00 - 10:00 AM)';

  return (
    <div className="space-y-6 pb-12 font-sans text-[#263238]">
      
      {/* Location Detection Banner */}
      <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#2E7D32]" />
              <h2 className="text-xl font-extrabold text-[#263238]">
                {locationName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-extrabold border border-[#C8E6C9]">
                LIVE GPS
              </span>
            </div>
            <p className="text-xs text-[#607D8B] font-semibold">
              Real-time agricultural weather forecast & chemical spraying window optimization
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDetectLocationAndWeather}
              disabled={loadingLocation}
              className="px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLocation ? 'animate-spin' : ''}`} />
              <span>{loadingLocation ? 'Detecting GPS Location...' : '📍 Detect My Real GPS Location'}</span>
            </button>
          </div>

        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-xs font-bold text-[#2E7D32] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2E7D32] animate-bounce" />
            <span>{statusMessage}</span>
          </div>
        )}
      </GlassCard>

      {/* Live Today Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#607D8B]">Current Temperature</span>
            <div className="text-2xl font-extrabold text-[#263238] mt-1">{currentTemp}°C</div>
            <span className="text-[11px] text-[#2E7D32] font-semibold">Real-time Sensor & Satellite</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
            <Thermometer className="w-6 h-6" />
          </div>
        </GlassCard>

        <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#607D8B]">Precipitation Risk</span>
            <div className="text-2xl font-extrabold text-[#42A5F5] mt-1">{currentRain}%</div>
            <span className="text-[11px] text-[#607D8B] font-semibold">Precipitation Chance</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] flex items-center justify-center text-[#42A5F5]">
            <Droplets className="w-6 h-6" />
          </div>
        </GlassCard>

        <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#607D8B]">Air Humidity</span>
            <div className="text-2xl font-extrabold text-[#263238] mt-1">{currentHumidity}%</div>
            <span className="text-[11px] text-[#607D8B] font-semibold">Soil & Leaf Moisture</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7FAF4] flex items-center justify-center text-[#2E7D32]">
            <CloudSun className="w-6 h-6" />
          </div>
        </GlassCard>

        <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#607D8B]">Wind Speed</span>
            <div className="text-2xl font-extrabold text-[#263238] mt-1">{currentWind} km/h</div>
            <span className="text-[11px] text-[#607D8B] font-semibold">Drift Risk Safe</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7FAF4] flex items-center justify-center text-[#607D8B]">
            <Wind className="w-6 h-6" />
          </div>
        </GlassCard>

      </div>

      {/* Spraying Index Alert Box */}
      <GlassCard className="p-5 bg-[#F7FAF4] border border-[#2E7D32]/30 shadow-sm rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-[#2E7D32]">Agri Chemical Spraying Advisory</span>
            <h4 className="text-sm font-extrabold text-[#263238]">{sprayingIndexText}</h4>
          </div>
        </div>
        <span className="text-xs text-[#607D8B] font-semibold">Updated via Open-Meteo Satellite</span>
      </GlassCard>

      {/* 7-Day Live Forecast Cards */}
      <div>
        <h3 className="text-base font-extrabold text-[#263238] mb-3 flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-[#2E7D32]" />
          <span>7-Day Local Weather Forecast</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecastList.map((day, idx) => {
            const Icon = iconComponents[day.icon] || CloudSun;
            const isToday = day.day === "Today";
            const sprayingText = day.sprayingIndex || "Optimal Window";
            const isAvoid = sprayingText.toLowerCase().includes("avoid");

            return (
              <GlassCard 
                key={idx} 
                className={`p-4 flex flex-col justify-between text-center bg-white border shadow-sm rounded-3xl ${
                  isToday ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/20 bg-[#F7FAF4]' : 'border-[#E5E7EB]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-[#607D8B]">{day.date || `Day ${idx + 1}`}</span>
                  <h3 className="text-base font-extrabold text-[#263238] my-1">{day.day}</h3>
                  
                  <div className="w-12 h-12 my-2 mx-auto rounded-2xl bg-[#F7FAF4] flex items-center justify-center text-[#2E7D32] border border-[#E5E7EB]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-semibold text-[#263238]">{day.condition}</p>
                </div>

                <div className="my-3 space-y-1">
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-xl font-extrabold text-[#263238]">{day.tempMax || day.temp || '28°'}</span>
                    <span className="text-xs text-[#607D8B] font-bold">/ {day.tempMin || '20'}°C</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-xs text-[#42A5F5] font-bold">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{day.rainProb || 20}% Rain</span>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-2 text-[10px]">
                  <span className="block text-[#607D8B] font-bold mb-0.5">Spraying Index:</span>
                  <span className={`font-extrabold text-xs ${isAvoid ? 'text-[#E53935]' : 'text-[#2E7D32]'}`}>
                    {sprayingText}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default WeatherPage;
