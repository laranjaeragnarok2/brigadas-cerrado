import React from 'react';
import { emergenciaMock } from '../data/mockData';
import { PhoneCall, ShieldAlert, WifiOff, MapPin, Compass, AlertTriangle, Info } from 'lucide-react';

export default function EmergencyView() {
  return (
    <div className="page-container">
      {/* Offline Alert Banner */}
      <div className="section-card" style={{ background: '#FFFBEB', borderLeftColor: '#F59E0B', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <WifiOff size={22} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1rem', color: '#92400E', marginBottom: '2px' }}>
              Página de Emergência (Offline-First)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#B45309', lineHeight: 1.4 }}>
              Esta tela e estes contatos funcionam <strong>mesmo sem internet ou sinal de dados de celular</strong> (salvo no cache de Service Worker do seu smartphone).
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#C0392B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PhoneCall color="#C0392B" size={28} />
          Telefones & Urgência de Fogo
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
          Ligue imediatamente ao identificar foco de incêndio florestal sem controle próximo a Unidades de Conservação ou propriedades.
        </p>
      </div>

      {/* Emergency Contact List */}
      <div style={{ marginBottom: '32px' }}>
        {emergenciaMock.map((contato) => (
          <div key={contato.id} className="emergency-card">
            <div className="emergency-info">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D35400', textTransform: 'uppercase', marginBottom: '2px' }}>
                {contato.tipo}
              </div>
              <h4>{contato.nome}</h4>
              <p>{contato.descricao}</p>
            </div>
            <a 
              href={`tel:${contato.numero.replace(/[^0-9]/g, '')}`} 
              className="btn-call"
            >
              <PhoneCall size={16} />
              {contato.numero}
            </a>
          </div>
        ))}
      </div>

      {/* Wildfire Protocol Instructions */}
      <div className="section-card" style={{ borderLeftColor: '#C0392B' }}>
        <h2 style={{ fontSize: '1.15rem', color: '#C0392B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle color="#C0392B" size={20} />
          Protocolo de Segurança ao Encontrar Fogo
        </h2>

        <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '0.9rem', lineHeight: 1.6 }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Mantenha a Calma e Avalie o Vento:</strong> Nunca fique contra a direção do vento. O fogo no Cerrado se alastra rapidamente com faíscas voadoras.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Ateie-se ao Ponto de Fuga:</strong> Procure áreas já queimadas (área preta) ou aceiros largos como estradas asfaltadas.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Obtenha as Coordenadas GPS:</strong> No seu celular, abra o aplicativo de bússola/mapa para anotar a latitude e longitude exatas.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Avise os Vizinhos e a Brigada Local:</strong> Alerte as comunidades mais próximas e transmita as coordenadas à central do 193.
          </li>
        </ul>
      </div>

      {/* GPS Coordinate Helper */}
      <div className="section-card" style={{ borderLeftColor: '#2C3E50', background: '#F8FAFC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Compass color="#2C3E50" size={20} />
          <h4 style={{ color: '#2C3E50', margin: 0 }}>Como Obter sua Localização GPS sem Internet</h4>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>
          Mesmo sem sinal de dados 4G/5G, o chip GPS do seu smartphone funciona via satélite. Abra o app de Mapas ou Câmera com localização ativada para obter a foto com marca d'água de coordenada antes de repassar à brigada.
        </p>
      </div>
    </div>
  );
}
