# GitHub Copilot Instructions - med-tools

## Project Overview

This is a Next.js 16 application built with TypeScript and React 19, serving as a collection of medical tools. The project uses Tailwind CSS 4 for styling along with a centralized CSS variables system for design consistency.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode enabled)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 + CSS Variables
- **Linting**: ESLint with Next.js config

## Component Structure and Organization

### Directory Structure

All components follow Next.js App Router conventions:

```
app/
├── [feature-name]/              # Feature directory (e.g., ESAS)
│   ├── page.tsx                 # Route page component
│   ├── components/              # Feature-specific components
│   │   ├── Component1.tsx
│   │   └── Component2.tsx
│   ├── hooks/                   # Feature-specific hooks
│   │   └── useFeature.ts
│   ├── utils.ts                 # Feature-specific utilities
│   ├── types.ts                 # Feature-specific types
│   └── constants.ts             # Feature-specific constants
├── components/                  # Shared components (Header, Footer, etc.)
├── icons/                       # Centralized icon components
│   ├── IconName.tsx
│   ├── index.ts                 # Barrel export file
│   └── types.ts
├── config/                      # Global configuration
│   └── site.config.ts
├── globals.css                  # Global styles and CSS variables
├── layout.tsx                   # Root layout
└── page.tsx                     # Home page
```

### Component Organization Rules

1. **Route Components**: Each route is a directory with a `page.tsx` file
2. **Co-located Components**: All components needed for a specific route go in that route's `components/` subdirectory
3. **Shared Components**: Only truly shared components (used in multiple routes) go in `app/components/`
4. **Icons**: All SVG icons are React components in `app/icons/`, never inline in other components
5. **Naming Convention**: Use PascalCase for component files (e.g., `SymptomSlider.tsx`)
6. **Export Pattern**: Use default exports for components

### Creating a New Feature/Route

When creating a new feature:

```typescript
// app/new-feature/page.tsx
import FeatureComponent from "./components/FeatureComponent";

export default function NewFeaturePage() {
  return (
    <div className="container section">
      <h1>New Feature</h1>
      <FeatureComponent />
    </div>
  );
}
```

## Styling Guidelines

### CSS Variables System

The project uses a centralized design system with CSS variables defined in `app/globals.css`. **ALWAYS** use these variables instead of hardcoded values.

#### Available CSS Variables

**Colors:**
```css
--background              /* Main background color */
--background-secondary    /* Secondary background */
--foreground              /* Main text color */
--foreground-muted        /* Muted text */
--foreground-strong       /* Strong emphasis text */
--primary                 /* Brand primary color */
--primary-hover           /* Primary hover state */
--secondary               /* Secondary color */
--accent                  /* Accent color */
--accent-hover            /* Accent hover state */
--success                 /* Success state */
--success-light           /* Light success background */
--warning                 /* Warning state */
--warning-light           /* Light warning background */
--error                   /* Error state */
--error-light             /* Light error background */
--info                    /* Info state */
--info-light              /* Light info background */
```

**Spacing:**
```css
--spacing-xs    /* 0.25rem */
--spacing-sm    /* 0.5rem */
--spacing-md    /* 1rem */
--spacing-lg    /* 1.5rem */
--spacing-xl    /* 2rem */
--spacing-2xl   /* 3rem */
```

**Border Radius:**
```css
--radius-sm     /* 0.375rem */
--radius-md     /* 0.5rem */
--radius-lg     /* 0.75rem */
--radius-xl     /* 1rem */
--radius-full   /* 9999px - for pills */
```

**Transitions:**
```css
--transition-fast   /* 150ms ease-in-out */
--transition-base   /* 200ms ease-in-out */
--transition-slow   /* 300ms ease-in-out */
```

**Shadows:**
```css
--shadow-sm    /* Subtle shadow */
--shadow-md    /* Medium shadow */
--shadow-lg    /* Large shadow */
```

**Borders:**
```css
--border-color       /* Default border */
--border-color-dark  /* Darker border */
```

### Using CSS Variables

#### Option 1: Utility Classes (Preferred)

Use the pre-defined utility classes from `globals.css`:

