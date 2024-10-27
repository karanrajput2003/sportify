import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Admin/Navbar';

function AllEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const calculateDaysLeft = (endDate) => {
        const today = dayjs();
        const eventEnd = dayjs(endDate);
        const daysLeft = eventEnd.diff(today, 'day');
        return daysLeft > 0 ? `${daysLeft} days left` : 'Registration closed';
    };

    return (
        <>
            <Navbar />
            <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32 min-h-screen">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-5xl font-extrabold text-center text-[#FFDD57] mb-12 tracking-wide">
                        Upcoming Events
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event) => (
                            <div 
                                key={event._id} 
                                className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2"
                            >
                                <div className="relative">
                                    {/* Use the logo from the event data */}
                                    <img
                                        src={event.logo} // Using the Base64 image string directly from the event
                                        alt={event.eventTitle}
                                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                                    />
                                    <span className="absolute top-2 right-2 bg-[#FFDD57] text-[#1F2937] font-bold px-2 py-1 rounded-md shadow-lg text-sm uppercase">
                                        {calculateDaysLeft(event.endDate)}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-3xl font-semibold text-[#FFDD57] mb-3">{event.eventTitle}</h2>
                                    <p className="text-[#A0AEC0] text-lg mb-2">
                                        <span className="font-semibold text-[#E5E7EB]">Venue:</span> {event.venue}
                                    </p>
                                    <p className="text-[#A0AEC0] text-lg mb-2">
                                        <span className="font-semibold text-[#E5E7EB]">Participation Fee:</span> ${event.payment}
                                    </p>
                                    <p className="text-[#A0AEC0] text-lg">
                                        <span className="font-semibold text-[#E5E7EB]">Deadline:</span> <span className="text-red-500">{calculateDaysLeft(event.endDate)}</span>
                                    </p>
                                </div>
                                <Link to={`/admin/eventdetails/${event._id}`}>
                                    <button className="mt-4 bg-[#FFDD57] text-[#1B1F3B] font-semibold py-2 px-4 rounded-md w-full hover:bg-[#E5B200] transition duration-300 ease-in-out">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AllEvents;
