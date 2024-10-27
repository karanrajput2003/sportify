// src/components/SportsGuidelines.jsx
import React from "react";

const SportsGuidelines = ({ guidelines }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
    <h2 className="text-3xl font-bold mb-4 text-green-600">Event Guidelines</h2>
    <ol className="list-decimal list-inside space-y-2">
      {guidelines.map((guideline, index) => (
        <li key={index}>{guideline}</li>
      ))}
    </ol>
  </div>
);

export default SportsGuidelines;
