import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const resourceLinks = [
    { name: "Movies", path: "/movies" },
    { name: "Tickets", path: "/movies" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Favourites", path: "/favourite" },
    { name: "Movie Details", path: "/movies" },
  ];

  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/" },
    { name: "Vision", path: "/" },
    { name: "Privacy Policy", path: "/" },
    { name: "Contact Us", path: "/" },
  ];

  const socialLinks = [
    {
      name: "X",
      icon: (
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      ),
    },
    {
      name: "Github",
      icon: (
        <>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </>
      ),
      stroke: true,
    },
    {
      name: "Linkedin",
      icon: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
      stroke: true,
    },
    {
      name: "Youtube",
      icon: (
        <>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </>
      ),
      stroke: true,
    },
    {
      name: "Instagram",
      icon: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </>
      ),
      stroke: true,
    },
  ];

  return (
    <footer className="relative mt-40 overflow-hidden bg-black px-4 pt-16">
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-pink-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1350px] overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#111113]/90 px-5 py-10 text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-8 md:px-14 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-3">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-pink-500 to-red-500 shadow-[0_0_24px_rgba(255,0,100,0.45)] transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-[2px] rounded-2xl bg-black/70 backdrop-blur-sm" />

                <svg
                  className="relative z-10 ml-0.5 h-5 w-5 fill-white text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <div className="flex flex-col leading-none">
                <h2 className="text-2xl font-extrabold tracking-wide text-white">
                  Quick<span className="text-primary">Show</span>
                </h2>
                <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-gray-400">
                  Movie Booking
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-6 text-gray-400">
              QuickShow helps you book movie tickets faster with a smooth,
              modern platform for browsing movies, showtimes, seats, and
              bookings in just a few clicks.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <span className="text-primary">✉</span>
                <span>support@quickshow.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-primary">📍</span>
                <span>India</span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-white hover:shadow-[0_0_16px_rgba(255,0,100,0.25)]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={item.stroke ? "none" : "currentColor"}
                    stroke={item.stroke ? "currentColor" : "none"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Get the App
              </h3>

              <div className="flex flex-col gap-3">
                <img
                  src={assets.googlePlay}
                  alt="Google Play"
                  className="h-11 w-fit cursor-pointer rounded-lg transition-all duration-300 hover:-translate-y-1 hover:opacity-80"
                />

                <img
                  src={assets.appStore}
                  alt="App Store"
                  className="h-11 w-fit cursor-pointer rounded-lg transition-all duration-300 hover:-translate-y-1 hover:opacity-80"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Resources
              </h3>

              <ul className="space-y-3 text-sm text-gray-400">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => scrollTo(0, 0)}
                      className="transition-all duration-300 hover:pl-1 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h3>

              <ul className="space-y-3 text-sm text-gray-400">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => scrollTo(0, 0)}
                      className="transition-all duration-300 hover:pl-1 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 QuickShow. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/" className="hover:text-primary">
              Terms
            </Link>
            <Link to="/" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>

        <div className="relative mt-8 flex items-center justify-center">
          <div className="absolute bottom-0 h-32 w-full max-w-3xl rounded-full bg-primary/50 blur-[120px]" />

          <h3 className="select-none text-center text-[clamp(3.5rem,14vw,14rem)] font-black leading-none text-transparent opacity-50 [-webkit-text-stroke:1px_#7f1d1d]">
            QuickShow
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;