import React from "react";
import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
  CrownIcon,
  SparklesIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <aside className="sticky top-16 h-[calc(100vh-64px)] w-full max-w-17.5 overflow-hidden border-r border-white/10 bg-[#09090d]/80 text-sm shadow-2xl shadow-black/30 backdrop-blur-2xl md:max-w-65">
      {/* Background Glow */}
      

      {/* Admin Profile */}
      <div className="relative px-3 pt-7 md:px-5">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt="admin"
                className="h-11 w-11 rounded-2xl object-cover ring-2 ring-primary/50 md:h-14 md:w-14"
              />

              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-primary text-white">
                <CrownIcon className="h-3 w-3" />
              </span>
            </div>

            <div className="hidden min-w-0 md:block">
              <p className="truncate text-base font-semibold text-white">
                {user.firstName} {user.lastName}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                <p className="text-xs text-gray-400">Admin Online</p>
              </div>
            </div>
          </div>

          <div className="mt-4 hidden rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 md:flex md:items-center md:gap-2">
            <SparklesIcon className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              QuickShow Control
            </span>
          </div>
      </div>

      {/* Navigation Links */}
      <nav className="relative mt-6 flex w-full flex-col gap-2 px-3 md:px-4">
        {adminNavlinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-3 py-3.5 font-medium transition-all duration-300 md:justify-start md:px-4 ${
                  isActive
                    ? "border border-primary/30 bg-primary/70 text-white shadow-lg shadow-primary/20"
                    : "border border-transparent text-gray-400 hover:border-white/10 hover:bg-white/6 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute inset-y-2 left-0 w-1 rounded-r-full transition-all duration-300 ${
                      isActive
                        ? "bg-white opacity-100"
                        : "bg-primary opacity-0 group-hover:opacity-70"
                    }`}
                  />

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-gray-400 group-hover:bg-primary/15 group-hover:text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="hidden truncate md:block">{link.name}</span>

                  {isActive && (
                    <span className="ml-auto hidden h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] md:block" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;