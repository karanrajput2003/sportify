import React from 'react';
import { Link } from 'react-router-dom';
import Img1 from '../../assets/1.jpeg';
import Img2 from '../../assets/2.jpeg';
import Img3 from '../../assets/3.jpeg';
import Img4 from '../../assets/4.jpeg';

function MainContent() {
  return (
    <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-[#FFDD57] sm:text-5xl md:text-6xl lg:text-7xl">
            Join the Ultimate Corporate Sports Tournament
          </h1>
          <p className="text-[#E5E7EB] text-lg md:text-xl">
            Compete, collaborate, and celebrate with your colleagues! Register your team and challenge others across exciting sports and games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/user/events" 
              className="inline-flex items-center justify-center text-sm font-medium transition-colors bg-[#FFDD57] text-[#1F2937] hover:bg-[#E5B200] h-12 rounded-md px-6 w-full sm:w-auto shadow-lg"
            >
              Reserve Your Spot
            </Link>
            <Link 
              to="/user/myevents" 
              className="inline-flex items-center justify-center text-sm font-medium transition-colors border border-[#FFDD57] text-[#FFDD57] hover:bg-[#FFDD57] hover:text-[#1F2937] h-12 rounded-md px-6 w-full sm:w-auto shadow-lg"
            >
             My Events
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            width="300"
            height="300"
            alt="Soccer Match"
            className="rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
            src={Img1}
          />
          <img
            width="300"
            height="300"
            alt="Basketball Tournament"
            className="rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
            src={Img2}
          />
          <img
            width="300"
            height="300"
            alt="Table Tennis"
            className="rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
            src={Img3}
          />
          <img
            width="300"
            height="300"
            alt="Team Relay Race"
            className="rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
            src={Img4}
          />
        </div>
      </div>
      <div className="py-8 md:py-16"></div> {/* Added spacing for better layout */}
      <br />
    </section>
  );
}

export default MainContent;
