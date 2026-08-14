import React, { useState, useEffect } from 'react';
import { Flame, PhoneCall, Wifi, WifiOff, Navigation } from 'lucide-react';

export default function Header({ onNavigate, onOpenReportModal }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="app-header">
      <div className="brand-container" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
        <div className="brand-logo">
          <Flame size={22} color="#FFF" fill="#FFF" />
        </div>
        <div>
          <div className="brand-title">
            Brigadas <span>do Cerrado</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#56645D', fontWeight: 700, letterSpacing: '0.2px' }}>
            Proteção Comunitária • Goiás
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Botão de Destaque no Topo para Reportar Fogo */}
        <button
          onClick={onOpenReportModal}
          style={{
            background: 'linear-gradient(135deg, #A93226, #BC4712)',
            color: '#FFF',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 3px 10px rgba(169, 50, 38, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer'
          }}
        >
          <Flame size={14} fill="#FFF" />
          <span>Reportar Fogo</span>
        </button>

        <button 
          onClick={() => onNavigate('/emergencia')}
          style={{
            background: '#1B2E24',
            color: '#FFF',
            padding: '7px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Contatos de Emergência"
        >
          <PhoneCall size={12} />
          193
        </button>
      </div>
    </header>
  );
}
