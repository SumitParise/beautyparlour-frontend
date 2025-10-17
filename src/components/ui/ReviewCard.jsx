import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewCard({ review, isCenter, transform, opacity, zIndex }) {
  return (
    <motion.div
      animate={{ transform, opacity }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ zIndex }}
      className={`absolute ${
        isCenter
          ? "bg-gradient-to-br from-pink-50 to-pink-100 shadow-2xl scale-110 relative overflow-hidden"
          : "bg-white shadow-md scale-95"
      } rounded-2xl border border-pink-200 p-6 w-[300px] md:w-[350px] transition-all`}
    >
      {/* Shimmer for center card */}
      {isCenter && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 bg-pink-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-slow" />
        </div>
      )}

      {/* Description */}
      <p className="text-indigo-300 italic mb-4 text-sm md:text-base relative z-10">
        “{review.comment}”
      </p>

      {/* Stars */}
      <div className="flex justify-center mb-2 relative z-10">
        {[...Array(review.ratings)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Name */}
      <h4 className="text-white font-semibold relative z-10">{review.customerName}</h4>
    </motion.div>
  );
}
