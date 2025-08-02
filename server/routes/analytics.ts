import { RequestHandler } from "express";
import { 
  SystemAnalytics, 
  SystemHealth, 
  RouteAnalytics, 
  Alert,
  ApiResponse 
} from "@shared/api";

// In-memory storage for demo purposes
let alerts: Map<string, Alert> = new Map();
let systemHealth: SystemHealth = {
  overall: 'GOOD',
  components: {
    gps: 'ONLINE',
    occupancy: 'ONLINE',
    communication: 'ONLINE',
    database: 'ONLINE'
  },
  lastUpdated: new Date()
};

// Initialize demo alerts
const initializeDemoAlerts = () => {
  const demoAlerts: Alert[] = [
    {
      id: "ALERT_001",
      type: "DELAY",
      severity: "MEDIUM",
      title: "Route 1 Delayed",
      message: "Downtown Express is experiencing 10-15 minute delays due to traffic congestion",
      affectedRoutes: ["ROUTE_1"],
      affectedStops: ["STOP_001", "STOP_002"],
      startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      isActive: true,
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: "ALERT_002",
      type: "CROWDING",
      severity: "HIGH",
      title: "High Occupancy on Route 2",
      message: "University Line buses are running at 90% capacity during peak hours",
      affectedRoutes: ["ROUTE_2"],
      affectedStops: ["STOP_002", "STOP_003"],
      startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      endTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      isActive: true,
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    }
  ];

  demoAlerts.forEach(alert => alerts.set(alert.id, alert));
};

initializeDemoAlerts();

// Get system analytics
export const getSystemAnalytics: RequestHandler = async (req, res) => {
  try {
    const activeAlerts = Array.from(alerts.values()).filter(alert => alert.isActive);
    
    const analytics: SystemAnalytics = {
      totalBuses: 25,
      activeBuses: 22,
      totalRoutes: 8,
      activeRoutes: 7,
      totalStops: 45,
      currentRidership: 1250,
      systemHealth,
      alerts: activeAlerts
    };

    const response: ApiResponse<SystemAnalytics> = {
      success: true,
      data: analytics,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch system analytics",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get system health
export const getSystemHealth: RequestHandler = async (req, res) => {
  try {
    const response: ApiResponse<SystemHealth> = {
      success: true,
      data: systemHealth,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch system health",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Update system health
export const updateSystemHealth: RequestHandler = async (req, res) => {
  try {
    const healthData: Partial<SystemHealth> = req.body;
    
    systemHealth = {
      ...systemHealth,
      ...healthData,
      lastUpdated: new Date()
    };

    const response: ApiResponse<SystemHealth> = {
      success: true,
      data: systemHealth,
      message: "System health updated successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to update system health",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get route analytics
export const getRouteAnalytics: RequestHandler = async (req, res) => {
  try {
    const { routeId, period = 'DAILY' } = req.params;
    
    // Simulate analytics data (replace with real data in production)
    const analytics: RouteAnalytics = {
      routeId,
      period: period as 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY',
      data: [
        {
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
          ridership: 450,
          averageOccupancy: 75,
          onTimePerformance: 92,
          averageWaitTime: 8,
          revenue: 2250
        },
        {
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          ridership: 480,
          averageOccupancy: 80,
          onTimePerformance: 88,
          averageWaitTime: 10,
          revenue: 2400
        },
        {
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          ridership: 420,
          averageOccupancy: 70,
          onTimePerformance: 95,
          averageWaitTime: 6,
          revenue: 2100
        }
      ]
    };

    const response: ApiResponse<RouteAnalytics> = {
      success: true,
      data: analytics,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch route analytics",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get all alerts
export const getAlerts: RequestHandler = async (req, res) => {
  try {
    const { active } = req.query;
    let alertsList = Array.from(alerts.values());
    
    if (active === 'true') {
      alertsList = alertsList.filter(alert => alert.isActive);
    }

    const response: ApiResponse<Alert[]> = {
      success: true,
      data: alertsList,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch alerts",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get alert by ID
export const getAlert: RequestHandler = async (req, res) => {
  try {
    const { alertId } = req.params;
    const alert = alerts.get(alertId);
    
    if (!alert) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Alert not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Alert> = {
      success: true,
      data: alert,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch alert",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Create new alert
export const createAlert: RequestHandler = async (req, res) => {
  try {
    const alertData: Omit<Alert, 'id' | 'createdAt'> = req.body;
    const alertId = `ALERT_${Date.now()}`;
    
    const newAlert: Alert = {
      id: alertId,
      ...alertData,
      createdAt: new Date()
    };

    alerts.set(alertId, newAlert);

    const response: ApiResponse<Alert> = {
      success: true,
      data: newAlert,
      message: "Alert created successfully",
      timestamp: new Date()
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to create alert",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Update alert
export const updateAlert: RequestHandler = async (req, res) => {
  try {
    const { alertId } = req.params;
    const updateData: Partial<Alert> = req.body;
    
    const existingAlert = alerts.get(alertId);
    if (!existingAlert) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Alert not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const updatedAlert: Alert = {
      ...existingAlert,
      ...updateData
    };

    alerts.set(alertId, updatedAlert);

    const response: ApiResponse<Alert> = {
      success: true,
      data: updatedAlert,
      message: "Alert updated successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to update alert",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Resolve alert
export const resolveAlert: RequestHandler = async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const existingAlert = alerts.get(alertId);
    if (!existingAlert) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Alert not found",
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const resolvedAlert: Alert = {
      ...existingAlert,
      isActive: false,
      endTime: new Date()
    };

    alerts.set(alertId, resolvedAlert);

    const response: ApiResponse<Alert> = {
      success: true,
      data: resolvedAlert,
      message: "Alert resolved successfully",
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to resolve alert",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get alerts by type
export const getAlertsByType: RequestHandler = async (req, res) => {
  try {
    const { type } = req.params;
    const { active } = req.query;
    
    let alertsList = Array.from(alerts.values())
      .filter(alert => alert.type === type);
    
    if (active === 'true') {
      alertsList = alertsList.filter(alert => alert.isActive);
    }

    const response: ApiResponse<Alert[]> = {
      success: true,
      data: alertsList,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch alerts by type",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get alerts by severity
export const getAlertsBySeverity: RequestHandler = async (req, res) => {
  try {
    const { severity } = req.params;
    const { active } = req.query;
    
    let alertsList = Array.from(alerts.values())
      .filter(alert => alert.severity === severity);
    
    if (active === 'true') {
      alertsList = alertsList.filter(alert => alert.isActive);
    }

    const response: ApiResponse<Alert[]> = {
      success: true,
      data: alertsList,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch alerts by severity",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

// Get performance metrics
export const getPerformanceMetrics: RequestHandler = async (req, res) => {
  try {
    const { period = 'DAILY' } = req.query;
    
    // Simulate performance metrics
    const metrics = {
      period: period as string,
      onTimePerformance: 89.5,
      averageWaitTime: 7.2,
      totalRidership: 12500,
      averageOccupancy: 72.3,
      revenue: 62500,
      fuelEfficiency: 8.5, // km/L
      co2Saved: 1250, // kg
      customerSatisfaction: 4.2 // out of 5
    };

    const response: ApiResponse<typeof metrics> = {
      success: true,
      data: metrics,
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Failed to fetch performance metrics",
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
}; 