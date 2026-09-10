import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { InstitucionalView } from './views/InstitucionalView';
import { PropuestaEducativaView } from './views/PropuestaEducativaView';
import { EstudiantesView } from './views/EstudiantesView';
import { NoticiasView } from './views/NoticiasView';
import { GaleriaView } from './views/GaleriaView';
import { FaqView } from './views/FaqView';
import { ContactoView } from './views/ContactoView';
import { InscripcionesView } from './views/InscripcionesView';
import { AdminView } from './views/AdminView';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedOfferLevel, setSelectedOfferLevel] = useState<string | undefined>(undefined);
  const [selectedNewsId, setSelectedNewsId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [homeResetKey, setHomeResetKey] = useState(0);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleResetToHome = () => {
    setCurrentView('home');
    setSelectedOfferLevel(undefined);
    setSelectedNewsId(undefined);
    setIsSearchOpen(false);
    setIsEnrollmentOpen(false);
    setHomeResetKey(prev => prev + 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNavigate = (view: string, level?: string, articleId?: string) => {
    const target = (view === 'inicio' || view === 'home') ? 'home' : view;
    if (target === 'home' && !level && !articleId) {
      handleResetToHome();
      return;
    }
    setCurrentView(target);
    setSelectedOfferLevel(level);
    setSelectedNewsId(articleId);
  };

  // If in Admin panel
  if (currentView === 'admin') {
    return (
      <AdminView
        onReturnToSite={() => {
          handleResetToHome();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#28231D] font-sans selection:bg-blue-700 selection:text-white antialiased">
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onGoHome={handleResetToHome}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            key={homeResetKey}
            onNavigate={handleNavigate}
            onOpenEnrollment={() => setIsEnrollmentOpen(true)}
          />
        )}

        {currentView === 'institucional' && (
          <InstitucionalView
            onNavigateContact={() => handleNavigate('contacto')}
          />
        )}

        {currentView === 'propuesta' && (
          <PropuestaEducativaView
            initialOfferId={selectedOfferLevel}
            onOpenEnrollment={() => setIsEnrollmentOpen(true)}
            onNavigateContact={() => handleNavigate('contacto')}
          />
        )}

        {currentView === 'estudiantes' && (
          <EstudiantesView />
        )}

        {currentView === 'noticias' && (
          <NoticiasView initialArticleId={selectedNewsId} />
        )}

        {currentView === 'galeria' && (
          <GaleriaView />
        )}

        {currentView === 'faq' && (
          <FaqView
            onNavigateContact={() => handleNavigate('contacto')}
          />
        )}

        {currentView === 'contacto' && (
          <ContactoView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
      />

      {/* Global Interactive Elements */}
      <FloatingWhatsApp />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <InscripcionesView
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
