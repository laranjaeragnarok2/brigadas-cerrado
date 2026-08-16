import React from 'react';
import { Eye, Users, HeartHandshake, User } from 'lucide-react';

export default function BottomNavigation({ currentPath, onNavigate }) {
  const navItems = [
    { id: '/', label: 'Monitor', icon: Eye },
    { id: '/brigadas', label: 'Brigades', icon: Users },
    { id: '/voluntariado', label: 'Donate', icon: HeartHandshake },
    { id: '/perfil', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentPath === item.id || (item.id === '/' && currentPath === '');

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

