import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Clock, FileText, Download, Shield, BookOpen, ExternalLink } from 'lucide-react';

interface EstudiantesViewProps {
  onNavigateContact: () => void;
}

export const EstudiantesView: React.FC<EstudiantesViewProps> = ({ onNavigateContact }) => {
  const { data } = useData();
  const { events, documents, pages } = data;
  const page = pages.estudiantes;

  const [activeTab, setActiveTab] = useState<'mesas' | 'documentos' | 'calendario' | 'convivencia'>('mesas');

  const publicDocs = documents.filter(d => d.isPublic);

  const examSessions = [
    {
      turn: 'Turno Febrero - Marzo 2026 (Previas, Libres y Equivalencias)',
      dates: '23 de Febrero al 06 de Marzo de 2026',
      schedule: 'Turno Mañana: 08:00 hs | Turno Tarde: 13:30 hs',
      levels: 'Nivel Secundario (Ambas orientaciones)',
      requirements: 'Presentarse con uniforme escolar reglamentario, DNI físico y carpeta completa de la materia.',
      regDeadline: 'Inscripción a mesas hasta el 18 de Febrero en Secretaría.'
    },
    {
      turn: 'Turno Julio 2026 (Mesas Especiales de Invierno)',
      dates: '13 de Julio al 17 de Julio de 2026',
      schedule: 'Turno Mañana: 08:30 hs',
      levels: 'Estudiantes de 6º año con materias pendientes de acreditación.',
      requirements: 'Formulario de solicitud firmado por adulto responsable con 48 hs de antelación.',
      regDeadline: 'Inscripción abierta desde el 01 al 08 de Julio.'
    },
    {
      turn: 'Turno Diciembre 2026 (Período Regular de Orientación y Evaluación)',
      dates: '01 de Diciembre al 18 de Diciembre de 2026',
      schedule: 'Según horario habitual de cursada de cada materia',
      levels: 'Nivel Primario y Nivel Secundario',
      requirements: 'Asistencia obligatoria a las clases de intensificación pedagógica.',
      regDeadline: 'Cierre de notas trimestrales: 27 de Noviembre.'
    }
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-stone-900 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/20210601-113218-1280x720.jpg"
            alt="Estudiantes en el Instituto de Enseñanza"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-amber-950/70" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/50 px-3 py-1 rounded-full">
            Espacio Académico
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {page?.title || 'Estudiantes y Familias'}
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            {page?.subtitle || 'Cronograma de exámenes, trámites, reglamentos escolares y formularios oficiales para descargar de nuestras 3 sedes.'}
          </p>
        </div>
      </section>

      {/* Navigation tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('mesas')}
            id="tab-btn-mesas"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'mesas'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Mesas de Examen</span>
          </button>

          <button
            onClick={() => setActiveTab('documentos')}
            id="tab-btn-documentos"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'documentos'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formularios y Descargas ({publicDocs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('calendario')}
            id="tab-btn-calendario"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'calendario'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendario Escolar</span>
          </button>

          <button
            onClick={() => setActiveTab('convivencia')}
            id="tab-btn-convivencia"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'convivencia'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Régimen de Convivencia</span>
          </button>
        </div>

        {/* Tab 1: Mesas de Examen */}
        {activeTab === 'mesas' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <span className="font-bold">Aviso importante para estudiantes y familias:</span> Para rendir exámenes previos, libres o equivalencias, es requisito excluyente figurar inscripto en actas de secretaría de la sede correspondiente (Secundaria en Calle 68 nº 970 / Primaria en Calle 66 nº 818) y presentarse puntualmente con documento de identidad físico y uniforme escolar reglamentario.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {examSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{session.dates}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {session.turn}
                    </h3>

                    <div className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                      <div>
                        <span className="font-bold text-slate-800">Horarios: </span>
                        {session.schedule}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">Destinatarios: </span>
                        {session.levels}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">Requisitos: </span>
                        {session.requirements}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 border border-stone-200">
                    <span className="font-bold text-slate-800">Plazo administrativo: </span>
                    {session.regDeadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Documentos y Descargables */}
        {activeTab === 'documentos' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-stone-600">
                Descargá los formularios oficiales requeridos por la institución y la DIEGEP. Todos los archivos están en formato listo para imprimir.
              </p>
              <button
                onClick={onNavigateContact}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline flex-shrink-0 cursor-pointer"
              >
                ¿Dudas con la presentación? Contactar Secretaría
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicDocs.map(doc => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200/60">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {doc.category}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {doc.fileSize}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                      <p className="text-xs text-stone-600 line-clamp-2">{doc.description}</p>
                    </div>
                  </div>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-amber-700 text-stone-700 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                    title="Descargar archivo"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Calendario Escolar */}
        {activeTab === 'calendario' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(evt => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100/70 text-amber-900">
                      {evt.date}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                      {evt.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{evt.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{evt.description}</p>

                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
                    <span>{evt.location}</span>
                    {evt.time && <span className="font-medium">{evt.time}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Convivencia y Uniforme */}
        {activeTab === 'convivencia' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
            <h3 className="text-xl font-black text-slate-900">
              Acuerdo Institucional de Convivencia (AIC) y Pautas Generales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  Puntualidad y Asistencia en las 3 Sedes
                </h4>
                <p>
                  El ingreso a clases se realiza puntualmente en cada sede (Inicial: Calle 68 nº 969, Primaria: Calle 66 nº 818, Secundaria: Calle 68 nº 970). Toda inasistencia debe ser justificada por los padres o tutores mediante cuaderno de comunicaciones dentro de las 48 horas hábiles.
                </p>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  Dispositivos Tecnológicos y Celulares
                </h4>
                <p>
                  El uso de teléfonos móviles durante el horario escolar está regulado exclusivamente para fines pedagógicos orientados por el cuerpo docente. En momentos no autorizados deberán permanecer guardados.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Uniforme Escolar Reglamentario
                </h4>
                <p>
                  El uniforme identifica a nuestros estudiantes y fortalece la pertenencia comunitaria:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li>Chomba blanca con logo bordado institucional.</li>
                  <li>Pantalón de vestir azul marino o falda tableada institucional.</li>
                  <li>Abrigo azul marino liso o campera institucional.</li>
                  <li>Educación física: remera deportiva institucional, jogging azul y zapatillas deportivas.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
