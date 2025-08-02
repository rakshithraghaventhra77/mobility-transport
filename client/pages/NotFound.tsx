import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Visual */}
        <div className="mb-12">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-success to-info bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Suggested Actions */}
        <Card className="dark-card-bg border-primary/20 mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              What would you like to do?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/">
                <Button className="w-full bg-primary hover:bg-primary-600 h-14">
                  <Home className="w-5 h-5 mr-3" />
                  Return to Home
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 h-14">
                  <Search className="w-5 h-5 mr-3" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link to="/accessibility" className="p-4 rounded-lg glass-effect hover:bg-primary/10 transition-colors">
            <div className="font-medium text-foreground mb-1">Accessibility</div>
            <div className="text-muted-foreground">Social Impact</div>
          </Link>
          <Link to="/case-studies" className="p-4 rounded-lg glass-effect hover:bg-primary/10 transition-colors">
            <div className="font-medium text-foreground mb-1">Case Studies</div>
            <div className="text-muted-foreground">Success Stories</div>
          </Link>
          <Link to="/testimonials" className="p-4 rounded-lg glass-effect hover:bg-primary/10 transition-colors">
            <div className="font-medium text-foreground mb-1">Testimonials</div>
            <div className="text-muted-foreground">Client Reviews</div>
          </Link>
          <Link to="/faq" className="p-4 rounded-lg glass-effect hover:bg-primary/10 transition-colors">
            <div className="font-medium text-foreground mb-1">FAQ</div>
            <div className="text-muted-foreground">Get Answers</div>
          </Link>
        </div>

        {/* Error Information */}
        <div className="mt-12 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Error Code:</strong> 404 - Page Not Found<br />
            <strong>Requested Path:</strong> {location.pathname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
