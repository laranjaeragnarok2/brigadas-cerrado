import React from 'react';
import { cursosMock } from '../data/mockData';
import { GraduationCap, Calendar, MapPin, Users, Award, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';

export default function EducationView() {
  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#2C3E50', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GraduationCap color="#D35400" size={32} />
          Editais & Formação de Brigadistas
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
          Capacitações oficiais, oficinas comunitárias e treinamentos em Manejo Integrado do Fogo (MIF) no Cerrado.
        </p>
      </div>

      {/* Educational Guide Banner */}
      <div className="section-card" style={{ background: '#FFF8F0', borderLeftColor: '#D35400', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ background: '#D35400', color: '#FFF', padding: '12px', borderRadius: 'var(--radius-md)', flexShrink: 0 }}>
            <BookOpen size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#2C3E50', marginBottom: '4px' }}>
              Guia Prático: Prevenção & Manejo do Fogo no Cerrado
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '12px', lineHeight: 1.5 }}>
              Aprenda como realizar aceiros preventivos, técnicas de contenção comunitária e cuidados com a fauna nativa antes do pico da estiagem.
            </p>
            <a 
              href="#guia-download" 
              onClick={(e) => { e.preventDefault(); alert('O Guia Educativo PDF foi salvo em cache para leitura offline!'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#D35400',
                color: '#FFF',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              Baixar Guia Educativo (PDF Offline) <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#2C3E50' }}>
        Cursos e Editais Abertos (Coleção "Cursos")
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {cursosMock.map((curso) => (
          <div key={curso.id} className="section-card" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <div>
                <span className={`status-badge ${curso.status === 'Inscrições Abertas' ? 'success' : 'warning'}`} style={{ marginBottom: '8px' }}>
                  {curso.status}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: '#2C3E50', marginTop: '4px' }}>
                  {curso.titulo}
                </h3>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D35400', background: '#FFF3EB', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                {curso.orgao}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', margin: '14px 0', fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="#D35400" />
                <span>Vagas: <strong>{curso.vagas}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="#D35400" />
                <span>Prazo: <strong>{curso.prazo}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#D35400" />
                <span>Local: <strong>{curso.local}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#D35400" />
                <span>Modalidade: <strong>{curso.modalidade}</strong></span>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '4px' }}>
                Requisitos e Perfil do Candidato:
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
                {curso.requisitos}
              </p>
            </div>

            <button 
              className="btn-apoiar" 
              style={{ width: 'auto', padding: '8px 18px', fontSize: '0.85rem' }}
              onClick={() => alert(`Inscrição iniciada para: ${curso.titulo}. Você será redirecionado para a plataforma do organizador.`)}
            >
              <CheckCircle size={16} /> Realizar Pré-Inscrição
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
