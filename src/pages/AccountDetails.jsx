import React, { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { AddAccountModal } from "../components/ui/AddAccountModal";
import { EditAccountModal } from "../components/ui/EditAccountModal";
import api from "../utils/api";

export const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [error, setError] = useState("");

  // ✅ Function to fetch accounts
  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/Account/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // ✅ Add account
  const handleAddAccount = async (newAccount) => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/Account", newAccount, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccounts(); // refetch after adding
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add account");
    }
  };

  // ✅ Update account
  const handleUpdateAccount = async (updatedAccount) => {
    try {
      const token = localStorage.getItem("token");
  console.log("Updating account:", updatedAccount);


      await api.post(`/Account/update`, updatedAccount, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccounts(); // refetch after updating
      setEditAccount(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update account");
    }
  };

  // ✅ Delete account
  const handleDelete = async (id) => {
    if (!id) return alert("Account ID missing!");
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const token = localStorage.getItem("token");
        await api.post(`/Account/delete?id=${id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAccounts(); // refetch after deletion
      } catch (err) {
        console.error(err);
        alert("Failed to delete account");
      }
    }
  };

  if (loading) return <p className="p-6 text-center">Loading accounts...</p>;

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">💼 Account Details</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-rose-600 transition-all duration-300"
        >
          <PlusCircle size={18} /> Add Record
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-rose-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Sr. No</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Customer Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Total Amount</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Paid Amount</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Paid Date</th>
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
                  <td className="py-3 px-4 text-gray-800 font-medium">{acc.customerName}</td>
                  <td className="py-3 px-4 text-gray-700">₹{acc.totalAmount}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">₹{acc.paidAmount}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {formattedDate} <span className="text-gray-400 text-sm ml-1">{formattedTime}</span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => setEditAccount(acc)}
                      className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(acc.accountID || acc.id)}
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

      {showAddModal && <AddAccountModal onClose={() => setShowAddModal(false)} onAdd={handleAddAccount} />}
      {editAccount && <EditAccountModal account={editAccount} onClose={() => setEditAccount(null)} onUpdate={handleUpdateAccount} />}
    </div>
  );
};
