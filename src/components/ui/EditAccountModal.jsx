import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const EditAccountModal = ({ account, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...account });

  useEffect(() => {
    setFormData({ ...account });
  }, [account]);

  const balanceAmount =
    (parseFloat(formData.totalAmount) || 0) -
    (parseFloat(formData.paidAmount) || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.totalAmount || !formData.paidAmount) {
      alert("Please fill all fields correctly!");
      return;
    }
    onUpdate({
      ...formData,
      totalAmount: balanceAmount,
      paidAmount: parseFloat(formData.paidAmount),
      balanceAmount,
    });
    onClose();
  };

  return (
    <AnimatePresence>
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
            ✏️ Edit Account
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
              name="totalAmount"
              placeholder="Total Amount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full p-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <input
              type="number"
              name="paidAmount"
              placeholder="Paid Amount"
              value={formData.paidAmount}
              onChange={handleChange}
              className="w-full p-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <input
              type="number"
              value={balanceAmount}
              readOnly
              className="w-full p-3 border border-green-400 rounded-xl bg-green-50 text-green-700 font-semibold"
            />

            <div className="flex justify-between mt-4">
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
    </AnimatePresence>
  );
};
