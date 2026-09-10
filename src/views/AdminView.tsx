import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Calendar,
  HelpCircle,
  Bot,
  UserCheck,
  Mail,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { EducationalOffer, NewsArticle, GalleryAlbum, DownloadableDocument, CalendarEvent, FAQItem, User, ContactSubmission, EnrollmentSubmission, InstitutionalPage } from '../types';

interface AdminViewProps {
  onReturnToSite: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onReturnToSite }) => {
  const {
    data,
    currentUser,
    setCurrentUser,
    updateSettings,
    updatePage,
    createOffer,
    updateOffer,
    deleteOffer,
    createNews,
    updateNews,
    deleteNews,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    createDocument,
    updateDocument,
    deleteDocument,
    createEvent,
    updateEvent,
    deleteEvent,
    createFaq,
    updateFaq,
    deleteFaq,
    updateInquiryStatus,
    updateEnrollmentStatus,
    createUser,
    updateUser,
    deleteUser,
    resetToDefaults
  } = useData();

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'pages'
    | 'offers'
    | 'news'
    | 'gallery'
    | 'documents'
    | 'events'
    | 'faq'
    | 'chatbot'
    | 'enrollments'
    | 'contacts'
    | 'users'
    | 'settings'
  >('dashboard');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@instituto.edu.ar');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Editing modals/states
  const [editingOffer, setEditingOffer] = useState<Partial<EducationalOffer> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsArticle> | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<Partial<GalleryAlbum> | null>(null);
  const [editingDoc, setEditingDoc] = useState<Partial<DownloadableDocument> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState(data.settings);

  // Filter for enrollments
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  const showNotification = (msg: string) => {
    setSavedBanner(msg);
    setTimeout(() => setSavedBanner(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = data.users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (user && user.active) {
      setCurrentUser(user);
      setLoginError(null);
    } else {
      setLoginError('Credenciales incorrectas o usuario deshabilitado.');
    }
  };

  const handleQuickLogin = (role: 'ADMINISTRADOR' | 'EDITOR' | 'REDACTOR') => {
    const user = data.users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setLoginError(null);
    }
  };

  const handleExportEnrollmentsCSV = () => {
    const headers = [
      'ID',
      'Alumno Nombre',
      'Alumno Apellido',
      'DNI',
      'Nacimiento',
      'Nivel Solicitado',
      'Turno',
      'Adulto Responsable',
      'Teléfono',
      'Email',
      'Colegio Procedencia',
      'Estado',
      'Fecha Solicitud'
    ];
    const rows = data.enrollments.map(e => [
      e.id,
      `"${e.studentFirstName}"`,
      `"${e.studentLastName}"`,
      `"${e.studentDni}"`,
      `"${e.birthDate}"`,
      `"${e.levelRequested}"`,
      `"${e.shiftPreference}"`,
      `"${e.parentName}"`,
      `"${e.parentPhone}"`,
      `"${e.parentEmail}"`,
      `"${e.previousSchool}"`,
      `"${e.status}"`,
      `"${e.submittedAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inscripciones_instituto_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Archivo CSV de inscripciones descargado con éxito.');
  };

  // IF NOT LOGGED IN -> Show Authentication Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Panel Administrador
            </h1>
            <p className="text-xs text-slate-400">
              {data.settings.instituteName} • La Plata
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Quick Demo Login selector */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Acceso Rápido de Demostración:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickLogin('ADMINISTRADOR')}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-xs rounded-lg text-center cursor-pointer"
              >
                Admin
              </button>
              <button
                onClick={() => handleQuickLogin('EDITOR')}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-lg text-center cursor-pointer"
              >
                Editor
              </button>
              <button
                onClick={() => handleQuickLogin('REDACTOR')}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-lg text-center cursor-pointer"
              >
                Redactor
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onReturnToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Volver al sitio público
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered enrollments
  const filteredEnrollments = data.enrollments.filter(e => {
    if (enrollmentStatusFilter !== 'TODOS' && e.status !== enrollmentStatusFilter) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      e.studentFirstName.toLowerCase().includes(term) ||
      e.studentLastName.toLowerCase().includes(term) ||
      e.parentName.toLowerCase().includes(term) ||
      e.levelRequested.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            IE
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight leading-none">
              Panel de Control CMS
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {data.settings.instituteName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">{currentUser.name}</span>
            <span className="text-[10px] uppercase font-bold bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded">
              {currentUser.role}
            </span>
          </div>

          <button
            onClick={onReturnToSite}
            className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Sitio Web</span>
          </button>

          <button
            onClick={() => setCurrentUser(null)}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin layout with sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex-shrink-0 flex flex-col justify-between">
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Principal</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'pages' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Páginas Institucionales</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'offers' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Oferta Educativa ({data.educationalOffers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'news' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Novedades ({data.news.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'gallery' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galería Fotográfica ({data.gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'documents' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documentos y RAG ({data.documents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'events' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendario Escolar ({data.events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'faq' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes ({data.faq.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'chatbot' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Consultas Chatbot IA ({data.chatLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('enrollments')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'enrollments' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Inscripciones</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {data.enrollments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'contacts' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Contactos Recibidos</span>
              </div>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {data.contacts.length}
              </span>
            </button>

            {currentUser.role === 'ADMINISTRADOR' && (
              <>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    activeTab === 'users' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Usuarios y Roles ({data.users.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    activeTab === 'settings' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span>Configuración General</span>
                </button>
              </>
            )}
          </nav>

          {/* Reset database button */}
          <div className="pt-4 border-t border-slate-200 mt-4">
            <button
              onClick={async () => {
                if (confirm('¿Restablecer todos los datos iniciales del Instituto de Enseñanza?')) {
                  await resetToDefaults();
                  showNotification('Base de datos restaurada al estado original.');
                }
              }}
              className="w-full text-left px-3 py-2 text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Datos Iniciales</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {savedBanner && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-200">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                {savedBanner}
              </span>
              <button onClick={() => setSavedBanner(null)} className="cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Panel de Control Institucional
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Resumen general y métricas operativas del Instituto de Enseñanza (La Plata).
                </p>
              </div>

              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inscripciones</span>
                  <div className="text-3xl font-black text-emerald-600">{data.enrollments.length}</div>
                  <div className="text-[11px] text-slate-500">
                    {data.enrollments.filter(e => e.status === 'NUEVA').length} pendientes de revisión
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultas Chatbot</span>
                  <div className="text-3xl font-black text-indigo-600">{data.chatLogs.length}</div>
                  <div className="text-[11px] text-slate-500">
                    {data.chatLogs.filter(l => !l.hasAnswer).length} preguntas sin respuesta
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Noticias Publicadas</span>
                  <div className="text-3xl font-black text-blue-600">{data.news.length}</div>
                  <div className="text-[11px] text-slate-500">Artículos comunicacionales</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensajes Recibidos</span>
                  <div className="text-3xl font-black text-slate-800">{data.contacts.length}</div>
                  <div className="text-[11px] text-slate-500">Desde el formulario web</div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent enrollments */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-extrabold text-slate-900 text-sm">
                      Últimas Solicitudes de Inscripción
                    </h2>
                    <button
                      onClick={() => setActiveTab('enrollments')}
                      className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      Ver todas
                    </button>
                  </div>

                  <div className="space-y-2">
                    {data.enrollments.slice(0, 4).map(enr => (
                      <div
                        key={enr.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {enr.studentFirstName} {enr.studentLastName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {enr.levelRequested} • {enr.shiftPreference}
                          </div>
                        </div>
                        <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {enr.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chatbot missing answers */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Consultas del Asistente IA</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('chatbot')}
                      className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
                    >
                      Historial
                    </button>
                  </div>

                  <div className="space-y-2">
                    {data.chatLogs.slice(0, 4).map(log => (
                      <div
                        key={log.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
                      >
                        <div className="font-bold text-slate-900 line-clamp-1">
                          &quot;{log.question}&quot;
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>{log.hasAnswer ? 'Respondida con RAG' : 'Sin datos específicos'}</span>
                          <span className={log.hasAnswer ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                            {log.hasAnswer ? '✓ Respondida' : '⚠ Requiere atención'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PÁGINAS INSTITUCIONALES */}
          {activeTab === 'pages' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h1 className="text-xl font-black text-slate-900">
                Editor de Páginas Institucionales
              </h1>

              {(Object.entries(data.pages) as [string, InstitutionalPage][]).map(([slug, page]) => (
                <div key={slug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        Página: /{slug}
                      </span>
                      <h2 className="font-extrabold text-slate-900 text-base mt-1">{page.title}</h2>
                    </div>
                    <span className="text-xs text-slate-400">Actualizado: {page.lastUpdated}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Página</label>
                      <input
                        type="text"
                        defaultValue={page.title}
                        id={`page-title-${slug}`}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white p-2.5 rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtítulo / Bajada</label>
                      <input
                        type="text"
                        defaultValue={page.subtitle}
                        id={`page-subtitle-${slug}`}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white p-2.5 rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contenido Principal (Texto / Historia / Proyecto)</label>
                      <textarea
                        rows={6}
                        defaultValue={page.content}
                        id={`page-content-${slug}`}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white p-3 rounded-xl text-xs sm:text-sm outline-none leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        const title = (document.getElementById(`page-title-${slug}`) as HTMLInputElement)?.value;
                        const subtitle = (document.getElementById(`page-subtitle-${slug}`) as HTMLInputElement)?.value;
                        const content = (document.getElementById(`page-content-${slug}`) as HTMLTextAreaElement)?.value;
                        await updatePage(slug, { title, subtitle, content });
                        showNotification(`Página "${title}" actualizada correctamente.`);
                      }}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Guardar Cambios de la Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: OFERTA EDUCATIVA */}
          {activeTab === 'offers' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Gestión de Propuesta Educativa y Carreras
                  </h1>
                  <p className="text-xs text-slate-500">
                    Agregá, editá o eliminá niveles, planes de estudio y requisitos de admisión.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingOffer({
                      title: 'Nuevo Nivel / Carrera',
                      level: 'Nivel Secundario',
                      modality: 'Presencial',
                      duration: '3 años',
                      schedules: 'Turno Mañana: 07:45 a 13:10 hs',
                      shortDescription: 'Breve descripción...',
                      fullDescription: 'Descripción completa...',
                      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
                      requirements: ['DNI', 'Certificado de estudios'],
                      documentationNeeded: ['Partida de nacimiento', 'Ficha de salud'],
                      enrollmentInfo: 'Inscripción en secretaría.',
                      curriculum: []
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nueva Oferta</span>
                </button>
              </div>

              {/* Offer Editor Modal */}
              {editingOffer && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingOffer.id ? 'Editar Propuesta Pedagógica' : 'Nueva Propuesta Pedagógica'}
                    </h3>
                    <button
                      onClick={() => setEditingOffer(null)}
                      className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título</label>
                      <input
                        type="text"
                        value={editingOffer.title || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nivel Educativo</label>
                      <select
                        value={editingOffer.level || 'Nivel Primario'}
                        onChange={(e) => setEditingOffer({ ...editingOffer, level: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      >
                        <option value="Nivel Inicial">Nivel Inicial</option>
                        <option value="Nivel Primario">Nivel Primario</option>
                        <option value="Nivel Secundario">Nivel Secundario</option>
                        <option value="Talleres y Extracurricular">Talleres y Extracurricular</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad</label>
                      <input
                        type="text"
                        value={editingOffer.modality || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, modality: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Duración</label>
                      <input
                        type="text"
                        value={editingOffer.duration || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, duration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Horarios</label>
                      <input
                        type="text"
                        value={editingOffer.schedules || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, schedules: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Imagen</label>
                    <input
                      type="text"
                      value={editingOffer.imageUrl || ''}
                      onChange={(e) => setEditingOffer({ ...editingOffer, imageUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
                    <textarea
                      rows={2}
                      value={editingOffer.shortDescription || ''}
                      onChange={(e) => setEditingOffer({ ...editingOffer, shortDescription: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Completa</label>
                    <textarea
                      rows={4}
                      value={editingOffer.fullDescription || ''}
                      onChange={(e) => setEditingOffer({ ...editingOffer, fullDescription: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingOffer(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingOffer.id) {
                          await updateOffer(editingOffer.id, editingOffer);
                          showNotification('Oferta actualizada exitosamente.');
                        } else {
                          await createOffer(editingOffer);
                          showNotification('Nueva oferta creada exitosamente.');
                        }
                        setEditingOffer(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Oferta
                    </button>
                  </div>
                </div>
              )}

              {/* Offer items list */}
              <div className="space-y-3">
                {data.educationalOffers.map(offer => (
                  <div
                    key={offer.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {offer.level}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{offer.duration}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{offer.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{offer.shortDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar la oferta "${offer.title}"?`)) {
                            await deleteOffer(offer.id);
                            showNotification('Oferta eliminada.');
                          }
                        }}
                        className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-lg cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTICIAS */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Noticias y Comunicados Escolares
                  </h1>
                  <p className="text-xs text-slate-500">
                    Gestioná publicaciones para la comunidad educativa.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingNews({
                      title: 'Nuevo Comunicado Escolar',
                      publishedAt: new Date().toISOString().split('T')[0],
                      category: 'Institucional',
                      readTime: '3 min',
                      excerpt: 'Resumen o bajada de la noticia...',
                      content: 'Cuerpo de la noticia...',
                      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
                      tags: ['institucional', 'comunidad']
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar Noticia</span>
                </button>
              </div>

              {/* News editing modal */}
              {editingNews && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingNews.id ? 'Editar Noticia' : 'Crear Noticia'}
                    </h3>
                    <button onClick={() => setEditingNews(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Noticia</label>
                      <input
                        type="text"
                        value={editingNews.title || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                      <select
                        value={editingNews.category || 'Institucional'}
                        onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      >
                        <option value="Institucional">Institucional</option>
                        <option value="Eventos y Actos">Eventos y Actos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Imagen Portada</label>
                    <input
                      type="text"
                      value={editingNews.imageUrl || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Extracto / Bajada</label>
                    <textarea
                      rows={2}
                      value={editingNews.excerpt || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contenido Completo</label>
                    <textarea
                      rows={5}
                      value={editingNews.content || ''}
                      onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingNews(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingNews.id) {
                          await updateNews(editingNews.id, editingNews);
                          showNotification('Noticia actualizada.');
                        } else {
                          await createNews(editingNews);
                          showNotification('Nueva noticia publicada.');
                        }
                        setEditingNews(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Noticia
                    </button>
                  </div>
                </div>
              )}

              {/* News list */}
              <div className="space-y-3">
                {data.news.map(art => (
                  <div
                    key={art.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img src={art.imageUrl} alt={art.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{art.publishedAt}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{art.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingNews(art)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar la noticia "${art.title}"?`)) {
                            await deleteNews(art.id);
                            showNotification('Noticia eliminada.');
                          }
                        }}
                        className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALERÍA */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Galería Fotográfica Institucional
                  </h1>
                  <p className="text-xs text-slate-500">
                    Administrá álbumes de fotos clasificados por categoría.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingAlbum({
                      title: 'Nuevo Álbum Fotográfico',
                      category: 'Actividades',
                      date: new Date().toISOString().split('T')[0],
                      description: 'Descripción del álbum...',
                      coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800',
                      photos: []
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Álbum</span>
                </button>
              </div>

              {editingAlbum && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingAlbum.id ? 'Editar Álbum' : 'Crear Nuevo Álbum'}
                    </h3>
                    <button onClick={() => setEditingAlbum(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título del Álbum</label>
                      <input
                        type="text"
                        value={editingAlbum.title || ''}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                      <select
                        value={editingAlbum.category || 'Actividades'}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, category: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      >
                        <option value="Actos">Actos</option>
                        <option value="Actividades">Actividades</option>
                        <option value="Institución">Institución</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Inicial">Inicial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Portada</label>
                    <input
                      type="text"
                      value={editingAlbum.coverUrl || ''}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, coverUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={editingAlbum.description || ''}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingAlbum(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingAlbum.id) {
                          await updateAlbum(editingAlbum.id, editingAlbum);
                          showNotification('Álbum modificado.');
                        } else {
                          await createAlbum(editingAlbum);
                          showNotification('Álbum creado.');
                        }
                        setEditingAlbum(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Álbum
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.gallery.map(album => (
                  <div key={album.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <img src={album.coverUrl} alt={album.title} className="w-full h-36 rounded-xl object-cover" />
                    <div>
                      <div className="text-[10px] font-bold text-blue-700 uppercase">{album.category}</div>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{album.title}</h4>
                      <div className="text-xs text-slate-400 mt-1">{album.photos.length} fotografías</div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setEditingAlbum(album)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer text-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar álbum "${album.title}"?`)) {
                            await deleteAlbum(album.id);
                            showNotification('Álbum eliminado.');
                          }
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: DOCUMENTOS & INDEXACIÓN EN CHATBOT RAG */}
          {activeTab === 'documents' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Documentos Oficiales y Base de Conocimiento RAG
                  </h1>
                  <p className="text-xs text-slate-500">
                    Subí reglamentos, fichas médicas y programas. Activá la indexación para que el Asistente con IA aprenda su contenido automáticamente.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingDoc({
                      title: 'Nuevo Documento Oficial',
                      description: 'Descripción del documento...',
                      category: 'Secretaría',
                      fileUrl: '#',
                      fileType: 'PDF',
                      fileSize: '1.2 MB',
                      isPublic: true,
                      indexedInChatbot: true,
                      contentSummary: 'Resumen o pautas contenidas en este documento para que el chatbot las conozca.'
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Documento</span>
                </button>
              </div>

              {editingDoc && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingDoc.id ? 'Editar Documento' : 'Subir Documento'}
                    </h3>
                    <button onClick={() => setEditingDoc(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título del Documento</label>
                      <input
                        type="text"
                        value={editingDoc.title || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                      <input
                        type="text"
                        value={editingDoc.category || ''}
                        onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
                    <input
                      type="text"
                      value={editingDoc.description || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="indexed-in-chatbot-toggle"
                        checked={editingDoc.indexedInChatbot ?? true}
                        onChange={(e) => setEditingDoc({ ...editingDoc, indexedInChatbot: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                      <label htmlFor="indexed-in-chatbot-toggle" className="text-xs font-bold text-indigo-950 cursor-pointer">
                        Indexar en la Base de Conocimiento del Asistente con IA (RAG)
                      </label>
                    </div>
                    <p className="text-[11px] text-indigo-900/80 leading-relaxed">
                      Si está activado, el asistente virtual responderá preguntas utilizando el contenido resumido abajo.
                    </p>
                    <textarea
                      rows={3}
                      value={editingDoc.contentSummary || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, contentSummary: e.target.value })}
                      placeholder="Resumen del reglamento o documento para el asistente de IA..."
                      className="w-full bg-white border border-indigo-200 p-2.5 rounded-lg text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingDoc(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingDoc.id) {
                          await updateDocument(editingDoc.id, editingDoc);
                          showNotification('Documento guardado e indexado.');
                        } else {
                          await createDocument(editingDoc);
                          showNotification('Documento creado e indexado.');
                        }
                        setEditingDoc(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Documento
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {data.documents.map(doc => (
                  <div
                    key={doc.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{doc.fileType} • {doc.fileSize}</span>
                        {doc.indexedInChatbot && (
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Indexado en Chatbot IA</span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">{doc.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{doc.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingDoc(doc)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar documento "${doc.title}"?`)) {
                            await deleteDocument(doc.id);
                            showNotification('Documento eliminado.');
                          }
                        }}
                        className="p-2 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CALENDARIO */}
          {activeTab === 'events' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Calendario de Eventos y Fechas Clave
                  </h1>
                  <p className="text-xs text-slate-500">
                    Agenda escolar sincronizada con el sitio público y el chatbot.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingEvent({
                      title: 'Nuevo Evento Institucional',
                      date: new Date().toISOString().split('T')[0],
                      time: '08:00 hs',
                      category: 'Académico',
                      description: 'Detalle del evento...',
                      location: 'Sede Central - Av. 66 Nº 818'
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Evento</span>
                </button>
              </div>

              {editingEvent && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingEvent.id ? 'Editar Evento' : 'Nuevo Evento'}
                    </h3>
                    <button onClick={() => setEditingEvent(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Título del Evento</label>
                      <input
                        type="text"
                        value={editingEvent.title || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                      <input
                        type="text"
                        value={editingEvent.category || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Fecha (AAAA-MM-DD)</label>
                      <input
                        type="text"
                        value={editingEvent.date || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Horario</label>
                      <input
                        type="text"
                        value={editingEvent.time || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Lugar</label>
                      <input
                        type="text"
                        value={editingEvent.location || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={editingEvent.description || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingEvent(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingEvent.id) {
                          await updateEvent(editingEvent.id, editingEvent);
                          showNotification('Evento actualizado.');
                        } else {
                          await createEvent(editingEvent);
                          showNotification('Evento creado.');
                        }
                        setEditingEvent(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Evento
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {data.events.map(evt => (
                  <div
                    key={evt.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {evt.date}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{evt.category} • {evt.time}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">{evt.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{evt.description} ({evt.location})</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingEvent(evt)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar evento "${evt.title}"?`)) {
                            await deleteEvent(evt.id);
                            showNotification('Evento eliminado.');
                          }
                        }}
                        className="p-2 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PREGUNTAS FRECUENTES */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Preguntas Frecuentes (FAQ)
                  </h1>
                  <p className="text-xs text-slate-500">
                    Estas preguntas son utilizadas en la web pública y en el motor del Chatbot con IA.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingFaq({
                      question: '¿Cuál es la nueva pregunta frecuente?',
                      answer: 'Respuesta detallada institucional...',
                      category: 'Inscripciones',
                      order: data.faq.length + 1,
                      status: 'PUBLICADO'
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Pregunta</span>
                </button>
              </div>

              {editingFaq && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingFaq.id ? 'Editar Pregunta' : 'Crear Pregunta'}
                    </h3>
                    <button onClick={() => setEditingFaq(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pregunta</label>
                    <input
                      type="text"
                      value={editingFaq.question || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                    <input
                      type="text"
                      value={editingFaq.category || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Respuesta Oficial</label>
                    <textarea
                      rows={4}
                      value={editingFaq.answer || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingFaq(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingFaq.id) {
                          await updateFaq(editingFaq.id, editingFaq);
                          showNotification('Pregunta actualizada.');
                        } else {
                          await createFaq(editingFaq);
                          showNotification('Pregunta creada.');
                        }
                        setEditingFaq(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar FAQ
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {data.faq.map(item => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">{item.question}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.answer}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingFaq(item)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`¿Eliminar FAQ?`)) {
                            await deleteFaq(item.id);
                            showNotification('Pregunta eliminada.');
                          }
                        }}
                        className="p-2 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CHATBOT IA LOGS & KNOWLEDGE */}
          {activeTab === 'chatbot' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Bot className="w-6 h-6 text-indigo-600" />
                    <span>Registro del Asistente Virtual Institucional</span>
                  </h1>
                  <p className="text-xs text-slate-500">
                    Monitoreo en tiempo real de consultas realizadas por usuarios y detección de preguntas sin respuesta para enriquecer la base de datos.
                  </p>
                </div>
              </div>

              {/* Summary boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase">Total Interacciones</div>
                  <div className="text-2xl font-black text-indigo-600 mt-1">{data.chatLogs.length}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-emerald-600 uppercase">Respondidas con RAG</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    {data.chatLogs.filter(l => l.hasAnswer).length}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-rose-600 uppercase">Sin Información Publicada</div>
                  <div className="text-2xl font-black text-rose-600 mt-1">
                    {data.chatLogs.filter(l => !l.hasAnswer).length}
                  </div>
                </div>
              </div>

              {/* Chat logs list */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                  Historial de Consultas de Usuarios
                </div>
                <div className="divide-y divide-slate-100">
                  {data.chatLogs.map(log => (
                    <div key={log.id} className="p-4 space-y-2 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                          Pregunta: &quot;{log.question}&quot;
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 whitespace-pre-line">
                        <span className="font-semibold text-slate-800">Respuesta emitida: </span>
                        {log.answer}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            log.hasAnswer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {log.hasAnswer ? '✓ Información disponible' : '⚠ Derivado a canales de contacto'}
                        </span>
                        {log.relatedCategory && (
                          <span className="text-[10px] text-slate-400">Categoría: {log.relatedCategory}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: INSCRIPCIONES (PREINSCRIPCIONES) */}
          {activeTab === 'enrollments' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Solicitudes de Preinscripción Online ({filteredEnrollments.length})
                  </h1>
                  <p className="text-xs text-slate-500">
                    Postulantes para los ciclos lectivos de Inicial, Primario y Secundario.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportEnrollmentsCSV}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV / Excel</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {['TODOS', 'NUEVA', 'EN_REVISION', 'ACEPTADA', 'LISTA_ESPERA', 'RECHAZADA'].map(st => (
                    <button
                      key={st}
                      onClick={() => setEnrollmentStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                        enrollmentStatusFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar alumno, familia, nivel..."
                    className="w-full bg-slate-100 pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
                  />
                </div>
              </div>

              {/* Enrollments table */}
              <div className="space-y-4">
                {filteredEnrollments.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200 text-xs">
                    No hay solicitudes con el filtro actual.
                  </div>
                ) : (
                  filteredEnrollments.map(enr => (
                    <div
                      key={enr.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            ID: {enr.id} • {new Date(enr.submittedAt).toLocaleDateString()}
                          </span>
                          <h3 className="font-black text-slate-900 text-base mt-0.5">
                            {enr.studentFirstName} {enr.studentLastName}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold text-slate-600">Estado:</label>
                          <select
                            value={enr.status}
                            onChange={async (e) => {
                              await updateEnrollmentStatus(enr.id, e.target.value as any);
                              showNotification(`Estado de ${enr.studentFirstName} actualizado a ${e.target.value}.`);
                            }}
                            className="bg-slate-100 border border-slate-300 font-bold text-xs p-1.5 rounded-lg cursor-pointer"
                          >
                            <option value="NUEVA">NUEVA</option>
                            <option value="EN_REVISION">EN REVISIÓN</option>
                            <option value="ACEPTADA">ACEPTADA</option>
                            <option value="LISTA_ESPERA">LISTA DE ESPERA</option>
                            <option value="RECHAZADA">RECHAZADA</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                        <div>
                          <span className="font-bold text-slate-800">Nivel y Turno:</span>
                          <div>{enr.levelRequested}</div>
                          <div className="text-slate-500">Preferencia: {enr.shiftPreference}</div>
                        </div>
                        <div>
                          <span className="font-bold text-slate-800">Adulto Responsable:</span>
                          <div>{enr.parentName}</div>
                          <div className="text-blue-700 font-semibold">{enr.parentPhone} • {enr.parentEmail}</div>
                        </div>
                        <div>
                          <span className="font-bold text-slate-800">Procedencia / DNI:</span>
                          <div>DNI: {enr.studentDni || 'No informado'}</div>
                          <div className="text-slate-500">{enr.previousSchool || 'Sin colegio previo'}</div>
                        </div>
                      </div>

                      {enr.comments && (
                        <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                          <span className="font-bold text-slate-800">Observaciones familiares: </span>
                          {enr.comments}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 11: CONTACTOS RECIBIDOS */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h1 className="text-xl font-black text-slate-900">
                Mensajes de Contacto ({data.contacts.length})
              </h1>

              <div className="space-y-4">
                {data.contacts.map(c => (
                  <div
                    key={c.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {c.subject}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                          {c.firstName} {c.lastName}
                        </h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {c.email} • {c.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={c.status}
                          onChange={async (e) => {
                            await updateInquiryStatus(c.id, e.target.value as any);
                            showNotification('Estado del contacto actualizado.');
                          }}
                          className="bg-slate-100 border border-slate-300 font-bold text-xs p-1.5 rounded-lg cursor-pointer"
                        >
                          <option value="PENDIENTE">PENDIENTE</option>
                          <option value="EN_CURSO">EN CURSO</option>
                          <option value="RESPONDIDO">RESPONDIDO</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 leading-relaxed whitespace-pre-line">
                      {c.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: USUARIOS Y ROLES */}
          {activeTab === 'users' && currentUser.role === 'ADMINISTRADOR' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">
                    Gestión de Usuarios y Roles de Seguridad
                  </h1>
                  <p className="text-xs text-slate-500">
                    Roles disponibles: Administrador (acceso total), Editor (gestiona contenidos), Redactor (borradores).
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingUser({
                      name: 'Nuevo Usuario',
                      email: 'usuario@instituto.edu.ar',
                      role: 'EDITOR',
                      active: true
                    })
                  }
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Usuario</span>
                </button>
              </div>

              {editingUser && (
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-500 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {editingUser.id ? 'Editar Usuario' : 'Crear Usuario'}
                    </h3>
                    <button onClick={() => setEditingUser(null)} className="cursor-pointer">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        value={editingUser.name || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        value={editingUser.email || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rol</label>
                    <select
                      value={editingUser.role || 'EDITOR'}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    >
                      <option value="ADMINISTRADOR">ADMINISTRADOR (Acceso total)</option>
                      <option value="EDITOR">EDITOR (Contenidos, noticias, inscripciones)</option>
                      <option value="REDACTOR">REDACTOR (Noticias y publicaciones)</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setEditingUser(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (editingUser.id) {
                          await updateUser(editingUser.id, editingUser);
                          showNotification('Usuario actualizado.');
                        } else {
                          await createUser(editingUser);
                          showNotification('Usuario creado.');
                        }
                        setEditingUser(null);
                      }}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Guardar Usuario
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {data.users.map(u => (
                  <div
                    key={u.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{u.name}</span>
                        <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {u.role}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{u.email}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingUser(u)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {u.id !== currentUser.id && (
                        <button
                          onClick={async () => {
                            if (confirm(`¿Eliminar usuario "${u.name}"?`)) {
                              await deleteUser(u.id);
                              showNotification('Usuario eliminado.');
                            }
                          }}
                          className="p-2 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: CONFIGURACIÓN GENERAL */}
          {activeTab === 'settings' && currentUser.role === 'ADMINISTRADOR' && (
            <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">
                  Configuración General del Instituto
                </h1>
                <p className="text-xs text-slate-500">
                  Actualizá teléfonos, sedes, correos por nivel y parámetros globales.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Oficial</label>
                    <input
                      type="text"
                      value={settingsForm.instituteName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instituteName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lema / Frase</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Sede Central</label>
                    <input
                      type="text"
                      value={settingsForm.mainAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, mainAddress: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Sede Nivel Inicial</label>
                    <input
                      type="text"
                      value={settingsForm.jardinAddress}
                      onChange={(e) => setSettingsForm({ ...settingsForm, jardinAddress: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Principal</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Institucional</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Horario de Atención</label>
                    <input
                      type="text"
                      value={settingsForm.openingHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email General / Secundaria</label>
                    <input
                      type="email"
                      value={settingsForm.emailGeneral}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailGeneral: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Nivel Primario</label>
                    <input
                      type="email"
                      value={settingsForm.emailPrimario}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailPrimario: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Nivel Inicial</label>
                    <input
                      type="email"
                      value={settingsForm.emailJardin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailJardin: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={async () => {
                      await updateSettings(settingsForm);
                      showNotification('Configuración institucional guardada.');
                    }}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Guardar Configuración
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
