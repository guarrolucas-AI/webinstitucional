export type Locale = "es" | "en";

const es = {
  meta: {
    title: "Wikinbound – Soluciones digitales para negocios modernos",
    description:
      "Potenciamos empresas con desarrollo web, marketing digital, automatización y sistemas personalizados. Consultoría, diseño e innovación desde Argentina para el mundo.",
    ogTitle: "Wikinbound – Soluciones digitales para transformar negocios modernos",
    ogDescription:
      "Consultoría, desarrollo web y automatización de procesos para empresas que buscan crecer. 6 años de experiencia en el mercado.",
  },
  nav: {
    servicios: "Servicios",
    proyectos: "Proyectos",
    contacto: "Contacto",
    whatsapp: "Whatsapp",
  },
  hero: {
    home: { line1: "Explorá", line2: "un mundo", line3: "sin límites" },
    projects: { line1: "Conocé", line2: "nuestros", line3: "éxitos." },
    buttons: {
      software: "Software factory",
      marketing: "Marketing",
      consultoria: "Consultoría",
    },
  },
  weAre: {
    badge: "Simulador de Negocio con AI",
    title: "We're",
    description:
      "Desarrollamos soluciones innovadoras utilizando las tecnologías más avanzadas del mercado para garantizar resultados excepcionales.",
  },
  servicios: {
    heading: "Servicios",
    subheading: "Consultoría, marketing y tecnología para transformar tu negocio",
    cards: {
      consultoria: {
        title: "Consultoría",
        subtitle: "Empresarial",
        description:
          "Impulsamos la transformación de tu empresa con asesoramiento legal, contable, operativo, tecnológico, comercial y de capital humano.",
      },
      marketing: {
        title: "Marketing",
        subtitle: "Inbound",
        description:
          "Lideramos el crecimiento de tu negocio con estrategias inbound que atraen, convierten y fidelizan clientes.",
      },
      software: {
        title: "Soluciones de",
        subtitle: "Software",
        description:
          "Ofrecemos soluciones de software innovadoras a través de un equipo de profesionales que transforman tu empresa.",
      },
    },
    graph: { efficiency: "Eficiencia", cost: "Costo" },
    inboundCards: [
      { title: "Redes sociales", desc: "Captura atención visualmente." },
      { title: "Atracción", desc: "Genera tráfico cualificado." },
      { title: "Conversión", desc: "Convierte tráfico en clientes." },
    ],
    softwareDescriptions: {
      Nodejs:
        "Node.js permite crear servidores y APIs eficientes usando JavaScript en el backend.",
      React:
        "React es una biblioteca para construir interfaces de usuario reutilizables mediante componentes.",
      NextJS:
        "Next.js extiende React con renderizado del lado del servidor, rutas automáticas y más rendimiento.",
    },
  },
  proyectos: {
    heading: "Proyectos",
    subheading:
      "Implementamos estrategias de innovación y fortalecimiento empresarial mejorando significativamente organizaciones.",
    cards: {
      ecommerce: {
        title: "E-Commerce",
        subtitle: "para Negocios",
        description:
          "Buscamos las mejores automatizaciones para hacer crecer empresas y emprendimientos",
        stat: "Automatizaciones",
      },
      leads: {
        title: "Estrategia de",
        subtitle: "Leads",
        description: "Organizamos y automatizamos el seguimiento de prospectos.",
        lead1Title: "Lead 1",
        lead1Desc: "Estoy interesado en el producto ...",
        strategyTitle: "Estrategia",
        strategyDesc: "Propuesta solida de alto valor",
      },
      gestion: {
        title: "Sistemas de",
        subtitle: "Gestión personalizados",
        description: "Creamos sistemas a medida para digitalizar tu operación.",
      },
    },
  },
  simulador: {
    heading: "Inteligencia Artificial y tu negocio",
    title1: "Simulador",
    title2: "de negocio",
    description: "Acá podés simular con AI la proyección de tu empresa hacia el futuro.",
    warning: "Usar con precaución, proyecto experimental",
    tabs: { chat: "Chat", manual: "Entrada manual", dashboard: "Resultados" },
    form: {
      title: "Simulación de Crecimiento Empresarial",
      name: "Nombre de la empresa",
      namePlaceholder: "Ej: Mi Empresa SRL",
      industry: "Industria",
      industryPlaceholder: "Seleccioná un rubro",
      revenue: "Ingresos mensuales aproximados (USD)",
      revenuePlaceholder: "Ej: 5000",
      size: "Tamaño de la empresa",
      sizePlaceholder: "Seleccioná el tamaño",
      submit: "Simular proyección",
      submitting: "Calculando...",
      industries: {
        retail: "Retail / Comercio",
        tecnologia: "Tecnología",
        servicios: "Servicios profesionales",
        alimentos: "Alimentos y bebidas",
        salud: "Salud y bienestar",
        otro: "Otro",
      },
      sizes: {
        small: "1 a 10 empleados",
        medium: "11 a 50 empleados",
        large: "Más de 50 empleados",
      },
    },
    results: {
      empty: "Completá el formulario de Entrada manual para ver tu proyección acá.",
      title: "Resumen de Proyección",
      company: "Empresa",
      industry: "Industria",
      currentRevenue: "Ingreso mensual actual",
      month3: "Proyección a 3 meses",
      month6: "Proyección a 6 meses",
      month12: "Proyección a 12 meses",
      growthRate: "Crecimiento mensual estimado",
      suggestion: "Sugerencia estratégica",
      disclaimer:
        "* Proyección estimada según promedios del rubro. No constituye asesoramiento financiero.",
      newSimulation: "Nueva simulación",
    },
    lead: {
      heading: "¿Querés lograr este crecimiento?",
      description: "Dejanos tu email y te ayudamos a hacerlo realidad.",
      emailPlaceholder: "tu@email.com",
      submit: "Quiero que me ayuden",
      submitting: "Enviando...",
      success: "¡Listo! Te vamos a contactar pronto.",
      error: "No se pudo enviar. Intentalo de nuevo o escribinos por WhatsApp.",
    },
    suggestions: {
      retail:
        "Fortalecé tu presencia en redes sociales y programas de fidelización para aumentar la frecuencia de compra.",
      tecnologia:
        "Invertí en automatización y retención de talento técnico para sostener el ritmo de crecimiento.",
      servicios:
        "Diversificá tu cartera de clientes y sistematizá procesos para escalar sin perder calidad.",
      alimentos:
        "Optimizá tu cadena de suministro y explorá canales de venta online para reducir costos.",
      salud:
        "Ampliá tu oferta de servicios preventivos y mejorá la experiencia digital de tus pacientes.",
      otro: "Analizá tus procesos internos para identificar oportunidades de automatización y crecimiento.",
    },
    chat: {
      title: "Chat IA para Consultoría Empresarial",
      developing: "Chat AI en desarrollo",
      soon: "Muy pronto disponible",
      placeholder: "Escribí tu mensaje...",
      send: "Enviar",
    },
  },
  contact: {
    heading: "Agendá una reunión",
    email: "Email",
    phones: "Teléfonos",
    whatsapp: "WhatsApp",
    availableDays: "Reuniones disponibles de Lunes a Viernes",
    schedule: "Horario: 9:00 AM - 6:00 PM (GMT-3)",
    maxParticipants: "Hasta 50 participantes por reunión",
    availableSlots: "Horarios disponibles",
    checkingAvailability: "Verificando disponibilidad...",
    noSlots: "No hay horarios disponibles para esta fecha.",
    automaticProcess: "Proceso automático",
    process: [
      "Verificación automática de disponibilidad",
      "Se crea automáticamente la reunión de Google Meet",
      "Se envían invitaciones por email a ambas partes",
      "Recordatorios automáticos 15 min antes",
    ],
    form: {
      nombre: "Nombre *",
      apellido: "Apellido *",
      email: "Email *",
      telefono: "Teléfono",
      asunto: "Asunto de la reunión *",
      asuntoPlaceholder: "Ej: Revisión de proyecto, Consulta técnica...",
      fechaHora: "Fecha y hora preferida *",
      seleccionarHora: "Seleccionar hora",
      helperNoSlots: "No hay horarios disponibles para esta fecha",
      helperDefault: "Horario disponible: Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-3)",
      duracion: "Duración estimada *",
      seleccionarDuracion: "Seleccionar duración",
      dur30: "30 minutos",
      dur45: "45 minutos",
      dur60: "1 hora",
      participantes: "Número de participantes",
      participantesPlaceholder: "Ej: 5",
      agenda: "Agenda / Descripción *",
      agendaPlaceholder: "Describe los temas a tratar en la reunión...",
      submit: "CREAR REUNIÓN DE GOOGLE MEET",
      submitting: "CREANDO REUNIÓN...",
    },
    status: {
      success: "Reunión creada exitosamente. Se han enviado las invitaciones por email.",
      openMeet: "Abrir enlace de Google Meet",
      alternativeSlots: "Horarios alternativos disponibles:",
      genericError: "Error al crear la reunión. Inténtalo de nuevo.",
      unexpectedError: "Error inesperado. Por favor, inténtalo de nuevo.",
    },
  },
  footer: {
    tagline: "Desarrollado con estrategia e innovación por Wikinbound",
    rights: "Todos los derechos reservados.",
  },
};

