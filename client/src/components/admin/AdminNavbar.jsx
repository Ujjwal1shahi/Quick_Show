import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MenuIcon, ShieldCheckIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theater" },
    { name: "Releases", path: "/releases" },
  ];

  const closeMenu = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setShowSearch(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300/20 bg-black/30 px-4 py-3 backdrop-blur-xl md:px-8">
      <nav className="flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <div className="cinema-badge">
            <span>Cinema</span>
            <p>Featured Release</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/admin"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_0_18px_rgba(255,0,80,0.35)]"
                    : "text-gray-300 hover:bg-primary/10 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Admin Badge */}
          <div className="hidden items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary md:flex">
            <ShieldCheckIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Admin Panel</span>
          </div>

          {/* Login / Logout */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dull md:block"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dull md:block"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-7 text-lg font-medium text-white">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <XIcon className="h-6 w-6" />
          </button>

          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
            <ShieldCheckIcon className="h-4 w-4" />
            <span className="text-sm">Admin Panel</span>
          </div>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex w-[82%] items-center rounded-full border border-white/10 bg-white/5 px-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />

            <button type="submit" aria-label="Search movies">
              <SearchIcon className="h-5 w-5 text-gray-300" />
            </button>
          </form>

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/admin"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-full px-8 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-primary/10 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/my-bookings");
                  setIsOpen(false);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-white"
              >
                My Bookings
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full bg-primary px-8 py-3 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="rounded-full bg-primary px-8 py-3 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
