import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try{
     const {data} = await axios.post("/api/owner/change-role")
     if(data.success){
      setIsOwner(true);
      toast.success(data.message)
     }
     else{
      toast.error(data.message)
     }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div
      className={`relative z-50 border-b border-border-subtle
      ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
    >
      {/* NAVBAR BAR */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 text-gray-600">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-0 group">
          <img
            src={assets.logo}
            alt="Rent a Car Logo"
            className="w-10 md:w-12 object-contain block relative right-[8px]"
          />
          <span className="text-2xl font-semibold text-heading tracking-tight ml-[-5px] transition-colors duration-300 group-hover:text-primary ">
            Rent a Car
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`transition hover:text-primary
              ${location.pathname === link.path && "text-primary font-medium"}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 border border-border-subtle px-3 rounded-full max-w-56">
            <input
              type="text"
              placeholder="Search cars"
              aria-label="Search"
              className="py-1.5 w-full bg-transparent outline-none
              placeholder:text-gray-500 placeholder:text-sm"
            />
            <img src={assets.search_icon} alt="search" />
          </div>

          {/* Buttons */}
          <button onClick={() => isOwner ? navigate("/owner"): changeRole()} className="cursor-pointer">
            {isOwner ? "  Dashboard" : "List cars"}
          </button>

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* MOBILE TOGGLE (No Search Icon, just Menu) */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <img src={assets.menu_icon} alt="menu" />
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR (Always Visible on Mobile) */}
      <div className="block md:hidden bg-white px-6 pb-4 pt-0 border-b border-border-subtle">
        <div className="flex items-center gap-2 border border-border-subtle px-3 rounded-full w-full">
          <input
            type="text"
            placeholder="Search cars"
            className="py-1.5 w-full bg-transparent outline-none placeholder:text-gray-500 placeholder:text-sm"
          />
          <img src={assets.search_icon} alt="search" />
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-full bg-white
        px-6 py-4 transition-transform duration-300 z-50 shadow-lg
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* MOBILE MENU HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-heading tracking-tighter whitespace-nowrap">
              Rent a Car
            </span>
          </div>
          <button onClick={() => setOpen(false)} className="cursor-pointer">
            <img src={assets.close_icon} alt="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-lg
              ${location.pathname === link.path && "text-primary font-medium"}`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              navigate("/owner");
              setOpen(false);
            }}
            className="text-left text-lg cursor-pointer"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setShowLogin(true);
              setOpen(false);
            }}
            className="cursor-pointer px-6 py-2 bg-primary text-white rounded-lg w-fit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
