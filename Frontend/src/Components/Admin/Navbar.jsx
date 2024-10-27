import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Fixed navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 lg:px-6 h-16 flex items-center justify-between bg-[#1B1F3B]">
        <Link className="flex items-center" to="/">
          <span className="text-[#FFDD57] font-bold text-2xl">Sportify</span>
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          onClick={toggleMenu}
          className="block lg:hidden p-2 focus:outline-none"
          aria-label="Menu"
        >
          <svg
            className="h-6 w-6 text-[#FFDD57]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 ml-auto">
          {['Dashboard', 'Events', 'Leaderboard','Registrations','Analytics','Logout'].map((item) => (
            <Link 
              key={item} 
              to={`/admin/${item.toLowerCase()}`} 
              className="text-sm font-medium text-[#FFDD57] hover:underline underline-offset-4 transition duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="lg:hidden absolute top-16 left-0 w-full shadow-lg bg-[#1B1F3B] transition duration-300">
            <ul className="flex flex-col items-center gap-4 p-4">
              {['Dashboard', 'Events', 'Leaderboard','Registrations','Analytics','Logout'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/admin/${item.toLowerCase()}`} 
                    className="text-sm font-medium text-[#FFDD57] hover:underline transition duration-200"
                    onClick={() => setIsOpen(false)} // Close the menu when an item is clicked
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Add padding to the body or main content to avoid overlapping with the fixed navbar */}
      <div className="pt-16"></div>
    </>
  );
}

export default Navbar;
