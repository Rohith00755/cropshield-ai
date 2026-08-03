import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Target, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Users,
  Zap,
  Sparkles
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { INVESTOR_PITCH_DATA, FUTURE_ROADMAP } from '../utils/mockData';

export function InvestorPitchPage() {
  const pitch = INVESTOR_PITCH_DATA;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Pitch Deck Header Banner */}
      <GlassCard className="p-8 bg-gradient-to-r from-emerald-950/60 via-gray-900 to-gray-900 border-emerald-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Investor Deck • Seed Round Presentation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {pitch.headline}
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {pitch.solution}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/90 border border-emerald-500/30 text-center space-y-1">
            <span className="text-xs text-gray-400 font-semibold uppercase">Target Seed Round</span>
            <span className="block text-3xl font-black text-emerald-400 font-mono">{pitch.ask}</span>
            <span className="text-[10px] text-gray-400">SAFE Note • 20% Discount</span>
          </div>
        </div>
      </GlassCard>

      {/* Grid 1: Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Problem Card */}
        <GlassCard className="p-6 space-y-4 border-rose-500/30 bg-rose-950/10">
          <div className="flex items-center gap-2 border-b border-rose-500/20 pb-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-extrabold text-white">The $220B Agricultural Problem</h3>
          </div>

          <ul className="space-y-3 text-xs text-gray-300">
            {pitch.problem.map((prob, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span>{prob}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Solution & Advantage */}
        <GlassCard className="p-6 space-y-4 border-emerald-500/30 bg-emerald-950/10">
          <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-extrabold text-white">Unfair Competitive Advantages</h3>
          </div>

          <ul className="space-y-3 text-xs text-gray-300">
            {pitch.competitiveAdvantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-white">{adv}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

      </div>

      {/* Grid 2: Market Size (TAM / SAM / SOM) */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Market Opportunity & Addressable Size</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-1">
            <span className="text-xs text-gray-400 uppercase font-bold">TAM (Total Addressable)</span>
            <span className="block text-3xl font-black text-white font-mono">{pitch.marketSize.tam.split(' ')[0]}</span>
            <span className="text-[11px] text-gray-400">Global Smart Agtech Market</span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-1">
            <span className="text-xs text-gray-400 uppercase font-bold">SAM (Serviceable)</span>
            <span className="block text-3xl font-black text-emerald-400 font-mono">{pitch.marketSize.sam.split(' ')[0]}</span>
            <span className="text-[11px] text-gray-400">Precision Crop Protection SaaS</span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-1">
            <span className="text-xs text-gray-400 uppercase font-bold">SOM (Serviceable Obtainable)</span>
            <span className="block text-3xl font-black text-cyan-400 font-mono">{pitch.marketSize.som.split(' ')[0]}</span>
            <span className="text-[11px] text-gray-400">Initial NA & South Asia Specialty Farmers</span>
          </div>
        </div>
      </GlassCard>

      {/* Grid 3: Business Model & Monetization */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Business Model & Recurring Revenue Tiers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pitch.businessModel.map((b, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">{b.tier}</span>
                <span className="text-2xl font-black text-white font-mono block my-1">{b.price}</span>
                <p className="text-xs text-gray-400">{b.desc}</p>
              </div>
              <Badge variant="safe" size="sm">Active Revenue Stream</Badge>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Grid 4: Future Scalability Roadmap */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Future Scalability & Technology Expansion Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUTURE_ROADMAP.map((road, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">{road.quarter}</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono">{road.status}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{road.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{road.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
}
export default InvestorPitchPage;
