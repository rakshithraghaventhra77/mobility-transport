import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Award,
  Users,
  Building,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    role: '',
    organization: '',
    feedback: '',
    rating: 5
  });

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Director of Transportation",
      organization: "Metro City Transit Authority",
      photo: "/api/placeholder/64/64",
      quote: "BusAI has revolutionized our operations. We've seen a 28% reduction in passenger wait times and our on-time performance has improved to 94%. The real-time predictions are incredibly accurate.",
      benefit: "28% wait time reduction",
      rating: 5,
      location: "Metro City, CA"
    },
    {
      name: "James Chen",
      role: "Senior Transit Planner",
      organization: "Riverside Public Transport",
      photo: "/api/placeholder/64/64",
      quote: "The occupancy prediction feature has been game-changing. We can now optimize our fleet deployment based on real-time demand, reducing overcrowding by 35% during peak hours.",
      benefit: "35% overcrowding reduction",
      rating: 5,
      location: "Riverside, TX"
    },
    {
      name: "Dr. Sarah Williams",
      role: "Sustainability Officer",
      organization: "Green Valley Municipality",
      photo: "/api/placeholder/64/64",
      quote: "Not only have we improved service quality, but we've also reduced our carbon footprint by 22% through AI-optimized routing. It's a win-win for citizens and the environment.",
      benefit: "22% carbon reduction",
      rating: 5,
      location: "Green Valley, OR"
    },
    {
      name: "Michael Thompson",
      role: "Daily Commuter",
      organization: "Software Engineer",
      photo: "/api/placeholder/64/64",
      quote: "As someone who relies on public transit daily, the accuracy of arrival predictions has made my commute so much more reliable. I can plan my day with confidence.",
      benefit: "Improved commute reliability",
      rating: 5,
      location: "Metro City, CA"
    },
    {
      name: "Lisa Park",
      role: "Operations Manager",
      organization: "CityLink Bus Services",
      photo: "/api/placeholder/64/64",
      quote: "The administrative dashboard provides insights we never had before. We've optimized 12 routes and reduced operational costs by $1.2M annually while improving service quality.",
      benefit: "$1.2M annual savings",
      rating: 5,
      location: "Northside, WA"
    },
    {
      name: "Robert Kumar",
      role: "Fleet Coordinator",
      organization: "Urban Transit Network",
      photo: "/api/placeholder/64/64",
      quote: "Real-time incident management has reduced our response time to service disruptions by 60%. Passengers receive immediate updates, and we can reroute buses proactively.",
      benefit: "60% faster incident response",
      rating: 5,
      location: "Central Valley, NV"
    }
  ];

  const partnerLogos = [
    { name: "Metro City Transit", logo: "/api/placeholder/120/60" },
    { name: "Riverside Transport", logo: "/api/placeholder/120/60" },
    { name: "Green Valley Municipality", logo: "/api/placeholder/120/60" },
    { name: "CityLink Services", logo: "/api/placeholder/120/60" },
    { name: "Urban Transit Network", logo: "/api/placeholder/120/60" },
    { name: "Valley Metro", logo: "/api/placeholder/120/60" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    alert('Thank you for your feedback! We appreciate your input.');
    setFeedbackForm({ name: '', role: '', organization: '', feedback: '', rating: 5 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({ ...prev, [name]: value }));
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
              <h1 className="text-xl font-bold text-foreground">Success Stories</h1>
            </div>
            <Link to="/analytics" className="text-foreground hover:text-primary transition-colors">
              View Analytics
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Real Impact for Real Cities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how cities worldwide are transforming their public transit systems with BusAI, 
            delivering measurable improvements in efficiency, sustainability, and passenger satisfaction.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-success" />
              <span>15+ Cities Deployed</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              <span>2M+ Riders Served</span>
            </div>
            <div className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-info" />
              <span>98% Satisfaction Rate</span>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Carousel */}
        <Card className="mb-16 max-w-5xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentTestimonial].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-primary font-medium">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentTestimonial].organization}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {testimonials[currentTestimonial].benefit}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Testimonials Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            What Our Partners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote.length > 150 
                      ? testimonial.quote.substring(0, 150) + '...' 
                      : testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-primary font-medium">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.organization}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-success-50 rounded-lg">
                    <div className="text-sm font-semibold text-success-700">
                      {testimonial.benefit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trusted Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Trusted by Leading Transit Authorities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-12 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-medium">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Form */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Share Your Experience
              </h3>
              <p className="text-muted-foreground">
                Help us improve by sharing your feedback about BusAI or your interest in implementing our solution.
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={feedbackForm.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="role"
                  placeholder="Your Role/Title"
                  value={feedbackForm.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Input
                type="text"
                name="organization"
                placeholder="Organization/Transit Authority"
                value={feedbackForm.organization}
                onChange={handleInputChange}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedbackForm(prev => ({ ...prev, rating }))}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= feedbackForm.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <Textarea
                name="feedback"
                placeholder="Share your experience with BusAI or your interest in our solution..."
                value={feedbackForm.feedback}
                onChange={handleInputChange}
                rows={5}
                required
              />

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-600">
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
