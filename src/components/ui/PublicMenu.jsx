// src/components/Navbar/PublicMenu.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PublicMenu({ mobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const baseClass = mobile
    ? "block w-full text-center text-black hover:text-pink-600"
    : "hover:text-pink-600 transition-colors duration-200 cursor-pointer";

  return (
    <>
      <button onClick={() => scrollToSection("Home")} className={baseClass}>
        Home
      </button>
      <button onClick={() => scrollToSection("service")} className={baseClass}>
        Services
      </button>
      <button onClick={() => scrollToSection("about")} className={baseClass}>
        About
      </button>
      <button onClick={() => scrollToSection("reviews")} className={baseClass}>
        Reviews
      </button>
      <Link to="/login" className={baseClass}>
        Login
      </Link>
    </>
  );
}
