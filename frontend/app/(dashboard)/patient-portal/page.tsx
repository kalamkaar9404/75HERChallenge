'use client';

import { motion } from 'framer-motion';
import { Leaf, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';
import { VitalsOverview } from '@/components/patient-portal/vitals-overview';
import { AIMealPlan } from '@/components/patient-portal/ai-meal-plan';
const NutritionistChat = dynamic(
  () => import('@/components/patient-portal/nutritionist-chat').then(m => ({ default: m.NutritionistChat })),
  { ssr: false }
);
import { NutritionDonut } from '@/components/patient-portal/nutrition-donut';
import {
  MOCK_PATIENTS,
  MOCK_VITALS,
  MOCK_AI_MEAL_PLAN,
  MOCK_NUTRITIONIST_MESSAGES,
} from '@/lib/mock-data';
import { staggerContainerVariants, slideUpVariants } from '@/lib/luxury-animations';

export default function PatientPortalPage() {
  const patient = MOCK_PATIENTS[0];

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div variants={slideUpVariants} className="space-y-4 pb-4 border-b border-white/20">
        <h1 className="text-4xl font-bold gradient-text-nurture">Patient Portal</h1>
        <p className="text-muted-foreground">
          Welcome, <span className="font-semibold text-[#6B8E6F]">{patient.name}</span>
          {' '}· Week {patient.pregnancyWeek} of pregnancy
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#6B8E6F]/10 text-[#6B8E6F] border border-[#6B8E6F]/25">
            Health Status: Excellent
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#20B2AA]/10 text-[#20B2AA] border border-[#20B2AA]/25 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#20B2AA] animate-pulse" />
            Real-time Monitoring Active
          </span>
        </div>
      </motion.div>

      {/* ── Themed Hero: Farm-to-Table ────────────────────────────────── */}
      <motion.div variants={slideUpVariants}>
        <div className="relative w-full h-52 md:h-64 rounded-3xl overflow-hidden glass-silk">
          {/* Layered gradient simulating fresh organic produce */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B8E6F]/30 via-[#9CAF88]/20 to-[#E8B4A0]/25" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(107,142,111,0.35) 0%, transparent 50%),
                radial-gradient(circle at 80% 30%, rgba(32,178,170,0.25) 0%, transparent 45%),
                radial-gradient(circle at 60% 80%, rgba(232,180,160,0.30) 0%, transparent 40%)
              `,
            }}
          />

          {/* Decorative leaf dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#6B8E6F]/15"
              style={{
                width: `${40 + i * 18}px`,
                height: `${40 + i * 18}px`,
                left: `${8 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}

          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-[#6B8E6F]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B8E6F] bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  Farm-to-Table Nutrition
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                Your Personalized Health Journey
              </h2>
              <p className="text-sm text-slate-600/90 max-w-lg">
                Organic, locally sourced meal plans crafted for maternal wellness — from soil to your table.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 3-Column Grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        <motion.div variants={slideUpVariants} className="lg:col-span-1">
          <VitalsOverview vitals={MOCK_VITALS} pregnancyWeek={patient.pregnancyWeek} />
        </motion.div>

        <motion.div variants={slideUpVariants} className="lg:col-span-1 space-y-6">
          <AIMealPlan
            meals={MOCK_AI_MEAL_PLAN.meals}
            totalCalories={MOCK_AI_MEAL_PLAN.totalCalories}
            status={MOCK_AI_MEAL_PLAN.status as 'approved' | 'pending'}
          />
          <NutritionDonut carbs={280} protein={85} fats={65} fiber={35} />
        </motion.div>

        <motion.div variants={slideUpVariants} className="lg:col-span-1">
          <NutritionistChat initialMessages={MOCK_NUTRITIONIST_MESSAGES} />
        </motion.div>
      </div>
    </motion.div>
  );
}