```tsx
// Colors
<div className="bg-primary text-background">Primary button</div>
<div className="bg-secondary text-foreground">Secondary button</div>
<p className="text-muted">Muted text</p>
<p className="text-success">Success message</p>
<div className="bg-error-light text-error">Error state</div>

// Layout
<div className="container section">
  <div className="card">Card content</div>
</div>

// Buttons
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-secondary">Secondary Action</button>
```

#### Option 2: Direct CSS Variables

When utility classes don't exist:

```tsx
<div style={{ 
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--background-secondary)'
}}>
  Content
</div>
```

#### Option 3: Tailwind CSS with CSS Variables

Combine Tailwind utilities with CSS variables for custom values:

```tsx
<div className="p-4 rounded-lg border" style={{
  borderColor: 'var(--border-color)',
  backgroundColor: 'var(--background-secondary)'
}}>
  Content
</div>
```

### Styling Patterns

**Component with Tailwind + CSS Variables:**
```tsx
export default function MyComponent() {
  return (
    <div className="container py-8">
      <div className="card">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Title
        </h2>
        <p className="text-muted">Description</p>
        <button className="btn btn-primary mt-4">
          Action
        </button>
      </div>
    </div>
  );
}
```

**Responsive Design:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

**Dark Mode Support:**
Dark mode is handled automatically via CSS variables with `prefers-color-scheme`. No additional classes needed.

### Style Do's and Don'ts

**DO:**
- ✅ Use CSS variables for colors, spacing, and design tokens
- ✅ Use utility classes from `globals.css` when available
- ✅ Use Tailwind utilities for layout and sizing
- ✅ Follow mobile-first responsive design
- ✅ Use semantic HTML elements

**DON'T:**
- ❌ Use hardcoded color values (e.g., `#2563eb`, `blue-500`)
- ❌ Use hardcoded spacing values without CSS variables
- ❌ Create inline styles when utility classes exist
- ❌ Use `!important` unless absolutely necessary
- ❌ Override Tailwind base styles unnecessarily

## Icon Management

### Icon Guidelines

1. **All icons must be in `app/icons/` directory**
2. **Icons are React components, not raw SVG files**
3. **Always import from the barrel export**: `import { IconName } from "@/app/icons"`
4. **Never inline SVGs in components**

### Creating a New Icon

```tsx
// app/icons/NewIcon.tsx
import { IconProps } from "./types";

export default function NewIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M..." // SVG path data
      />
    </svg>
  );
}
```

Then add to barrel export in `app/icons/index.ts`:

```typescript
export { default as NewIcon } from "./NewIcon";
```

### Using Icons

```tsx
import { HomeIcon, ArrowIcon, SuccessIcon } from "@/app/icons";

export default function MyComponent() {
  return (
    <div>
      <HomeIcon className="w-6 h-6 text-primary" />
      <ArrowIcon className="w-4 h-4" />
      <SuccessIcon className="w-8 h-8 text-success" />
    </div>
  );
}
```

### Icon Sizing

Use Tailwind classes for consistent icon sizes:
- `w-4 h-4` - Small (16px)
- `w-5 h-5` - Default (20px)
- `w-6 h-6` - Medium (24px)
- `w-8 h-8` - Large (32px)

## TypeScript Guidelines

### Type Safety

1. **Always define prop types as interfaces**
2. **Use TypeScript strict mode** (already enabled in `tsconfig.json`)
3. **Avoid `any` type** - use `unknown` if type is truly unknown
4. **Define types in separate `.types.ts` files** for complex features

### Component Props Pattern

```tsx
interface ComponentProps {
  title: string;
  description?: string;  // Optional prop
  onAction: (value: string) => void;
  items: Array<ItemType>;
}

export default function Component({
  title,
  description,
  onAction,
  items,
}: ComponentProps) {
  // Component implementation
}
```

### Organizing Types

**For feature-specific types:**
```typescript
// app/feature/feature.types.ts
export interface FeatureData {
  id: string;
  name: string;
  // ...
}

export type FeatureStatus = "pending" | "completed" | "error";
```

**For shared types:**
```typescript
// app/types.ts or relevant location
export interface CommonType {
  // shared type definition
}
```

