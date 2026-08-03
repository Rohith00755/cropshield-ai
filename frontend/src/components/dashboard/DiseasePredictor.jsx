import React, { useState } from 'react';
import { Sprout, RefreshCw, AlertTriangle, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { cropShieldApi } from '../../services/api';
import { savePredictionToFirebase } from '../../services/firebaseService';

export function DiseasePredictor({ onPredictionResult }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: 'Rice',
    growthStage: 'Tillering',
    soilMoisture: 74,
    fieldLocation: 'Sacramento Valley Sector 4'
  });
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await cropShieldApi.predictDisease({
        cropType: formData.cropType,
        growthStage: formData.growthStage,
        soilMoisture: formData.soilMoisture,
        temperature: 29.0,
        humidity: 86,
        rainfall: 120
      });
      const predictionData = res.data;
      setResult(predictionData);

      // Auto Log to Firebase Firestore
      await savePredictionToFirebase({
        crop: formData.cropType,
        disease: predictionData.disease,
        riskPercentage: predictionData.riskPercentage,
        riskLevel: predictionData.riskLevel,
        eta: predictionData.eta,
        recommendation: predictionData.recommendation,
        inputs: {
          temperature: '29.0°C',
          humidity: '86%',
          soilMoisture: `${formData.soilMoisture}%`,
          rainfall: '18mm'
        }
      });

      if (onPredictionResult) onPredictionResult(predictionData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8 bg-white border border-[#E5E7EB] shadow-sm space-y-6">
      
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
          <Sprout className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#263238]">🌾 Tell us about your crop</h2>
          <p className="text-xs text-[#607D8B] font-medium">Answer 4 simple questions to check your field's health</p>
        </div>
      </div>

      <form onSubmit={handlePredict} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Question 1 */}
          <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-2">
            <label className="text-xs font-extrabold text-[#263238] block">
              1. What crop are you growing?
            </label>
            <select
              value={formData.cropType}
              onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-bold text-[#263238] outline-none focus:border-[#2E7D32] shadow-sm"
            >
              <option value="Rice">Rice (Paddy)</option>
              <option value="Wheat">Wheat</option>
              <option value="Corn">Corn (Maize)</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-2">
            <label className="text-xs font-extrabold text-[#263238] block">
              2. What stage is your crop?
            </label>
            <select
              value={formData.growthStage}
              onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-bold text-[#263238] outline-none focus:border-[#2E7D32] shadow-sm"
            >
              <option value="Tillering">Tillering Phase (Early Growth)</option>
              <option value="Heading">Heading Phase (Flowering)</option>
              <option value="Maturity">Maturity Phase (Harvest Ready)</option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-[#263238] block">
                3. How wet is your soil?
              </label>
              <span className="text-xs font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                {formData.soilMoisture}% Wet
              </span>
            </div>
            <input 
              type="range"
              min="20"
              max="95"
              value={formData.soilMoisture}
              onChange={(e) => setFormData({ ...formData, soilMoisture: parseInt(e.target.value) })}
              className="w-full accent-[#2E7D32]"
            />
          </div>

          {/* Question 4 */}
          <div className="p-4 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] space-y-2">
            <label className="text-xs font-extrabold text-[#263238] block">
              4. Field Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="text"
                value={formData.fieldLocation}
                onChange={(e) => setFormData({ ...formData, fieldLocation: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-bold text-[#263238] outline-none focus:border-[#2E7D32] shadow-sm"
              />
            </div>
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-extrabold text-xs shadow-md shadow-[#2E7D32]/20 flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Crop & Logging to Firebase...</span>
            </>
          ) : (
            <>
              <span>🌾 Check My Crop Disease & Save to Firebase History</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Prediction Output Result */}
      {result && (
        <div className="p-5 rounded-3xl bg-[#E8F5E9] border border-[#2E7D32]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#2E7D32] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> AI Disease Diagnosis Result
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#2E7D32] text-white font-extrabold">
              {result.riskPercentage} ({result.riskLevel?.toUpperCase()} RISK)
            </span>
          </div>

          <h3 className="text-lg font-black text-[#263238]">{result.disease}</h3>
          <p className="text-xs text-[#607D8B] font-medium"><strong>Recommended Treatment:</strong> {result.recommendation}</p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#2E7D32] font-extrabold border-t border-[#C8E6C9]">
            <span>✅ Automatically logged to Firebase Cloud History!</span>
            <span>ETA: {result.eta}</span>
          </div>
        </div>
      )}

    </GlassCard>
  );
}

export default DiseasePredictor;
