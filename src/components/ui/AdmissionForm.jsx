import { useState } from "react";
import { Eye } from "lucide-react";
import api from "../../utils/api";

export default function AdmissionForm({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    MobileNo: "",
    Address: "",
    Email: "",
    OTP: "",
    documents: {
      PassPortPhoto: null,
      AadhaarCard: null,
      RationCard: null,
      LeavingCertificate: null,
    },
  });

  const [errors, setErrors] = useState({
    Name: "",
    MobileNo: "",
    Address: "",
    Email: "",
    OTP: "",
    documents: "",
  });

  const nameRegex = /^[A-Za-z ]+$/;
  const mobileRegex = /^[1-9][0-9]{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate field while typing
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "Name":
        if (!value) error = "Full Name is required";
        else if (!nameRegex.test(value)) error = "Only letters and spaces allowed";
        break;
      case "Email":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "MobileNo":
        if (!value) error = "Mobile number is required";
        else if (!mobileRegex.test(value))
          error = "Enter valid 10-digit mobile number (cannot start with 0)";
        break;
      case "Address":
        if (!value) error = "Address is required";
        else if (value.trim().length < 20)
          error = "Address must be at least 20 characters";
        break;
      case "OTP":
        if (!value) error = "OTP is required";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleDocumentChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg"].includes(ext)) {
        alert("Only JPG/JPEG files are allowed!");
        e.target.value = null;
        return;
      }
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [name]: file },
      }));
      setErrors((prev) => ({ ...prev, documents: "" }));
    }
  };

  // Send OTP API
  const sendOtp = async () => {
    const email = formData.Email;
    if (!email.match(emailRegex)) return alert("Enter a valid Email.");
    setLoading(true);
    try {
      await api.post("/Admission/getotp", null, { params: { email } });
      alert("OTP sent to your email!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Submit Form API
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    ["Name", "MobileNo", "Address", "Email", "OTP"].forEach((field) => {
      if (!validateField(field, formData[field])) valid = false;
    });

    if (Object.values(formData.documents).some((file) => file === null)) {
      setErrors((prev) => ({ ...prev, documents: "Please upload all required documents" }));
      valid = false;
    }

    if (!valid) return;

    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("MobileNo", formData.MobileNo);
    data.append("Address", formData.Address);
    data.append("Email", formData.Email);
    data.append("OTP", formData.OTP);
    data.append("PassPortPhoto", formData.documents.PassPortPhoto);
    data.append("AadhaarCard", formData.documents.AadhaarCard);
    data.append("RationCard", formData.documents.RationCard);
    data.append("LeavingCertificate", formData.documents.LeavingCertificate);

    // Debugging: log all FormData before sending
    console.log("FormData being sent:");
    for (let [key, value] of data.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    setLoading(true);
    try {
      await api.post("/Admission/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully!");
      onClose();

      // Reset form
      setFormData({
        Name: "",
        MobileNo: "",
        Address: "",
        Email: "",
        OTP: "",
        documents: {
          PassPortPhoto: null,
          AadhaarCard: null,
          RationCard: null,
          LeavingCertificate: null,
        },
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Form submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ✕
        </button>

        <h3 className="text-3xl font-bold mb-6 text-pink-600 text-center">Admission Form</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <input
              type="text"
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.Name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            {errors.Name && <span className="text-red-500 text-sm">{errors.Name}</span>}
          </div>

          {/* Email + Get OTP */}
          <div className="flex gap-2 items-center">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className={`flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.Email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            <button
              type="button"
              onClick={sendOtp}
              className="px-4 py-2 rounded bg-pink-500 hover:bg-rose-500 text-white transition"
            >
              Get OTP
            </button>
          </div>
          {errors.Email && <span className="text-red-500 text-sm">{errors.Email}</span>}

          {/* OTP */}
          <div className="flex flex-col">
            <input
              type="text"
              name="OTP"
              placeholder="Enter OTP"
              value={formData.OTP}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.OTP ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            {errors.OTP && <span className="text-red-500 text-sm">{errors.OTP}</span>}
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <input
              type="text"
              name="MobileNo"
              placeholder="Mobile Number"
              value={formData.MobileNo}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                errors.MobileNo ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            {errors.MobileNo && <span className="text-red-500 text-sm">{errors.MobileNo}</span>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <textarea
              name="Address"
              placeholder="Address"
              value={formData.Address}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 resize-none ${
                errors.Address ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-pink-400"
              }`}
            />
            {errors.Address && <span className="text-red-500 text-sm">{errors.Address}</span>}
          </div>

          {/* Documents */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Upload Documents (JPG/JPEG only):</p>
            {["PassPortPhoto", "AadhaarCard", "RationCard", "LeavingCertificate"].map((doc) => (
              <div key={doc} className="flex items-center gap-3">
                <label className="flex-1 flex flex-col text-gray-600 text-sm">
                  {doc.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  <input
                    type="file"
                    name={doc}
                    accept=".jpg,.jpeg"
                    onChange={handleDocumentChange}
                    required
                  />
                </label>
                {formData.documents[doc] && (
                  <button
                    type="button"
                    onClick={() => window.open(URL.createObjectURL(formData.documents[doc]), "_blank")}
                    className="text-pink-600 hover:text-pink-800 p-2 border rounded-full transition"
                    title="Preview"
                  >
                    <Eye size={20} />
                  </button>
                )}
              </div>
            ))}
            {errors.documents && <span className="text-red-500 text-sm">{errors.documents}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-pink-500 text-white font-bold py-2 rounded transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
