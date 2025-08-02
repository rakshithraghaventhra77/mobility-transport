import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer as createHttpServer } from "http";
import { Server } from "socket.io";
import { handleDemo } from "./routes/demo.js";
import { 
  getBusLocations, 
  getBusLocation, 
  updateBusLocation, 
  getBusETA, 
  updateBusOccupancy, 
  getBusesByRoute, 
  simulateBusMovement 
} from "./routes/bus.js";
import {
  getRoutes,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,
  getStops,
  getStop,
  createStop,
  getRouteSchedules,
  createSchedule,
  getRoutesNearLocation
} from "./routes/routes.js";
import {
  getSystemAnalytics,
  getSystemHealth,
  updateSystemHealth,
  getRouteAnalytics,
  getAlerts,
  getAlert,
  createAlert,
  updateAlert,
  resolveAlert,
  getAlertsByType,
  getAlertsBySeverity,
  getPerformanceMetrics
} from "./routes/analytics.js";

export function createServer() {
  const app = express();
  const server = createHttpServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static("dist/spa"));

  // API Routes
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong", timestamp: new Date() });
  });

  app.get("/api/demo", handleDemo);

  // Bus Routes
  app.get("/api/buses", getBusLocations);
  app.get("/api/buses/:busId", getBusLocation);
  app.put("/api/buses/:busId/location", updateBusLocation);
  app.get("/api/buses/:busId/eta/:stopId", getBusETA);
  app.put("/api/buses/:busId/occupancy", updateBusOccupancy);
  app.get("/api/routes/:routeId/buses", getBusesByRoute);
  app.post("/api/buses/:busId/simulate", simulateBusMovement);

  // Route Management
  app.get("/api/routes", getRoutes);
  app.get("/api/routes/:routeId", getRoute);
  app.post("/api/routes", createRoute);
  app.put("/api/routes/:routeId", updateRoute);
  app.delete("/api/routes/:routeId", deleteRoute);
  app.get("/api/stops", getStops);
  app.get("/api/stops/:stopId", getStop);
  app.post("/api/stops", createStop);
  app.get("/api/routes/:routeId/schedules", getRouteSchedules);
  app.post("/api/schedules", createSchedule);
  app.get("/api/routes/nearby", getRoutesNearLocation);

  // Analytics and Alerts
  app.get("/api/analytics/system", getSystemAnalytics);
  app.get("/api/analytics/health", getSystemHealth);
  app.put("/api/analytics/health", updateSystemHealth);
  app.get("/api/analytics/routes/:routeId/:period", getRouteAnalytics);
  app.get("/api/alerts", getAlerts);
  app.get("/api/alerts/:alertId", getAlert);
  app.post("/api/alerts", createAlert);
  app.put("/api/alerts/:alertId", updateAlert);
  app.post("/api/alerts/:alertId/resolve", resolveAlert);
  app.get("/api/alerts/type/:type", getAlertsByType);
  app.get("/api/alerts/severity/:severity", getAlertsBySeverity);
  app.get("/api/analytics/performance", getPerformanceMetrics);

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile("dist/spa/index.html", { root: "." });
  });

  // WebSocket for real-time updates
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join bus tracking room
    socket.on("join-bus-tracking", (busIds: string[]) => {
      busIds.forEach(busId => {
        socket.join(`bus-${busId}`);
      });
      console.log(`Client ${socket.id} joined bus tracking for:`, busIds);
    });

    // Join route tracking room
    socket.on("join-route-tracking", (routeIds: string[]) => {
      routeIds.forEach(routeId => {
        socket.join(`route-${routeId}`);
      });
      console.log(`Client ${socket.id} joined route tracking for:`, routeIds);
    });

    // Join alerts room
    socket.on("join-alerts", () => {
      socket.join("alerts");
      console.log(`Client ${socket.id} joined alerts room`);
    });

    // Join system health room
    socket.on("join-system-health", () => {
      socket.join("system-health");
      console.log(`Client ${socket.id} joined system health room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Simulate real-time bus updates
  setInterval(() => {
    // This would be replaced with real GPS data in production
    io.to("alerts").emit("system-update", {
      type: "HEALTH_CHECK",
      data: {
        timestamp: new Date(),
        status: "healthy"
      }
    });
  }, 30000); // Every 30 seconds

  return server;
}
