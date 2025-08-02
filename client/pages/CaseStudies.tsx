import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CaseStudies() {
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
              <h1 className="text-xl font-bold text-foreground">Case Studies</h1>
            </div>
            <Link to="/testimonials" className="text-foreground hover:text-primary transition-colors">
              Success Stories
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-12">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Case Studies in Development
            </h1>
            <p className="text-muted-foreground mb-8">
              We're preparing detailed case studies showcasing real results from our 
              BusAI implementations across various cities. These will include before/after 
              metrics, deployment maps, and comprehensive impact analysis.
            </p>
            <div className="space-y-4">
              <Button className="w-full max-w-sm">
                <Download className="w-4 h-4 mr-2" />
                Request Early Access
              </Button>
              <div className="text-sm text-muted-foreground">
                Be the first to access our case studies when they're ready
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                Available Now:
              </h3>
              <div className="space-y-2">
                <Link to="/testimonials" className="block text-primary hover:underline">
                  Customer Success Stories & Testimonials
                </Link>
                <Link to="/analytics" className="block text-primary hover:underline">
                  Analytics & Impact Dashboard
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
