import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  PieChart
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import RiskDonutChart from '../components/charts/RiskDonutChart';
import DiseaseTrendChart from '../components/charts/DiseaseTrendChart';
import { RECENT_PREDICTIONS } from '../utils/mockData';

export function DiseaseAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [downloading, setDownloading] = useState(false);

  const predictionsList = Array.isArray(RECENT_PREDICTIONS) ? RECENT_PREDICTIONS : [];

  const filteredPredictions = predictionsList.filter(item => {
    const cropName = (item.crop || '').toLowerCase();
    const diseaseName = (item.disease || '').toLowerCase();
    const riskLevel = (item.riskLevel || item.status || '').toLowerCase();
    
    const matchesSearch = cropName.includes(searchTerm.toLowerCase()) || diseaseName.includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || riskLevel.includes(riskFilter);
    return matchesSearch && matchesRisk;
  });

  const handleDownloadReport = (format) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`CropShield ${format.toUpperCase()} Analytics Report downloaded successfully!`);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-[#263238] flex items-center gap-2">
            📊 Crop Health Reports
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold">
              30-Day Historical
            </span>
          </h2>
          <p className="text-xs text-[#607D8B] font-medium mt-1">
            Outbreak frequency, pathogen distribution, and exportable agronomic reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleDownloadReport('csv')}
            className="px-4 py-2.5 rounded-2xl bg-[#F7FAF4] hover:bg-[#EEF5EA] text-[#263238] font-bold text-xs flex items-center gap-2 border border-[#E5E7EB] transition-all"
          >
            <Download className="w-4 h-4 text-[#2E7D32]" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleDownloadReport('pdf')}
            className="px-5 py-2.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>{downloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Most Common Diseases Donut */}
        <GlassCard className="p-6 flex flex-col justify-between bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#2E7D32]" />
              <h3 className="text-sm font-extrabold text-[#263238]">
                Prevalent Pathogen Distribution
              </h3>
            </div>
            <span className="text-xs text-[#607D8B] font-medium">Sacramento Valley Data</span>
          </div>

          <RiskDonutChart />
        </GlassCard>

        {/* Risk Trend Trajectory */}
        <GlassCard className="p-6 flex flex-col justify-between bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#E53935]" />
              <h3 className="text-sm font-extrabold text-[#263238]">
                30-Day Disease Risk Probability Trend
              </h3>
            </div>
            <span className="text-xs text-[#607D8B] font-medium">Field Node Telemetry</span>
          </div>

          <DiseaseTrendChart />
        </GlassCard>

      </div>

      {/* Historical Report Records Table */}
      <GlassCard className="p-6 bg-white border border-[#E5E7EB] shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h3 className="text-base font-extrabold text-[#263238] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2E7D32]" />
              Recent Crop Disease Assessments
            </h3>
            <p className="text-xs text-[#607D8B]">
              Historical machine learning inference logs and risk classifications
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search crop or disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#F7FAF4] border border-[#E5E7EB] rounded-2xl text-xs text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] w-48 sm:w-64 font-medium"
              />
            </div>

            {/* Risk Level Filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="py-2 px-3 bg-[#F7FAF4] border border-[#E5E7EB] rounded-2xl text-xs text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] font-medium"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="safe">Safe / Healthy</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-[#607D8B] border-b border-[#E5E7EB] bg-[#F7FAF4]">
                <th className="py-3 px-4 rounded-l-xl">Crop Name</th>
                <th className="py-3 px-4">Identified Pathogen / Condition</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4 rounded-r-xl">Assessment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredPredictions.length > 0 ? (
                filteredPredictions.map((item) => {
                  const isHigh = (item.riskLevel || '').includes('high') || (item.status || '').includes('High');
                  const isMod = (item.riskLevel || '').includes('mod') || (item.status || '').includes('Moderate');
                  
                  return (
                    <tr key={item.id} className="hover:bg-[#F7FAF4] transition-colors text-xs text-[#263238]">
                      <td className="py-3.5 px-4 font-bold">{item.crop}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-700">{item.disease}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] ${
                          isHigh ? 'bg-[#FFEBEE] text-[#E53935]' :
                          isMod ? 'bg-[#FFF8E1] text-[#F9A825]' :
                          'bg-[#E8F5E9] text-[#2E7D32]'
                        }`}>
                          {isHigh ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          {item.risk || item.status || 'Verified'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#2E7D32]">{item.confidence || '94%'}</td>
                      <td className="py-3.5 px-4 text-[#607D8B] font-medium">{item.date}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-xs text-[#607D8B]">
                    No historical reports found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </GlassCard>

    </div>
  );
}

export default DiseaseAnalyticsPage;
