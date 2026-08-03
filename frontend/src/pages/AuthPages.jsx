import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, ArrowRight, CheckCircle2, KeyRound, Sprout, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useAuth } from '../context/AuthContext';
import GoogleAccountSelectorModal from '../components/common/GoogleAccountSelectorModal';

export function AuthPages({ initialMode = 'login', onSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const { login, loginWithGoogle, register, loading } = useAuth();
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const [email, setEmail] = useState('richropo240@gmail.com');
  const [password, setPassword] = useState('cropshield2026');
  const [name, setName] = useState('Rich Ropo');
  const [farmName, setFarmName] = useState('Sacramento Valley Farms');
  const [message, setMessage] = useState('');

  const handleGoogleSignInClick = () => {
    setMessage('');
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = async (selectedGoogleUser) => {
    setMessage('');
    const res = await loginWithGoogle(selectedGoogleUser);
    if (res.success) {
      onSuccess();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        onSuccess();
      }
    } else if (mode === 'register') {
      const res = await register({ name, email, password, farmName });
      if (res.success) {
        onSuccess();
      }
    } else if (mode === 'forgot') {
      setMessage('Password reset instructions have been sent to your email.');
    }
  };

  return (
    <div className="min-h-screen crop-field-bg flex items-center justify-center p-4 relative font-sans text-[#263238]">
      
      {/* Floating Ambient Orbs */}
      <div className="crop-orb-1" />
      <div className="crop-orb-2" />

      <GlassCard className="w-full max-w-md p-8 relative z-10 space-y-6 bg-white border border-[#E5E7EB] shadow-lg rounded-3xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] mx-auto shadow-sm border border-[#E5E7EB]">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#263238] tracking-tight flex items-center justify-center gap-2">
            🌾 CropShield
          </h2>
          <p className="text-xs text-[#607D8B] font-semibold">
            {mode === 'login' 
              ? 'Welcome back! Sign in with your Google account' 
              : mode === 'register' 
              ? 'Create your professional precision farming account' 
              : 'Recover your account password'}
          </p>
        </div>

        {/* Google One-Click Login Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignInClick}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-[#F7FAF4] text-[#263238] font-extrabold text-xs flex items-center justify-center gap-3 border border-[#E5E7EB] shadow-sm hover:shadow transition-all"
          >
            {/* Official Google G Logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Divider Line */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
            <span className="flex-shrink mx-3 text-[11px] font-bold text-[#607D8B] uppercase">Or use email</span>
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-[#F7FAF4] p-1.5 border border-[#E5E7EB] text-xs">
          <button 
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${mode === 'login' ? 'bg-[#2E7D32] text-white shadow-sm' : 'text-[#607D8B] hover:text-[#263238]'}`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${mode === 'register' ? 'bg-[#2E7D32] text-white shadow-sm' : 'text-[#607D8B] hover:text-[#263238]'}`}
          >
            Register
          </button>
        </div>

        {message && (
          <div className="p-3 rounded-2xl bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32] text-xs text-center font-extrabold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="block font-extrabold text-[#263238] mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    placeholder="Rich Ropo"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-[#263238] mb-1.5">Farm Operation Name</label>
                <input 
                  type="text" 
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="Sacramento Valley Farms"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-extrabold text-[#263238] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
                placeholder="richropo240@gmail.com"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-extrabold text-[#263238]">Password</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-bold text-[#2E7D32] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7FAF4] border border-[#E5E7EB] text-[#263238] font-medium outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In to Farm Dashboard' : mode === 'register' ? 'Create Farm Account' : 'Send Reset Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </GlassCard>

      {/* Google Account Selector Modal */}
      <GoogleAccountSelectorModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={handleSelectGoogleAccount}
      />

    </div>
  );
}

export default AuthPages;
