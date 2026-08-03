import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Sprout, 
  Layers, 
  Save, 
  CheckCircle2, 
  Calendar, 
  Cpu, 
  Globe,
  Sliders,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export function FarmerProfilePage() {
  const { user, updateUserProfile, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Rohith',
    farmName: user?.farmName || 'Sacramento Valley Farms',
    email: user?.email || 'rohith@cropshield.ag',
    location: user?.location || 'Sacramento Valley, CA',
    farmSizeAcres: user?.farmSizeAcres || 450,
    soilType: user?.soilType || 'Clay Loam (pH 6.8)',
    irrigationType: user?.irrigationType || 'Precision Drip & Center Pivot'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const cropHistory = [
    { year: "2025 - 2026", crop: "Calrose Rice", yield: "8.4 Tons/Hectare", healthScore: "96%", status: "Harvest Completed", diseaseIncidents: 1 },
    { year: "2024 - 2025", crop: "Roma Tomato", yield: "42.1 Tons/Acre", healthScore: "91%", status: "Completed", diseaseIncidents: 2 },
    { year: "2024 - 2024", crop: "Winter Wheat", yield: "5.2 Tons/Acre", healthScore: "98%", status: "Completed", diseaseIncidents: 0 },
    { year: "2023 - 2024", crop: "Sweet Corn", yield: "11.0 Tons/Acre", healthScore: "89%", status: "Completed", diseaseIncidents: 3 }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <GlassCard className="p-6 relative overflow-hidden bg-white border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <img 
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} 
            alt={user?.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-[#2E7D32]/30 shadow-md"
          />

          <div className="space-y-1 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-[#263238]">{user?.name}</h2>
              <Badge variant="safe">Verified AgriTech Specialist</Badge>
            </div>
            <p className="text-sm text-[#2E7D32] font-bold">{user?.farmName}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#607D8B] pt-1 font-semibold">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#2E7D32]" /> {user?.location}</span>
              <span className="flex items-center gap-1"><Sprout className="w-3.5 h-3.5 text-[#2E7D32]" /> {user?.farmSizeAcres} Acres</span>
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-[#2E7D32]" /> 12 Active Sensors</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button 
              onClick={logout}
              className="px-5 py-2.5 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] border border-[#FFCDD2] font-extrabold text-xs flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {savedSuccess && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile and farm configurations saved successfully!</span>
        </motion.div>
      )}

      {/* Grid: Edit Profile + Farm Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Inputs (2 Cols) */}
        <GlassCard className="lg:col-span-2 p-6 space-y-4 bg-white border border-[#E5E7EB] shadow-sm">
          <h3 className="text-base font-extrabold text-[#263238] border-b border-[#E5E7EB] pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#2E7D32]" />
            <span>Farmer & Operation Details</span>
          </h3>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#263238] mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#263238] mb-1">Farm Operation Name</label>
              <input 
                type="text" 
                value={formData.farmName}
                onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#263238] mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#263238] mb-1">Geographic Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#263238] mb-1">Farm Size (Acres)</label>
              <input 
                type="number" 
                value={formData.farmSizeAcres}
                onChange={(e) => setFormData({...formData, farmSizeAcres: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#263238] mb-1">Soil Type Classification</label>
              <input 
                type="text" 
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </form>
        </GlassCard>

        {/* Security & Account Card */}
        <GlassCard className="p-6 space-y-4 bg-white border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#263238] border-b border-[#E5E7EB] pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
              <span>Account & Security</span>
            </h3>

            <div className="space-y-3 pt-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] flex items-center justify-between">
                <span className="font-bold text-[#263238]">Authentication Provider</span>
                <span className="font-extrabold text-[#2E7D32]">Google / JWT</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] flex items-center justify-between">
                <span className="font-bold text-[#263238]">Role Designation</span>
                <span className="font-extrabold text-[#263238]">Lead Farmer</span>
              </div>
            </div>
          </div>

          {/* Sign Out CTA Button */}
          <div className="pt-4 border-t border-[#E5E7EB]">
            <button 
              onClick={logout}
              className="w-full py-3 px-4 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] font-extrabold text-xs flex items-center justify-center gap-2 border border-[#FFCDD2] transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of CropShield</span>
            </button>
          </div>
        </GlassCard>

      </div>

    </div>
  );
}

export default FarmerProfilePage;
