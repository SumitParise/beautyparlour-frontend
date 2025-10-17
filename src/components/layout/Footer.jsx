import { Youtube, Instagram, X,Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1732722606178-a4f40b1a9253?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      ></div>

      {/* Overlay with Blur & Dark Tint */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Address & Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-blue-400">Shrutika</span>
            <span className="text-gray-200">Beauty</span>
            <span className="text-pink-400">Parlour</span>
          </h2>
          <p className="text-gray-200">✨ Where elegance meets style ✨</p>

          <p className="mt-3 text-sm sm:text-base">
            📍 Bade Plot, Panchdhara Road Pulgaon <br /> Maharashtra 442302
          </p>
          <p className="text-sm sm:text-base">📞 +91 7620296443</p>
        </div>

        {/* Map */}
        <div className="w-full h-52 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d233.2366070249458!2d78.31533065869536!3d20.718924538406906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1759735256989!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start md:items-end space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://youtube.com/@shrutikabeautyparlour?si=ugvEdEN05GKh6rik" target="_blank" className="hover:text-pink-400"><Youtube /></a>
            <a href="https://www.instagram.com/shrutikaparlour?utm_source=qr&igsh=dG16a3NheHZzZ3F2" 
            target="_blank"
            className="hover:text-pink-400"><Instagram /></a>
          </div>
        </div>
      </div>


{/* Bottom Bar */}
<div className="relative z-10 text-center py-3">
  <p className="text-xs sm:text-sm">
    &copy; {currentYear} Shrutika Beauty Parlour. All rights reserved.
    <p className="mt-0.5 text-[9px] sm:text-[10px] italic text-blue-300 font-serif flex items-center justify-center gap-1">
      Designed & Developed by{" "}
      <span className="font-semibold not-italic text-rose-500 flex items-center gap-2 relative">
        Sumit Parise
        <motion.a
          href="mailto:sumitparise49@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          animate={{
            x: [0, -4, 4, -4, 0],       // left-right movement
            y: [0, -2, 0, -2, 0],       // subtle bounce
            rotate: [0, -10, 10, -10, 0] // slight rotation
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="text-rose-500 hover:text-rose-400"
        >
          <Mail color="green" className="w-4 h-4" />
        </motion.a>
      </span>
    </p>
  </p>
</div>

    </footer>
  );
}
