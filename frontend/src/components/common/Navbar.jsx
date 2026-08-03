import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Menu, 
  Globe, 
  Award,
  Mic,
  Tractor,
  X,
  Sprout,
  LogOut
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import VoiceAssistantModal from './VoiceAssistantModal';

export function Navbar({ 
  isCollapsed, 
  setIsMobileOpen, 
  currentTab, 
  setCurrentTab, 
  isJudgeMode, 
  setIsJudgeMode,
  isFarmerMode,
  setIsFarmerMode
}) {
  const { isDark, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { user, logout } = useAuth();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchTargets = [
    { title: 'Rice Blast Disease Alert', tab: 'dashboard', category: 'Alerts' },
    { title: 'Field Sensors & Hardware', tab: 'hardware', category: 'Sensors' },
    { title: 'Investor Pitch & Business Plan', tab: 'investor', category: 'Deck' },
    { title: 'Weather Forecast & Spraying Window', tab: 'weather', category: 'Weather' },
    { title: 'Main Reasons (AI Detection)', tab: 'dashboard', category: 'Analysis' },
    { title: 'Field Map Sector Overview', tab: 'map', category: 'Maps' },
    { title: 'Ask AI Assistant', tab: 'ai-assistant', category: 'AI' }
  ];

  const filteredSearch = quickSearchTargets.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className={`
        fixed top-0 right-0 z-30 h-16 bg-white border-b border-[#E5E7EB] transition-all duration-300 shadow-sm
        ${isCollapsed ? 'lg:left-20' : 'lg:left-64'} left-0
      `}>
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-[#E8F5E9]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32]">
                <Globe className="w-3.5 h-3.5" />
                <span>{user?.location || 'Sacramento Valley, CA'}</span>
                <span className="text-gray-300">•</span>
                <span className="font-semibold text-gray-500">{user?.farmSizeAcres || 450} Acres</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#1F2937] capitalize">
                {currentTab === 'dashboard' ? 'Farm Overview' : currentTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-xs text-gray-500 hover:border-[#2E7D32]/40 transition-all"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#2E7D32]" />
                <span>Search crops, field sensors, weather...</span>
              </span>
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white rounded text-gray-500 border border-gray-200 shadow-sm">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Farmer View Toggle Switch */}
            <button
              onClick={() => setIsFarmerMode(!isFarmerMode)}
              title={isFarmerMode ? "Farmer View: Simple friendly mode" : "Expert View: Advanced technical mode"}
              className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                isFarmerMode 
                  ? 'bg-[#2E7D32] text-white' 
                  : 'bg-[#F4F8F1] text-gray-700 border border-[#E5E7EB]'
              }`}
            >
              <Tractor className="w-4 h-4 text-amber-300" />
              <span>Farmer View: <strong>{isFarmerMode ? 'ON' : 'OFF'}</strong></span>
            </button>

            {/* Field Sensor Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping inline-block" />
              <span>Field Sensor: <strong>Connected</strong></span>
            </div>

            {/* Voice Assistant Microphone Button */}
            <button
              onClick={() => setShowVoiceModal(true)}
              title="Open Voice Assistant 🎤"
              className="p-2.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-md shadow-[#2E7D32]/20 flex items-center justify-center transition-transform hover:scale-105"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Demo Mode Toggle Switch */}
            <button
              onClick={() => setIsJudgeMode(!isJudgeMode)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                isJudgeMode 
                  ? 'bg-[#F9A825] text-gray-900 animate-pulse' 
                  : 'bg-[#F4F8F1] hover:bg-[#E8F5E9] text-gray-700 border border-[#E5E7EB]'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Demo Mode: <strong>{isJudgeMode ? 'ON' : 'OFF'}</strong></span>
            </button>

            {/* Profile Avatar */}
            <div 
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 cursor-pointer pl-2 border-l border-gray-200"
              title="View Profile"
            >
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#2E7D32]/30 hover:ring-[#2E7D32] transition-all"
              />
            </div>

            {/* Explicit Logout Button */}
            <button
              onClick={logout}
              title="Sign Out / Logout"
              className="p-2.5 rounded-2xl bg-[#FFEBEE] hover:bg-[#FFCDD2] text-[#E53935] border border-[#FFCDD2] transition-colors flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal 
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />
    </>
  );
}
export default Navbar;
