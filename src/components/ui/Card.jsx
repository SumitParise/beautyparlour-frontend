import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Card({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-gray-300 rounded-2xl shadow-md bg-white overflow-hidden">
      {/* Card Heading */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-lg bg-gradient-to-r from-pink-500 to-pink-400 text-white hover:opacity-90 transition-all"
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Card Body */}
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 text-gray-800">
          <ul className="list-none space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                {/* Rounded bullet */}
                <span className="w-2.5 h-2.5 mt-1 bg-pink-400 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
