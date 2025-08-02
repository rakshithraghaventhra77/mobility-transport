import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data structures
interface Bus {
  id: string;
  type: 'bus' | 'metro' | 'cab';
  position: [number, number];
  route: string;
  routeId: string;
  eta: string;
  occupancy: 'Low' | 'Medium' | 'High';
  speed: number; // km/h
  direction: number; // degrees
  lastUpdate: Date;
  nextStop: string;
  delay: number; // minutes
}

interface Stop {
  id: string;
  name: string;
  position: [number, number];
  routes: string[];
}

interface Route {
  id: string;
  name: string;
  stops: string[];
  path: [number, number][];
  estimatedDuration: number; // minutes
  frequency: number; // minutes between buses
}

interface RouteSearchResult {
  route: Route;
  totalTime: number;
  transfers: number;
  stops: Stop[];
}

// Mock data
const mockBuses: Bus[] = [
  {
    id: 'BUS001',
    type: 'bus',
    position: [40.7128, -74.0060],
    route: 'Route 1',
    routeId: 'route1',
    eta: '5 mins',
    occupancy: 'Medium',
    speed: 25,
    direction: 45,
    lastUpdate: new Date(),
    nextStop: 'Times Square',
    delay: 2
  },
  {
    id: 'BUS002',
    type: 'bus',
    position: [40.7138, -74.0070],
    route: 'Route 2',
    routeId: 'route2',
    eta: '3 mins',
    occupancy: 'High',
    speed: 30,
    direction: 90,
    lastUpdate: new Date(),
    nextStop: 'Central Park',
    delay: 0
  },
  {
    id: 'METRO001',
    type: 'metro',
    position: [40.7148, -74.0080],
    route: 'Blue Line',
    routeId: 'metro1',
    eta: '2 mins',
    occupancy: 'Low',
    speed: 35,
    direction: 180,
    lastUpdate: new Date(),
    nextStop: 'Grand Central',
    delay: -1
  }
];

const mockStops: Stop[] = [
  { id: 'stop1', name: 'Times Square', position: [40.7580, -73.9855], routes: ['route1', 'route2'] },
  { id: 'stop2', name: 'Central Park', position: [40.7829, -73.9654], routes: ['route1', 'route3'] },
  { id: 'stop3', name: 'Grand Central', position: [40.7527, -73.9772], routes: ['metro1', 'route2'] },
  { id: 'stop4', name: 'Brooklyn Bridge', position: [40.7061, -73.9969], routes: ['route1', 'metro1'] },
  { id: 'stop5', name: 'Empire State', position: [40.7484, -73.9857], routes: ['route2', 'route3'] }
];

const mockRoutes: Route[] = [
  {
    id: 'route1',
    name: 'Route 1',
    stops: ['stop1', 'stop2', 'stop4'],
    path: [[40.7580, -73.9855], [40.7829, -73.9654], [40.7061, -73.9969]],
    estimatedDuration: 25,
    frequency: 10
  },
  {
    id: 'route2',
    name: 'Route 2',
    stops: ['stop1', 'stop3', 'stop5'],
    path: [[40.7580, -73.9855], [40.7527, -73.9772], [40.7484, -73.9857]],
    estimatedDuration: 20,
    frequency: 8
  },
  {
    id: 'metro1',
    name: 'Blue Line',
    stops: ['stop3', 'stop4'],
    path: [[40.7527, -73.9772], [40.7061, -73.9969]],
    estimatedDuration: 15,
    frequency: 5
  }
];

