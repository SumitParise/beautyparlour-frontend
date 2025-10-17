import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function AccountRow({ acc, index, onEdit, onDelete }) {
  const date = new Date(acc.paidDate);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr className="hover:bg-rose-50 border-b transition-all duration-200">
      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
      <td className="py-3 px-4 text-gray-800 font-medium">{acc.customerName}</td>
      <td className="py-3 px-4 text-gray-700">₹{acc.totalAmount}</td>
      <td className="py-3 px-4 text-green-600 font-semibold">₹{acc.paidAmount}</td>
      <td className="py-3 px-4 text-gray-600">
        {formattedDate}
        <span className="text-gray-400 text-sm ml-1">{formattedTime}</span>
      </td>
      <td
        className={`py-3 px-4 font-semibold ${
          acc.balanceAmount > 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        ₹{acc.balanceAmount}
      </td>
      <td className="py-3 px-4 flex justify-center gap-3">
        <button
          onClick={() => onEdit(acc.id)}
          className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(acc.id)}
          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
