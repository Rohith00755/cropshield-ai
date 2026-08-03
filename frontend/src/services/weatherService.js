// Real-time Geolocation and Live Weather Service using Open-Meteo & Nominatim

export const getUserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

export const fetchReverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    if (data && data.address) {
      const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.county || "Local Field";
      const state = data.address.state || data.address.region || "";
      const country = data.address.country || "";
      return `${city}${state ? `, ${state}` : ''}${country ? `, ${country}` : ''}`;
    }
    return `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  } catch (e) {
    return `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  }
};

export const fetchLiveWeather = async (lat, lng) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.current_weather) {
      throw new Error("Unable to fetch weather data from satellite API.");
    }

    const currentWeather = data.current_weather;
    const weatherCode = currentWeather.weathercode;

    // Interpret Open-Meteo weather codes
    const weatherInfo = getWeatherInterpretation(weatherCode);

    const temp = Math.round(currentWeather.temperature);
    const windSpeed = Math.round(currentWeather.windspeed);
    const humidity = data.hourly?.relativehumidity_2m?.[0] || 65;
    const rainProb = data.daily?.precipitation_probability_max?.[0] || 15;

    // Calculate Agricultural Spraying Index
    let sprayingIndex = "Optimal Window (06:00 - 10:00 AM)";
    if (rainProb > 40) {
      sprayingIndex = "Avoid Spraying (High Rain Prob)";
    } else if (windSpeed > 20) {
      sprayingIndex = "Caution: High Wind Drift (>20km/h)";
    } else if (temp > 35) {
      sprayingIndex = "Avoid Midday (High Heat Evaporation)";
    }

    // Build 7-Day Live Forecast List
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIdx = new Date().getDay();

    const forecast = (data.daily?.time || []).slice(0, 7).map((timeStr, idx) => {
      const d = new Date(timeStr);
      const dayName = idx === 0 ? "Today" : daysOfWeek[d.getDay()];
      const dayCode = data.daily?.weathercode?.[idx] || 0;
      const dayInterpretation = getWeatherInterpretation(dayCode);
      const maxTemp = Math.round(data.daily?.temperature_2m_max?.[idx] || temp + 2);
      const minTemp = Math.round(data.daily?.temperature_2m_min?.[idx] || temp - 6);
      const rain = data.daily?.precipitation_probability_max?.[idx] || 10;

      let daySpraying = "Optimal Window";
      if (rain > 40) daySpraying = "Avoid Spraying";
      else if (maxTemp > 35) daySpraying = "Morning Spray Only";

      return {
        day: dayName,
        date: `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`,
        temp: `${maxTemp}°C`,
        tempMax: `${maxTemp}`,
        tempMin: `${minTemp}`,
        condition: dayInterpretation.condition,
        icon: dayInterpretation.icon,
        rainProb: rain,
        sprayingIndex: daySpraying,
        humidity: `${humidity}%`,
        windSpeed: `${windSpeed} km/h`
      };
    });

    return {
      success: true,
      currentTemp: temp,
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      humidity: humidity,
      windSpeed: windSpeed,
      rainProb: rainProb,
      sprayingIndex: sprayingIndex,
      forecast: forecast
    };

  } catch (error) {
    console.error("Live weather fetch error:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

function getWeatherInterpretation(code) {
  // WMO Weather interpretation codes
  if (code === 0) return { condition: "Clear Sky", icon: "Sun" };
  if (code >= 1 && code <= 3) return { condition: "Partly Cloudy", icon: "CloudSun" };
  if (code >= 45 && code <= 48) return { condition: "Foggy & Mist", icon: "CloudSun" };
  if (code >= 51 && code <= 67) return { condition: "Rain Showers", icon: "CloudRain" };
  if (code >= 80 && code <= 82) return { condition: "Heavy Rain", icon: "CloudRain" };
  if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "CloudLightning" };
  return { condition: "Fair Weather", icon: "CloudSun" };
}
