import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Trash2, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Sprout, 
  Calendar, 
  Clock, 
  Filter,
  Layers,
  Zap,
  Flame
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { fetchFirebaseHistory, deleteFirebaseHistoryDoc, clearFirebaseHistory } from '../services/firebaseService';

export function FirebaseHistoryPage() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusMessage, setStatusMessage] = useState('');

  const loadHistory = async () => {
    setLoading(true);
    const res = await fetchFirebaseHistory();
    if (res.success) {
      setHistoryList(res.documents);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (docId) => {
    const res = await deleteFirebaseHistoryDoc(docId);
    if (res.success) {
      setHistoryList(prev => prev.filter(item => item.id !== docId));
      setStatusMessage(`Deleted document ${docId} from Firebase Firestore.`);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all prediction history from Firebase Firestore?")) {
      await clearFirebaseHistory();
      setHistoryList([]);
      setStatusMessage('Firebase Firestore prediction collection cleared.');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const handleExportCSV = () => {
    if (historyList.length === 0) return;
    const headers = ["ID", "Timestamp", "Crop", "Disease", "Risk%", "RiskLevel", "Temp", "Humidity", "Soil", "Recommendation"];
    const rows = historyList.map(item => [
      item.id,
      item.formattedDate,
      item.crop,
      item.disease,
      item.riskPercentage,
      item.riskLevel,
      item.temperature,
      item.humidity,
      item.soilMoisture,
      `"${item.recommendation}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cropshield_firebase_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredList = historyList.filter(item => {
    const matchesSearch = 
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formattedDate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      riskFilter === 'all' || 
      item.riskLevel.toLowerCase() === riskFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-16 font-sans text-[#263238]">
      
      {/* Firebase Status Header */}
      <GlassCard className="p-6 bg-white border border-[#E0E8DC] shadow-sm rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#FFE0B2] text-[#F57C00] flex items-center justify-center font-bold">
                <Flame className="w-6 h-6 text-[#F57C00]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#263238] flex items-center gap-2">
                  Firebase Cloud Firestore History
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#2E7D32] font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" />
                  <span>Cloud Database Connected • Real-time Sync Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadHistory}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-[#F7FAF4] hover:bg-[#E8F5E9] text-[#263238] font-extrabold text-xs flex items-center gap-2 border border-[#E0E8DC] transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-[#2E7D32] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-2xl bg-[#E8F5E9] hover:bg-[#c8e6c9] text-[#2E7D32] font-extrabold text-xs flex items-center gap-2 border border-[#C8E6C9] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleClearAll}
              className="px-4 py-2.5 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] font-extrabold text-xs flex items-center gap-2 border border-[#FFCDD2] transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>

        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-2xl bg-[#E8F5E9] border border-[#2E7D32]/30 text-xs font-bold text-[#2E7D32] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}
      </GlassCard>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 bg-white border border-[#E0E8DC] shadow-sm rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search crop, disease, date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E0E8DC] text-xs font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          <span className="text-xs font-extrabold text-[#607D8B] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'high', 'moderate', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setRiskFilter(f)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold capitalize transition-all ${
                riskFilter === f 
                  ? 'bg-[#2E7D32] text-white shadow-xs' 
                  : 'bg-[#F7FAF4] text-[#607D8B] hover:text-[#263238] border border-[#E0E8DC]'
              }`}
            >
              {f === 'all' ? 'All Risks' : `${f} Risk`}
            </button>
          ))}
        </div>

      </GlassCard>

      {/* History Log List Table */}
      <div className="space-y-3">
        {loading ? (
          <GlassCard className="p-12 text-center space-y-3 bg-white border border-[#E0E8DC] rounded-3xl">
            <div className="w-8 h-8 mx-auto rounded-full border-3 border-[#2E7D32] border-t-transparent animate-spin" />
            <p className="text-xs font-bold text-[#607D8B]">Fetching documents from Firebase Firestore...</p>
          </GlassCard>
        ) : filteredList.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-3 bg-white border border-[#E0E8DC] rounded-3xl">
            <Database className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-extrabold text-[#263238]">No History Records Found</h3>
            <p className="text-xs text-[#607D8B] font-medium">Run a crop disease check on the "Check My Crop" page to log new predictions to Firebase!</p>
          </GlassCard>
        ) : (
          filteredList.map((item) => {
            const isHigh = item.riskLevel?.toLowerCase() === 'high';
            const isMod = item.riskLevel?.toLowerCase() === 'moderate';

            return (
              <GlassCard key={item.id} className="p-5 bg-white border border-[#E0E8DC] hover:border-[#2E7D32] shadow-sm rounded-3xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold text-[#607D8B] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#2E7D32]" /> {item.formattedDate}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                        🌾 {item.crop}
                      </span>
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                        isHigh ? 'bg-[#FFEBEE] text-[#E53935] border border-[#FFCDD2]' :
                        isMod ? 'bg-[#FFF8E1] text-[#F57C00] border border-[#FFE0B2]' :
                        'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                      }`}>
                        {item.riskLevel} Risk ({item.riskPercentage})
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#263238]">
                      {item.disease}
                    </h3>

                    <p className="text-xs text-[#607D8B] font-medium flex items-center gap-2">
                      <span>💡 <strong>Recommendation:</strong> {item.recommendation}</span>
                    </p>
                  </div>

                  {/* Right: Telemetry Snapshot & Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 lg:border-l border-[#E0E8DC] pt-3 lg:pt-0 lg:pl-4">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-[#607D8B]">
                      <div className="px-2.5 py-1 rounded-xl bg-[#F7FAF4] border border-[#E0E8DC]">
                        Temp: <span className="text-[#263238]">{item.temperature}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-[#F7FAF4] border border-[#E0E8DC]">
                        Humidity: <span className="text-[#263238]">{item.humidity}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-[#F7FAF4] border border-[#E0E8DC]">
                        Soil: <span className="text-[#263238]">{item.soilMoisture}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-[#F7FAF4] border border-[#E0E8DC]">
                        Rain: <span className="text-[#263238]">{item.rainfall}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete record from Firebase"
                      className="p-2.5 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] border border-[#FFCDD2] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </GlassCard>
            );
          })
        )}
      </div>

    </div>
  );
}

export default FirebaseHistoryPage;
