import React, { useState, useEffect } from 'react';
import { emergenciaMock } from '../data/mockData';
import { PhoneCall, ShieldAlert, WifiOff, MapPin, Navigation, Copy, Check, AlertTriangle, Compass, ShieldCheck } from 'lucide-react';

export default function EmergencyView() {
  const [gpsCoords, setGpsCoords] = useState(null);
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleGetGps = () => {
    setIsGettingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoords({
            lat: position.coords.latitude.toFixed(5),
            lng: position.coords.longitude.toFixed(5)
          });
          setIsGettingGps(false);
        },
        (error) => {
          console.warn("GPS error:", error);
          alert("Ative a localização do seu celular para capturar as coordenadas exatas.");
          setIsGettingGps(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      alert("Navegador não suporta captura automática de GPS.");
      setIsGettingGps(false);
    }
  };

  const handleCopyGps = () => {
    if (gpsCoords) {
      const text = `SOCORRO/FOGO - Minhas Coordenadas GPS: ${gpsCoords.lat}, ${gpsCoords.lng} (Bioma Cerrado)`;
      navigator.clipboard.writeText(text).then(() => {
        setCopiedCoords(true);
        setTimeout(() => setCopiedCoords(false), 3000);
      });
    }
  };

  return (
    <div className="page-container">
      {/* Indicador de Funcionamento Offline */}
      <div className="section-card" style={{ background: '#F5EFE6', borderLeftColor: '#A66844', marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <WifiOff size={22} color="#593122" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#593122', margin: 0, fontWeight: 700 }}>
              Modo de Emergência (Salvo Offline)
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#6B4D3E', margin: 0, lineHeight: 1.35 }}>
              Estes telefones e ferramentas funcionam <strong>mesmo sem sinal de internet ou dados</strong>.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#593122', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PhoneCall color="#A66844" size={26} />
          Central de Emergência & Socorro
        </h1>
        <p style={{ color: '#6B4D3E', fontSize: '0.9rem' }}>
          Ligue imediatamente ao identificar foco de incêndio sem controle próximo a serra ou propriedades.
        </p>
      </div>

      {/* FERRAMENTA 1: COPIAR MINHA LOCALIZAÇÃO GPS EM 1 CLIQUE */}
      <div className="section-card" style={{ background: '#FFF', borderLeftColor: '#593122', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={22} color="#A66844" />
            <h3 style={{ fontSize: '1.05rem', color: '#261914', margin: 0 }}>
              Sua Posição GPS para Informar aos Bombeiros
            </h3>
          </div>

          <button
            onClick={handleGetGps}
            style={{
              background: '#593122',
              color: '#FFF',
              padding: '8px 16px',
              borderRadius: 'var(--md-shape-corner-medium)',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Navigation size={14} className={isGettingGps ? 'spin' : ''} />
            {isGettingGps ? 'Capturando GPS...' : 'Capturar Meu GPS'}
          </button>
        </div>

        {gpsCoords ? (
          <div style={{ background: '#F7EFE9', padding: '14px', borderRadius: 'var(--md-shape-corner-medium)', border: '1px solid #EAD8CC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B4D3E', fontWeight: 700, textTransform: 'uppercase' }}>Coordenadas Exatas:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#593122', fontFamily: 'monospace' }}>
                Lat: {gpsCoords.lat} | Lng: {gpsCoords.lng}
              </div>
            </div>

            <button
              onClick={handleCopyGps}
              style={{
                background: copiedCoords ? '#2D6A4F' : '#A66844',
                color: '#FFF',
                padding: '8px 16px',
                borderRadius: 'var(--md-shape-corner-small)',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {copiedCoords ? <Check size={16} /> : <Copy size={16} />}
              {copiedCoords ? 'Coordenadas Copiadas!' : 'Copiar Texto para Enviar'}
            </button>
          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', color: '#6B4D3E', margin: 0 }}>
            Clique em <strong>"Capturar Meu GPS"</strong> para gerar as coordenadas de latitude e longitude exatas e repassar aos bombeiros via ligação ou WhatsApp.
          </p>
        )}
      </div>

      {/* FERRAMENTA 2: CARTÕES DE DISCAGEM RÁPIDA (BOMBEIROS 193 & PREVFOGO) */}
      <h2 style={{ fontSize: '1.15rem', color: '#593122', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PhoneCall size={18} color="#A66844" />
        Ligar para o Socorro Oficial
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {emergenciaMock.map((contato) => (
          <div 
            key={contato.id} 
            className="emergency-card"
            style={{
              padding: '18px',
              borderRadius: 'var(--md-shape-corner-large)',
              boxShadow: 'var(--md-elevation-1)',
              border: '1px solid var(--md-sys-color-outline-variant)'
            }}
          >
            <div className="emergency-info" style={{ flexGrow: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#A66844', textTransform: 'uppercase', marginBottom: '3px' }}>
                {contato.tipo}
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#261914', marginBottom: '4px', fontWeight: 800 }}>{contato.nome}</h4>
              <p style={{ fontSize: '0.85rem', color: '#6B4D3E', margin: 0, lineHeight: 1.4 }}>{contato.descricao}</p>
            </div>

            <a 
              href={`tel:${contato.numero.replace(/[^0-9]/g, '')}`} 
              className="btn-call"
              style={{
                background: contato.numero === '193' ? '#A93226' : '#593122',
                padding: '12px 20px',
                borderRadius: 'var(--md-shape-corner-extra-large)',
                boxShadow: 'var(--md-elevation-2)',
                whiteSpace: 'nowrap'
              }}
            >
              <PhoneCall size={18} />
              Ligar {contato.numero}
            </a>
          </div>
        ))}
      </div>

      {/* FERRAMENTA 3: PROTOCOLO VISUAL PASSO A PASSO EM CASO DE INCÊNDIO */}
      <div className="section-card" style={{ borderLeftColor: '#A66844', background: '#F5EFE6' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#593122', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle color="#A66844" size={20} />
          O Que Fazer ao Encontrar Fogo na Serra (3 Passos)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#FFF', padding: '14px', borderRadius: 'var(--md-shape-corner-medium)', border: '1px solid #E5DDD3' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A66844', marginBottom: '4px' }}>PASSO 1</div>
            <strong style={{ color: '#261914', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Avalie a Direção do Vento</strong>
            <p style={{ fontSize: '0.8rem', color: '#6B4D3E', margin: 0, lineHeight: 1.4 }}>
              Nunca corra morro acima nem fique no caminho fumaça. O fogo no Cerrado sobe muito rápido.
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '14px', borderRadius: 'var(--md-shape-corner-medium)', border: '1px solid #E5DDD3' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A66844', marginBottom: '4px' }}>PASSO 2</div>
            <strong style={{ color: '#261914', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Busque Áreas de Fuga</strong>
            <p style={{ fontSize: '0.8rem', color: '#6B4D3E', margin: 0, lineHeight: 1.4 }}>
              Procure a "área preta" (já queimada) ou estradas e rios largos onde o fogo não consiga atravessar.
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '14px', borderRadius: 'var(--md-shape-corner-medium)', border: '1px solid #E5DDD3' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#A66844', marginBottom: '4px' }}>PASSO 3</div>
            <strong style={{ color: '#261914', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Repasse as Coordenadas</strong>
            <p style={{ fontSize: '0.8rem', color: '#6B4D3E', margin: 0, lineHeight: 1.4 }}>
              Copie seu GPS nesta tela e envie para os Bombeiros 193 ou para o WhatsApp da brigada local.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
