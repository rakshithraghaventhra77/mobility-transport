import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  Ear, 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Globe, 
  Smartphone,
  Monitor,
  Languages,
  Clock,
  DollarSign,
  Navigation,
  Zap,
  CheckCircle,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Accessibility() {
  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      description: "High contrast modes, large text options, and screen reader compatibility",
      features: [
        "WCAG 2.1 AA compliant color contrast ratios",
        "Scalable text up to 200% without loss of functionality",
        "Alternative text for all images and icons",
        "Focus indicators for keyboard navigation",
        "Compatible with NVDA, JAWS, and VoiceOver screen readers"
      ]
    },
    {
      icon: Ear,
      title: "Hearing Accessibility", 
      description: "Visual alerts, text alternatives, and multi-modal communication",
      features: [
        "Visual notifications for audio alerts",
        "Text-based announcements for all audio content",
        "Vibration alerts on mobile devices",
        "Sign language interpretation support for video content",
        "Real-time text updates for voice announcements"
      ]
    },
    {
      icon: Navigation,
      title: "Mobility & Motor Accessibility",
      description: "Voice commands, gesture controls, and assistive device compatibility",
      features: [
        "Voice command integration for hands-free operation",
        "Large touch targets (minimum 44px) for easy interaction",
        "Gesture-based navigation options",
        "Switch control compatibility",
        "Reduced motion options for vestibular disorders"
      ]
    },
    {
      icon: Languages,
      title: "Cognitive Accessibility",
      description: "Simple interfaces, clear language, and flexible interaction methods",
      features: [
        "Plain language and simple sentence structure",
        "Consistent navigation and predictable layout",
        "Error prevention and clear error messages",
        "Multiple ways to complete tasks",
        "Help documentation in multiple formats"
      ]
    }
  ];

  const socialImpactAreas = [
    {
      icon: Users,
      title: "Serving Underserved Communities",
      description: "Improving transit access for elderly, disabled, and low-income riders",
      stats: [
        { label: "Elderly Riders Better Served", value: "84%" },
        { label: "Wheelchair Accessible Routes", value: "100%" },
        { label: "Low-Income Community Coverage", value: "95%" }
      ],
      initiatives: [
        "Free mobile apps with no data requirements for basic features",
        "Multi-language support for immigrant communities",
        "Partnership with senior centers for training programs",
        "Reduced fare integration for qualified riders"
      ]
    },
    {
      icon: DollarSign,
      title: "Economic Empowerment",
      description: "Connecting people to employment and economic opportunities",
      stats: [
        { label: "Job Access Routes Optimized", value: "67" },
        { label: "Commute Time Reduction", value: "23%" },
        { label: "Transit-Dependent Workers Served", value: "45K+" }
      ],
      initiatives: [
        "Early morning and late evening service optimization",
        "Direct routes to major employment centers",
        "Integration with job training and placement programs",
        "Partnerships with local workforce development agencies"
      ]
    },
    {
      icon: Heart,
      title: "Health & Wellbeing",
      description: "Supporting community health through better transportation access",
      stats: [
        { label: "Healthcare Facilities Connected", value: "28" },
        { label: "Medical Appointment Reliability", value: "94%" },
        { label: "Air Quality Improvement", value: "18%" }
      ],
      initiatives: [
        "Dedicated routes to hospitals and clinics",
        "Real-time updates for medical appointment transportation",
        "Air quality monitoring and reporting",
        "Partnership with public health departments"
      ]
    }
  ];

  const partnerships = [
    {
      organization: "National Federation of the Blind",
      type: "Accessibility Advocacy",
      collaboration: "User testing and feedback for vision accessibility features"
    },
    {
      organization: "Disability Rights Advocates",
      type: "Legal Compliance",
      collaboration: "ADA compliance review and ongoing accessibility audits"
    },
    {
      organization: "United Way",
      type: "Community Impact",
      collaboration: "Transit access programs for low-income communities"
    },
    {
      organization: "AARP",
      type: "Senior Services",
      collaboration: "Technology training and senior-friendly design consultation"
    },
    {
      organization: "Local Community Centers",
      type: "Outreach Programs",
      collaboration: "Community education and digital literacy programs"
    }
  ];

  const awards = [
    {
      title: "Digital Accessibility Excellence Award",
      organization: "Web Accessibility Initiative",
      year: "2024",
      description: "Recognition for outstanding commitment to digital accessibility in transportation technology"
    },
    {
      title: "Inclusive Design Leadership",
      organization: "Microsoft Inclusive Design",
      year: "2023",
      description: "Honored for creating inclusive transit solutions that serve diverse communities"
    },
    {
      title: "Smart City Innovation Award",
      organization: "Smart Cities Connect",
      year: "2023",
      description: "Excellence in developing technology solutions that improve urban mobility for all residents"
    },
    {
      title: "Sustainability Impact Recognition",
      organization: "Green Transit Alliance",
      year: "2024",
      description: "Achievement in reducing environmental impact while improving accessibility"
    }
  ];

  const commitments = [
    {
      title: "WCAG 2.1 AA Compliance",
      description: "Full compliance with Web Content Accessibility Guidelines Level AA standards",
      status: "Achieved"
    },
    {
      title: "Section 508 Conformance",
      description: "Meeting federal accessibility requirements for government partnerships",
      status: "Certified"
    },
    {
      title: "ADA Transportation Compliance",
      description: "Ensuring all transit solutions meet Americans with Disabilities Act requirements",
      status: "Verified"
    },
    {
      title: "ISO 14289 PDF Accessibility",
      description: "Accessible document standards for all downloadable reports and materials",
      status: "Implemented"
    },
    {
      title: "Mobile Accessibility Standards",
      description: "iOS and Android accessibility guidelines compliance for all mobile apps",
      status: "Ongoing"
    }
  ];

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
              <h1 className="text-xl font-bold text-foreground">Accessibility & Social Impact</h1>
            </div>
            <Link to="/case-studies" className="text-foreground hover:text-primary transition-colors">
              Case Studies
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Accessible Transit for Everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            We're committed to creating inclusive transportation solutions that serve all members of our communities, 
            regardless of ability, age, income, or background. Our technology breaks down barriers and creates opportunities 
            for everyone to access reliable, dignified public transportation.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              <span>WCAG 2.1 AA Compliant</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-success" />
              <span>4 Accessibility Awards</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-info" />
              <span>Universal Design Principles</span>
            </div>
          </div>
        </div>

        {/* Accessibility Commitment */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Accessibility Commitment
          </h2>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Universal Design Philosophy</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We believe that accessible design benefits everyone. Our solutions are built from the ground up 
                    with universal design principles, ensuring that people of all abilities can independently access 
                    and use our transit technology with dignity and ease.
                  </p>
                  <div className="space-y-3">
                    {commitments.map((commitment, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground text-sm">{commitment.title}</div>
                          <div className="text-xs text-muted-foreground">{commitment.description}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          commitment.status === 'Achieved' || commitment.status === 'Certified' || commitment.status === 'Verified' || commitment.status === 'Implemented'
                            ? 'bg-success-100 text-success-700'
                            : 'bg-info-100 text-info-700'
                        }`}>
                          {commitment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-primary-50 rounded-lg">
                    <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Multi-Platform Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Web, mobile, kiosk, and SMS interfaces ensure everyone can access transit information in their preferred format.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-success-50 rounded-lg">
                    <Smartphone className="w-12 h-12 text-success mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Mobile-First Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimized for touch interfaces, voice commands, and assistive technologies with offline capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accessibility Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Comprehensive Accessibility Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {accessibilityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Social Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Creating Positive Social Impact
          </h2>
          <div className="space-y-8">
            {socialImpactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-success" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                            <p className="text-muted-foreground text-sm">{area.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {area.stats.map((stat, statIndex) => (
                            <div key={statIndex} className="text-center p-3 bg-muted/50 rounded-lg">
                              <div className="text-2xl font-bold text-success">{stat.value}</div>
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <h4 className="font-semibold text-foreground mb-4">Key Initiatives</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {area.initiatives.map((initiative, initIndex) => (
                            <div key={initIndex} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{initiative}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Community Partnerships
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                We collaborate with leading advocacy organizations, community groups, and accessibility experts 
                to ensure our solutions truly serve the needs of all community members.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerships.map((partnership, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{partnership.organization}</h4>
                        <span className="text-xs text-primary">{partnership.type}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{partnership.collaboration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{award.title}</h3>
                      <div className="text-sm text-primary font-medium mb-1">
                        {award.organization} • {award.year}
                      </div>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact & Resources */}
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Accessibility Resources & Support
            </h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              Need assistance with accessibility features? Have suggestions for improvements? 
              Our dedicated accessibility team is here to help ensure everyone can use our services effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 border border-border rounded-lg">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Accessibility Support</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get help with accessibility features
                </p>
                <Button variant="outline" className="w-full">
                  accessibility@busai.com
                </Button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <ExternalLink className="w-8 h-8 text-success mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">User Guides</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Step-by-step accessibility guides
                </p>
                <Button variant="outline" className="w-full">
                  View Resources
                </Button>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <Users className="w-8 h-8 text-info mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Community Forum</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect with other users
                </p>
                <Button variant="outline" className="w-full">
                  Join Community
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-600">
                Request Accessibility Demo
              </Button>
              <Button size="lg" variant="outline">
                Download Accessibility Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
