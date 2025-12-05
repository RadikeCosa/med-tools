/**
 * Centralized site configuration
 * All content, navigation, and settings are defined here
 */

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  enabled: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  welcomeMessage: string;
  author: string;
  year: number;
  repository: string;
  
  // Navigation
  mainNav: NavLink[];
  footerNav: NavLink[];
  
  // Sections on homepage
  sections: Section[];
  
  // SEO
  seo: {
    title: string;
    description: string;
    siteName: string;
    url: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "med-tools",
  title: "Bienvenido a med-tools",
  description: "Este proyecto personal reúne herramientas digitales para practicar y mostrar habilidades técnicas. Explora, prueba y personaliza las utilidades según tus necesidades.",
  welcomeMessage: "Bienvenido a med-tools, tu espacio de herramientas digitales.",
  author: "RadikeCosa",
  year: 2025,
  repository: "https://github.com/RadikeCosa/med-tools",
  
  mainNav: [
    { label: "Inicio", href: "/" },
    { label: "ESAS", href: "/ESAS" },
    { label: "Herramienta 2", href: "#" },
  ],
  
  footerNav: [
    { label: "Contacto", href: "#" },
    { label: "GitHub", href: "https://github.com/RadikeCosa/med-tools" },
    { label: "Más herramientas", href: "#" },
  ],
  
  sections: [
    {
      id: "esas",
      title: "Test ESAS",
      description: "Evaluación de síntomas (ESAS) - Herramienta para registrar y analizar síntomas de pacientes.",
      href: "/ESAS",
      buttonLabel: "Ir a ESAS",
      enabled: true,
    },
    {
      id: "tool2",
      title: "Herramienta 2",
      description: "Nueva herramienta próximamente disponible.",
      href: "#",
      buttonLabel: "Próximamente",
      enabled: false,
    },
  ],
  
  seo: {
    title: "med-tools",
    description: "Proyecto personal de herramientas digitales para portfolio y práctica profesional.",
    siteName: "med-tools",
    url: "https://github.com/RadikeCosa/med-tools",
  },
};
