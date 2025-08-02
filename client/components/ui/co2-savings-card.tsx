import React from 'react';
import { Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface CO2SavingsProps {
  totalSavings: number; // in kg
  publicTransitEmissions: number; // in kg
  carEmissions: number; // in kg
  reductionPercentage: number;
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toFixed(1);
};

const formatCO2 = (kg: number): string => {
  if (kg < 1000) {
    return `${kg.toFixed(1)} kg`;
  }
  return `${(kg / 1000).toFixed(1)} tons`;
};

export const CO2SavingsCard: React.FC<CO2SavingsCardProps> = ({
  totalSavings,
  comparisonData,
}) => {
  const percentageReduction =
    ((comparisonData.personalCar - comparisonData.publicTransit) /
    comparisonData.personalCar) * 100;

  return (
    <Card className="dark-card-bg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          CO₂ Emissions Saved
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>CO₂ savings are calculated by comparing emissions from public transit usage versus equivalent car trips. Factors include average vehicle emissions, occupancy rates, and distance traveled.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <motion.div
              key={totalSavings}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-green-400"
            >
              {formatCO2(totalSavings)}
            </motion.div>
            <span className="text-sm text-muted-foreground">
              CO₂ Reduction
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-green-400">{percentageReduction.toFixed(1)}%</span>
            </div>
            <Progress value={percentageReduction} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Public Transit</div>
              <motion.div
                key={comparisonData.publicTransit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lg font-semibold text-foreground"
              >
                {formatCO2(comparisonData.publicTransit)}
              </motion.div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Personal Car</div>
              <motion.div
                key={comparisonData.personalCar}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lg font-semibold text-foreground/60"
              >
                {formatCO2(comparisonData.personalCar)}
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};