import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MessageSquare, Send } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface FeedbackData {
  rating: number;
  category: string;
  route?: string;
  stop?: string;
  message: string;
  contactEmail?: string;
}

const feedbackCategories = [
  'Service Quality',
  'Punctuality',
  'Cleanliness',
  'Safety',
  'Accessibility',
  'Information',
  'Other'
];

const mockRoutes = [
  'Route 1',
  'Route 2',
  'Blue Line',
  'All Routes'
];

const mockStops = [
  'Times Square',
  'Central Park',
  'Grand Central',
  'Brooklyn Bridge',
  'Empire State',
  'Any Stop'
];

export function FeedbackForm({ onSubmit, isOpen, onOpenChange }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  const [stop, setStop] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !category || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    const feedbackData: FeedbackData = {
      rating,
      category,
      route: route || undefined,
      stop: stop || undefined,
      message: message.trim(),
      contactEmail: contactEmail || undefined
    };

    try {
      await onSubmit(feedbackData);
      
      // Reset form
      setRating(0);
      setCategory('');
      setRoute('');
      setStop('');
      setMessage('');
      setContactEmail('');
      
      onOpenChange?.(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Passenger Feedback
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Overall Rating</Label>
            {renderStars()}
            <p className="text-sm text-muted-foreground">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                {feedbackCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Route (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="route">Route (Optional)</Label>
            <Select value={route} onValueChange={setRoute}>
              <SelectTrigger>
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                {mockRoutes.map(routeName => (
                  <SelectItem key={routeName} value={routeName}>
                    {routeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stop (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="stop">Stop (Optional)</Label>
            <Select value={stop} onValueChange={setStop}>
              <SelectTrigger>
                <SelectValue placeholder="Select stop" />
              </SelectTrigger>
              <SelectContent>
                {mockStops.map(stopName => (
                  <SelectItem key={stopName} value={stopName}>
                    {stopName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Feedback</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Contact Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              We'll only use this to follow up on your feedback
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={rating === 0 || !category || !message.trim() || isSubmitting}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Feedback summary component
export function FeedbackSummary() {
  const mockFeedbackStats = {
    totalResponses: 1247,
    averageRating: 4.2,
    recentResponses: 23,
    topCategories: [
      { category: 'Service Quality', count: 45 },
      { category: 'Punctuality', count: 38 },
      { category: 'Cleanliness', count: 32 },
      { category: 'Safety', count: 28 }
    ]
  };

  return (
    <Card className="light-card-bg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Recent Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mockFeedbackStats.averageRating}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {mockFeedbackStats.recentResponses}
            </div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Top Categories</h4>
          {mockFeedbackStats.topCategories.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.category}</span>
              <span className="text-sm font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 