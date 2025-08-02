#!/usr/bin/env python3
"""
Urban Mobility Bus Agent - ML Service API

FastAPI service for ML model predictions including:
- ETA (Estimated Time of Arrival) prediction
- Occupancy estimation
- Demand forecasting
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import numpy as np
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Urban Mobility Bus Agent ML Service",
    description="ML service for bus ETA prediction and occupancy estimation",
    version="1.0.0"
)

# Pydantic models for API requests/responses
class ETAPredictionRequest(BaseModel):
    latitude: float
    longitude: float
    hour: int
    day_of_week: int
    is_weekend: bool
    weather_condition: str
    traffic_level: str
    route_id: str
    distance_km: float
    avg_speed: float
    occupancy_percentage: float

class ETAPredictionResponse(BaseModel):
    eta_minutes: float
    confidence: float
    factors: List[dict]
    timestamp: datetime

class OccupancyPredictionRequest(BaseModel):
    hour: int
    day_of_week: int
    is_weekend: bool
    weather_condition: str
    traffic_level: str
    route_id: str

class OccupancyPredictionResponse(BaseModel):
    occupancy_percentage: float
    confidence: float
    timestamp: datetime

class HealthResponse(BaseModel):
    status: str
    models_loaded: bool
    timestamp: datetime

class MLService:
    def __init__(self, models_dir="models"):
        self.models_dir = models_dir
        self.eta_model = None
        self.eta_scaler = None
        self.occupancy_model = None
        self.occupancy_scaler = None
        self.label_encoder = None
        
        # Load models
        self.load_models()
    
    def load_models(self):
        """Load trained ML models"""
        try:
            # Load ETA model
            eta_model_path = os.path.join(self.models_dir, 'eta_model.pkl')
            eta_scaler_path = os.path.join(self.models_dir, 'eta_scaler.pkl')
            
            if os.path.exists(eta_model_path) and os.path.exists(eta_scaler_path):
                self.eta_model = joblib.load(eta_model_path)
                self.eta_scaler = joblib.load(eta_scaler_path)
                logger.info("ETA model loaded successfully")
            else:
                logger.warning("ETA model files not found")
            
            # Load occupancy model
            occupancy_model_path = os.path.join(self.models_dir, 'occupancy_model.pkl')
            occupancy_scaler_path = os.path.join(self.models_dir, 'occupancy_scaler.pkl')
            
            if os.path.exists(occupancy_model_path) and os.path.exists(occupancy_scaler_path):
                self.occupancy_model = joblib.load(occupancy_model_path)
                self.occupancy_scaler = joblib.load(occupancy_scaler_path)
                logger.info("Occupancy model loaded successfully")
            else:
                logger.warning("Occupancy model files not found")
                
        except Exception as e:
            logger.error(f"Error loading models: {e}")
    
    def encode_categorical(self, weather_condition: str, traffic_level: str, route_id: str):
        """Encode categorical variables"""
        # Simple encoding for demo (in production, use proper label encoders)
        weather_encoding = {
            'SUNNY': 0,
            'CLOUDY': 1,
            'RAINY': 2,
            'SNOWY': 3
        }
        
        traffic_encoding = {
            'LOW': 0,
            'MEDIUM': 1,
            'HIGH': 2
        }
        
        route_encoding = {
            'ROUTE_1': 0,
            'ROUTE_2': 1,
            'ROUTE_3': 2
        }
        
        return (
            weather_encoding.get(weather_condition, 0),
            traffic_encoding.get(traffic_level, 1),
            route_encoding.get(route_id, 0)
        )
    
    def predict_eta(self, request: ETAPredictionRequest) -> ETAPredictionResponse:
        """Predict ETA for a bus"""
        if self.eta_model is None or self.eta_scaler is None:
            raise HTTPException(status_code=503, detail="ETA model not available")
        
        try:
            # Encode categorical variables
            weather_encoded, traffic_encoded, route_encoded = self.encode_categorical(
                request.weather_condition, request.traffic_level, request.route_id
            )
            
            # Prepare features
            features = [
                request.latitude, request.longitude,
                request.hour, request.day_of_week, int(request.is_weekend),
                weather_encoded, traffic_encoded, route_encoded,
                request.distance_km, request.avg_speed, request.occupancy_percentage,
                request.hour + 0,  # time_of_day (simplified)
                1 if request.hour in [7, 8, 9, 17, 18, 19] else 0  # is_rush_hour
            ]
            
            # Scale features
            features_scaled = self.eta_scaler.transform([features])
            
            # Make prediction
            eta_minutes = self.eta_model.predict(features_scaled)[0]
            eta_minutes = max(1, eta_minutes)  # Minimum 1 minute
            
            # Calculate confidence based on model performance
            confidence = 0.85  # In production, calculate based on model uncertainty
            
            # Identify factors affecting ETA
            factors = []
            if request.traffic_level == 'HIGH':
                factors.append({"type": "TRAFFIC", "impact": -0.3, "description": "High traffic conditions"})
            if request.weather_condition in ['RAINY', 'SNOWY']:
                factors.append({"type": "WEATHER", "impact": -0.2, "description": f"{request.weather_condition.lower()} weather"})
            if request.hour in [7, 8, 9, 17, 18, 19]:
                factors.append({"type": "TIME", "impact": -0.1, "description": "Rush hour"})
            
            return ETAPredictionResponse(
                eta_minutes=eta_minutes,
                confidence=confidence,
                factors=factors,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error predicting ETA: {e}")
            raise HTTPException(status_code=500, detail="Error making ETA prediction")
    
    def predict_occupancy(self, request: OccupancyPredictionRequest) -> OccupancyPredictionResponse:
        """Predict occupancy for a bus"""
        if self.occupancy_model is None or self.occupancy_scaler is None:
            raise HTTPException(status_code=503, detail="Occupancy model not available")
        
        try:
            # Encode categorical variables
            weather_encoded, traffic_encoded, route_encoded = self.encode_categorical(
                request.weather_condition, request.traffic_level, request.route_id
            )
            
            # Prepare features
            features = [
                request.hour, request.day_of_week, int(request.is_weekend),
                weather_encoded, traffic_encoded, route_encoded,
                request.hour + 0,  # time_of_day (simplified)
                1 if request.hour in [7, 8, 9, 17, 18, 19] else 0  # is_rush_hour
            ]
            
            # Scale features
            features_scaled = self.occupancy_scaler.transform([features])
            
            # Make prediction
            occupancy_percentage = self.occupancy_model.predict(features_scaled)[0]
            occupancy_percentage = max(0, min(100, occupancy_percentage))  # Clamp between 0-100
            
            # Calculate confidence
            confidence = 0.80  # In production, calculate based on model uncertainty
            
            return OccupancyPredictionResponse(
                occupancy_percentage=occupancy_percentage,
                confidence=confidence,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error predicting occupancy: {e}")
            raise HTTPException(status_code=500, detail="Error making occupancy prediction")

# Initialize ML service
ml_service = MLService()

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    models_loaded = (
        ml_service.eta_model is not None and 
        ml_service.occupancy_model is not None
    )
    
    return HealthResponse(
        status="healthy" if models_loaded else "degraded",
        models_loaded=models_loaded,
        timestamp=datetime.now()
    )

@app.post("/predict/eta", response_model=ETAPredictionResponse)
async def predict_eta(request: ETAPredictionRequest):
    """Predict ETA for a bus"""
    return ml_service.predict_eta(request)

@app.post("/predict/occupancy", response_model=OccupancyPredictionResponse)
async def predict_occupancy(request: OccupancyPredictionRequest):
    """Predict occupancy for a bus"""
    return ml_service.predict_occupancy(request)

@app.get("/models/status")
async def get_models_status():
    """Get status of loaded models"""
    return {
        "eta_model": ml_service.eta_model is not None,
        "occupancy_model": ml_service.occupancy_model is not None,
        "eta_scaler": ml_service.eta_scaler is not None,
        "occupancy_scaler": ml_service.occupancy_scaler is not None
    }

@app.post("/models/reload")
async def reload_models():
    """Reload ML models"""
    try:
        ml_service.load_models()
        return {"message": "Models reloaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reloading models: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 