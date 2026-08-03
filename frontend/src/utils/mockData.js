// CropShield - Extended Dataset & Dynamic Rule-Based Disease Engine

export const DEFAULT_USER = {
  name: "Rohith",
  role: "Lead Farmer & Agri Specialist",
  email: "rohith@cropshield.ag",
  farmName: "Sacramento Valley Farms",
  location: "Sacramento Valley, CA",
  coordinates: { lat: 38.5816, lng: -121.4944 },
  farmSizeAcres: 450,
  farmSizeHectares: 182.1,
  primaryCrops: ["Rice (Calrose)", "Winter Wheat", "Roma Tomato", "Sweet Corn", "Potato"],
  soilType: "Clay Loam (pH 6.8)",
  irrigationType: "Precision Drip & Center Pivot",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  joinDate: "March 2024",
  iotDevicesConnected: 12
};

export const INITIAL_METRICS = {
  healthScore: 92,
  healthScoreStatus: "Healthy",
  diseaseRisk: "High Risk Alert",
  diseaseRiskLevel: "high",
  temperature: 29.0,
  humidity: 86,
  soilMoisture: 74,
  todayAlertsCount: 1,
  connectionStatus: "Connected",
  lastUpdated: "Just now"
};

export const STARTUP_METRICS = [
  { label: "Prediction Accuracy", value: "94.2%", subtitle: "Validated on 1.2M Data Points", color: "text-[#2E7D32]" },
  { label: "Prediction Latency", value: "1.4 s", subtitle: "Real-time Field Engine", color: "text-[#2E7D32]" },
  { label: "Active Monitored Farms", value: "1,250", subtitle: "Across 4 Agricultural Zones", color: "text-[#2E7D32]" },
  { label: "Model Confidence", value: "91%", subtitle: "Multi-parameter Validation", color: "text-[#2E7D32]" },
  { label: "Field Sensor Sync", value: "LIVE", subtitle: "15s Telemetry Frequency", color: "text-[#F9A825]" }
];

export const DIGITAL_TWIN_STATE = {
  farmName: "North Paddy Sector 4",
  status: "Field Sensor Connected",
  temperature: 29,
  humidity: 86,
  soilMoisture: 74,
  crop: "Rice (Calrose)",
  growthStage: "Tillering Phase",
  solarIrradiance: "840 W/m²",
  dewPoint: "21.4°C",
  lastUpdated: "12 seconds ago"
};

export const XAI_FEATURE_IMPORTANCE = [
  { feature: "Air Humidity (>85% for 6h)", weight: "+38%", impact: "High Risk Trigger", color: "bg-[#E53935]" },
  { feature: "Leaf Wetness & Rainfall", weight: "+27%", impact: "Fungal Sporulation", color: "bg-[#F9A825]" },
  { feature: "Air Temperature (22-30°C)", weight: "+18%", impact: "Optimal Growth", color: "bg-[#42A5F5]" },
  { feature: "Crop Growth Stage", weight: "+11%", impact: "Cuticle Vulnerability", color: "bg-[#2E7D32]" },
  { feature: "Wind Speed & Drift", weight: "+6%", impact: "Spore Transmission", color: "bg-[#8E24AA]" }
];

export const NOTIFICATIONS_DATA = [
  { id: 1, title: "Rice Blast Alert", message: "Sector 4 Humidity reached 88%. High sporulation risk.", time: "10 mins ago", type: "urgent" },
  { id: 2, title: "Spraying Advisory", message: "Optimal spray window: Tomorrow 06:00 AM - 09:00 AM.", time: "1 hour ago", type: "info" },
  { id: 3, title: "Sensor Telemetry Sync", message: "12/12 ESP32 Gateways online and transmitting.", time: "3 hours ago", type: "success" }
];

export const SENSOR_TELEMETRY = [
  { id: "esp32_sec1", sector: "Sector 1 - Rice", temp: 28.5, humidity: 82, soil: 76, battery: "98%", status: "Active" },
  { id: "esp32_sec2", sector: "Sector 2 - Tomato", temp: 31.2, humidity: 65, soil: 62, battery: "95%", status: "Active" },
  { id: "esp32_sec3", sector: "Sector 3 - Wheat", temp: 24.8, humidity: 70, soil: 68, battery: "91%", status: "Active" },
  { id: "esp32_sec4", sector: "Sector 4 - Paddy", temp: 29.1, humidity: 88, soil: 78, battery: "100%", status: "High Risk" }
];

export const MAP_RISK_ZONES = [
  { id: "z1", name: "Sector 1 (North Paddy)", riskLevel: "Low", riskPercentage: 14, crop: "Calrose Rice", lat: 38.5830, lng: -121.4960 },
  { id: "z2", name: "Sector 2 (East Tomato)", riskLevel: "Moderate", riskPercentage: 42, crop: "Roma Tomato", lat: 38.5800, lng: -121.4920 },
  { id: "z3", name: "Sector 3 (South Wheat)", riskLevel: "Low", riskPercentage: 8, crop: "Winter Wheat", lat: 38.5780, lng: -121.4980 },
  { id: "z4", name: "Sector 4 (Central Paddy)", riskLevel: "High", riskPercentage: 82, crop: "Calrose Rice", lat: 38.5816, lng: -121.4944 }
];

