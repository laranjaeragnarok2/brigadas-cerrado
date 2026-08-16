import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { Flame, Trees, Users, AlertCircle, History, Check, Navigation } from 'lucide-react';

export default function DashboardView({ onNavigate, onOpenReportModal, communityReports = [], onConfirmReport, confirmedReportIds = [] }) {
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
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button className="btn-alert-details" style={{ flex: 1 }} onClick={() => onNavigate('/emergencia')}>
            🚨 Ligar Emergência 193
          </button>
          <button className="btn-alert-details" style={{ flex: 1, background: 'rgba(255,255,255,0.15)', color: '#FFF' }} onClick={() => onNavigate('/brigadas')}>
            Ver Detalhes
          </button>
        </div>
      </div>


      {/* Mapa de Satélite Interativo com Toggles no Canto Inferior Direito */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000, display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setMapToggle('focos')}
            style={{
              background: mapToggle === 'focos' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
              color: mapToggle === 'focos' ? '#362219' : '#735C50',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #E8DCCF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
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
              background: mapToggle === 'seguras' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
              color: mapToggle === 'seguras' ? '#362219' : '#735C50',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #E8DCCF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
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
          <div className="metric-val-big">{communityReports.length > 0 ? communityReports.length * 4 + 10 : 32}</div>
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

      {/* Cards de Incidentes Dinâmicos */}
      {communityReports && communityReports.length > 0 ? (
        communityReports.map((rep) => {
          const isConfirmed = confirmedReportIds.includes(rep.id);

          return (
            <div key={rep.id} className="incident-card-item">
              <div className="incident-header-row">
                <div className="incident-item-title">{rep.title}</div>
                <div className="incident-time">{rep.time || 'Recente'}</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#8C4526', fontWeight: 700, marginBottom: '4px' }}>
                📍 {rep.location}
              </div>
              <div className="incident-desc">
                {rep.description || 'Alerta transmitido via aplicativo.'}
              </div>

              {rep.photo && (
                <img
                  src={rep.photo}
                  alt="Evidência"
                  style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                {rep.type === 'success' ? (
                  <div className="badge-resolved">
                    Resolvido
                  </div>
                ) : (
                  <button
                    onClick={() => onConfirmReport && onConfirmReport(rep.id)}
                    className="badge-confirmed"
                    style={{ border: 'none', cursor: 'pointer', opacity: isConfirmed ? 1 : 0.85 }}
                  >
                    <Check size={12} /> {isConfirmed ? 'Você confirmou' : 'Confirmar'} ({rep.confirmations || 1})
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '24px', color: '#735C50', fontSize: '0.88rem' }}>
          Nenhum incidente registrado no momento.
        </div>
      )}

      {/* Botão Flutuante FAB para Marcador no Mapa / Relato */}
      <button className="fab-pin-btn" onClick={onOpenReportModal} aria-label="Abrir Novo Relato">
        <Navigation size={22} />
      </button>
    </div>
  );
}


