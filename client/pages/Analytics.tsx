import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  Users, 
  Leaf, 
  AlertTriangle, 
  Bus, 
  Download,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  MapPin,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const kpis = [
    {
      title: "Average Wait Time",
      value: "4.2 min",
      change: "-18%",
      trend: "down",
      icon: Clock,
      color: "text-success-600"
    },
    {
      title: "On-Time Arrivals",
      value: "92.4%",
      change: "+12%",
      trend: "up",
      icon: CheckCircle,
      color: "text-success-600"
    },
    {
      title: "Riders Served",
      value: "847K",
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "text-primary-600"
    },
    {
      title: "CO₂ Saved",
      value: "2,340 tons",
      change: "+31%",
      trend: "up",
      icon: Leaf,
      color: "text-success-600"
    },
    {
      title: "Live Incidents",
      value: "3",
      change: "-67%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ];

  const statusData = [
    { label: "Buses in Service", value: "248", status: "operational" },
    { label: "Current Delays", value: "12", status: "warning" },
    { label: "Route Coverage", value: "98.5%", status: "operational" },
    { label: "Active Routes", value: "84", status: "operational" }
  ];

  const impactStats = [
    {
      title: "Fuel Efficiency Improvement",
      value: "23%",
      description: "Through optimized routing and predictive scheduling"
    },
    {
      title: "Passenger Satisfaction",
      value: "4.7/5",
      description: "Based on 15,000+ rider surveys this quarter"
    },
    {
      title: "Operational Cost Reduction",
      value: "$2.1M",
      description: "Annual savings through AI-powered optimization"
    },
    {
      title: "Accessibility Improvement",
      value: "34%",
      description: "Better service to underserved communities"
    }
  ];

  const chartData = {
    ridership: [
      { month: 'Jan', value: 680 },
      { month: 'Feb', value: 720 },
      { month: 'Mar', value: 765 },
      { month: 'Apr', value: 810 },
      { month: 'May', value: 847 }
    ],
    delays: [
      { month: 'Jan', value: 8.2 },
      { month: 'Feb', value: 7.1 },
      { month: 'Mar', value: 6.3 },
      { month: 'Apr', value: 5.1 },
      { month: 'May', value: 4.2 }
    ],
    occupancy: [
      { hour: '6AM', value: 45 },
      { hour: '8AM', value: 85 },
      { hour: '10AM', value: 62 },
      { hour: '12PM', value: 78 },
      { hour: '2PM', value: 55 },
      { hour: '4PM', value: 72 },
      { hour: '6PM', value: 88 },
      { hour: '8PM', value: 41 }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-border"></div>
              <h1 className="text-xl font-bold text-foreground">Analytics & Impact Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/demo" className="text-foreground hover:text-primary transition-colors">Live Demo</Link>
              <Button className="bg-primary hover:bg-primary-600">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Performance Overview</h2>
            <p className="text-muted-foreground">Real-time insights and impact metrics for urban mobility optimization</p>
          </div>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${kpi.color}`} />
                    <div className={`flex items-center text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-success-600' : 'text-success-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Ridership Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Ridership Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-4 p-4">
                {chartData.ridership.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${(data.value / 850) * 100}%` }}
                    ></div>
                    <div className="text-sm text-muted-foreground mt-2">{data.month}</div>
                    <div className="text-xs font-medium">{data.value}K</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-success" />
                Real-time Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{item.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'operational' ? 'bg-success' : 'bg-orange-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Delay Reduction Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Average Wait Time Reduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end space-x-4 p-4">
                {chartData.delays.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-success rounded-t"
                      style={{ height: `${(data.value / 10) * 100}%` }}
                    ></div>
                    <div className="text-sm text-muted-foreground mt-2">{data.month}</div>
                    <div className="text-xs font-medium">{data.value}m</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Occupancy by Hour */}
          <Card>
            <CardHeader>
              <CardTitle>Average Occupancy by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end space-x-2 p-4">
                {chartData.occupancy.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-info rounded-t"
                      style={{ height: `${data.value}%` }}
                    ></div>
                    <div className="text-xs text-muted-foreground mt-2">{data.hour}</div>
                    <div className="text-xs font-medium">{data.value}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental & Social Impact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-success" />
              Environmental & Social Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-2">{stat.title}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Download Report Section */}
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Comprehensive Impact Report
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access detailed analytics, methodology, and comprehensive impact metrics for city partners and stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-600">
                <Download className="w-5 h-5 mr-2" />
                Download Full Report (PDF)
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Presentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
