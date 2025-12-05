export default function Footer() {
  return (
    <footer className="w-full bg-primary text-background py-4 px-6 flex flex-col sm:flex-row items-center justify-between mt-auto shadow-inner">
      <div className="text-sm">
        © 2025 med-tools. Portfolio personal de herramientas digitales.
      </div>
      <nav className="mt-2 sm:mt-0 flex gap-4">
        {/* Enlaces de ejemplo, reemplaza con los tuyos */}
        <a href="#" className="hover:underline">
          Contacto
        </a>
        <a href="#" className="hover:underline">
          GitHub
        </a>
        <a href="#" className="hover:underline">
          Más herramientas
        </a>
      </nav>
    </footer>
  );
}
