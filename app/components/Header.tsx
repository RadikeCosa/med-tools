import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-primary text-background py-4 px-6 flex flex-col sm:flex-row items-center justify-between shadow-md">
      <div className="text-xl font-bold tracking-tight">med-tools</div>
      <nav className="mt-2 sm:mt-0 flex gap-4">
        {/* Enlaces de ejemplo, reemplaza con los tuyos */}
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        <Link href="/ESAS" className="hover:underline">
          ESAS
        </Link>
        <Link href="#" className="hover:underline">
          Herramienta 2
        </Link>
      </nav>
      <div className="w-full text-xs text-center mt-2 sm:hidden">
        Bienvenido a med-tools, tu espacio de herramientas digitales.
      </div>
    </header>
  );
}
