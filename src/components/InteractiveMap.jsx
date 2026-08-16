import React, { useState } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para ícones padrão do Leaflet no Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Ícones customizados para focos do Waze Cerrado
const fireIcon = L.divIcon({
  className: 'custom-map-pin danger-pin',
  html: '<div style="background:#A93226; color:#FFF; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #FFF; box-shadow:0 3px 8px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">🔥</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const smokeIcon = L.divIcon({
  className: 'custom-map-pin warning-pin',
  html: '<div style="background:#BF834E; color:#FFF; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #FFF; box-shadow:0 3px 8px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">💨</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const safeIcon = L.divIcon({
  className: 'custom-map-pin success-pin',
  html: '<div style="background:#2D6A4F; color:#FFF; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #FFF; box-shadow:0 3px 8px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">✅</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// Coordenadas Padrão: Alto Paraíso / Cavalcante (Cerrado Goiano)
const DEFAULT_CENTER = [-14.1311, -47.5218];
const DEFAULT_ZOOM = 9;

// Componente para capturar clique no mapa
function LocationPicker({ onSelectLocation }) {
  useMapEvents({
    click(e) {
      if (onSelectLocation) {
        onSelectLocation({ lat: e.latlng.lat.toFixed(4), lng: e.latlng.lng.toFixed(4) });
      }
    },
  });
  return null;
}

export default function InteractiveMap({ reports = [], onSelectLocation, isPickMode = false }) {
  const [mapCenter] = useState(DEFAULT_CENTER);

  const getCoordsForReport = (rep, idx) => {
    if (rep.coords && rep.coords.includes(',')) {
      const parts = rep.coords.split(',');
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
    }
    const offsets = [
      [-14.1311, -47.5218],
      [-13.7964, -47.4583],
      [-14.2800, -47.6500],
      [-13.9200, -47.3800]
    ];
    return offsets[idx % offsets.length];
  };

  return (
    <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #E8DCCF', position: 'relative', zIndex: 1, isolation: 'isolate' }}>
      <MapContainer
        center={mapCenter}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        scrollWheelZoom={false}
      >
        {/* Mapa Base: Esri World Imagery (Satélite Real) */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri World Imagery</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Camada WMS do GeoServer INPE TerraBrasilis para Bioma Cerrado */}
        <WMSTileLayer
          url="https://terrabrasilis.dpi.inpe.br/geoserver/wms"
          layers="prodes-cerrado-nb:accumulated_deforestation_2000"
          format="image/png"
          transparent={true}
          opacity={0.4}
          attribution="INPE / TerraBrasilis"
        />

        {isPickMode && <LocationPicker onSelectLocation={onSelectLocation} />}

        {/* Renderiza marcadores dos relatos */}
        {reports.map((rep, idx) => {
          const pos = getCoordsForReport(rep, idx);
          const icon = rep.type === 'danger' ? fireIcon : rep.type === 'warning' ? smokeIcon : safeIcon;

          return (
            <Marker key={rep.id || idx} position={pos} icon={icon}>
              <Popup>
                <div style={{ fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                  <strong style={{ color: '#8C4526', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>
                    {rep.title}
                  </strong>
                  <div style={{ color: '#A65937', fontWeight: 'bold', marginBottom: '4px' }}>
                    📍 {rep.location}
                  </div>
                  <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#55443A' }}>
                    {rep.description || 'Alerta transmitido por morador.'}
                  </p>
                  {rep.photo && (
                    <img src={rep.photo} alt="Foto" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px', marginTop: '4px' }} />
                  )}
                  <div style={{ fontSize: '0.75rem', color: '#27AE60', fontWeight: 'bold', marginTop: '6px' }}>
                    👍 Confirmado por {rep.confirmations} moradores
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {isPickMode && (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000, background: 'rgba(38,25,20,0.85)', color: '#FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          Clique no mapa para marcar o ponto exato
        </div>
      )}
    </div>
  );
}

