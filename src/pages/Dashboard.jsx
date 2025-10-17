import React, { useState } from "react";
import { useSessionTimeout } from "../utils/SessionTimeout";
import RegisterAdminModal from "../components/ui/RegisterAdmin";

export default function Dashboard() {
  const { timeLeft, showWarning, handleLogout, formatTime } = useSessionTimeout(120, 10);
  const [showModal, setShowModal] = useState(false);

  const handleRegister = (formData) => {
    // TODO: Call your API to register new admin
    console.log("Registering admin:", formData);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
      <h1 className="text-3xl font-bold text-rose-600 mb-4">
        🎉 Welcome to the Admin Dashboard 🎉
      </h1>

      <div className="text-xl mb-4 text-rose-700 font-semibold">
        ⏳ Session expires in: <span className="text-rose-800">{formatTime(timeLeft)}</span>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 mt-5 mb-5 bg-green-500 text-white rounded-xl hover:bg-green-700 transition-all duration-300"
      >
        Register New Admin
      </button>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all duration-300"
      >
        Logout
      </button>

      {showWarning && (
        <div className="fixed bottom-10 bg-yellow-200 text-yellow-800 px-6 py-3 rounded-lg shadow-lg border border-yellow-400 animate-pulse">
          ⚠️ Your session will expire soon!
        </div>
      )}

      {/* Register Modal */}
      <RegisterAdminModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegister}
      />
    </div>
  );
}
