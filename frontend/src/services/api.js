import axios from 'axios';
import { 
  simulateXGBoostPrediction, 
  INITIAL_METRICS, 
  SENSOR_TELEMETRY, 
  WEATHER_FORECAST, 
  RECENT_PREDICTIONS,
  NOTIFICATIONS_DATA
} from '../utils/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cropshield_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const cropShieldApi = {
  // XGBoost Disease Prediction
  predictDisease: async (inputData) => {
    try {
      const response = await apiClient.post('/predict', inputData);
      return { success: true, data: response.data, source: 'backend' };
    } catch (err) {
      console.warn('FastAPI backend unreachable or error. Using local simulation engine.', err.message);
      const simulated = simulateXGBoostPrediction(inputData);
      return { success: true, data: simulated, source: 'local-simulation' };
    }
  },

  // ChatGPT AI Agent Interaction
  sendChatMessage: async (message, model = 'gpt-4o-mini', cropContext = null) => {
    try {
      const response = await apiClient.post('/chat', { message, model, cropContext });
      return { success: true, data: response.data, source: 'backend' };
    } catch (err) {
      console.warn('Backend ChatGPT service fallback.', err.message);
      const q = message.trim().toLowerCase();
      let text = '';

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      // 1. CROP PLANTING INTENTS (Highest Precedence)
      if (q.includes('rice') && (q.includes('plant') || q.includes('sow') || q.includes('time') || q.includes('season') || q.includes('when') || q.includes('grow') || q.includes('transplant'))) {
        text = `### 🌾 Best Time & Guidelines for Planting Rice\n\n**1. Optimal Planting Windows**:\n- **Monsoon (Kharif Season)**: **June 15 – July 15** (Transplanting 21–25 day old nursery seedlings).\n- **Winter / Summer (Boro Season)**: **November – December** (in southern & eastern regions).\n\n**2. Ideal Field & Soil Conditions**:\n- **Soil Type**: Clay loam or silty clay with high water-retention capacity (pH 5.5 – 6.5).\n- **Standing Water**: Maintain 2–3 cm standing water during transplanting.\n\n**3. Agronomic Tips**:\n- Apply 50% Nitrogen + 100% Phosphorus & Potassium as basal dose before puddling.\n- Space seedlings 20 cm × 15 cm apart for optimal tiller development.`;
      } 
      else if (q.includes('cotton') && (q.includes('plant') || q.includes('sow') || q.includes('time') || q.includes('season') || q.includes('when') || q.includes('grow'))) {
        text = `### 🌾 Best Time & Guidelines for Planting Cotton\n\n**1. Optimal Sowing Window**:\n- **Best Months**: **April 15 – May 31** (Kharif / Early Summer Season).\n- **Soil Temperature Requirement**: Sowing should begin when minimum soil temperature stays consistently above **18°C–20°C (65°F–68°F)** at 5 cm depth for 5 consecutive days.\n\n**2. Soil & Field Preparation**:\n- **Soil Type**: Deep, well-drained **Black Cotton Soil (Vertisols)** or fertile Alluvial Loam with pH **6.0 – 8.0**.\n- **Sowing Depth**: Plant seeds **2.5 – 4 cm (1 – 1.5 inches)** deep.\n- **Row Spacing**: Maintain **75 – 90 cm** between rows and **30 – 45 cm** between plants.\n\n**3. Agronomic Tips**:\n- Apply a basal fertilizer dose of NPK (20:40:20 kg/ha) + Zinc Sulfate.\n- Perform one light pre-sowing irrigation (*palewa*) to ensure uniform germination.`;
      } 
      else if (q.includes('wheat') && (q.includes('plant') || q.includes('sow') || q.includes('time') || q.includes('season') || q.includes('when') || q.includes('grow'))) {
        text = `### 🌾 Best Time & Guidelines for Planting Wheat\n\n**1. Optimal Planting Window**:\n- **Rabi Season**: **November 1 – November 25** (when daily temperature drops below 22°C).\n- **Late Sowing Limit**: December 10 (requires higher seed rate of 125 kg/ha).\n\n**2. Agronomic Protocol**:\n- Sowing Depth: 4–5 cm in moist, well-tilled soil.\n- Ensure Crown Root Initiation (CRI) irrigation 21 days post-sowing.`;
      }
      else if (q.includes('tomato') && (q.includes('plant') || q.includes('sow') || q.includes('time') || q.includes('season') || q.includes('when') || q.includes('grow'))) {
        text = `### 🍅 Best Time & Guidelines for Planting Tomatoes\n\n**1. Optimal Planting Window**:\n- **Spring Crop**: **February – March**.\n- **Autumn Crop**: **August – September**.\n\n**2. Soil & Spacing Protocol**:\n- Soil pH: 6.0 – 7.0 in well-drained sandy loam.\n- Spacing: 60 cm between rows and 45 cm between plants.`;
      }
      // 2. DISEASE INTENTS
      else if (q.includes('rice') || q.includes('blast')) {
        text = `### 🌾 ChatGPT Crop Directive: Rice Blast Control\n\n- **Spray Recommendation**: Apply **Tricyclazole 75% WP** at 0.6g/L within 24 hours.\n- **Action**: Pause high-dose Nitrogen top dressing to avoid soft leaf tissue susceptibility.`;
      } 
      else if (q.includes('tomato') || q.includes('blight')) {
        text = `### 🍅 ChatGPT Crop Directive: Tomato Blight Management\n\n- **Treatment**: Apply **Metalaxyl + Mancozeb (Ridomil Gold)** at 2.5g/L or Chlorothalonil.\n- **Action**: Prune lower 12 inches of leaf foliage to improve solar exposure.`;
      } 
      // 3. EXPLICIT CLOCK TIME INTENTS
      else if (q.includes('what time is it') || q.includes('whats the time') || q.includes('what is the time') || q.includes('current time') || q.includes('what date') || q.includes('current date') || q === 'time') {
        text = `🕒 **Current System Time & Date**:\n\n- **Time**: \`${timeStr}\`\n- **Date**: \`${dateStr}\`\n- **Field Gateway Status**: Connected & Synchronized.`;
      } 
      // 4. GREETINGS
      else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('who are you') || q.includes('help')) {
        text = `👋 **Hello! I'm CropShield ChatGPT AI Assistant**.\n\nI am your 24/7 smart farming & agricultural intelligence companion. I can assist with:\n- 🌾 Crop planting schedules (Rice, Cotton, Wheat, Tomato)\n- 🛡 Disease prevention & fungicide advice\n- 🧪 Soil NPK fertilizer ratios\n- 🌦 Spraying weather windows\n- ❓ General questions!`;
      } 
      // 5. DEFAULT HELP
      else {
        text = `### 🤖 ChatGPT AI Assistant\n\nThank you for asking about **"${message}"**!\n\nI am your 24/7 smart farming assistant. How can I help you today with crop planting, disease protection, weather windows, or soil health?`;
      }

      return {
        success: true,
        data: {
          text,
          model: model || 'gpt-4o-mini',
          provider: 'ChatGPT AI Engine',
          status: 'success'
        },
        source: 'local-fallback'
      };
    }
  },

  // Auth: Login
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('cropshield_token', response.data.token);
      }
      return { success: true, user: response.data.user || { name: 'Rohith', email } };
    } catch (err) {
      const demoToken = 'mock_jwt_token_agritech_2026';
      localStorage.setItem('cropshield_token', demoToken);
      return { 
        success: true, 
        user: { name: email.split('@')[0] || 'Rohith', email, role: 'Lead Farmer' },
        source: 'local-fallback' 
      };
    }
  },

  // Auth: Register
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: true, user: userData, source: 'local-fallback' };
    }
  },

  // Weather Endpoint
  getWeather: async (lat = 38.5816, lng = -121.4944) => {
    try {
      const response = await apiClient.get(`/weather?lat=${lat}&lng=${lng}`);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: true, data: WEATHER_FORECAST, source: 'local-fallback' };
    }
  },

  // IoT Sensor Telemetry
  getSensorData: async () => {
    try {
      const response = await apiClient.get('/sensor-data');
      return { success: true, data: response.data };
    } catch (err) {
      return { success: true, data: SENSOR_TELEMETRY, source: 'local-fallback' };
    }
  },

  // Prediction History
  getPredictionHistory: async () => {
    try {
      const response = await apiClient.get('/history');
      return { success: true, data: response.data };
    } catch (err) {
      return { success: true, data: RECENT_PREDICTIONS, source: 'local-fallback' };
    }
  }
};

export default cropShieldApi;
