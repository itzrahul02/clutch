import React, { useEffect, useState } from "react";
import image1 from "../assets/g1.png";
import image2 from "../assets/g2.jpg";
import image4 from "../assets/g4.png";
import image11 from "../assets/g11.png";
import image12 from "../assets/g12.jpg";
import image14 from "../assets/g14.png";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import wallpaper from "../assets/wp3.jpg";
import { Register } from "./Registration";
import "./Home.css";

function Home() {
  const images = [image1, image4, image2, image11, image12, image14];
  const [move, setMove] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setMove((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const moveLeft = () => {
    setMove((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const moveRight = () => {
    setMove((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <Nav/>
      <div
        className="mt-14 md:mt-16 bg-black min-h-[50vh] md:min-h-screen md:py-[5rem] relative flex items-center"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* Carousel */}
        <div className="z-10 flex justify-between items-center h-full w-full relative">
          {/* Left Arrow */}
          <div
            className="absolute left-2 sm:left-6 p-2 sm:p-3 rounded-full bg-black/50 border border-white/20 hover:bg-red-600/80 hover:border-red-500 w-10 sm:w-14 h-10 sm:h-14 flex justify-center items-center text-white cursor-pointer z-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            onClick={moveLeft}
            aria-label="Move to previous image"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm sm:text-xl" />
          </div>

          {/* Image Container */}
          <div className="overflow-hidden w-full px-4 sm:px-16">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${move * 100}%)`,
              }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  className="h-[40vh] sm:h-[70vh] w-full object-contain flex-shrink-0 drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                />
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4 sm:mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setMove(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === move ? 'bg-red-500 w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-2 sm:right-6 p-2 sm:p-3 rounded-full bg-black/50 border border-white/20 hover:bg-red-600/80 hover:border-red-500 w-10 sm:w-14 h-10 sm:h-14 flex justify-center items-center text-white cursor-pointer z-20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            onClick={moveRight}
            aria-label="Move to next image"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-sm sm:text-xl" />
          </div>
        </div>
      </div>
      <Register />
    </>
  );
}

export default Home;
