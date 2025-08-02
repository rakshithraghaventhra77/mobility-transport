import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Users, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import type { Bus as BusType } from './map';

interface AnalyticsWidgetsProps {
  buses: BusType[];
  totalRiders: number;
  onTimePercentage: number;
  co2Saved: number;
}

export function AnalyticsWidgets({ buses, totalRiders, onTimePercentage, co2Saved }: AnalyticsWidgetsProps) {
  const activeBuses = buses.length;
  const delayedBuses = buses.filter(bus => bus.delay > 0).length;
  const onTimeBuses = buses.filter(bus => bus.delay <= 0).length;
  
  const avgSpeed = buses.reduce((sum, bus) => sum + bus.speed, 0) / buses.length;
  const avgOccupancy = buses.reduce((sum, bus) => {
    const occupancyValue = bus.occupancy === 'Low' ? 0.3 : bus.occupancy === 'Medium' ? 0.6 : 0.9;
    return sum + occupancyValue;
  }, 0) / buses.length;

  const widgets = [
    {
      title: 'Active Buses',
      value: activeBuses,
      icon: Bus,
      color: 'text-primary',
      trend: '+2',
      trendDirection: 'up' as const
    },
    {
      title: 'Daily Riders',
      value: totalRiders.toLocaleString(),
      icon: Users,
      color: 'text-success',
      trend: '+5.2%',
      trendDirection: 'up' as const
    },
    {
      title: 'On-Time Rate',
      value: `${onTimePercentage}%`,
      icon: Clock,
      color: 'text-info',
      trend: '+2.1%',
      trendDirection: 'up' as const
    },
    {
      title: 'CO₂ Saved',
      value: `${co2Saved.toFixed(1)} tons`,
      icon: TrendingUp,
      color: 'text-success',
      trend: '+12.5%',
      trendDirection: 'up' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((widget, index) => {
        const IconComponent = widget.icon;
        return (
          <Card key={index} className="light-card-bg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {widget.title}
                  </p>
                  <p className={`text-2xl font-bold ${widget.color}`}>
                    {widget.value}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${widget.color.replace('text-', 'bg-')}20`}>
                  <IconComponent className={`w-5 h-5 ${widget.color}`} />
                </div>
              </div>
              
              <div className="flex items-center gap-1 mt-2">
                {widget.trendDirection === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <span className="text-xs text-muted-foreground">
                  {widget.trend} from last week
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Detailed analytics component
export function DetailedAnalytics({ buses }: { buses: BusType[] }) {
  const totalBuses = buses.length;
  const delayedBuses = buses.filter(bus => bus.delay > 0).length;
  const onTimeBuses = buses.filter(bus => bus.delay <= 0).length;
  const earlyBuses = buses.filter(bus => bus.delay < 0).length;
  
  const avgSpeed = buses.reduce((sum, bus) => sum + bus.speed, 0) / buses.length;
  const avgDelay = buses.reduce((sum, bus) => sum + bus.delay, 0) / buses.length;

  const occupancyStats = {
    Low: buses.filter(bus => bus.occupancy === 'Low').length,
    Medium: buses.filter(bus => bus.occupancy === 'Medium').length,
    High: buses.filter(bus => bus.occupancy === 'High').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Performance Metrics */}
      <Card className="light-card-bg">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{avgSpeed.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Speed (km/h)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{avgDelay.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Delay (min)</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">On Time</span>
              <span className="text-sm font-medium">{onTimeBuses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Delayed</span>
              <span className="text-sm font-medium text-destructive">{delayedBuses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Early</span>
              <span className="text-sm font-medium text-success">{earlyBuses}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Occupancy Distribution */}
      <Card className="light-card-bg">
        <CardHeader>
          <CardTitle>Occupancy Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Low Occupancy</span>
              <span className="text-sm font-medium text-success">{occupancyStats.Low}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${(occupancyStats.Low / totalBuses) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Medium Occupancy</span>
              <span className="text-sm font-medium text-warning">{occupancyStats.Medium}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full" 
                style={{ width: `${(occupancyStats.Medium / totalBuses) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">High Occupancy</span>
              <span className="text-sm font-medium text-destructive">{occupancyStats.High}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-destructive h-2 rounded-full" 
                style={{ width: `${(occupancyStats.High / totalBuses) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 