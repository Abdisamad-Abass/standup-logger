import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `relative pb-1 transition ${
      isActive
        ? "text-blue-600 dark:text-blue-400 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-[#252A35] bg-white dark:bg-[#0C0E12] backdrop-blur-lg shadow-md transition-all">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center p-4">
        {/* Logo */}
        <div className="font-bold text-xl text-[#004AC6] dark:text-white">
          Standup Logger
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex justify-center items-center gap-8 text-base font-medium">
          <NavLink to="/" className={navClass}>
            Feed
          </NavLink>

          {user?.role === "admin" && (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>

              <NavLink to="/create-user" className={navClass}>
                Create Member
              </NavLink>
            </>
          )}
        </div>

        {/* User & Theme */}
        <div className="hidden md:flex justify-end items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
                flex items-center justify-center
                w-11 h-11 rounded-full
                bg-gray-100 dark:bg-gray-800
                shadow-sm hover:shadow-md hover:scale-105
                transition-all duration-300
              "
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="text-white text-xl" />
            ) : (
              <FiMoon className="text-[#004AC6] text-xl" />
            )}
          </button>

          {/* User Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
              >
                <FiUser className="text-lg" />
                <span className="max-w-[120px] font-medium truncate">
                  {user.name || user.full_name || "User"}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    {user.role}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="
                        flex items-center gap-3 w-full px-4 py-2.5
                        text-sm font-medium
                        text-red-600 dark:text-red-400
                        hover:bg-red-50 dark:hover:bg-red-900/20
                        transition-all duration-200
                      "
                  >
                    <span
                      className="
                        flex items-center justify-center
                        w-8 h-8 rounded-full
                        bg-red-100 dark:bg-red-900/30
                      "
                    >
                      <FiLogOut className="text-red-600 dark:text-red-400" />
                    </span>

                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <NavLink to="/" onClick={closeMenus} className={navClass}>
            Feed
          </NavLink>

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard"
                onClick={closeMenus}
                className={navClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/create-user"
                onClick={closeMenus}
                className={navClass}
              >
                Create Member
              </NavLink>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              flex items-center justify-center
              w-11 h-11 rounded-full
              bg-gray-100 dark:bg-gray-800
              shadow-sm hover:shadow-md hover:scale-105
              transition-all duration-300
            "
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="text-[#004AC6] text-xl" />
            ) : (
              <FiMoon className="text-[#004AC6] text-xl" />
            )}
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={() => {
                logout();
                setUserMenuOpen(false);
              }}
              className="
                flex items-center gap-3 w-full px-4 py-2.5
                text-sm font-medium
                text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                transition-all duration-200
              "
            >
              <span
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  bg-red-100 dark:bg-red-900/30
                "
              >
                <FiLogOut className="text-red-600 dark:text-red-400" />
              </span>

              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
