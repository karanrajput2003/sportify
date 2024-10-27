// src/components/SportsEventCard.jsx
import React from "react";

const SportsEventCard = ({ title, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
    <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default SportsEventCard;
