import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield, 
  BarChart3,
  Navigation,
  Smartphone,
  Eye,
  Heart,
  Play,
  ChevronRight,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Leaf,
  Activity,
  Award,
  Train,
  Car,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { MapComponent, type Bus as BusType, type Stop, type RouteSearchResult, transitAI } from '@/components/ui/map';
import { RouteSearch } from '@/components/ui/route-search';
import { AnalyticsWidgets, DetailedAnalytics } from '@/components/ui/analytics-widgets';
import { FeedbackForm, FeedbackSummary } from '@/components/ui/feedback-form';
import { AIChatbot, LiveBusInfo } from '@/components/ui/ai-chatbot';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Index() {
  const [activeDemo, setActiveDemo] = useState('realtime');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [searchFrom, setSearchFrom] = useState<string>('');
  const [searchTo, setSearchTo] = useState<string>('');
  const [searchResults, setSearchResults] = useState<RouteSearchResult[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusType | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Mock data
  const mockBuses: BusType[] = [
    {
      id: 'BUS001',
      type: 'bus',
      position: [40.7128, -74.0060],
      route: 'Route 1',
      routeId: 'route1',
      eta: '5 mins',
      occupancy: 'Medium',
      speed: 25,
      direction: 45,
      lastUpdate: new Date(),
      nextStop: 'Times Square',
      delay: 2
    },
    {
      id: 'BUS002',
      type: 'bus',
      position: [40.7138, -74.0070],
      route: 'Route 2',
      routeId: 'route2',
      eta: '3 mins',
      occupancy: 'High',
      speed: 30,
      direction: 90,
      lastUpdate: new Date(),
      nextStop: 'Central Park',
      delay: 0
    },
    {
      id: 'METRO001',
      type: 'metro',
      position: [40.7148, -74.0080],
      route: 'Blue Line',
      routeId: 'metro1',
      eta: '2 mins',
      occupancy: 'Low',
      speed: 35,
      direction: 180,
      lastUpdate: new Date(),
      nextStop: 'Grand Central',
      delay: -1
    }
  ];

  const mockStops: Stop[] = [
    { id: 'stop1', name: 'Times Square', position: [40.7580, -73.9855], routes: ['route1', 'route2'] },
    { id: 'stop2', name: 'Central Park', position: [40.7829, -73.9654], routes: ['route1', 'route3'] },
    { id: 'stop3', name: 'Grand Central', position: [40.7527, -73.9772], routes: ['metro1', 'route2'] },
    { id: 'stop4', name: 'Brooklyn Bridge', position: [40.7061, -73.9969], routes: ['route1', 'metro1'] },
    { id: 'stop5', name: 'Empire State', position: [40.7484, -73.9857], routes: ['route2', 'route3'] }
  ];

  const [buses, setBuses] = useState<BusType[]>(mockBuses);
  const [stops, setStops] = useState<Stop[]>(mockStops);

  // Update bus positions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          // Simulate movement
          const speedKmH = bus.speed;
          const speedDegrees = speedKmH / 111000; // Convert km/h to degrees per second
          const timeDiff = 5; // 5 seconds
          
          const newLat = bus.position[0] + (Math.random() - 0.5) * speedDegrees * timeDiff;
          const newLng = bus.position[1] + (Math.random() - 0.5) * speedDegrees * timeDiff;
          
          return {
            ...bus,
            position: [newLat, newLng],
            lastUpdate: new Date(),
            delay: bus.delay + (Math.random() - 0.5) * 2 // Random delay change
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRouteSearch = (from: string, to: string) => {
    const results = transitAI.suggestRoute(from, to);
    setSearchResults(results);
    setSearchFrom(from);
    setSearchTo(to);
  };

  const handleBusClick = (bus: BusType) => {
    setSelectedBus(bus);
  };

  const handleStopClick = (stop: Stop) => {
    setSelectedStop(stop);
  };

  const handleFeedbackSubmit = async (feedback: any) => {
    console.log('Feedback submitted:', feedback);
    // In production, this would send to your backend
    alert('Thank you for your feedback!');
  };

  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Live GPS tracking of all buses with 99.9% accuracy and sub-second updates for precise arrival predictions.",
      color: "neon-cyan"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "AI-powered route optimization reducing wait times by 40% and improving on-time performance to 96%.",
      color: "neon-lime"
    },
    {
      icon: Users,
      title: "Passenger Analytics",
      description: "Deep insights into ridership patterns, occupancy rates, and service demand to optimize capacity planning.",
      color: "neon-orange"
    },
    {
      icon: Zap,
      title: "Predictive Maintenance",
      description: "Machine learning algorithms predict vehicle maintenance needs, reducing breakdowns by 70%.",
      color: "neon-yellow"
    }
  ];

  const stats = [
    { label: "Active Buses", value: "248", trend: "+12%", color: "text-primary" },
    { label: "Daily Riders", value: "47.3K", trend: "+18%", color: "text-success" },
    { label: "On-Time Rate", value: "96.2%", trend: "+8%", color: "text-info" },
    { label: "CO₂ Saved", value: "2.1K tons", trend: "+24%", color: "text-success" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Transit Director, Metro City",
      quote: "This system transformed our operations. 40% reduction in complaints and 25% increase in ridership.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Operations Manager, Urban Transit",
      quote: "The predictive analytics helped us optimize routes and save $2M annually in operational costs.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 light-gradient-bg"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-success to-info bg-clip-text text-transparent">
                Urban Mobility
              </span>
              <br />
              <span className="text-foreground">Bus Agent</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Revolutionary AI-powered bus tracking and management system that transforms public transportation 
              with real-time analytics, predictive scheduling, and seamless passenger experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Live Demo
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </div>
            
            {/* Live Stats */}
            <AnalyticsWidgets 
              buses={buses}
              totalRiders={47300}
              onTimePercentage={96.2}
              co2Saved={2100}
            />
          </div>

          {/* Interactive Map Section */}
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="light-card-bg border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Live Transportation Map
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select route" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Routes</SelectItem>
                            <SelectItem value="route1">Route 1</SelectItem>
                            <SelectItem value="route2">Route 2</SelectItem>
                            <SelectItem value="metro1">Blue Line</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MapComponent
                      center={[40.7128, -74.0060]}
                      zoom={13}
                      onBusClick={handleBusClick}
                      onStopClick={handleStopClick}
                      selectedRoute={selectedRoute}
                      searchFrom={searchFrom}
                      searchTo={searchTo}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Route Search */}
                <RouteSearch
                  stops={stops}
                  onSearch={handleRouteSearch}
                  searchResults={searchResults}
                />

                {/* Live Bus Info */}
                <LiveBusInfo buses={buses} />

                {/* Selected Bus/Stop Info */}
                {selectedBus && (
                  <Card className="light-card-bg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bus className="w-5 h-5" />
                        {selectedBus.route}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Bus ID</span>
                        <span className="text-sm font-medium">{selectedBus.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ETA</span>
                        <span className="text-sm font-medium">{selectedBus.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Occupancy</span>
                        <span className="text-sm font-medium">{selectedBus.occupancy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Speed</span>
                        <span className="text-sm font-medium">{selectedBus.speed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Delay</span>
                        <span className={`text-sm font-medium ${selectedBus.delay > 0 ? 'text-destructive' : 'text-success'}`}>
                          {selectedBus.delay > 0 ? '+' : ''}{selectedBus.delay} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedStop && (
                  <Card className="light-card-bg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {selectedStop.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Routes: {selectedStop.routes.join(', ')}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Feedback */}
                <FeedbackForm
                  onSubmit={handleFeedbackSubmit}
                  isOpen={isFeedbackOpen}
                  onOpenChange={setIsFeedbackOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Section */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Real-Time Analytics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive insights into system performance, passenger patterns, and operational efficiency.
            </p>
          </div>

          <DetailedAnalytics buses={buses} />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Intelligent Transportation Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by advanced AI and machine learning, our platform delivers unprecedented insights 
              and control over urban mobility systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="light-card-bg border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <IconComponent className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation to Other Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/analytics" className="group">
              <Card className="light-card-bg border-info/20 hover:border-info transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-info mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4">Comprehensive performance metrics and insights</p>
                  <div className="flex items-center justify-center text-info group-hover:text-info/80">
                    <span className="text-sm font-medium mr-2">View Analytics</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/accessibility" className="group">
              <Card className="light-card-bg border-success/20 hover:border-success transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Accessibility & Impact</h3>
                  <p className="text-sm text-muted-foreground mb-4">Inclusive design and social impact initiatives</p>
                  <div className="flex items-center justify-center text-success group-hover:text-success/80">
                    <span className="text-sm font-medium mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/case-studies" className="group">
              <Card className="light-card-bg border-orange-500/20 hover:border-orange-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Success Stories</h3>
                  <p className="text-sm text-muted-foreground mb-4">Real-world implementations and results</p>
                  <div className="flex items-center justify-center text-orange-500 group-hover:text-orange-500/80">
                    <span className="text-sm font-medium mr-2">View Cases</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-24 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Transforming Cities Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our solutions have improved transportation efficiency, reduced environmental impact, 
              and enhanced accessibility across major metropolitan areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-success" />
              </div>
              <div className="text-4xl font-bold text-success mb-2">2.1M</div>
              <div className="text-lg font-semibold text-foreground mb-2">Tons CO₂ Reduced</div>
              <div className="text-sm text-muted-foreground">Annual environmental impact across all deployments</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">12.7M</div>
              <div className="text-lg font-semibold text-foreground mb-2">Passengers Served</div>
              <div className="text-sm text-muted-foreground">Monthly ridership across partner cities</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-info" />
              </div>
              <div className="text-4xl font-bold text-info mb-2">45+</div>
              <div className="text-lg font-semibold text-foreground mb-2">Cities Worldwide</div>
              <div className="text-sm text-muted-foreground">Active deployments across 6 continents</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="light-card-bg border-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary/20 via-success/20 to-info/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Transit System?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join leading transit authorities worldwide who have already revolutionized their operations 
            with our AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-600 px-8 py-4">
              <Smartphone className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Case Studies
            </Button>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot buses={buses} stops={stops} />
    </div>
  );
}
