// src/components/SponsorCarousel.jsx
import React, { useEffect, useState } from "react";

const SponsorCarousel = ({ sponsors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
  const handlePrevious = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1));

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
      <div className="relative w-full h-48 overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-500 flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sponsors.map((sponsor, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={sponsor.logoUrl} alt={sponsor.name} className="object-contain w-full h-full" />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        >
          &#8250;
        </button>
      </div>
      <div className="text-center mt-2 text-gray-700 font-medium">{sponsors[currentIndex].name}</div>
    </div>
  );
};

export default SponsorCarousel;
