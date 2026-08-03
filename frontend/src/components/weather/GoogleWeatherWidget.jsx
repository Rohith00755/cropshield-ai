import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSun, CloudLightning, MoreVertical, MapPin, RefreshCw, Droplets } from 'lucide-react';
import { fetchLiveWeather, getUserGeolocation, fetchReverseGeocode } from '../../services/weatherService';

export function GoogleWeatherWidget() {
  const [loading, setLoading] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(26);
  const [feelsLike, setFeelsLike] = useState(28);
  const [condition, setCondition] = useState('Cloudy');
  const [locationName, setLocationName] = useState('Sacramento Valley');
  
  // 12-Hour Forecast Data matching Google Weather design
  const [hourlyForecast, setHourlyForecast] = useState([
    { time: 'Now', temp: 26, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '7 pm', temp: 26, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '8 pm', temp: 26, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '9 pm', temp: 26, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '10 pm', temp: 25, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '11 pm', temp: 24, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '12 am', temp: 24, condition: 'Rain', icon: 'CloudRain', rain: '20%' },
    { time: '1 am', temp: 24, condition: 'Rain', icon: 'CloudRain', rain: '30%' },
    { time: '2 am', temp: 24, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '3 am', temp: 24, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '4 am', temp: 24, condition: 'Cloudy', icon: 'Cloud', rain: null },
    { time: '5 am', temp: 24, condition: 'Cloudy', icon: 'Cloud', rain: null },
  ]);

  const loadRealWeather = async () => {
    setLoading(true);
    try {
      const coords = await getUserGeolocation();
      const place = await fetchReverseGeocode(coords.latitude, coords.longitude);
      setLocationName(place.split(',')[0] || place);

      const live = await fetchLiveWeather(coords.latitude, coords.longitude);
      if (live.success) {
        setCurrentTemp(live.currentTemp);
        setFeelsLike(live.currentTemp + 2);
        setCondition(live.condition);

        // Build hourly list based on live time
        const currentHour = new Date().getHours();
        const generatedHourly = Array.from({ length: 12 }).map((_, i) => {
          const h = (currentHour + i) % 24;
          const ampm = h >= 12 ? 'pm' : 'am';
          const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
          const timeLabel = i === 0 ? 'Now' : `${displayHour} ${ampm}`;
          
          const tempDrop = i > 4 && i < 10 ? 2 : 0;
          const isRain = i === 6 || i === 7;
          
          return {
            time: timeLabel,
            temp: Math.max(18, live.currentTemp - tempDrop),
            condition: isRain ? 'Rain' : live.condition,
            icon: isRain ? 'CloudRain' : 'Cloud',
            rain: isRain ? (i === 6 ? '20%' : '30%') : null
          };
        });
        setHourlyForecast(generatedHourly);
      }
    } catch (e) {
      console.log('Using default Google Weather dataset');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealWeather();
  }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className="w-6 h-6 text-gray-300" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-400" />;
      case 'CloudSun':
        return <CloudSun className="w-6 h-6 text-gray-200" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-300 fill-gray-300/40" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2 font-sans">
      
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-gray-200 px-1">
        <div>
          <h2 className="text-3xl font-normal tracking-tight text-white">Weather</h2>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <span>From <strong className="text-gray-200 hover:underline cursor-pointer">Google Weather</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold cursor-pointer" onClick={loadRealWeather}>
              <MapPin className="w-3 h-3" /> {locationName}
              {loading && <RefreshCw className="w-3 h-3 animate-spin ml-1" />}
            </span>
          </div>
        </div>

        <button onClick={loadRealWeather} className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Main Google Dark Weather Card */}
      <div className="w-full rounded-[2.5rem] bg-[#1E232A] border border-gray-800 text-white shadow-2xl overflow-hidden relative">
        
        {/* Top Current Weather Summary */}
        <div className="p-6 sm:p-8 flex items-start justify-between">
          
          {/* Left: Temperature & Main Icon */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 block">Now</span>
            <div className="flex items-center gap-3">
              <span className="text-6xl sm:text-7xl font-light tracking-tighter text-white">
                {currentTemp}°
              </span>
              <div className="w-12 h-12 rounded-full bg-gray-700/40 flex items-center justify-center">
                <Cloud className="w-8 h-8 text-gray-300 fill-gray-300/60" />
              </div>
            </div>
          </div>

          {/* Right: Weather Condition & Feels Like */}
          <div className="text-right space-y-1 pt-1">
            <h3 className="text-xl sm:text-2xl font-normal text-white">{condition}</h3>
            <p className="text-xs text-gray-400 font-medium">Feels like {feelsLike}°</p>
          </div>

        </div>

        {/* Hourly Forecast Scroll Row */}
        <div className="px-6 sm:px-8 pb-8 pt-2">
          <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar pb-2">
            {hourlyForecast.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[52px] space-y-3 text-center flex-shrink-0">
                
                {/* Temp */}
                <span className="text-sm font-medium text-white">{item.temp}°</span>

                {/* Rain Percentage Tag */}
                <div className="h-6 flex flex-col items-center justify-center">
                  {item.rain ? (
                    <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-0.5">
                      {item.rain}
                    </span>
                  ) : null}
                </div>

                {/* Weather Icon */}
                <div className="w-8 h-8 flex items-center justify-center">
                  {renderIcon(item.icon)}
                </div>

                {/* Time */}
                <span className="text-xs text-gray-400 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Weather Landscape Field Illustration with Frog Mascot Footer */}
        <div className="relative w-full h-32 bg-gradient-to-b from-[#1E232A] to-[#12161C] overflow-hidden border-t border-gray-800/60">
          
          {/* SVG Clouds & Rolling Hills */}
          <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path fill="#151A21" d="M0,60 C150,90 350,40 500,65 C650,90 900,40 1200,70 L1200,120 L0,120 Z" />
            <path fill="#1B241A" d="M0,75 C200,55 400,95 650,70 C900,45 1050,85 1200,75 L1200,120 L0,120 Z" />
            <path fill="#2E4A28" d="M0,90 C300,70 600,105 900,85 C1050,75 1150,95 1200,90 L1200,120 L0,120 Z" />
          </svg>

          {/* Tree Canopy Layer */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around items-end px-6 pointer-events-none opacity-90">
            {/* Tree 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1F3A22] border-2 border-[#2E5A33] shadow-lg flex items-center justify-center relative">
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-3 left-4" />
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute bottom-4 right-3" />
              </div>
              <div className="w-2 h-6 bg-[#0E1A0F]" />
            </div>

            {/* Tree 2 */}
            <div className="flex flex-col items-center hidden sm:flex">
              <div className="w-20 h-20 rounded-full bg-[#18321B] border-2 border-[#254B29] shadow-lg flex items-center justify-center relative">
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-4 right-5" />
              </div>
              <div className="w-2.5 h-8 bg-[#0E1A0F]" />
            </div>

            {/* Frog Mascot on Field */}
            <div className="relative z-10 flex flex-col items-center -mb-1">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] border-2 border-[#2E7D32] flex items-center justify-center shadow-md relative animate-bounce-slow">
                {/* Eyes */}
                <div className="absolute -top-1.5 left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center border border-green-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
                <div className="absolute -top-1.5 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center border border-green-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
                {/* Smile */}
                <div className="w-3 h-1 border-b-2 border-green-900 rounded-full mt-2" />
              </div>
            </div>

            {/* Tree 3 */}
            <div className="flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-[#1B381E] border-2 border-[#2B542F] shadow-lg flex items-center justify-center relative">
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-5 left-3" />
              </div>
              <div className="w-2 h-7 bg-[#0E1A0F]" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default GoogleWeatherWidget;
