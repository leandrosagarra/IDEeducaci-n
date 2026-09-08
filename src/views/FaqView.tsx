import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronDown, Search, Bot, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqViewProps {
  onOpenChatbot?: () => void;
  onNavigateContact: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigateContact }) => {
  const { data } = useData();
  const { faq, settings } = data;

  const [selectedCategory, setSelectedCategory] = useState('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true // default first open
  });

  const categories = ['TODAS', 'Inscripciones', 'Propuesta Educativa', 'Documentación', 'Horarios y Sedes', 'Administración'];

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faq.filter(item => {
    if (item.status !== 'PUBLICADO') return false;
    const matchesCategory = selectedCategory === 'TODAS' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenWhatsApp = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent('Hola Instituto de Enseñanza, tengo una consulta sobre preguntas frecuentes.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-stone-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/20210601-113218-1280x720.jpg"
            alt="Preguntas Frecuentes Instituto de Enseñanza"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-amber-950/70" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/50 px-3 py-1 rounded-full">
            Centro de Ayuda
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            Respuestas directas sobre admisiones, niveles educativos, documentación, horarios y trámites en nuestras 3 sedes.
          </p>
        </div>
      </section>

      {/* Main FAQ Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="faq-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave (ej: vacantes, inicial, horarios, certificado)..."
            className="w-full bg-white border border-stone-200 focus:border-amber-600 pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none shadow-xs transition-colors"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat === 'TODAS' ? 'Todas las Preguntas' : cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-stone-500 bg-white rounded-2xl border border-stone-200 p-8">
              <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              No encontramos preguntas frecuentes que coincidan con tu búsqueda. Podés consultar directamente con nuestro Asistente con IA o con la Secretaría.
            </div>
          ) : (
            filteredFaqs.map(item => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-amber-100/80 text-amber-900' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                      <div className="text-stone-700 whitespace-pre-line">{item.answer}</div>
                      <div className="mt-3 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        Categoría: {item.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Callout */}
        <div className="bg-gradient-to-r from-amber-50/80 via-stone-50 to-sky-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/70 text-center space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg">
            ¿Tenés alguna otra consulta o requerimiento puntual?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Utilizá nuestro Asistente Virtual Oficial con IA (disponible abajo a la derecha) para respuestas instantáneas o comunicate directamente con Secretaría.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escribir por WhatsApp</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs tracking-wide shadow-sm transition-colors cursor-pointer"
            >
              <span>Ver Teléfonos y Sedes</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
