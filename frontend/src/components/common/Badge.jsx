import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const base = "inline-flex items-center font-medium rounded-full transition-colors duration-200";
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };

  const variants = {
    safe: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    moderate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    high: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    critical: "bg-red-600 text-white font-semibold animate-pulse shadow-sm shadow-red-500/30",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
export default Badge;
