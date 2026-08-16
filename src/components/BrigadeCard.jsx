import React from 'react';
import { MapPin, QrCode, CheckCircle2, Flame, AlertTriangle, Shield, Heart } from 'lucide-react';

export default function BrigadeCard({ brigade, onApoiar, onDetails }) {
  const {
    nome,
    municipio,
    status_cor,
    status_texto,
    tags_necessidade,
    descricao,
    imagem,
    inpe_verified = true,
    pending_verif = false,
    meta_arrecadada,
    meta_total
  } = brigade;

  // Determinar classe do badge de overlay superior esquerdo da foto
  const getBadgeOverlayClass = () => {
    if (status_cor === 'danger') return 'badge-overlay-top-left';
    if (status_cor === 'warning') return 'badge-overlay-top-left high-risk';
    return 'badge-overlay-top-left monitoring';
  };

  const getOverlayIcon = () => {
    if (status_cor === 'danger') return <Flame size={12} fill="#FFF" color="#FFF" />;
    if (status_cor === 'warning') return <AlertTriangle size={12} color="#FFF" />;
    return <Shield size={12} color="#2980B9" />;
  };

  return (
    <div className="brigade-card-cerrado">
      <div className="brigade-card-image-wrap">
        <img
          src={imagem || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"}
          alt={nome}
          className="brigade-card-img"
          loading="lazy"
        />
        <div className={getBadgeOverlayClass()}>
          {getOverlayIcon()}
          <span>{status_texto || 'Active Fire'}</span>
        </div>
      </div>

      <div className="brigade-card-content">
        <div className="brigade-card-title-row">
          <h3 className="brigade-card-name">{nome}</h3>
          {inpe_verified && !pending_verif && (
            <span className="badge-inpe-verified">
              <CheckCircle2 size={11} /> INPE
            </span>
          )}
          {pending_verif && (
            <span className="badge-pending-verified">
              Pending Verif.
            </span>
          )}
        </div>

        <div className="brigade-card-location-text">
          <MapPin size={13} color="#735C50" />
          <span>{municipio}</span>
        </div>

        <p className="brigade-card-desc">{descricao}</p>

        {tags_necessidade && tags_necessidade.length > 0 && (
          <div>
            <div className="needs-label">
              {meta_arrecadada ? 'Fundraising for:' : 'Urgent Needs:'}
            </div>
            <div className="needs-chips-row">
              {tags_necessidade.map((need, idx) => (
                <span key={idx} className="need-chip">
                  {need}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Barra de Progresso se houver meta financeira */}
        {meta_total && (
          <div className="progress-container">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(100, (meta_arrecadada / meta_total) * 100)}%` }} 
              />
            </div>
            <div className="progress-label-val">
              R$ {meta_arrecadada.toLocaleString('pt-BR')} / {meta_total.toLocaleString('pt-BR')}
            </div>
          </div>
        )}

        {/* Botão ou Grupo de Botões */}
        {pending_verif ? (
          <div className="btn-group-row">
            <button className="btn-outline-details" onClick={() => onDetails && onDetails(brigade)}>
              Details
            </button>
            <button className="btn-solid-donate" onClick={() => onApoiar(brigade)}>
              <Heart size={15} fill="#FFF" /> Donate
            </button>
          </div>
        ) : (
          <button className="btn-pix-full" onClick={() => onApoiar(brigade)}>
            <QrCode size={16} /> Apoiar via PIX
          </button>
        )}
      </div>
    </div>
  );
}

