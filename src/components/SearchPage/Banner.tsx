const Banner = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/puppy.jpeg')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-4 drop-shadow-lg">
          Match, Love, Adopt
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl px-4 drop-shadow-md">Find your perfect playmate!</p>
      </div>
    </section>
  );
};

export default Banner;
