import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Search, X, BookOpen, Newspaper, FileText, HelpCircle, ArrowRight, Compass } from 'lucide-react';
import { InstitutionalPage } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, extraParam?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { data } = useData();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search in Pages
  const matchedPages: InstitutionalPage[] = q
    ? (Object.values(data.pages) as InstitutionalPage[]).filter(
        p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
      )
    : [];

  // Search in Educational Offers
  const matchedOffers = q
    ? data.educationalOffers.filter(
        o =>
          o.title.toLowerCase().includes(q) ||
          o.level.toLowerCase().includes(q) ||
          o.shortDescription.toLowerCase().includes(q) ||
          o.fullDescription.toLowerCase().includes(q) ||
          o.requirements.some(r => r.toLowerCase().includes(q))
      )
    : [];

  // Search in News
  const matchedNews = q
    ? data.news.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some(t => t.toLowerCase().includes(q))
      )
    : [];

  // Search in Documents
  const matchedDocs = q
    ? data.documents.filter(
        d =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          (d.contentSummary && d.contentSummary.toLowerCase().includes(q))
      )
    : [];

  // Search in FAQs
  const matchedFaqs = q
    ? data.faq.filter(
        f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedPages.length +
    matchedOffers.length +
    matchedNews.length +
    matchedDocs.length +
    matchedFaqs.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            id="global-search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar carreras, niveles, noticias, documentos, fechas o preguntas..."
            className="w-full text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          {!query ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              <Compass className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              Escribí una palabra clave para buscar simultáneamente en todo el sitio institucional.
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No se encontraron coincidencias para &quot;{query}&quot;. Podés consultar en Secretaría o usar el Asistente del Instituto.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Category: Educational Offers */}
              {matchedOffers.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Propuesta Educativa y Niveles ({matchedOffers.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedOffers.map(offer => (
                      <div
                        key={offer.id}
                        onClick={() => {
                          onNavigate('propuesta', offer.id);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-amber-800">
                            {offer.title}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {offer.shortDescription}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category: News */}
              {matchedNews.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                    <Newspaper className="w-4 h-4 text-amber-700" />
                    <span>Noticias y Novedades ({matchedNews.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedNews.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onNavigate('noticias', item.id);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-amber-800">
                            {item.title}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {item.excerpt}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category: Documents */}
              {matchedDocs.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>Documentos Oficiales ({matchedDocs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          onNavigate('estudiantes');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-amber-800">
                            {doc.title}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {doc.description}
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          {doc.fileType}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category: FAQs */}
              {matchedFaqs.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Preguntas Frecuentes ({matchedFaqs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedFaqs.map(faq => (
                      <div
                        key={faq.id}
                        onClick={() => {
                          onNavigate('faq');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50/50 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer"
                      >
                        <div className="font-bold text-slate-900 text-sm">
                          {faq.question}
                        </div>
                        <div className="text-xs text-stone-600 line-clamp-2 mt-1">
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category: Pages */}
              {matchedPages.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    <Compass className="w-4 h-4 text-stone-500" />
                    <span>Secciones Institucionales ({matchedPages.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedPages.map(page => (
                      <div
                        key={page.slug}
                        onClick={() => {
                          onNavigate(page.slug === 'home' ? 'inicio' : page.slug);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all cursor-pointer"
                      >
                        <div className="font-bold text-slate-900 text-sm">
                          {page.title}
                        </div>
                        <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                          {page.subtitle}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
