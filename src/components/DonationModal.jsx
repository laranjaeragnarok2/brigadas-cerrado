import React, { useState } from 'react';
import { X, Copy, Check, Heart, ShieldAlert } from 'lucide-react';

export default function DonationModal({ isOpen, onClose, brigade }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !brigade) return null;

  const handleCopyPix = () => {
    if (brigade.pix_chave) {
      navigator.clipboard.writeText(brigade.pix_chave).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }).catch(err => {
        console.error("Erro ao copiar PIX:", err);
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="#D35400" fill="#D35400" />
            <h3>Apoiar Brigada via PIX</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h4 style={{ fontSize: '1.05rem', color: '#2C3E50', marginBottom: '4px' }}>
            {brigade.nome}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
            📍 {brigade.municipio}
          </p>

          <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.4 }}>
            Toda contribuição financeira é direcionada <strong>diretamente para a conta oficial</strong> da brigada comunitária para compra imediata de insumos, combustível para veículos 4x4 e alimentação de campo.
          </p>

          <div className="pix-box">
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
              CHAVE PIX (CNPJ / E-mail)
            </div>
            <div className="pix-key-text">
              {brigade.pix_chave || "pix@cerradovivo.org.br"}
            </div>
            {brigade.pix_recebedor && (
              <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '12px' }}>
                Favorecido: <strong>{brigade.pix_recebedor}</strong>
              </div>
            )}

            <button 
              className={`btn-copy-pix ${copied ? 'copied' : ''}`}
              onClick={handleCopyPix}
            >
              {copied ? (
                <>
                  <Check size={18} /> Chave PIX Copiada!
                </>
              ) : (
                <>
                  <Copy size={18} /> Copiar Chave PIX
                </>
              )}
            </button>
          </div>

          <div className="modal-disclaimer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '2px', color: '#B45309' }}>
              <ShieldAlert size={14} /> Transparência e Responsabilidade:
            </div>
            A plataforma Brigadas do Cerrado Vivo não cobra taxas nem intermedia pagamentos. As transferências são 100% diretas aos brigadistas e associações locais credenciadas.
          </div>
        </div>
      </div>
    </div>
  );
}
