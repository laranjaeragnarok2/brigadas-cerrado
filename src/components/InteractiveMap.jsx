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

// Coordenadas Padrão: Corredor de Goiás (Chapada, Cavalcante, Pirenópolis, Brasília, Goiânia)
const DEFAULT_CENTER = [-14.8000, -48.5000];
const DEFAULT_ZOOM = 7;

// Gerador dinâmico de ícones tipo pino para Leaflet
function getMarkerIcon(type) {
  if (type === 'danger') {
    return L.divIcon({
      className: 'custom-map-pin danger-pin',
      html: '<div style="background:#C0392B; color:#FFFFFF; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #FFFFFF; box-shadow:0 4px 14px rgba(192,57,43,0.7); font-size:16px; font-weight:bold;">🔥</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17]
    });
  }
  if (type === 'warning') {
    return L.divIcon({
      className: 'custom-map-pin warning-pin',
      html: '<div style="background:#D35400; color:#FFFFFF; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #FFFFFF; box-shadow:0 4px 14px rgba(211,84,0,0.7); font-size:16px; font-weight:bold;">💨</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17]
    });
  }
  return L.divIcon({
    className: 'custom-map-pin success-pin',
    html: '<div style="background:#27AE60; color:#FFFFFF; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #FFFFFF; box-shadow:0 4px 14px rgba(39,174,96,0.7); font-size:16px; font-weight:bold;">✅</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17]
  });
}

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
    if (rep && rep.coords && typeof rep.coords === 'string' && rep.coords.includes(',')) {
      const parts = rep.coords.split(',');
      const lat = parseFloat(parts[0].trim());
      const lng = parseFloat(parts[1].trim());
      if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
    }
    // Offsets distribuídos pelas regiões do Estado de Goiás
    const offsetsGoiás = [
      [-14.1311, -47.5218], // Chapada dos Veadeiros / Alto Paraíso
      [-13.7964, -47.4583], // Cavalcante / Vão de Almas (Kalunga)
      [-15.8504, -48.9583], // Pirenópolis / Serra dos Pyreneus
      [-17.5683, -52.5511], // Mineiros / Parque Nacional das Emas
      [-14.4842, -46.1114], // Mambaí / Nordeste Goiano
      [-17.7441, -48.6258]  // Caldas Novas / Serra de Caldas
    ];
    return offsetsGoiás[idx % offsetsGoiás.length];
  };

  const defaultGoiásFocos = [
    { id: 'f_go_1', type: 'danger', title: 'Foco em Encosta de Serra', location: 'Alto Paraíso de Goiás (GO-237 km 14)', coords: '-14.1311, -47.5218', description: 'Chamas avançando na vegetação alta.', confirmations: 12 },
    { id: 'f_go_2', type: 'warning', title: 'Coluna de Fumaça Branca', location: 'Cavalcante - Limite Quilombo Kalunga', coords: '-13.7964, -47.4583', description: 'Fumaça espessa avistada do vale.', confirmations: 8 },
    { id: 'f_go_3', type: 'danger', title: 'Incêndio Florestal em Serra', location: 'Pirenópolis - Parque dos Pyreneus', coords: '-15.8504, -48.9583', description: 'Foco ativo próximo à divisa do parque.', confirmations: 15 },
    { id: 'f_go_4', type: 'warning', title: 'Alerta Preventivo de Queimada', location: 'Mineiros - Parque Nacional das Emas', coords: '-17.5683, -52.5511', description: 'Rondas de monitoramento no perímetro.', confirmations: 5 },
    { id: 'f_go_5', type: 'danger', title: 'Foco de Calor em Vereda', location: 'Mambaí - Nordeste Goiano', coords: '-14.4842, -46.1114', description: 'Moradores relataram início de foco.', confirmations: 9 }
  ];

  const mapReports = (reports && reports.length > 0) ? reports : defaultGoiásFocos;

  return (
    <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #E8DCCF', position: 'relative', zIndex: 1, isolation: 'isolate' }}>
      <MapContainer
        center={mapCenter}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        scrollWheelZoom={false}
      >
        {/* Mapa Base: Esri World Imagery (Satélite Real Alta Resolução) */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri World Imagery</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Camada Vetorial de Divisas, Estradas e Nomes de Cidades (Estilo GeaMap GIS Pro) */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Camada WMS do GeoServer INPE TerraBrasilis para Bioma Cerrado */}
        <WMSTileLayer
          url="https://terrabrasilis.dpi.inpe.br/geoserver/wms"
          layers="prodes-cerrado-nb:accumulated_deforestation_2000"
          format="image/png"
          transparent={true}
          opacity={0.35}
          attribution="INPE / TerraBrasilis"
        />

        {/* Camada WMS do CENSIPAM Painel do Fogo (Territórios Protegidos & Quilombolas) */}
        <WMSTileLayer
          url="https://panorama.sipam.gov.br/geoserver/wms"
          layers="painel_do_fogo:area_quilombola"
          format="image/png"
          transparent={true}
          opacity={0.4}
          attribution="CENSIPAM / Painel do Fogo"
        />

        {isPickMode && <LocationPicker onSelectLocation={onSelectLocation} />}

        {/* Renderiza marcadores dos relatos */}
        {mapReports.map((rep, idx) => {
          const pos = getCoordsForReport(rep, idx);
          const customIcon = getMarkerIcon(rep.type || 'danger');

          return (
            <Marker key={rep.id || idx} position={pos} icon={customIcon}>
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
                    👍 Confirmado por {rep.confirmations || 1} moradores
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



