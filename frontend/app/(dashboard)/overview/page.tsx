'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Zap, FileText, AlertTriangle, Activity } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_MEAL_ORDERS, MOCK_ALERTS } from '@/lib/mock-data';
import { staggerContainerVariants, slideUpVariants } from '@/lib/luxury-animations';

const KPI_DATA = [
  { label: 'Active Patients', value: 5, color: '#6B8E6F', bg: 'from-[#6B8E6F]/10 to-[#6B8E6F]/5' },
  { label: 'Active Orders',   value: 4, color: '#F59E0B', bg: 'from-[#F59E0B]/10 to-[#F59E0B]/5' },
  { label: 'Pending Approvals',value:3, color: '#E8B4A0', bg: 'from-[#E8B4A0]/30 to-[#E8B4A0]/10' },
  { label: 'Critical Alerts', value: 1, color: '#DC2626', bg: 'from-[#DC2626]/10 to-[#DC2626]/5' },
];

export default function OverviewPage() {
  const activePatient = MOCK_PATIENTS[0];
  const criticalAlerts = MOCK_ALERTS.filter((a) => a.type === 'critical');
  const preparingOrder = MOCK_MEAL_ORDERS.find((o) => o.status === 'preparing');

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div variants={slideUpVariants} className="space-y-4 pb-4 border-b border-white/20">
        <h1 className="text-4xl font-bold gradient-text-nurture">MedNutri Hub</h1>
        <p className="text-muted-foreground">
          Integrated patient care, nutrition management, and health supervision
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#6B8E6F]/10 text-[#6B8E6F] border border-[#6B8E6F]/25">
            System: Operational
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#20B2AA]/10 text-[#20B2AA] border border-[#20B2AA]/25 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#20B2AA] animate-pulse" />
            All Systems Nominal
          </span>
        </div>
      </motion.div>

      {/* ── KPI tiles ─────────────────────────────────────────────────── */}
      <motion.div variants={slideUpVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map(({ label, value, color, bg }, i) => (
          <motion.div
            key={label}
            className={`glass-silk rounded-2xl p-5 bg-gradient-to-br ${bg} border-white/30`}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <p className="text-3xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Three-column layout ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Col 1: The Patient */}
        <motion.div variants={slideUpVariants} className="space-y-4">
          <Card className="p-6 glass-silk rounded-2xl border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">Active Patient</h3>
              <Badge className="bg-[#6B8E6F] text-white text-xs">Live</Badge>
            </div>
            <div className="space-y-3">
              <p className="text-2xl font-bold text-foreground">{activePatient.name}</p>
              <p className="text-3xl font-bold text-[#6B8E6F]">Week {activePatient.pregnancyWeek}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                <Activity className="h-4 w-4 text-[#20B2AA]" />
                <span className="text-sm text-muted-foreground">Smartwatch Sync Active</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-[#20B2AA] animate-pulse" />
              </div>
            </div>
          </Card>

          <motion.button
            className="w-full h-12 rounded-2xl font-semibold text-white glow-pulse-sage flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #6B8E6F, #20B2AA)' }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="h-5 w-5" />
            Scan Medical Document
          </motion.button>

          <Card className="p-5 glass-silk rounded-2xl border-white/30">
            <h3 className="font-bold mb-3">Meal Plan</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-xl bg-[#6B8E6F]/8 border border-[#6B8E6F]/20">
                <p className="font-semibold text-[#6B8E6F]">High-Protein Focus</p>
                <p className="text-xs text-muted-foreground mt-1">Week {activePatient.pregnancyWeek} optimized</p>
              </div>
              <div className="p-3 rounded-xl bg-[#20B2AA]/8 border border-[#20B2AA]/20">
                <p className="font-semibold text-[#20B2AA]">2,400 kcal/day</p>
                <p className="text-xs text-muted-foreground mt-1">Protein 90g · Carbs 300g · Fat 70g</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Col 2: The Kitchen */}
        <motion.div variants={slideUpVariants} className="space-y-4">
          {/* Video window */}
          <Card className="overflow-hidden rounded-2xl border-0 shadow-lg">
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg,#6B8E6F,#20B2AA)' }}
                  animate={{ boxShadow: ['0 0 0 0 rgba(32,178,170,0.5)', '0 0 0 12px rgba(32,178,170,0)', '0 0 0 0 rgba(32,178,170,0.5)'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </motion.div>
                <p className="text-white/80 text-sm font-medium">Cooking Tutorial</p>
              </motion.div>
              <Badge className="absolute top-3 left-3 bg-[#DC2626] text-white text-xs gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </Badge>
            </div>
          </Card>

          <Card className="p-5 glass-silk rounded-2xl border-white/30">
            <h3 className="font-bold mb-3">Recipe Guide</h3>
            <p className="font-semibold text-foreground mb-2">{preparingOrder?.mealType ?? 'High-Protein Mix'}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {['1x (300g)', '10x (3kg)', '50x (15kg)'].map((s) => (
                <Badge key={s} variant="outline" className="bg-white/60 text-xs">{s}</Badge>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-[#20B2AA]/8 border border-[#20B2AA]/20">
              <p className="text-xs font-semibold text-[#20B2AA]">Green Valley Farms</p>
              <p className="text-xs text-muted-foreground mt-0.5">Fair Trade · Steady Income Verified</p>
            </div>
          </Card>
        </motion.div>

        {/* Col 3: The Guardian */}
        <motion.div variants={slideUpVariants} className="space-y-4">
          <Card className="p-5 glass-silk rounded-2xl border-white/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Alert Panel</h3>
              {criticalAlerts.length > 0 && (
                <Badge className="bg-[#DC2626] text-white text-xs gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {criticalAlerts.length}
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              {criticalAlerts.length > 0 ? criticalAlerts.slice(0, 3).map((a, i) => (
                <motion.div
                  key={i}
                  className="p-3 rounded-xl bg-[#DC2626]/6 border border-[#DC2626]/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-xs font-bold text-[#DC2626]">Critical Alert</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>
                </motion.div>
              )) : (
                <div className="p-4 text-center rounded-xl bg-[#20B2AA]/8 border border-[#20B2AA]/20">
                  <p className="text-sm font-semibold text-[#20B2AA]">No Critical Alerts</p>
                </div>
              )}
            </div>
          </Card>

          <motion.button
            className="w-full h-12 rounded-2xl font-semibold text-white glow-pulse-teal flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #20B2AA, #6B8E6F)' }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-5 w-5" />
            Approve Meal Plan
          </motion.button>

          {/* 7-day sparkbars */}
          <Card className="p-5 glass-silk rounded-2xl border-white/30 space-y-4">
            <h3 className="font-bold">7-Day Vitals</h3>
            {[
              { label: 'Blood Glucose (mmol/L)', data: [4.2,5.1,4.8,5.3,4.9,5.2,5.0], color: '#6B8E6F' },
              { label: 'SpO₂ (%)',                data: [98,97.5,98.2,97.8,98.1,97.9,98.0], color: '#20B2AA' },
            ].map(({ label, data, color }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
                <div className="h-10 flex items-end gap-0.5">
                  {data.map((v, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{ background: color, opacity: 0.75 + i * 0.03 }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / Math.max(...data)) * 100}%` }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
