import React, { useState } from 'react';
import { Users, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function VolunteerFormView() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cidadeUf: '',
    areaInteresse: 'gis',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    // Simulate Webhook POST Request (e.g. to Zapier / Make webhook endpoint)
    setTimeout(() => {
      // Simulate successful POST response
      if (formData.nome && formData.email) {
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    }, 1200);
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#2C3E50', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users color="#D35400" size={32} />
          Voluntariado Remoto
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
          Apoie o combate ao fogo no Cerrado de onde estiver. Precisamos de habilidades em tecnologia, mapas, redes sociais, comunicação e design.
        </p>
      </div>

      {isSuccess ? (
        <div className="section-card" style={{ borderLeftColor: '#27AE60', background: '#F0FDF4', padding: '32px', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#27AE60" style={{ marginBottom: '12px' }} />
          <h2 style={{ color: '#166534', marginBottom: '8px' }}>Cadastro de Voluntário Recebido!</h2>
          <p style={{ color: '#15803D', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.5 }}>
            Obrigado, <strong>{formData.nome}</strong>! Seus dados foram enviados com sucesso via Webhook para nossa equipe de coordenação. Entraremos em contato via WhatsApp/E-mail em breve.
          </p>
          <button
            className="btn-apoiar"
            style={{ width: 'auto', margin: '0 auto', background: '#27AE60' }}
            onClick={() => {
              setIsSuccess(false);
              setFormData({ nome: '', email: '', whatsapp: '', cidadeUf: '', areaInteresse: 'gis', disponibilidade: 'semanal', mensagem: '' });
            }}
          >
            Cadastrar Outro Voluntário
          </button>
        </div>
      ) : (
        <div className="section-card" style={{ borderLeftColor: '#D35400' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles color="#D35400" size={20} />
            <h3 style={{ fontSize: '1.1rem', color: '#2C3E50', margin: 0 }}>Formulário de Inscrição de Apoio Remoto</h3>
          </div>

          {isError && (
            <div style={{ background: '#FEF2F2', borderLeft: '4px solid #EF4444', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', color: '#991B1B', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} color="#EF4444" />
              <span>Ocorreu uma falha ao disparar o Webhook. Verifique os campos e tente novamente.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo *</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Ex: Ana Maria Silva"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail de Contato *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ana@exemplo.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp / Celular com DDD *</label>
                <input
                  id="whatsapp"
                  type="tel"
                  name="whatsapp"
                  className="form-control"
                  placeholder="(61) 99999-8888"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cidadeUf">Cidade / Estado onde reside</label>
                <input
                  id="cidadeUf"
                  type="text"
                  name="cidadeUf"
                  className="form-control"
                  placeholder="Ex: Brasília - DF"
                  value={formData.cidadeUf}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="areaInteresse">Área Principal de Habilidade</label>
                <select
                  id="areaInteresse"
                  name="areaInteresse"
                  className="form-control"
                  value={formData.areaInteresse}
                  onChange={handleChange}
                >
                  <option value="gis">Mapeamento GIS & Satélites (INPE / QGIS)</option>
                  <option value="midias">Comunicação e Redes Sociais</option>
                  <option value="design">Design Gráfico & Material Educativo</option>
                  <option value="tech">Desenvolvimento Web / Suporte Técnico</option>
                  <option value="captacao">Captação de Recursos & Logística</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="disponibilidade">Disponibilidade Semanal</label>
                <select
                  id="disponibilidade"
                  name="disponibilidade"
                  className="form-control"
                  value={formData.disponibilidade}
                  onChange={handleChange}
                >
                  <option value="pontual">Pontual (Horas flexíveis durante crises)</option>
                  <option value="semanal">2 a 5 horas por semana</option>
                  <option value="intensiva">Mais de 5 horas por semana</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Como gostaria de contribuir? (Opcional)</label>
              <textarea
                id="mensagem"
                name="mensagem"
                className="form-control"
                rows="3"
                placeholder="Conte brevemente sobre sua experiência ou disponibilidade..."
                value={formData.mensagem}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn-apoiar"
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1, width: '100%', marginTop: '8px', padding: '12px' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spin" /> Enviando via Webhook...
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
