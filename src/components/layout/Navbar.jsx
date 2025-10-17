// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PublicMenu from "../ui/PublicMenu";
import PrivateMenu from "../ui/PrivateMenu";
import { AuthService } from "../../auth/authService";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-black tracking-wide cursor-pointer"
          >
            <span className="text-blue-700">Shrutika</span>
            Beauty<span className="text-pink-600">Parlour</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-black font-medium">
            {isLoggedIn ? (
              <PrivateMenu onLogout={handleLogout} />
            ) : (
              <PublicMenu />
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          {isLoggedIn ? (
            <PrivateMenu mobile onLogout={handleLogout} />
          ) : (
            <PublicMenu mobile />
          )}
        </div>
      )}
    </nav>
  );
}
