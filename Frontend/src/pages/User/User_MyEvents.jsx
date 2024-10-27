import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Admin/Navbar';
import img10 from '../../assets/10.jpeg'

function User_MyEvents() {
    const [bookings, setBookings] = useState([]);
    const { userId } = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [participantName, setParticipantName] = useState('');
    const [participantMobile, setParticipantMobile] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8080/event/${userId}`);
                    setBookings(response.data);
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                }
            }
        };

        fetchBookings();
    }, [userId]);

    const handleAddParticipant = async () => {
        try {
            await axios.post('http://localhost:8080/send-sms', {
                to: participantMobile,
                body: `https://qr-tau-cyan.vercel.app/${userId}/${selectedEventId}, you have been added to the event!`
            });
            setIsModalOpen(false);
            setParticipantName('');
            setParticipantMobile('');
        } catch (error) {
            console.error('Error adding participant:', error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32 min-h-screen">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-5xl font-extrabold text-center text-[#FFDD57] mb-12 tracking-wide">
                        My Bookings
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {bookings.map((booking) => (
                            <div 
                                key={booking._id} 
                                className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg"
                            >
                                <div className="relative">
                                    <img
                                        src={img10}
                                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-2xl font-semibold text-[#FFDD57] mb-3">Booking for Event ID: {booking.eventId}</h2>
                                    {/* <p className="text-[#A0AEC0] text-lg mb-2">
                                        <span className="font-semibold text-[#E5E7EB]">Name:</span> {booking.username}
                                    </p> */}
                                    <p className="text-[#A0AEC0] text-lg mb-2">
                                        <span className="font-semibold text-[#E5E7EB]">Amount Paid:</span> ${booking.amount}
                                    </p>
                                    <p className="text-[#A0AEC0] text-lg mb-4">
                                        <span className="font-semibold text-[#E5E7EB]">Status:</span> {booking.status}
                                    </p>
                                    <p className="text-[#A0AEC0] text-lg mb-4">
                                        <span className="font-semibold text-[#E5E7EB]">No. of Participants: </span> 4 
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedEventId(booking.eventId);
                                            setIsModalOpen(true);
                                        }}
                                        className="bg-[#FFDD57] text-black font-semibold py-2 px-4 rounded hover:bg-[#FFD740]"
                                    >
                                        Add Participant
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal for Adding Participant */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <div className="bg-[#1B1F3B] p-6 rounded-lg shadow-lg max-w-md mx-auto transition-all duration-300 transform scale-95">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Add Participant</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddParticipant(); }}>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="participantName">Name</label>
                                <input
                                    type="text"
                                    id="participantName"
                                    value={participantName}
                                    onChange={(e) => setParticipantName(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="participantMobile">Mobile No.</label>
                                <input
                                    type="tel"
                                    id="participantMobile"
                                    value={participantMobile}
                                    onChange={(e) => setParticipantMobile(e.target.value)}
                                    required
                                    className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-yellow-500 text-white mx-12 py-2 px-4 rounded hover:bg-yellow-600 transition"
                                >
                                    Add Participant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default User_MyEvents;
