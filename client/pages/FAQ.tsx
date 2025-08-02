import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  HelpCircle,
  Shield,
  Cpu,
  Building,
  Globe,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [questionForm, setQuestionForm] = useState({
    name: '',
    email: '',
    question: ''
  });

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'integration', name: 'System Integration', icon: Settings },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'technology', name: 'AI Technology', icon: Cpu },
    { id: 'implementation', name: 'Implementation', icon: Building },
    { id: 'expansion', name: 'Service Expansion', icon: Globe }
  ];

  const faqs = [
    {
      id: 1,
      category: 'integration',
      question: "How do you integrate with existing city systems?",
      answer: "BusAI is designed with flexibility in mind. Our platform integrates with existing transit management systems through standardized APIs including GTFS, GTFS-RT, and SIRI protocols. We provide custom integration services for legacy systems and offer both cloud-based and on-premise deployment options. Our technical team works closely with your IT department to ensure seamless integration without disrupting current operations."
    },
    {
      id: 2,
      category: 'privacy',
      question: "How is data privacy and security managed?",
      answer: "Data security is our top priority. We implement end-to-end encryption, comply with GDPR and local privacy regulations, and follow SOC 2 Type II security standards. Personal passenger data is anonymized and aggregated for analytics. We provide detailed data processing agreements and allow cities to maintain full control over their data with options for local storage and processing."
    },
    {
      id: 3,
      category: 'technology',
      question: "How does the Bus Agent predict arrivals?",
      answer: "Our AI system uses a combination of machine learning algorithms that analyze real-time GPS data, historical traffic patterns, weather conditions, passenger boarding data, and traffic signal timing. The system continuously learns from actual arrival times to improve prediction accuracy. We typically achieve 95%+ accuracy for predictions within a 15-minute window."
    },
    {
      id: 4,
      category: 'expansion',
      question: "Can this be expanded to metros, trains, or bike-sharing systems?",
      answer: "Absolutely! While BusAI was initially designed for bus systems, our platform is mode-agnostic. We've successfully deployed solutions for metro systems, light rail, and bike-sharing networks. The core AI algorithms adapt to different transportation modes by learning their unique operational patterns and constraints."
    },
    {
      id: 5,
      category: 'implementation',
      question: "How do I request a pilot program in my city?",
      answer: "Getting started is simple! Contact our team through the website or schedule a consultation call. We'll assess your current system, discuss your specific needs, and design a pilot program tailored to your city. Pilots typically last 3-6 months and include full technical support, training, and performance analysis. No upfront costs for qualified pilot programs."
    },
    {
      id: 6,
      category: 'technology',
      question: "What hardware or sensors are required?",
      answer: "BusAI works with existing GPS systems on buses and can integrate with additional sensors if available. For enhanced occupancy detection, we can work with onboard cameras, weight sensors, or passenger counting systems. However, our basic service requires only GPS data and can provide significant value with minimal additional hardware investment."
    },
    {
      id: 7,
      category: 'integration',
      question: "What happens if our current vendor contracts conflict?",
      answer: "We understand vendor relationships are complex. BusAI can work alongside existing systems as an overlay solution without requiring you to break current contracts. We offer phased implementation approaches and can integrate with multiple vendor systems simultaneously during transition periods."
    },
    {
      id: 8,
      category: 'privacy',
      question: "Can passengers opt out of data collection?",
      answer: "Yes, passengers have full control over their personal data. Our system works primarily with anonymized, aggregated data. For features requiring personal data (like personalized notifications), passengers can opt in or out at any time through mobile apps or web interfaces. We provide clear privacy controls and transparent data usage policies."
    },
    {
      id: 9,
      category: 'implementation',
      question: "How long does full implementation take?",
      answer: "Implementation timeline varies by city size and complexity. A typical deployment takes 3-6 months from contract signing to full operation. This includes system integration, staff training, testing phases, and gradual rollout. We work with your timeline and can accelerate deployment for urgent needs or extend for careful change management."
    },
    {
      id: 10,
      category: 'technology',
      question: "How accurate are the occupancy predictions?",
      answer: "Our occupancy prediction accuracy typically ranges from 85-95% depending on the data sources available. With basic GPS data, we achieve 85-90% accuracy. Adding passenger counting systems or weight sensors can improve accuracy to 95%+. The system continuously learns and improves accuracy over time."
    },
    {
      id: 11,
      category: 'implementation',
      question: "What training is provided for staff?",
      answer: "We provide comprehensive training programs including online modules, in-person workshops, and ongoing support. Training covers system operation, dashboard usage, incident management, and data interpretation. We also offer train-the-trainer programs so your team can onboard new staff independently."
    },
    {
      id: 12,
      category: 'expansion',
      question: "Can the system handle multiple cities or regions?",
      answer: "Yes! Our platform is designed to scale from single cities to multi-regional deployments. We support hierarchical management structures, cross-regional analytics, and standardized reporting across multiple transit authorities. Regional agencies can maintain centralized oversight while giving local control to individual cities."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Question submitted:', questionForm);
    alert('Thank you for your question! We\'ll get back to you within 24 hours.');
    setQuestionForm({ name: '', email: '', question: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestionForm(prev => ({ ...prev, [name]: value }));
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
              <h1 className="text-xl font-bold text-foreground">Frequently Asked Questions</h1>
            </div>
            <Link to="/developers" className="text-foreground hover:text-primary transition-colors">
              Developer Docs
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about BusAI implementation, technology, and integration. 
            Can't find what you're looking for? Ask us directly below.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Filter */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No questions found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-foreground pr-4">
                          {faq.question}
                        </h3>
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-border pt-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Request a Pilot
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Start a pilot program in your city
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary-600">
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Settings className="w-12 h-12 text-info mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Technical Docs
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Detailed integration guides
                  </p>
                  <Button variant="outline" className="w-full">
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Ask a Question Form */}
        <Card className="mt-16 max-w-3xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground">
                Can't find the answer you're looking for? Send us your question and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={questionForm.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={questionForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Textarea
                name="question"
                placeholder="What would you like to know about BusAI?"
                value={questionForm.question}
                onChange={handleInputChange}
                rows={5}
                required
              />

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-600">
                <Send className="w-5 h-5 mr-2" />
                Submit Question
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
