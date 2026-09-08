import React, { createContext, useContext, useState, useEffect } from 'react';
import { InstituteData, EducationalOffer, NewsArticle, GalleryAlbum, DownloadableDocument, CalendarEvent, FAQItem, ContactSubmission, EnrollmentSubmission, User, SiteSettings, InstitutionalPage } from '../types';
import { initialData } from '../data/initialData';

interface DataContextType {
  data: InstituteData;
  loading: boolean;
  error: string | null;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  refreshData: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  updatePage: (slug: string, pageData: Partial<InstitutionalPage>) => Promise<boolean>;
  createOffer: (offer: Partial<EducationalOffer>) => Promise<boolean>;
  updateOffer: (id: string, offer: Partial<EducationalOffer>) => Promise<boolean>;
  deleteOffer: (id: string) => Promise<boolean>;
  createNews: (article: Partial<NewsArticle>) => Promise<boolean>;
  updateNews: (id: string, article: Partial<NewsArticle>) => Promise<boolean>;
  deleteNews: (id: string) => Promise<boolean>;
  createAlbum: (album: Partial<GalleryAlbum>) => Promise<boolean>;
  updateAlbum: (id: string, album: Partial<GalleryAlbum>) => Promise<boolean>;
  deleteAlbum: (id: string) => Promise<boolean>;
  createDocument: (doc: Partial<DownloadableDocument>) => Promise<boolean>;
  updateDocument: (id: string, doc: Partial<DownloadableDocument>) => Promise<boolean>;
  deleteDocument: (id: string) => Promise<boolean>;
  createEvent: (evt: Partial<CalendarEvent>) => Promise<boolean>;
  updateEvent: (id: string, evt: Partial<CalendarEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  createFaq: (faq: Partial<FAQItem>) => Promise<boolean>;
  updateFaq: (id: string, faq: Partial<FAQItem>) => Promise<boolean>;
  deleteFaq: (id: string) => Promise<boolean>;
  submitInquiry: (inquiry: Partial<ContactSubmission>) => Promise<{ success: boolean; message?: string }>;
  updateInquiryStatus: (id: string, status: ContactSubmission['status']) => Promise<boolean>;
  submitEnrollment: (enrollment: Partial<EnrollmentSubmission>) => Promise<{ success: boolean; message?: string }>;
  updateEnrollmentStatus: (id: string, status: EnrollmentSubmission['status']) => Promise<boolean>;
  createUser: (user: Partial<User>) => Promise<boolean>;
  updateUser: (id: string, user: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<InstituteData>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchFullData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setError(null);
      } else {
        console.warn('Could not fetch from /api/data, using local state');
      }
    } catch (err) {
      console.warn('Network error fetching data, using initial data fallback', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullData();
  }, []);

  const refreshData = async () => {
    await fetchFullData();
  };

