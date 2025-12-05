import Link from "next/link";
import { siteConfig } from "../config/site.config";

export default function Header() {
  return (
    <header className="w-full bg-primary text-background py-4 px-6 flex flex-col sm:flex-row items-center justify-between shadow-md">
      <div className="text-xl font-bold tracking-tight">
        {siteConfig.name}
      </div>
      <nav className="mt-2 sm:mt-0 flex gap-4">
        {siteConfig.mainNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="w-full text-xs text-center mt-2 sm:hidden">
        {siteConfig.welcomeMessage}
      </div>
    </header>
  );
}
