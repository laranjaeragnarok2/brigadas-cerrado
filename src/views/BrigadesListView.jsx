import React, { useState, useEffect } from 'react';
import { fetchBrigadas } from '../data/apiService';
import BrigadeCard from '../components/BrigadeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, Flame, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function BrigadesListView({ onApoiar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [brigadas, setBrigadas] = useState([]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchBrigadas();
        setBrigadas(data);
      } catch (e) {
        console.error("Erro ao carregar brigadas:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBrigadas = brigadas.filter((b) => {
    const matchesSearch =
      (b.nome && b.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.municipio && b.municipio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.tags_necessidade && b.tags_necessidade.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

    let matchesFilter = true;
    if (selectedFilter === 'fire') matchesFilter = b.status_cor === 'danger';
    if (selectedFilter === 'alert') matchesFilter = b.status_cor === 'warning';
    if (selectedFilter === 'safe') matchesFilter = b.status_cor === 'success';

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      {/* Barra de Pesquisa */}
      <div className="search-box-container">
        <Search size={18} className="search-icon-inside" />
        <input
          type="text"
          className="search-input"
          placeholder="Search brigades, locations, or needs."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Carrossel Horizontal de Chips de Filtro */}
      <div className="chips-scroll-container">
        <button
          className={`chip-btn ${selectedFilter === 'all' ? 'active-all' : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          All
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'fire' ? 'active-fire' : ''}`}
          onClick={() => setSelectedFilter('fire')}
        >
          <Flame size={13} color="#C0392B" /> Active Fire
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'alert' ? 'active-alert' : ''}`}
          onClick={() => setSelectedFilter('alert')}
        >
          <AlertTriangle size={13} color="#D35400" /> Alert
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'safe' ? 'active-safe' : ''}`}
          onClick={() => setSelectedFilter('safe')}
        >
          <ShieldCheck size={13} color="#27AE60" /> Safe
        </button>
      </div>

      {/* Lista de Cards */}
      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : filteredBrigadas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: '#735C50' }}>
          Nenhuma brigada encontrada para a busca "{searchTerm}".
        </div>
      ) : (
        <div>
          {filteredBrigadas.map((b) => (
            <BrigadeCard key={b.id} brigade={b} onApoiar={onApoiar} />
          ))}
        </div>
      )}
    </div>
  );
}

