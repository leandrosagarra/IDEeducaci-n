import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { NewsArticle } from '../types';
import { Search, Calendar, Tag, ArrowLeft, Share2, Copy, Check, MessageSquare, Facebook, Twitter } from 'lucide-react';

interface NoticiasViewProps {
  initialArticleId?: string;
}

export const NoticiasView: React.FC<NoticiasViewProps> = ({ initialArticleId }) => {
  const { data } = useData();
  const { news } = data;

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODAS');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialArticleId) {
      const match = news.find(n => n.id === initialArticleId);
      if (match) {
        setSelectedArticle(match);
      }
    }
  }, [initialArticleId, news]);

  const categories = ['TODAS', 'Institucional', 'Actos y Eventos'];

  const filteredNews = news.filter(item => {
    if (item.status !== 'PUBLICADO') return false;
    if (item.category !== 'Institucional' && item.category !== 'Actos y Eventos') return false;
    const matchesCat = selectedCategory === 'TODAS' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareWhatsApp = (title: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(`Noticia: ${title} - Instituto de Enseñanza: ${window.location.href}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = (title: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // If viewing single article
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <button
          onClick={() => setSelectedArticle(null)}
          id="back-to-news-btn"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/70 border border-amber-300/60 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al listado de noticias</span>
        </button>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-100/70 text-amber-900 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.publishedAt}
              </span>
              <span className="text-xs text-stone-400">• {selectedArticle.readTime} de lectura</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-stone-700 text-base font-medium leading-relaxed border-l-4 border-amber-600 pl-4 py-1 italic bg-stone-50/50 rounded-r-xl">
              {selectedArticle.excerpt}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-md border border-stone-200">
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-stone-700 text-base leading-relaxed space-y-4 whitespace-pre-line pt-4">
            {selectedArticle.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-stone-100 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-500">Etiquetas:</span>
            {selectedArticle.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Social share section */}
          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-700" />
              <span>Compartir esta noticia:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleShareWhatsApp(selectedArticle.title)}
                id="share-whatsapp-btn"
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200/50"
                title="Compartir por WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleShareFacebook}
                id="share-facebook-btn"
                className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-sky-200/50"
                title="Compartir en Facebook"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShareTwitter(selectedArticle.title)}
                id="share-twitter-btn"
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                title="Compartir en X"
              >
                <Twitter className="w-4 h-4" />
                <span>X</span>
              </button>

              <button
                onClick={handleCopyLink}
                id="share-copy-btn"
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                title="Copiar enlace"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? '¡Enlace copiado!' : 'Copiar enlace'}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // News listing view
  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-stone-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/20210601-113218-1280x720.jpg"
            alt="Comunidad escolar en Instituto de Enseñanza"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-amber-950/70" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/50 px-3 py-1 rounded-full">
            Comunicación Institucional
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Noticias y Comunicados
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            Novedades académicas, actividades pedagógicas y acontecimientos de la comunidad escolar en las 3 sedes.
          </p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="news-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en noticias..."
              className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm outline-none transition-colors"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            No se encontraron publicaciones con los criterios seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-stone-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 font-semibold">
                      <span>{item.publishedAt}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>Leer artículo completo</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
