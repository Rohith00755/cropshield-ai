import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';
import { useNotifications } from '../../context/NotificationContext';

export function LiveAlertsSection({ onNavigateToAlerts }) {
  const { notifications, markAsRead } = useNotifications();

  return (
    <GlassCard className="p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Real-time Field Alerts
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Live anomaly notifications from AI sensor network
            </p>
          </div>
        </div>

        <button 
          onClick={onNavigateToAlerts}
          className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {notifications.slice(0, 3).map((notif) => {
          const isCritical = notif.type === 'critical';
          const isWarning = notif.type === 'warning';

          return (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isCritical 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' 
                  : isWarning 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 text-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  {isCritical ? (
                    <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 animate-bounce" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  )}
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{notif.title}</span>
                </div>
                <Badge variant={isCritical ? 'high' : isWarning ? 'moderate' : 'info'} size="sm">
                  {notif.crop}
                </Badge>
              </div>

              <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                {notif.message}
              </p>

              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 pl-6">
                <span>{notif.timestamp}</span>
                <span className="text-emerald-400 font-semibold hover:underline">
                  Take Action →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
export default LiveAlertsSection;