  const resetToDefaults = async () => {
    try {
      const res = await fetch('/api/data/reset', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      } else {
        setData(JSON.parse(JSON.stringify(initialData)));
      }
    } catch {
      setData(JSON.parse(JSON.stringify(initialData)));
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const resJson = await res.json();
        setData(prev => ({ ...prev, settings: resJson.settings }));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
    return true;
  };

  const updatePage = async (slug: string, pageData: Partial<InstitutionalPage>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (res.ok) {
        const resJson = await res.json();
        setData(prev => ({
          ...prev,
          pages: { ...prev.pages, [slug]: resJson.page },
        }));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [slug]: { ...prev.pages[slug], ...pageData, slug, lastUpdated: new Date().toISOString().split('T')[0] },
      },
    }));
    return true;
  };

  const createOffer = async (offer: Partial<EducationalOffer>): Promise<boolean> => {
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newOffer = {
      id: `offer-${Date.now()}`,
      order: data.educationalOffers.length + 1,
      status: 'PUBLICADO',
      ...offer,
    } as EducationalOffer;
    setData(prev => ({ ...prev, educationalOffers: [...prev.educationalOffers, newOffer] }));
    return true;
  };

  const updateOffer = async (id: string, offer: Partial<EducationalOffer>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      educationalOffers: prev.educationalOffers.map(o => (o.id === id ? { ...o, ...offer } : o)),
    }));
    return true;
  };

  const deleteOffer = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, educationalOffers: prev.educationalOffers.filter(o => o.id !== id) }));
    return true;
  };

  const createNews = async (article: Partial<NewsArticle>): Promise<boolean> => {
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newArt = {
      id: `noticia-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'PUBLICADO',
      readTime: '3 min',
      ...article,
    } as NewsArticle;
    setData(prev => ({ ...prev, news: [newArt, ...prev.news] }));
    return true;
  };

  const updateNews = async (id: string, article: Partial<NewsArticle>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      news: prev.news.map(n => (n.id === id ? { ...n, ...article } : n)),
    }));
    return true;
  };

  const deleteNews = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, news: prev.news.filter(n => n.id !== id) }));
    return true;
  };

  const createAlbum = async (album: Partial<GalleryAlbum>): Promise<boolean> => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newAlb = {
      id: `album-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PUBLICADO',
      ...album,
    } as GalleryAlbum;
    setData(prev => ({ ...prev, gallery: [newAlb, ...prev.gallery] }));
    return true;
  };

  const updateAlbum = async (id: string, album: Partial<GalleryAlbum>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => (g.id === id ? { ...g, ...album } : g)),
    }));
    return true;
  };

  const deleteAlbum = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
    return true;
  };

  const createDocument = async (doc: Partial<DownloadableDocument>): Promise<boolean> => {
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newDoc = {
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      isPublic: true,
      indexedInChatbot: true,
      ...doc,
    } as DownloadableDocument;
    setData(prev => ({ ...prev, documents: [newDoc, ...prev.documents] }));
    return true;
  };

  const updateDocument = async (id: string, doc: Partial<DownloadableDocument>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      documents: prev.documents.map(d => (d.id === id ? { ...d, ...doc } : d)),
    }));
    return true;
  };

  const deleteDocument = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, documents: prev.documents.filter(d => d.id !== id) }));
    return true;
  };

  const createEvent = async (evt: Partial<CalendarEvent>): Promise<boolean> => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evt),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newEvt = {
      id: `evt-${Date.now()}`,
      ...evt,
    } as CalendarEvent;
    setData(prev => ({ ...prev, events: [...prev.events, newEvt] }));
    return true;
  };

  const updateEvent = async (id: string, evt: Partial<CalendarEvent>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evt),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => (e.id === id ? { ...e, ...evt } : e)),
    }));
    return true;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, events: prev.events.filter(e => e.id !== id) }));
    return true;
  };

  const createFaq = async (faqItem: Partial<FAQItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqItem),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newF = {
      id: `faq-${Date.now()}`,
      order: data.faq.length + 1,
      status: 'PUBLICADO',
      ...faqItem,
    } as FAQItem;
    setData(prev => ({ ...prev, faq: [...prev.faq, newF] }));
    return true;
  };

  const updateFaq = async (id: string, faqItem: Partial<FAQItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqItem),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      faq: prev.faq.map(f => (f.id === id ? { ...f, ...faqItem } : f)),
    }));
    return true;
  };

  const deleteFaq = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/faq/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, faq: prev.faq.filter(f => f.id !== id) }));
    return true;
  };

  const submitInquiry = async (inquiry: Partial<ContactSubmission>) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (res.ok) {
        const json = await res.json();
        setData(prev => ({ ...prev, contacts: [json.inquiry, ...prev.contacts] }));
        return { success: true };
      }
    } catch (err) {
      console.error(err);
    }
    const newInq: ContactSubmission = {
      id: `con-${Date.now()}`,
      firstName: inquiry.firstName || '',
      lastName: inquiry.lastName || '',
      email: inquiry.email || '',
      phone: inquiry.phone || '',
      subject: inquiry.subject || 'Consulta general',
      message: inquiry.message || '',
      createdAt: new Date().toISOString(),
      read: false,
      status: 'PENDIENTE',
    };
    setData(prev => ({ ...prev, contacts: [newInq, ...prev.contacts] }));
    return { success: true };
  };

  const updateInquiryStatus = async (id: string, status: ContactSubmission['status']): Promise<boolean> => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, read: true }),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.map(c => (c.id === id ? { ...c, status, read: true } : c)),
    }));
    return true;
  };

  const submitEnrollment = async (enrollment: Partial<EnrollmentSubmission>) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollment),
      });
      if (res.ok) {
        const json = await res.json();
        setData(prev => ({ ...prev, enrollments: [json.enrollment, ...prev.enrollments] }));
        return { success: true };
      }
    } catch (err) {
      console.error(err);
    }
    const newEnr: EnrollmentSubmission = {
      id: `enr-${Date.now()}`,
      studentFirstName: enrollment.studentFirstName || '',
      studentLastName: enrollment.studentLastName || '',
      studentDni: enrollment.studentDni || '',
      birthDate: enrollment.birthDate || '',
      levelRequested: enrollment.levelRequested || 'Nivel Primario',
      shiftPreference: enrollment.shiftPreference || 'Mañana',
      parentName: enrollment.parentName || '',
      parentPhone: enrollment.parentPhone || '',
      parentEmail: enrollment.parentEmail || '',
      previousSchool: enrollment.previousSchool || '',
      comments: enrollment.comments || '',
      submittedAt: new Date().toISOString(),
      status: 'NUEVA',
    };
    setData(prev => ({ ...prev, enrollments: [newEnr, ...prev.enrollments] }));
    return { success: true };
  };

  const updateEnrollmentStatus = async (id: string, status: EnrollmentSubmission['status']): Promise<boolean> => {
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      enrollments: prev.enrollments.map(e => (e.id === id ? { ...e, status } : e)),
    }));
    return true;
  };

  const createUser = async (user: Partial<User>): Promise<boolean> => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    const newU = {
      id: `usr-${Date.now()}`,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
      ...user,
    } as User;
    setData(prev => ({ ...prev, users: [...prev.users, newU] }));
    return true;
  };

  const updateUser = async (id: string, user: Partial<User>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({
      ...prev,
      users: prev.users.map(u => (u.id === id ? { ...u, ...user } : u)),
    }));
    return true;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setData(prev => ({ ...prev, users: prev.users.filter(u => u.id !== id) }));
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        currentUser,
        setCurrentUser,
        refreshData,
        resetToDefaults,
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
        submitInquiry,
        updateInquiryStatus,
        submitEnrollment,
        updateEnrollmentStatus,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
