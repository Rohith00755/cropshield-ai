import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', hoverEffect = true, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        bg-white/95 backdrop-blur-md rounded-3xl border border-[#E0E8DC] 
        shadow-[0_4px_20px_-4px_rgba(46,125,50,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)]
        transition-all duration-300 relative overflow-hidden
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-[0_12px_30px_-6px_rgba(46,125,50,0.12)] hover:border-[#81C784]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
export default GlassCard;
