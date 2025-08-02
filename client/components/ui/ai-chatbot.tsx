import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Send, Bot, Clock, MapPin, Bus, X } from 'lucide-react';
import type { Bus, Stop } from './map';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  data?: any;
}

interface AIChatbotProps {
  buses: Bus[];
  stops: Stop[];
  onETARequest?: (busId: string, stopId: string) => Promise<number>;
}

// Simple AI logic for transit queries
class TransitAI {
  private busHistory: Map<string, { speed: number; delays: number[] }> = new Map();

  updateBusData(busId: string, speed: number, delay: number) {
    if (!this.busHistory.has(busId)) {
      this.busHistory.set(busId, { speed: 0, delays: [] });
    }
    
    const history = this.busHistory.get(busId)!;
    history.speed = (history.speed + speed) / 2;
    history.delays.push(delay);
    
    if (history.delays.length > 10) {
      history.delays.shift();
    }
  }

  predictETA(busId: string, distance: number): number {
    const history = this.busHistory.get(busId);
    if (!history) return distance / 25; // Default 25 km/h

    const avgSpeed = history.speed;
    const avgDelay = history.delays.reduce((a, b) => a + b, 0) / history.delays.length;
    
    const baseTime = distance / avgSpeed * 60; // Convert to minutes
    return baseTime + avgDelay;
  }

  processQuery(query: string, buses: Bus[], stops: Stop[]): string {
    const lowerQuery = query.toLowerCase();
    
    // ETA queries
    if (lowerQuery.includes('eta') || lowerQuery.includes('arrival') || lowerQuery.includes('when')) {
      const busMatch = buses.find(bus => 
        lowerQuery.includes(bus.id.toLowerCase()) || 
        lowerQuery.includes(bus.route.toLowerCase())
      );
      
      if (busMatch) {
        const eta = this.predictETA(busMatch.id, 2.5); // Mock distance
        return `The estimated arrival time for ${busMatch.route} (${busMatch.id}) is ${Math.round(eta)} minutes. Current delay: ${busMatch.delay > 0 ? '+' : ''}${busMatch.delay} minutes.`;
      }
    }

    // Route queries
    if (lowerQuery.includes('route') || lowerQuery.includes('line')) {
      const routes = [...new Set(buses.map(bus => bus.route))];
      return `Available routes: ${routes.join(', ')}. Which route would you like information about?`;
    }

    // Stop queries
    if (lowerQuery.includes('stop') || lowerQuery.includes('station')) {
      const stopNames = stops.map(stop => stop.name);
      return `Available stops: ${stopNames.join(', ')}. Which stop would you like information about?`;
    }

    // Schedule queries
    if (lowerQuery.includes('schedule') || lowerQuery.includes('frequency')) {
      return `Buses run every 5-15 minutes depending on the route. Peak hours (7-9 AM, 5-7 PM) have more frequent service.`;
    }

    // General help
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
      return `I can help you with:
• Real-time bus arrival times
• Route information and schedules
• Stop locations and services
• Service updates and delays
• General transit information

Just ask me anything about the transit system!`;
    }

    // Default response
    return `I'm here to help with transit information! You can ask me about arrival times, routes, stops, schedules, or any other transit-related questions.`;
  }

  generateQuickReplies(): string[] {
    return [
      "When is the next bus?",
      "Show me Route 1 schedule",
      "What stops are available?",
      "Is there a delay?",
      "Help me find a route"
    ];
  }
}

const transitAI = new TransitAI();

export function AIChatbot({ buses, stops, onETARequest }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your transit assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update AI with bus data
  useEffect(() => {
    buses.forEach(bus => {
      transitAI.updateBusData(bus.id, bus.speed, bus.delay);
    });
  }, [buses]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse = transitAI.processQuery(inputValue, buses, stops);
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  const quickReplies = transitAI.generateQuickReplies();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg">
          <Bot className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Transit AI Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about transit..."
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Live bus info component
export function LiveBusInfo({ buses }: { buses: Bus[] }) {
  const activeBuses = buses.length;
  const delayedBuses = buses.filter(bus => bus.delay > 0).length;
  const avgSpeed = buses.reduce((sum, bus) => sum + bus.speed, 0) / buses.length;

  return (
    <Card className="light-card-bg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="w-5 h-5" />
          Live Bus Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{activeBuses}</div>
            <div className="text-sm text-muted-foreground">Active Buses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{delayedBuses}</div>
            <div className="text-sm text-muted-foreground">Delayed</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Average Speed</span>
            <span className="text-sm font-medium">{avgSpeed.toFixed(1)} km/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">System Status</span>
            <span className="text-sm font-medium text-success">Operational</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 