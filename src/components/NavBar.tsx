import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Find Groups", href: "#discover" },
    { label: "Create Group", href: "#create" },
    { label: "How it works", href: "#how" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-extrabold tracking-tight text-lg">
          LatinDanceFinder
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((n) => (
            <li key={n.label}>
              <a className="hover:text-orange-600 transition-colors" href={n.href}>{n.label}</a>
            </li>
          ))}
          <li>
            <a
              href="#create"
              className="inline-flex items-center border border-gray-300 hover:border-orange-600 hover:text-orange-600 rounded-lg px-3 py-1.5 transition-colors"
            >
              Get started
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-orange-600 transition-colors"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-black" />
            <span className="block h-0.5 w-5 bg-black" />
            <span className="block h-0.5 w-5 bg-black" />
          </div>
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <ul className="px-4 py-3 space-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#create"
                onClick={() => setOpen(false)}
                className="block text-center border rounded-lg px-3 py-2 hover:bg-gray-50"
              >
                Get started
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
