import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  CloudSun, 
  Map, 
  Bot, 
  BarChart3, 
  User, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Radio, 
  Activity,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Flame,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ currentTab, setCurrentTab, isCollapsed, setIsCollapsed }) {
  const [showMore, setShowMore] = useState(false);
  const { logout } = useAuth();

  const mainNavItems = [
    { id: 'dashboard', label: 'Farm Overview', icon: LayoutDashboard },
    { id: 'predict', label: '🌾 Check My Crop', icon: Sprout },
    { id: 'weather', label: '🌦 Weather', icon: CloudSun },
    { id: 'map', label: '🗺 My Field', icon: Map },
    { id: 'ai-assistant', label: '🤖 Ask CropShield', icon: Bot },
    { id: 'analytics', label: '📊 Reports', icon: BarChart3 },
    { id: 'history', label: '📜 Firebase History', icon: Flame },
    { id: 'profile', label: '👤 Profile', icon: User },
    { id: 'settings', label: '⚙ Settings', icon: Settings },
  ];

  const moreNavItems = [
    { id: 'investor', label: 'Investor', icon: DollarSign },
    { id: 'hardware', label: 'Field Sensors', icon: Radio },
    { id: 'iot', label: 'System Metrics', icon: Activity },
  ];

  return (
    <aside className={`
      fixed top-0 left-0 z-40 h-screen bg-[#EEF5EA] border-r border-[#E0E8DC] transition-all duration-300 flex flex-col justify-between
      ${isCollapsed ? 'w-20' : 'w-64'} hidden lg:flex
    `}>
      <div className="p-5 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-[#2E7D32]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-base font-extrabold text-[#263238] tracking-tight">CropShield</h1>
                <span className="text-[11px] text-[#2E7D32] font-semibold block">Smart Farming Companion</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-xl bg-white border border-[#E0E8DC] text-[#607D8B] hover:text-[#2E7D32] shadow-sm"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Navigation Items */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'predict' && currentTab === 'dashboard');
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id === 'predict' ? 'dashboard' : item.id)}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all
                  ${isActive 
                    ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20' 
                    : 'text-[#607D8B] hover:text-[#2E7D32] hover:bg-[#E8F5E9]'
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* More Submenu */}
          {!isCollapsed && (
            <div className="pt-2">
              <button 
                onClick={() => setShowMore(!showMore)}
                className="w-full flex items-center justify-between px-3.5 py-1.5 text-[11px] font-extrabold text-[#607D8B] hover:text-[#263238] uppercase tracking-wider"
              >
                <span>MORE</span>
                {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showMore && (
                <div className="space-y-1 pl-2 pt-1 border-l-2 border-[#C8E6C9] ml-3">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentTab(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all
                          ${isActive 
                            ? 'bg-[#E8F5E9] text-[#2E7D32] font-bold' 
                            : 'text-[#607D8B] hover:text-[#2E7D32] hover:bg-[#E8F5E9]'
                          }
                        `}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Footer Sign Out Button */}
      <div className="p-4 border-t border-[#E0E8DC] space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] border border-[#FFCDD2] text-xs font-extrabold transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out / Logout</span>}
        </button>

        {!isCollapsed && (
          <div className="text-[11px] text-[#607D8B] font-medium pt-1">
            <p className="font-bold text-[#2E7D32]">🌾 CropShield</p>
            <p className="text-[#607D8B]">Firebase: Connected</p>
          </div>
        )}
      </div>
    </aside>
  );
}
export default Sidebar;
