import { NavLink , Link } from "react-router-dom";
export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `transition-colors ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`;

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#0a0a16]/70 border-b border-white/5 md:px-12">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          SL
        </div>
        <Link to="/" className="text-xl font-black tracking-wider uppercase cursor-pointer ">
          Spin Legends
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/game" className={navLinkClass}>
          Play
        </NavLink>
        <NavLink to="/how-it-works" className={navLinkClass}>
          How It Works
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About Us
        </NavLink>
        <NavLink to="/faq" className={navLinkClass}>
          FAQ
        </NavLink>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
          ACCOUNT
        </button>
        <button className="px-5 py-2 text-sm font-bold bg-[#9c243a] hover:bg-[#b82c46] rounded-md transition-all shadow-[0_4px_15px_rgba(156,36,58,0.4)]">
          SUBSCRIBE
        </button>
      </div>
    </nav>
  );
}