// Custom marker icons
const createBusIcon = (type: 'bus' | 'metro' | 'cab', occupancy: string) => {
  const color = {
    bus: '#0891b2',
    metro: '#16a34a',
    cab: '#ea580c',
  }[type];

  const occupancyColor = {
    Low: '#10b981',
    Medium: '#f59e0b',
    High: '#ef4444'
  }[occupancy];

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color}20;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px ${color}80;
        border: 2px solid ${color};
        position: relative;
      ">
        <div style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: ${occupancyColor};
          border-radius: 50%;
          border: 2px solid white;
        "></div>
        <img src="/icons/${type}.svg" alt="${type}" style="width: 16px; height: 16px; filter: brightness(0) invert(1);" />
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const createStopIcon = () => {
  return L.divIcon({
    className: 'stop-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #6b7280;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 5px #6b728080;
        border: 2px solid #374151;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  onBusClick?: (bus: Bus) => void;
  onStopClick?: (stop: Stop) => void;
  selectedRoute?: string;
  searchFrom?: string;
  searchTo?: string;
}

// AI Agent for ETA predictions
class TransitAI {
  private busHistory: Map<string, { speed: number; delays: number[] }> = new Map();

  updateBusData(busId: string, speed: number, delay: number) {
    if (!this.busHistory.has(busId)) {
      this.busHistory.set(busId, { speed: 0, delays: [] });
    }
    
    const history = this.busHistory.get(busId)!;
    history.speed = (history.speed + speed) / 2; // Moving average
    history.delays.push(delay);
    
    // Keep only last 10 delays
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

  suggestRoute(from: string, to: string): RouteSearchResult[] {
    // Simple route finding algorithm
    const results: RouteSearchResult[] = [];
    
    for (const route of mockRoutes) {
      const fromStop = route.stops.find(stop => stop === from);
      const toStop = route.stops.find(stop => stop === to);
      
      if (fromStop && toStop) {
        results.push({
          route,
          totalTime: route.estimatedDuration,
          transfers: 0,
          stops: route.stops.map(id => mockStops.find(s => s.id === id)!)
        });
      }
    }
    
    return results.sort((a, b) => a.totalTime - b.totalTime);
  }
}

const transitAI = new TransitAI();

function MapComponent({ 
  center, 
  zoom, 
  onBusClick, 
  onStopClick, 
  selectedRoute,
  searchFrom,
  searchTo 
}: MapComponentProps) {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [stops, setStops] = useState<Stop[]>(mockStops);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [selectedBuses, setSelectedBuses] = useState<Set<string>>(new Set());
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [searchResults, setSearchResults] = useState<RouteSearchResult[]>([]);

  // Update bus positions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          // Simulate movement
          const speedKmH = bus.speed;
          const speedDegrees = speedKmH / 111000; // Convert km/h to degrees per second
          const timeDiff = 5; // 5 seconds
          
          const newLat = bus.position[0] + (Math.random() - 0.5) * speedDegrees * timeDiff;
          const newLng = bus.position[1] + (Math.random() - 0.5) * speedDegrees * timeDiff;
          
          // Update AI with new data
          transitAI.updateBusData(bus.id, bus.speed, bus.delay);
          
          return {
            ...bus,
            position: [newLat, newLng],
            lastUpdate: new Date(),
            delay: bus.delay + (Math.random() - 0.5) * 2 // Random delay change
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle route selection
  useEffect(() => {
    if (selectedRoute) {
      const route = routes.find(r => r.id === selectedRoute);
      if (route) {
        setRoutePath(route.path);
      }
    } else {
      setRoutePath([]);
    }
  }, [selectedRoute, routes]);

  // Handle route search
  useEffect(() => {
    if (searchFrom && searchTo) {
      const results = transitAI.suggestRoute(searchFrom, searchTo);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchFrom, searchTo]);

  const handleBusClick = useCallback((bus: Bus) => {
    setSelectedBuses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bus.id)) {
        newSet.delete(bus.id);
      } else {
        newSet.add(bus.id);
      }
      return newSet;
    });
    
    onBusClick?.(bus);
  }, [onBusClick]);

  const handleStopClick = useCallback((stop: Stop) => {
    onStopClick?.(stop);
  }, [onStopClick]);

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Route paths */}
      {routePath.length > 0 && (
        <Polyline
          positions={routePath}
          color="#0891b2"
          weight={3}
          opacity={0.7}
        />
      )}
      
      {/* Search results */}
      {searchResults.map((result, index) => (
        <Polyline
          key={index}
          positions={result.route.path}
          color="#16a34a"
          weight={2}
          opacity={0.5}
          dashArray="5, 5"
        />
      ))}
      
      {/* Bus markers */}
      <LayerGroup>
        {buses.map(bus => (
          <Marker
            key={bus.id}
            position={bus.position}
            icon={createBusIcon(bus.type, bus.occupancy)}
            eventHandlers={{
              click: () => handleBusClick(bus)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold mb-2 text-foreground">
                  {bus.type.toUpperCase()} {bus.id}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Route: {bus.route}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  ETA: {bus.eta}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Next Stop: {bus.nextStop}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Occupancy: {bus.occupancy}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Speed: {bus.speed} km/h
                </p>
                <p className="text-sm text-muted-foreground">
                  Delay: {bus.delay > 0 ? '+' : ''}{bus.delay} min
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
      
      {/* Stop markers */}
      <LayerGroup>
        {stops.map(stop => (
          <Marker
            key={stop.id}
            position={stop.position}
            icon={createStopIcon()}
            eventHandlers={{
              click: () => handleStopClick(stop)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold mb-2 text-foreground">
                  {stop.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Routes: {stop.routes.join(', ')}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
    </MapContainer>
  );
}

export { MapComponent, type Bus, type Stop, type Route, type RouteSearchResult, transitAI };