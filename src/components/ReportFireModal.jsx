import React, { useState, useEffect } from 'react';

import { X, Flame, Cloud, Droplet, Navigation, Camera, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ReportFireModal({ isOpen, onClose, onAddReport }) {
  const [reportType, setReportType] = useState('danger');
  const [locationName, setLocationName] = useState('');
  const [coords, setCoords] = useState({ lat: '-15.7942', lng: '-47.8821' });
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      handleGetGps();
    }
  }, [isOpen]);

  const handleGetGps = () => {
    setIsGettingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4)
          });
          setIsGettingGps(false);
        },
        (err) => {
          console.warn("Permissão de GPS negada ou indisponível:", err);
          setIsGettingGps(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsGettingGps(false);
    }
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: 'rep_' + Date.now(),
      type: reportType,
      title: reportType === 'danger' ? 'Fogo Ativo' : reportType === 'warning' ? 'Coluna de Fumaça' : 'Rescaldo',
      location: locationName || 'Chapada dos Veadeiros, GO',
      coords: `${coords.lat}, ${coords.lng}`,
      photo: photoPreview,
      confirmations: 1,
      time: 'Agora mesmo'
    };

    if (onAddReport) onAddReport(newReport);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-cerrado" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title-header">
          <button className="btn-icon-close" onClick={onClose} aria-label="Fechar">
            <X size={22} />
          </button>

          <h3>Novo Relato de Fogo</h3>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <CheckCircle2 size={48} color="#27AE60" style={{ marginBottom: '12px' }} />
            <h3 style={{ color: '#27AE60', marginBottom: '8px' }}>Alerta Enviado com Sucesso</h3>
            <p style={{ fontSize: '0.88rem', color: '#735C50' }}>Transmitido para a comunidade e brigadas locais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Tipo de Ocorrência - 3 Cards */}
            <div className="form-group">
              <label>Tipo de Ocorrência</label>
              <div className="incident-3cards-grid">
                <button
                  type="button"
                  className={`occurrence-type-card ${reportType === 'danger' ? 'selected-danger' : ''}`}
                  onClick={() => setReportType('danger')}
                >
                  <Flame size={24} color={reportType === 'danger' ? '#FFFFFF' : '#8C4526'} />
                  <span className="occurrence-card-label">Fogo Ativo</span>
                </button>

                <button
                  type="button"
                  className={`occurrence-type-card ${reportType === 'warning' ? 'selected-warning' : ''}`}
                  onClick={() => setReportType('warning')}
                >
                  <Cloud size={24} color={reportType === 'warning' ? '#FFFFFF' : '#735C50'} />
                  <span className="occurrence-card-label">Coluna de Fumaça</span>
                </button>

                <button
                  type="button"
                  className={`occurrence-type-card ${reportType === 'success' ? 'selected-success' : ''}`}
                  onClick={() => setReportType('success')}
                >
                  <Droplet size={24} color={reportType === 'success' ? '#FFFFFF' : '#2980B9'} />
                  <span className="occurrence-card-label">Rescaldo</span>
                </button>
              </div>
            </div>

            {/* Localização Auto-GPS */}
            <div className="form-group">
              <label>Localização</label>
              <div className="auto-gps-box">
                <div>
                  <div className="gps-title-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Navigation size={14} color="#8C4526" className={isGettingGps ? 'spin' : ''} /> Auto-GPS Location
                  </div>
                  <div className="gps-coords-text">Lat: {coords.lat}, Lon: {coords.lng}</div>
                </div>
                <button type="button" className="btn-update-gps" onClick={handleGetGps}>
                  Atualizar
                </button>
              </div>
            </div>

            {/* Ponto de Referência */}
            <div className="form-group">
              <label>Ponto de Referência</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Perto da ponte do rio..."
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </div>

            {/* Evidência Fotográfica */}
            <div className="form-group">
              <label>Evidência Fotográfica</label>
              <div className="photo-upload-grid">
                <label className="dashed-photo-box">
                  <Camera size={24} color="#8C4526" />
                  <span>Capturar Foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} style={{ display: 'none' }} />
                </label>

                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="photo-preview-thumb" />
                ) : (
                  <div className="photo-preview-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={20} color="#B5A499" />
                  </div>
                )}
              </div>
            </div>

            {/* Contato para a Brigada */}
            <div className="form-group">
              <label>Contato para a Brigada (Opcional)</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="#735C50" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  className="form-control"
                  style={{ paddingLeft: '38px' }}
                  placeholder="Seu WhatsApp"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#735C50', marginTop: '4px', display: 'block' }}>
                Usado apenas se a brigada precisar de mais detalhes.
              </span>
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
              <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#735C50', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}>
                Cancelar
              </button>

              <button type="submit" className="btn-pix-full" style={{ width: 'auto', padding: '12px 24px' }}>
                <Send size={16} /> ENVIAR ALERTA
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

