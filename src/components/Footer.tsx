import React from 'react';
import { useData } from '../context/DataContext';
import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnrollment }) => {
  const { data } = useData();
  const { settings } = data;

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Column 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-stone-800 p-1 flex items-center justify-center border border-stone-700/80 shadow-md">
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
                <h3 className="font-extrabold text-white text-lg tracking-tight leading-snug">
                  {settings.instituteName}
                </h3>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  La Plata • Buenos Aires
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {settings.tagline}. Escuela Laica, Mixta y de Doble Jornada con más de 25 años de trayectoria en La Plata.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnrollment}
                id="footer-inscribite-btn"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-600 px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
              >
                <span>Inscripciones 2027</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Sedes Oficiales */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400">
              Nuestras 3 Sedes
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              {/* Nivel Inicial */}
              <div className="p-2.5 rounded-lg bg-stone-800/60 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Nivel Inicial</span>
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                    DIEGEP 8084
                  </span>
                </div>
                <div className="text-xs text-stone-400">Calle 68 nº 969 e/ 14 y 15 • (1900) La Plata</div>
                <div className="text-xs text-stone-300 font-medium">Tel: <a href="tel:4534536" className="hover:text-white underline decoration-stone-600">453.4536</a></div>
              </div>

              {/* Nivel Primario */}
              <div className="p-2.5 rounded-lg bg-stone-800/60 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Nivel Primario</span>
                  <span className="text-[10px] font-semibold text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/60">
                    DIEGEP 3466
                  </span>
                </div>
                <div className="text-xs text-stone-400">Calle 66 nº 818 e/ 11 y 12 • (1900) La Plata</div>
                <div className="text-xs text-stone-300 font-medium">Tel: <a href="tel:4535780" className="hover:text-white underline decoration-stone-600">453.5780</a></div>
              </div>

              {/* Nivel Secundario */}
              <div className="p-2.5 rounded-lg bg-stone-800/60 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Nivel Secundario</span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                    DIEGEP 7811
                  </span>
                </div>
                <div className="text-xs text-stone-400">Calle 68 nº 970 e/ 14 y 15 • (1900) La Plata</div>
                <div className="text-xs text-stone-300 font-medium">Tel: <a href="tel:4515205" className="hover:text-white underline decoration-stone-600">451.5205</a></div>
              </div>
            </div>
          </div>

          {/* Column 3: Propuesta Educativa */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400">
              Propuesta Educativa
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Nivel Inicial (Salas de 2 a 5 años)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Nivel Primario (Doble Jornada con Talleres)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Secundario en Cs. Sociales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('propuesta')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Secundario en Economía y Adm.
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Accesos Rápidos & Institucional */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400">
              Comunidad y Enlaces
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={() => onNavigate('institucional')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Historia y Proyecto Educativo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('estudiantes')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Espacio Estudiantes y Familias
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('noticias')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Noticias y Novedades
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeria')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Galería Fotográfica Institucional
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contacto')} className="hover:text-white transition-colors cursor-pointer text-xs sm:text-sm">
                  Ubicación de las 3 Sedes y Mapa
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & admin portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>{settings.footerText}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('admin')}
              id="footer-admin-btn"
              className="hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Panel Administrador</span>
            </button>
            <span>•</span>
            <span>La Plata, Provincia de Buenos Aires</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
