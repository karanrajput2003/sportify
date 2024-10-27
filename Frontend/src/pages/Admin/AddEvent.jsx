import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../../Components/Admin/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [judges, setJudges] = useState([]);
    const [selectedJudge, setSelectedJudge] = useState('');
    const [aboutEvent, setAboutEvent] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        const fetchJudges = async () => {
            try {
                const response = await axios.get('http://localhost:8080/judges');
                setJudges(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching judges:', error);
            }
        };
        fetchJudges();
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result); // This will be a base64 string
            };
            reader.readAsDataURL(file); // Convert image file to base64
        }
    };

    const onSubmit = async (data) => {
        const eventData = { ...data, logo, aboutEvent, selectedJudge };

        try {
            const response = await fetch('http://localhost:8080/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Event added successfully:', result);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <>
            <Navbar />
            <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl font-bold text-[#FFDD57] mb-6">Add New Event</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="logo">Event Logo</label>
                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {logo === '' && <span className="text-red-500">Logo is required</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="eventCategory">Event Category</label>
                            <select
                                id="eventCategory"
                                {...register('eventCategory', { required: 'Event category is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            >
                                <option value="">Select Category</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Fun Games">Fun Games</option>
                            </select>
                            {errors.eventCategory && <span className="text-red-500">{errors.eventCategory.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="eventTitle">Event Title</label>
                            <input
                                type="text"
                                id="eventTitle"
                                {...register('eventTitle', { required: 'Event title is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.eventTitle && <span className="text-red-500">{errors.eventTitle.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57]" htmlFor="aboutEvent">About Event</label>
                            <ReactQuill
                                value={aboutEvent}
                                onChange={setAboutEvent}
                                className="react-quill rounded-md text-white"
                                theme="snow"
                                placeholder="Provide detailed guidelines, eligibility, rules, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="venue">Venue</label>
                            <input
                                type="text"
                                id="venue"
                                {...register('venue', { required: 'Venue is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.venue && <span className="text-red-500">{errors.venue.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="participationType">Participation Type</label>
                            <input
                                type="text"
                                id="participationType"
                                {...register('participationType', { required: 'Participation type is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.participationType && <span className="text-red-500">{errors.participationType.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="noOfParticipation">Number of Participants</label>
                            <input
                                type="number"
                                id="noOfParticipation"
                                {...register('noOfParticipation', { required: 'Number of participants is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.noOfParticipation && <span className="text-red-500">{errors.noOfParticipation.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="payment">Participation Amount</label>
                            <input
                                type="text"
                                id="payment"
                                {...register('payment', { required: 'Payment method is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.payment && <span className="text-red-500">{errors.payment.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                {...register('startDate', { required: 'Start date is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[#FFDD57] mb-2" htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                {...register('endDate', { required: 'End date is required' })}
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            />
                            {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="judge" className="block text-[#FFDD57] mb-2">Select Judge:</label>
                            <select
                                id="judge"
                                value={selectedJudge}
                                onChange={(e) => setSelectedJudge(e.target.value)}
                                required
                                className="w-full p-3 rounded-md bg-[#2C2E4E] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#FFDD57] transition duration-300"
                            >
                                <option value="">Select Judge</option>
                                {judges.map((judge) => (
                                    <option key={judge.id} value={judge.id}>
                                        {judge.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-[#FFDD57] text-black font-semibold py-3 rounded-md transition duration-300 hover:bg-yellow-400">
                            Add Event
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddEvent;
