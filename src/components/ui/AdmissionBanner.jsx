import { motion, useMotionValue, useTransform } from "framer-motion";

export default function AdmissionBanner({ onClick }) {
  const rotate = useMotionValue(0);
  const ropeRotate = useTransform(rotate, [-8, 8], [-5, 5]);
  const ropeCurve = useTransform(rotate, [-8, 8], ["2px", "6px"]); // rope bend

  return (
    <div className="absolute top-0 right-0 md:top-6 md:right-6 flex flex-col items-center cursor-pointer select-none">
      
      {/* Spike / Nail */}
      <div className="w-2 h-2 bg-gray-700 rounded-full mb-1 relative">
        <div className="absolute -top-1 left-1/2 w-0.5 h-4 bg-gray-500 -translate-x-1/2"></div>
      </div>

      {/* Curved Rope */}
      <motion.div
        className="w-1 bg-gray-400 mb-1 origin-top"
        style={{
          rotate: ropeRotate,
          borderRadius: ropeCurve, // subtle bend
          height: "5rem"
        }}
      />

      {/* Swinging Tag */}
      <motion.div
        onClick={onClick}
        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold 
                   rounded-full px-5 py-3 shadow-xl text-center text-sm md:text-base relative"
        style={{ originY: 0, rotate }}
        animate={{ rotate: [-8, 8, -6, 6, -4, 4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="inline-block">🎉 Admission Open</span>

        {/* Moving Shadow */}
        <motion.div
          className="absolute left-1/2 bottom-0 w-20 h-2 bg-black/20 rounded-full filter blur-md -translate-x-1/2"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
