import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Activity, 
  CloudSun, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Users, 
  Award,
  BarChart3,
  Bot,
  Zap,
  Globe
} from 'lucide-react';

export function LandingPage({ onLaunchDashboard, onOpenAuth }) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const features = [
    {
      icon: Cpu,
      title: "XGBoost Precision AI",
      description: "Trained on millions of micro-climate data points to detect fungal & bacterial outbreaks up to 72 hours before visible symptoms."
    },
    {
      icon: Activity,
      title: "ESP32 IoT Telemetry",
      description: "Direct MQTT node integration capturing soil moisture, ambient temperature, leaf wetness, and solar irradiance in real time."
    },
    {
      icon: CloudSun,
      title: "Micro-climate Weather",
      description: "High-resolution localized weather forecasting pinpointing exact chemical spraying windows and dew points."
    },
    {
      icon: MapPin,
      title: "GIS Threat Mapping",
      description: "Interactive Leaflet satellite mapping demarcating safe, moderate, and high-risk field sectors with precision boundaries."
    },
    {
      icon: Bot,
      title: "AgriBot AI Assistant",
      description: "Conversational agronomist available 24/7 for prescription dosages, organic remedies, and fertilizer schedules."
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Comprehensive risk trend tracking and automated downloadable compliance reports for insurance and organic certs."
    }
  ];

  const steps = [
    { step: "01", title: "Connect IoT & Sensors", desc: "Sync ESP32 field gateways or auto-pull micro-climate weather metrics via GPS." },
    { step: "02", title: "XGBoost AI Analysis", desc: "Machine learning algorithms evaluate humidity spikes, temp & crop growth stage." },
    { step: "03", title: "Early Outbreak Warning", desc: "Receive immediate SMS & app alerts with exact disease probability & ETA." },
    { step: "04", title: "Targeted Prevention", desc: "Execute AI fungicide prescriptions and optimal spraying windows to save 90% crop yields." }
  ];

  const pricing = [
    {
      title: "Smallholder Farmer",
      price: "Free",
      period: "Forever",
      desc: "Essential disease alerts for farms under 20 acres.",
      features: ["Up to 3 Field Sectors", "Daily XGBoost Disease Scan", "Basic Weather Forecast", "AgriBot AI Chatbot (50 queries/mo)"],
      isPopular: false
    },
    {
      title: "Pro AgriTech",
      price: "$49",
      period: "/month",
      desc: "Complete precision suite for commercial farms.",
      features: ["Unlimited Field Sectors & ESP32 IoT Nodes", "Real-time 15-min XGBoost AI Scans", "GIS Satellite Layer & Heatmaps", "Unlimited AgriBot AI Agronomist", "Priority SMS Outbreak Warnings"],
      isPopular: true
    },
    {
      title: "Enterprise Corp",
      price: "$199",
      period: "/month",
      desc: "Custom AI deployment for cooperative networks.",
      features: ["Multi-Farm Cooperative Dashboard", "Custom XGBoost Model Retraining", "Rest API & Webhook Access", "Dedicated Agronomist Support", "Exportable Compliance Reports"],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#080d16] text-gray-100 overflow-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080d16]/80 backdrop-blur-xl border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              CropShield <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onLaunchDashboard}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow backdrop shapes */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span>Next-Gen XGBoost Crop Disease Prediction Platform</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Predict Crop Diseases <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Before Symptoms Appear
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium"
          >
            CropShield AI combines XGBoost machine learning, micro-climate weather forecasts, GPS maps, and real-time ESP32 IoT sensors to protect your harvest from devastating fungal and bacterial outbreaks.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onLaunchDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore SaaS Dashboard Live</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button 
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold text-base flex items-center justify-center gap-2 transition-all"
            >
              <span>Create Free Account</span>
            </button>
          </motion.div>
        </div>

        {/* Live Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl">
          <div className="text-center">
            <span className="block text-3xl font-extrabold text-white font-mono">99.2%</span>
            <span className="text-xs text-gray-400 font-semibold uppercase">Prediction Accuracy</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-extrabold text-emerald-400 font-mono">72 Hours</span>
            <span className="text-xs text-gray-400 font-semibold uppercase">Early Outbreak Warning</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-extrabold text-teal-400 font-mono">1.2M+</span>
            <span className="text-xs text-gray-400 font-semibold uppercase">Acres Monitored</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-extrabold text-cyan-400 font-mono">$18.5M</span>
            <span className="text-xs text-gray-400 font-semibold uppercase">Crop Loss Prevented</span>
          </div>
        </div>

      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-[#0b121e] border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              State-of-the-Art AgriTech
            </h2>
            <p className="text-3xl font-extrabold text-white">
              Built for Modern Precision Farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Simple 4-Step Pipeline
          </h2>
          <p className="text-3xl font-extrabold text-white">
            How CropShield AI Protects Your Harvest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
              <span className="text-4xl font-extrabold font-mono text-emerald-500/30 block mb-2">{st.step}</span>
              <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0b121e] border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Transparent Plans
            </h2>
            <p className="text-3xl font-extrabold text-white">
              Invest in Yield Protection Today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((p, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-2xl border flex flex-col justify-between relative ${
                  p.isPopular 
                    ? 'bg-gradient-to-b from-emerald-950/50 to-gray-900 border-emerald-500/60 shadow-2xl shadow-emerald-500/10' 
                    : 'bg-gray-900/60 border-gray-800'
                }`}
              >
                {p.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-400 mb-6">{p.desc}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white font-mono">{p.price}</span>
                    <span className="text-xs text-gray-400">{p.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onLaunchDashboard}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    p.isPopular 
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/80 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-white text-sm">CropShield AI</span>
            <span>© 2026 CropShield Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">FastAPI Documentation</a>
            <a href="#" className="hover:text-gray-300">API Status</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default LandingPage;
