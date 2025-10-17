import CardsContainer from "./CardContainer";
import AdmissionBanner from "../ui/AdmissionBanner";
import AdmissionForm from "../ui/AdmissionForm";
import { useState } from "react";

export default function Services() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="service" className="p-6 space-y-4 text-center mb-16 relative">
      <h2 className="text-4xl md:text-5xl font-bold py-7 text-pink-700 tracking-wide">
        Servi<span className="text-rose-500">ces</span>
      </h2>

      {/* Admission Banner */}
      <AdmissionBanner onClick={() => setIsFormOpen(true)} />

      {/* Cards */}
      <CardsContainer />

      {/* Admission Form Popup */}
      {isFormOpen && <AdmissionForm onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}
