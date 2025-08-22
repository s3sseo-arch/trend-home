import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar bg-gray-800 text-white py-2 px-4 text-center lg:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-xs sm:text-sm">
            📍 Sigmaringerstraße 24 Showroom: Max-Eyth-Str. 19B 71332 Waiblingen
          </div>
          <div className="text-xs sm:text-sm">
            📞 Rufen Sie uns jetzt an +49 (0) 179 74 25361
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="../img/logo_banner.jpg"
                alt="Trend Home Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                    isActive ? "text-teal-500" : ""
                  }`
                }
              >
                STARTSEITE
              </NavLink>
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                    isActive ? "text-teal-500" : ""
                  }`
                }
              >
                ÜBER UNS
              </NavLink>
              <NavLink
                to="/Shop"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                    isActive ? "text-teal-500" : ""
                  }`
                }
              >
                SHOP
              </NavLink>
              <NavLink
                to="/kontakt"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                    isActive ? "text-teal-500" : ""
                  }`
                }
              >
                KONTAKT
              </NavLink>
              {/* <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                    isActive ? "text-teal-500" : ""
                  }`
                }
              >
                ADMIN
              </NavLink> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-teal-500 focus:outline-none"
              >
                {isOpen ? (
                  // Close icon
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-sm px-4 pb-4 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                  isActive ? "text-teal-500" : ""
                }`
              }
            >
              STARTSEITE
            </NavLink>
            <NavLink
              to="/About"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                  isActive ? "text-teal-500" : ""
                }`
              }
            >
              ÜBER UNS
            </NavLink>
            <NavLink
              to="/Shop"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                  isActive ? "text-teal-500" : ""
                }`
              }
            >
              SHOP
            </NavLink>
            <NavLink
              to="/kontakt"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                  isActive ? "text-teal-500" : ""
                }`
              }
            >
              KONTAKT
            </NavLink>
            {/* <NavLink
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 hover:text-teal-500 font-medium transition-colors ${
                  isActive ? "text-teal-500" : ""
                }`
              }
            >
              ADMIN
            </NavLink> */}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
