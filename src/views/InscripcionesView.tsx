import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, CheckCircle2, AlertCircle, Send, GraduationCap } from 'lucide-react';

interface InscripcionesViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InscripcionesView: React.FC<InscripcionesViewProps> = ({ isOpen, onClose }) => {
  const { submitEnrollment } = useData();

  const [form, setForm] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentDni: '',
    birthDate: '',
    levelRequested: 'Nivel Primario (Doble Jornada con Talleres)',
    shiftPreference: 'Mañana',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    previousSchool: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentFirstName || !form.studentLastName || !form.parentName || !form.parentPhone) {
      setErrorMsg('Por favor completá los datos obligatorios marcados con asterisco (*).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await submitEnrollment(form);
      setSuccess(true);
      setForm({
        studentFirstName: '',
        studentLastName: '',
        studentDni: '',
        birthDate: '',
        levelRequested: 'Nivel Primario (Doble Jornada con Talleres)',
        shiftPreference: 'Mañana',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        previousSchool: '',
        comments: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo enviar la solicitud. Por favor intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-stone-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 flex items-start justify-between border-b border-blue-900/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider text-blue-200">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Ciclo Lectivo 2027 • 3 Sedes en La Plata</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Solicitud de Preinscripción Online
            </h2>
            <p className="text-xs sm:text-sm text-stone-200">
              Completá los datos del alumno y de la familia para postular a una vacante en cualquiera de nuestros 3 niveles.
            </p>
          </div>

          <button
            onClick={onClose}
            id="enrollment-modal-close-btn"
            className="p-2 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900">
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Hemos recibido la información de preinscripción. El equipo de secretaría y directivos de la sede correspondiente revisará la solicitud y se comunicará telefónicamente para coordinar la entrevista pedagógica familiar.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Sub-section 1: Datos del alumno */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                  1. Datos del Postulante / Alumno
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre del Alumno *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.studentFirstName}
                      onChange={(e) => setForm({ ...form, studentFirstName: e.target.value })}
                      placeholder="Ej: Joaquín"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Apellido del Alumno *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.studentLastName}
                      onChange={(e) => setForm({ ...form, studentLastName: e.target.value })}
                      placeholder="Ej: Rodríguez"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      DNI del Alumno
                    </label>
                    <input
                      type="text"
                      value={form.studentDni}
                      onChange={(e) => setForm({ ...form, studentDni: e.target.value })}
                      placeholder="Ej: 52.345.678"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={form.birthDate}
                      onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nivel y Sede Solicitada *
                    </label>
                    <select
                      value={form.levelRequested}
                      onChange={(e) => setForm({ ...form, levelRequested: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none cursor-pointer"
                    >
                      <option value="Nivel Inicial - Maternal y Jardín (Calle 68 nº 969 - DIEGEP 8084)">
                        Nivel Inicial (Calle 68 nº 969 - DIEGEP 8084)
                      </option>
                      <option value="Nivel Primario - Doble Jornada con Talleres (Calle 66 nº 818 - DIEGEP 3466)">
                        Nivel Primario (Calle 66 nº 818 - DIEGEP 3466)
                      </option>
                      <option value="Nivel Secundario - Cs. Sociales (Calle 68 nº 970 - DIEGEP 7811)">
                        Nivel Secundario - Cs. Sociales (Calle 68 nº 970 - DIEGEP 7811)
                      </option>
                      <option value="Nivel Secundario - Economía y Administración (Calle 68 nº 970 - DIEGEP 7811)">
                        Nivel Secundario - Economía (Calle 68 nº 970 - DIEGEP 7811)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Turno de Preferencia
                    </label>
                    <select
                      value={form.shiftPreference}
                      onChange={(e) => setForm({ ...form, shiftPreference: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none cursor-pointer"
                    >
                      <option value="Mañana (07:45 a 12:45 hs)">Mañana (07:45 a 12:45 hs)</option>
                      <option value="Tarde (13:00 a 17:30 hs)">Tarde (13:00 a 17:30 hs)</option>
                      <option value="Jornada Completa / Doble (07:45 a 16:30 hs)">Jornada Completa / Doble con Talleres (07:45 a 16:30 hs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Colegio o Jardín de Procedencia
                  </label>
                  <input
                    type="text"
                    value={form.previousSchool}
                    onChange={(e) => setForm({ ...form, previousSchool: e.target.value })}
                    placeholder="Nombre del establecimiento anterior (si aplica)"
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              {/* Sub-section 2: Datos del adulto responsable */}
              <div className="space-y-4 pt-2">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                  2. Datos del Adulto Responsable (Padre / Madre / Tutor)
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre y Apellido del Adulto *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder="Ej: Mariana López"
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teléfono de Contacto / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.parentPhone}
                      onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                      placeholder="Ej: 221 555-1234"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={form.parentEmail}
                      onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Comentarios, Hermanos en la Institución o Necesidades Específicas
                  </label>
                  <textarea
                    rows={2}
                    value={form.comments}
                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                    placeholder="Podés detallar si ya tenés hijos en el colegio, inquietudes pedagógicas, etc..."
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-amber-600 p-3 rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="enrollment-submit-btn"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Enviando solicitud...' : 'ENVIAR PREINSCRIPCIÓN'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
