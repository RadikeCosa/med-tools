import { siteConfig } from "../config/site.config";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-background py-4 px-6 flex flex-col sm:flex-row items-center justify-between mt-auto shadow-inner">
      <div className="text-sm">
        © {siteConfig.year} {siteConfig.name}. Portfolio personal de herramientas digitales.
      </div>
      <nav className="mt-2 sm:mt-0 flex gap-4">
        {siteConfig.footerNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:underline transition-opacity"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
