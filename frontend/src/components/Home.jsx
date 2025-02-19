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
        className="mt-8 md:mt-12 bg-black  md:h-screen md:py-[5rem] relative"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="md:h-screen h-[50vh] left-0 top-0 w-full absolute bg-black/70" />

        {/* Carousel */}
        <div className="z-10 flex justify-between items-center h-full relative">
          {/* Left Arrow */}
          <div
            className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/30 hover:bg-white/50 w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center text-white cursor-pointer z-20"
            onClick={moveLeft}
            aria-label="Move to previous image"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm sm:text-xl" />
          </div>

          {/* Image Container */}
          <div className="overflow-hidden w-full">
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
                  className="h-[50vh] sm:h-[80vh] w-full object-contain rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-white/30 hover:bg-white/50 w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center text-white cursor-pointer z-20"
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
