import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Check, ArrowRight, Shield } from 'lucide-react';

export function GoogleAccountSelectorModal({ isOpen, onClose, onSelectAccount }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const googleAccounts = [
    {
      id: 'acc-user',
      name: 'Rich Ropo',
      email: 'richropo240@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'Lead Farmer & Agri Specialist',
      farmName: 'Sacramento Valley Farms'
    },
    {
      id: 'acc-1',
      name: 'Rohith',
      email: 'rohith.farmer@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      role: 'AgriTech Specialist',
      farmName: 'Sacramento Valley Farms'
    },
    {
      id: 'acc-2',
      name: 'Alexander Vance',
      email: 'a.vance@greenacres.ag',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      role: 'Lead AgriTech Specialist',
      farmName: 'GreenAcres Precision Farms'
    }
  ];

  const handleAccountClick = (acc) => {
    setSelectedAccount(acc.email);
    setIsSigningIn(true);
    setTimeout(() => {
      onSelectAccount(acc);
      setIsSigningIn(false);
      onClose();
    }, 800);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    const customUser = {
      name: customName || customEmail.split('@')[0],
      email: customEmail,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'Agri Specialist',
      farmName: 'Custom Farm Operation'
    };

    setIsSigningIn(true);
    setTimeout(() => {
      onSelectAccount(customUser);
      setIsSigningIn(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 text-gray-800 relative font-sans"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Header Logo */}
            <div className="text-center space-y-2 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Choose Google Account</h3>
              <p className="text-xs text-gray-500 font-medium">Select your account to continue to <strong>CropShield</strong></p>
            </div>

            {/* Account List */}
            {isSigningIn ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full border-3 border-blue-500 border-t-transparent animate-spin" />
                <p className="text-xs font-bold text-gray-700">Signing in as {selectedAccount}...</p>
              </div>
            ) : (
              <div className="py-4 space-y-2">
                {googleAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleAccountClick(acc)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all text-left border border-gray-100 hover:border-blue-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={acc.avatarUrl} 
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" 
                      />
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {acc.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium">{acc.email}</p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Custom Email Toggle */}
                {!showCustomInput ? (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all text-left text-xs font-bold text-gray-600 hover:text-blue-600"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span>Enter your custom Google email</span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="pt-2 space-y-3 border-t border-gray-100">
                    <input
                      type="email"
                      required
                      placeholder="richropo240@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Sign In with {customEmail || 'Google Email'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Footer Disclaimer */}
            <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 text-center font-medium">
              Google will share your name, email address, and profile picture with CropShield.
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
export default GoogleAccountSelectorModal;
