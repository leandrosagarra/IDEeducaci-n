import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Menu, X, Search, GraduationCap, Phone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, extraParam?: string) => void;
  onOpenSearch: () => void;
  onOpenEnrollment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenEnrollment,
}) => {
  const { data } = useData();
  const { settings } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'institucional', label: 'INSTITUCIONAL' },
    { id: 'propuesta', label: 'PROPUESTA EDUCATIVA' },
    { id: 'noticias', label: 'NOTICIAS' },
    { id: 'contacto', label: 'CONTACTO' },
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 text-[12px] sm:text-[13px]">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Ciclo Lectivo 2025: Inscripciones Abiertas
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-stone-300">
              <span className="inline-flex items-center gap-1 text-stone-300">
                <span className="font-semibold text-amber-400/90">Inicial:</span>
                <a href="tel:4534536" className="hover:text-white transition-colors">453.4536</a>
              </span>
              <span className="text-stone-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-stone-300">
                <span className="font-semibold text-sky-400/90">Primario:</span>
                <a href="tel:4535780" className="hover:text-white transition-colors">453.5780</a>
              </span>
              <span className="text-stone-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-stone-300">
                <span className="font-semibold text-emerald-400/90">Secundario:</span>
                <a href="tel:4515205" className="hover:text-white transition-colors">451.5205</a>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-stone-400 text-xs">La Plata • {settings.openingHours}</span>
            <button
              onClick={() => onNavigate('admin')}
              id="header-admin-link-btn"
              className="inline-flex items-center gap-1 text-stone-300 hover:text-amber-200 bg-stone-800 hover:bg-stone-700/80 px-2.5 py-1 rounded text-xs transition-colors font-medium cursor-pointer border border-stone-700/50"
              title="Panel de Administración"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Acceso Administrador</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-stone-200'
            : 'bg-white py-3 border-b border-stone-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Institution Name */}
          <div
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="header-logo-brand"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-stone-100 p-1 flex items-center justify-center border border-stone-200/80 shadow-xs group-hover:border-amber-400 transition-colors flex-shrink-0">
              <img
                src={settings.logoUrl || "/images/logo-ide-mini-50x58.png"}
                alt={settings.instituteName}
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-sky-900 transition-colors">
                {settings.instituteName}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold tracking-wide text-stone-600 mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="text-amber-700 font-bold">La Plata</span>
                <span>•</span>
                <span>Inicial (8084)</span>
                <span>•</span>
                <span>Primario (3466)</span>
                <span>•</span>
                <span>Secundario (7811)</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-sky-900 bg-sky-50 font-bold border border-sky-100 shadow-xs'
                      : 'text-stone-700 hover:text-sky-800 hover:bg-stone-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search + Inscripciones Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              id="header-search-btn"
              className="p-2.5 text-stone-600 hover:text-sky-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Buscar en todo el sitio"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenEnrollment}
              id="header-cta-inscripciones-btn"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-800 to-sky-900 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer whitespace-nowrap border border-sky-950/20"
            >
              INSCRIPCIONES 2025
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="header-mobile-toggle"
              className="xl:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenEnrollment();
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-drawer-inscripciones-btn"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-center rounded-lg shadow cursor-pointer text-sm"
                >
                  SOLICITAR INSCRIPCIÓN
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setMobileMenuOpen(false);
                  }}
                  id="mobile-drawer-admin-btn"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-center rounded-lg cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Acceso Panel Administrador
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
