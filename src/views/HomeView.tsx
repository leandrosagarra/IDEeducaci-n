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

  const publishedOffers = educationalOffers.filter(o => o.status === 'PUBLICADO');
  const featuredNews = news.filter(n => n.status === 'PUBLICADO').slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 4. HERO PRINCIPAL */}
      <section className="relative overflow-hidden bg-stone-900 text-white min-h-[580px] lg:min-h-[660px] flex items-center shadow-xl">
        {/* Background Image: Foto real adjunta de la fachada del Instituto de Enseñanza sin oscurecer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ide.jpg"
            alt="Fachada del Instituto de Enseñanza La Plata"
            className="w-full h-full object-cover object-[center_30%] sm:object-[center_35%]"
          />
          {/* Mínimo tinte solo para dar profundidad, permitiendo que la foto real y sus colores luzcan en su esplendor */}
          <div className="absolute inset-0 bg-stone-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex items-center">
          {/* Tarjeta flotante con efecto cristal para no tapar la fachada del edificio */}
          <div className="max-w-2xl bg-stone-950/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-white/25 text-stone-200 text-xs sm:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admisiones y Matrículas Abiertas • Ciclo Lectivo 2025</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
              {settings.instituteName}
            </h1>

            <p className="text-base sm:text-lg text-stone-200 font-normal leading-relaxed">
              Escuela Laica, Mixta y de Doble Jornada con más de 25 años educando con afecto y rigor académico en la ciudad de La Plata.
            </p>

            {/* CTAs con colores neutros y pasteles */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate('propuesta')}
                id="hero-btn-propuesta"
                className="px-5 py-3 rounded-xl bg-[#D6E4F0] hover:bg-[#C5D8E8] text-[#1E3A5F] font-bold text-sm tracking-wide border border-[#B5CDE0] shadow-md shadow-stone-950/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>CONOCÉ NUESTRA PROPUESTA</span>
                <ArrowRight className="w-4 h-4 text-[#1E3A5F]" />
              </button>

              <button
                onClick={onOpenEnrollment}
                id="hero-btn-inscripciones"
                className="px-5 py-3 rounded-xl bg-[#FDEBD0] hover:bg-[#F9DEBC] text-[#7C2D12] font-bold text-sm tracking-wide border border-[#F6CE9B] shadow-md shadow-stone-950/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                INSCRIPCIONES 2025
              </button>

              <button
                onClick={() => onNavigate('contacto')}
                id="hero-btn-contacto"
                className="px-5 py-3 rounded-xl bg-[#F5F2EB]/95 hover:bg-[#EAE4D7] text-[#292524] font-bold text-sm tracking-wide border border-[#DDD5C5] shadow-md shadow-stone-950/20 backdrop-blur-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                CONTACTO Y SEDES
              </button>
            </div>

            {/* Micro badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-200 border-t border-white/15">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Nivel Inicial, Primario y Secundario</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doble Jornada Optativa</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Inglés, Robótica y Deportes</span>
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
            <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Doble Jornada Optativa</div>
            <div className="text-[11px] text-stone-600">Robótica, Inglés, Plástica y Deportes</div>
          </div>
        </div>
      </div>

      {/* 3 SEDES HIGHLIGHT BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/90 border border-blue-200/80 px-3 py-1 rounded-full">
            Nuestras 3 Sedes en La Plata
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Instalaciones Adaptadas a Cada Etapa
          </h2>
          <p className="text-sm text-stone-600">
            Cada nivel cuenta con su edificio propio, directivos especializados y canales telefónicos directos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inicial */}
          <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative bg-stone-200">
              <img
                src="/images/jardin-696x504.jpg"
                alt="Sede Nivel Inicial Calle 68 nº 969"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-xs">
                DIEGEP 8084
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">
                  Nivel Inicial
                </h3>
                <div className="text-xs text-[#92400E] font-semibold bg-[#FEF3C7]/90 border border-[#FDE68A] px-2.5 py-1 rounded-md inline-block">
                  Salas de 2 a 5 años (Maternal e Infantes)
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>Calle 68 nº 969 e/ 14 y 15 • (1900) La Plata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <a href="tel:4534536" className="font-bold text-slate-800 hover:text-blue-700">Tel: 453.4536</a>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E8E0D1] flex items-center justify-between text-xs">
                <span className="text-stone-500">Directora: <strong className="text-stone-800">Natalia García</strong></span>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver nivel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Primario: foto con estilo pedagógico similar a inicial y secundario */}
          <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative bg-stone-200">
              <img
                src="/images/primario-626x626.jpg"
                alt="Alumnos de Nivel Primario en clase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-xs">
                DIEGEP 3466
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">
                  Nivel Primario
                </h3>
                <div className="text-xs text-[#0369A1] font-semibold bg-[#E0F2FE]/90 border border-[#BAE6FD] px-2.5 py-1 rounded-md inline-block">
                  1º a 6º Año • Doble Jornada Optativa
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <span>Calle 66 nº 818 e/ 11 y 12 • (1900) La Plata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-700 flex-shrink-0" />
                    <a href="tel:4535780" className="font-bold text-slate-800 hover:text-blue-800">Tel: 453.5780</a>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E8E0D1] flex items-center justify-between text-xs">
                <span className="text-stone-500">Directora: <strong className="text-stone-800">Cabo Vanesa</strong></span>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver nivel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Secundario */}
          <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative bg-stone-200">
              <img
                src="/images/secundario-622x544.jpg"
                alt="Sede Nivel Secundario Calle 68 nº 970"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-xs">
                DIEGEP 7811
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">
                  Nivel Secundario
                </h3>
                <div className="text-xs text-[#065F46] font-semibold bg-[#ECFDF5]/90 border border-[#A7F3D0] px-2.5 py-1 rounded-md inline-block">
                  Cs. Sociales • Economía y Administración
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Calle 68 nº 970 e/ 14 y 15 • (1900) La Plata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <a href="tel:4515205" className="font-bold text-slate-800 hover:text-blue-700">Tel: 451.5205</a>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E8E0D1] flex items-center justify-between text-xs">
                <span className="text-stone-500">Directora: <strong className="text-stone-800">Roxana Petruccelli</strong></span>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver nivel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMUNIDAD EDUCATIVA (Sin foto de fondo y con diseño limpio y ameno) */}
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

      {/* 6. PROPUESTA EDUCATIVA & TALLERES */}
      <section className="bg-[#F8F5EE] py-16 sm:py-24 border-y border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/90 border border-blue-200/80 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-blue-700" />
              <span>Niveles Educativos y Extracurriculares</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Nuestra Propuesta Pedagógica
            </h2>
            <p className="text-sm sm:text-base text-stone-700">
              Acompañamos el crecimiento de cada alumno desde la primera infancia hasta su graduación preuniversitaria, sumando talleres extracurriculares de excelencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#FAF7F0] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-[#E5DEC9] flex flex-col transition-all duration-200 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-xs ${
                    offer.id === 'talleres-extracurriculares'
                      ? 'bg-blue-700'
                      : offer.id === 'nivel-inicial'
                      ? 'bg-[#B45309]'
                      : offer.id === 'nivel-primario'
                      ? 'bg-[#0369A1]'
                      : 'bg-[#047857]'
                  }`}>
                    {offer.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-900 transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mt-2">
                      <span>{offer.duration}</span>
                      <span>•</span>
                      <span className="text-blue-800 font-semibold">{offer.modality}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mt-3 line-clamp-3">
                      {offer.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E0D1]">
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

          {/* TALLERES Y EXTRACURRICULARES SPOTLIGHT */}
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
                  <span>Doble Jornada y Talleres Extracurriculares</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Talleres Pedagógicos, Tecnológicos y Deportivos
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Nuestros talleres extracurriculares en el contra-turno ofrecen a los alumnos un espacio estimulante y colaborativo para potenciar sus intereses en tecnología, lenguas extranjeras, prácticas deportivas y expresión artística.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#F2EDE2] border border-[#DDD5C3] text-center">
                    <div className="text-xs font-black text-blue-900">Robótica & Scratch</div>
                    <div className="text-[11px] text-stone-600 mt-0.5">Pensamiento lógico</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F2EDE2] border border-[#DDD5C3] text-center">
                    <div className="text-xs font-black text-blue-900">Inglés Intensivo</div>
                    <div className="text-[11px] text-stone-600 mt-0.5">Prep. Cambridge</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F2EDE2] border border-[#DDD5C3] text-center">
                    <div className="text-xs font-black text-blue-900">Escuela Deportiva</div>
                    <div className="text-[11px] text-stone-600 mt-0.5">Básquet, Vóley, Fútbol</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F2EDE2] border border-[#DDD5C3] text-center">
                    <div className="text-xs font-black text-blue-900">Artes y Teatro</div>
                    <div className="text-[11px] text-stone-600 mt-0.5">Música y Expresión</div>
                  </div>
                </div>
                <div className="pt-3 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('propuesta', 'talleres-extracurriculares')}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs tracking-wide shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Ver cronograma de talleres</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenEnrollment}
                    className="px-5 py-2.5 rounded-xl bg-[#EAE2D2] hover:bg-[#DDD3C0] text-slate-900 font-bold text-xs tracking-wide border border-[#D5C9B3] transition-colors cursor-pointer"
                  >
                    Inscripción a talleres 2026
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-2 border-[#DFD6C3] bg-stone-200">
                  <img
                    src="/images/talleres-extracurriculares.jpg"
                    alt="Talleres y formación extracurricular en el Instituto de Enseñanza"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('propuesta')}
              className="inline-flex items-center gap-2 font-bold text-sm text-blue-800 hover:text-blue-900 hover:underline cursor-pointer"
            >
              <span>Ver todas las carreras, planes de estudio y materias</span>
              <ArrowRight className="w-4 h-4" />
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
              <span>Inscripciones Abiertas • Ciclo 2025</span>
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
                SOLICITAR VACANTE ONLINE
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
