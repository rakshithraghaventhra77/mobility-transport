import { RequestHandler } from "express";
import { 
  Route, 
  RouteResponse, 
  Stop, 
  Schedule,
  ApiResponse 
} from "@shared/api";

// In-memory storage for demo purposes
let routes: Map<string, Route> = new Map();
let stops: Map<string, Stop> = new Map();
let schedules: Map<string, Schedule> = new Map();

// Initialize demo data
const initializeDemoData = () => {
  // Demo stops
  const demoStops: Stop[] = [
    {
      id: "STOP_001",
      name: "Central Station",
      latitude: 40.7128,
      longitude: -74.0060,
      address: "123 Main St, New York, NY",
      facilities: ["WHEELCHAIR_ACCESS", "SHELTER", "BENCHES", "DIGITAL_DISPLAY"],
      accessibility: true,
      realTimeUpdates: true
    },
    {
      id: "STOP_002",
      name: "Downtown Terminal",
      latitude: 40.7589,
      longitude: -73.9851,
      address: "456 Broadway, New York, NY",
      facilities: ["WHEELCHAIR_ACCESS", "SHELTER", "BENCHES"],
      accessibility: true,
      realTimeUpdates: true
    },
    {
      id: "STOP_003",
      name: "University Campus",
      latitude: 40.7505,
      longitude: -73.9934,
      address: "789 University Ave, New York, NY",
      facilities: ["WHEELCHAIR_ACCESS", "SHELTER", "BENCHES", "BIKE_RACK"],
      accessibility: true,
      realTimeUpdates: true
    },
    {
      id: "STOP_004",
      name: "Shopping Center",
      latitude: 40.7614,
      longitude: -73.9776,
      address: "321 5th Ave, New York, NY",
      facilities: ["WHEELCHAIR_ACCESS", "SHELTER", "BENCHES", "DIGITAL_DISPLAY"],
      accessibility: true,
      realTimeUpdates: true
    }
  ];

  // Demo routes
  const demoRoutes: Route[] = [
    {
      id: "ROUTE_1",
      name: "Downtown Express",
      description: "Fast service between Central Station and Downtown Terminal",
      stops: [demoStops[0], demoStops[1]],
      schedule: [],
      color: "#FF6B6B",
      isActive: true,
      averageDuration: 15,
      distance: 3.2
    },
    {
      id: "ROUTE_2",
      name: "University Line",
      description: "Connects Downtown Terminal to University Campus",
      stops: [demoStops[1], demoStops[2]],
      schedule: [],
      color: "#4ECDC4",
      isActive: true,
      averageDuration: 12,
      distance: 2.8
    },
    {
      id: "ROUTE_3",
      name: "Shopping District",
      description: "Service to major shopping areas",
      stops: [demoStops[1], demoStops[3]],
      schedule: [],
      color: "#45B7D1",
      isActive: true,
      averageDuration: 8,
      distance: 1.5
    }
  ];

  // Demo schedules
  const demoSchedules: Schedule[] = [
    {
      id: "SCHEDULE_1",
      routeId: "ROUTE_1",
      dayOfWeek: 1, // Monday
      departures: ["06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00"],
      isActive: true
    },
    {
      id: "SCHEDULE_2",
      routeId: "ROUTE_1",
      dayOfWeek: 2, // Tuesday
      departures: ["06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00"],
      isActive: true
    },
    {
      id: "SCHEDULE_3",
      routeId: "ROUTE_2",
      dayOfWeek: 1, // Monday
      departures: ["07:00", "07:20", "07:40", "08:00", "08:20", "08:40", "09:00"],
      isActive: true
    }
  ];

  // Populate maps
  demoStops.forEach(stop => stops.set(stop.id, stop));
  demoRoutes.forEach(route => routes.set(route.id, route));
  demoSchedules.forEach(schedule => schedules.set(schedule.id, schedule));
};

initializeDemoData();

