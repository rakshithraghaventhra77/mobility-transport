import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom dark theme map style URL from MapBox (you'll need to replace with your style URL)
const DARK_MAP_STYLE = 'mapbox://styles/mapbox/dark-v10';
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || 'your_mapbox_token';

// Custom marker icons
const createIcon = (type: 'bus' | 'metro' | 'cab') => {
  const color = {
    bus: '#0891b2', // cyan
    metro: '#16a34a', // green
    cab: '#ea580c', // orange
  }[type];

  const iconUrl = `/icons/${type}.svg`;

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
      ">
        <img src="${iconUrl}" alt="${type}" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

interface Vehicle {
  id: string;
  type: 'bus' | 'metro' | 'cab';
  position: [number, number];
  route?: string;
  eta?: string;
  occupancy?: string;
}

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  vehicles: Vehicle[];
  visibleLayers: {
    bus: boolean;
    metro: boolean;
    cab: boolean;
  };
}

// Custom animated marker function
function createAnimatedMarker(vehicle: Vehicle, map: L.Map, prevPos?: [number, number]) {
  const marker = L.marker(vehicle.position, {
    icon: createIcon(vehicle.type)
  });

  const popupContent = document.createElement('div');
  popupContent.className = 'p-2';
  popupContent.innerHTML = `
    <h3 class="font-bold mb-2 text-foreground">
      ${vehicle.type.toUpperCase()} ${vehicle.id}
    </h3>
    ${vehicle.route ? `
      <p class="text-sm text-muted-foreground mb-1">
        Route: ${vehicle.route}
      </p>
    ` : ''}
    ${vehicle.eta ? `
      <p class="text-sm text-muted-foreground mb-1">
        ETA: ${vehicle.eta}
      </p>
    ` : ''}
    ${vehicle.occupancy ? `
      <p class="text-sm text-muted-foreground">
        Occupancy: ${vehicle.occupancy}
      </p>
    ` : ''}
  `;

  marker.bindPopup(popupContent);

  if (prevPos) {
    const duration = 1000; // Animation duration in ms
    const start = performance.now();
    let animationFrame: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      const lat = prevPos[0] + (vehicle.position[0] - prevPos[0]) * progress;
      const lng = prevPos[1] + (vehicle.position[1] - prevPos[1]) * progress;
      const currentPos = [
        prevPos[0] + (vehicle.position[0] - prevPos[0]) * progress,
        prevPos[1] + (vehicle.position[1] - prevPos[1]) * progress
      ] as [number, number];

      marker.setLatLng(currentPos);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    // Store the animation frame ID in the marker for cleanup
    (marker as any)._animationFrame = animationFrame;
  }

  return marker;
};

function MapComponent({ center, zoom, vehicles, visibleLayers }: MapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const prevPositionsRef = useRef<{ [key: string]: [number, number] }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      try {
        const map = L.map(containerRef.current).setView(center, zoom);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          className: 'light-theme-tiles'
        }).addTo(map);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    const map = mapRef.current;
    const currentMarkers = { ...markersRef.current };

    vehicles.forEach(vehicle => {
      if (visibleLayers[vehicle.type]) {
        const prevMarker = markersRef.current[vehicle.id];
        const prevPos = prevPositionsRef.current[vehicle.id];

        if (prevMarker) {
          if ((prevMarker as any)._animationFrame) {
            cancelAnimationFrame((prevMarker as any)._animationFrame);
          }
          prevMarker.remove();
        }

        const marker = createAnimatedMarker(vehicle, map, prevPos);
        marker.addTo(map);
        currentMarkers[vehicle.id] = marker;
        prevPositionsRef.current[vehicle.id] = vehicle.position;
      }
    });

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (!currentMarkers[id]) {
        if ((marker as any)._animationFrame) {
          cancelAnimationFrame((marker as any)._animationFrame);
        }
        marker.remove();
      }
    });

    markersRef.current = currentMarkers;

    return () => {
      if (mapRef.current) {
        Object.values(markersRef.current).forEach(marker => {
          if ((marker as any)._animationFrame) {
            cancelAnimationFrame((marker as any)._animationFrame);
          }
          marker.remove();
        });
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
        prevPositionsRef.current = {};
      }
    };
  }, [center, zoom, vehicles, visibleLayers]);
  const prevPositions = useRef<Record<string, [number, number]>>({});

  useEffect(() => {
    vehicles.forEach(vehicle => {
      prevPositions.current[vehicle.id] = vehicle.position;
    });
  }, [vehicles]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: '500px', 
        width: '100%', 
        borderRadius: '0.5rem',
        position: 'relative',
        zIndex: 1
      }}
    />
  );
};

export { MapComponent };