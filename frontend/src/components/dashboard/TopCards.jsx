import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  Waves, 
  Bell,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';

export function TopCards({ metrics }) {
  const cards = [
    {
      title: "Crop Health Score",
      value: `${metrics.healthScore}%`,
      subtitle: metrics.healthScoreStatus || "Optimal",
      change: "+2.4% vs last week",
      isPositive: true,
      icon: HeartPulse,
      color: "from-emerald-500 to-teal-600",
      badgeVariant: "safe"
    },
    {
      title: "Disease Risk Level",
      value: metrics.diseaseRisk || "Moderate Risk",
      subtitle: "Rice Blast Threat High",
      change: "Outbreak ETA: 48h",
      isPositive: false,
      icon: AlertTriangle,
      color: "from-amber-500 to-rose-600",
      badgeVariant: "moderate"
    },
    {
      title: "Ambient Temperature",
      value: `${metrics.temperature}°C`,
      subtitle: "Dew point: 21°C",
      change: "+1.2°C noon peak",
      isPositive: true,
      icon: Thermometer,
      color: "from-orange-500 to-amber-600",
      badgeVariant: "default"
    },
    {
      title: "Relative Humidity",
      value: `${metrics.humidity}%`,
      subtitle: "Overnight peak 91%",
      change: "+6% fungal threshold",
      isPositive: false,
      icon: Droplets,
      color: "from-cyan-500 to-blue-600",
      badgeVariant: "info"
    },
    {
      title: "Soil Moisture (Zone A)",
      value: `${metrics.soilMoisture}%`,
      subtitle: "Target range: 35-50%",
      change: "Stable irrigation",
      isPositive: true,
      icon: Waves,
      color: "from-emerald-600 to-cyan-600",
      badgeVariant: "safe"
    },
    {
      title: "Today's Alerts",
      value: `${metrics.todayAlertsCount}`,
      subtitle: "1 Critical • 2 Warnings",
      change: "Action required",
      isPositive: false,
      icon: Bell,
      color: "from-rose-500 to-red-600",
      badgeVariant: "high"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <GlassCard key={idx} className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="my-2">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {card.value}
              </h2>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-0.5">
                {card.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-2 text-[11px]">
              <span className={`font-semibold flex items-center gap-0.5 ${card.isPositive ? 'text-emerald-500' : 'text-rose-400'}`}>
                {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.change}
              </span>
              <Badge variant={card.badgeVariant} size="sm">
                Active
              </Badge>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
export default TopCards;
