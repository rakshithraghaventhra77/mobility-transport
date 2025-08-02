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
  Layers
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
  const [activeDemo, setActiveDemo] = useState('realtime');

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="glass-effect rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-success flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Map Placeholder */}
          <div className="max-w-6xl mx-auto">
            <Card className="light-card-bg border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">Live Transportation Map</h3>
                  <div className="text-muted-foreground">Map temporarily disabled for debugging</div>
                </div>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Map component temporarily disabled</p>
                    <p className="text-sm text-muted-foreground">This helps isolate the black screen issue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background">
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
    </div>
  );
}
