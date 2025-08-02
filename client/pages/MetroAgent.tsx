import React, { useState, useEffect } from 'react';
import { Train, Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapComponent } from '@/components/ui/map';
import { motion } from 'framer-motion';

interface MetroStats {
  activeTrains: number;
  totalPassengers: number;
  avgWaitTime: string;
  onTimePerformance: number;
}

interface ServiceAlert {
  id: string;
  line: string;
  type: 'delay' | 'maintenance' | 'closure';
  message: string;
  timestamp: string;
}

export default function MetroAgent() {
  const [stats, setStats] = useState<MetroStats>({
    activeTrains: 24,
    totalPassengers: 15780,
    avgWaitTime: '4.5 mins',
    onTimePerformance: 94.5
  });

  const [alerts, setAlerts] = useState<ServiceAlert[]>([
    {
      id: '1',
      line: 'Blue Line',
      type: 'delay',
      message: 'Minor delays due to signal maintenance',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      line: 'Red Line',
      type: 'maintenance',
      message: 'Weekend track work scheduled',
      timestamp: new Date().toISOString()
    }
  ]);

  const [metros, setMetros] = useState([
    {
      id: 'METRO001',
      type: 'metro',
      position: [40.7128, -74.0060],
      route: 'Blue Line',
      eta: '3 mins',
      occupancy: 'High'
    },
    {
      id: 'METRO002',
      type: 'metro',
      position: [40.7138, -74.0070],
      route: 'Red Line',
      eta: '5 mins',
      occupancy: 'Medium'
    }
  ]);

  useEffect(() => {
    // Simulate metro movement
    const interval = setInterval(() => {
      setMetros(prev => prev.map(metro => ({
        ...metro,
        position: [
          metro.position[0] + (Math.random() - 0.5) * 0.001,
          metro.position[1] + (Math.random() - 0.5) * 0.001
        ]
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Train className="w-8 h-8 text-primary" />
        Metro Agent Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="dark-card-bg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
              <Train className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTrains}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="dark-card-bg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPassengers.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="dark-card-bg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgWaitTime}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="dark-card-bg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onTimePerformance}%</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="dark-card-bg">
            <CardHeader>
              <CardTitle>Live Metro Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent
                center={[40.7128, -74.0060]}
                zoom={13}
                vehicles={metros}
                visibleLayers={{ bus: false, metro: true, cab: false }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="dark-card-bg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Service Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map(alert => (
                <Alert key={alert.id} variant="warning" className="bg-yellow-500/10 border-yellow-500/20">
                  <AlertTitle className="text-yellow-500">{alert.line}</AlertTitle>
                  <AlertDescription className="text-sm text-muted-foreground">
                    {alert.message}
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}