import React, { useState, useEffect } from 'react';
import { Car, Users, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapComponent } from '@/components/ui/map';
import { motion } from 'framer-motion';

interface CabStats {
  activeCabs: number;
  totalRides: number;
  avgPickupTime: string;
  revenue: number;
}

interface CabStatus {
  id: string;
  driver: string;
  status: 'available' | 'occupied' | 'en-route';
  location: string;
  eta?: string;
}

export default function CabAgent() {
  const [stats, setStats] = useState<CabStats>({
    activeCabs: 42,
    totalRides: 867,
    avgPickupTime: '3.2 mins',
    revenue: 12450
  });

  const [cabStatuses, setCabStatuses] = useState<CabStatus[]>([
    {
      id: 'CAB001',
      driver: 'John Doe',
      status: 'occupied',
      location: 'Downtown',
      eta: '5 mins'
    },
    {
      id: 'CAB002',
      driver: 'Jane Smith',
      status: 'available',
      location: 'Midtown'
    },
    {
      id: 'CAB003',
      driver: 'Mike Johnson',
      status: 'en-route',
      location: 'Upper East Side',
      eta: '8 mins'
    }
  ]);

  const [cabs, setCabs] = useState([
    {
      id: 'CAB001',
      type: 'cab',
      position: [40.7148, -74.0080],
      eta: '5 mins',
      occupancy: 'Occupied'
    },
    {
      id: 'CAB002',
      type: 'cab',
      position: [40.7158, -74.0090],
      eta: 'Available',
      occupancy: 'Empty'
    }
  ]);

  useEffect(() => {
    // Simulate cab movement
    const interval = setInterval(() => {
      setCabs(prev => prev.map(cab => ({
        ...cab,
        position: [
          cab.position[0] + (Math.random() - 0.5) * 0.001,
          cab.position[1] + (Math.random() - 0.5) * 0.001
        ]
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: CabStatus['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'occupied':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'en-route':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Car className="w-8 h-8 text-primary" />
        Cab Agent Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="dark-card-bg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cabs</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCabs}</div>
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
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRides}</div>
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
              <CardTitle className="text-sm font-medium">Avg. Pickup Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgPickupTime}</div>
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
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="dark-card-bg">
            <CardHeader>
              <CardTitle>Live Cab Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent
                center={[40.7128, -74.0060]}
                zoom={13}
                vehicles={cabs}
                visibleLayers={{ bus: false, metro: false, cab: true }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="dark-card-bg">
            <CardHeader>
              <CardTitle>Cab Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cabStatuses.map(cab => (
                  <div
                    key={cab.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                  >
                    <div>
                      <div className="font-medium">{cab.driver}</div>
                      <div className="text-sm text-muted-foreground">{cab.location}</div>
                      {cab.eta && (
                        <div className="text-xs text-muted-foreground mt-1">
                          ETA: {cab.eta}
                        </div>
                      )}
                    </div>
                    <Badge className={getStatusColor(cab.status)}>
                      {cab.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}