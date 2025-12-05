import { siteConfig } from "./config/site.config";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-8 py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-foreground text-center mb-2 font-sans">
        {siteConfig.title}
      </h1>
      <p className="text-lg text-foreground text-center font-sans mb-4">
        {siteConfig.description}
      </p>
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-center sm:flex-wrap">
        {siteConfig.sections.map((section) => (
          section.enabled ? (
            <Link
              key={section.id}
              href={section.href}
              className="btn btn-primary"
            >
              {section.buttonLabel}
            </Link>
          ) : (
            <span
              key={section.id}
              className="btn btn-secondary opacity-60 cursor-not-allowed"
              aria-disabled="true"
            >
              {section.buttonLabel}
            </span>
          )
        ))}
      </div>
      
      {/* Section Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {siteConfig.sections
          .filter((section) => section.enabled)
          .map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="card hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-muted text-sm">{section.description}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
