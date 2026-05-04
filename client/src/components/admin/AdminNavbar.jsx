import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ShieldCheckIcon } from "lucide-react";

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-300/20 bg-black/30 px-6 backdrop-blur-xl md:px-10">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={assets.logo}
          alt="logo"
          className="h-auto w-32 object-contain md:w-36"
        />
      </Link>

      <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
        <ShieldCheckIcon className="h-4 w-4" />
        <span className="hidden text-sm font-medium md:block">
          Admin Panel
        </span>
      </div>
    </header>
  );
};

export default AdminNavbar;