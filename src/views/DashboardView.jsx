import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { Flame, Trees, Users, AlertCircle, History, Check, Navigation } from 'lucide-react';

export default function DashboardView({ onNavigate, onOpenReportModal, communityReports = [] }) {
  const [mapToggle, setMapToggle] = useState('focos');

  return (
    <div className="page-container">
      {/* Top Banner de Alerta Crítico Escuro */}
      <div className="critical-alert-card">
        <div className="critical-alert-header">
          <div className="critical-icon-circle">
            <AlertCircle size={22} color="#C0392B" />
          </div>
          <div>
            <div className="critical-alert-title">Alerta Crítico</div>
            <div className="critical-alert-body">
              Incêndio florestal de grandes proporções na Chapada dos Veadeiros. Evacuação recomendada na zona norte.
            </div>
          </div>
        </div>
        <button className="btn-alert-details" onClick={() => onNavigate('/brigadas')}>
          Ver Detalhes
        </button>
      </div>

      {/* Mapa de Satélite Interativo com Toggles Superiores */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setMapToggle('focos')}
            style={{
              background: mapToggle === 'focos' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
              color: mapToggle === 'focos' ? '#362219' : '#735C50',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #E8DCCF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Focos Ativos
          </button>
          <button
            onClick={() => setMapToggle('seguras')}
            style={{
              background: mapToggle === 'seguras' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
              color: mapToggle === 'seguras' ? '#362219' : '#735C50',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #E8DCCF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={12} color="#27AE60" /> Zonas Seguras
          </button>
        </div>

        <InteractiveMap reports={communityReports} />
      </div>

      {/* Grid de 3 Cards de Métricas */}
      <div className="metrics-3grid">
        <div className="metric-card-single">
          <div className="metric-icon-wrap">
            <Flame size={20} color="#C0392B" />
          </div>
          <div className="metric-val-big">32</div>
          <div className="metric-label-sub">FOCOS ATIVOS</div>
        </div>

        <div className="metric-card-single">
          <div className="metric-icon-wrap" style={{ color: '#27AE60' }}>
            <Trees size={20} color="#27AE60" />
          </div>
          <div className="metric-val-big">1.2k</div>
          <div className="metric-label-sub">HA. SALVOS</div>
        </div>

        <div className="metric-card-single full-width">
          <div className="metric-icon-wrap" style={{ color: '#8C4526' }}>
            <Users size={20} color="#8C4526" />
          </div>
          <div className="metric-val-big">12</div>
          <div className="metric-label-sub">BRIGADAS EM CAMPO</div>
        </div>
      </div>

      {/* Feed de Incidentes */}
      <div className="incident-feed-title-row">
        <h3 style={{ fontSize: '1.15rem', color: '#362219' }}>Feed de Incidentes</h3>
        <History size={18} color="#735C50" />
      </div>

      {/* Cards de Incidentes */}
      <div className="incident-card-item">
        <div className="incident-header-row">
          <div className="incident-item-title">Fumaça em Pirenópolis</div>
          <div className="incident-time">Há 5 min</div>
        </div>
        <div className="incident-desc">
          Relato de coluna de fumaça densa avistada próximo à Serra dos Pireneus.
        </div>
        <div className="badge-confirmed">
          <Check size={12} /> Confirmado (15)
        </div>
      </div>

      <div className="incident-card-item">
        <div className="incident-header-row">
          <div className="incident-item-title">Foco Extinto - Cavalcante</div>
          <div className="incident-time">Há 45 min</div>
        </div>
        <div className="incident-desc">
          Brigada Kalunga reportou extinção total do foco na região do Vão de Almas.
        </div>
        <div className="badge-resolved">
          Resolvido
        </div>
      </div>

      <div className="incident-card-item">
        <div className="incident-header-row">
          <div className="incident-item-title">Suspeita de Fogo - Alto Paraíso</div>
          <div className="incident-time">Há 1h</div>
        </div>
        <div className="incident-desc">
          Turistas relataram cheiro forte de queimado na trilha dos Saltos.
        </div>
      </div>

      {/* Botão Flutuante FAB para Marcador no Mapa / Relato */}
      <button className="fab-pin-btn" onClick={onOpenReportModal} aria-label="Abrir Novo Relato">
        <Navigation size={22} />
      </button>
    </div>
  );
}

