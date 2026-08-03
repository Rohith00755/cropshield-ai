import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_USER } from '../utils/mockData';
import cropShieldApi from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cropshield_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('cropshield_token');
  });

  const [currentPage, setCurrentPage] = useState('app');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    const result = await cropShieldApi.login(email, password);
    if (result.success) {
      const userData = { ...DEFAULT_USER, ...result.user, email };
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentPage('app');
      localStorage.setItem('cropshield_user', JSON.stringify(userData));
    }
    setLoading(false);
    return result;
  };

  const loginWithGoogle = async (googleUser = null) => {
    setLoading(true);
    const defaultGoogleUser = {
      name: googleUser?.name || "Rohith",
      email: googleUser?.email || "rohith.farmer@gmail.com",
      avatarUrl: googleUser?.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      role: "Lead Farmer & Agri Specialist",
      farmName: "Sacramento Valley Precision Farms",
      provider: "Google OAuth 2.0"
    };

    const userData = { ...DEFAULT_USER, ...defaultGoogleUser };
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('app');
    localStorage.setItem('cropshield_user', JSON.stringify(userData));
    localStorage.setItem('cropshield_token', 'google_oauth2_jwt_token_2026');
    setLoading(false);
    return { success: true, user: userData };
  };

  const register = async (userData) => {
    setLoading(true);
    const result = await cropShieldApi.register(userData);
    if (result.success) {
      const newUser = { ...DEFAULT_USER, ...userData };
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentPage('app');
      localStorage.setItem('cropshield_user', JSON.stringify(newUser));
      localStorage.setItem('cropshield_token', 'mock_jwt_registered_token');
    }
    setLoading(false);
    return result;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
    localStorage.removeItem('cropshield_user');
    localStorage.removeItem('cropshield_token');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const newProfile = { ...prev, ...updatedFields };
      localStorage.setItem('cropshield_user', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      currentPage, 
      setCurrentPage, 
      loading, 
      login, 
      loginWithGoogle, 
      register, 
      logout, 
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
