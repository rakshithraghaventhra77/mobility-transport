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
    bus: '#00f5ff', // neon cyan
    metro: '#32ff32', // neon lime
    cab: '#ff8c00', // neon orange
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

  marker.bindPopup(`
    <div class="p-2">
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
    </div>
  `);

  if (prevPos) {
    const duration = 1000; // Animation duration in ms
    const start = performance.now();
    let animationFrame: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

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
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView(center, zoom);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for vehicles
    vehicles.forEach(vehicle => {
      if (visibleLayers[vehicle.type]) {
        const marker = L.marker(vehicle.position, {
          icon: createIcon(vehicle.type)
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${vehicle.type.toUpperCase()} ${vehicle.id}</h3>
            ${vehicle.route ? `<p>Route: ${vehicle.route}</p>` : ''}
            ${vehicle.eta ? `<p>ETA: ${vehicle.eta}</p>` : ''}
            ${vehicle.occupancy ? `<p>Occupancy: ${vehicle.occupancy}</p>` : ''}
          </div>
        `);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
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