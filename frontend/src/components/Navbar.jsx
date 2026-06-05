import { Link } from "react-router-dom";
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="font-bold text-lg text-gray-800 dark:text-white">
          Standup Logger
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5 text-sm">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Feed
          </Link>

          {user?.role === "admin" && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/create-user"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Create Member
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-gray-700" />
            )}
          </button>

          {/* User Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <FiUser />
                <span className="max-w-[100px] truncate">
                  {user.name || user.full_name || "User"}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    {user.role}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <FiLogOut />
                    Logout
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
          <Link
            to="/"
            onClick={closeMenus}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Feed
          </Link>

          {user?.role === "admin" && (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenus}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/create-user"
                onClick={closeMenus}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Create Member
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              closeMenus();
            }}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
            Toggle Theme
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={() => {
                logout();
                closeMenus();
              }}
              className="text-red-600 flex items-center gap-2"
            >
              <FiLogOut />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
