import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // 👈 import icons
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 login toggle
  const [showForgotPassword, setShowForgotPassword] = useState(false); // 👈 forgot password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 confirm toggle

  // ✅ Handle login form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Login submit (backend integration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 
      
          const payload = {
      Email: form.email, // 👈 capitalize to match DTO
      Password: form.password,
    };
     console.log(payload);

      const res = await axios.post("https://localhost:7055/api/Auth/login", payload);

      if (res.data) {
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  // ✅ Forgot Password Input Handler
  const handleForgotChange = (e) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
    setError("");
  };

  // ✅ Forgot Password Submit Handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (forgotForm.password !== forgotForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {     

      const res = await axios.post("https://localhost:7055/api/Auth/forget-password", {
        email: forgotForm.email,
        ConfirmPassword:forgotForm.confirmPassword,
        Password: forgotForm.password,
      });
      if (res.data) {
        alert("Password reset successful!");
        setShowForgot(false);
      } else {
        setError(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError("Error resetting password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-rose-200 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-gray-800 z-10 relative"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-rose-600">
          🌸 Welcome Admin 🌸
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3 font-medium">
            {error}
          </p>
        )}

        {/* ✅ Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 mt-1 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          {/* 👁️ Password with eye toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-rose-500 text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full relative bg-rose-500 text-white py-3 rounded-xl font-semibold overflow-hidden hover:bg-rose-600 transition-all duration-300 shimmer-button"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-300 via-white to-pink-300 opacity-30 animate-shimmer"></span>
            <span className="relative z-10">Login</span>
          </motion.button>
        </form>

        <p className="mt-2 text-[9px] sm:text-[10px] italic text-blue-500 font-serif">
          <span className="font-semibold not-italic text-rose-500">
            Disclaimer:
          </span>{" "}
          Login Page only for Admins..!
        </p>
      </motion.div>

      {/* ✅ Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black backdrop-blur-sm z-20"
              onClick={() => setShowForgot(false)}
            ></motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed z-30 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
                onClick={() => setShowForgot(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-center mb-4 text-rose-600">
                Reset Password 🌸
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Enter your email and new password
              </p>

              <form onSubmit={handleForgotSubmit} className="space-y-5">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={forgotForm.email}
                    onChange={handleForgotChange}
                    className="w-full p-3 mt-1 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />

                  <label className="block text-sm font-medium text-gray-600">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showForgotPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your new password"
                      value={forgotForm.password}
                      onChange={handleForgotChange}
                      className="w-full p-3 mt-1 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(!showForgotPassword)}
                      className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                    >
                      {showForgotPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <label className="block text-sm font-medium text-gray-600">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      value={forgotForm.confirmPassword}
                      onChange={handleForgotChange}
                      className="w-full p-3 mt-1 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-all duration-300"
                >
                  Reset Password
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
