import React, { useState } from 'react';
import { X, Flame, Navigation, Send, CheckCircle2, AlertTriangle, CloudRain, Camera, Trash2, Phone } from 'lucide-react';

export default function ReportFireModal({ isOpen, onClose, onAddReport }) {
  const [reportType, setReportType] = useState('danger');
  const [locationName, setLocationName] = useState('');
  const [coords, setCoords] = useState(null);
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGetGps = () => {
    setIsGettingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4)
          });
          setIsGettingGps(false);
        },
        (error) => {
          console.warn("GPS error:", error);
          alert("Digite o ponto de referência ou cidade manualmente.");
          setIsGettingGps(false);
        },
        { timeout: 8000 }
      );
    } else {
      alert("Navegador não suporta captura automática de GPS.");
      setIsGettingGps(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: 'rep_' + Date.now(),
      type: reportType,
      title: reportType === 'danger' ? 'Fogo Ativo Avistado' : reportType === 'warning' ? 'Coluna de Fumaça na Serra' : 'Foco Resfriado / Aceiro Concluído',
      location: locationName || 'Alto Paraíso / Cavalcante (GO)',
      coords: coords ? `${coords.lat}, ${coords.lng}` : 'GPS Local',
      description,
      contactInfo,
      photo: photoPreview,
      confirmations: 1,
      time: 'Agora mesmo (Relato com Contato e Foto)',
      userReported: true
    };

    if (onAddReport) {
      onAddReport(newReport);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setPhotoPreview(null);
      setLocationName('');
      setDescription('');
      setContactInfo('');
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={20} color="#FFF" />
            <h3>Aviso de Fogo ou Fumaça</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <CheckCircle2 size={48} color="#1E8449" style={{ marginBottom: '12px' }} />
              <h3 style={{ color: '#1E8449', marginBottom: '8px' }}>Aviso Registrado com Sucesso</h3>
              <p style={{ fontSize: '0.9rem', color: '#56645D' }}>
                Seu relato foi transmitido para a rede de moradores e brigadas comunitárias.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.875rem', color: '#56645D', marginBottom: '16px', lineHeight: 1.45 }}>
                Avistou fogo ou fumaça na estrada ou no morro? Avise a comunidade local:
              </p>

              {/* Botões Seletores de Ocorrência */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setReportType('danger')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--md-shape-corner-medium)',
                    border: reportType === 'danger' ? '2px solid #A93226' : '1px solid #D4C7B8',
                    background: reportType === 'danger' ? '#F7EFE9' : '#FFF',
                    color: '#A93226',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <Flame size={22} color="#A93226" />
                  <div>
                    <div>Fogo Ativo / Incêndio na Serra</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B4D3E' }}>Chamas visíveis com risco de alastramento na vegetação</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setReportType('warning')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--md-shape-corner-medium)',
                    border: reportType === 'warning' ? '2px solid #BF834E' : '1px solid #D4C7B8',
                    background: reportType === 'warning' ? '#F9F2EA' : '#FFF',
                    color: '#BF834E',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <AlertTriangle size={22} color="#BF834E" />
                  <div>
                    <div>Coluna de Fumaça Densa</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B4D3E' }}>Fumaça vista à distância sem enxergar as chamas</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setReportType('success')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--md-shape-corner-medium)',
                    border: reportType === 'success' ? '2px solid #2D6A4F' : '1px solid #D4C7B8',
                    background: reportType === 'success' ? '#EDF3EF' : '#FFF',
                    color: '#2D6A4F',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <CloudRain size={22} color="#2D6A4F" />
                  <div>
                    <div>Rescaldo Concluído / Aceiro</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#2D6A4F' }}>Foco extinto ou queimada controlada finalizada</div>
                  </div>
                </button>
              </div>

              {/* Ponto de Referência / GPS */}
              <div className="form-group">
                <label>Ponto de Referência ou Rodovia *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Rodovia GO-237 km 18 / Entroncamento da Chapada"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleGetGps}
                    style={{
                      background: '#593122',
                      color: '#FFF',
                      padding: '0 12px',
                      borderRadius: 'var(--md-shape-corner-medium)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Navigation size={14} className={isGettingGps ? 'spin' : ''} />
                    {coords ? `${coords.lat}, ${coords.lng}` : 'Obter GPS'}
                  </button>
                </div>
              </div>

              {/* Botão de Fotografia Opcional */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={16} color="#A66844" />
                  Fotografia da Ocorrência (Opcional)
                </label>

                {photoPreview ? (
                  <div style={{ position: 'relative', marginTop: '6px', borderRadius: 'var(--md-shape-corner-medium)', overflow: 'hidden', border: '1px solid #D4C7B8' }}>
                    <img 
                      src={photoPreview} 
                      alt="Pré-visualização da foto" 
                      style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} 
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(38, 25, 20, 0.75)',
                        color: '#FFF',
                        padding: '6px 12px',
                        borderRadius: 'var(--md-shape-corner-small)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} /> Remover Foto
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      background: '#F5EFE8',
                      border: '2px dashed #D4C7B8',
                      borderRadius: 'var(--md-shape-corner-medium)',
                      color: '#593122',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Camera size={18} color="#A66844" />
                    <span>Tirar Foto ou Escolher Imagem</span>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>

              {/* Campo para Contato de Verificação (Opcional) */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} color="#A66844" />
                  Seu WhatsApp ou Telefone para Verificação (Opcional)
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Ex: (62) 99999-8888 (Para checagem da brigada)"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
                <span style={{ fontSize: '0.72rem', color: '#6B4D3E', marginTop: '2px', display: 'block' }}>
                  Usado apenas pelas brigadas comunitárias caso precisem confirmar a direção exata.
                </span>
              </div>

              <div className="form-group">
                <label>Observação (Opcional)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Ex: Fogo descendo a serra sentido povoado..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-apoiar" style={{ background: '#A66844' }}>
                <Send size={18} /> Transmitir Aviso à Comunidade
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
