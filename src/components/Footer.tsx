export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p className="opacity-80">&copy; {new Date().getFullYear()} LatinDanceFinder</p>
        <nav className="flex flex-wrap gap-4">
          <a className="hover:text-orange-600" href="#">Privacy</a>
          <a className="hover:text-orange-600" href="#">Terms</a>
          <a className="hover:text-orange-600" href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
