import React from 'react';
import { User, Shield, Bell, MapPin, CheckCircle2, Heart, Smartphone, ExternalLink } from 'lucide-react';

export default function ProfileView({ onNavigate }) {
  return (
    <div className="page-container">
      {/* Header do Perfil */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E8DCCF', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F8D7C8', color: '#8C4526', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 12px auto', border: '3px solid #8C4526' }}>
          <User size={36} />
        </div>
        <h2 style={{ fontSize: '1.3rem', color: '#362219', marginBottom: '2px' }}>Voluntário do Cerrado</h2>
        <div style={{ fontSize: '0.82rem', color: '#735C50', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '12px' }}>
          <MapPin size={14} color="#8C4526" /> Chapada dos Veadeiros • Goiás
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAFAF1', color: '#27AE60', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
          <Shield size={12} /> Morador Verificado
        </div>
      </div>

      {/* Grid de Conquistas & Estatísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8DCCF', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#8C4526' }}>6</div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#735C50', textTransform: 'uppercase' }}>Alertas</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8DCCF', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#27AE60' }}>15</div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#735C50', textTransform: 'uppercase' }}>Validações</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1.5px solid #E8DCCF', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#C0392B' }}>2</div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#735C50', textTransform: 'uppercase' }}>Brigadas</div>
        </div>
      </div>

      {/* Configurações de Monitoramento */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E8DCCF', padding: '16px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1rem', color: '#362219', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="#8C4526" /> Configurações de Notificação
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5ECE2' }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#362219' }}>Alertas Críticos na Minha Região</div>
            <div style={{ fontSize: '0.75rem', color: '#735C50' }}>Notificar se um foco surgir num raio de 50km</div>
          </div>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#8C4526' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5ECE2' }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#362219' }}>Modo Offline Emergencial</div>
            <div style={{ fontSize: '0.75rem', color: '#735C50' }}>Salvar telefones e dados de resgate no celular</div>
          </div>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#8C4526' }} />
        </div>
      </div>

      {/* Ações Rápida */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={() => onNavigate && onNavigate('/emergencia')}
          style={{ width: '100%', background: '#FDF0F0', color: '#B82E2E', border: '1.5px solid #F5B7B1', padding: '12px', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Smartphone size={18} /> Acessar Guia SOS de Emergência
        </button>

        <button
          onClick={() => onNavigate && onNavigate('/voluntariado')}
          style={{ width: '100%', background: '#FFFFFF', color: '#8C4526', border: '1.5px solid #E8DCCF', padding: '12px', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Heart size={18} /> Quero me Inscrever no Voluntariado Remoto
        </button>
      </div>
    </div>
  );
}
