import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import JudgeModeController from './components/common/JudgeModeController';
import DashboardPage from './pages/DashboardPage';
import DiseaseAnalyticsPage from './pages/DiseaseAnalyticsPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import AIAssistantPage from './pages/AIAssistantPage';
import HardwarePage from './pages/HardwarePage';
import InvestorPitchPage from './pages/InvestorPitchPage';
import FarmerProfilePage from './pages/FarmerProfilePage';
import SettingsPage from './pages/SettingsPage';
import WeatherPage from './pages/WeatherPage';
import NotificationsPage from './pages/NotificationsPage';
import IoTMonitoringPage from './pages/IoTMonitoringPage';
import FirebaseHistoryPage from './pages/FirebaseHistoryPage';
import LandingPage from './pages/LandingPage';
import { AuthPages } from './pages/AuthPages';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

function MainAppContent() {
  const { isAuthenticated, currentPage, setCurrentPage } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // UX Mode States
  const [isJudgeMode, setIsJudgeMode] = useState(false);
  const [isFarmerMode, setIsFarmerMode] = useState(true);

  // Unauthenticated or Login Page State
  if (!isAuthenticated || currentPage === 'login') {
    return <AuthPages initialMode="login" onSuccess={() => setCurrentPage('app')} />;
  }

  // Public Unauthenticated Pages
  if (currentPage === 'landing') return <LandingPage onNavigate={setCurrentPage} />;
  if (currentPage === 'register') return <AuthPages initialMode="register" onSuccess={() => setCurrentPage('app')} />;
  if (currentPage === 'forgot-password') return <AuthPages initialMode="forgot" onSuccess={() => setCurrentPage('login')} />;

  // Render tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage onNavigateTab={setCurrentTab} isFarmerMode={isFarmerMode} />;
      case 'analytics':
        return <DiseaseAnalyticsPage />;
      case 'history':
        return <FirebaseHistoryPage />;
      case 'map':
        return <InteractiveMapPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'hardware':
        return <HardwarePage />;
      case 'investor':
        return <InvestorPitchPage />;
      case 'profile':
        return <FarmerProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'weather':
        return <WeatherPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'iot':
        return <IoTMonitoringPage />;
      default:
        return <DashboardPage onNavigateTab={setCurrentTab} isFarmerMode={isFarmerMode} />;
    }
  };

  return (
    <div className="min-h-screen crop-field-bg text-[#263238] font-sans selection:bg-[#2E7D32] selection:text-white relative">
      
      {/* Floating Ambient Crop Field Orbs */}
      <div className="crop-orb-1" />
      <div className="crop-orb-2" />

      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Top Navbar */}
      <Navbar 
        isCollapsed={isCollapsed} 
        setIsMobileOpen={setIsMobileOpen} 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        isJudgeMode={isJudgeMode}
        setIsJudgeMode={setIsJudgeMode}
        isFarmerMode={isFarmerMode}
        setIsFarmerMode={setIsFarmerMode}
      />

      {/* Judge Mode Automated Controller */}
      <JudgeModeController 
        isJudgeMode={isJudgeMode} 
        setIsJudgeMode={setIsJudgeMode} 
        setCurrentTab={setCurrentTab} 
      />

      {/* Main Page Area */}
      <main className={`
        pt-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 relative z-10
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
      `}>
        {renderTabContent()}
      </main>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <MainAppContent />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
