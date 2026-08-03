import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ShieldAlert, 
  CloudRain, 
  CheckCircle2, 
  Trash2, 
  CheckCheck,
  Filter
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { useNotifications } from '../context/NotificationContext';

export function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = notifications.filter(n => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <GlassCard className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Centralized Notification Center</h2>
            <p className="text-xs text-gray-400">Prioritized disease threats, micro-climate warnings, and spray recommendations</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-700"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark All Read</span>
          </button>
        </div>
      </GlassCard>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button 
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            filterCategory === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          All Alerts ({notifications.length})
        </button>
        <button 
          onClick={() => setFilterCategory('disease')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            filterCategory === 'disease' ? 'bg-rose-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          Disease Threats
        </button>
        <button 
          onClick={() => setFilterCategory('weather')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            filterCategory === 'weather' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          Weather Alerts
        </button>
        <button 
          onClick={() => setFilterCategory('recommendation')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            filterCategory === 'recommendation' ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          Recommendations
        </button>
      </div>

      {/* Notifications List */}
      <GlassCard className="p-6 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            No notifications found in this category.
          </div>
        ) : (
          filtered.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                notif.read 
                  ? 'bg-gray-900/40 border-gray-800/80 text-gray-400' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-white font-medium shadow-md'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={notif.type === 'critical' ? 'high' : notif.type === 'warning' ? 'moderate' : 'info'}>
                    {notif.category}
                  </Badge>
                  <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-gray-400 block font-mono">{notif.timestamp} • Target: {notif.crop}</span>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notif.id);
                }}
                className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete Alert"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </GlassCard>

    </div>
  );
}
export default NotificationsPage;
