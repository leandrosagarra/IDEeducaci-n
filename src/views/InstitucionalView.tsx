import React from 'react';
import { useData } from '../context/DataContext';
import { Award, Compass, Heart, Users, MapPin, CheckCircle2, Phone } from 'lucide-react';

interface InstitucionalViewProps {
  onNavigateContact: () => void;
  onOpenEnrollment: () => void;
}

export const InstitucionalView: React.FC<InstitucionalViewProps> = ({
  onNavigateContact,
  onOpenEnrollment,
}) => {
  const { data } = useData();
  const { pages, settings } = data;
  const page = pages.institucional;

  const authorities = [
    {
      name: 'Natalia García',
      role: 'Directora - Nivel Inicial',
      diegep: 'DIEGEP 8084',
      bio: 'Liderazgo pedagógico especializado en educación de la primera infancia, salas maternales de 2 años y articulación con nivel primario.',
      sede: 'Sede Calle 68 nº 969 e/ 14 y 15',
      phone: '453.4536'
    },
    {
      name: 'Cabo Vanesa',
      role: 'Directora - Nivel Primario',
      diegep: 'DIEGEP 3466',
      bio: 'Gestión académica e institucional de 1º a 6º año, coordinación de la Doble Jornada con talleres pedagógicos y articulación con secundario.',
      sede: 'Sede Calle 66 nº 818 e/ 11 y 12',
      phone: '453.5780'
    },
    {
      name: 'Roxana Petruccelli',
      role: 'Directora - Nivel Secundario',
      diegep: 'DIEGEP 7811',
      bio: 'Orientación académica en Ciencias Sociales y Economía & Administración. Preparación preuniversitaria e inserción al mundo laboral.',
      sede: 'Sede Calle 68 nº 970 e/ 14 y 15',
      phone: '451.5205'
    },
    {
      name: 'Equipo de Secretaría',
      role: 'Secretarías Académicas',
      diegep: 'Inicial • Primaria • Secundaria',
      bio: 'Sansone Rocío y Ana Lucía De Bairros. Atención administrativa de legajos, equivalencias, pases y trámites ante DIEGEP.',
      sede: 'Atención en las 3 Sedes',
      phone: '453.5780'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header Banner */}
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
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-950/80 border border-blue-400/60 px-3 py-1 rounded-full">
            Sección Institucional • Más de 25 años en La Plata
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {page?.title || 'Institucional'}
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            {page?.subtitle || 'Nuestra historia, ideario pedagógico y autoridades en la ciudad de La Plata.'}
          </p>
        </div>
      </section>

      {/* Main Narrative / History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full">
              <Award className="w-4 h-4 text-blue-700" />
              <span>Nuestra Historia y Trayectoria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Más de un cuarto de siglo formando generaciones de platenses
            </h2>
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {page?.content}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenEnrollment}
                className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs tracking-wide transition-colors cursor-pointer shadow-sm"
              >
                SOLICITAR ENTREVISTA INSTITUCIONAL
              </button>
              <button
                onClick={onNavigateContact}
                className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs tracking-wide transition-colors cursor-pointer border border-stone-200"
              >
                VER NUESTRAS 3 SEDES Y CONTACTO
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-stone-100">
              <img
                src="/images/img-20210601-wa0032-1-1024x768.jpg"
                alt="Comunidad escolar en Instituto de Enseñanza"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-800 space-y-2">
              <div className="font-bold uppercase tracking-wide text-amber-900">Proyecto Educativo Institucional (PEI)</div>
              <p className="leading-relaxed text-stone-700">
                Una escuela laica, mixta y con opción de doble jornada. Articulamos conocimientos académicos rigurosos con pensamiento crítico, tecnologías, idiomas, deportes y empatía social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Pillars: Misión, Visión, Valores */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Ideario Pedagógico</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Misión, Visión y Valores Institucionales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Nuestra Misión</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Brindar una educación integral de calidad en un clima afectivo de confianza y respeto, preparando a los alumnos como ciudadanos solidarios, críticos y autónomos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Nuestra Visión</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Consolidarnos como referente educativo en la comunidad platense por nuestro compromiso con la innovación didáctica, articulación secuencial entre niveles y calidez humana.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Nuestros Valores</h3>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Respeto, pluralismo y escucha activa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Ganas de aprender y rigor académico</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Cuidado del otro y convivencia escolar sana</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Innovación reflexiva y compromiso social</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Authorities & Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 border border-amber-300/60 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>Equipo Directivo y Secretarías</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Autoridades Institucionales por Nivel
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Cuerpo directivo y secretarías a cargo del proyecto pedagógico oficial de cada sede.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authorities.map((auth, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col p-5 justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {auth.diegep}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg">{auth.name}</h4>
                <div className="text-xs font-bold text-amber-700">{auth.role}</div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">{auth.bio}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{auth.sede}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>Tel: {auth.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sedes e Instalaciones (3 Sedes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Infraestructura y Ubicación</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Nuestras 3 Sedes en La Plata
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl">
            El Instituto de Enseñanza cuenta con tres edificios independientes diseñados y equipados específicamente para los requerimientos de cada etapa evolutiva:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sede 1: Nivel Inicial */}
          <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-sm flex flex-col">
            <div className="h-56 overflow-hidden relative bg-stone-100">
              <img
                src="/images/jardin-696x504.jpg"
                alt="Sede Nivel Inicial Instituto de Enseñanza"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-lg">
                SEDE NIVEL INICIAL • DIEGEP 8084
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      Sede Nivel Inicial
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">Calle 68 nº 969 entre 14 y 15 • (1900) La Plata</p>
                    <p className="text-xs text-amber-800 font-bold mt-0.5">Tel: 453.4536</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  Instalaciones preparadas especialmente para la primera infancia (salas maternales de 2 años y salas de 3, 4 y 5 años). Cuenta con patios de juegos seguros, sala de música y psicomotricidad y equipamiento adaptado.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                Directora: <strong className="text-stone-800">Natalia García</strong>
              </div>
            </div>
          </div>

          {/* Sede 2: Nivel Primario */}
          <div className="bg-[#FAF8F3] rounded-3xl overflow-hidden border border-[#DFD6C3] shadow-sm flex flex-col">
            <div className="h-56 overflow-hidden relative bg-stone-200">
              <img
                src="/images/primario-626x626.jpg"
                alt="Alumnos de Nivel Primario Instituto de Enseñanza - Calle 66"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
                SEDE NIVEL PRIMARIO • DIEGEP 3466
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      Sede Nivel Primario
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">Calle 66 nº 818 entre 11 y 12 • (1900) La Plata</p>
                    <p className="text-xs text-blue-800 font-bold mt-0.5">Tel: 453.5780</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  Edificio propio con aulas luminosas y ventiladas, biblioteca, patio de recreación, salón para talleres de doble jornada (inglés intensivo, robótica, plástica, ajedrez) y área administrativa.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E8E0D1] text-xs text-stone-500">
                Directora: <strong className="text-stone-800">Cabo Vanesa</strong> • Secr.: <strong className="text-stone-800">Ana Lucía De Bairros</strong>
              </div>
            </div>
          </div>

          {/* Sede 3: Nivel Secundario */}
          <div className="bg-white rounded-3xl overflow-hidden border border-emerald-200/80 shadow-sm flex flex-col">
            <div className="h-56 overflow-hidden relative bg-stone-100">
              <img
                src="/images/secundario-622x544.jpg"
                alt="Sede Nivel Secundario Instituto de Enseñanza"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
                SEDE NIVEL SECUNDARIO • DIEGEP 7811
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      Sede Nivel Secundario
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">Calle 68 nº 970 entre 14 y 15 • (1900) La Plata</p>
                    <p className="text-xs text-emerald-800 font-bold mt-0.5">Tel: 451.5205</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  Espacio académico orientado a jóvenes de 1º a 6º año de secundaria. Laboratorio de ciencias, salón de informática, orientación vocacional y proyectos comunitarios para las orientaciones en Cs. Sociales y Economía.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                Directora: <strong className="text-stone-800">Roxana Petruccelli</strong> • Secr.: <strong className="text-stone-800">Sansone Rocío</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
