// src/components/EventDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SportsEventCard from "./SportsEventCard";
import SportsGuidelines from "./SportsGuidelines";
import JobDetails from "./JobDetails";
import SponsorCarousel from "./SponsorCarousel";

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <JobDetails event={event} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="col-span-1">
          <SportsEventCard title={event.title} description={event.description} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <SponsorCarousel sponsors={event.sponsors} />
          <SportsGuidelines guidelines={event.guidelines} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
