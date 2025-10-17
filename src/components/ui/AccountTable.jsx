// src/components/Account/AccountTable.jsx
import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export const AccountTable = ({ accounts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
      <table className="min-w-full border-collapse">
        <thead className="bg-rose-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Sr. No</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Customer Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Total Amount</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Paid Amount</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Paid Date</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Balance</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((acc, index) => {
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
              <tr key={acc.id} className="hover:bg-rose-50 border-b transition-all duration-200">
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 text-gray-800 font-medium">
                  {acc.customerName}
                </td>
                <td className="py-3 px-4 text-gray-700">₹{acc.totalAmount}</td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  ₹{acc.paidAmount}
                </td>
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
          })}
        </tbody>
      </table>
    </div>
  );
};
