import React, { useState } from 'react';
import { Users, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { saveVoluntario } from '../data/apiService';

export default function VolunteerFormView() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cidade: '',
    habilidade: 'gis',
    disponibilidade: 'semanal',
    mensagem: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      await saveVoluntario({
        nome: formData.nome,
        email: formData.email,
        whatsapp: formData.whatsapp,
        cidade: formData.cidade,
        disponibilidade: formData.disponibilidade,
        habilidades: [formData.habilidade, formData.mensagem].filter(Boolean)
      });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      console.warn("Erro ao cadastrar voluntário:", err);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#362219', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users color="#8C4526" size={28} />
          Voluntariado Remoto
        </h1>
        <p style={{ color: '#735C50', fontSize: '0.88rem', lineHeight: 1.4 }}>
          Apoie o combate ao fogo no Cerrado de onde estiver. Precisamos de habilidades em tecnologia, mapas, redes sociais, comunicação e apoio logístico.
        </p>
      </div>

      {isSuccess ? (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '2px solid #27AE60', padding: '28px', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#27AE60" style={{ marginBottom: '12px' }} />
          <h2 style={{ color: '#27AE60', marginBottom: '8px', fontSize: '1.3rem' }}>Inscrição Concluída com Sucesso!</h2>
          <p style={{ color: '#362219', fontSize: '0.88rem', marginBottom: '20px', lineHeight: 1.5 }}>
            Obrigado, <strong>{formData.nome}</strong>! Seus dados foram cadastrados com sucesso no CerradoVigil. Nossa equipe entrará em contato via WhatsApp/E-mail.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ nome: '', email: '', whatsapp: '', cidade: '', habilidade: 'gis', disponibilidade: 'semanal', mensagem: '' });
            }}
            style={{ background: '#8C4526', color: '#FFFFFF', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, border: 'none', cursor: 'pointer' }}
          >
            Cadastrar Outro Voluntário
          </button>
        </div>
      ) : (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E8DCCF', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles color="#8C4526" size={18} />
            <h3 style={{ fontSize: '1.05rem', color: '#362219', margin: 0 }}>Formulário de Apoio Remoto</h3>
          </div>

          {isError && (
            <div style={{ background: '#FDF0F0', borderLeft: '4px solid #C0392B', padding: '10px', borderRadius: '8px', marginBottom: '16px', color: '#C0392B', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>Erro ao gravar cadastro. Verifique a conexão e tente novamente.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Ana Maria Silva"
                required
                value={formData.nome}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.9rem', color: '#362219', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ana@exemplo.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.9rem', color: '#362219', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="(61) 99999-8888"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.9rem', color: '#362219', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                Cidade / Estado onde reside
              </label>
              <input
                type="text"
                name="cidade"
                placeholder="Ex: Brasília - DF"
                value={formData.cidade}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.9rem', color: '#362219', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                  Área de Habilidade
                </label>
                <select
                  name="habilidade"
                  value={formData.habilidade}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.85rem', color: '#362219', outline: 'none', background: '#FFF' }}
                >
                  <option value="gis">Mapeamento GIS & Satélites</option>
                  <option value="midias">Comunicação e Redes Sociais</option>
                  <option value="design">Design Gráfico & Material Educativo</option>
                  <option value="tech">Desenvolvimento Web / Suporte</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                  Disponibilidade
                </label>
                <select
                  name="disponibilidade"
                  value={formData.disponibilidade}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.85rem', color: '#362219', outline: 'none', background: '#FFF' }}
                >
                  <option value="pontual">Pontual nas crises</option>
                  <option value="semanal">2 a 5h por semana</option>
                  <option value="intensiva">+ 5h por semana</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#362219', marginBottom: '4px' }}>
                Como gostaria de contribuir? (Opcional)
              </label>
              <textarea
                name="mensagem"
                rows="3"
                placeholder="Conte brevemente sobre sua experiência..."
                value={formData.mensagem}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E8DCCF', fontSize: '0.85rem', color: '#362219', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: '#8C4526',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: isLoading ? 0.7 : 1

              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spin" /> Gravando Cadastro...
                </>
              ) : (
                <>
                  <Send size={18} /> Cadastrar como Voluntário
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

