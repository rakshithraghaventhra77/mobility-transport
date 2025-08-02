#!/usr/bin/env python3
"""
Urban Mobility Bus Agent - ML Model Training Script

This script trains machine learning models for:
1. ETA (Estimated Time of Arrival) prediction
2. Occupancy estimation
3. Demand forecasting

Requirements:
- Python 3.8+
- scikit-learn
- pandas
- numpy
- tensorflow (optional)
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import json
import os
from datetime import datetime, timedelta
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class BusAgentMLTrainer:
    def __init__(self, models_dir="models"):
        self.models_dir = models_dir
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
        # Create models directory if it doesn't exist
        os.makedirs(models_dir, exist_ok=True)
        
    def generate_synthetic_data(self, num_samples=10000):
        """Generate synthetic training data for demonstration"""
        logger.info("Generating synthetic training data...")
        
        np.random.seed(42)
        
        # Generate synthetic bus data
        data = []
        for i in range(num_samples):
            # Random bus and route IDs
            bus_id = f"BUS_{np.random.randint(1, 100):03d}"
            route_id = f"ROUTE_{np.random.randint(1, 10)}"
            
            # Random coordinates (simulating NYC area)
            latitude = 40.7 + np.random.normal(0, 0.1)
            longitude = -74.0 + np.random.normal(0, 0.1)
            
            # Time features
            hour = np.random.randint(0, 24)
            minute = np.random.randint(0, 60)
            day_of_week = np.random.randint(0, 7)
            is_weekend = 1 if day_of_week >= 5 else 0
            
            # Weather conditions (simplified)
            weather_conditions = np.random.choice(['SUNNY', 'CLOUDY', 'RAINY', 'SNOWY'], p=[0.4, 0.3, 0.2, 0.1])
            
            # Traffic conditions
            traffic_level = np.random.choice(['LOW', 'MEDIUM', 'HIGH'], p=[0.3, 0.5, 0.2])
            
            # Distance to destination
            distance_km = np.random.uniform(0.5, 15.0)
            
            # Historical average speed for this route
            avg_speed = np.random.normal(25, 5)  # km/h
            
            # Current occupancy
            occupancy_percentage = np.random.uniform(0, 100)
            
            # Calculate ETA based on features (simplified model)
            base_time = distance_km / avg_speed * 60  # minutes
            
            # Adjust for traffic
            traffic_multiplier = {
                'LOW': 1.0,
                'MEDIUM': 1.3,
                'HIGH': 1.8
            }[traffic_level]
            
            # Adjust for weather
            weather_multiplier = {
                'SUNNY': 1.0,
                'CLOUDY': 1.1,
                'RAINY': 1.4,
                'SNOWY': 1.8
            }[weather_conditions]
            
            # Adjust for time of day
            rush_hour_multiplier = 1.5 if hour in [7, 8, 9, 17, 18, 19] else 1.0
            
            # Calculate final ETA
            eta_minutes = base_time * traffic_multiplier * weather_multiplier * rush_hour_multiplier
            
            # Add some noise
            eta_minutes += np.random.normal(0, 2)
            eta_minutes = max(1, eta_minutes)  # Minimum 1 minute
            
            data.append({
                'bus_id': bus_id,
                'route_id': route_id,
                'latitude': latitude,
                'longitude': longitude,
                'hour': hour,
                'minute': minute,
                'day_of_week': day_of_week,
                'is_weekend': is_weekend,
                'weather_condition': weather_conditions,
                'traffic_level': traffic_level,
                'distance_km': distance_km,
                'avg_speed': avg_speed,
                'occupancy_percentage': occupancy_percentage,
                'eta_minutes': eta_minutes
            })
        
        return pd.DataFrame(data)
    
    def prepare_eta_features(self, df):
        """Prepare features for ETA prediction"""
        logger.info("Preparing features for ETA prediction...")
        
        # Encode categorical variables
        df['weather_encoded'] = self.label_encoder.fit_transform(df['weather_condition'])
        df['traffic_encoded'] = self.label_encoder.fit_transform(df['traffic_level'])
        df['route_encoded'] = self.label_encoder.fit_transform(df['route_id'])
        
        # Create time-based features
        df['time_of_day'] = df['hour'] + df['minute'] / 60
        df['is_rush_hour'] = ((df['hour'] >= 7) & (df['hour'] <= 9)) | ((df['hour'] >= 17) & (df['hour'] <= 19))
        df['is_rush_hour'] = df['is_rush_hour'].astype(int)
        
        # Select features for ETA prediction
        feature_columns = [
            'latitude', 'longitude', 'hour', 'day_of_week', 'is_weekend',
            'weather_encoded', 'traffic_encoded', 'route_encoded',
            'distance_km', 'avg_speed', 'occupancy_percentage',
            'time_of_day', 'is_rush_hour'
        ]
        
        X = df[feature_columns]
        y = df['eta_minutes']
        
        return X, y
    
    def train_eta_model(self, X, y):
        """Train ETA prediction model"""
        logger.info("Training ETA prediction model...")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train multiple models
        models = {
            'random_forest': RandomForestRegressor(n_estimators=100, random_state=42),
            'gradient_boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
            'linear_regression': LinearRegression()
        }
        
        best_model = None
        best_score = -np.inf
        
        for name, model in models.items():
            logger.info(f"Training {name}...")
            
            # Train model
            model.fit(X_train_scaled, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test_scaled)
            
            # Calculate metrics
            mae = mean_absolute_error(y_test, y_pred)
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            logger.info(f"{name} - MAE: {mae:.2f}, MSE: {mse:.2f}, R²: {r2:.3f}")
            
            # Cross-validation
            cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='r2')
            logger.info(f"{name} - CV R²: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
            
            if r2 > best_score:
                best_score = r2
                best_model = model
        
        # Save best model
        model_path = os.path.join(self.models_dir, 'eta_model.pkl')
        scaler_path = os.path.join(self.models_dir, 'eta_scaler.pkl')
        
        joblib.dump(best_model, model_path)
        joblib.dump(self.scaler, scaler_path)
        
        # Save model metadata
        metadata = {
            'model_type': 'ETA_PREDICTION',
            'features': X.columns.tolist(),
            'best_score': best_score,
            'training_date': datetime.now().isoformat(),
            'model_path': model_path,
            'scaler_path': scaler_path
        }
        
        metadata_path = os.path.join(self.models_dir, 'eta_model_metadata.json')
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        logger.info(f"Best ETA model saved with R² score: {best_score:.3f}")
        return best_model
    
    def train_occupancy_model(self, df):
        """Train occupancy estimation model"""
        logger.info("Training occupancy estimation model...")
        
        # Prepare features for occupancy prediction
        feature_columns = [
            'hour', 'day_of_week', 'is_weekend', 'weather_encoded',
            'traffic_encoded', 'route_encoded', 'time_of_day', 'is_rush_hour'
        ]
        
        X = df[feature_columns]
        y = df['occupancy_percentage']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test_scaled)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        logger.info(f"Occupancy model - MAE: {mae:.2f}, R²: {r2:.3f}")
        
        # Save model
        model_path = os.path.join(self.models_dir, 'occupancy_model.pkl')
        scaler_path = os.path.join(self.models_dir, 'occupancy_scaler.pkl')
        
        joblib.dump(model, model_path)
        joblib.dump(self.scaler, scaler_path)
        
        # Save metadata
        metadata = {
            'model_type': 'OCCUPANCY_ESTIMATION',
            'features': X.columns.tolist(),
            'mae': mae,
            'r2_score': r2,
            'training_date': datetime.now().isoformat(),
            'model_path': model_path,
            'scaler_path': scaler_path
        }
        
        metadata_path = os.path.join(self.models_dir, 'occupancy_model_metadata.json')
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        logger.info(f"Occupancy model saved with R² score: {r2:.3f}")
        return model
    
    def predict_eta(self, features):
        """Predict ETA using trained model"""
        model_path = os.path.join(self.models_dir, 'eta_model.pkl')
        scaler_path = os.path.join(self.models_dir, 'eta_scaler.pkl')
        
        if not os.path.exists(model_path):
            raise FileNotFoundError("ETA model not found. Please train the model first.")
        
        # Load model and scaler
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        # Scale features
        features_scaled = scaler.transform([features])
        
        # Make prediction
        eta_minutes = model.predict(features_scaled)[0]
        
        return max(1, eta_minutes)  # Minimum 1 minute
    
    def predict_occupancy(self, features):
        """Predict occupancy using trained model"""
        model_path = os.path.join(self.models_dir, 'occupancy_model.pkl')
        scaler_path = os.path.join(self.models_dir, 'occupancy_scaler.pkl')
        
        if not os.path.exists(model_path):
            raise FileNotFoundError("Occupancy model not found. Please train the model first.")
        
        # Load model and scaler
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        # Scale features
        features_scaled = scaler.transform([features])
        
        # Make prediction
        occupancy_percentage = model.predict(features_scaled)[0]
        
        return max(0, min(100, occupancy_percentage))  # Clamp between 0-100

def main():
    """Main training function"""
    logger.info("Starting Urban Mobility Bus Agent ML model training...")
    
    # Initialize trainer
    trainer = BusAgentMLTrainer()
    
    # Generate synthetic data
    df = trainer.generate_synthetic_data(num_samples=50000)
    logger.info(f"Generated {len(df)} training samples")
    
    # Train ETA model
    X_eta, y_eta = trainer.prepare_eta_features(df)
    eta_model = trainer.train_eta_model(X_eta, y_eta)
    
    # Train occupancy model
    occupancy_model = trainer.train_occupancy_model(df)
    
    # Test predictions
    logger.info("Testing model predictions...")
    
    # Sample feature vector for testing
    sample_features = [
        40.7128, -74.0060,  # latitude, longitude
        8, 1, 0,            # hour, day_of_week, is_weekend
        0, 1, 2,            # weather_encoded, traffic_encoded, route_encoded
        5.0, 25.0, 60.0,   # distance_km, avg_speed, occupancy_percentage
        8.5, 1              # time_of_day, is_rush_hour
    ]
    
    try:
        eta_prediction = trainer.predict_eta(sample_features)
        logger.info(f"Sample ETA prediction: {eta_prediction:.1f} minutes")
        
        occupancy_prediction = trainer.predict_occupancy(sample_features[3:])  # Use relevant features
        logger.info(f"Sample occupancy prediction: {occupancy_prediction:.1f}%")
        
    except FileNotFoundError as e:
        logger.error(f"Model not found: {e}")
    
    logger.info("Training completed successfully!")

if __name__ == "__main__":
    main() 