## Clean Code Practices

### Code Organization

1. **Imports Order:**
   ```typescript
   // 1. React and Next.js imports
   import React from "react";
   import Link from "next/link";
   
   // 2. Third-party imports
   import { someLib } from "some-package";
   
   // 3. Local imports - absolute paths
   import { IconName } from "@/app/icons";
   import { siteConfig } from "@/app/config/site.config";
   
   // 4. Relative imports
   import { localUtil } from "./utils";
   import ComponentName from "./components/ComponentName";
   ```

2. **File Structure:**
   - Types/Interfaces at the top
   - Constants
   - Helper functions
   - Main component
   - Export statement

### Component Best Practices

**Small, Focused Components:**
```tsx
// Good - focused, single responsibility
export default function SubmitButton({ onSubmit, isLoading }: Props) {
  return (
    <button 
      onClick={onSubmit}
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? "Submitting..." : "Submit"}
    </button>
  );
}
```

**Extract Complex Logic:**
```tsx
// Extract to custom hooks
function useFormValidation(data: FormData) {
  // validation logic
  return { isValid, errors };
}

// Use in component
export default function Form() {
  const { isValid, errors } = useFormValidation(formData);
  // render logic
}
```

**Meaningful Names:**
```tsx
// Good
const handleSubmit = () => { };
const isFormValid = true;
const userList = [];

// Avoid
const handle = () => { };
const flag = true;
const arr = [];
```

### Code Quality Rules

1. **DRY (Don't Repeat Yourself)**: Extract repeated logic into utilities or hooks
2. **Single Responsibility**: Each component/function should do one thing well
3. **Descriptive Naming**: Use clear, meaningful names for variables and functions
4. **Early Returns**: Use early returns to reduce nesting
5. **Error Handling**: Always handle errors gracefully with user feedback
6. **Comments**: Only comment "why", not "what" (code should be self-documenting)

### Formatting

- Use **2 spaces** for indentation (configured in project)
- Use **double quotes** for strings (follow project convention)
- Use **semicolons** (ESLint enforces this)
- Keep lines under **100 characters** when possible
- Use **trailing commas** in multi-line objects/arrays

## Accessibility Requirements

### Semantic HTML

Always use semantic HTML elements:

```tsx
// Good
<header>
  <nav>
    <Link href="/">Home</Link>
  </nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>

// Avoid
<div className="header">
  <div className="nav">...</div>
</div>
```

### ARIA Labels

Provide labels for interactive elements:

```tsx
// Form fields
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help">We'll never share your email</span>

// Buttons with only icons
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// Hidden but accessible text
<legend className="sr-only">Choose symptom severity</legend>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Clickable div
</div>
```

### Focus Styles

Focus styles are defined globally in `globals.css`:

```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

Ensure focus styles are never removed without providing an alternative.

## State Management

### Local State

Use React hooks for component state:

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Custom Hooks

Create custom hooks for reusable stateful logic:

```tsx
// app/feature/hooks/useFeature.ts
import { useState, useEffect } from "react";

export function useFeature() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // fetch or compute data
  }, []);
  
  return { data, loading };
}
```

### Local Storage

For persistence, use localStorage with error handling:

```tsx
function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return defaultValue;
  }
}
```

## Error Handling

### User-Facing Errors

Always provide clear error messages to users:

```tsx
import { ErrorIcon } from "@/app/icons";

export default function StatusMessage({ error }: { error?: string }) {
  if (!error) return null;
  
  return (
    <div className="bg-error-light text-error p-4 rounded-lg flex items-center gap-2">
      <ErrorIcon className="w-5 h-5" />
      <p>{error}</p>
    </div>
  );
}
```

### Try-Catch Blocks

Use try-catch for operations that can fail:

```tsx
async function handleSubmit() {
  try {
    setLoading(true);
    await submitData(formData);
    setSuccess(true);
  } catch (error) {
    setError("Failed to submit. Please try again.");
    console.error(error);
  } finally {
    setLoading(false);
  }
}
```

## Performance Guidelines

### React Optimization

1. **Avoid unnecessary re-renders:**
   ```tsx
   import { memo } from "react";
   
   const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
     // expensive rendering logic
   });
   ```

2. **Use useCallback for functions passed as props:**
   ```tsx
   import { useCallback } from "react";
   
   const handleClick = useCallback(() => {
     // handler logic
   }, [dependencies]);
   ```

3. **Use useMemo for expensive calculations:**
   ```tsx
   import { useMemo } from "react";
   
   const processedData = useMemo(() => {
     return expensiveOperation(data);
   }, [data]);
   ```

### Image Optimization

Use Next.js Image component:

```tsx
import Image from "next/image";

