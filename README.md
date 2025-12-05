# med-tools

Este proyecto personal reúne herramientas digitales para practicar y mostrar habilidades técnicas. Explora, prueba y personaliza las utilidades según tus necesidades.

## 🚀 Características

- **Arquitectura modular**: Fácil agregar nuevas herramientas y secciones
- **Configuración centralizada**: Todo el contenido se gestiona desde un único archivo
- **Estilos modernos**: CSS variables centralizadas con soporte para modo oscuro
- **Responsive**: Diseñado para funcionar en todos los dispositivos
- **Accesible**: Cumple con estándares de accesibilidad web

## 📦 Herramientas Incluidas

### ESAS (Evaluación de Síntomas de Edmonton)
Herramienta para registrar y analizar síntomas de pacientes según la escala ESAS.

## 🛠️ Getting Started

Primero, instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

Luego, inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## ⚙️ Configuración

### Archivo de Configuración Central

Todo el contenido del sitio (títulos, enlaces, secciones) se gestiona desde `app/config/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: "med-tools",
  title: "Bienvenido a med-tools",
  description: "...",
  
  // Navegación principal
  mainNav: [
    { label: "Inicio", href: "/" },
    { label: "ESAS", href: "/ESAS" },
  ],
  
  // Secciones en la página principal
  sections: [
    {
      id: "esas",
      title: "Test ESAS",
      description: "...",
      href: "/ESAS",
      buttonLabel: "Ir a ESAS",
      enabled: true,
    },
  ],
};
```

### Agregar una Nueva Sección

1. Abre `app/config/site.config.ts`
2. Agrega un nuevo objeto al array `sections`:
   ```typescript
   {
     id: "nueva-herramienta",
     title: "Mi Nueva Herramienta",
     description: "Descripción de la herramienta",
     href: "/nueva-herramienta",
     buttonLabel: "Ir a Herramienta",
     enabled: true,
   }
   ```
3. Agrega el enlace a `mainNav` si deseas que aparezca en el header
4. La sección aparecerá automáticamente en la página principal

### Estilos Centralizados

Los estilos se gestionan con CSS variables en `app/globals.css`:

```css
:root {
  /* Colores principales */
  --primary: #2563eb;
  --secondary: #e0e7ef;
  --accent: #fbbf24;
  
  /* Colores semánticos */
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
  
  /* Espaciado */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* Bordes */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

#### Utilizar CSS Variables

Puedes usar las variables en cualquier componente:

```tsx
// Con utility classes
<div className="bg-primary text-background">...</div>

// O directamente en CSS
<div style={{ background: 'var(--primary)' }}>...</div>
```

#### Clases de Utilidad Disponibles

- **Colores**: `.bg-primary`, `.bg-secondary`, `.bg-accent`, `.text-foreground`, `.text-muted`, `.text-strong`
- **Semánticos**: `.text-success`, `.text-error`, `.text-warning`, `.bg-success-light`, `.bg-error-light`
- **Layout**: `.container`, `.section`, `.card`
- **Botones**: `.btn`, `.btn-primary`, `.btn-secondary`

## 📁 Estructura del Proyecto

```
med-tools/
├── app/
│   ├── config/
│   │   └── site.config.ts      # Configuración central del sitio
│   ├── components/
│   │   ├── Header.tsx           # Header con navegación
│   │   └── Footer.tsx           # Footer con enlaces
│   ├── ESAS/                    # Herramienta ESAS
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página de inicio
├── public/                      # Recursos estáticos
└── package.json                 # Dependencias del proyecto
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `app/globals.css`:

```css
:root {
  --primary: #tu-color-primario;
  --accent: #tu-color-acento;
}
```

### Modificar Navegación

Edita `app/config/site.config.ts`:

```typescript
mainNav: [
  { label: "Tu Link", href: "/tu-ruta" },
],
```

### Agregar Footer Links

Edita `app/config/site.config.ts`:

```typescript
footerNav: [
  { label: "Tu Link", href: "https://tu-url.com" },
],
```

## 🧪 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta el linter
```

## 🔧 Tecnologías

- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework CSS
- **ESLint** - Linter de código

## 📝 Licencia

Este es un proyecto personal de portfolio.

## 👤 Autor

**RadikeCosa**

- GitHub: [@RadikeCosa](https://github.com/RadikeCosa)

## 🤝 Contribuciones

Este es un proyecto personal, pero sugerencias y feedback son bienvenidos.