export const WEATHER_FORECAST = [
  { day: "Today", temp: "31°", tempMax: "31", tempMin: "21", condition: "Partly Cloudy", icon: "CloudSun", rainProb: 20, sprayingIndex: "Optimal Window" },
  { day: "Mon", temp: "33°", tempMax: "33", tempMin: "22", condition: "Sunny", icon: "Sun", rainProb: 10, sprayingIndex: "Optimal Window" },
  { day: "Tue", temp: "29°", tempMax: "29", tempMin: "20", condition: "Light Rain", icon: "CloudRain", rainProb: 65, sprayingIndex: "Avoid Spraying" },
  { day: "Wed", temp: "27°", tempMax: "27", tempMin: "19", condition: "Thunderstorm", icon: "CloudLightning", rainProb: 80, sprayingIndex: "Avoid Spraying" },
  { day: "Thu", temp: "30°", tempMax: "30", tempMin: "21", condition: "Partly Cloudy", icon: "CloudSun", rainProb: 15, sprayingIndex: "Optimal Window" },
  { day: "Fri", temp: "32°", tempMax: "32", tempMin: "22", condition: "Sunny", icon: "Sun", rainProb: 5, sprayingIndex: "Optimal Window" },
  { day: "Sat", temp: "34°", tempMax: "34", tempMin: "23", condition: "Clear Sky", icon: "Sun", rainProb: 0, sprayingIndex: "Optimal Window" }
];

export const RECENT_PREDICTIONS = [
  { id: "p1", crop: "Rice (Calrose)", disease: "Rice Blast (Pyricularia oryzae)", risk: "82%", status: "High Risk", date: "Today 10:30 AM" },
  { id: "p2", crop: "Roma Tomato", disease: "Early Blight (Alternaria solani)", risk: "74%", status: "Moderate Risk", date: "Yesterday 04:15 PM" },
  { id: "p3", crop: "Winter Wheat", disease: "Healthy Crop (No Disease)", risk: "5%", status: "Optimal", date: "01 Aug 2026" }
];

export const CHART_SERIES = {
  temperature: [26, 27, 29, 31, 30, 28, 29],
  humidity: [65, 70, 78, 86, 88, 82, 86],
  soilMoisture: [60, 65, 70, 74, 76, 72, 74]
};

export const DISEASE_ANALYTICS_DATA = {
  highRiskCount: 3,
  moderateRiskCount: 5,
  lowRiskCount: 14,
  totalScans: 22,
  cropBreakdown: [
    { name: "Rice Blast", count: 8, percentage: 36 },
    { name: "Tomato Early Blight", count: 5, percentage: 23 },
    { name: "Potato Late Blight", count: 4, percentage: 18 },
    { name: "Cotton Bacterial Blight", count: 3, percentage: 14 },
    { name: "Healthy / Others", count: 2, percentage: 9 }
  ]
};

export const INVESTOR_PITCH_DATA = {
  tam: "$12.4B Global Agritech Market",
  sam: "$1.8B Precision Disease Management",
  som: "$240M Target Early Adopters",
  businessModel: "SaaS Subscription + IoT Hardware Kit ($49/month)",
  traction: "1,250 Active Farmers Monitored across 4 Zones",
  roi: "Avg 22% Increased Crop Yield & 40% Fungicide Cost Reduction"
};

export const FUTURE_ROADMAP = [
  { quarter: "Q4 2026", milestone: "Autonomous Drone Spraying API Integration", status: "In Progress" },
  { quarter: "Q1 2027", milestone: "Hyperspectral Satellite Imaging Pipeline", status: "Planned" },
  { quarter: "Q2 2027", milestone: "Multi-national Agri-cooperative Enterprise Portal", status: "Planned" }
];

