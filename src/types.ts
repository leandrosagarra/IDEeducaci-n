export type UserRole = 'ADMINISTRADOR' | 'EDITOR' | 'REDACTOR';

export type PublicationStatus = 'PUBLICADO' | 'BORRADOR' | 'PROGRAMADO' | 'ARCHIVADO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  createdAt: string;
}

export interface SchoolBranch {
  id: string;
  name: string;
  level: string;
  diegep: string;
  address: string;
  crossStreets: string;
  postalCode: string;
  city: string;
  province: string;
  fullAddress: string;
  phone: string;
  phoneRaw: string;
  email: string;
  imageUrl: string;
  hours?: string;
  authorities?: string;
  description?: string;
  googleMapsUrl?: string;
}

export interface SiteSettings {
  instituteName: string;
  shortName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  faviconUrl?: string;
  mainAddress: string;
  jardinAddress: string;
  secundarioAddress?: string;
  phone: string;
  inicialPhone?: string;
  primarioPhone?: string;
  secundarioPhone?: string;
  whatsapp: string;
  emailGeneral: string;
  emailPrimario: string;
  emailJardin: string;
  emailSecundario?: string;
  openingHours: string;
  googleMapsEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  allowOnlineEnrollment: boolean;
  branches?: SchoolBranch[];
}

export interface EducationalOffer {
  id: string;
  title: string;
  level: 'Nivel Inicial' | 'Nivel Primario' | 'Nivel Secundario' | 'Talleres y Extracurricular';
  slug: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  curriculum: { yearOrGroup: string; subjects: string[] }[];
  requirements: string[];
  duration: string;
  modality: 'Presencial' | 'Semipresencial' | 'Doble Jornada' | 'Jornada Simple';
  schedules: string;
  documentationNeeded: string[];
  enrollmentInfo: string;
  downloadableFiles?: { name: string; url: string; size: string }[];
  imageUrl: string;
  status: PublicationStatus;
  featured: boolean;
  order: number;
  branchName?: string;
  diegep?: string;
  address?: string;
  phone?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Institucional' | 'Pedagógico' | 'Eventos' | 'Talleres' | 'Comunidad';
  imageUrl: string;
  galleryImages?: string[];
  publishedAt: string;
  author: string;
  status: PublicationStatus;
  featured: boolean;
  readTime: string;
  tags: string[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  altText?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: 'Actos' | 'Actividades' | 'Eventos' | 'Institución' | 'Estudiantes' | 'Egresados' | string;
  description: string;
  coverImage?: string;
  coverUrl?: string;
  images?: GalleryPhoto[];
  photos?: GalleryPhoto[];
  date: string;
  status: PublicationStatus;
}

export interface DownloadableDocument {
  id: string;
  title: string;
  category: 'Institucional' | 'Académico' | 'Inscripciones' | 'Reglamentos' | 'Formularios';
  fileType: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX';
  fileSize: string;
  fileUrl: string;
  description: string;
  uploadDate: string;
  isPublic: boolean;
  indexedInChatbot: boolean;
  contentSummary?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time?: string;
  category: 'Inicio de clases' | 'Inscripciones' | 'Exámenes' | 'Reuniones' | 'Actos' | 'Feriados' | 'Actividades';
  description: string;
  location: string;
  targetAudience: 'Toda la comunidad' | 'Nivel Inicial' | 'Nivel Primario' | 'Nivel Secundario' | 'Familias';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Inscripciones' | 'Carreras y Niveles' | 'Requisitos' | 'Horarios' | 'Documentación' | 'Contacto' | 'Administración';
  order: number;
  status: PublicationStatus;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  status: 'PENDIENTE' | 'RESPONDIDO' | 'ARCHIVADO';
}

export interface EnrollmentSubmission {
  id: string;
  studentFirstName: string;
  studentLastName: string;
  studentDni: string;
  birthDate: string;
  levelRequested: string;
  shiftPreference: 'Mañana' | 'Tarde' | 'Doble Jornada';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousSchool?: string;
  comments?: string;
  submittedAt: string;
  status: 'NUEVA' | 'EN_REVISION' | 'ENTREVISTA_AGENDADA' | 'CONFIRMADA' | 'RECHAZADA';
}

export interface ChatLog {
  id: string;
  timestamp: string;
  question: string;
  answer: string;
  hasAnswer: boolean;
  relatedCategory?: string;
}

export interface InstitutionalPage {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  sections?: { title: string; body: string; image?: string }[];
  seoTitle?: string;
  seoDescription?: string;
  lastUpdated: string;
}

export interface InstituteData {
  settings: SiteSettings;
  pages: Record<string, InstitutionalPage>;
  educationalOffers: EducationalOffer[];
  news: NewsArticle[];
  gallery: GalleryAlbum[];
  documents: DownloadableDocument[];
  events: CalendarEvent[];
  faq: FAQItem[];
  contacts: ContactSubmission[];
  enrollments: EnrollmentSubmission[];
  chatLogs: ChatLog[];
  users: User[];
  stats: {
    siteVisits: number;
    mostVisitedOffer: string;
  };
}