<Image 
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // for above-the-fold images
/>
```

## Configuration Management

### Site Configuration

All site-wide settings are in `app/config/site.config.ts`:

```typescript
export const siteConfig = {
  name: "med-tools",
  title: "Site Title",
  description: "Site description",
  mainNav: [
    { label: "Home", href: "/" },
    { label: "Feature", href: "/feature" },
  ],
  sections: [
    {
      id: "feature",
      title: "Feature Title",
      description: "Feature description",
      href: "/feature",
      buttonLabel: "Go to Feature",
      enabled: true,
    },
  ],
};
```

**To add a new section/feature:**
1. Add entry to `mainNav` for header navigation
2. Add entry to `sections` for home page display
3. Create the feature directory in `app/`

## Testing Approach

### Manual Testing

1. **Test responsive design** at different breakpoints (mobile, tablet, desktop)
2. **Test dark mode** - ensure readability in both light and dark themes
3. **Test keyboard navigation** - all interactive elements should be accessible
4. **Test error states** - verify error messages display correctly
5. **Test loading states** - ensure loading indicators work properly

### Browser Testing

- Primary: Chrome, Firefox, Safari
- Ensure compatibility with modern browsers
- Test on both desktop and mobile devices

## Development Workflow

### Before Starting Work

1. Check existing components for reusable patterns
2. Review `globals.css` for available utility classes
3. Check `app/icons/` for available icons
4. Review `siteConfig` for configuration options

### During Development

1. Follow Next.js App Router conventions
2. Co-locate components with their features
3. Use CSS variables for all design tokens
4. Extract reusable logic into hooks or utilities
5. Maintain TypeScript type safety
6. Test in both light and dark mode

### Before Committing

1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure production build succeeds
3. Verify responsive design works correctly
4. Check accessibility with keyboard navigation
5. Review code for clean code practices

## Common Patterns

### Page Component Pattern

```tsx
// app/feature/page.tsx
import FeatureComponent from "./components/FeatureComponent";

export default function FeaturePage() {
  return (
    <main className="container section">
      <h1 className="text-4xl font-bold text-foreground mb-8">
        Feature Title
      </h1>
      <FeatureComponent />
    </main>
  );
}
```

### Form Pattern

```tsx
import { useState } from "react";
import { SuccessIcon, ErrorIcon } from "@/app/icons";

interface FormData {
  field1: string;
  field2: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    field1: "",
    field2: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // submit logic
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="card max-w-lg">
      <input
        type="text"
        value={formData.field1}
        onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg"
        style={{ borderColor: 'var(--border-color)' }}
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>
      
      {status === "success" && (
        <div className="bg-success-light text-success p-4 rounded-lg flex items-center gap-2">
          <SuccessIcon className="w-5 h-5" />
          <p>Success!</p>
        </div>
      )}
    </form>
  );
}
```

### Modal Pattern

```tsx
import { CloseIcon } from "@/app/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-bold">
            {title}
          </h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

## Quick Reference

### File Locations
- Global styles: `app/globals.css`
- Site config: `app/config/site.config.ts`
- Icons: `app/icons/`
- Shared components: `app/components/`
- Feature pages: `app/[feature]/page.tsx`

### Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Production: `npm run start`
- Lint: `npm run lint`

### Key Principles
1. Use CSS variables for all design tokens
2. Co-locate components with their features
3. Import icons from `@/app/icons`
4. Follow TypeScript strict mode
5. Maintain accessibility standards
6. Write clean, readable code
7. Test in both light and dark mode

---

**Remember**: Consistency is key. Follow these guidelines to maintain a clean, maintainable, and accessible codebase.
