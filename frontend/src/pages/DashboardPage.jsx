import React, { useState } from 'react';
import FarmerGreetingCard from '../components/dashboard/FarmerGreetingCard';
import HeroPredictionCard from '../components/dashboard/HeroPredictionCard';
import WeatherWidgetCard from '../components/dashboard/WeatherWidgetCard';
import QuickActionsRow from '../components/dashboard/QuickActionsRow';
import FarmHealthSummaryRow from '../components/dashboard/FarmHealthSummaryRow';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import ExplainableAIPanel from '../components/dashboard/ExplainableAIPanel';
import TempHumidityChart from '../components/charts/TempHumidityChart';
import SoilMoistureChart from '../components/charts/SoilMoistureChart';
import RiskMap from '../components/dashboard/RiskMap';
import AIDiseaseTimeline from '../components/dashboard/AIDiseaseTimeline';
import FinancialROIInsightCard from '../components/dashboard/FinancialROIInsightCard';
import SystemPerformanceCard from '../components/dashboard/SystemPerformanceCard';
import ToastNotification from '../components/common/ToastNotification';
import GlassCard from '../components/common/GlassCard';
import DiseasePredictor from '../components/dashboard/DiseasePredictor';

export function DashboardPage({ onNavigateTab, isFarmerMode = true }) {
  const [predictionResult, setPredictionResult] = useState(null);
  const [activeToast, setActiveToast] = useState({
    disease: "Rice Blast Risk",
    risk: "82%",
    message: "Humidity anomaly breach. Recommended to spray today."
  });

  const handleQuickAction = (actionId) => {
    if (actionId === 'predict') {
      const el = document.getElementById('prediction-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'weather') {
      onNavigateTab('weather');
    } else if (actionId === 'map') {
      onNavigateTab('map');
    } else if (actionId === 'ai-assistant') {
      onNavigateTab('ai-assistant');
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Toast Notification */}
      <ToastNotification 
        toast={activeToast}
        onClose={() => setActiveToast(null)}
        onViewRecommendation={() => {
          const el = document.getElementById('recommendation-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 1. EMOTIONAL FARMER GREETING */}
      <section>
        <FarmerGreetingCard farmerName="Rohith" />
      </section>

      {/* 2. ALERT HERO CARD */}
      <section>
        <HeroPredictionCard 
          prediction={predictionResult}
          onViewDetails={() => {
            const el = document.getElementById('recommendation-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 3. TODAY'S WEATHER WIDGET */}
      <section>
        <WeatherWidgetCard />
      </section>

      {/* 4. QUICK ACTIONS */}
      <section className="space-y-2">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
          Quick Actions
        </h2>
        <QuickActionsRow onAction={handleQuickAction} />
      </section>

      {/* 5. FARM HEALTH SUMMARY */}
      <section className="space-y-2">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
          Farm Health Conditions
        </h2>
        <FarmHealthSummaryRow />
      </section>

      {/* 6. TODAY'S RECOMMENDATION & CHECKLIST */}
      <section id="recommendation-section" className="space-y-2">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
          Today's Recommendation
        </h2>
        <RecommendationCard result={predictionResult} />
      </section>

      {/* 7. CHECK MY CROP FORM */}
      <section id="prediction-section" className="space-y-2">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
          🌾 Check My Crop
        </h2>
        <DiseasePredictor onPredictionResult={(res) => setPredictionResult(res)} />
      </section>

      {/* 8. SCROLL DOWN SECTIONS: WEATHER, FIELD MAP, REPORTS */}
      <section className="space-y-3">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
          Field Weather Trends
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm">
            <h3 className="text-sm font-extrabold text-[#1F2937] mb-3">Temperature & Humidity Dynamics</h3>
            <TempHumidityChart />
          </GlassCard>
          <GlassCard className="p-5 bg-white border border-[#E5E7EB] shadow-sm">
            <h3 className="text-sm font-extrabold text-[#1F2937] mb-3">Soil Moisture Trends</h3>
            <SoilMoistureChart />
          </GlassCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* EXPERT MODE SECTIONS (VISIBLE WHEN FARMER VIEW IS TOGGLED OFF) */}
      {/* ========================================================================= */}
      {!isFarmerMode && (
        <div className="space-y-8 pt-6 border-t-2 border-[#2E7D32]/30">
          
          <div className="p-3.5 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] text-xs font-extrabold text-center shadow-sm">
            🔬 Expert Mode View Active
          </div>

          {/* 🧠 Why did we detect this? */}
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              🧠 Why Did We Detect This?
            </h2>
            <ExplainableAIPanel />
          </section>

          {/* Field Map */}
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              Field Map Overview
            </h2>
            <RiskMap height="h-96" />
          </section>

          {/* Prediction Timeline */}
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              Outbreak Prediction Timeline
            </h2>
            <AIDiseaseTimeline 
              diseaseName={predictionResult?.disease || "Rice Blast"} 
              eta={predictionResult?.eta || "48 Hours"} 
            />
          </section>

          {/* Estimated Savings */}
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              Estimated Savings
            </h2>
            <FinancialROIInsightCard />
          </section>

          {/* System Performance & Sensors */}
          <section className="space-y-2">
            <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              System Performance Telemetry
            </h2>
            <SystemPerformanceCard />
          </section>

        </div>
      )}

    </div>
  );
}
export default DashboardPage;