const en: typeof es = {
  meta: {
    title: "Wikinbound – Digital solutions for modern businesses",
    description:
      "We power businesses with web development, digital marketing, automation, and custom systems. Consulting, design, and innovation from Argentina for the world.",
    ogTitle: "Wikinbound – Digital solutions to transform modern businesses",
    ogDescription:
      "Consulting, web development, and process automation for companies looking to grow. 6 years of experience in the market.",
  },
  nav: {
    servicios: "Services",
    proyectos: "Projects",
    contacto: "Contact",
    whatsapp: "Whatsapp",
  },
  hero: {
    home: { line1: "Explore", line2: "a world", line3: "without limits" },
    projects: { line1: "Discover", line2: "our", line3: "successes." },
    buttons: {
      software: "Software factory",
      marketing: "Marketing",
      consultoria: "Consulting",
    },
  },
  weAre: {
    badge: "AI Business Simulator",
    title: "We're",
    description:
      "We develop innovative solutions using the most advanced technologies on the market to guarantee exceptional results.",
  },
  servicios: {
    heading: "Services",
    subheading: "Consulting, marketing, and technology to transform your business",
    cards: {
      consultoria: {
        title: "Business",
        subtitle: "Consulting",
        description:
          "We drive your company's transformation with legal, accounting, operational, technological, commercial, and human capital advice.",
      },
      marketing: {
        title: "Inbound",
        subtitle: "Marketing",
        description:
          "We lead your business growth with inbound strategies that attract, convert, and retain customers.",
      },
      software: {
        title: "Software",
        subtitle: "Solutions",
        description:
          "We offer innovative software solutions through a team of professionals who transform your company.",
      },
    },
    graph: { efficiency: "Efficiency", cost: "Cost" },
    inboundCards: [
      { title: "Social media", desc: "Capture attention visually." },
      { title: "Attraction", desc: "Generate qualified traffic." },
      { title: "Conversion", desc: "Turn traffic into customers." },
    ],
    softwareDescriptions: {
      Nodejs: "Node.js lets you build efficient servers and APIs using JavaScript on the backend.",
      React: "React is a library for building reusable user interfaces through components.",
      NextJS: "Next.js extends React with server-side rendering, automatic routing, and better performance.",
    },
  },
  proyectos: {
    heading: "Projects",
    subheading:
      "We implement innovation and business-strengthening strategies that significantly improve organizations.",
    cards: {
      ecommerce: {
        title: "E-Commerce",
        subtitle: "for Business",
        description: "We find the best automations to help companies and ventures grow",
        stat: "Automations",
      },
      leads: {
        title: "Lead",
        subtitle: "Strategy",
        description: "We organize and automate prospect follow-up.",
        lead1Title: "Lead 1",
        lead1Desc: "I'm interested in the product ...",
        strategyTitle: "Strategy",
        strategyDesc: "Solid high-value proposal",
      },
      gestion: {
        title: "Custom",
        subtitle: "Management Systems",
        description: "We build tailor-made systems to digitize your operations.",
      },
    },
  },
  simulador: {
    heading: "Artificial Intelligence and your business",
    title1: "Business",
    title2: "Simulator",
    description: "Simulate your company's projection into the future here.",
    warning: "Use with caution, experimental project",
    tabs: { chat: "Chat", manual: "Manual input", dashboard: "Results" },
    form: {
      title: "Business Growth Simulation",
      name: "Company name",
      namePlaceholder: "E.g.: My Company LLC",
      industry: "Industry",
      industryPlaceholder: "Select an industry",
      revenue: "Approximate monthly revenue (USD)",
      revenuePlaceholder: "E.g.: 5000",
      size: "Company size",
      sizePlaceholder: "Select a size",
      submit: "Run projection",
      submitting: "Calculating...",
      industries: {
        retail: "Retail / Commerce",
        tecnologia: "Technology",
        servicios: "Professional services",
        alimentos: "Food and beverage",
        salud: "Health and wellness",
        otro: "Other",
      },
      sizes: {
        small: "1 to 10 employees",
        medium: "11 to 50 employees",
        large: "More than 50 employees",
      },
    },
    results: {
      empty: "Fill out the Manual input form to see your projection here.",
      title: "Projection Summary",
      company: "Company",
      industry: "Industry",
      currentRevenue: "Current monthly revenue",
      month3: "3-month projection",
      month6: "6-month projection",
      month12: "12-month projection",
      growthRate: "Estimated monthly growth",
      suggestion: "Strategic suggestion",
      disclaimer:
        "* Estimated projection based on industry averages. Not financial advice.",
      newSimulation: "New simulation",
    },
    lead: {
      heading: "Want to achieve this growth?",
      description: "Leave us your email and we'll help make it happen.",
      emailPlaceholder: "your@email.com",
      submit: "I want help with this",
      submitting: "Sending...",
      success: "Done! We'll be in touch soon.",
      error: "Couldn't send it. Try again or message us on WhatsApp.",
    },
    suggestions: {
      retail:
        "Strengthen your social media presence and loyalty programs to increase purchase frequency.",
      tecnologia:
        "Invest in automation and technical talent retention to sustain your growth pace.",
      servicios:
        "Diversify your client portfolio and systematize processes to scale without losing quality.",
      alimentos:
        "Optimize your supply chain and explore online sales channels to reduce costs.",
      salud:
        "Expand your preventive care offering and improve your patients' digital experience.",
      otro: "Analyze your internal processes to identify automation and growth opportunities.",
    },
    chat: {
      title: "AI Chat for Business Consulting",
      developing: "AI Chat in development",
      soon: "Coming soon",
      placeholder: "Type your message...",
      send: "Send",
    },
  },
  contact: {
    heading: "Schedule a meeting",
    email: "Email",
    phones: "Phones",
    whatsapp: "WhatsApp",
    availableDays: "Meetings available Monday to Friday",
    schedule: "Hours: 9:00 AM - 6:00 PM (GMT-3)",
    maxParticipants: "Up to 50 participants per meeting",
    availableSlots: "Available time slots",
    checkingAvailability: "Checking availability...",
    noSlots: "No time slots available for this date.",
    automaticProcess: "Automatic process",
    process: [
      "Automatic availability check",
      "Google Meet meeting is created automatically",
      "Email invitations are sent to both parties",
      "Automatic reminders 15 min before",
    ],
    form: {
      nombre: "First name *",
      apellido: "Last name *",
      email: "Email *",
      telefono: "Phone",
      asunto: "Meeting subject *",
      asuntoPlaceholder: "E.g.: Project review, Technical consultation...",
      fechaHora: "Preferred date and time *",
      seleccionarHora: "Select a time",
      helperNoSlots: "No time slots available for this date",
      helperDefault: "Available hours: Monday to Friday, 9:00 AM - 6:00 PM (GMT-3)",
      duracion: "Estimated duration *",
      seleccionarDuracion: "Select duration",
      dur30: "30 minutes",
      dur45: "45 minutes",
      dur60: "1 hour",
      participantes: "Number of participants",
      participantesPlaceholder: "E.g.: 5",
      agenda: "Agenda / Description *",
      agendaPlaceholder: "Describe the topics to cover in the meeting...",
      submit: "CREATE GOOGLE MEET MEETING",
      submitting: "CREATING MEETING...",
    },
    status: {
      success: "Meeting created successfully. Invitations have been sent by email.",
      openMeet: "Open Google Meet link",
      alternativeSlots: "Available alternative time slots:",
      genericError: "Error creating the meeting. Please try again.",
      unexpectedError: "Unexpected error. Please try again.",
    },
  },
  footer: {
    tagline: "Developed with strategy and innovation by Wikinbound",
    rights: "All rights reserved.",
  },
};

export const dictionaries = { es, en };

export type Dictionary = typeof es;