export const INITIAL_PREDICTION_HISTORY = [
  {
    id: "fb_doc_1001",
    timestamp: new Date().toISOString(),
    formattedDate: "03 Aug 2026, 06:45 PM",
    crop: "Rice (Calrose)",
    disease: "Rice Blast (Pyricularia oryzae)",
    riskPercentage: "82%",
    riskLevel: "High",
    eta: "Within 48 Hours",
    temperature: "29.0°C",
    humidity: "86%",
    soilMoisture: "74%",
    rainfall: "Moderate (18mm)",
    recommendation: "Spray Tricyclazole 75% WP (0.6g/L) immediately.",
    status: "Synced to Firebase Firestore"
  },
  {
    id: "fb_doc_1002",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    formattedDate: "02 Aug 2026, 02:15 PM",
    crop: "Roma Tomato",
    disease: "Early Blight (Alternaria solani)",
    riskPercentage: "74%",
    riskLevel: "Moderate",
    eta: "Within 72 Hours",
    temperature: "31.2°C",
    humidity: "78%",
    soilMoisture: "65%",
    rainfall: "Low (5mm)",
    recommendation: "Spray Chlorothalonil or Mancozeb preventative spray.",
    status: "Synced to Firebase Firestore"
  },
  {
    id: "fb_doc_1003",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    formattedDate: "01 Aug 2026, 09:10 AM",
    crop: "Winter Wheat",
    disease: "Wheat Yellow / Stripe Rust",
    riskPercentage: "91%",
    riskLevel: "High",
    eta: "Within 24 Hours",
    temperature: "24.8°C",
    humidity: "84%",
    soilMoisture: "70%",
    rainfall: "Heavy (24mm)",
    recommendation: "Spray Propiconazole 25% EC (Tilt) immediately.",
    status: "Synced to Firebase Firestore"
  },
  {
    id: "fb_doc_1004",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    formattedDate: "31 Jul 2026, 11:30 AM",
    crop: "Potato (Russet)",
    disease: "Potato Late Blight (Phytophthora infestans)",
    riskPercentage: "88%",
    riskLevel: "High",
    eta: "Within 36 Hours",
    temperature: "19.5°C",
    humidity: "92%",
    soilMoisture: "82%",
    rainfall: "Heavy (32mm)",
    recommendation: "Apply Metalaxyl + Mancozeb system protection spray.",
    status: "Synced to Firebase Firestore"
  }
];

export const simulateXGBoostPrediction = (inputs) => {
  const cropStr = (inputs.crop || "").toLowerCase();
  const temp = parseFloat(inputs.temperature) || 28;
  const humidity = parseFloat(inputs.humidity) || 80;
  const soil = parseFloat(inputs.soilMoisture) || 70;
  const rain = parseFloat(inputs.rainfall) || 15;

  let diseaseName = "Healthy Crop (No Active Pathogen Threat)";
  let riskScore = 12;
  let confidence = 96;
  let riskLevel = "low";
  let recommendation = "Maintain regular irrigation and monitoring schedule. No chemical spray required.";
  let fungicide = "Organic Bio-fertilizer / Neem Extract";
  let eta = "No Risk Expected";
  let estimatedSavings = "₹12,000 (No Crop Loss)";
  let checklist = [
    "Maintain standard drip irrigation frequency",
    "Monitor soil pH weekly",
    "Inspect lower leaves during morning rounds"
  ];

  if (cropStr.includes("rice")) {
    if (humidity > 75 && temp >= 22 && temp <= 32) {
      diseaseName = "Rice Blast (Pyricularia oryzae)";
      riskScore = Math.min(98, Math.round(65 + (humidity - 75) * 1.5 + (rain / 5)));
      confidence = 94;
      riskLevel = "high";
      recommendation = "Spray Tricyclazole 75% WP (0.6g/L) or Isoprothiolane immediately.";
      fungicide = "Tricyclazole 75% WP (Beam)";
      eta = "Within 48 Hours";
      estimatedSavings = "₹45,000";
      checklist = [
        "Spray Tricyclazole 75% WP immediately",
        "Drain excess standing water from paddy fields",
        "Avoid applying extra nitrogenous fertilizer"
      ];
    }
  } else if (cropStr.includes("tomato")) {
    if (humidity > 70) {
      diseaseName = "Tomato Early Blight (Alternaria solani)";
      riskScore = Math.min(95, Math.round(55 + (humidity - 70) * 1.4));
      confidence = 92;
      riskLevel = "moderate";
      recommendation = "Spray Chlorothalonil or Mancozeb preventative spray.";
      fungicide = "Chlorothalonil 75% WP";
      eta = "Within 72 Hours";
      estimatedSavings = "₹28,000";
      checklist = [
        "Spray Chlorothalonil 75% WP",
        "Prune lower leaves near ground surface",
        "Ensure drip lines do not splash soil onto foliage"
      ];
    }
  }

  return {
    disease: diseaseName,
    probability: riskScore,
    riskPercentage: `${riskScore}%`,
    riskLevel: riskLevel,
    confidence: confidence,
    confidenceText: `${confidence}%`,
    recommendation: recommendation,
    fungicide: fungicide,
    preventiveMeasures: checklist,
    checklist: checklist,
    estimatedSavings: estimatedSavings,
    bestSprayingTime: "Tomorrow Morning 07:00 AM - 09:00 AM",
    eta: eta
  };
};

export default {
  DEFAULT_USER,
  INITIAL_METRICS,
  STARTUP_METRICS,
  DIGITAL_TWIN_STATE,
  XAI_FEATURE_IMPORTANCE,
  NOTIFICATIONS_DATA,
  SENSOR_TELEMETRY,
  MAP_RISK_ZONES,
  WEATHER_FORECAST,
  RECENT_PREDICTIONS,
  CHART_SERIES,
  DISEASE_ANALYTICS_DATA,
  INVESTOR_PITCH_DATA,
  FUTURE_ROADMAP,
  INITIAL_PREDICTION_HISTORY,
  simulateXGBoostPrediction
};
