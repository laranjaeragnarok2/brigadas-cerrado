import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import DonationModal from './components/DonationModal';
import ReportFireModal from './components/ReportFireModal';
import { fetchRelatosFogo, saveRelatoFogo } from './data/apiService';

import DashboardView from './views/DashboardView';
import BrigadesListView from './views/BrigadesListView';
import EducationView from './views/EducationView';
import VolunteerFormView from './views/VolunteerFormView';
import EmergencyView from './views/EmergencyView';

import ProfileView from './views/ProfileView';

export default function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [selectedBrigade, setSelectedBrigade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Controle de Confirmações Únicas por Usuário
  const [confirmedReportIds, setConfirmedReportIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cerrado_confirmed_reports');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Relatos da Comunidade (Mapeamento Waze Cerrado) Sincronizados com Supabase
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'rep_1',
      type: 'danger',
      title: 'Fogo Ativo em Encosta de Serra',
      location: 'Alto Paraíso de Goiás (GO-237 km 14)',
      coords: '-14.1311, -47.5218',
      description: 'Chamas avançando rápido na vegetação baixa da serra.',
      confirmations: 6,
      time: 'Há 12 minutos (Verificado + Moradores)'
    },
    {
      id: 'rep_2',
      type: 'warning',
      title: 'Coluna de Fumaça Espessa',
      location: 'Cavalcante - Limite Quilombo Kalunga',
      coords: '-13.7964, -47.4583',
      description: 'Fumaça branca densa subindo do vale.',
      confirmations: 4,
      time: 'Há 45 minutos (Em checagem)'
    }
  ]);

  // Carregar relatos do Supabase ao iniciar
  useEffect(() => {
    async function loadDataFromSupabase() {
      try {
        const dbReports = await fetchRelatosFogo();
        if (dbReports && dbReports.length > 0) {
          const formatted = dbReports.map(rep => ({
            id: rep.id,
            type: rep.tipo || 'danger',
            title: rep.titulo || 'Alerta de Fogo',
            location: rep.localizacao || 'Cerrado Goiano',
            coords: rep.coordenadas || '-14.1311, -47.5218',
            description: rep.descricao || 'Relato registrado no banco.',
            confirmations: rep.confirmacoes || 1,
            time: 'Ao Vivo via Supabase'
          }));
          setCommunityReports(prev => [...formatted, ...prev]);
        }
      } catch (e) {
        console.warn("Conexão Supabase fallback local:", e);
      }
    }
    loadDataFromSupabase();
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDonationModal = (brigade) => {
    setSelectedBrigade(brigade);
    setIsModalOpen(true);
  };

  const handleCloseDonationModal = () => {
    setIsModalOpen(false);
    setSelectedBrigade(null);
  };

  const handleAddReport = async (newReport) => {
    setCommunityReports(prev => [newReport, ...prev]);
    // Salvar diretamente no banco do Supabase
    try {
      await saveRelatoFogo(newReport);
    } catch (err) {
      console.warn("Erro ao enviar para Supabase:", err);
    }
  };


  // Trava de Voto Único: Adiciona ou remove o voto sem permitir spam infinito
  const handleConfirmReport = (reportId) => {
    const isAlreadyConfirmed = confirmedReportIds.includes(reportId);

    let updatedConfirmedIds;
    if (isAlreadyConfirmed) {
      // Remove o voto (decrementa)
      updatedConfirmedIds = confirmedReportIds.filter(id => id !== reportId);
      setCommunityReports(prev => prev.map(rep => {
        if (rep.id === reportId) {
          return { ...rep, confirmations: Math.max(0, rep.confirmations - 1) };
        }
        return rep;
      }));
    } else {
      // Adiciona o voto único (incrementa +1)
      updatedConfirmedIds = [...confirmedReportIds, reportId];
      setCommunityReports(prev => prev.map(rep => {
        if (rep.id === reportId) {
          return { ...rep, confirmations: rep.confirmations + 1 };
        }
        return rep;
      }));
    }

    setConfirmedReportIds(updatedConfirmedIds);
    try {
      localStorage.setItem('cerrado_confirmed_reports', JSON.stringify(updatedConfirmedIds));
    } catch (e) {
      console.warn("Não foi possível salvar no localStorage:", e);
    }
  };

  // Renderiza a visualização por rota
  const renderCurrentView = () => {
    switch (currentPath) {
      case '/brigadas':
        return <BrigadesListView onApoiar={handleOpenDonationModal} />;
      case '/formacao':
        return <EducationView />;
      case '/voluntariado':
      case '/doar':
        return <VolunteerFormView />;
      case '/emergencia':
        return <EmergencyView onNavigate={navigateTo} />;
      case '/perfil':
        return <ProfileView onNavigate={navigateTo} />;

      case '/':
      default:
        return (
          <DashboardView
            onNavigate={navigateTo}
            onApoiar={handleOpenDonationModal}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            communityReports={communityReports}
            onConfirmReport={handleConfirmReport}
            confirmedReportIds={confirmedReportIds}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onNavigate={navigateTo} onOpenReportModal={() => setIsReportModalOpen(true)} />
      
      <main style={{ flexGrow: 1 }}>
        {renderCurrentView()}
      </main>

      <BottomNavigation currentPath={currentPath} onNavigate={navigateTo} />

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseDonationModal}
        brigade={selectedBrigade}
      />

      <ReportFireModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onAddReport={handleAddReport}
      />
    </div>
  );
}

