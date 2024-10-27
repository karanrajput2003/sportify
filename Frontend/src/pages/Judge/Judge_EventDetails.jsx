import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FaCalendarAlt, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../Components/Judge/Navbar';
import img10 from '../../assets/10.jpeg'

function Judge_EventDetails() {
    let id = 1;
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [todayFormatted] = useState(dayjs().format('MMM DD, YYYY'));
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRanks, setSelectedRanks] = useState({ rank1: '', rank2: '', rank3: '' });
    const [topRankers, setTopRankers] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const eventId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                setError('Failed to fetch event details');
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/bookings/event/${eventId}`);
                setBookings(response.data);
            } catch (error) {
                setError('Error fetching bookings');
            }
        };

        fetchEvent();
        fetchBookings();
    }, [eventId]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/leaderboard/${eventId}`);
                setTopRankers(response.data);
            } catch (error) {
                setError('Failed to fetch leaderboard data');
            }
        };

        const fetchRegisteredUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/bookings/event/${eventId}`);
                setRegisteredUsers(response.data.map((booking) => ({
                    name: booking.user?.username || "Unknown User",
                    company: booking.user?.company_name || "N/A",
                    mobile: booking.mobileNumber || "N/A",
                })));
            } catch (error) {
                setError('Failed to fetch registered users');
            }
        };

        fetchLeaderboard();
        fetchRegisteredUsers();

        // Polling to update leaderboard every 5 seconds
        const interval = setInterval(() => {
            fetchLeaderboard();
        }, 5000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [eventId]);

    const handleRankChange = (rankType, value) => {
        setSelectedRanks((prev) => ({ ...prev, [rankType]: value }));
    };

    const handleSaveRanks = async () => {
        try {
            const userRanks = bookings.map((booking) => ({
                userId: booking.user._id,
                company: booking.user.company_name,
                rank1: selectedRanks.rank1 === booking.user.company_name ? 1 : null,
                rank2: selectedRanks.rank2 === booking.user.company_name ? 1 : null,
                rank3: selectedRanks.rank3 === booking.user.company_name ? 1 : null,
            })).filter((rank) => rank.rank1 || rank.rank2 || rank.rank3);

            const response = await axios.put(`http://localhost:8080/ranks`, { eventId, userRanks });
            alert(response.data.message);
            setSelectedRanks({ rank1: '', rank2: '', rank3: '' });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save ranks');
        }
    };

    const filteredBookings = bookings.filter((booking) =>
        booking.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const companyNames = filteredBookings.map((booking) => booking.user.company_name);

    return (
        <>
            <Navbar />
            <section className="bg-[#1B1F3B] min-h-screen py-12">
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-8">
                    {/* Event Information Section */}
                    <div className="flex-1 bg-[#222854] p-8 rounded-lg shadow-lg text-[#E5E7EB]">
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <>
                                <div className="flex items-center mb-6">
                                    {event?.logo && (
                                        <img src={img10} alt={event.eventTitle || 'Event Logo'} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    )}
                                    <div>
                                        <h1 className="text-3xl font-bold text-[#FFDD57]">{event?.eventTitle}</h1>
                                        <p className="text-gray-300">{event?.venue}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 text-gray-400 mb-6">
                                    <FaMapMarkerAlt />
                                    <p>{event?.venue}</p>
                                    <FaCalendarAlt />
                                    <p>Updated On: {todayFormatted}</p>
                                    <FaGlobe />
                                    <a href={event?.website} className="text-[#FFDD57] hover:underline" target="_blank" rel="noopener noreferrer">
                                        Official website
                                    </a>
                                </div>
                                <div className="inline-block bg-[#FFDD57] text-[#1F2937] py-1 px-3 rounded-full mb-6">
                                    {event?.eventCategory}
                                </div>
                                <h2 className="text-2xl font-semibold mb-2 text-[#FFDD57]">About the Event</h2>
                                <p className="leading-relaxed">{event?.aboutEvent}</p>
                                <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Participation Info</h2>
                                <p>Participation Type: {event?.participationType}</p>
                                <p>Number of Participants Allowed: {event?.noOfParticipation}</p>
                                <p>Payment Details: {event?.payment}</p>
                                <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Event Dates</h2>
                                <div className="flex items-center space-x-3 text-gray-400 mb-2">
                                    <FaCalendarAlt />
                                    <p>Start Date: {dayjs(event?.startDate).format('MMM DD, YYYY, h:mm A')}</p>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <FaCalendarAlt />
                                    <p>End Date: {dayjs(event?.endDate).format('MMM DD, YYYY, h:mm A')}</p>
                                </div>
                                <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FFDD57]">Contact the Organisers</h2>
                                <div className="bg-[#2C314E] p-4 rounded-lg">
                                    <p className="font-semibold">Helpdesk</p>
                                    <p>{event?.contactEmail}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Ranks and Top Rankers Section */}
                    <div className="w-full lg:w-1/3 bg-[#222854] p-8 rounded-lg shadow-lg text-[#E5E7EB]">
                        <h2 className="text-2xl font-semibold mb-4 text-[#FFDD57]">Rank Registered Users</h2>
                        <div className="mb-6">
                            {['rank1', 'rank2', 'rank3'].map((rankType, idx) => (
                                <div key={rankType} className="mb-4">
                                    <label className="block mb-2 text-gray-300">
                                        {`Rank ${idx + 1}:`}
                                    </label>
                                    <select
                                        className="border text-black border-gray-300 rounded w-full p-2"
                                        value={selectedRanks[rankType]}
                                        onChange={(e) => handleRankChange(rankType, e.target.value)}
                                    >
                                        <option value="">Select Company</option>
                                        {companyNames.map((company) => (
                                            <option key={company} value={company}>{company}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleSaveRanks}
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        >
                            Save Ranks
                        </button>

                        <div className="w-full bg-[#222854] p-8 text-[#E5E7EB]">
    <h2 className="text-3xl font-bold text-white mt-8">Top Rankers</h2>
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-8 mt-4">
        {topRankers.map((ranker, index) => (
            <div
                key={index}
                className={`p-6 rounded-lg shadow-md flex flex-col items-center lg:w-1/3 ${
                    index === 0
                        ? 'bg-yellow-200'
                        : index === 1
                        ? 'bg-purple-200'
                        : 'bg-orange-200'
                }`}
            >
                <h3 className="text-xl font-bold text-gray-900">{ranker.name}</h3>
                <p className="text-gray-600">{ranker.company}</p>
                <p className="text-gray-800 font-semibold">Rank: {id++}</p>
                <div className="mt-2 text-2xl font-bold">
                    {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                </div>
            </div>
        ))}
    </div>
</div>

                        {/* Registered Users */}
                        <h2 className="text-3xl font-bold text-white mt-8">Registered Users</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 mt-4">
                            {registeredUsers.map((user, index) => (
                                <div key={index} className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold">{user.name}</h3>
                                    <p>Company: {user.company}</p>
                                    <p>Mobile: {user.mobile}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Judge_EventDetails;
