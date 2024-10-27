// import React, { useEffect, useState } from 'react'; 
// import axios from 'axios';
// import dayjs from 'dayjs';
// import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';
// import Navbar from '../../Components/Admin/Navbar';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearUser } from '../../store/userSlice';
// import RegistrationForm from '../User/User_Register';

// function User_EventDetails() {
//     const dispatch = useDispatch();
//     const { userId, role, email } = useSelector((state) => state.user);

//     const [event, setEvent] = useState(null);
//     const [error, setError] = useState(null);
//     const [todayFormatted, setTodayFormatted] = useState('');
//     const [isFormVisible, setFormVisible] = useState(false); // State to control form visibility
//     const eventId = window.location.pathname.split('/').pop();

//     useEffect(() => {
//         setTodayFormatted(dayjs().format('MMM DD, YYYY'));

//         const fetchEvent = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
//                 setEvent(response.data);
//             } catch (error) {
//                 setError('Failed to fetch event details');
//             }
//         };
//         fetchEvent();
//     }, [eventId]);

//     const calculateDaysLeft = (endDate) => {
//         const today = dayjs();
//         const eventEnd = dayjs(endDate);
//         const daysLeft = eventEnd.diff(today, 'day');
//         return daysLeft > 0 ? `${daysLeft} days left` : 'Registration closed';
//     };

//     if (error) return <div>{error}</div>;
//     if (!event) return <div>Loading...</div>;

//     return (
//         <>
//         <Navbar />
//         <section className="bg-[#1B1F3B] min-h-screen py-12">
//             <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-8">
//                 {/* Left Section */}
//                 <div className="flex-1 bg-[#222854] p-8 rounded-lg shadow-lg text-[#E5E7EB]">
//                     <div className="flex items-center mb-6">
//                         {event.logo && (
//                             <img
//                                 src={event.logo}
//                                 alt={event.eventTitle || 'Event Logo'}
//                                 className="w-16 h-16 object-cover rounded-md mr-4"
//                             />
//                         )}
//                         <div>
//                             <h1 className="text-3xl font-bold text-[#FFDD57]">{event.eventTitle}</h1>
//                             <p className="text-gray-300">{event.venue}</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center space-x-4 text-gray-400 mb-6">
//                         <FaMapMarkerAlt />
//                         <p>{event.venue}</p>
//                         <FaCalendarAlt />
//                         <p>Updated On: {todayFormatted}</p>
//                         <FaGlobe />
//                         <a href={event.website} className="text-[#FFDD57] hover:underline" target="_blank" rel="noopener noreferrer">
//                             Official website
//                         </a>
//                     </div>

//                     <div className="inline-block bg-[#FFDD57] text-[#1F2937] py-1 px-3 rounded-full mb-6">
//                         {event.eventCategory}
//                     </div>

//                     <h2 className="text-2xl font-semibold mb-2 text-[#FFDD57]">About the Event</h2>
//                     <p className="leading-relaxed">{event.aboutEvent}</p>

//                     <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Participation Info</h2>
//                     <p>Participation Type: {event.participationType}</p>
//                     <p>Number of Participants Allowed: {event.noOfParticipation}</p>
//                     <p>Payment Details: {event.payment}</p>

//                     {/* Event Dates */}
//                     <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Event Dates</h2>
//                     <div className="flex items-center space-x-3 text-gray-400 mb-2">
//                         <FaCalendarAlt />
//                         <p>Start Date: {dayjs(event.startDate).format('MMM DD, YYYY, h:mm A')}</p>
//                     </div>
//                     <div className="flex items-center space-x-3 text-gray-400">
//                         <FaCalendarAlt />
//                         <p>End Date: {dayjs(event.endDate).format('MMM DD, YYYY, h:mm A')}</p>
//                     </div>

//                     <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Registration</h2>
//                     <p className="text-gray-400">{calculateDaysLeft(event.endDate)}</p>
//                     <button onClick={() => setFormVisible(true)} className="mt-4 bg-[#FFDD57] text-[#1F2937] py-2 px-4 rounded">
//                         Register
//                     </button>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex-1 bg-[#222854] p-8 rounded-lg shadow-lg text-[#E5E7EB]">
//                     {/* Organizer details or contact info can be displayed here */}
//                     <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Registration</h2>
//                     <p className="text-gray-400">{calculateDaysLeft(event.endDate)}</p>
//                     <button onClick={() => setFormVisible(true)} className="mt-4 bg-[#FFDD57] text-[#1F2937] py-2 px-4 rounded">
//                         Register
//                     </button>
//                 </div>
//             </div>

//             {/* Registration Form */}
//             {isFormVisible && <RegistrationForm eventId={eventId} onClose={() => setFormVisible(false)} />}
//         </section>
//         </>
//     );
// }

// export default User_EventDetails;


import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import dayjs from 'dayjs';
import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';
import Navbar from '../../Components/Admin/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import RegistrationForm from '../User/User_Register';
import img10 from '../../assets/10.jpeg'


function User_EventDetails() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { userId, role, email } = useSelector((state) => state.user);
    const [isFormVisible, setFormVisible] = useState(false); // State to control form visibility

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
        {/* <p>Logged in as: {email} (Role: {role})</p> */}
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
                    <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-[#FFDD57]">Rs. {event.payment}</h3>
                    </div>
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Registration</h2>
                    <p className="text-gray-400">{calculateDaysLeft(event.endDate)}</p>
                    <button onClick={() => setFormVisible(true)} className="mt-4 bg-[#FFDD57] text-[#1F2937] py-2 px-4 rounded">
                        Register
                    </button>

                    <div className="mt-6 space-y-4 text-[#E5E7EB]">
                        <div className="flex items-center space-x-3">
                            <FaUsers className="text-xl" />
                            <p className="text-sm font-medium">Registered: <span className="font-bold">{event.registeredCount}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaUsers className="text-xl" />
                            <p className="text-sm font-medium">Team Size: <span className="font-bold">{event.teamSize}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaGlobe className="text-xl" />
                            <p className="text-sm font-medium">Impressions: <span className="font-bold">{event.impressions}</span></p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaClock className="text-xl" />
                            <p className="text-sm font-medium">Registration Deadline: <span className="font-bold">{calculateDaysLeft(event.endDate)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {isFormVisible && <RegistrationForm eventId={eventId} 
                    userId={userId} 
                    amount={event.payment} onClose={() => setFormVisible(false)} />}
        </section>
        </>
    );
}

export default User_EventDetails;