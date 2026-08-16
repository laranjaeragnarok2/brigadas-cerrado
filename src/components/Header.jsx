import React from 'react';
import { Flame } from 'lucide-react';

export default function Header({ onNavigate, onOpenReportModal }) {
  return (
    <header className="app-header">
      <div className="brand-container" onClick={() => onNavigate('/')}>
        <div className="brand-logo-icon">
          <Flame size={24} color="#8C4526" fill="#8C4526" />
        </div>
        <div className="brand-title">
          CerradoVigil
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

