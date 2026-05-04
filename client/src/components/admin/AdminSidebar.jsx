import React from "react";
import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
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
    <aside className="h-[calc(100vh-64px)] w-full max-w-14 md:max-w-60 border-r border-gray-300/20 bg-black/20 backdrop-blur-sm text-sm">
      {/* Admin Profile */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <img
          src={user.imageUrl}
          alt="admin"
          className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/40 md:h-14 md:w-14"
        />

        <p className="mt-3 hidden text-base font-medium text-white md:block">
          {user.firstName} {user.lastName}
        </p>

        <p className="mt-1 hidden text-xs text-gray-400 md:block">
          Admin Panel
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex w-full flex-col gap-1">
        {adminNavlinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `relative flex items-center gap-3 py-3.5 text-gray-400 transition-all duration-300 md:pl-9 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "hover:bg-primary/10 hover:text-white"
                } max-md:justify-center`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />

                  <span className="hidden font-medium md:block">
                    {link.name}
                  </span>

                  {isActive && (
                    <span className="absolute right-0 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-l-full bg-primary" />
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