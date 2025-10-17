import CarouselComponent from "../ui/CarouselComponent";
import Hero from "../ui/Hero";
import VideoSection from "../ui/Video";

export default function Home() {
  return (

    <section id="Home">
    <div className="font-sans">
      {/* Hero Section */}
      <Hero />

      {/* Video Section */}
      <VideoSection 
        src="/videos/sample-video.mp4" 
        title="What Customer Said About Us 💫"
      />
   
    </div>
    </section>
  );
}
