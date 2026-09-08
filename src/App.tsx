import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InstitutionalChatbot } from './components/InstitutionalChatbot';
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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: string, level?: string, articleId?: string) => {
    setCurrentView(view);
    if (level) {
      setSelectedOfferLevel(level);
    }
    if (articleId) {
      setSelectedNewsId(articleId);
    }
  };

  // If in Admin panel
  if (currentView === 'admin') {
    return (
      <AdminView
        onReturnToSite={() => {
          setCurrentView('home');
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
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
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
            initialLevel={selectedOfferLevel}
            onOpenEnrollment={() => setIsEnrollmentOpen(true)}
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
            onOpenChatbot={() => setIsChatbotOpen(true)}
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

      <InstitutionalChatbot
        isOpenExternal={isChatbotOpen}
        onToggleExternal={(open) => setIsChatbotOpen(open)}
        onNavigate={handleNavigate}
      />

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
