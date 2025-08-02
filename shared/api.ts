// Urban Mobility Bus Agent - Shared Types and Interfaces

// Core Bus Types
export interface BusLocation {
  busId: string;
  routeId: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  timestamp: Date;
  occupancy: OccupancyStatus;
  status: BusStatus;
  nextStopId?: string;
  estimatedArrival?: Date;
}

export interface BusStatus {
  code: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'BREAKDOWN' | 'OFFLINE';
  message?: string;
  lastUpdated: Date;
}

export interface OccupancyStatus {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'FULL';
  percentage: number;
  seatsAvailable: number;
  totalSeats: number;
  standingAvailable: number;
  totalStanding: number;
  lastUpdated: Date;
}

// Route and Stop Types
export interface Route {
  id: string;
  name: string;
  description: string;
  stops: Stop[];
  schedule: Schedule[];
  color: string;
  isActive: boolean;
  averageDuration: number; // in minutes
  distance: number; // in kilometers
}

export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  facilities: string[];
  accessibility: boolean;
  realTimeUpdates: boolean;
}

export interface Schedule {
  id: string;
  routeId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  departures: string[]; // HH:MM format
  isActive: boolean;
}

// ETA and Prediction Types
export interface ETA {
  busId: string;
  stopId: string;
  estimatedArrival: Date;
  confidence: number; // 0-1
  factors: ETAPredictionFactor[];
  lastUpdated: Date;
}

export interface ETAPredictionFactor {
  type: 'TRAFFIC' | 'WEATHER' | 'HISTORICAL' | 'REAL_TIME' | 'INCIDENT';
  impact: number; // -1 to 1 (negative = delay, positive = early)
  description: string;
}

// Analytics and Reporting Types
export interface RouteAnalytics {
  routeId: string;
  period: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  data: {
    timestamp: Date;
    ridership: number;
    averageOccupancy: number;
    onTimePerformance: number;
    averageWaitTime: number;
    revenue?: number;
  }[];
}

export interface SystemAnalytics {
  totalBuses: number;
  activeBuses: number;
  totalRoutes: number;
  activeRoutes: number;
  totalStops: number;
  currentRidership: number;
  systemHealth: SystemHealth;
  alerts: Alert[];
}

export interface SystemHealth {
  overall: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  components: {
    gps: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    occupancy: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    communication: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    database: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  };
  lastUpdated: Date;
}

// Alert and Notification Types
export interface Alert {
  id: string;
  type: 'DELAY' | 'CANCELLATION' | 'DETOUR' | 'CROWDING' | 'TECHNICAL' | 'WEATHER';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  affectedRoutes: string[];
  affectedStops: string[];
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId?: string;
  type: 'PUSH' | 'EMAIL' | 'SMS' | 'IN_APP';
  title: string;
  message: string;
  data?: Record<string, any>;
  sentAt: Date;
  readAt?: Date;
}

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'COMMUTER' | 'OPERATOR' | 'ADMIN';
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  favoriteRoutes: string[];
  homeStop?: string;
  workStop?: string;
  notifications: {
    delays: boolean;
    crowding: boolean;
    routeChanges: boolean;
    weather: boolean;
  };
  accessibility: {
    wheelchair: boolean;
    visual: boolean;
    audio: boolean;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Real-time Event Types
export interface BusUpdateEvent {
  type: 'LOCATION_UPDATE' | 'OCCUPANCY_UPDATE' | 'STATUS_CHANGE' | 'ETA_UPDATE';
  busId: string;
  data: BusLocation | OccupancyStatus | BusStatus | ETA;
  timestamp: Date;
}

export interface SystemEvent {
  type: 'ALERT_CREATED' | 'ALERT_RESOLVED' | 'SYSTEM_HEALTH_CHANGE' | 'ROUTE_UPDATE';
  data: Alert | SystemHealth | Route;
  timestamp: Date;
}

// External Integration Types
export interface ExternalTransportMode {
  type: 'METRO' | 'BIKE' | 'RIDE_HAILING' | 'WALKING';
  provider: string;
  eta: Date;
  cost?: number;
  distance: number;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

export interface MultimodalRoute {
  segments: {
    mode: ExternalTransportMode['type'];
    provider: string;
    startStop?: string;
    endStop?: string;
    duration: number;
    distance: number;
    cost?: number;
    instructions: string[];
  }[];
  totalDuration: number;
  totalDistance: number;
  totalCost?: number;
}

// Weather and Environmental Types
export interface WeatherData {
  temperature: number;
  condition: 'SUNNY' | 'CLOUDY' | 'RAINY' | 'SNOWY' | 'FOGGY';
  windSpeed: number;
  visibility: number;
  impact: 'NONE' | 'MINOR' | 'MODERATE' | 'SEVERE';
}

export interface EnvironmentalImpact {
  routeId: string;
  date: Date;
  co2Saved: number; // in kg
  fuelSaved: number; // in liters
  passengersServed: number;
}

// Machine Learning Model Types
export interface ETAModel {
  id: string;
  version: string;
  accuracy: number;
  features: string[];
  lastTrained: Date;
  isActive: boolean;
}

export interface OccupancyModel {
  id: string;
  version: string;
  accuracy: number;
  features: string[];
  lastTrained: Date;
  isActive: boolean;
}

// Sensor and IoT Types
export interface SensorData {
  sensorId: string;
  busId: string;
  type: 'OCCUPANCY' | 'TEMPERATURE' | 'HUMIDITY' | 'AIR_QUALITY' | 'VIBRATION';
  value: number;
  unit: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// API Endpoint Types
export interface BusLocationResponse extends ApiResponse<BusLocation[]> {}
export interface RouteResponse extends ApiResponse<Route[]> {}
export interface ETAResponse extends ApiResponse<ETA[]> {}
export interface AnalyticsResponse extends ApiResponse<RouteAnalytics> {}
export interface SystemHealthResponse extends ApiResponse<SystemHealth> {}
export interface AlertResponse extends ApiResponse<Alert[]> {}
export interface UserResponse extends ApiResponse<User> {}
export interface MultimodalRouteResponse extends ApiResponse<MultimodalRoute[]> {}

// WebSocket Event Types
export interface WebSocketMessage {
  type: 'BUS_UPDATE' | 'SYSTEM_UPDATE' | 'ALERT' | 'ETA_UPDATE';
  data: BusUpdateEvent | SystemEvent | Alert | ETA;
}

// Demo Response (keeping existing)
export interface DemoResponse {
  message: string;
  timestamp: Date;
}
