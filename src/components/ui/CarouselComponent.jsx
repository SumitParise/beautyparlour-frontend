import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/Home/PosterParlour.png"
import image2 from "../../assets/Home/BeautyProducts.png"
import image3 from "../../assets/Home/Makeup.png"
import image4 from "../../assets/Home/dulhan.jpeg";

// Custom arrows
function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow-md z-10"
    >
      <ChevronRight className="w-6 h-6 text-pink-800" />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow-md z-10"
    >
      <ChevronLeft className="w-6 h-6 text-pink-800" />
    </button>
  );
}

export default function CarouselComponent() {
  const slides = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664301630636-bb4997a86396?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600",
      text: "✨ Experience luxury in every shade of color.",
    },
    {
      image:image4,
      text: "👰 Luxury bridal makeup for your once-in-a-lifetime moment.",
    },
    {
      image: image1,
      text:"💫 Where professional touch meets perfection.",
    },
    {
      image: image2,
      text: "Because your skin deserves the best 💖.",
    },
    {
      image: image3,
      text: "👰 “This wedding season, glow like never before! Book your Bridal Makeup at special rates ✨",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full flex justify-center mt-7">
      <div className="w-full max-w-5xl"> {/* 👈 limits width on big screens */}
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="px-4">
         <div className="overflow-hidden rounded-2xl shadow-md max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
  <img
    src={slide.image}
    alt={`slide-${index}`}
    className="w-full h-full object-cover"
  />
</div>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 text-center leading-relaxed">
                {slide.text}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
