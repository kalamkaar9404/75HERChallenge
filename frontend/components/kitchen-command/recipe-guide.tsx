'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Meal } from '@/lib/mock-data';
import { Play, Clock, Flame } from 'lucide-react';

interface RecipeGuideProps {
  meal?: Meal;
}

export function RecipeGuide({ meal }: RecipeGuideProps) {
  if (!meal) {
    return (
      <Card className="p-6 h-full bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-lg font-medium">Select an order to view recipe</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Placeholder */}
      <div className="relative w-full aspect-video bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-white/20">
        {/* Live Indicator */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-lg rounded-lg border border-white/20">
          <div className="h-2 w-2 rounded-full bg-[#DC2626] animate-pulse" />
          <span className="text-xs font-semibold text-foreground">LIVE</span>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/20 to-black/40">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#6B8E6F] to-[#20B2AA] flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <p className="text-sm text-white font-medium">
              Click to watch cooking video
            </p>
          </div>
        </div>

        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center justify-between group-hover:opacity-100 opacity-0 transition-opacity">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#DC2626] rounded-full" />
            <span className="text-xs text-muted-foreground">Professional Preparation Guide</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">8:45</span>
        </div>
      </div>

      {/* Recipe Details */}
      <Card className="p-6 bg-gradient-to-br from-white via-slate-50 to-amber-50 border border-white/20 shadow-lg rounded-2xl overflow-hidden relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#F59E0B]/5 rounded-full -ml-20 -mt-20" />
        
        <div className="relative z-10">
          <div className="mb-6">
            <h3 className="font-bold text-2xl mb-3 bg-gradient-to-r from-[#F59E0B] to-[#6B8E6F] bg-clip-text text-transparent">
              {meal.name}
            </h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-white/70 backdrop-blur-lg border border-white/20 px-3 py-1 gap-2">
              <Clock className="h-4 w-4" />
              30 min
            </Badge>
            <Badge variant="secondary" className="bg-white/70 backdrop-blur-lg border border-white/20 px-3 py-1 gap-2">
              <Flame className="h-4 w-4 text-[#F59E0B]" />
              {meal.calories} cal
            </Badge>
            <Badge variant="secondary" className="bg-white/70 backdrop-blur-lg border border-white/20 px-3 py-1">
              {meal.servingSize}
            </Badge>
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Ingredients</h4>
          <ul className="space-y-2">
            {meal.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#6B8E6F] to-[#20B2AA]" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Batch Scaling */}
        <div className="p-5 bg-gradient-to-r from-[#F59E0B]/10 to-[#6B8E6F]/10 rounded-lg border border-[#F59E0B]/30 hover:border-[#F59E0B]/50 transition-all">
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Batch Scaling Options</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-white/40 rounded border border-[#F59E0B]/20 hover:bg-white/60 transition-colors">
              <span className="text-foreground">Single portion</span>
              <span className="font-bold text-[#6B8E6F]">{meal.servingSize}g</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 rounded border border-[#20B2AA]/20 hover:bg-white/60 transition-colors">
              <span className="text-foreground">Batch (5x)</span>
              <span className="font-bold text-[#20B2AA]">{parseInt(meal.servingSize) * 5}g</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/40 rounded border border-[#F59E0B]/20 hover:bg-white/60 transition-colors">
              <span className="text-foreground">Batch (10x)</span>
              <span className="font-bold text-[#F59E0B]">{parseInt(meal.servingSize) * 10}g</span>
            </div>
            <p className="text-xs mt-3 pt-3 border-t border-[#6B8E6F]/20 text-muted-foreground">
              ⏱️ Increase cooking time by 10-15% for larger batches
            </p>
          </div>
        </div>
        </div>
      </Card>
    </div>
  );
}
