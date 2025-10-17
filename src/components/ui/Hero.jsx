import CarouselComponent from "./CarouselComponent";

export default function Hero() {
  return (
    <section className="relative bg-royalWhite text-royalBlack min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
      {/* Title */}
<h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide relative overflow-hidden leading-tight">
  <span className="relative inline-block gradient-text shine-effect">
    Shrutika Beauty Parlour
  </span>
</h1>

<div className="mt-7 w-full max-w-md mx-auto px-5 sm:px-0">
  <CarouselComponent />
</div>


    </section>
  );
}
