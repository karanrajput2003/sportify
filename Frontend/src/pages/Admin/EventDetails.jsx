import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import dayjs from 'dayjs';
import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';
import Navbar from '../../Components/Admin/Navbar';
import img10 from '../../assets/10.jpeg'


function EventDetail() {
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [todayFormatted, setTodayFormatted] = useState('');
    const eventId = window.location.pathname.split('/').pop();

    useEffect(() => {
        setTodayFormatted(dayjs().format('MMM DD, YYYY'));

        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                setError('Failed to fetch event details');
            }
        };
        fetchEvent();
    }, [eventId]);

    const calculateDaysLeft = (endDate) => {
        const today = dayjs();
        const eventEnd = dayjs(endDate);
        const daysLeft = eventEnd.diff(today, 'day');
        return daysLeft > 0 ? `${daysLeft} days left` : 'Registration closed';
    };

    if (error) return <div>{error}</div>;
    if (!event) return <div>Loading...</div>;

    return (
        <>
        <Navbar />
        <section className="bg-[#1B1F3B] min-h-screen py-12">
            <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-8">
                {/* Left Section */}
                <div className="flex-1 bg-[#222854] p-8 rounded-lg shadow-lg text-[#E5E7EB]">
                    <div className="flex items-center mb-6">
                        {event.logo && (
                            <img
                                src={event.logo}
                                alt={event.eventTitle || 'Event Logo'}
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-[#FFDD57]">{event.eventTitle}</h1>
                            <p className="text-gray-300">{event.venue}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-400 mb-6">
                        <FaMapMarkerAlt />
                        <p>{event.venue}</p>
                        <FaCalendarAlt />
                        <p>Updated On: {todayFormatted}</p>
                        <FaGlobe />
                        <a href={event.website} className="text-[#FFDD57] hover:underline" target="_blank" rel="noopener noreferrer">
                            Official website
                        </a>
                    </div>

                    <div className="inline-block bg-[#FFDD57] text-[#1F2937] py-1 px-3 rounded-full mb-6">
                        {event.eventCategory}
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 text-[#FFDD57]">About the Event</h2>
                    <p className="leading-relaxed">{event.aboutEvent}</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Participation Info</h2>
                    <p>Participation Type: {event.participationType}</p>
                    <p>Number of Participants Allowed: {event.noOfParticipation}</p>
                    <p>Payment Details: {event.payment}</p>

                    {/* Event Dates */}
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Event Dates</h2>
                    <div className="flex items-center space-x-3 text-gray-400 mb-2">
                        <FaCalendarAlt />
                        <p>Start Date: {dayjs(event.startDate).format('MMM DD, YYYY, h:mm A')}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400">
                        <FaCalendarAlt />
                        <p>End Date: {dayjs(event.endDate).format('MMM DD, YYYY, h:mm A')}</p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Contact the Organisers</h2>
                    <div className="bg-[#2C314E] p-4 rounded-lg">
                        <p className="font-semibold">Helpdesk</p>
                        <p>{event.contactEmail}</p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-1/3 bg-[#222854] p-8 rounded-lg shadow-lg">
                    {/* <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-[#FFDD57]">{event.payment}</h3>
                    </div>
                    <button className="w-full bg-[#FFDD57] text-[#1F2937] py-3 font-semibold rounded-lg hover:bg-[#E5B200] transition">
                        Register
                    </button> */}

                    <div className="mt-6 space-y-4 text-[#E5E7EB]">
                        <div className="flex items-center space-x-3">
                            <FaUsers className="text-xl" />
                            <p className="text-sm font-medium">Registered:3 <span className="font-bold">{event.registeredCount}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaUsers className="text-xl" />
                            <p className="text-sm font-medium">Team Size: 1<span className="font-bold">{event.teamSize}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaGlobe className="text-xl" />
                            <p className="text-sm font-medium">Impressions:2 <span className="font-bold">{event.impressions}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaClock className="text-xl" />
                            <p className="text-sm font-medium">Registration Deadline: <span className="font-bold">{calculateDaysLeft(event.endDate)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default EventDetail;
















// import React, { useEffect, useState } from "react";

// const EventOverview = ({ event }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
//     <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
//     <p className="text-gray-700 mb-4">{event.description}</p>
//     <div className="text-gray-600">
//       <p><strong>Start Date:</strong> {event.startDate}</p>
//       <p><strong>End Date:</strong> {event.endDate}</p>
//       <p><strong>Location:</strong> {event.venue}</p>
//       <p><strong>Participation Fee:</strong> ${event.fee}</p>
//     </div>
//   </div>
// );

// const SportsGuidelines = () => (
//   <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
//     <h2 className="text-3xl font-bold mb-4 text-green-600">Cricket Guidelines</h2>
//     <ol className="list-decimal list-inside space-y-2">
//       <li>Wear appropriate cricket attire, including pads, gloves, and a helmet.</li>
//       <li>Always warm up before practice or matches to prevent injuries.</li>
//       <li>Respect the umpire's decisions at all times.</li>
//       <li>Practice good sportsmanship, win or lose.</li>
//       <li>Communicate clearly with teammates on the field.</li>
//       <li>Know the rules of the game and stay updated on any changes.</li>
//       <li>Stay hydrated during matches and practice sessions.</li>
//       <li>Keep the playing area clean and dispose of waste properly.</li>
//       <li>Be punctual for training sessions and matches.</li>
//       <li>Have fun and enjoy the game!</li>
//     </ol>
//   </div>
// );

// const JobDetails = ({ event }) => (
//   <div className="bg-white shadow-md rounded-lg p-6">
//     <div className="mb-4">
//       <h1 className="text-2xl font-bold">Event Coordinator - {event.year}</h1>
//       <p className="text-gray-600">Location: {event.location}</p>
//       <p className="text-gray-500">Updated On: {event.lastUpdated}</p>
//       <a href={event.officialPage} className="text-blue-500 hover:underline">
//         Official Event Page
//       </a>
//     </div>
//     <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" disabled>
//       Application Closed
//     </button>
//     <div className="mt-4 text-gray-700">
//       <p className="font-semibold">Applied: {event.applied}</p>
//       <p className="font-semibold">Impressions: {event.impressions}</p>
//       <p className="font-semibold">Application Deadline: {event.deadline}</p>
//     </div>
//   </div>
// );

// const Sponsors = ({ size, sponsors }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
//   const handlePrevious = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1));

//   useEffect(() => {
//     const interval = setInterval(handleNext, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`bg-white shadow-lg rounded-lg p-6 ${size}`}>
//       <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
//       <div className="relative w-full h-48 overflow-hidden">
//         <div className="w-full h-full transition-transform duration-500 flex" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//           {sponsors.map((sponsor, index) => (
//             <div key={index} className="w-full flex-shrink-0">
//               <img src={sponsor.src} alt={sponsor.alt} className="object-contain w-full h-full" />
//             </div>
//           ))}
//         </div>
//         <button onClick={handlePrevious} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
//           &#8249;
//         </button>
//         <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
//           &#8250;
//         </button>
//       </div>
//       <div className="text-center mt-2 text-gray-700 font-medium">{sponsors[currentIndex].label}</div>
//     </div>
//   );
// };

// const EventDetails = ({ event }) => (
//   <div className="min-h-screen bg-gray-100">
//     <JobDetails event={event} />
//     <div className="grid grid-cols-3 gap-4 p-4">
//       <div className="col-span-3">
//         <EventOverview event={event} />
//       </div>
//       <SportsGuidelines className="col-span-1" />
//       <div className="col-span-2 grid grid-cols-2 gap-4">
//         <Sponsors size="w-full h-full" sponsors={event.sponsors} />
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-2">Prizes and Awards</h2>
//           <p className="text-gray-700 mb-4">{event.prizes}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default EventDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SportsEventCard from '../../Components/Admin/SportsEventCard';
// import SportsGuidelines from "../../Components/Admin/SportsGuidelines";
// import JobDetails from "../../Components/Admin/JobDetails";
// import SponsorCarousel from "../../Components/Admin/SponsorCarousel";

// const EventDetail = ({ eventId }) => {
//   const [event, setEvent] = useState('671d0c00499aad771ff49dc3');

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
//         setEvent(response.data);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       }
//     };
//     fetchEvent();
//   }, [eventId]);

//   if (!event) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <JobDetails event={event} />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//         <div className="col-span-1">
//           <SportsEventCard title={event.title} description={event.description} />
//         </div>
//         <div className="col-span-1 md:col-span-2">
//           <SponsorCarousel sponsors={event.sponsors} />
//           <SportsGuidelines guidelines={event.guidelines} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

// function EventDetail() {
//     const [event, setEvent] = useState(null);

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/events/671d0c00499aad771ff49dc3'); // replace `eventId` with actual ID
//                 setEvent(response.data);
//             } catch (error) {
//                 console.error('Error fetching event:', error);
//             }
//         };
//         fetchEvent();
//     }, []);

//     const calculateDaysLeft = (endDate) => {
//         const today = dayjs();
//         const eventEnd = dayjs(endDate);
//         const daysLeft = eventEnd.diff(today, 'day');
//         return daysLeft > 0 ? `${daysLeft} days left` : 'Registration closed';
//     };

//     if (!event) return <div>Loading...</div>;

//     return (
//         <section className="bg-gray-100 min-h-screen py-10">
//             <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-6">
//                 {/* Left Section */}
//                 <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
//                     {/* Event Logo */}
//                     <div className="flex items-center mb-6">
//                         <img
//                             src={event.logo}
//                             alt={event.eventTitle}
//                             className="w-16 h-16 object-cover rounded-md mr-4"
//                         />
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-800">{event.eventTitle}</h1>
//                             <p className="text-gray-500">{event.venue}</p>
//                         </div>
//                     </div>
                    
//                     {/* Event Meta Info */}
//                     <div className="flex items-center space-x-4 text-gray-600 mb-6">
//                         <FaMapMarkerAlt />
//                         <p>Online</p>
//                         <FaCalendarAlt />
//                         <p>Updated On: {dayjs().format('MMM DD, YYYY')}</p>
//                         <FaGlobe />
//                         <a href="#" className="text-blue-500 hover:underline">Official website</a>
//                     </div>
                    
//                     {/* Event Type */}
//                     <div className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full mb-6">
//                         {event.eventCategory}
//                     </div>

//                     {/* About Event */}
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-2">About the Event</h2>
//                     <p className="text-gray-600 leading-relaxed">{event.aboutEvent}</p>

//                     {/* Tabs Section */}
//                     <div className="mt-8 border-t pt-4 flex space-x-4 text-gray-500">
//                         <button className="text-blue-600 border-b-2 border-blue-600">Stages & Timeline</button>
//                         <button>Details</button>
//                         <button>Dates & Deadlines</button>
//                         <button>Prizes</button>
//                         <button>Reviews</button>
//                         <button>FAQs & Discussions</button>
//                     </div>
//                 </div>

//                 {/* Right Sidebar */}
//                 <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-md">
//                     {/* Registration Status */}
//                     <div className="text-center mb-4">
//                         <h3 className="text-2xl font-bold text-gray-800">Free</h3>
//                     </div>
//                     <button className="w-full bg-blue-600 text-white py-3 font-semibold rounded-lg hover:bg-blue-700 transition">
//                         Register
//                     </button>
                    
//                     {/* Statistics */}
//                     <div className="mt-6 space-y-4">
//                         <div className="flex items-center text-gray-600 space-x-3">
//                             <FaUsers className="text-xl" />
//                             <p className="text-sm font-medium">Registered: <span className="font-bold">58,072</span></p>
//                         </div>
//                         <div className="flex items-center text-gray-600 space-x-3">
//                             <FaUsers className="text-xl" />
//                             <p className="text-sm font-medium">Team Size: <span className="font-bold">1 - 4 Members</span></p>
//                         </div>
//                         <div className="flex items-center text-gray-600 space-x-3">
//                             <FaGlobe className="text-xl" />
//                             <p className="text-sm font-medium">Impressions: <span className="font-bold">44,58,501</span></p>
//                         </div>
//                         <div className="flex items-center text-gray-600 space-x-3">
//                             <FaClock className="text-xl" />
//                             <p className="text-sm font-medium">Registration Deadline: <span className="font-bold">{calculateDaysLeft(event.endDate)}</span></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default EventDetail;


