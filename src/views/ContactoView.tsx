import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactoView: React.FC = () => {
  const { data, submitInquiry } = useData();
  const { settings } = data;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Nivel Primario',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setErrorMsg('Por favor completá los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await submitInquiry(form);
      setSubmittedSuccess(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Nivel Primario',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un inconveniente al enviar la consulta. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent('Hola Instituto de Enseñanza, me comunico con una consulta.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-stone-950 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ide.jpg"
            alt="Fachada del Instituto de Enseñanza La Plata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/80 to-blue-950/75" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-950/80 border border-blue-400/50 px-3 py-1 rounded-full">
            Canales Oficiales • Tres Sedes en La Plata
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Contacto y Nuestras Sedes
          </h1>
          <p className="text-base sm:text-xl text-stone-200 leading-relaxed font-normal">
            Ponemos a tu disposición la información de contacto directo de cada uno de los tres niveles y sedes del Instituto en La Plata.
          </p>
        </div>
      </section>

      {/* Main Section: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The 3 Sedes Cards Grid */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sedes Oficiales del Instituto
            </h2>
            <p className="text-sm text-stone-600">
              Cada nivel educativo funciona en instalaciones propias especialmente adaptadas a las necesidades de cada edad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nivel Inicial */}
            <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 overflow-hidden relative bg-stone-100">
                <img
                  src="/images/jardin-696x504.jpg"
                  alt="Sede Nivel Inicial Calle 68 nº 969"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                  DIEGEP 8084
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Nivel Inicial
                  </h3>
                  <div className="text-xs text-[#92400E] font-semibold bg-[#FEF3C7]/90 border border-[#FDE68A] px-2.5 py-1 rounded-md inline-block">
                    Jardín Maternal y de Infantes (2 a 5 años)
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <span>Calle 68 nº 969 entre 14 y 15, (1900) La Plata. Bs.As.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <a href="tel:4534536" className="font-bold text-slate-800 hover:text-blue-700">Tel: 453.4536</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span className="truncate">{settings.emailJardin}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E8E0D1] text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Directora:</span> Natalia García
                </div>
              </div>
            </div>

            {/* Nivel Primario */}
            <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 overflow-hidden relative bg-stone-100">
                <img
                  src="/images/primario-626x626.jpg"
                  alt="Alumnos de Nivel Primario Calle 66 nº 818"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
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
                      <span>Calle 66 nº 818 entre 11 y 12, (1900) La Plata. Bs.As.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-700 flex-shrink-0" />
                      <a href="tel:4535780" className="font-bold text-slate-800 hover:text-blue-700">Tel: 453.5780</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-700 flex-shrink-0" />
                      <span className="truncate">{settings.emailPrimario}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E8E0D1] text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Directora:</span> Cabo Vanesa • <span className="font-semibold text-stone-700">Secr.:</span> Ana Lucía De Bairros
                </div>
              </div>
            </div>

            {/* Nivel Secundario */}
            <div className="bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 overflow-hidden relative bg-stone-100">
                <img
                  src="/images/secundario-622x544.jpg"
                  alt="Sede Nivel Secundario Calle 68 nº 970"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                  DIEGEP 7811
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900">
                    Nivel Secundario
                  </h3>
                  <div className="text-xs text-[#065F46] font-semibold bg-[#ECFDF5]/90 border border-[#A7F3D0] px-2.5 py-1 rounded-md inline-block">
                    Cs. Sociales y Economía y Administración
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>Calle 68 nº 970 entre 14 y 15, (1900) La Plata. Bs.As.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <a href="tel:4515205" className="font-bold text-slate-800 hover:text-blue-700">Tel: 451.5205</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span className="truncate">{settings.emailGeneral}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E8E0D1] text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Directora:</span> Roxana Petruccelli • <span className="font-semibold text-stone-700">Secr.:</span> Sansone Rocío
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Sedes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Horarios y Canales Digitales
              </h2>

              <div className="space-y-5 text-sm text-stone-700">
                {/* Horarios */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Horario General de Atención</div>
                    <div className="text-xs text-stone-500 mt-0.5">{settings.openingHours}</div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp de Secretaría</div>
                    <div className="text-xs text-stone-500 mt-0.5">{settings.whatsapp}</div>
                    <button
                      onClick={handleWhatsApp}
                      className="mt-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Abrir chat de WhatsApp</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Correos por nivel */}
                <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">Correos Oficiales</div>
                    <div className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-800">General y Secundaria:</span> {settings.emailGeneral}
                    </div>
                    <div className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-800">Nivel Primario:</span> {settings.emailPrimario}
                    </div>
                    <div className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-800">Nivel Inicial:</span> {settings.emailJardin}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Envianos tu Consulta
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Completá este formulario y la secretaría se contactará a la brevedad.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-extrabold text-emerald-950 text-lg">
                    ¡Mensaje Recibido con Éxito!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900/80 max-w-md mx-auto leading-relaxed">
                    Tu consulta quedó registrada en la secretaría del Instituto. Nos pondremos en contacto contigo por teléfono o correo a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs tracking-wide cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-first-name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Ej: Martín"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-last-name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder="Ej: Gómez"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        id="contact-email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tunombre@ejemplo.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Ej: 221 453-5780"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nivel o Motivo de Consulta
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all cursor-pointer"
                    >
                      <option value="Nivel Inicial (Jardín Maternal y de Infantes)">Nivel Inicial (Jardín Maternal y de Infantes)</option>
                      <option value="Nivel Primario (Doble Jornada)">Nivel Primario (Doble Jornada)</option>
                      <option value="Nivel Secundario - Cs. Sociales">Nivel Secundario - Cs. Sociales</option>
                      <option value="Nivel Secundario - Economía y Administración">Nivel Secundario - Economía y Administración</option>
                      <option value="Talleres y Extracurriculares">Talleres y Extracurriculares</option>
                      <option value="Administración / Secretaría">Administración / Secretaría</option>
                      <option value="Otro motivo">Otro motivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mensaje / Consulta *
                    </label>
                    <textarea
                      required
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Escribí aquí tus dudas, nivel al que aspira ingresar o cualquier inquietud..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white p-3.5 rounded-xl text-sm outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-sky-900 hover:bg-sky-800 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando consulta...' : 'ENVIAR CONSULTA'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-800" />
              <span>Plano de Ubicación y Sedes en La Plata</span>
            </h3>
            <span className="text-xs text-stone-500 font-medium">Sedes en Calle 66 y Calle 68 • La Plata</span>
          </div>

          <div className="h-80 w-full rounded-2xl overflow-hidden border border-stone-200">
            <iframe
              title="Mapa de ubicación Instituto de Enseñanza La Plata"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.8653245464194!2d-57.94723042345591!3d-34.92873427448834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e633d45c814b%3A0x8e8749bc7ea920b7!2sAv.%2066%20818%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
