import React, { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import EditReviewModal from "../components/ui/EditReviewModal";
import api from "../utils/api";

export const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch reviews on mount
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Feedback/admin/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);


const handleUpdateReview = async (updatedReview) => {
  try {
    const token = localStorage.getItem("token");

    // Convert object to query string
    const queryString = new URLSearchParams({
      feedbackID: updatedReview.feedbackID,
      customerName: updatedReview.customerName,
      rating: updatedReview.rating,
      comments: updatedReview.comments,
      isActive: updatedReview.active ?"true":"false", // 👈 include active state
    }).toString();

    // Send POST request with query string
    const res = await api.post(`/Feedback/update?${queryString}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Refresh updated data
    await fetchReviews();
    setEditReview(null);
  } catch (err) {
    console.error(err);
    alert("Failed to update review");
  }
};



  // Delete review
  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
    await api.post(
  `/Feedback/delete`,
  null, // body is null since ID is in query
  {
    headers: { Authorization: `Bearer ${token}` },
    params: { id }, // query param
  }
);

        setReviews(reviews.filter((r) => r.id !== id));
        fetchReviews();
      } catch (err) {
        console.error(err);
        alert("Failed to delete review.");
      }
    }
  };

  // Toggle active state
  const handleToggleActive = async (id) => {
    try {
      console.log(id.feedbackID);
      
      const res = await api.post(`/Feedback/updateisactive?feedbackID=${id.feedbackID}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle active state.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading reviews...</p>;

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">📝 All Reviews</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-rose-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Sr. No</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Customer Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Rating</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Comment</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Active</th>
              <th className="py-3 px-4 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={review.id}
                className="hover:bg-rose-50 border-b transition-all duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium text-blue-500">{review.customerName}</td>
                <td className="py-3 px-4 text-fuchsia-500">{review.ratings}</td>
                <td className="py-3 px-4 text-green-700">{review.comment}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleToggleActive(review)}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                      review.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        review.active ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button
                    onClick={() => setEditReview(review)}
                    className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.feedbackID)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Edit Review Modal */}
      {editReview && (
      <EditReviewModal
        review={editReview}
        onClose={() => setEditReview(null)}
        onUpdate={handleUpdateReview}
      />
    )}

    </div>
  );
};

export default AllReviews;
