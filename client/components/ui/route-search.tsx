import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, MapPin, Route, ArrowRight } from 'lucide-react';
import type { Stop, RouteSearchResult } from './map';

interface RouteSearchProps {
  stops: Stop[];
  onSearch: (from: string, to: string) => void;
  searchResults: RouteSearchResult[];
  isLoading?: boolean;
}

export function RouteSearch({ stops, onSearch, searchResults, isLoading }: RouteSearchProps) {
  const [fromStop, setFromStop] = useState<string>('');
  const [toStop, setToStop] = useState<string>('');

  const handleSearch = () => {
    if (fromStop && toStop) {
      onSearch(fromStop, toStop);
    }
  };

  const handleSwapStops = () => {
    setFromStop(toStop);
    setToStop(fromStop);
  };

  return (
    <Card className="light-card-bg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="w-5 h-5" />
          Route Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Form */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label htmlFor="from-stop">From</Label>
              <Select value={fromStop} onValueChange={setFromStop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select departure stop" />
                </SelectTrigger>
                <SelectContent>
                  {stops.map(stop => (
                    <SelectItem key={stop.id} value={stop.id}>
                      {stop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapStops}
                className="rounded-full w-8 h-8 p-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to-stop">To</Label>
              <Select value={toStop} onValueChange={setToStop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination stop" />
                </SelectTrigger>
                <SelectContent>
                  {stops.map(stop => (
                    <SelectItem key={stop.id} value={stop.id}>
                      {stop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch} 
            disabled={!fromStop || !toStop || isLoading}
            className="w-full"
          >
            {isLoading ? 'Searching...' : 'Find Route'}
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Found Routes</h3>
            {searchResults.map((result, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{result.route.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {result.totalTime} min
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {result.stops.length} stops
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Transfers: {result.transfers}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Frequency: Every {result.route.frequency} minutes
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 