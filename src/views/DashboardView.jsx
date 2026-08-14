import React from 'react';
import { estatisticasGlobais, brigadasMock } from '../data/mockData';
import BrigadeCard from '../components/BrigadeCard';
import InteractiveMap from '../components/InteractiveMap';
import { Flame, ShieldAlert, HeartHandshake, Trees, Users, ArrowRight, ShieldCheck, Navigation, ThumbsUp, Radio, Check } from 'lucide-react';

export default function DashboardView({ onNavigate, onApoiar, onOpenReportModal, communityReports, onConfirmReport, confirmedReportIds = [] }) {
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
            Tropas de solo voluntárias atuando em áreas de serra na Chapada dos Veadeiros e Cavalcante. Ajude os brigadistas locais com água, marmitas e combustível para 4x4!
          </p>
        </div>
      </div>

      {/* Seção de Mapeamento e Relatos com Mapa Interativo */}
      <div className="section-card" style={{ borderLeftColor: '#A66844', background: '#F9F4EE', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={20} color="#A66844" className="spin" />
            <h3 style={{ fontSize: '1.1rem', color: '#593122', margin: 0 }}>
              Mapa e Relatos da Comunidade
            </h3>
          </div>
          <button
            onClick={onOpenReportModal}
            style={{
              background: '#A66844',
              color: '#FFF',
              padding: '8px 16px',
              borderRadius: 'var(--md-shape-corner-medium)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--md-elevation-1)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Navigation size={14} /> Avistei Fogo ou Fumaça
          </button>
        </div>

        {/* Mapa Interativo OpenStreetMap */}
        <div style={{ marginBottom: '16px' }}>
          <InteractiveMap reports={communityReports} />
        </div>

        {/* Ticker de Relatos com Validação Única por Usuário */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {communityReports && communityReports.length > 0 ? (
            communityReports.map((rep) => {
              const isAlreadyConfirmed = confirmedReportIds.includes(rep.id);

              return (
                <div 
                  key={rep.id} 
                  style={{
                    background: '#FFF',
                    padding: '14px',
                    borderRadius: 'var(--md-shape-corner-medium)',
                    border: '1px solid #E5DDD3',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#261914' }}>{rep.title}</span>
                        <span style={{ fontSize: '0.72rem', background: '#F0EAE1', color: '#593122', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          📍 {rep.location}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#6B4D3E' }}>
                        {rep.description || "Alerta reportado por moradores."} • <span style={{ color: '#A66844', fontWeight: 700 }}>{rep.time}</span>
                      </div>
                    </div>

                    {/* Botão de Confirmação Única */}
                    <button
                      onClick={() => onConfirmReport(rep.id)}
                      style={{
                        background: isAlreadyConfirmed ? '#EDF3EF' : '#F5EFE8',
                        color: isAlreadyConfirmed ? '#2D6A4F' : '#593122',
                        border: isAlreadyConfirmed ? '1px solid #C7E9D1' : '1px solid #D4C7B8',
                        padding: '6px 14px',
                        borderRadius: 'var(--md-shape-corner-small)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title={isAlreadyConfirmed ? 'Você já confirmou este aviso (Clique para remover)' : 'Confirmar que este aviso é real'}
                    >
                      {isAlreadyConfirmed ? (
                        <>
                          <Check size={14} color="#2D6A4F" />
                          Você confirmou ({rep.confirmations})
                        </>
                      ) : (
                        <>
                          <ThumbsUp size={14} color="#A66844" />
                          Confirmado por moradores ({rep.confirmations})
                        </>
                      )}
                    </button>
                  </div>

                  {/* Foto da ocorrência */}
                  {rep.photo && (
                    <div style={{ marginTop: '4px', borderRadius: 'var(--md-shape-corner-small)', overflow: 'hidden', border: '1px solid #E5DDD3' }}>
                      <img src={rep.photo} alt="Foto da ocorrência" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p style={{ fontSize: '0.85rem', color: '#6B4D3E' }}>Nenhum relato de fumaça reportado no momento.</p>
          )}
        </div>
      </div>

      {/* Estatísticas do Bioma em Goiás */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trees color="#A66844" size={20} />
        O Panorama no Cerrado Goiano
      </h2>

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        <div className="section-card" style={{ borderLeftColor: '#A66844', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#6B4D3E', fontWeight: 700, textTransform: 'uppercase' }}>Focos de Calor</span>
            <Flame size={20} color="#A66844" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#A66844', margin: '4px 0' }}>
            {estatisticasGlobais.focosAtivos}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B4D3E' }}>Monitorados por Satélites + Comunidade</div>
        </div>

        <div className="section-card" style={{ borderLeftColor: '#2D6A4F', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#6B4D3E', fontWeight: 700, textTransform: 'uppercase' }}>Área Preservada</span>
            <ShieldCheck size={20} color="#2D6A4F" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2D6A4F', margin: '4px 0' }}>
            {estatisticasGlobais.hectaresProtegidos}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B4D3E' }}>Área salva na estiagem 2026</div>
        </div>

        <div className="section-card" style={{ borderLeftColor: '#BF834E', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: '#6B4D3E', fontWeight: 700, textTransform: 'uppercase' }}>Brigadas Mapeadas</span>
            <Users size={20} color="#BF834E" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#BF834E', margin: '4px 0' }}>
            {estatisticasGlobais.brigadasAtivas}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B4D3E' }}>Comunitárias e voluntárias</div>
        </div>
      </div>

      {/* Chamada para Ação */}
      <div className="section-card" style={{ background: 'linear-gradient(135deg, #593122, #422317)', color: '#FFF', borderLeftColor: '#A66844' }}>
        <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '8px' }}>
          Quem conhece a terra é quem combate o fogo.
        </h3>
        <p style={{ color: '#E8DFD3', fontSize: '0.9rem', marginBottom: '18px', lineHeight: 1.5 }}>
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
              borderRadius: 'var(--md-shape-corner-medium)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer'
            }}
          >
            <HeartHandshake size={16} /> Voluntariar de Onde Estiver
          </button>
        </div>
      </div>

      {/* Lista de Brigadas Urgentes */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert color="#A66844" size={20} />
          Brigadas Precisando de Insumos Imediatos
        </h2>
        <button 
          onClick={() => onNavigate('/brigadas')}
          style={{ background: 'transparent', color: '#A66844', fontWeight: 800, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
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
