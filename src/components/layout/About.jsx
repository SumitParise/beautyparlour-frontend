import ProfileCard from "../ui/ProfileCard";
import ShrutiImage from "../../assets/About/Shrutika_Parise.jpg"
import VinaImage from "../../assets/About/Vina_Parise.jpg"


export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-rose-50 py-16 text-gray-800"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-pink-700 tracking-wide">
          About <span className="text-rose-500">Us</span>
        </h2>

        {/* Description (optional intro paragraph) */}
        <p className="max-w-3xl mx-auto mb-12 text-gray-600 text-lg leading-relaxed">
          At <span className="font-semibold text-pink-600">Shrutika Beauty Parlour</span>, 
          we blend elegance and expertise to deliver a relaxing beauty experience. 
          Every service is crafted to make you look and feel your best.
        </p>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <ProfileCard
            Name="Mrs. Vina Parise"
            image={VinaImage}
            description="Hi, I’m Vina Parise! 🌸
          With 15+ years in the beauty industry, I love helping my customers look and feel their best ✨
          I specialize in bridal makeup, hair styling, and various facial treatments 💄💇‍♀️💆‍♀️, creating personalized looks that enhance your natural beauty 🌿
          Known for my friendly and approachable nature, I make every customer feel comfortable, confident, and special 💖."
          />

          <ProfileCard
          Name="Dr. Shrutika Parise"
            image={ShrutiImage}
            description="Hi, I’m Dr. Shrutika Parise 🌸
          I assist my mother and guide customers with hair & skincare routines 💇‍♀️💆‍♀️✨
          Combining my Doctorate & beauty expertise, I provide expert advice for radiant skin and healthy hair with products 🌿💄
          To make every customer feel special and confident 💖."
          />
        </div>
      </div>

    </section>
  );
}
