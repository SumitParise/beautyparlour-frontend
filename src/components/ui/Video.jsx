export default function VideoSection({ src, title }) {
  return (
    <section className="my-12 px-6 flex justify-center">
      <div className="max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
        <video 
          src={src} 
          controls 
          className="w-full h-auto rounded-xl"
          poster="/path-to-poster.jpg" // optional
        />
        {title && <h3 className="text-l font-light p-4">{title}</h3>}
      </div>
    </section>
  );
}
