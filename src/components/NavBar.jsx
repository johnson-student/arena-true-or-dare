import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-3 text-base font-medium transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="relative z-50 border-b border-white/5 bg-[#0a0a16]/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-blue-600 text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            TD
          </div>

          <Link
            to="/"
            className="text-sm font-black uppercase tracking-wider text-white sm:text-lg md:text-xl"
            onClick={() => setIsOpen(false)}
          >
            True or Dare
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/game" className={navLinkClass}>Play</NavLink>
          <NavLink to="/how-it-works" className={navLinkClass}>How It Works</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            ACCOUNT
          </button>
          <button className="rounded-md bg-[#9c243a] px-5 py-2 text-sm font-bold transition-all hover:bg-[#b82c46] shadow-[0_4px_15px_rgba(156,36,58,0.4)]">
            SUBSCRIBE
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-white/5 bg-[#0a0a16]/95 px-4 py-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/game" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
              Play
            </NavLink>
            <NavLink to="/how-it-works" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
              How It Works
            </NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
              About Us
            </NavLink>
            <NavLink to="/faq" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
              FAQ
            </NavLink>

            <div className="mt-4 flex flex-col gap-3">
              <button className="w-full rounded-md border border-white/10 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
                ACCOUNT
              </button>
              <button className="w-full rounded-md bg-[#9c243a] py-2 text-sm font-bold transition-all hover:bg-[#b82c46] shadow-[0_4px_15px_rgba(156,36,58,0.4)]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}