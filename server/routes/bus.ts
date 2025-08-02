import { RequestHandler } from "express";
import { 
  BusLocation, 
  BusLocationResponse, 
  ETA, 
  ETAResponse,
  OccupancyStatus,
  ApiResponse 
} from "@shared/api";

// In-memory storage for demo purposes (replace with database in production)
let busLocations: Map<string, BusLocation> = new Map();
let busETAs: Map<string, ETA[]> = new Map();

// Simulated bus data for demo
const initializeDemoData = () => {
  const demoBuses = [
    {
      busId: "BUS001",
      routeId: "ROUTE_1",
      latitude: 40.7128,
      longitude: -74.0060,
      heading: 45,
      speed: 25,
      timestamp: new Date(),
      occupancy: {
        level: "MEDIUM" as const,
        percentage: 65,
        seatsAvailable: 15,
        totalSeats: 40,
        standingAvailable: 10,
        totalStanding: 20,
        lastUpdated: new Date()
      },
      status: {
        code: "ACTIVE" as const,
        message: "On time",
        lastUpdated: new Date()
      },
      nextStopId: "STOP_001",
      estimatedArrival: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
    },
    {
      busId: "BUS002",
      routeId: "ROUTE_2",
      latitude: 40.7589,
      longitude: -73.9851,
      heading: 90,
      speed: 30,
      timestamp: new Date(),
      occupancy: {
        level: "HIGH" as const,
        percentage: 85,
        seatsAvailable: 5,
        totalSeats: 40,
        standingAvailable: 3,
        totalStanding: 20,
        lastUpdated: new Date()
      },
      status: {
        code: "ACTIVE" as const,
        message: "Slight delay due to traffic",
        lastUpdated: new Date()
      },
      nextStopId: "STOP_002",
      estimatedArrival: new Date(Date.now() + 8 * 60 * 1000) // 8 minutes from now
    }
  ];

  demoBuses.forEach(bus => {
    busLocations.set(bus.busId, bus);
  });
};

// Initialize demo data
initializeDemoData();

// Get all bus locations
export const getBusLocations: RequestHandler = async (req, res) => {
  try {
    const locations = Array.from(busLocations.values());
    const response: BusLocationResponse = {
      success: true,
      data: locations,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: BusLocationResponse = {
      success: false,
      error: "Failed to fetch bus locations",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get bus location by ID
export const getBusLocation: RequestHandler = async (req, res) => {
  try {
    const { busId } = req.params;
    const location = busLocations.get(busId);
    
    if (!location) {
      const response: BusLocationResponse = {
        success: false,
        error: "Bus not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: BusLocationResponse = {
      success: true,
      data: [location],
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: BusLocationResponse = {
      success: false,
      error: "Failed to fetch bus location",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Update bus location (simulated real-time updates)
export const updateBusLocation: RequestHandler = async (req, res) => {
  try {
    const { busId } = req.params;
    const updateData: Partial<BusLocation> = req.body;
    
    const existingLocation = busLocations.get(busId);
    if (!existingLocation) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Bus not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    // Update the bus location
    const updatedLocation: BusLocation = {
      ...existingLocation,
      ...updateData,
      timestamp: new Date()
    };

    busLocations.set(busId, updatedLocation);

    const response: ApiResponse<BusLocation> = {
      success: true,
      data: updatedLocation,
      message: "Bus location updated successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to update bus location",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get ETA for a specific bus and stop
export const getBusETA: RequestHandler = async (req, res) => {
  try {
    const { busId, stopId } = req.params;
    
    // Simulate ETA calculation based on current location and historical data
    const busLocation = busLocations.get(busId);
    if (!busLocation) {
      const response: ETAResponse = {
        success: false,
        error: "Bus not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    // Simple ETA calculation (replace with ML model in production)
    const estimatedArrival = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    const eta: ETA = {
      busId,
      stopId,
      estimatedArrival,
      confidence: 0.85,
      factors: [
        {
          type: "HISTORICAL",
          impact: 0.1,
          description: "Based on historical performance"
        },
        {
          type: "TRAFFIC",
          impact: -0.05,
          description: "Current traffic conditions"
        }
      ],
      lastUpdated: new Date()
    };

    const response: ETAResponse = {
      success: true,
      data: [eta],
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ETAResponse = {
      success: false,
      error: "Failed to calculate ETA",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Update bus occupancy
export const updateBusOccupancy: RequestHandler = async (req, res) => {
  try {
    const { busId } = req.params;
    const occupancyData: OccupancyStatus = req.body;
    
    const existingLocation = busLocations.get(busId);
    if (!existingLocation) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Bus not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    // Update occupancy
    const updatedLocation: BusLocation = {
      ...existingLocation,
      occupancy: {
        ...occupancyData,
        lastUpdated: new Date()
      }
    };

    busLocations.set(busId, updatedLocation);

    const response: ApiResponse<OccupancyStatus> = {
      success: true,
      data: updatedLocation.occupancy,
      message: "Bus occupancy updated successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to update bus occupancy",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get buses by route
export const getBusesByRoute: RequestHandler = async (req, res) => {
  try {
    const { routeId } = req.params;
    const routeBuses = Array.from(busLocations.values())
      .filter(bus => bus.routeId === routeId);

    const response: BusLocationResponse = {
      success: true,
      data: routeBuses,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: BusLocationResponse = {
      success: false,
      error: "Failed to fetch buses for route",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Simulate real-time bus movement
export const simulateBusMovement: RequestHandler = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = busLocations.get(busId);
    
    if (!bus) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Bus not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    // Simulate movement by updating coordinates slightly
    const updatedBus: BusLocation = {
      ...bus,
      latitude: bus.latitude + (Math.random() - 0.5) * 0.001,
      longitude: bus.longitude + (Math.random() - 0.5) * 0.001,
      speed: bus.speed + (Math.random() - 0.5) * 5,
      timestamp: new Date()
    };

    busLocations.set(busId, updatedBus);

    const response: ApiResponse<BusLocation> = {
      success: true,
      data: updatedBus,
      message: "Bus movement simulated",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to simulate bus movement",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
}; 