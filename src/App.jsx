import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import DonationModal from './components/DonationModal';
import ReportFireModal from './components/ReportFireModal';
import { Flame } from 'lucide-react';

import DashboardView from './views/DashboardView';
import BrigadesListView from './views/BrigadesListView';
import EducationView from './views/EducationView';
import VolunteerFormView from './views/VolunteerFormView';
import EmergencyView from './views/EmergencyView';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [selectedBrigade, setSelectedBrigade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Controle de Confirmações Únicas por Usuário (Impede joinhas infinitos)
  const [confirmedReportIds, setConfirmedReportIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cerrado_confirmed_reports');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Relatos da Comunidade (Mapeamento Waze Cerrado)
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'rep_1',
      type: 'danger',
      title: 'Fogo Ativo em Encosta de Serra',
      location: 'Alto Paraíso de Goiás (GO-237 km 14)',
      coords: '-14.1311, -47.5218',
      description: 'Chamas avançando rápido na vegetação baixa da serra. Tropa de solo acionada.',
      confirmations: 6,
      time: 'Há 12 minutos (Verificado por Satélite + 6 Moradores)'
    },
    {
      id: 'rep_2',
      type: 'warning',
      title: 'Coluna de Fumaça Espessa',
      location: 'Cavalcante - Limite Quilombo Kalunga',
      coords: '-13.7964, -47.4583',
      description: 'Fumaça branca densa subindo do vale. Equipe Kalunga em checagem.',
      confirmations: 4,
      time: 'Há 45 minutos (Em checagem pela Brigada Kalunga)'
    }
  ]);

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

  const handleAddReport = (newReport) => {
    setCommunityReports(prev => [newReport, ...prev]);
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
        return <VolunteerFormView />;
      case '/emergencia':
        return <EmergencyView />;
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

      {/* Floating Action Button para Reportar Fogo */}
      <div className="fab-report-container">
        <div className="fab-report-label">Avistou Fogo ou Fumaça?</div>
        <button
          className="btn-report-super"
          onClick={() => setIsReportModalOpen(true)}
          aria-label="Reportar Foco de Fogo"
        >
          <Flame size={20} color="#FFF" fill="#FFF" />
          <span>REPORTAR FOCO DE FOGO</span>
        </button>
      </div>

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
