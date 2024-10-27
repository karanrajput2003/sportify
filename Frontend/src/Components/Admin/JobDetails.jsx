// src/components/JobDetails.jsx
import React from "react";

const JobDetails = ({ event }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4">
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-500">Updated On: {new Date(event.lastUpdated).toLocaleDateString()}</p>
      <a href={event.officialPage} className="text-blue-500 hover:underline">
        Official Event Page
      </a>
    </div>
    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" disabled>
      Application Closed
    </button>
    <div className="mt-4 text-gray-700">
      <p className="font-semibold">Applied: {event.applied}</p>
      <p className="font-semibold">Impressions: {event.impressions}</p>
      <p className="font-semibold">Application Deadline: {new Date(event.deadline).toLocaleString()}</p>
    </div>
  </div>
);

export default JobDetails;
