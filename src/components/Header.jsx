import React from 'react';
import { Flame } from 'lucide-react';

export default function Header({ onNavigate }) {
  return (
    <header className="app-header">
      <div className="brand-container" onClick={() => onNavigate('/')}>
        <div className="brand-logo-icon">
          <Flame size={24} color="#8C4526" fill="#8C4526" />
        </div>
        <div className="brand-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          CerradoVigil
          <span style={{ fontSize: '0.62rem', background: '#F8D7C8', color: '#8C4526', fontWeight: 900, padding: '2px 7px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            BETA
          </span>
        </div>
      </div>

      <button 
        className="btn-sos-header"
        onClick={() => onNavigate('/emergencia')}
        aria-label="Emergência SOS"
      >
        sos
      </button>
    </header>
  );
}


