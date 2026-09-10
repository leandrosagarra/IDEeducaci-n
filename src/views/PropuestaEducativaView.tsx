import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { EducationalOffer } from '../types';
import { BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, FileText, ArrowLeft, ArrowRight, Phone, MapPin, Building2 } from 'lucide-react';

interface PropuestaEducativaViewProps {
  initialOfferId?: string;
  onOpenEnrollment: () => void;
  onNavigateContact: () => void;
}

export const PropuestaEducativaView: React.FC<PropuestaEducativaViewProps> = ({
  initialOfferId,
  onOpenEnrollment,
  onNavigateContact,
}) => {
  const { data } = useData();
  const { educationalOffers, settings } = data;

  const [selectedOffer, setSelectedOffer] = useState<EducationalOffer | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('TODOS');

  useEffect(() => {
    if (initialOfferId) {
      const match = educationalOffers.find(o => o.id === initialOfferId);
      if (match) {
        setSelectedOffer(match);
      }
    }
  }, [initialOfferId, educationalOffers]);

  const levels = ['TODOS', 'Nivel Inicial', 'Nivel Primario', 'Nivel Secundario'];

  const filteredOffers = educationalOffers.filter(o => {
    if (o.status !== 'PUBLICADO') return false;
    if (o.id === 'talleres-extracurriculares' || o.level === 'Talleres y Extracurricular') return false;
    if (selectedLevelFilter === 'TODOS') return true;
    return o.level === selectedLevelFilter;
  });

  // Helper to find associated branch
  const getBranchForOffer = (level: string) => {
    if (!settings.branches) return null;
    if (level.includes('Inicial')) return settings.branches.find(b => b.level.includes('Inicial'));
    if (level.includes('Primario')) return settings.branches.find(b => b.level.includes('Primario'));
    if (level.includes('Secundario')) return settings.branches.find(b => b.level.includes('Secundario'));
    return settings.branches[1] || settings.branches[0]; // fallback
  };

  // If viewing detailed single offer page
  if (selectedOffer) {
    const branch = getBranchForOffer(selectedOffer.level);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Back navigation */}
        <button
          onClick={() => setSelectedOffer(null)}
          id="back-to-offers-btn"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-950 hover:text-blue-900 bg-blue-100/80 border border-blue-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Propuesta Educativa</span>
        </button>

        {/* Hero header for the educational proposal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F3] rounded-3xl p-6 sm:p-10 border border-[#DFD6C3] shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                {selectedOffer.level}
              </span>
              <span className="bg-[#EFE9DC] text-stone-800 text-xs font-semibold px-3 py-1 rounded-md border border-[#DFD6C3]">
                {selectedOffer.modality}
              </span>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-md">
                {selectedOffer.duration}
              </span>
              {branch && (
                <span className="bg-sky-100 text-sky-900 text-xs font-semibold px-3 py-1 rounded-md border border-sky-200">
                  {branch.diegep}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedOffer.title}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {selectedOffer.shortDescription}
            </p>

            {/* Branch pill if available */}
            {branch && (
              <div className="bg-[#F5F1E6] border border-[#DFD6C3] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>{branch.name} • {branch.diegep}</span>
                  </div>
                  <div className="text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{branch.address}</span>
                  </div>
                </div>
                <a
                  href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Tel: {branch.phone}</span>
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenEnrollment}
                id="offer-detail-inscribirme-btn"
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-colors cursor-pointer"
              >
                SOLICITAR VACANTE / INSCRIBIRSE
              </button>
              <button
                onClick={onNavigateContact}
                id="offer-detail-consultar-btn"
                className="px-6 py-3 rounded-xl bg-[#EFE9DC] hover:bg-[#E2DAC9] text-stone-800 font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 border border-[#DFD6C3]"
              >
                <Phone className="w-4 h-4 text-blue-700" />
                <span>CONSULTAR SEDE</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-stone-200 bg-stone-100">
              <img
                src={selectedOffer.imageUrl}
                alt={selectedOffer.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main left details: Full description & curriculum */}
          <div className="lg:col-span-8 space-y-8">
            {/* Full description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Descripción del Nivel</h2>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {selectedOffer.fullDescription}
              </p>
            </div>

            {/* Curriculum Table / Plan de estudios */}
            {selectedOffer.curriculum && selectedOffer.curriculum.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Plan de Estudios y Asignaturas
                  </h2>
                  <span className="text-xs text-stone-500 font-medium">Resolución DIEGEP oficial</span>
                </div>

                <div className="space-y-6">
                  {selectedOffer.curriculum.map((curr, idx) => (
                    <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden">
                      <div className="bg-stone-50 px-4 py-3 font-bold text-sm text-slate-800 border-b border-stone-200">
                        {curr.yearOrGroup}
                      </div>
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 bg-white">
                        {curr.subjects.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 p-1.5 rounded hover:bg-stone-50">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0"></span>
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar: Requirements, Schedule, Documents */}
          <div className="lg:col-span-4 space-y-6">
            {/* Horarios y Turnos */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Horarios y Turnos</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {selectedOffer.schedules}
              </p>
            </div>

            {/* Requisitos de Ingreso */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Requisitos de Ingreso</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {selectedOffer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentación a presentar */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Documentación Necesaria</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {selectedOffer.documentationNeeded.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inscripción notice */}
            <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200 text-xs text-amber-950 space-y-3">
              <div className="font-bold text-amber-900 uppercase tracking-wide">Pautas de Matriculación</div>
              <p className="leading-relaxed text-amber-900/90">{selectedOffer.enrollmentInfo}</p>
              <button
                onClick={onOpenEnrollment}
                className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-center rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Completar Formulario de Inscripción
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Offer listings view with level tabs
  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-stone-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl border border-[#DFD6C3]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ide.jpg"
            alt="Instituto de Enseñanza La Plata"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-blue-950/85" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-950/80 border border-blue-400/50 px-3 py-1 rounded-full">
            Propuesta Académica
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Nuestra Oferta Educativa
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            Proyectos pedagógicos integrales articulados desde los 2 años hasta la finalización del nivel secundario en nuestras 3 sedes de La Plata.
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#DFD6C3]">
          {levels.map(level => {
            const isActive = selectedLevelFilter === level;
            return (
              <button
                key={level}
                onClick={() => setSelectedLevelFilter(level)}
                id={`filter-level-${level.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-[#FAF8F3] hover:bg-[#EFE9DC] text-stone-700 border border-[#DFD6C3]'
                }`}
              >
                {level === 'TODOS' ? 'Todos los Niveles' : level}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => {
            const branch = getBranchForOffer(offer.level);

            return (
              <div
                key={offer.id}
                className="bg-[#FAF8F3] rounded-3xl overflow-hidden border border-[#DFD6C3] shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col group"
              >
                {/* Cover image */}
                <div className="h-52 overflow-hidden bg-stone-200 relative">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide shadow-xs ${
                    offer.id === 'talleres-extracurriculares' ? 'bg-blue-700' : 'bg-stone-900/90'
                  }`}>
                    {offer.level}
                  </span>
                  {branch && (
                    <span className="absolute bottom-4 right-4 bg-blue-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {branch.diegep}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-xl group-hover:text-blue-900 transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-700" />
                      <span>Duración: {offer.duration}</span>
                      <span>•</span>
                      <span className="text-blue-800 font-semibold">{offer.modality}</span>
                    </div>
                    {branch && (
                      <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <span>{branch.address} • Tel: {branch.phone}</span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 pt-1">
                      {offer.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E0D1] space-y-2">
                    <button
                      onClick={() => setSelectedOffer(offer)}
                      id={`btn-ver-oferta-${offer.id}`}
                      className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Ver materias, requisitos y detalles</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onOpenEnrollment}
                      className="w-full py-2 text-center text-xs font-bold text-blue-800 hover:text-blue-900 hover:underline cursor-pointer"
                    >
                      Solicitar vacante online
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
