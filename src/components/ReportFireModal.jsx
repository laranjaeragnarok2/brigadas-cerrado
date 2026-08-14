import React, { useState } from 'react';
import { X, Flame, Navigation, Send, CheckCircle2, AlertTriangle, CloudRain } from 'lucide-react';

export default function ReportFireModal({ isOpen, onClose, onAddReport }) {
  const [reportType, setReportType] = useState('danger');
  const [locationName, setLocationName] = useState('');
  const [coords, setCoords] = useState(null);
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [description, setDescription] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: 'rep_' + Date.now(),
      type: reportType,
      title: reportType === 'danger' ? 'Fogo Ativo Avistado' : reportType === 'warning' ? 'Coluna de Fumaça na Serra' : 'Foco Resfriado / Aceiro Concluído',
      location: locationName || 'Alto Paraíso / Cavalcante (GO)',
      coords: coords ? `${coords.lat}, ${coords.lng}` : 'GPS Local',
      description,
      confirmations: 1,
      time: 'Agora mesmo (Relato de Morador)',
      userReported: true
    };

    if (onAddReport) {
      onAddReport(newReport);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
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
              <h3 style={{ color: '#1E8449', marginBottom: '8px' }}>Aviso Registrado no Mapa</h3>
              <p style={{ fontSize: '0.9rem', color: '#56645D' }}>
                Seu relato foi transmitido para a rede de moradores e brigadas comunitárias da região.
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
                    borderRadius: 'var(--radius-md)',
                    border: reportType === 'danger' ? '2px solid #A93226' : '1px solid #E6DFD5',
                    background: reportType === 'danger' ? '#FDEDEC' : '#FFF',
                    color: '#A93226',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <Flame size={22} color="#A93226" />
                  <div>
                    <div>Fogo Ativo / Incêndio na Serra</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78281F' }}>Chamas visíveis com risco de alastramento na vegetação</div>
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
                    borderRadius: 'var(--radius-md)',
                    border: reportType === 'warning' ? '2px solid #D68910' : '1px solid #E6DFD5',
                    background: reportType === 'warning' ? '#FEF9E7' : '#FFF',
                    color: '#B7950B',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <AlertTriangle size={22} color="#D68910" />
                  <div>
                    <div>Coluna de Fumaça Densa</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#7D6608' }}>Fumaça vista à distância sem enxergar as chamas</div>
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
                    borderRadius: 'var(--radius-md)',
                    border: reportType === 'success' ? '2px solid #1E8449' : '1px solid #E6DFD5',
                    background: reportType === 'success' ? '#EAFAF1' : '#FFF',
                    color: '#1E8449',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <CloudRain size={22} color="#1E8449" />
                  <div>
                    <div>Rescaldo Concluído / Aceiro</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#145A32' }}>Foco extinto ou queimada controlada finalizada</div>
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
                      background: '#1B2E24',
                      color: '#FFF',
                      padding: '0 12px',
                      borderRadius: 'var(--radius-md)',
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

              <button type="submit" className="btn-apoiar" style={{ background: '#BC4712' }}>
                <Send size={18} /> Transmitir Aviso à Comunidade
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
