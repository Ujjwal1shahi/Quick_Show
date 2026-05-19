import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";

const Navbar = () => {
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
    { name: "Favourites", path: "/favourite" },
    ...(user?.role === "admin" ? [{ name: "Admin", path: "/admin" }] : []),
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
    navigate("/login");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-10 lg:px-24">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 shadow-lg shadow-black/20 backdrop-blur-xl md:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <div className="cinema-badge">
            <span>Cinema</span>
            <p>Featured Release</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 px-2 py-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
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
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className={`hidden items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-300 md:flex ${
              showSearch ? "w-64 px-3" : "w-10 px-0"
            }`}
          >
            {showSearch && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                autoFocus
                className="w-full bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-400"
              />
            )}

            <button
              type={showSearch ? "submit" : "button"}
              onClick={() => !showSearch && setShowSearch(true)}
              aria-label="Search movies"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-all duration-300 hover:text-white"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </form>

          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dull hover:shadow-[0_0_18px_rgba(255,0,80,0.35)] sm:px-7"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-bookings")}
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-primary/10 md:flex"
              >
                <TicketPlus className="h-4 w-4" />
                My Bookings
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dull"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 text-lg font-medium text-white">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex w-[80%] items-center rounded-full border border-white/10 bg-white/5 px-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
            <button type="submit">
              <SearchIcon className="h-5 w-5 text-gray-300" />
            </button>
          </form>

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
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

          {user && (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;