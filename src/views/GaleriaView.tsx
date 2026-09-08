import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { GalleryAlbum, GalleryPhoto } from '../types';
import { Image as ImageIcon, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GaleriaView: React.FC = () => {
  const { data } = useData();
  const { gallery } = data;

  const [selectedCategory, setSelectedCategory] = useState('TODAS');
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const categories = ['TODAS', 'Actos', 'Actividades', 'Institución', 'Deportes', 'Inicial'];

  const filteredAlbums = gallery.filter(album => {
    if (album.status !== 'PUBLICADO') return false;
    if (selectedCategory === 'TODAS') return true;
    return album.category === selectedCategory;
  });

  // Current photos for lightbox
  const currentPhotos: GalleryPhoto[] = activeAlbum ? (activeAlbum.images || activeAlbum.photos || []) : [];

  const handleOpenLightbox = (index: number) => {
    setLightboxPhotoIndex(index);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxPhotoIndex !== null && currentPhotos.length > 0) {
      setLightboxPhotoIndex((lightboxPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxPhotoIndex !== null && currentPhotos.length > 0) {
      setLightboxPhotoIndex((lightboxPhotoIndex + 1) % currentPhotos.length);
    }
  };

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1600&auto=format&fit=crop&q=80"
            alt="Galería del Instituto de Enseñanza"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full">
            Registro Visual
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Galería Fotográfica Institucional
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
            Imágenes de nuestra vida escolar, proyectos áulicos, talleres extracurriculares y actos conmemorativos.
          </p>
        </div>
      </section>

      {/* Main Albums Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat === 'TODAS' ? 'Todos los Álbumes' : cat}
            </button>
          ))}
        </div>

        {/* Albums */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map(album => (
            <div
              key={album.id}
              onClick={() => {
                setActiveAlbum(album);
                handleOpenLightbox(0);
              }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer group"
            >
              <div className="h-56 overflow-hidden bg-slate-100 relative">
                <img
                  src={album.coverImage || album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {album.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-blue-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{(album.images || album.photos || []).length} fotos</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{album.date}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-700 transition-colors leading-snug mt-1">
                    {album.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {album.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-blue-700 flex items-center justify-between">
                  <span>Abrir visor fotográfico</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxPhotoIndex !== null && currentPhotos[lightboxPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={() => setLightboxPhotoIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-bold truncate max-w-md">
              {activeAlbum?.title} ({lightboxPhotoIndex + 1} de {currentPhotos.length})
            </div>
            <button
              onClick={() => setLightboxPhotoIndex(null)}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center with Controls */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhotos[lightboxPhotoIndex].url}
              alt={currentPhotos[lightboxPhotoIndex].caption || 'Foto del Instituto de Enseñanza'}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Prev button */}
            {currentPhotos.length > 1 && (
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-xs transition-all cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next button */}
            {currentPhotos.length > 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-xs transition-all cursor-pointer"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div
            className="w-full max-w-3xl text-center py-2 text-slate-200 text-xs sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {currentPhotos[lightboxPhotoIndex].caption}
          </div>
        </div>
      )}
    </div>
  );
};
