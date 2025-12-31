import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { isAuthenticated, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive ? "bg-yellow-400 text-black" : "text-white hover:bg-gray-700"
    }`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2 rounded transition ${
      isActive ? "bg-yellow-400 text-black" : "text-white hover:bg-gray-800"
    }`;
  };

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleMobileLinkClick = (callback) => {
    setIsOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <nav className="bg-black shadow-lg p-4 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-extrabold text-white tracking-wide">
          MWD.ai
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4 text-white font-semibold">
          <NavLink to="/" className={getLinkClass("/")}>
            Home
          </NavLink>
          <NavLink to="/about" className={getLinkClass("/about")}>
            About Us
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={getLinkClass("/profile")}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signup" className={getLinkClass("/signup")}>
                Sign Up
              </NavLink>
              <NavLink to="/login" className={getLinkClass("/login")}>
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-white">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-black shadow-lg rounded-lg p-2">
          <NavLink
            to="/"
            onClick={() => handleMobileLinkClick()}
            className={getMobileLinkClass("/")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => handleMobileLinkClick()}
            className={getMobileLinkClass("/about")}
          >
            About Us
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => handleMobileLinkClick()}
                className={getMobileLinkClass("/profile")}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleMobileLinkClick(handleLogout);
                }}
                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={() => handleMobileLinkClick()}
                className={getMobileLinkClass("/signup")}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => handleMobileLinkClick()}
                className={getMobileLinkClass("/login")}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
