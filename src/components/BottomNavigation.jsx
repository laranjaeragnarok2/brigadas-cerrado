import React from 'react';
import { Home, Shield, GraduationCap, Users, PhoneCall } from 'lucide-react';

export default function BottomNavigation({ currentPath, onNavigate }) {
  const navItems = [
    { id: '/', label: 'Home', icon: Home },
    { id: '/brigadas', label: 'Brigadas', icon: Shield },
    { id: '/formacao', label: 'Formação', icon: GraduationCap },
    { id: '/voluntariado', label: 'Voluntariado', icon: Users },
    { id: '/emergencia', label: 'Emergência', icon: PhoneCall, isEmergency: true },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentPath === item.id;
        const extraClass = item.isEmergency ? 'emergency-nav' : '';

        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''} ${extraClass}`}
            onClick={() => onNavigate(item.id)}
            aria-label={`Navegar para ${item.label}`}
          >
            <IconComponent size={20} color={isActive ? (item.isEmergency ? '#900C3F' : '#D35400') : '#64748B'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
