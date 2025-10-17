import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import ReviewCard from "../ui/ReviewCard";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: "",
    rating: 0,
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [nameError, setNameError] = useState("");

  // ✅ Fetch all reviews when component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://beautyparlourapi-f3a3beedh5fke2ge.centralindia-01.azurewebsites.net/api/Feedback/list"
        );
        setReviews(response.data || []);
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Carousel auto-slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  // ✅ Handle star click
  const handleStarClick = (index) => {
    setNewReview({ ...newReview, rating: index + 1 });
  };

  // ✅ Handle name change with live validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]*$/; // allows letters and spaces

    if (!nameRegex.test(value)) {
      setNameError("Only letters and spaces are allowed.");
    } else if (value.trim().length > 0 && value.trim().length < 2) {
      setNameError("Name must be at least 2 characters long.");
    } else {
      setNameError("");
    }

    setNewReview((prev) => ({ ...prev, customerName: value }));
  };

  // ✅ Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.customerName || !newReview.rating || !newReview.comments) {
      alert("Please fill all fields before submitting.");
      return;
    }

    if (nameError || newReview.customerName.trim().length < 3) {
      setNameError("Please enter a valid name before submitting.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://beautyparlourapi-f3a3beedh5fke2ge.centralindia-01.azurewebsites.net/api/Feedback",
        null,
        {
          params: {
            customerName: newReview.customerName.trim(),
            rating: newReview.rating,
            comments: newReview.comments.trim(),
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const updated = await axios.get(
          "https://beautyparlourapi-f3a3beedh5fke2ge.centralindia-01.azurewebsites.net/api/Feedback/list"
        );
        setReviews(updated.data || []);
        setNewReview({ customerName: "", rating: 0, comments: "" });
        setShowForm(false);
        alert("✅ Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("❌ Error submitting review. Check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reviews"
      className="bg-gradient-to-b from-white to-rose-50 py-16 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-700 mb-12">Reviews</h2>

        {/* Loading Spinner */}
        {fetching ? (
          <p className="text-gray-500 animate-pulse">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to add one!
          </p>
        ) : (
          <div className="relative flex items-center justify-center perspective-1000 h-[350px]">
            {reviews.map((review, index) => {
              const offset = (index - current + reviews.length) % reviews.length;
              const isCenter = offset === 0;
              const isLeft =
                offset === 1 || (current === 0 && index === reviews.length - 1);
              const isRight =
                offset === reviews.length - 1 ||
                (current === reviews.length - 1 && index === 0);

              let transform = "";
              let zIndex = 0;
              let opacity = 0.5;

              if (isCenter) {
                transform = "translateX(0px) scale(1.1) rotateY(0deg)";
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transform = "translateX(-260px) scale(0.9) rotateY(15deg)";
                zIndex = 20;
              } else if (isRight) {
                transform = "translateX(260px) scale(0.9) rotateY(-15deg)";
                zIndex = 20;
              } else {
                transform = "translateX(0px) scale(0.8)";
                zIndex = 10;
              }

              return (
                <ReviewCard
                  key={index}
                  review={review}
                  isCenter={isCenter}
                  transform={transform}
                  opacity={opacity}
                  zIndex={zIndex}
                />
              );
            })}
          </div>
        )}

        {/* Add Review Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-7 w-12 h-12 flex items-center justify-center text-3xl font-bold text-pink-600 border-2 border-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            {showForm ? "−" : "+"}
          </button>
        </div>

        <h5 className="text-pink-700 border-pink-400 block text-center">
          Add Your Review
        </h5>

        {/* Popup Form */}
        <AnimatePresence>
          {showForm && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md z-50 border border-pink-200"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 transition cursor-pointer"
                >
                  <X size={24} />
                </button>

                <h3 className="text-2xl font-semibold text-pink-700 mb-4">
                  Add Your Review
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={newReview.customerName}
                      onChange={handleNameChange}
                      className={`w-full border ${
                        nameError ? "border-red-500" : "border-pink-300"
                      } rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none`}
                    />
                    {nameError && (
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        onClick={() => handleStarClick(i)}
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                          i < newReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comments */}
                  <textarea
                    placeholder="Your Review"
                    value={newReview.comments}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        comments: e.target.value,
                      }))
                    }
                    className="border border-pink-300 bg-pink-50 rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-pink-400 outline-none"
                  />

                  <button
                    type="submit"
                    disabled={loading || nameError}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-semibold disabled:opacity-70"
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
