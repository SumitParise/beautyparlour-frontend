import { motion } from "framer-motion";

export default function ProfileCard({ Name,image, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-pink-100 flex flex-col items-center p-6"
    >
      {/* Rounded Image */}
      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-md mb-6">
        <img
          src={image}
          alt="Salon"
          className="w-full h-full object-cover"
        />
        </div>
        <h3 className="text-pink-500 mb-5 underline">{Name}</h3>
      

      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-base text-center">
        {description}
      </p>
    </motion.div>
  );
}
