import React from 'react';
import { ShieldCheck, Flame, AlertTriangle } from 'lucide-react';

export default function StatusBadge({ statusCor, statusTexto, verificadoSatélite = true }) {
  let badgeClass = 'status-badge ';
  let dotColor = '#C0392B';

  if (statusCor === 'danger') {
    badgeClass += 'danger';
    dotColor = '#C0392B';
  } else if (statusCor === 'warning') {
    badgeClass += 'warning';
    dotColor = '#F39C12';
  } else {
    badgeClass += 'success';
    dotColor = '#27AE60';
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
      <span className={badgeClass}>
        <span className="status-dot" style={{ backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
        {statusTexto || (statusCor === 'danger' ? 'Fogo Ativo' : statusCor === 'warning' ? 'Alerta' : 'Segura')}
      </span>

      {verificadoSatélite && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: '#15803D',
          background: '#DCFCE7',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid #BBF7D0'
        }}>
          <ShieldCheck size={11} color="#15803D" />
          Verificado (INPE + Campo)
        </span>
      )}
    </div>
  );
}
