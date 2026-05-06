import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import Login from "../pages/Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theater" },
    { name: "Releases", path: "/releases" },
    { name: "Favourites", path: "/favourite" },
  ];

  const closeMenu = () => {
    scrollTo(0, 0);
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-10 lg:px-24">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 shadow-lg shadow-black/20 backdrop-blur-xl md:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          {/* <img
            src={assets.logo}
            alt="logo"
            className="h-auto w-32 object-contain md:w-36"
          /> */}
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
          <button
            type="button"
            aria-label="Search movies"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-white md:flex"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {!user ? (
  <button
    onClick={() => navigate("/login")}
    className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dull hover:shadow-[0_0_18px_rgba(255,0,80,0.35)] sm:px-7"
  >
    Login
  </button>
) : (
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action
        label="My Bookings"
        labelIcon={<TicketPlus width={15} />}
        onClick={() => navigate("/my-bookings")}
      />
    </UserButton.MenuItems>
  </UserButton>
)}

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
            : "invisible opacity-0 pointer-events-none"
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
