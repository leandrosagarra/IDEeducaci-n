import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initialData } from "./src/data/initialData";
import { InstituteData, ChatLog, ContactSubmission, EnrollmentSubmission } from "./src/types";

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "data-store.json");

// Helper to load or initialize data
function loadDatabase(): InstituteData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed: InstituteData = JSON.parse(raw);
      // Ensure branches and real assets are present
      if (!parsed.settings.branches || parsed.settings.branches.length < 3) {
        parsed.settings = initialData.settings;
        parsed.educationalOffers = initialData.educationalOffers;
        parsed.gallery = initialData.gallery;
        parsed.news = initialData.news;
        saveDatabase(parsed);
      }
      return parsed;
    }
  } catch (err) {
    console.error("Error reading database file, using default data", err);
  }
  saveDatabase(initialData);
  return JSON.parse(JSON.stringify(initialData));
}

function saveDatabase(data: InstituteData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database file", err);
  }
}

let db: InstituteData = loadDatabase();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "15mb" }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", institute: db.settings.instituteName });
  });

  // Get all data
  app.get("/api/data", (req, res) => {
    // increment visits slightly to simulate traffic
    db.stats.siteVisits += 1;
    saveDatabase(db);
    res.json(db);
  });

  // Reset database to initial state
  app.post("/api/data/reset", (req, res) => {
    db = JSON.parse(JSON.stringify(initialData));
    saveDatabase(db);
    res.json({ success: true, data: db });
  });

  // Update Settings
  app.post("/api/settings", (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    saveDatabase(db);
    res.json({ success: true, settings: db.settings });
  });

  // Update Institutional Page
  app.post("/api/pages/:slug", (req, res) => {
    const { slug } = req.params;
    db.pages[slug] = {
      ...db.pages[slug],
      ...req.body,
      slug,
      lastUpdated: new Date().toISOString().split("T")[0]
    };
    saveDatabase(db);
    res.json({ success: true, page: db.pages[slug] });
  });

  // Educational Offers CRUD
  app.post("/api/offers", (req, res) => {
    const newOffer = {
      id: `offer-${Date.now()}`,
      order: (db.educationalOffers.length || 0) + 1,
      status: "PUBLICADO",
      ...req.body
    };
    db.educationalOffers.push(newOffer);
    saveDatabase(db);
    res.json({ success: true, offer: newOffer });
  });

  app.put("/api/offers/:id", (req, res) => {
    const { id } = req.params;
    const index = db.educationalOffers.findIndex(o => o.id === id);
    if (index !== -1) {
      db.educationalOffers[index] = { ...db.educationalOffers[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, offer: db.educationalOffers[index] });
    } else {
      res.status(404).json({ error: "Offer not found" });
    }
  });

  app.delete("/api/offers/:id", (req, res) => {
    const { id } = req.params;
    db.educationalOffers = db.educationalOffers.filter(o => o.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // News CRUD
  app.post("/api/news", (req, res) => {
    const newArticle = {
      id: `noticia-${Date.now()}`,
      publishedAt: new Date().toISOString().split("T")[0],
      status: "PUBLICADO",
      readTime: "3 min",
      ...req.body
    };
    db.news.unshift(newArticle);
    saveDatabase(db);
    res.json({ success: true, article: newArticle });
  });

  app.put("/api/news/:id", (req, res) => {
    const { id } = req.params;
    const index = db.news.findIndex(n => n.id === id);
    if (index !== -1) {
      db.news[index] = { ...db.news[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, article: db.news[index] });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  });

  app.delete("/api/news/:id", (req, res) => {
    const { id } = req.params;
    db.news = db.news.filter(n => n.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // Gallery CRUD
  app.post("/api/gallery", (req, res) => {
    const newAlbum = {
      id: `album-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "PUBLICADO",
      ...req.body
    };
    db.gallery.unshift(newAlbum);
    saveDatabase(db);
    res.json({ success: true, album: newAlbum });
  });

  app.put("/api/gallery/:id", (req, res) => {
    const { id } = req.params;
    const index = db.gallery.findIndex(g => g.id === id);
    if (index !== -1) {
      db.gallery[index] = { ...db.gallery[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, album: db.gallery[index] });
    } else {
      res.status(404).json({ error: "Album not found" });
    }
  });

  app.delete("/api/gallery/:id", (req, res) => {
    const { id } = req.params;
    db.gallery = db.gallery.filter(g => g.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // Documents CRUD (indexed in chatbot knowledge!)
  app.post("/api/documents", (req, res) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
      isPublic: true,
      indexedInChatbot: true,
      ...req.body
    };
    db.documents.unshift(newDoc);
    saveDatabase(db);
    res.json({ success: true, document: newDoc });
  });

  app.put("/api/documents/:id", (req, res) => {
    const { id } = req.params;
    const index = db.documents.findIndex(d => d.id === id);
    if (index !== -1) {
      db.documents[index] = { ...db.documents[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, document: db.documents[index] });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  });

  app.delete("/api/documents/:id", (req, res) => {
    const { id } = req.params;
    db.documents = db.documents.filter(d => d.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // Calendar Events CRUD
  app.post("/api/events", (req, res) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      ...req.body
    };
    db.events.push(newEvent);
    saveDatabase(db);
    res.json({ success: true, event: newEvent });
  });

  app.put("/api/events/:id", (req, res) => {
    const { id } = req.params;
    const index = db.events.findIndex(e => e.id === id);
    if (index !== -1) {
      db.events[index] = { ...db.events[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, event: db.events[index] });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  });

  app.delete("/api/events/:id", (req, res) => {
    const { id } = req.params;
    db.events = db.events.filter(e => e.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // FAQ CRUD
  app.post("/api/faq", (req, res) => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      order: (db.faq.length || 0) + 1,
      status: "PUBLICADO",
      ...req.body
    };
    db.faq.push(newFaq);
    saveDatabase(db);
    res.json({ success: true, faq: newFaq });
  });

  app.put("/api/faq/:id", (req, res) => {
    const { id } = req.params;
    const index = db.faq.findIndex(f => f.id === id);
    if (index !== -1) {
      db.faq[index] = { ...db.faq[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, faq: db.faq[index] });
    } else {
      res.status(404).json({ error: "FAQ not found" });
    }
  });

  app.delete("/api/faq/:id", (req, res) => {
    const { id } = req.params;
    db.faq = db.faq.filter(f => f.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // Public Contact Inquiries
  app.post("/api/inquiries", (req, res) => {
    const newInquiry: ContactSubmission = {
      id: `con-${Date.now()}`,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      subject: req.body.subject || "Consulta general",
      message: req.body.message || "",
      createdAt: new Date().toISOString(),
      read: false,
      status: "PENDIENTE"
    };
    db.contacts.unshift(newInquiry);
    saveDatabase(db);
    res.json({ success: true, inquiry: newInquiry });
  });

  app.put("/api/inquiries/:id", (req, res) => {
    const { id } = req.params;
    const index = db.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      db.contacts[index] = { ...db.contacts[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, inquiry: db.contacts[index] });
    } else {
      res.status(404).json({ error: "Inquiry not found" });
    }
  });

  // Public Online Enrollment (Inscripciones)
  app.post("/api/registrations", (req, res) => {
    const newReg: EnrollmentSubmission = {
      id: `enr-${Date.now()}`,
      studentFirstName: req.body.studentFirstName || "",
      studentLastName: req.body.studentLastName || "",
      studentDni: req.body.studentDni || "",
      birthDate: req.body.birthDate || "",
      levelRequested: req.body.levelRequested || "Nivel Primario",
      shiftPreference: req.body.shiftPreference || "Mañana",
      parentName: req.body.parentName || "",
      parentPhone: req.body.parentPhone || "",
      parentEmail: req.body.parentEmail || "",
      previousSchool: req.body.previousSchool || "",
      comments: req.body.comments || "",
      submittedAt: new Date().toISOString(),
      status: "NUEVA"
    };
    db.enrollments.unshift(newReg);
    saveDatabase(db);
    res.json({ success: true, enrollment: newReg });
  });

  app.put("/api/registrations/:id", (req, res) => {
    const { id } = req.params;
    const index = db.enrollments.findIndex(e => e.id === id);
    if (index !== -1) {
      db.enrollments[index] = { ...db.enrollments[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, enrollment: db.enrollments[index] });
    } else {
      res.status(404).json({ error: "Enrollment not found" });
    }
  });

  // Users Management
  app.post("/api/users", (req, res) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      active: true,
      createdAt: new Date().toISOString().split("T")[0],
      ...req.body
    };
    db.users.push(newUser);
    saveDatabase(db);
    res.json({ success: true, user: newUser });
  });

  app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const index = db.users.findIndex(u => u.id === id);
    if (index !== -1) {
      db.users[index] = { ...db.users[index], ...req.body };
      saveDatabase(db);
      res.json({ success: true, user: db.users[index] });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.users = db.users.filter(u => u.id !== id);
    saveDatabase(db);
    res.json({ success: true });
  });

  // ==========================================
  // RAG INSTITUTIONAL AI CHATBOT ENDPOINT
  // ==========================================
  app.post("/api/chat", async (req, res) => {
    const userMessage = (req.body.message || "").trim();

    if (!userMessage) {
      return res.status(400).json({ error: "Mensaje vacío" });
    }

    // Build the dynamic institutional knowledge base context
    const s = db.settings;
    let knowledgeText = `BASE DE CONOCIMIENTO INSTITUCIONAL - ${s.instituteName.toUpperCase()}:
- Nombre de la institución: ${s.instituteName} (${s.shortName})
- Frase / Lema: ${s.tagline} (Escuela Laica, Mixta y de Doble Jornada, fundada en memoria de Monseñor Roberto P. Lodigiani en Septiembre de 1992)
- Descripción: ${s.description}
- Teléfono institucional principal: ${s.phone}
- WhatsApp oficial de contacto: ${s.whatsapp}
- Horarios de atención y secretaría: ${s.openingHours}

SEDES INSTITUCIONALES (TRES SEDES OFICIALES):
${(s.branches || []).map(b => `* ${b.name.toUpperCase()} (${b.diegep}):
  - Dirección: ${b.fullAddress || b.address}
  - Teléfono: ${b.phone}
  - Email: ${b.email || s.emailGeneral}
  - Horarios: ${b.hours || s.openingHours}
  - Autoridades: ${b.authorities || "Equipo Directivo"}
  - Descripción: ${b.description || ""}`).join("\n\n")}

- Correos electrónicos de contacto:
  * General: ${s.emailGeneral}
  * Nivel Inicial: ${s.emailJardin}
  * Nivel Primario: ${s.emailPrimario}
  * Nivel Secundario: ${s.emailSecundario || s.emailGeneral}

INFORMACIÓN INSTITUCIONAL Y AUTORIDADES:
${db.pages.institucional?.content || ""}
${(db.pages.institucional?.sections || []).map(sec => `* ${sec.title}: ${sec.body}`).join("\n")}

INFORMACIÓN PARA ESTUDIANTES:
${db.pages.estudiantes?.content || ""}

PROPUESTA EDUCATIVA / OFERTA ACADÉMICA:
${db.educationalOffers
  .filter(o => o.status === "PUBLICADO")
  .map(o => `
NIVEL / PROPUESTA: ${o.title} (${o.level})
- Modalidad: ${o.modality}
- Duración: ${o.duration}
- Horarios: ${o.schedules}
- Resumen: ${o.shortDescription}
- Descripción detallada: ${o.fullDescription}
- Requisitos de ingreso: ${o.requirements.join(", ")}
- Documentación necesaria: ${o.documentationNeeded.join(", ")}
- Información de inscripción: ${o.enrollmentInfo}
- Plan de estudios / Asignaturas: ${o.curriculum.map(c => `${c.yearOrGroup}: [${c.subjects.join(", ")}]`).join("; ")}
`).join("\n")}

DOCUMENTOS OFICIALES Y REGLAMENTOS (INDEXADOS):
${db.documents
  .filter(d => d.isPublic && d.indexedInChatbot)
  .map(d => `* Documento: "${d.title}" (${d.category}, ${d.fileType})
  Descripción: ${d.description}
  Contenido resumido: ${d.contentSummary || "Disponible para descarga pública."}`)
  .join("\n")}

CALENDARIO DE EVENTOS Y FECHAS IMPORTANTES:
${db.events.map(e => `* ${e.date} (${e.time || ""}): ${e.title} - ${e.description} [${e.location}]`).join("\n")}

PREGUNTAS FRECUENTES (FAQ):
${db.faq
  .filter(f => f.status === "PUBLICADO")
  .map(f => `P: ${f.question}\nR: ${f.answer}`)
  .join("\n\n")}
`;

    const standardNotFoundMessage = "No encontré esa información publicada actualmente. Si querés, podés comunicarte directamente con el Instituto.";

    let reply = "";
    let hasAnswer = true;
    let relatedCategory = "General";

    // Attempt Gemini API call if key is present
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const systemPrompt = `Eres el asistente virtual oficial del Instituto de Enseñanza (${s.shortName}) en La Plata, Argentina.
Respondé de manera amable, clara y concisa en español argentino respetuoso pero cercano.
REGLA MANDATORIA DE COMPORTAMIENTO:
1. Respondé ÚNICAMENTE utilizando la información recuperada de la base de conocimiento institucional provista abajo.
2. NO inventes información, fechas, precios, requisitos, carreras, teléfonos ni datos institucionales que no estén textualmente en la base.
3. Si la información solicitada no está disponible o no se encuentra en la base de conocimiento, responde EXACTAMENTE o iniciando con:
"${standardNotFoundMessage}"
y luego ofrece los canales oficiales de contacto (WhatsApp ${s.whatsapp}, teléfono ${s.phone} o correo ${s.emailGeneral}).

Base de conocimiento institucional:
${knowledgeText}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: userMessage,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
          }
        });

        reply = response.text?.trim() || standardNotFoundMessage;
      } catch (geminiError) {
        console.error("Gemini API error, using local RAG fallback", geminiError);
      }
    }

    // Local RAG fallback if Gemini was not configured or threw an error
    if (!reply) {
      const lower = userMessage.toLowerCase();

      // Check specific FAQs first
      const matchedFaq = db.faq.find(f => {
        const qWords = f.question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        return qWords.some(w => lower.includes(w));
      });

      // Check educational offers
      const matchedOffer = db.educationalOffers.find(o => 
        lower.includes(o.title.toLowerCase()) ||
        lower.includes(o.level.toLowerCase()) ||
        (o.level === "Nivel Inicial" && (lower.includes("jardin") || lower.includes("jardín") || lower.includes("maternal") || lower.includes("sala"))) ||
        (o.level === "Nivel Primario" && (lower.includes("primari") || lower.includes("doble jornada"))) ||
        (o.level === "Nivel Secundario" && (lower.includes("secundari") || lower.includes("sociales") || lower.includes("economia") || lower.includes("economía"))) ||
        (o.level === "Talleres y Extracurricular" && (lower.includes("taller") || lower.includes("robotica") || lower.includes("robótica") || lower.includes("deporte") || lower.includes("ingles") || lower.includes("inglés")))
      );

      // Check documents
      const matchedDoc = db.documents.find(d => 
        d.indexedInChatbot && (
          lower.includes(d.title.toLowerCase()) ||
          (d.contentSummary && lower.split(/\s+/).some(w => w.length > 4 && d.contentSummary!.toLowerCase().includes(w)))
        )
      );

      // Check contact/address/phone
      const isContactQuery = lower.includes("direccion") || lower.includes("dirección") || lower.includes("donde queda") || lower.includes("dónde queda") || lower.includes("telefono") || lower.includes("teléfono") || lower.includes("contacto") || lower.includes("whatsapp") || lower.includes("mail") || lower.includes("correo") || lower.includes("horario") || lower.includes("sede") || lower.includes("sedes");

      // Check inscription query
      const isInscriptionQuery = lower.includes("inscri") || lower.includes("vacante") || lower.includes("anot") || lower.includes("matricul");

      if (matchedFaq) {
        reply = matchedFaq.answer;
        relatedCategory = matchedFaq.category;
      } else if (matchedOffer) {
        reply = `${matchedOffer.title}: ${matchedOffer.shortDescription}\n\nModalidad: ${matchedOffer.modality}. Horarios: ${matchedOffer.schedules}.\nRequisitos: ${matchedOffer.requirements.slice(0, 3).join("; ")}.\nInscripción: ${matchedOffer.enrollmentInfo}`;
        relatedCategory = "Propuesta Educativa";
      } else if (matchedDoc) {
        reply = `Sobre "${matchedDoc.title}": ${matchedDoc.contentSummary || matchedDoc.description}. Este archivo se encuentra disponible para su descarga en la sección de Documentos.`;
        relatedCategory = "Documentos";
      } else if (isContactQuery) {
        const branchesList = (s.branches || []).map(b => 
          `• ${b.name.toUpperCase()} (${b.diegep}): ${b.fullAddress || b.address}. Tel: ${b.phone}`
        ).join("\n");
        reply = `El Instituto de Enseñanza cuenta con tres sedes en La Plata:\n\n${branchesList}\n\n• WhatsApp oficial: ${s.whatsapp}\n• Horario de atención: ${s.openingHours}\n• Correo electrónico: ${s.emailGeneral}`;
        relatedCategory = "Contacto";
      } else if (isInscriptionQuery) {
        reply = `Las inscripciones se encuentran abiertas para Nivel Inicial, Primario y Secundario. Podés completar el formulario online de Pre-Inscripción desde el botón "Inscripciones" en el menú, o comunicarte directamente a Secretaría al teléfono ${s.phone} o WhatsApp ${s.whatsapp}.`;
        relatedCategory = "Inscripciones";
      } else if (lower.includes("hola") || lower.includes("buenas") || lower.includes("buen dia") || lower.includes("buen día") || lower.includes("tardes")) {
        reply = `¡Hola! Soy el asistente virtual del Instituto de Enseñanza. Puedo brindarte información sobre nuestra propuesta educativa (Inicial, Primario y Secundario), inscripciones, horarios, documentación, reglamentos y canales de contacto. ¿En qué puedo ayudarte hoy?`;
        relatedCategory = "General";
      } else {
        reply = standardNotFoundMessage;
      }
    }

    // Determine if question was successfully answered or missing
    if (reply.includes("No encontré esa información publicada actualmente") || reply.includes("no encontré esa información")) {
      hasAnswer = false;
      relatedCategory = "Consultas sin respuesta";
    }

    // Record interaction in chatbot log for admin analytics
    const newChatLog: ChatLog = {
      id: `chat-${Date.now()}`,
      timestamp: new Date().toISOString(),
      question: userMessage,
      answer: reply,
      hasAnswer,
      relatedCategory
    };
    db.chatLogs.unshift(newChatLog);
    if (db.chatLogs.length > 200) {
      db.chatLogs = db.chatLogs.slice(0, 200);
    }
    saveDatabase(db);

    res.json({
      reply,
      hasAnswer,
      relatedCategory,
      suggestions: hasAnswer 
        ? ["Ver propuesta educativa", "Requisitos de inscripción", "Horarios y sedes"] 
        : ["Contactar por WhatsApp", "Ver página de Contacto", "Consultar FAQ"]
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Instituto de Enseñanza server running on port ${PORT}`);
  });
}

startServer();
