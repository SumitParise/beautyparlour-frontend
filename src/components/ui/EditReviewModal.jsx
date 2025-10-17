import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const EditReviewModal = ({ review, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...review });

  useEffect(() => {
    setFormData({ ...review });
  }, [review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, active: !prev.active }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.rating || !formData.comments) {
      alert("Please fill all fields!");
      return;
    }
    onUpdate({ ...formData, rating: parseFloat(formData.rating) });
    onClose();
  };

  return (
    <AnimatePresence>
      {review && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-rose-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-rose-600 mb-4 text-center">
              ✏️ Edit Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full p-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={handleChange}
                min={1}
                max={5}
                className="w-full p-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <textarea
                name="comments"
                placeholder="Comment"
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />

              {/* ✅ Toggle for Active/Inactive */}
              <div className="flex items-center justify-between mt-4">
                <span className="font-medium text-gray-700">
                  Status:{" "}
                  <span
                    className={`${
                      formData.active ? "text-green-600" : "text-red-600"
                    } font-semibold`}
                  >
                    {formData.active ? "Active" : "Inactive"}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    formData.active ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.active ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditReviewModal;
