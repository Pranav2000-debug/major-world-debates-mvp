import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-black shadow-lg p-4 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          MWD.ai
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-white font-semibold">
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition-colors duration-300">
            About Us
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-yellow-400 transition-colors duration-300">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-red-400 transition-colors duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:text-yellow-400 transition-colors duration-300">
                Sign Up
              </Link>
              <Link to="/login" className="hover:text-yellow-400 transition-colors duration-300">
                Login
              </Link>
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
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white hover:bg-gray-800 rounded transition">
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white hover:bg-gray-800 rounded transition">
            About Us
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white hover:bg-gray-800 rounded transition">
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white hover:bg-gray-800 rounded transition">
                Sign Up
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-white hover:bg-gray-800 rounded transition">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
