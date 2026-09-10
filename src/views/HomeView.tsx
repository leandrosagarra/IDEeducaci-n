import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, BookOpen, Calendar, Award, Users, ChevronRight, CheckCircle2, Phone, MapPin } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenEnrollment: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenEnrollment }) => {
  const { data } = useData();
  const { settings, educationalOffers, news, events, pages } = data;

  const publishedOffers = educationalOffers.filter(
    o => o.status === 'PUBLICADO' && o.id !== 'talleres-extracurriculares' && o.level !== 'Talleres y Extracurricular'
  );
  const featuredNews = news.filter(n => n.status === 'PUBLICADO').slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 4. HERO PRINCIPAL */}
      <section className="relative overflow-hidden bg-stone-900 text-white min-h-[560px] lg:min-h-[640px] flex items-center shadow-xl">
        {/* Background Image: Foto real de la fachada del Instituto de Enseñanza */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ide.jpg?v=upload"
            alt="Instituto de Enseñanza La Plata"
            className="w-full h-full object-cover object-center brightness-90"
          />
          {/* Overlay suave que oscurece sutilmente la zona del texto para dar legibilidad, dejando el fondo bien visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-stone-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-950/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/70 backdrop-blur-xs border border-white/20 text-stone-200 text-xs sm:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admisiones y Matrículas Abiertas • Ciclo Lectivo 2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
              {settings.instituteName}
            </h1>

            <p className="text-lg sm:text-xl text-stone-100 font-normal leading-relaxed max-w-2xl drop-shadow-xs">
              Escuela Laica, Mixta y de Doble Jornada con más de 25 años educando con afecto y rigor académico en la ciudad de La Plata.
            </p>

            {/* CTAs con colores neutros y pasteles */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => onNavigate('propuesta')}
                id="hero-btn-propuesta"
                className="px-6 py-3.5 rounded-xl bg-[#D6E4F0] hover:bg-[#C5D8E8] text-[#1E3A5F] font-bold text-sm tracking-wide border border-[#B5CDE0] shadow-md shadow-stone-950/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>CONOCÉ NUESTRA PROPUESTA</span>
                <ArrowRight className="w-4 h-4 text-[#1E3A5F]" />
              </button>

              <button
                onClick={onOpenEnrollment}
                id="hero-btn-inscripciones"
                className="px-6 py-3.5 rounded-xl bg-[#FDEBD0] hover:bg-[#F9DEBC] text-[#7C2D12] font-bold text-sm tracking-wide border border-[#F6CE9B] shadow-md shadow-stone-950/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                INSCRIPCIONES 2027
              </button>

              <button
                onClick={() => onNavigate('contacto')}
                id="hero-btn-contacto"
                className="px-6 py-3.5 rounded-xl bg-[#F5F2EB]/95 hover:bg-[#EAE4D7] text-[#292524] font-bold text-sm tracking-wide border border-[#DDD5C5] shadow-md shadow-stone-950/20 backdrop-blur-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                CONTACTO Y SEDES
              </button>
            </div>

            {/* Micro badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-200 border-t border-white/15">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Nivel Inicial, Primario y Secundario</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doble Jornada con Talleres</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Robótica, Inglés Intensivo y Deportes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS METRIC BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <div className="bg-[#FAF8F3] rounded-2xl shadow-xl border border-[#DFD6C3] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-[#E8E0D1] last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">25+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Años de Trayectoria</div>
            <div className="text-[11px] text-stone-600">En la ciudad de La Plata</div>
          </div>
          <div className="space-y-1 sm:border-r border-[#E8E0D1] last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-blue-800 tracking-tight">3</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Sedes Propias</div>
            <div className="text-[11px] text-stone-600">Inicial • Primaria • Secundaria</div>
          </div>
          <div className="space-y-1 border-r border-[#E8E0D1] last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">3</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Niveles Articulados</div>
            <div className="text-[11px] text-stone-600">Desde sala de 2 hasta 6º de Secundaria</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-800 tracking-tight">100%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Doble Jornada con Talleres</div>
            <div className="text-[11px] text-stone-600">Robótica, Inglés, Plástica y Deportes</div>
          </div>
        </div>
      </div>

      {/* PROPUESTA EDUCATIVA */}
      <section className="bg-[#F8F5EE] py-16 sm:py-24 border-y border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/90 border border-blue-200/80 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-blue-700" />
              <span>Niveles Educativos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Nuestra Propuesta Pedagógica
            </h2>
            <p className="text-sm sm:text-base text-stone-700">
              Acompañamos el crecimiento de cada alumno desde la primera infancia hasta su graduación preuniversitaria en nuestras 3 sedes de La Plata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#FAF7F0] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-[#E5DEC9] flex flex-col transition-all duration-200 group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-stone-200">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-xs ${
                    offer.id === 'nivel-inicial'
                      ? 'bg-[#B45309]'
                      : offer.id === 'nivel-primario'
                      ? 'bg-[#0369A1]'
                      : 'bg-[#047857]'
                  }`}>
                    {offer.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xl group-hover:text-blue-900 transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mt-2">
                      <span>{offer.duration}</span>
                      <span>•</span>
                      <span className="text-blue-800 font-semibold">{offer.modality}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3 line-clamp-3">
                      {offer.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E0D1]">
                    <button
                      onClick={() => onNavigate('propuesta', offer.id)}
                      id={`offer-card-btn-${offer.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-700 text-stone-800 hover:text-white font-bold text-xs tracking-wide border border-[#E5DEC9] hover:border-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Más información</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('propuesta')}
              className="inline-flex items-center gap-2 font-bold text-sm text-blue-800 hover:text-blue-900 hover:underline cursor-pointer"
            >
              <span>Ver todos los niveles, planes de estudio y materias</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* COMUNIDAD EDUCATIVA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] rounded-3xl border border-[#E5DEC9] p-8 sm:p-12 lg:p-14 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200/80">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Comunidad Educativa</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">
            Una comunidad que educa con diálogo, solidez y vocación
          </h2>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal max-w-4xl">
            {pages.institucional?.content ||
              'Desde nuestra fundación en la ciudad de La Plata, el Instituto de Enseñanza promueve una educación transformadora sustentada en valores, el pensamiento crítico, la innovación pedagógica y un acompañamiento cercano y constante entre la familia y la escuela.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('institucional')}
              id="home-btn-conocer-historia"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              <span>CONOCER NUESTRA HISTORIA</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#EAE2D2] hover:bg-[#DDD3C0] text-slate-800 font-bold text-xs sm:text-sm tracking-wide border border-[#D5C9B3] transition-colors cursor-pointer"
            >
              <span>VISITAR NUESTRAS SEDES</span>
            </button>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS & CALENDAR PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Events Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Agenda Institucional</div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Próximos Eventos y Fechas Clave
                </h2>
              </div>
              <button
                onClick={() => onNavigate('estudiantes')}
                className="text-xs font-bold text-blue-800 hover:underline cursor-pointer"
              >
                Ver calendario completo
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map(evt => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#DFD6C3] shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center min-w-[65px] flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-700 mx-auto mb-1" />
                    <div className="text-xs font-bold text-blue-950">
                      {evt.date.split('-')[2]}/{evt.date.split('-')[1]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100/70 text-blue-900">
                        {evt.category}
                      </span>
                      {evt.time && (
                        <span className="text-xs text-stone-500 font-medium">{evt.time}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{evt.title}</h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">{evt.description}</p>
                    <div className="text-[11px] text-stone-500 mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick family & student links Right */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl border border-blue-900/40">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
                <Users className="w-3.5 h-3.5" />
                <span>Espacio Estudiantes y Familias</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-tight">
                Información Académica y Administrativa
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Acceso directo a cronogramas de exámenes, reglamentos de convivencia, solicitud de certificados y trámites en nuestras 3 sedes.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate('estudiantes')}
                  className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span>Cronograma de Mesas de Examen</span>
                  <ChevronRight className="w-4 h-4 text-blue-300" />
                </button>
                <button
                  onClick={() => onNavigate('estudiantes')}
                  className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span>Reglamento Interno y Convivencia Escolar</span>
                  <ChevronRight className="w-4 h-4 text-blue-300" />
                </button>
                <button
                  onClick={() => onNavigate('estudiantes')}
                  className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span>Ficha Médica y Descargables Oficiales</span>
                  <ChevronRight className="w-4 h-4 text-blue-300" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-900/60 mt-6 flex items-center justify-between">
              <div className="text-xs text-stone-300">¿Consultas administrativas?</div>
              <button
                onClick={() => onNavigate('contacto')}
                className="text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Contactar Secretaría
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NOTICIAS DESTACADAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Comunidad y Novedades</div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Últimas Noticias del Instituto
            </h2>
          </div>
          <button
            onClick={() => onNavigate('noticias')}
            className="inline-flex items-center gap-1.5 font-bold text-sm text-blue-800 hover:text-blue-900 cursor-pointer"
          >
            <span>Ver todas las noticias</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredNews.map(item => (
            <article
              key={item.id}
              onClick={() => onNavigate('noticias', item.id)}
              className="bg-[#FAF8F3] rounded-2xl overflow-hidden border border-[#DFD6C3] shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer group"
            >
              <div className="h-48 overflow-hidden bg-stone-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-blue-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[11px] text-stone-500 font-semibold">{item.publishedAt}</span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Leer nota completa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER CON FOTO ADJUNTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden border border-[#DFD6C3]">
          {/* Background image ide.jpg */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/ide.jpg"
              alt="Fachada Instituto de Enseñanza"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/60 to-transparent sm:from-stone-950/80 sm:via-stone-900/50 sm:to-stone-900/20" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/70 border border-white/20 text-stone-200 text-xs font-semibold uppercase tracking-wider">
              <span>Inscripciones Abiertas • Ciclo 2027</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Sumate a la comunidad del Instituto de Enseñanza
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Las inscripciones para Nivel Inicial, Primario y Secundario se encuentran habilitadas. Coordiná una entrevista personalizada con el equipo directivo para conocer nuestro proyecto pedagógico e instalaciones en cualquiera de nuestras 3 sedes.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenEnrollment}
                id="home-cta-enroll-btn"
                className="px-6 py-3.5 rounded-xl bg-[#FDEBD0] hover:bg-[#F9DEBC] text-[#7C2D12] font-extrabold text-sm tracking-wide border border-[#F6CE9B] shadow-md transition-colors cursor-pointer"
              >
                INSCRIPCIONES 2027
              </button>
              <button
                onClick={() => onNavigate('contacto')}
                id="home-cta-contact-btn"
                className="px-6 py-3.5 rounded-xl bg-[#F5F2EB]/95 hover:bg-[#EAE4D7] text-[#292524] font-bold text-sm tracking-wide border border-[#DDD5C5] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-stone-700" />
                <span>Consultar Sedes y Contacto</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