// Get all routes
export const getRoutes: RequestHandler = async (req, res) => {
  try {
    const routesList = Array.from(routes.values());
    const response: RouteResponse = {
      success: true,
      data: routesList,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: RouteResponse = {
      success: false,
      error: "Failed to fetch routes",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get route by ID
export const getRoute: RequestHandler = async (req, res) => {
  try {
    const { routeId } = req.params;
    const route = routes.get(routeId);
    
    if (!route) {
      const response: RouteResponse = {
        success: false,
        error: "Route not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: RouteResponse = {
      success: true,
      data: [route],
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: RouteResponse = {
      success: false,
      error: "Failed to fetch route",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Create new route
export const createRoute: RequestHandler = async (req, res) => {
  try {
    const routeData: Omit<Route, 'id'> = req.body;
    const routeId = `ROUTE_${Date.now()}`;
    
    const newRoute: Route = {
      id: routeId,
      ...routeData
    };

    routes.set(routeId, newRoute);

    const response: RouteResponse = {
      success: true,
      data: [newRoute],
      message: "Route created successfully",
      timestamp: new Date()
    };
    res.status(201).json(response);
  } catch (error) {
    const response: RouteResponse = {
      success: false,
      error: "Failed to create route",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Update route
export const updateRoute: RequestHandler = async (req, res) => {
  try {
    const { routeId } = req.params;
    const updateData: Partial<Route> = req.body;
    
    const existingRoute = routes.get(routeId);
    if (!existingRoute) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Route not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const updatedRoute: Route = {
      ...existingRoute,
      ...updateData
    };

    routes.set(routeId, updatedRoute);

    const response: RouteResponse = {
      success: true,
      data: [updatedRoute],
      message: "Route updated successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: RouteResponse = {
      success: false,
      error: "Failed to update route",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Delete route
export const deleteRoute: RequestHandler = async (req, res) => {
  try {
    const { routeId } = req.params;
    
    if (!routes.has(routeId)) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Route not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    routes.delete(routeId);

    const response: ApiResponse<null> = {
      success: true,
      message: "Route deleted successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to delete route",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get all stops
export const getStops: RequestHandler = async (req, res) => {
  try {
    const stopsList = Array.from(stops.values());
    const response: ApiResponse<Stop[]> = {
      success: true,
      data: stopsList,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch stops",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get stop by ID
export const getStop: RequestHandler = async (req, res) => {
  try {
    const { stopId } = req.params;
    const stop = stops.get(stopId);
    
    if (!stop) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Stop not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Stop> = {
      success: true,
      data: stop,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch stop",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Create new stop
export const createStop: RequestHandler = async (req, res) => {
  try {
    const stopData: Omit<Stop, 'id'> = req.body;
    const stopId = `STOP_${Date.now()}`;
    
    const newStop: Stop = {
      id: stopId,
      ...stopData
    };

    stops.set(stopId, newStop);

    const response: ApiResponse<Stop> = {
      success: true,
      data: newStop,
      message: "Stop created successfully",
      timestamp: new Date()
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to create stop",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get schedules for a route
export const getRouteSchedules: RequestHandler = async (req, res) => {
  try {
    const { routeId } = req.params;
    const routeSchedules = Array.from(schedules.values())
      .filter(schedule => schedule.routeId === routeId);

    const response: ApiResponse<Schedule[]> = {
      success: true,
      data: routeSchedules,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch schedules",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Create schedule
export const createSchedule: RequestHandler = async (req, res) => {
  try {
    const scheduleData: Omit<Schedule, 'id'> = req.body;
    const scheduleId = `SCHEDULE_${Date.now()}`;
    
    const newSchedule: Schedule = {
      id: scheduleId,
      ...scheduleData
    };

    schedules.set(scheduleId, newSchedule);

    const response: ApiResponse<Schedule> = {
      success: true,
      data: newSchedule,
      message: "Schedule created successfully",
      timestamp: new Date()
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to create schedule",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get routes near a location
export const getRoutesNearLocation: RequestHandler = async (req, res) => {
  try {
    const { latitude, longitude, radius = 1 } = req.query; // radius in km
    
    if (!latitude || !longitude) {
      const response: RouteResponse = {
        success: false,
        error: "Latitude and longitude are required",
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const radiusKm = parseFloat(radius as string);

    // Simple distance calculation (replace with proper geospatial query in production)
    const nearbyRoutes = Array.from(routes.values()).filter(route => {
      return route.stops.some(stop => {
        const distance = Math.sqrt(
          Math.pow(stop.latitude - lat, 2) + 
          Math.pow(stop.longitude - lng, 2)
        ) * 111; // Rough conversion to km
        return distance <= radiusKm;
      });
    });

    const response: RouteResponse = {
      success: true,
      data: nearbyRoutes,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: RouteResponse = {
      success: false,
      error: "Failed to fetch nearby routes",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
}; 