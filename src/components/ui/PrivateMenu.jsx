// src/components/Navbar/PrivateMenu.jsx
import { Link } from "react-router-dom";
import { useSessionTimeout } from "../../utils/SessionTimeout";


export default function PrivateMenu({ mobile = false, onLogout }) {

   const { timeLeft, showWarning, formatTime } = useSessionTimeout(120, 10);


  const baseClass = mobile
    ? "block w-full text-center text-black hover:text-pink-600"
    : "hover:text-pink-600 transition-colors duration-200";

  return (
    <>
     <Link to="/dashboard" className={baseClass}>
        Admin Dashboard
      </Link>
      <Link to="/accountdetails" className={baseClass}>
        Account Details
      </Link>
      <Link to="/dashboard" className={baseClass}>
        Admissions
      </Link>
      <Link to="/allreviews" className={baseClass}>
        All Reviews
      </Link>
      <button
        onClick={onLogout}
        className={`${baseClass}  hover:text-red-700 cursor-pointer`}
      >
        Logout
      </button>
          <div className="text-sm">
        ⏳ Session expires in:{" "}
        <span className="text-rose-800">{formatTime(timeLeft)}</span>
      </div>
          {showWarning && (
        <div className="fixed bottom-10 bg-yellow-200 text-yellow-800 px-6 py-3 rounded-lg shadow-lg border border-yellow-400 animate-pulse">
          ⚠️ Your session will expire soon!
        </div>
      )}
    

    </>
  );
}
