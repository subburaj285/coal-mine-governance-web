import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  Satellite,
  Flame,
  Radio,
  Compass,
  Cpu
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { MINE_ZONES, FLEET_TELEMETRY } from '../../data/mockData';

interface GeospatialPanelProps {
  subsidiary: SubsidiaryId;
}

export const GeospatialPanel: React.FC<GeospatialPanelProps> = ({ subsidiary }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer toggles
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [showFleet, setShowFleet] = useState(true);
  const [showThermal, setShowThermal] = useState(true);
  const [showSatelliteAlerts, setShowSatelliteAlerts] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center around Coal India central mining belt (Jharkhand / Chhattisgarh / MP border: ~22.8°N, 83.5°E)
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 83.5],
      zoom: 6,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Clean CartoDB tile layer with high clarity
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO · CIL-GIS',
      maxZoom: 18
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update dynamic layers when toggles or subsidiary changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing layer groups (except base tiles)
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    const layerGroup = L.layerGroup().addTo(map);

    // 1. Sanctioned Lease Boundaries Polygons
    if (showBoundaries) {
      const boundaryPolygons = [
        {
          name: 'Gevra Opencast Sanctioned Lease (SECL)',
          coords: [
            [22.34, 82.58],
            [22.36, 82.58],
            [22.36, 82.61],
            [22.33, 82.61]
          ],
          color: '#2563eb'
        },
        {
          name: 'Jayant Main Block (NCL)',
          coords: [
            [24.11, 82.64],
            [24.13, 82.64],
            [24.13, 82.68],
            [24.10, 82.67]
          ],
          color: '#059669'
        },
        {
          name: 'Talcher Colliery Complex (MCL)',
          coords: [
            [20.94, 85.20],
            [20.97, 85.20],
            [20.97, 85.24],
            [20.93, 85.23]
          ],
          color: '#7c3aed'
        },
        {
          name: 'Jharia Coalfire Seam IV Lease (BCCL)',
          coords: [
            [23.74, 86.40],
            [23.76, 86.40],
            [23.76, 86.43],
            [23.73, 86.43]
          ],
          color: '#dc2626'
        }
      ];

      boundaryPolygons.forEach((poly) => {
        const polygon = L.polygon(poly.coords as [number, number][], {
          color: poly.color,
          weight: 2,
          fillColor: poly.color,
          fillOpacity: 0.15,
          dashArray: '4, 4'
        });
        polygon.bindPopup(`<b>${poly.name}</b><br/><span style="color:#64748b;font-size:11px">Ministry of Coal Sanctioned Boundary</span>`);
        layerGroup.addLayer(polygon);
      });
    }

    // 2. Mine Zone Sensor Hubs
    if (showSensors) {
      MINE_ZONES.forEach((zone) => {
        if (subsidiary !== 'ALL' && zone.subsidiary !== subsidiary) return;

        const isRisk = zone.riskScore > 60;
        const color = isRisk ? '#dc2626' : '#059669';

        const circle = L.circleMarker([zone.lat, zone.lng], {
          radius: 9,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        });

        circle.bindPopup(`
          <div style="font-family:sans-serif;padding:3px;">
            <div style="font-weight:bold;color:#0f172a;font-size:13px;">${zone.name}</div>
            <div style="color:#64748b;font-size:11px;">Subsidiary: ${zone.subsidiary} · ${zone.type}</div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:6px 0;" />
            <div style="font-size:11px;color:#334155;line-height:1.5;">
              <div>CH₄: <b>${zone.ch4Level}%</b> (Limit 0.80%)</div>
              <div>CO: <b>${zone.coLevel} ppm</b></div>
              <div>Airflow: <b>${zone.airflow} m³/min</b></div>
              <div>Risk Score: <b style="color:${isRisk ? '#dc2626' : '#059669'}">${zone.riskScore}/100</b></div>
            </div>
          </div>
        `);
        layerGroup.addLayer(circle);
      });
    }

    // 3. Live HEMM Fleet GPS Positions
    if (showFleet) {
      FLEET_TELEMETRY.forEach((eq) => {
        if (subsidiary !== 'ALL' && eq.subsidiary !== subsidiary) return;

        const fleetMarker = L.circleMarker([eq.lat, eq.lng], {
          radius: 6,
          fillColor: '#0284c7',
          color: '#ffffff',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.9
        });

        fleetMarker.bindPopup(`
          <div style="font-family:sans-serif;padding:3px;">
            <div style="font-weight:bold;color:#0f172a;">${eq.tag} (${eq.type})</div>
            <div style="color:#64748b;font-size:11px;">Operator: ${eq.operator}</div>
            <div style="font-size:11px;color:#334155;margin-top:4px;">
              <div>Status: <span style="color:#059669;font-weight:bold;">${eq.status}</span></div>
              <div>Payload: <b>${eq.payloadTonnes} T</b> · Fuel: <b>${eq.fuelLevel}%</b></div>
            </div>
          </div>
        `);
        layerGroup.addLayer(fleetMarker);
      });
    }

    // 4. Coal Fire Thermal Hotspots (BCCL / Jharia)
    if (showThermal) {
      const thermalSpots = [
        { lat: 23.7544, lng: 86.4182, label: 'Jharia Seam IV Hotspot #1 (68°C Surface Radiance)', radius: 350 },
        { lat: 23.7480, lng: 86.4250, label: 'Kujama Subsurface Fire Zone (54°C)', radius: 280 }
      ];

      thermalSpots.forEach((spot) => {
        const thermalCircle = L.circle([spot.lat, spot.lng], {
          radius: spot.radius,
          color: '#dc2626',
          weight: 1,
          fillColor: '#ea580c',
          fillOpacity: 0.45
        });
        thermalCircle.bindPopup(`
          <div>
            <b style="color:#dc2626;">Satellite MSS Thermal Hotspot</b><br/>
            ${spot.label}<br/>
            <span style="font-size:10px;color:#64748b;">Infrared Trigger: Landsat/Sentinel-2 thermal band</span>
          </div>
        `);
        layerGroup.addLayer(thermalCircle);
      });
    }

    // 5. Satellite MSS Boundary Encroachment Triggers
    if (showSatelliteAlerts) {
      const satelliteAlert = L.circleMarker([22.361, 82.608], {
        radius: 8,
        fillColor: '#d97706',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      });
      satelliteAlert.bindPopup(`
        <div>
          <b style="color:#d97706;">MSS Satellite Boundary Alert</b><br/>
          Overburden dump toe within 40m of sanctioned forest corridor lease pillar #12.<br/>
          <span style="font-size:10px;color:#64748b;">Triggered by Mining Surveillance System (MSS)</span>
        </div>
      `);
      layerGroup.addLayer(satelliteAlert);
    }
  }, [subsidiary, showBoundaries, showSensors, showFleet, showThermal, showSatelliteAlerts]);

  return (
    <div className="space-y-4">
      
      {/* GIS Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Geospatial GIS Surveillance & Boundary Monitor</h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Integrating MSS Satellite, Drone Photogrammetry, RFID and IoT
            </span>
          </div>
        </div>

        {/* Layer Toggle Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setShowBoundaries(!showBoundaries)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium transition-all ${
              showBoundaries
                ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-600/30 dark:text-blue-300 dark:border-blue-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lease Bounds</span>
          </button>

          <button
            onClick={() => setShowSensors(!showSensors)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium transition-all ${
              showSensors
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-600/30 dark:text-emerald-300 dark:border-emerald-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Sensors ({MINE_ZONES.length})</span>
          </button>

          <button
            onClick={() => setShowFleet(!showFleet)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium transition-all ${
              showFleet
                ? 'bg-cyan-50 text-cyan-800 border-cyan-300 dark:bg-cyan-600/30 dark:text-cyan-300 dark:border-cyan-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>HEMM GPS ({FLEET_TELEMETRY.length})</span>
          </button>

          <button
            onClick={() => setShowThermal(!showThermal)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium transition-all ${
              showThermal
                ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-600/30 dark:text-rose-300 dark:border-rose-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Coal Fires</span>
          </button>

          <button
            onClick={() => setShowSatelliteAlerts(!showSatelliteAlerts)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium transition-all ${
              showSatelliteAlerts
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-600/30 dark:text-amber-300 dark:border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>MSS Satellite</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md h-[520px] bg-slate-100 dark:bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Map Legend Card */}
        <div className="absolute top-4 left-4 z-10 p-3 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs backdrop-blur-md shadow-md space-y-1.5 max-w-[210px]">
          <div className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider mb-1">
            GIS Layer Legend
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
            <span>Nominal Sensor Node</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-rose-600"></span>
            <span>High Risk / Gas Alert</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-sky-600"></span>
            <span>HEMM Live GPS Position</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-orange-600"></span>
            <span>Thermal Subsurface Fire</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>MSS Satellite Buffer Alert</span>
          </div>
        </div>

        {/* Floating Bottom Quick Zoom to Major Subsidiaries */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-1.5 bg-white/95 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 backdrop-blur-md text-xs shadow-md">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold px-2 py-1">Quick Jump:</span>
          {[
            { name: 'SECL (Korba/Gevra)', lat: 22.348, lng: 82.592, zoom: 12 },
            { name: 'NCL (Singrauli)', lat: 24.116, lng: 82.658, zoom: 12 },
            { name: 'BCCL (Jharia)', lat: 23.754, lng: 86.418, zoom: 12 },
            { name: 'MCL (Talcher)', lat: 20.950, lng: 85.216, zoom: 12 }
          ].map((loc, idx) => (
            <button
              key={idx}
              onClick={() => mapInstanceRef.current?.flyTo([loc.lat, loc.lng], loc.zoom, { duration: 1.5 })}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-medium transition-colors"
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
