import React from 'react';
import { estatisticasGlobais, brigadasMock } from '../data/mockData';
import BrigadeCard from '../components/BrigadeCard';
import { Flame, ShieldAlert, HeartHandshake, Trees, Users, ArrowRight, ShieldCheck, Navigation, ThumbsUp, Radio, MapPin } from 'lucide-react';

export default function DashboardView({ onNavigate, onApoiar, onOpenReportModal, communityReports, onConfirmReport }) {
  const brigadasUrgentes = brigadasMock.filter(b => b.status_cor === 'danger' || b.status_cor === 'warning');

  return (
    <div className="page-container">
      {/* Banner de Alerta do Combate em Goiás */}
      <div className="alert-banner">
        <div className="alert-banner-icon">
          <Flame size={26} color="#FFF" />
        </div>
        <div className="alert-banner-content">
          <h4>Mutirão de Combate: Chapada & Vão dos Kalungas</h4>
          <p>
            Trompas de solo voluntárias atuando em áreas de serra na Chapada dos Veadeiros e Cavalcante. Ajude os brigadistas locais com água, marmitas e combustível para 4x4!
          </p>
        </div>
      </div>

      {/* Ticker de Avisos em Tempo Real (Estilo Waze do Cerrado) */}
      <div className="section-card" style={{ borderLeftColor: '#BC4712', background: '#FDF7F3', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={20} color="#BC4712" className="spin" />
            <h3 style={{ fontSize: '1.1rem', color: '#1B2E24', margin: 0 }}>
              Relatos da Comunidade (Waze do Cerrado)
            </h3>
          </div>
          <button
            onClick={onOpenReportModal}
            style={{
              background: '#BC4712',
              color: '#FFF',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(188, 71, 18, 0.3)',
              border: 'none'
            }}
          >
            <Navigation size={14} /> Avistei Fogo ou Fumaça
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {communityReports && communityReports.length > 0 ? (
            communityReports.map((rep) => (
              <div 
                key={rep.id} 
                style={{
                  background: '#FFF',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E6DFD5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1B2E24' }}>{rep.title}</span>
                    <span style={{ fontSize: '0.72rem', background: '#F2EDE4', color: '#8C2D19', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      📍 {rep.location}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#56645D' }}>
                    {rep.description || "Alerta reportado por moradores na estrada."} • <span style={{ color: '#BC4712', fontWeight: 700 }}>{rep.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => onConfirmReport(rep.id)}
                  style={{
                    background: '#F8F6F0',
                    color: '#1B2E24',
                    border: '1px solid #D5CBB9',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <ThumbsUp size={14} color="#BC4712" />
                  Confirmado por moradores ({rep.confirmations})
                </button>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '0.85rem', color: '#56645D' }}>Nenhum relato de fumaça reportado no momento.</p>
          )}
        </div>
      </div>

      {/* Estatísticas do Bioma em Goiás */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trees color="#BC4712" size={20} />
        O Panorama no Cerrado Goiano
      </h2>

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        <div className="section-card" style={{ borderLeftColor: '#A93226', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#56645D', fontWeight: 700, textTransform: 'uppercase' }}>Focos de Calor</span>
            <Flame size={20} color="#A93226" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#A93226', margin: '4px 0' }}>
            {estatisticasGlobais.focosAtivos}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#56645D' }}>Monitorados pelas brigadas locais</div>
        </div>

        <div className="section-card" style={{ borderLeftColor: '#1E8449', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#56645D', fontWeight: 700, textTransform: 'uppercase' }}>Área Preservada</span>
            <ShieldCheck size={20} color="#1E8449" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1E8449', margin: '4px 0' }}>
            {estatisticasGlobais.hectaresProtegidos}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#56645D' }}>Área salva na estiagem 2026</div>
        </div>

        <div className="section-card" style={{ borderLeftColor: '#BC4712', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#56645D', fontWeight: 700, textTransform: 'uppercase' }}>Brigadas Mapeadas</span>
            <Users size={20} color="#BC4712" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#BC4712', margin: '4px 0' }}>
            {estatisticasGlobais.brigadasAtivas}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#56645D' }}>Comunitárias e voluntárias</div>
        </div>
      </div>

      {/* Chamada para Ação Rústica */}
      <div className="section-card" style={{ background: 'linear-gradient(135deg, #1B2E24, #122119)', color: '#FFF', borderLeftColor: '#BC4712' }}>
        <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '8px' }}>
          Quem conhece a terra é quem combate o fogo.
        </h3>
        <p style={{ color: '#E6DFD5', fontSize: '0.9rem', marginBottom: '18px', lineHeight: 1.5 }}>
          As doações feitas aqui vão <strong>direto para o PIX do presidente da associação ou do grupo de brigadistas</strong> da comunidade. Sem taxas, sem intermediários.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className="btn-apoiar" 
            onClick={() => onNavigate('/brigadas')}
            style={{ width: 'auto', padding: '10px 22px' }}
          >
            Apoiar uma Brigada Local <ArrowRight size={16} />
          </button>
          <button 
            onClick={() => onNavigate('/voluntariado')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFF',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <HeartHandshake size={16} /> Voluntariar de Onde Estiver
          </button>
        </div>
      </div>

      {/* Lista de Brigadas Urgentes */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert color="#A93226" size={20} />
          Brigadas Precisando de Insumos Imediatos
        </h2>
        <button 
          onClick={() => onNavigate('/brigadas')}
          style={{ background: 'transparent', color: '#BC4712', fontWeight: 800, fontSize: '0.85rem' }}
        >
          Ver Todas as {brigadasMock.length} Brigadas →
        </button>
      </div>

      <div className="grid-2">
        {brigadasUrgentes.map((brigade) => (
          <BrigadeCard key={brigade.id} brigade={brigade} onApoiar={onApoiar} />
        ))}
      </div>
    </div>
  );
}
