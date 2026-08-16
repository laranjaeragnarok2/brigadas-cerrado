import React, { useState } from 'react';
import { AlertTriangle, X, Copy, Navigation, Phone, Flame, Trees, Shield, Wind, Footprints, Megaphone } from 'lucide-react';

export default function EmergencyView({ onNavigate }) {
  const [coords, setCoords] = useState({ lat: '-15.7938', lng: '-47.8827' });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${coords.lat}, ${coords.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateGps = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4)
          });
        },
        () => {},
        { timeout: 5000 }
      );
    }
  };

  return (
    <div className="page-container">
      {/* Header com Ícone de Alerta e X */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C0392B' }}>
          <AlertTriangle size={24} color="#C0392B" />
          <h2 style={{ fontSize: '1.4rem', color: '#C0392B', margin: 0 }}>Emergência</h2>
        </div>
        <button
          onClick={() => onNavigate('/')}
          style={{ background: 'transparent', border: 'none', color: '#735C50', cursor: 'pointer' }}
          aria-label="Fechar"
        >
          <X size={24} />
        </button>
      </div>

      {/* Card 1: Localização Atual Vermelho */}
      <div className="emergency-red-card">
        <div className="emergency-red-title">Localização Atual</div>
        <div className="emergency-red-sub">Sua posição exata para resgate.</div>

        <div className="coords-copy-box">
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#735C50' }}>LAT / LONG</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#362219', fontFamily: 'monospace' }}>
              {coords.lat}, {coords.lng}
            </div>
          </div>
          <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8C4526' }}>
            <Copy size={20} />
          </button>
        </div>

        <button className="btn-update-gps-red" onClick={handleUpdateGps}>
          <Navigation size={16} /> Atualizar GPS
        </button>
      </div>

      {/* Card 2: Contatos de Emergência */}
      <h3 style={{ fontSize: '1.1rem', color: '#362219', marginBottom: '12px' }}>Contatos de Emergência</h3>

      <div className="emergency-contact-card">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="contact-icon-circle red">
            <Flame size={20} />
          </div>
          <div>
            <strong style={{ fontSize: '1rem', color: '#362219', display: 'block' }}>193 Bombeiros</strong>
            <span style={{ fontSize: '0.78rem', color: '#735C50' }}>Fogo em área urbana/vegetação</span>
          </div>
        </div>
        <a href="tel:193" style={{ color: '#362219' }}>
          <Phone size={20} />
        </a>
      </div>

      <div className="emergency-contact-card">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="contact-icon-circle brown">
            <Trees size={20} />
          </div>
          <div>
            <strong style={{ fontSize: '1rem', color: '#362219', display: 'block' }}>Prevfogo IBAMA</strong>
            <span style={{ fontSize: '0.78rem', color: '#735C50' }}>Incêndios florestais / federais</span>
          </div>
        </div>
        <a href="tel:0800618080" style={{ color: '#362219' }}>
          <Phone size={20} />
        </a>
      </div>

      <div className="emergency-contact-card">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="contact-icon-circle orange">
            <Shield size={20} />
          </div>
          <div>
            <strong style={{ fontSize: '1rem', color: '#362219', display: 'block' }}>199 Defesa Civil</strong>
            <span style={{ fontSize: '0.78rem', color: '#735C50' }}>Desastres e evacuação</span>
          </div>
        </div>
        <a href="tel:199" style={{ color: '#362219' }}>
          <Phone size={20} />
        </a>
      </div>

      {/* Card 3: Protocolo de Segurança (Timeline / Stepper) */}
      <h3 style={{ fontSize: '1.1rem', color: '#362219', marginTop: '20px', marginBottom: '10px' }}>Protocolo de Segurança</h3>

      <div className="stepper-container">
        <div className="stepper-step">
          <div className="stepper-icon-circle">
            <Wind size={18} />
          </div>
          <div>
            <div className="stepper-content-title">1. Avalie o Vento</div>
            <div className="stepper-content-desc">
              Nunca fuja na mesma direção do vento. O fogo viaja mais rápido do que você.
            </div>
          </div>
        </div>

        <div className="stepper-step">
          <div className="stepper-icon-circle">
            <Footprints size={18} />
          </div>
          <div>
            <div className="stepper-content-title">2. Busque "Áreas Pretas"</div>
            <div className="stepper-content-desc">
              Mova-se para áreas já queimadas (sem vegetação) ou corpos d'água grandes.
            </div>
          </div>
        </div>

        <div className="stepper-step">
          <div className="stepper-icon-circle">
            <Megaphone size={18} />
          </div>
          <div>
            <div className="stepper-content-title">3. Sinalize e Aguarde</div>
            <div className="stepper-content-desc">
              Ligue para o resgate informando as coordenadas acima e mantenha-se visível.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

