import { InstituteData } from '../types';

export const initialData: InstituteData = {
  settings: {
    instituteName: "Instituto de Enseñanza",
    shortName: "IE La Plata",
    tagline: "Escuela Laica, Mixta y de Doble Jornada",
    description: "Institución educativa en La Plata fundada en 1992. Cuenta con tres sedes propias para Nivel Inicial (Diegep 8084), Nivel Primario (Diegep 3466) y Nivel Secundario (Diegep 7811).",
    logoUrl: "/images/logo-ide-mini-50x58.png",
    mainAddress: "Calle 66 nº 818 entre 11 y 12, (1900) La Plata. Bs.As.",
    jardinAddress: "Calle 68 nº 969 entre 14 y 15, (1900) La Plata. Bs.As.",
    secundarioAddress: "Calle 68 nº 970 entre 14 y 15, (1900) La Plata. Bs.As.",
    phone: "453.5780",
    inicialPhone: "453.4536",
    primarioPhone: "453.5780",
    secundarioPhone: "451.5205",
    whatsapp: "+5492214535780",
    emailGeneral: "info@instituto-ensenanza.com.ar",
    emailPrimario: "info.primario@instituto-ensenanza.com.ar",
    emailJardin: "info.jardin@instituto-ensenanza.com.ar",
    emailSecundario: "info.secundario@instituto-ensenanza.com.ar",
    openingHours: "Lunes a Viernes de 07:30 a 17:30 hs",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.3912185246714!2d-57.9472651!3d-34.9272895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e630ec8dc96b%3A0x6b9d6a3b2b4bc6e8!2sAv.%2066%20818%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar",
    facebookUrl: "https://facebook.com/institutoensenanzalaplata",
    instagramUrl: "https://instagram.com/institutoensenanzalaplata",
    youtubeUrl: "https://youtube.com/@institutoensenanzalaplata",
    footerText: "© Instituto de Enseñanza — Escuela Laica, Mixta y de Doble Jornada. La Plata, Bs. As.",
    seoTitle: "Instituto de Enseñanza | La Plata | Inicial, Primario y Secundario",
    seoDescription: "Escuela Laica, Mixta y de Doble Jornada en La Plata. Nivel Inicial (Diegep 8084), Primario (Diegep 3466) y Secundario (Diegep 7811).",
    seoKeywords: "colegio la plata, instituto de enseñanza, diegep 8084, diegep 3466, diegep 7811, nivel inicial la plata, primaria doble jornada, secundario la plata",
    allowOnlineEnrollment: true,
    branches: [
      {
        id: "sede-inicial",
        name: "Nivel Inicial",
        level: "Nivel Inicial",
        diegep: "Diegep 8084",
        address: "Calle 68 nº 969",
        crossStreets: "entre 14 y 15",
        postalCode: "(1900)",
        city: "La Plata",
        province: "Bs.As.",
        fullAddress: "Calle 68 nº 969 entre 14 y 15, (1900) La Plata. Bs.As.",
        phone: "453.4536",
        phoneRaw: "02214534536",
        email: "info.jardin@instituto-ensenanza.com.ar",
        imageUrl: "/images/jardin-696x504.jpg",
        hours: "De 7:45 a 15:45 hs (con almuerzo y talleres)",
        authorities: "Directora Inicial: Natalia García",
        description: "Salas de 2 a 5 años, patio cubierto y descubierto con juegos infantiles, salas equipadas y proyectos vivenciales.",
        googleMapsUrl: "https://maps.google.com/?q=Calle+68+969,+La+Plata,+Buenos+Aires"
      },
      {
        id: "sede-primario",
        name: "Nivel Primario",
        level: "Nivel Primario",
        diegep: "Diegep 3466",
        address: "Calle 66 nº 818",
        crossStreets: "entre 11 y 12",
        postalCode: "(1900)",
        city: "La Plata",
        province: "Bs.As.",
        fullAddress: "Calle 66 nº 818 entre 11 y 12, (1900) La Plata. Bs.As.",
        phone: "453.5780",
        phoneRaw: "02214535780",
        email: "info.primario@instituto-ensenanza.com.ar",
        imageUrl: "/images/primario-626x626.jpg",
        hours: "De 7:45 a 15:45 hs (con almuerzo y talleres)",
        authorities: "Directora Primario: Cabo Vanesa | Secretaria: Ana Lucía De Bairros",
        description: "Doble Jornada con Talleres, comedor escolar, talleres pedagógicos, inglés intensivo, biblioteca, computación y deportes.",
        googleMapsUrl: "https://maps.google.com/?q=Calle+66+818,+La+Plata,+Buenos+Aires"
      },
      {
        id: "sede-secundario",
        name: "Nivel Secundario",
        level: "Nivel Secundario",
        diegep: "Diegep 7811",
        address: "Calle 68 nº 970",
        crossStreets: "entre 14 y 15",
        postalCode: "(1900)",
        city: "La Plata",
        province: "Bs.As.",
        fullAddress: "Calle 68 nº 970 entre 14 y 15, (1900) La Plata. Bs.As.",
        phone: "451.5205",
        phoneRaw: "02214515205",
        email: "info.secundario@instituto-ensenanza.com.ar",
        imageUrl: "/images/secundario-622x544.jpg",
        hours: "Turno Mañana: 07:30 a 13:10 hs (con contra-turnos de educación física)",
        authorities: "Directora Secundario: Roxana Petruccelli | Secretaria: Sansone Rocío",
        description: "Ciclo Básico y Ciclo Superior Orientado en Ciencias Sociales y Economía y Administración. Preparación preuniversitaria.",
        googleMapsUrl: "https://maps.google.com/?q=Calle+68+970,+La+Plata,+Buenos+Aires"
      }
    ]
  },
  pages: {
    home: {
      slug: "home",
      title: "Bienvenidos al Instituto de Enseñanza",
      subtitle: "Escuela Laica, Mixta y de Doble Jornada en la ciudad de La Plata",
      content: "Creado en memoria de Monseñor Roberto P. Lodigiani en Septiembre de 1992, el Instituto de Enseñanza brinda una sólida formación humana y pedagógica para Nivel Inicial, Primario y Secundario en sus tres sedes de la ciudad de La Plata.",
      lastUpdated: "2026-03-01"
    },
    institucional: {
      slug: "institucional",
      title: "Identidad y Proyecto Institucional",
      subtitle: "Escuela Laica, Mixta y de Doble Jornada con tres sedes en La Plata",
      content: "El Instituto de Enseñanza fue creado en memoria de Monseñor Roberto P. Lodigiani en el mes de Septiembre de 1992. Desde sus orígenes, se constituyó como una Escuela Laica, Mixta y de Doble Jornada con la misión de ofrecer una formación de excelencia que integre el desarrollo académico, el afecto pedagógico y los valores cívicos.\n\nHoy en día, la institución cuenta con tres sedes especializadas e independientes en la ciudad de La Plata para acompañar con infraestructura adecuada a cada grupo etario: Nivel Inicial en Calle 68 nº 969, Nivel Primario en Calle 66 nº 818 y Nivel Secundario en Calle 68 nº 970.",
      sections: [
        {
          title: "Fundación e Historia",
          body: "Creado en memoria de Monseñor Roberto P. Lodigiani en Septiembre de 1992. Nació con la vocación de brindar educación de excelencia, abierta a la comunidad platense, promoviendo el pensamiento crítico, la convivencia democrática y el acompañamiento personalizado a cada familia."
        },
        {
          title: "Nuestras Tres Sedes Oficiales",
          body: "• Nivel Inicial (Diegep 8084): Calle 68 nº 969 entre 14 y 15. Tel: 453.4536.\n• Nivel Primario (Diegep 3466): Calle 66 nº 818 entre 11 y 12. Tel: 453.5780.\n• Nivel Secundario (Diegep 7811): Calle 68 nº 970 entre 14 y 15. Tel: 451.5205."
        },
        {
          title: "Plantel Directivo",
          body: "• Nivel Inicial: Directora Natalia García\n• Nivel Primario: Directora Cabo Vanesa | Secretaria Ana Lucía De Bairros\n• Nivel Secundario: Directora Roxana Petruccelli | Secretaria Sansone Rocío"
        },
        {
          title: "Propuesta de Doble Jornada",
          body: "En Nivel Primario, la Doble Jornada ofrece talleres extracurriculares en el contra-turno con robótica, inglés intensivo, deportes, música, plástica y comedor escolar con menú supervisado."
        }
      ],
      lastUpdated: "2026-03-01"
    },
    estudiantes: {
      slug: "estudiantes",
      title: "Espacio de la Comunidad Estudiantil",
      subtitle: "Recursos académicos, normativas, calendarios y servicios escolares",
      content: "En este espacio los estudiantes y sus familias pueden consultar las fechas de exámenes, pautas de convivencia institucional, horarios de clases y talleres, formularios de trámites administrativos y material de estudio.",
      lastUpdated: "2026-02-15"
    }
  },
  educationalOffers: [
    {
      id: "nivel-inicial",
      title: "Nivel Inicial (Jardín Maternal e Infantes)",
      level: "Nivel Inicial",
      slug: "nivel-inicial",
      shortDescription: "Salas de 2, 3, 4 y 5 años en un entorno cálido, seguro y lúdico para los primeros pasos de aprendizaje.",
      fullDescription: "El Nivel Inicial del Instituto de Enseñanza ofrece una propuesta afectiva y pedagógica centrada en el juego, la creatividad y la socialización temprana. En nuestra sede exclusiva de Calle 68 Nº 969, los niños experimentan el mundo a través de proyectos vivenciales, iniciación a las ciencias, artes plásticas, expresión corporal e inglés temprano.",
      objectives: [
        "Fomentar la autonomía personal, la confianza y la adquisición de hábitos de convivencia armónica.",
        "Desarrollar el lenguaje verbal y no verbal mediante narraciones, canciones y dramatizaciones.",
        "Introducir de forma lúdica el pensamiento lógico-matemático y la exploración del entorno natural.",
        "Iniciar el contacto fonético y recreativo con el idioma inglés desde edades tempranas."
      ],
      curriculum: [
        {
          yearOrGroup: "Salas de 2 y 3 Años",
          subjects: ["Juego y Socialización", "Expresión Corporal y Motricidad", "Lenguaje y Comunicación", "Música y Plástica", "Exploración Sensorial"]
        },
        {
          yearOrGroup: "Salas de 4 y 5 Años (Preescolar)",
          subjects: ["Iniciación a la Lectoescritura", "Pensamiento Matemático Lúdico", "Inglés Temprano (Phonics y Songs)", "Educación Física y Coordinación", "Indagación del Ambiente Social y Natural", "Talleres de Robótica Inicial con Bloques"]
        }
      ],
      requirements: [
        "Certificado de nacimiento del niño/a.",
        "DNI del alumno y de los progenitores/tutores legales (original y fotocopia).",
        "Libreta de vacunación al día (esquema nacional obligatorio).",
        "Certificado bucodental y apto médico para actividad física.",
        "Entrevista inicial con el equipo directivo y docente."
      ],
      duration: "Ciclo de 4 años (Salas de 2 a 5 años)",
      modality: "Presencial con Talleres",
      schedules: "De 7:45 a 15:45 hs (con almuerzo y talleres)",
      documentationNeeded: [
        "Ficha de datos personales y sanitarios completa",
        "Constancia de vacante o pase si proviene de otra institución",
        "4 fotos carnet 4x4 fondo blanco"
      ],
      enrollmentInfo: "Las vacantes para Sala de 2 a 5 años se gestionan con prioridad para hermanos de alumnos regulares y luego se abren a la comunidad general. Podés completar la pre-inscripción online o escribir a info.jardin@instituto-ensenanza.com.ar.",
      downloadableFiles: [
        { name: "Proyecto Pedagógico Nivel Inicial.pdf", url: "#", size: "1.2 MB" },
        { name: "Lista de Materiales y Uniforme Inicial.pdf", url: "#", size: "650 KB" }
      ],
      imageUrl: "/images/jardin-696x504.jpg",
      status: "PUBLICADO",
      featured: true,
      order: 1,
      branchName: "Sede Nivel Inicial",
      diegep: "Diegep 8084",
      address: "Calle 68 nº 969 entre 14 y 15, (1900) La Plata",
      phone: "453.4536"
    },
    {
      id: "nivel-primario",
      title: "Nivel Primario con Doble Jornada",
      level: "Nivel Primario",
      slug: "nivel-primario",
      shortDescription: "Formación académica sólida de 1º a 6º año, con talleres de profundización pedagógica, robótica y deportes.",
      fullDescription: "El Nivel Primario consolida las competencias básicas de lectoescritura comprensiva, cálculo y resolución de problemas, método científico y valores cívicos. Contamos con modalidad de Doble Jornada con talleres pedagógicos en contra-turno, comedor escolar con menú supervisado por nutricionistas, y proyecto intensivo de idioma inglés.",
      objectives: [
        "Garantizar la alfabetización integral y la comprensión crítica de textos de variada complejidad.",
        "Promover el razonamiento analítico, la curiosidad científica y el trabajo en equipo.",
        "Afianzar las destrezas digitales mediante el uso responsable de dispositivos y programación educativa.",
        "Fomentar la actividad física, la camaradería y la vida en la naturaleza a través del campamento escolar anual."
      ],
      curriculum: [
        {
          yearOrGroup: "Primer Ciclo (1º, 2º y 3º Año)",
          subjects: ["Prácticas del Lenguaje", "Matemática", "Ciencias Sociales", "Ciencias Naturales", "Educación Artística (Plástica y Música)", "Educación Física", "Inglés", "Taller de Robótica y Convivencia"]
        },
        {
          yearOrGroup: "Segundo Ciclo (4º, 5º y 6º Año)",
          subjects: ["Prácticas del Lenguaje y Literatura", "Matemática y Geometría", "Ciencias Sociales y Ciudadanía", "Ciencias Naturales y Laboratorio", "Inglés Intensivo", "Tecnología y Pensamiento Computacional", "Educación Física y Deportes", "Música y Teatro"]
        }
      ],
      requirements: [
        "Certificado de aprobación o finalización del nivel anterior (Nivel Inicial o grado previo).",
        "Partida de nacimiento y DNI del alumno/a.",
        "DNI de los padres o representantes legales.",
        "Certificado de vacunación oficial y ficha médica de aptitud física.",
        "Informe pedagógico de la institución de origen."
      ],
      duration: "6 años académicos",
      modality: "Doble Jornada con Talleres",
      schedules: "De 7:45 a 15:45 hs (con almuerzo y talleres)",
      documentationNeeded: [
        "Constancia de alumno regular o certificado de pase",
        "Ficha de matrícula definitiva",
        "Constancia de libre deuda en caso de institución privada de procedencia"
      ],
      enrollmentInfo: "Entrevistas de admisión abiertas durante todo el año escolar. Contacto directo por correo a info.primario@instituto-ensenanza.com.ar o al teléfono 453.5780.",
      downloadableFiles: [
        { name: "Reglamento y Pautas de Convivencia Primaria.pdf", url: "#", size: "1.8 MB" },
        { name: "Propuesta de Doble Jornada y Talleres.pdf", url: "#", size: "980 KB" }
      ],
      imageUrl: "/images/primario-626x626.jpg",
      status: "PUBLICADO",
      featured: true,
      order: 2,
      branchName: "Sede Nivel Primario",
      diegep: "Diegep 3466",
      address: "Calle 66 nº 818 entre 11 y 12, (1900) La Plata",
      phone: "453.5780"
    },
    {
      id: "nivel-secundario",
      title: "Nivel Secundario Orientado",
      level: "Nivel Secundario",
      slug: "nivel-secundario",
      shortDescription: "Ciclo Básico y Ciclo Superior con Orientación en Ciencias Sociales y Economía & Administración. Articulación preuniversitaria.",
      fullDescription: "El Nivel Secundario prepara a los jóvenes para afrontar con éxito la vida universitaria, terciaria y laboral. Con una sólida formación científica y humanística, se enfatiza la investigación, el debate argumentativo, el dominio del idioma inglés y la realización de proyectos con impacto social en la comunidad platense.",
      objectives: [
        "Desarrollar capacidades de análisis crítico, investigación documental y rigor metodológico.",
        "Brindar herramientas de economía, gestión organizacional y comprensión de los procesos sociales e históricos.",
        "Facilitar la articulación con las universidades nacionales de La Plata (UNLP) y del país.",
        "Estimular el liderazgo ético, la mediación pacífica de conflictos y la participación democrática."
      ],
      curriculum: [
        {
          yearOrGroup: "Ciclo Básico (1º, 2º y 3º Año)",
          subjects: ["Lengua y Literatura", "Matemática", "Historia", "Geografía", "Biología", "Físico-Química", "Inglés", "Construcción de Ciudadanía", "Educación Artística", "Educación Física"]
        },
        {
          yearOrGroup: "Ciclo Superior - Orientación en Ciencias Sociales (4º, 5º y 6º Año)",
          subjects: ["Sociología", "Ciencia Política", "Psicología", "Filosofía", "Historia y Geografía Regional", "Metodología de la Investigación Social", "Comunicación y Medios", "Taller de Producción Cultural"]
        },
        {
          yearOrGroup: "Ciclo Superior - Orientación en Economía y Administración (4º, 5º y 6º Año)",
          subjects: ["Sistemas de Información Contable", "Economía Política", "Administración de Organizaciones", "Derecho y Legislación Laboral", "Gestión Financiera y Emprendedurismo", "Matemática Financiera"]
        }
      ],
      requirements: [
        "Certificado de finalización y pase legalizado de Nivel Primario (o años previos de Secundaria).",
        "DNI del estudiante y partida de nacimiento.",
        "DNI de los tutores o representantes legales.",
        "Certificado de vacunas y apto médico escolar obligatorio.",
        "Entrevista vocacional e institucional de ingreso."
      ],
      duration: "6 años académicos (1º a 6º año de Secundaria)",
      modality: "Presencial",
      schedules: "Turno Mañana: 07:30 a 13:10 hs (con clases de educación física y talleres en contra-turno por la tarde).",
      documentationNeeded: [
        "Certificado Analítico Parcial en caso de pases intermedios",
        "Formulario de inscripción secundaria firmado",
        "Aceptación del régimen de convivencia y asistencias"
      ],
      enrollmentInfo: "Para inscribirse en Nivel Secundario, comunicarse con Secretaría Académica al teléfono 451.5205 o vía email a info.secundario@instituto-ensenanza.com.ar.",
      downloadableFiles: [
        { name: "Plan de Estudios Orientaciones Secundario.pdf", url: "#", size: "2.4 MB" },
        { name: "Régimen Académico y Evaluación.pdf", url: "#", size: "1.1 MB" }
      ],
      imageUrl: "/images/secundario-622x544.jpg",
      status: "PUBLICADO",
      featured: true,
      order: 3,
      branchName: "Sede Nivel Secundario",
      diegep: "Diegep 7811",
      address: "Calle 68 nº 970 entre 14 y 15, (1900) La Plata",
      phone: "451.5205"
    }
  ],
  news: [
    {
      id: "noticia-1",
      title: "Espacios de Lectura y Biblioteca en Sede Primario",
      slug: "espacios-lectura-biblioteca-primario",
      excerpt: "Nuevos libros y recursos didácticos se incorporaron al catálogo de biblioteca para incentivar el hábito de lectura.",
      content: "Nuestra biblioteca en la sede de Calle 66 Nº 818 incorporó nuevo material bibliográfico, novelas juveniles y áreas de estudio silencioso para todos los cursos de Nivel Primario y Secundario.",
      category: "Institucional",
      imageUrl: "/images/20210601-112757-1280x720.jpg",
      publishedAt: "2026-03-02",
      author: "Equipo Directivo",
      status: "PUBLICADO",
      featured: true,
      readTime: "3 min",
      tags: ["Biblioteca", "Lectura", "Primaria", "Calle 66"]
    },
    {
      id: "noticia-2",
      title: "Inscripciones Abiertas Ciclo Lectivo 2027 en las 3 Sedes",
      slug: "inscripciones-abiertas-ciclo-lectivo",
      excerpt: "Conocé los pasos, requisitos y documentación requerida para Nivel Inicial (Diegep 8084), Primario (Diegep 3466) y Secundario (Diegep 7811).",
      content: "Informamos a las familias interesadas que se encuentra habilitado el periodo de admisión y reserva de vacantes para los tres niveles educativos del Instituto de Enseñanza en La Plata.",
      category: "Institucional",
      imageUrl: "/images/primario-626x626.jpg",
      publishedAt: "2026-02-28",
      author: "Secretaría de Admisiones",
      status: "PUBLICADO",
      featured: true,
      readTime: "4 min",
      tags: ["Inscripciones", "Vacantes", "Admisiones", "Tres Sedes"]
    },
    {
      id: "noticia-3",
      title: "Actividades en el Patio de Nivel Inicial (Calle 68 nº 969)",
      slug: "actividades-patio-nivel-inicial",
      excerpt: "Los más pequeños disfrutaron de juegos recreativos y talleres plásticos en los patios de la Sede Jardín.",
      content: "La Sede Nivel Inicial de Calle 68 cuenta con patios seguros y diseñados para la motricidad infantil, donde niños y niñas comparten actividades al aire libre guiados por sus docentes.",
      category: "Eventos y Actos",
      imageUrl: "/images/jardin-696x504.jpg",
      publishedAt: "2026-02-18",
      author: "Prof. Natalia García",
      status: "PUBLICADO",
      featured: false,
      readTime: "2 min",
      tags: ["Nivel Inicial", "Jardín", "Diegep 8084", "Calle 68"]
    },
    {
      id: "noticia-4",
      title: "Clases y Proyectos en la Sede Nivel Secundario",
      slug: "clases-proyectos-sede-secundario",
      excerpt: "Estudiantes de Ciencias Sociales y Economía y Administración comenzaron sus proyectos anuales en Calle 68 nº 970.",
      content: "Con aulas preparadas para el trabajo colaborativo e investigación, los alumnos de Secundaria profundizan en contenidos preuniversitarios bajo la dirección de la Prof. Roxana Petruccelli.",
      category: "Institucional",
      imageUrl: "/images/secundario-622x544.jpg",
      publishedAt: "2026-02-10",
      author: "Dirección Nivel Secundario",
      status: "PUBLICADO",
      featured: false,
      readTime: "3 min",
      tags: ["Secundario", "Diegep 7811", "Orientaciones", "Calle 68"]
    }
  ],
  gallery: [
    {
      id: "album-inicial",
      title: "Sede Nivel Inicial (Diegep 8084)",
      category: "Inicial",
      description: "Instalaciones, salas y actividades en Calle 68 nº 969 entre 14 y 15. Teléfono: 453.4536.",
      coverImage: "/images/jardin-696x504.jpg",
      date: "2026-02-25",
      status: "PUBLICADO",
      images: [
        {
          id: "img-j1",
          url: "/images/jardin-696x504.jpg",
          caption: "Fachada y acceso Sede Nivel Inicial - Calle 68 nº 969",
          altText: "Fachada Nivel Inicial"
        },
        {
          id: "img-j2",
          url: "/images/jardin001-1280x720.jpg",
          caption: "Rincón lúdico y materiales didácticos",
          altText: "Rincón lúdico"
        },
        {
          id: "img-j3",
          url: "/images/jardin002-1280x720.jpg",
          caption: "Patio cubierto y juegos infantiles",
          altText: "Patio cubierto inicial"
        },
        {
          id: "img-j4",
          url: "/images/jardin003-1280x720.jpg",
          caption: "Patio descubierto y recreación",
          altText: "Patio al aire libre inicial"
        },
        {
          id: "img-j5",
          url: "/images/jardin004-1280x720.jpg",
          caption: "Sala de 3ra Sección (Preescolar)",
          altText: "Sala de preescolar"
        },
        {
          id: "img-j6",
          url: "/images/jardin005-1280x720.jpg",
          caption: "Salas luminosas y mobiliario a medida",
          altText: "Sala luminosa inicial"
        },
        {
          id: "img-j7",
          url: "/images/jardin006-1280x720.jpg",
          caption: "Sala de 2da Sección",
          altText: "Sala de 4 años"
        }
      ]
    },
    {
      id: "album-primario",
      title: "Sede Nivel Primario (Diegep 3466)",
      category: "Institución",
      description: "Aulas, comedor de doble jornada, biblioteca y patios en Calle 66 nº 818 entre 11 y 12. Teléfono: 453.5780.",
      coverImage: "/images/primario-626x626.jpg",
      date: "2026-02-20",
      status: "PUBLICADO",
      images: [
        {
          id: "img-p1",
          url: "/images/primario-626x626.jpg",
          caption: "Fachada Sede Nivel Primario - Calle 66 nº 818",
          altText: "Fachada Primaria"
        },
        {
          id: "img-p2",
          url: "/images/egb001-1280x720.jpg",
          caption: "Aulas y mobiliario pedagógico Nivel Primario",
          altText: "Aula de primaria"
        },
        {
          id: "img-p3",
          url: "/images/egb002-1280x720.jpg",
          caption: "Espacios de aprendizaje",
          altText: "Espacio de clase"
        },
        {
          id: "img-p4",
          url: "/images/egb003-1280x720.jpg",
          caption: "Aulas equipadas para primer ciclo",
          altText: "Aulas equipadas"
        },
        {
          id: "img-p5",
          url: "/images/egb004-1280x720.jpg",
          caption: "Patio cubierto e instalaciones polideportivas",
          altText: "Patio cubierto primario"
        },
        {
          id: "img-p6",
          url: "/images/20210601-112757-1280x720.jpg",
          caption: "Biblioteca escolar y rincón de lectura",
          altText: "Biblioteca escolar"
        },
        {
          id: "img-p7",
          url: "/images/20210601-112839-1280x720.jpg",
          caption: "Comedor escolar - Doble jornada",
          altText: "Comedor escolar"
        },
        {
          id: "img-p8",
          url: "/images/20210601-113010-1280x720.jpg",
          caption: "Salón de usos múltiples y galerías",
          altText: "SUM y galerías"
        },
        {
          id: "img-p9",
          url: "/images/20210601-113218-1280x720.jpg",
          caption: "Patios y áreas de recreación",
          altText: "Patios escolares"
        },
        {
          id: "img-p10",
          url: "/images/20210714-103509-1280x720.jpg",
          caption: "Galerías y accesos Nivel Primario",
          altText: "Galerías de primaria"
        }
      ]
    },
    {
      id: "album-secundario",
      title: "Sede Nivel Secundario (Diegep 7811)",
      category: "Institución",
      description: "Aulas de Ciclo Básico y Superior en Calle 68 nº 970 entre 14 y 15. Teléfono: 451.5205.",
      coverImage: "/images/secundario-622x544.jpg",
      date: "2026-02-15",
      status: "PUBLICADO",
      images: [
        {
          id: "img-s1",
          url: "/images/secundario-622x544.jpg",
          caption: "Fachada Sede Nivel Secundario - Calle 68 nº 970",
          altText: "Fachada Secundario"
        },
        {
          id: "img-s2",
          url: "/images/secundario001-1280x720.jpg",
          caption: "Aulas Nivel Secundario",
          altText: "Aula de secundaria"
        },
        {
          id: "img-s3",
          url: "/images/secundario002-1280x720.jpg",
          caption: "Salones de clase y equipamiento",
          altText: "Salón de clase secundaria"
        },
        {
          id: "img-s4",
          url: "/images/secundario003-1280x720.jpg",
          caption: "Instalaciones y pasillos de Secundaria",
          altText: "Pasillos de secundaria"
        }
      ]
    },
    {
      id: "album-talleres",
      title: "Instalaciones, Biblioteca y Comedor",
      category: "Actividades",
      description: "Espacios de encuentro, lectura y actividades de doble jornada en La Plata.",
      coverImage: "/images/20210601-112757-1280x720.jpg",
      date: "2026-01-20",
      status: "PUBLICADO",
      images: [
        {
          id: "img-t1",
          url: "/images/20210601-112757-1280x720.jpg",
          caption: "Biblioteca del Instituto",
          altText: "Biblioteca"
        },
        {
          id: "img-t2",
          url: "/images/20210601-112839-1280x720.jpg",
          caption: "Comedor y salón de doble jornada",
          altText: "Comedor"
        },
        {
          id: "img-t3",
          url: "/images/20210601-113218-1280x720.jpg",
          caption: "Patio polideportivo",
          altText: "Patio de deportes"
        }
      ]
    }
  ],
  documents: [
    {
      id: "doc-1",
      title: "Reglamento Interno y Pautas de Convivencia Institucional 2026",
      category: "Reglamentos",
      fileType: "PDF",
      fileSize: "1.4 MB",
      fileUrl: "/assets/docs/Reglamento_Convivencia_2026.pdf",
      description: "Documento oficial con las normas de convivencia, derechos y obligaciones de alumnos, docentes y familias, régimen de asistencia y puntualidad.",
      uploadDate: "2026-02-15",
      isPublic: true,
      indexedInChatbot: true,
      contentSummary: "El Reglamento de Convivencia rige para Inicial, Primaria y Secundaria. Fija la obligatoriedad del uniforme reglamentario, el límite de 20 inasistencias anuales antes de perder la regularidad, la prohibición del uso de teléfonos móviles durante clase salvo indicación pedagógica, los canales formales de comunicación familia-escuela y el protocolo antibullying de resolución dialogada."
    },
    {
      id: "doc-2",
      title: "Ficha Médica Obligatoria y Autorización de Salidas Educativas",
      category: "Formularios",
      fileType: "PDF",
      fileSize: "680 KB",
      fileUrl: "/assets/docs/Ficha_Medica_y_Salidas.pdf",
      description: "Formulario sanitario de presentación anual obligatoria para todos los alumnos, firmado por médico matriculado, que incluye aptitud física para educación física.",
      uploadDate: "2026-02-10",
      isPublic: true,
      indexedInChatbot: true,
      contentSummary: "La ficha médica requiere apto cardiológico y clínico con vigencia anual, constancia de vacunas al día, indicación de alergias o tratamientos médicos específicos y firma autorizante de los tutores para viajes y excursiones escolares dentro de la provincia."
    },
    {
      id: "doc-3",
      title: "Cronograma Oficial de Mesas de Exámenes Previas y Equivalencias",
      category: "Académico",
      fileType: "PDF",
      fileSize: "850 KB",
      fileUrl: "/assets/docs/Cronograma_Mesas_Examen_2026.pdf",
      description: "Turnos de exámenes de febrero/marzo, julio/agosto y diciembre para estudiantes de Nivel Secundario con materias previas o pendientes de aprobación.",
      uploadDate: "2026-02-01",
      isPublic: true,
      indexedInChatbot: true,
      contentSummary: "Las mesas de examen se llevan a cabo en tres turnos anuales: Febrero/Marzo (inscripción previa obligatoria en Preceptoría hasta 72 horas antes), Julio (receso invernal) y Diciembre. Es obligatorio presentarse con uniforme escolar y DNI en mano."
    },
    {
      id: "doc-4",
      title: "Plan de Estudios y Orientaciones del Nivel Secundario",
      category: "Institucional",
      fileType: "PDF",
      fileSize: "2.1 MB",
      fileUrl: "/assets/docs/Plan_Estudios_Secundario.pdf",
      description: "Malla curricular completa con las materias del Ciclo Básico y las materias especializadas de Ciencias Sociales y de Economía y Administración.",
      uploadDate: "2026-01-25",
      isPublic: true,
      indexedInChatbot: true,
      contentSummary: "Detalla las materias de 1º a 6º año de Secundaria aprobadas por la Dirección General de Cultura y Educación (DGCyE) de Buenos Aires. Ciencias Sociales profundiza en Filosofía, Ciencias Políticas e Investigación. Economía profundiza en Contabilidad, Derecho Comercial y Micro/Macroeconomía."
    },
    {
      id: "doc-5",
      title: "Instructivo de Solicitud de Vacantes y Aranceles Ciclo 2026",
      category: "Inscripciones",
      fileType: "PDF",
      fileSize: "920 KB",
      fileUrl: "/assets/docs/Instructivo_Inscripciones_2026.pdf",
      description: "Guía paso a paso para el proceso de matriculación, modalidades de pago, bonificaciones por hermanos y documentación administrativa.",
      uploadDate: "2026-01-18",
      isPublic: true,
      indexedInChatbot: true,
      contentSummary: "Los aranceles mensuales se abonan del 1 al 10 de cada mes mediante transferencia bancaria, débito automático o cupón en entidades habilitadas. Se contempla un 10% de descuento en el segundo hermano y 15% a partir del tercer hermano escolarizado en el instituto."
    }
  ],
  events: [
    {
      id: "evt-1",
      title: "Inicio del Ciclo Lectivo 2026: Nivel Inicial y Primario",
      date: "2026-03-02",
      time: "08:00 hs",
      category: "Inicio de clases",
      description: "Acto de apertura en Calle 66 para alumnos de 1º a 6º año de Primaria y en Calle 68 nº 969 para Nivel Inicial.",
      location: "Sedes Inicial y Primario",
      targetAudience: "Toda la comunidad"
    },
    {
      id: "evt-2",
      title: "Inicio de Clases Nivel Secundario",
      date: "2026-03-09",
      time: "07:30 hs",
      category: "Inicio de clases",
      description: "Bienvenida especial a los ingresantes a 1º Año y presentación de docentes y directivos en la Sede Nivel Secundario.",
      location: "Sede Secundario (Calle 68 nº 970)",
      targetAudience: "Nivel Secundario"
    },
    {
      id: "evt-3",
      title: "Turno Especial de Mesas de Examen de Previas",
      date: "2026-03-18",
      endDate: "2026-03-20",
      time: "08:00 a 12:00 hs",
      category: "Exámenes",
      description: "Instancia de evaluación para regularizar materias del ciclo lectivo anterior en la Sede Secundario.",
      location: "Sede Secundario (Calle 68 nº 970)",
      targetAudience: "Nivel Secundario"
    },
    {
      id: "evt-4",
      title: "Reunión de Familias de Nivel Inicial y Talleres Lúdicos",
      date: "2026-03-25",
      time: "17:30 hs",
      category: "Reuniones",
      description: "Encuentro pedagógico con docentes de sala para acordar pautas de adaptación y proyectos del año.",
      location: "Sede Inicial (Calle 68 nº 969)",
      targetAudience: "Nivel Inicial"
    },
    {
      id: "evt-5",
      title: "Acto por el Día de la Memoria por la Verdad y la Justicia",
      date: "2026-03-24",
      time: "Feriado Nacional",
      category: "Feriados",
      description: "Conmemoración y reflexión ciudadana en todas las asignaturas durante la semana previa.",
      location: "Las 3 Sedes",
      targetAudience: "Toda la comunidad"
    },
    {
      id: "evt-6",
      title: "Feria del Libro y Encuentro de Narradores",
      date: "2026-04-23",
      time: "09:00 a 16:00 hs",
      category: "Actividades",
      description: "Jornada literaria con autores locales, venta de libros con descuento y talleres de escritura creativa.",
      location: "Sede Primario (Calle 66 nº 818)",
      targetAudience: "Toda la comunidad"
    }
  ],
  faq: [
    {
      id: "faq-1",
      question: "¿Cuáles son las sedes del Instituto de Enseñanza y qué niveles funcionan en cada una?",
      answer: "El Instituto de Enseñanza cuenta con tres sedes propias e independientes en la ciudad de La Plata:\n1. Nivel Inicial (Diegep 8084): Calle 68 nº 969 entre 14 y 15. Teléfono: 453.4536.\n2. Nivel Primario (Diegep 3466): Calle 66 nº 818 entre 11 y 12. Teléfono: 453.5780.\n3. Nivel Secundario (Diegep 7811): Calle 68 nº 970 entre 14 y 15. Teléfono: 451.5205.",
      category: "Carreras y Niveles",
      order: 1,
      status: "PUBLICADO"
    },
    {
      id: "faq-2",
      question: "¿Cómo funciona la Doble Jornada en el Nivel Primario?",
      answer: "La Doble Jornada en Nivel Primario cuenta con horario de 7:45 a 15:45 hs (con almuerzo y talleres). En el turno curricular los alumnos completan los contenidos oficiales bonaerenses, y en el contra-turno asisten a talleres pedagógicos de robótica, inglés intensivo, educación física y expresión artística. Contamos con comedor escolar supervisado con menú balanceado.",
      category: "Carreras y Niveles",
      order: 2,
      status: "PUBLICADO"
    },
    {
      id: "faq-3",
      question: "¿Qué orientaciones ofrece el Nivel Secundario?",
      answer: "En el Ciclo Superior de Secundaria (4º, 5º y 6º año) ofrecemos dos orientaciones oficiales: 1) Bachillerato en Ciencias Sociales, con énfasis en historia, sociología, investigación y ciencias políticas; y 2) Bachillerato en Economía y Administración, con énfasis en sistemas contables, microeconomía, derecho y proyectos de emprendimiento.",
      category: "Carreras y Niveles",
      order: 3,
      status: "PUBLICADO"
    },
    {
      id: "faq-4",
      question: "¿Cómo se solicita una vacante o inscripción para el ciclo lectivo?",
      answer: "El trámite comienza completando el formulario de Pre-Inscripción online desde este sitio web o comunicándose por teléfono al (0221) 453-5780 o vía WhatsApp. Luego la Secretaría de Admisiones coordina una entrevista pedagógica y la entrega de la documentación requerida.",
      category: "Inscripciones",
      order: 4,
      status: "PUBLICADO"
    },
    {
      id: "faq-5",
      question: "¿Qué documentación se requiere para el ingreso escolar?",
      answer: "Se solicita: DNI del alumno/a y de los progenitores (original y fotocopia), partida de nacimiento, libreta sanitaria con esquema oficial de vacunación completo, certificado bucodental y apto médico físico anual, y el informe pedagógico o constancia de alumno regular / certificado de pase de la institución anterior.",
      category: "Documentación",
      order: 5,
      status: "PUBLICADO"
    },
    {
      id: "faq-6",
      question: "¿Cuáles son los horarios de clases y de atención administrativa?",
      answer: "Nivel Inicial: De 7:45 a 15:45 hs (con almuerzo y talleres). Nivel Primario: De 7:45 a 15:45 hs (con almuerzo y talleres). Nivel Secundario: Turno Mañana de 07:30 a 13:10 hs más contra-turnos de educación física. La Secretaría y Administración atienden de lunes a viernes de 07:30 a 17:30 hs.",
      category: "Horarios",
      order: 6,
      status: "PUBLICADO"
    },
    {
      id: "faq-7",
      question: "¿Cómo puedo contactarme con el Instituto por correo o WhatsApp?",
      answer: "Podés comunicarte por teléfono fijo al (0221) 453-5780, por WhatsApp al +54 9 221 453-5780, o por correo electrónico: info@instituto-ensenanza.com.ar (General y Secundaria), info.primario@instituto-ensenanza.com.ar (Nivel Primario), e info.jardin@instituto-ensenanza.com.ar (Nivel Inicial).",
      category: "Contacto",
      order: 7,
      status: "PUBLICADO"
    },
    {
      id: "faq-8",
      question: "¿Hay descuento o bonificación por hermanos en la cuota?",
      answer: "Sí, el Instituto de Enseñanza otorga un 10% de bonificación en la cuota mensual para el segundo hermano matriculado, y un 15% para el tercer hermano y sucesivos.",
      category: "Administración",
      order: 8,
      status: "PUBLICADO"
    }
  ],
  contacts: [
    {
      id: "con-1",
      firstName: "Martín",
      lastName: "Fernández",
      email: "m.fernandez@gmail.com",
      phone: "0221-555-1234",
      subject: "Consulta sobre vacante para 1º año Secundaria",
      message: "Buenas tardes, quisiera saber si aún disponen de vacantes para 1º año de Secundaria y el arancel estimativo del turno mañana. Muchas gracias.",
      createdAt: "2026-03-04T10:15:00Z",
      read: true,
      status: "RESPONDIDO"
    },
    {
      id: "con-2",
      firstName: "Lucía",
      lastName: "Morales",
      email: "lucia.morales@hotmail.com",
      phone: "0221-543-9876",
      subject: "Información para Sala de 3 años Sede Jardín",
      message: "Hola, me gustaría coordinar una entrevista presencial para conocer las instalaciones del jardín maternal en calle 68 para mi nena de 3 años.",
      createdAt: "2026-03-06T14:30:00Z",
      read: false,
      status: "PENDIENTE"
    }
  ],
  enrollments: [
    {
      id: "enr-1",
      studentFirstName: "Joaquín",
      studentLastName: "Alonso",
      studentDni: "52.341.890",
      birthDate: "2018-06-14",
      levelRequested: "Nivel Primario",
      shiftPreference: "Doble Jornada",
      parentName: "Esteban Alonso",
      parentPhone: "0221-489-0123",
      parentEmail: "esteban.alonso@gmail.com",
      previousSchool: "Jardín Municipal Nº 902",
      comments: "Interesados especialmente en los talleres de robótica y deportes del contraturno.",
      submittedAt: "2026-03-05T11:20:00Z",
      status: "ENTREVISTA_AGENDADA"
    },
    {
      id: "enr-2",
      studentFirstName: "Sofía",
      studentLastName: "Romero",
      studentDni: "48.120.455",
      birthDate: "2012-09-03",
      levelRequested: "Nivel Secundario",
      shiftPreference: "Mañana",
      parentName: "Carla Vázquez",
      parentPhone: "0221-432-8765",
      parentEmail: "carlavazquez@yahoo.com.ar",
      previousSchool: "Escuela Primaria Nº 19",
      comments: "Solicitud de ingreso a 1º año ciclo básico.",
      submittedAt: "2026-03-06T09:45:00Z",
      status: "NUEVA"
    }
  ],
  chatLogs: [
    {
      id: "chat-1",
      timestamp: "2026-03-07T08:20:00Z",
      question: "¿Dónde queda la sede del jardín y qué teléfono tienen?",
      answer: "La Sede de Nivel Inicial del Instituto de Enseñanza se encuentra ubicada en Calle 68 Nº 969 (entre 14 y 15), La Plata. Su correo directo es info.jardin@instituto-ensenanza.com.ar y el teléfono institucional es (0221) 453-5780.",
      hasAnswer: true,
      relatedCategory: "Institucional"
    },
    {
      id: "chat-2",
      timestamp: "2026-03-07T08:42:00Z",
      question: "¿Tienen natatorio propio climatizado en la escuela?",
      answer: "No encontré esa información publicada actualmente. Si querés, podés comunicarte directamente con el Instituto.",
      hasAnswer: false,
      relatedCategory: "Consultas sin respuesta"
    },
    {
      id: "chat-3",
      timestamp: "2026-03-07T09:10:00Z",
      question: "¿Qué orientaciones puedo elegir en la secundaria?",
      answer: "En el Nivel Secundario del Instituto de Enseñanza podés optar entre dos orientaciones en el Ciclo Superior: Bachillerato en Ciencias Sociales y Bachillerato en Economía y Administración.",
      hasAnswer: true,
      relatedCategory: "Oferta Educativa"
    }
  ],
  users: [
    {
      id: "usr-admin",
      name: "Prof. Lic. Dirección General",
      email: "admin@instituto-ensenanza.com.ar",
      role: "ADMINISTRADOR",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      active: true,
      createdAt: "2025-01-01"
    },
    {
      id: "usr-editor",
      name: "Secretaría Académica",
      email: "secretaria@instituto-ensenanza.com.ar",
      role: "EDITOR",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      active: true,
      createdAt: "2025-02-15"
    },
    {
      id: "usr-redactor",
      name: "Coordinación de Comunicación",
      email: "prensa@instituto-ensenanza.com.ar",
      role: "REDACTOR",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      active: true,
      createdAt: "2025-03-01"
    }
  ],
  stats: {
    siteVisits: 14280,
    mostVisitedOffer: "Nivel Secundario Orientado"
  }
};
