import React, { useState, useEffect } from 'react';
import { fetchBrigadas } from '../data/apiService';
import BrigadeCard from '../components/BrigadeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export default function BrigadesListView({ onApoiar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [brigadas, setBrigadas] = useState([]);

  const loadBrigadasData = async () => {
    setIsLoading(true);
    setIsError(false);
    
    try {
      const data = await fetchBrigadas();
      setBrigadas(data);
    } catch (err) {
      console.error("Erro ao carregar brigadas:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBrigadasData();
  }, []);

  const filteredBrigadas = brigadas.filter((b) => {
    const matchesSearch = 
      (b.nome && b.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.municipio && b.municipio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.tags_necessidade && b.tags_necessidade.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesStatus = 
      selectedStatus === 'all' || b.status_cor === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '8px' }}>
          Brigadas Mapeadas no Cerrado
        </h1>
        <p style={{ color: '#56645D', fontSize: '0.95rem' }}>
          Conheça as brigadas comunitárias e voluntárias que protegem o Cerrado Goiano. Escolha uma brigada e apoie diretamente via PIX sem intermediários.
        </p>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="section-card" style={{ padding: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} color="#8A9890" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '38px' }}
              placeholder="Buscar por nome da brigada, município ou insumo (ex: Abafadores)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              <Filter size={14} color="#56645D" />
              <span style={{ fontSize: '0.8rem', color: '#56645D', fontWeight: 700 }}>Status:</span>
              
              <button
                className={`tag-item ${selectedStatus === 'all' ? 'active' : ''}`}
                style={{
                  background: selectedStatus === 'all' ? '#1B2E24' : '#F2EDE4',
                  color: selectedStatus === 'all' ? '#FFF' : '#1B2E24',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatus('all')}
              >
                Todas ({brigadas.length})
              </button>

              <button
                className="tag-item"
                style={{
                  background: selectedStatus === 'danger' ? '#A93226' : '#FDEDEC',
                  color: selectedStatus === 'danger' ? '#FFF' : '#A93226',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatus('danger')}
              >
                Fogo Ativo
              </button>

              <button
                className="tag-item"
                style={{
                  background: selectedStatus === 'warning' ? '#D68910' : '#FEF9E7',
                  color: selectedStatus === 'warning' ? '#FFF' : '#B7950B',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatus('warning')}
              >
                Alerta
              </button>

              <button
                className="tag-item"
                style={{
                  background: selectedStatus === 'success' ? '#1E8449' : '#EAFAF1',
                  color: selectedStatus === 'success' ? '#FFF' : '#1E8449',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatus('success')}
              >
                Segura
              </button>
            </div>

            <button
              onClick={loadBrigadasData}
              style={{
                background: 'transparent',
                color: '#56645D',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
              title="Atualizar lista"
            >
              <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Atualizar Lista
            </button>
          </div>
        </div>
      </div>

      {/* Estados de Carregamento / Erro */}
      {isLoading ? (
        <SkeletonLoader count={4} />
      ) : isError ? (
        <div className="section-card" style={{ borderLeftColor: '#A93226', textAlign: 'center', padding: '32px' }}>
          <AlertCircle size={40} color="#A93226" style={{ marginBottom: '12px' }} />
          <h3>Erro ao carregar lista de brigadas</h3>
          <p style={{ color: '#56645D', margin: '8px 0 16px 0' }}>Não foi possível conectar ao servidor. Verifique sua conexão de rede.</p>
          <button className="btn-apoiar" style={{ width: 'auto', margin: '0 auto' }} onClick={loadBrigadasData}>
            Tentar Novamente
          </button>
        </div>
      ) : filteredBrigadas.length === 0 ? (
        <div className="section-card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ color: '#56645D', fontSize: '1rem' }}>Nenhuma brigada encontrada para o filtro "{searchTerm}".</p>
          <button 
            style={{ marginTop: '12px', background: '#1B2E24', color: '#FFF', padding: '8px 16px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}
            onClick={() => { setSearchTerm(''); setSelectedStatus('all'); }}
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid-2">
          {filteredBrigadas.map((brigade) => (
            <BrigadeCard key={brigade.id} brigade={brigade} onApoiar={onApoiar} />
          ))}
        </div>
      )}
    </div>
  );
}
