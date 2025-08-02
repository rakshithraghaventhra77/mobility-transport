import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Blog() {
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
              <h1 className="text-xl font-bold text-foreground">Blog & News</h1>
            </div>
            <Link to="/developers" className="text-foreground hover:text-primary transition-colors">
              Developer Resources
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-12">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Blog Coming Soon
            </h1>
            <p className="text-muted-foreground mb-8">
              We're working on bringing you the latest insights about AI-powered transit,
              smart city innovations, and sustainability initiatives. Stay tuned!
            </p>
            <div className="space-y-4">
              <Button className="w-full max-w-sm">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe for Updates
              </Button>
              <div className="text-sm text-muted-foreground">
                Get notified when we publish new content
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
