export default function Home() {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-8 py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-foreground text-center mb-2 font-sans">
        Bienvenido a med-tools
      </h1>
      <p className="text-lg text-foreground text-center font-sans mb-4">
        Este proyecto personal reúne herramientas digitales para practicar y
        mostrar habilidades técnicas. Explora, prueba y personaliza las
        utilidades según tus necesidades.
      </p>
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-center">
        {/* Placeholder de enlaces principales, edítalos según tu portfolio */}
        <a
          href="/ESAS"
          className="bg-primary text-background rounded-full px-6 py-3 text-base font-medium text-center hover:bg-accent transition-colors"
        >
          Test ESAS
        </a>
        <a
          href="#"
          className="bg-secondary text-foreground rounded-full px-6 py-3 text-base font-medium text-center hover:bg-primary hover:text-background transition-colors"
        >
          Herramienta 2
        </a>
      </div>
    </section>
  );
}
