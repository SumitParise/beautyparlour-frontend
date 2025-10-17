import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useSessionTimeout - Custom hook for session timeout
 * @param {number} duration - Total session duration in seconds
 * @param {number} warningTime - Time in seconds to show warning
 */
export const useSessionTimeout = (duration = 300, warningTime = 10) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showWarning, setShowWarning] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show warning
  useEffect(() => {
    setShowWarning(timeLeft <= warningTime && timeLeft > 0);
  }, [timeLeft, warningTime]);

  // Reset timer on user activity
  useEffect(() => {
    const resetTimer = () => setTimeLeft(duration);

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [duration]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return { timeLeft, showWarning, handleLogout, formatTime };
};
