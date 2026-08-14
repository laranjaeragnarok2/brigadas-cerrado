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

  // Relatos da Comunidade (Mapeamento em Tempo Real)
  const [communityReports, setCommunityReports] = useState([
    {
      id: 'rep_1',
      type: 'danger',
      title: 'Fogo Ativo em Encosta de Serra',
      location: 'Alto Paraíso de Goiás (GO-237 km 14)',
      description: 'Chamas avançando rápido na vegetação baixa da serra. Tropa de solo acionada.',
      confirmations: 6,
      time: 'Há 12 minutos (Verificado por Satélite + 6 Moradores)'
    },
    {
      id: 'rep_2',
      type: 'warning',
      title: 'Coluna de Fumaça Espessa',
      location: 'Cavalcante - Limite Quilombo Kalunga',
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

  const handleConfirmReport = (reportId) => {
    setCommunityReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return { ...rep, confirmations: rep.confirmations + 1 };
      }
      return rep;
    }));
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
