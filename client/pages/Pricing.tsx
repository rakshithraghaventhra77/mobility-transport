import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Star, 
  Users, 
  Building, 
  Zap,
  Shield,
  Clock,
  Phone,
  Mail,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    fleetSize: '',
    message: ''
  });

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small transit agencies getting started with AI optimization",
      price: { monthly: 2500, annual: 2000 },
      popular: false,
      features: [
        "Up to 25 buses",
        "Real-time GPS tracking",
        "Basic arrival predictions",
        "Mobile passenger app",
        "Email support",
        "Standard analytics dashboard",
        "GTFS integration",
        "Basic incident management"
      ],
      limitations: [
        "Limited to 1 city",
        "No custom integrations",
        "Standard SLA"
      ],
      cta: "Start Free Trial",
      bestFor: "Cities with 10-50 buses"
    },
    {
      name: "Professional",
      description: "Advanced features for growing transit systems with multiple routes",
      price: { monthly: 7500, annual: 6000 },
      popular: true,
      features: [
        "Up to 150 buses",
        "Advanced AI predictions",
        "Occupancy monitoring",
        "Dynamic route optimization",
        "Real-time passenger alerts",
        "Advanced analytics & reporting",
        "API access",
        "Webhook integrations",
        "Priority support",
        "Custom branding",
        "Multiple operator accounts"
      ],
      limitations: [
        "Limited to 3 cities",
        "Standard API rate limits"
      ],
      cta: "Schedule Demo",
      bestFor: "Cities with 50-200 buses"
    },
    {
      name: "Enterprise",
      description: "Full-scale solution for large transit authorities and multi-city deployments",
      price: { monthly: "Custom", annual: "Custom" },
      popular: false,
      features: [
        "Unlimited buses",
        "Multi-city management",
        "Custom AI model training",
        "Advanced demand forecasting",
        "Predictive maintenance alerts",
        "White-label solutions",
        "Custom integrations",
        "Dedicated support manager",
        "On-premise deployment option",
        "SLA guarantees",
        "Custom reporting",
        "24/7 phone support",
        "Training & onboarding"
      ],
      limitations: [],
      cta: "Contact Sales",
      bestFor: "Cities with 200+ buses"
    }
  ];

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 30-day free trial for our Starter and Professional plans. Enterprise trials are customized based on your specific needs."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle, and we'll prorate any differences."
    },
    {
      question: "What's included in implementation?",
      answer: "All plans include basic setup and integration support. Professional and Enterprise plans include dedicated onboarding, training sessions, and custom integration assistance."
    },
    {
      question: "Are there any setup fees?",
      answer: "No setup fees for Starter and Professional plans. Enterprise implementations may include one-time setup costs depending on customization requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and can accommodate government procurement processes including PO-based billing."
    },
    {
      question: "Do you offer government discounts?",
      answer: "Yes, we offer special pricing for government agencies and non-profit transit authorities. Contact our sales team for details."
    }
  ];

  const trustBadges = [
    { name: "SOC 2 Certified", icon: Shield },
    { name: "99.9% Uptime SLA", icon: Zap },
    { name: "24/7 Support", icon: Clock },
    { name: "GDPR Compliant", icon: Shield }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.price.monthly === "Custom") return "Custom Pricing";
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
    return `$${price.toLocaleString()}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price.monthly === "Custom") return null;
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    const savings = ((monthlyCost - annualCost) / monthlyCost * 100).toFixed(0);
    return billingCycle === 'annual' ? `Save ${savings}%` : null;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your interest! Our sales team will contact you within 24 hours.');
    setContactForm({ name: '', email: '', company: '', fleetSize: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
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
              <h1 className="text-xl font-bold text-foreground">Pricing & Plans</h1>
            </div>
            <Link to="/testimonials" className="text-foreground hover:text-primary transition-colors">
              Success Stories
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your transit system. All plans include core AI features, 
            real-time tracking, and passenger notifications. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="ml-2 px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full">
                Save up to 25%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-foreground">
                    {getPrice(plan)}
                    {plan.price.monthly !== "Custom" && (
                      <span className="text-lg font-normal text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  {getSavings(plan) && (
                    <div className="text-sm text-success font-medium mt-1">
                      {getSavings(plan)}
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground font-medium p-2 bg-muted/50 rounded">
                  {plan.bestFor}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Included Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center text-sm text-muted-foreground">
                            <X className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button 
                  size="lg" 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-16">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Trusted by Transit Authorities Worldwide
          </h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-start">
                    <HelpCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed ml-7">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Sales Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Need a Custom Solution?
            </CardTitle>
            <p className="text-muted-foreground">
              Get in touch with our sales team to discuss enterprise pricing, 
              custom integrations, or multi-city deployments.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="company"
                  placeholder="Transit Authority/Company"
                  value={contactForm.company}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="fleetSize"
                  value={contactForm.fleetSize}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Fleet Size</option>
                  <option value="1-25">1-25 buses</option>
                  <option value="26-50">26-50 buses</option>
                  <option value="51-150">51-150 buses</option>
                  <option value="151-500">151-500 buses</option>
                  <option value="500+">500+ buses</option>
                </select>
              </div>
              
              <Textarea
                name="message"
                placeholder="Tell us about your specific needs and requirements..."
                value={contactForm.message}
                onChange={handleInputChange}
                rows={4}
                required
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary-600">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Button type="button" size="lg" variant="outline" className="flex-1">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
