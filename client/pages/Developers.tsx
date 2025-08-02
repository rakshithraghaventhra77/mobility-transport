import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Code, 
  Book, 
  Webhook, 
  Shield, 
  Play, 
  Copy, 
  Check,
  ExternalLink,
  Download,
  Zap,
  Terminal,
  GitBranch,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Developers() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Book },
    { id: 'api', name: 'API Reference', icon: Code },
    { id: 'guides', name: 'Integration Guides', icon: Zap },
    { id: 'webhooks', name: 'Webhooks', icon: Webhook },
    { id: 'support', name: 'Support', icon: Shield }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/buses',
      description: 'Get all active buses in the fleet',
      parameters: ['fleet_id', 'route_id', 'status'],
      response: {
        status: 200,
        data: [
          {
            bus_id: "BUS_001",
            route_id: "ROUTE_42",
            current_location: {
              lat: 37.7749,
              lng: -122.4194
            },
            occupancy: 75,
            eta_next_stop: "2024-01-15T14:30:00Z",
            status: "active"
          }
        ]
      }
    },
    {
      method: 'GET',
      endpoint: '/api/v1/predictions/{bus_id}',
      description: 'Get arrival predictions for a specific bus',
      parameters: ['stops_ahead', 'include_delays'],
      response: {
        status: 200,
        data: {
          bus_id: "BUS_001",
          predictions: [
            {
              stop_id: "STOP_123",
              estimated_arrival: "2024-01-15T14:30:00Z",
              confidence: 0.92
            }
          ]
        }
      }
    },
    {
      method: 'POST',
      endpoint: '/api/v1/incidents',
      description: 'Report a service incident',
      parameters: ['route_id', 'incident_type', 'description', 'severity'],
      response: {
        status: 201,
        data: {
          incident_id: "INC_456",
          status: "reported",
          created_at: "2024-01-15T14:25:00Z"
        }
      }
    }
  ];

  const codeExamples = {
    javascript: `// Initialize BusAI SDK
const BusAI = require('@busai/sdk');

const client = new BusAI({
  apiKey: 'your-api-key',
  environment: 'sandbox' // or 'production'
});

// Get real-time bus locations
async function getBusLocations() {
  try {
    const buses = await client.buses.list({
      route_id: 'ROUTE_42',
      status: 'active'
    });
    
    console.log('Active buses:', buses.data);
    return buses.data;
  } catch (error) {
    console.error('Error fetching buses:', error);
  }
}

// Subscribe to real-time updates
client.websocket.subscribe('bus_updates', (data) => {
  console.log('Bus update received:', data);
});`,
    python: `# Install: pip install busai-python
from busai import BusAI

# Initialize client
client = BusAI(
    api_key="your-api-key",
    environment="sandbox"
)

# Get arrival predictions
def get_predictions(bus_id):
    try:
        predictions = client.predictions.get(
            bus_id=bus_id,
            stops_ahead=5
        )
        return predictions.data
    except BusAI.APIError as e:
        print(f"API Error: {e}")
        return None

# Real-time occupancy monitoring
for update in client.stream.occupancy():
    if update.occupancy > 0.8:
        print(f"Bus {update.bus_id} is at {update.occupancy*100}% capacity")`,
    curl: `# Authentication
curl -X GET "https://api.busai.com/v1/buses" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"

# Get route performance
curl -X GET "https://api.busai.com/v1/routes/ROUTE_42/performance" \\
  -H "Authorization: Bearer your-api-key" \\
  -G -d "timeframe=24h" \\
  -d "metrics=delays,occupancy,satisfaction"

# Create incident report
curl -X POST "https://api.busai.com/v1/incidents" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "route_id": "ROUTE_42",
    "incident_type": "delay",
    "description": "Traffic congestion on Main St",
    "severity": "medium"
  }'`
  };

  const integrationGuides = [
    {
      title: "Quick Start Guide",
      description: "Get up and running with BusAI in 15 minutes",
      steps: ["Create developer account", "Generate API keys", "Install SDK", "Make first API call"],
      time: "15 min"
    },
    {
      title: "GTFS Integration",
      description: "Connect your existing GTFS data with BusAI predictions",
      steps: ["GTFS data validation", "Route mapping", "Schedule sync", "Real-time overlay"],
      time: "2-4 hours"
    },
    {
      title: "Passenger App Integration",
      description: "Add real-time predictions to your mobile app",
      steps: ["SDK installation", "Location services", "Prediction display", "Push notifications"],
      time: "1-2 days"
    },
    {
      title: "Dashboard Integration",
      description: "Embed BusAI analytics in your admin dashboard",
      steps: ["Widget configuration", "Authentication setup", "Data visualization", "Custom styling"],
      time: "4-8 hours"
    }
  ];

  const webhookEvents = [
    {
      event: 'bus.location.updated',
      description: 'Triggered when a bus location is updated',
      frequency: 'Every 30 seconds'
    },
    {
      event: 'prediction.updated',
      description: 'Triggered when arrival predictions change significantly',
      frequency: 'As needed'
    },
    {
      event: 'incident.created',
      description: 'Triggered when a new incident is reported',
      frequency: 'Real-time'
    },
    {
      event: 'route.performance.daily',
      description: 'Daily summary of route performance metrics',
      frequency: 'Daily at 00:00 UTC'
    }
  ];

  const copyCode = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Developer signup:', signupForm);
    alert('Thank you for signing up! You\'ll receive your API credentials within 24 hours.');
    setSignupForm({ name: '', email: '', company: '', useCase: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
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
              <h1 className="text-xl font-bold text-foreground">Developer Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
              <Button className="bg-primary hover:bg-primary-600">
                <Key className="w-4 h-4 mr-2" />
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    BusAI Developer Portal
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Build powerful transit applications with our comprehensive API and real-time data platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <Play className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Quick Start
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Get up and running with BusAI API in minutes
                      </p>
                      <Button className="w-full">Start Building</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Terminal className="w-8 h-8 text-success mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        API Sandbox
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Test API calls in our interactive sandbox
                      </p>
                      <Button variant="outline" className="w-full">
                        Try Sandbox
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integrationGuides.map((guide, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-foreground mb-2">{guide.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{guide.time}</span>
                            <Button size="sm" variant="outline">
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">API Reference</h2>
                  <p className="text-muted-foreground mb-6">
                    Complete reference for the BusAI REST API v1. All endpoints require authentication via API key.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Include your API key in the Authorization header for all requests:
                    </p>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      Authorization: Bearer your-api-key-here
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {apiEndpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-muted-foreground">{endpoint.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Parameters</h4>
                            <div className="flex flex-wrap gap-2">
                              {endpoint.parameters.map((param, i) => (
                                <code key={i} className="px-2 py-1 bg-muted rounded text-sm">
                                  {param}
                                </code>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Response Example</h4>
                            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                              {JSON.stringify(endpoint.response, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'guides' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Code Examples</h2>
                  <p className="text-muted-foreground mb-6">
                    Ready-to-use code examples in multiple programming languages.
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries(codeExamples).map(([language, code]) => (
                    <Card key={language}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="capitalize">{language}</CardTitle>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyCode(code, language)}
                          >
                            {copiedCode === language ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'webhooks' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Webhooks</h2>
                  <p className="text-muted-foreground mb-6">
                    Receive real-time notifications about events in your BusAI system.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {webhookEvents.map((event, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <code className="font-semibold">{event.event}</code>
                            <span className="text-xs text-muted-foreground">{event.frequency}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Developer Support</h2>
                  <p className="text-muted-foreground mb-6">
                    Get help with integration, report issues, or request new features.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Book className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Documentation
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Comprehensive guides and tutorials
                      </p>
                      <Button className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Docs
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <GitBranch className="w-12 h-12 text-success mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        GitHub Issues
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Report bugs and request features
                      </p>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub Repo
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Request Developer Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignupSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={signupForm.name}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={signupForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <Input
                        type="text"
                        name="company"
                        placeholder="Company/Organization"
                        value={signupForm.company}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <Textarea
                        name="useCase"
                        placeholder="Describe your intended use case for the BusAI API..."
                        value={signupForm.useCase}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />

                      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-600">
                        Request API Access
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
