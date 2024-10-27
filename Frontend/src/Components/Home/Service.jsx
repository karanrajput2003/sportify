import React from 'react';
import img7 from '../../assets/5.jpeg';
import img8 from '../../assets/6.jpeg';

function Service() {
  return (
    <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32"> {/* Dark background for contrast */}
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-[#FFDD57]"> {/* Yellow heading color */}
              Elevate Your Corporate Tournament Experience
            </h2>
            <p className="text-[#E5E7EB] text-lg md:text-xl"> {/* Light text color */}
              Discover our exclusive events that offer unique experiences and workshops for sports lovers.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-[#FFDD57] text-[#1B1F3B] rounded-full w-10 h-10 flex items-center justify-center"> {/* Icon background color */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#FFDD57]">Curated Sports Events</h3>
                <p className="text-[#E5E7EB]">
                  Explore our selection of sports events that take you on a journey through flavors.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#FFDD57] text-[#1B1F3B] rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v2"></path>
                  <path d="M13 17v2"></path>
                  <path d="M13 11v2"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#FFDD57]">Effortless Booking</h3>
                <p className="text-[#E5E7EB]">
                  Secure your spot at our sports events effortlessly with our easy-to-use booking system.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#FFDD57] text-[#1B1F3B] rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#FFDD57]">Sports Lovers Community</h3>
                <p className="text-[#E5E7EB]">
                  Connect with fellow sports enthusiasts and share your love for all things sports.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            width="300"
            height="300"
            alt="Feature 1"
            className="rounded-lg object-cover"
            src={img7}
          />
          <img
            width="300"
            height="300"
            alt="Feature 2"
            className="rounded-lg object-cover"
            src={img8}
          />
        </div>
      </div>
    </section>
  );
}

export default Service;
