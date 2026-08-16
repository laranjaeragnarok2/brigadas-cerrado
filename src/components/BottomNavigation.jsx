import React from 'react';
import { Eye, Users, AlertTriangle, HeartHandshake, User } from 'lucide-react';

export default function BottomNavigation({ currentPath, onNavigate }) {
  const navItems = [
    { id: '/', label: 'Monitor', icon: Eye },
    { id: '/brigadas', label: 'Brigadas', icon: Users },
    { id: '/emergencia', label: 'SOS 193', icon: AlertTriangle, isSos: true },
    { id: '/voluntariado', label: 'Apoiar', icon: HeartHandshake },
    { id: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentPath === item.id || (item.id === '/' && currentPath === '');

        if (item.isSos) {
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-label="Emergência SOS"
              style={{ color: '#B82E2E' }}
            >
              <div style={{
                background: isActive ? '#FDF0F0' : 'transparent',
                padding: '4px 12px',
                borderRadius: '9999px',
                border: '1.5px solid #F5B7B1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent size={18} color="#B82E2E" />
              </div>
              <span style={{ fontWeight: 900, color: '#B82E2E' }}>{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={`Navegar para ${item.label}`}
          >
            {isActive ? (
              <div className="nav-pill-active">
                <IconComponent size={20} color="#8C4526" />
              </div>
            ) : (
              <IconComponent size={20} color="#735C50" />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}


