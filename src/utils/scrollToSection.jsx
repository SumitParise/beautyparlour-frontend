// src/utils/scrollToSection.js
export const scrollToSection = (id, navigate, location) => {
  if (location.pathname !== "/") {
    navigate("/", { replace: true });
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};
