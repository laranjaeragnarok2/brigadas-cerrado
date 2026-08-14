import React from 'react';
import StatusBadge from './StatusBadge';
import { MapPin, Heart, Flame } from 'lucide-react';

export default function BrigadeCard({ brigade, onApoiar }) {
  const { nome, municipio, status_cor, status_texto, tags_necessidade, descricao, imagem, atendimentos_2026 } = brigade;

  return (
    <div className="brigade-card">
      <div style={{ position: 'relative' }}>
        <img 
          src={imagem || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"} 
          alt={nome} 
          className="brigade-card-image"
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <StatusBadge statusCor={status_cor} statusTexto={status_texto} />
        </div>
      </div>

      <div className="brigade-card-header">
        <h3 className="brigade-card-title">{nome}</h3>
        <div className="brigade-card-location">
          <MapPin size={14} color="#D35400" />
          <span>{municipio}</span>
        </div>
      </div>

      <div className="brigade-card-body">
        <p className="brigade-description">{descricao}</p>

        {atendimentos_2026 && (
          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
            <Flame size={13} color="#C0392B" />
            <span><strong>{atendimentos_2026} atendimentos</strong> em 2026</span>
          </div>
        )}

        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            Necessidades Urgentes:
          </div>
          <div className="tag-list">
            {tags_necessidade && tags_necessidade.map((tag, idx) => (
              <span key={idx} className="tag-item">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="btn-apoiar" onClick={() => onApoiar(brigade)}>
          <Heart size={16} fill="#FFF" />
          Apoiar Brigada
        </button>
      </div>
    </div>
  );
}
