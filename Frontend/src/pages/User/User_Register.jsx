import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegistrationForm = ({ eventId, userId, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Gather all required data
        const bookingData = {
            ...data,        // Form data
            eventId,       // Event ID
            userId,        // User ID
            amount: 100,   // Replace with your calculated amount or logic
        };

        try {
            // Send data to the specified endpoint
            const response = await axios.post(`http://localhost:8080/create-order`, bookingData);
            console.log(response.data); // Log the response for debugging

            // Check if the response contains a redirect URL
            if (response.data.url) {
                window.location.href = response.data.url; // Redirect to payment gateway
            } else {
                alert('Registration successful!'); // Inform the user if no redirect URL
                onClose(); // Close the form after submission
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#222854] p-8 rounded-lg shadow-md w-[400px]" // Increased width for larger modal
            >
                <h2 className="text-2xl font-semibold mb-4 text-[#FFDD57]">Register for Event</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">First Name</label>
                    <input
                        type="text"
                        {...register('firstName', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">Last Name</label>
                    <input
                        type="text"
                        {...register('lastName', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">Mobile</label>
                    <input
                        type="tel"
                        {...register('mobileNumber', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.mobileNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.mobileNumber && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">Company Name</label>
                    <input
                        type="text"
                        {...register('companyName', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.companyName ? 'border-red-500' : ''}`}
                    />
                    {errors.companyName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                {/* Gender Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#E5E7EB]">Gender</label>
                    <select
                        {...register('gender', { required: true })}
                        className={`border p-2 rounded-md w-full ${errors.gender ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
                    <button type="submit" className="bg-[#FFDD57] text-[#1F2937] py-2 px-4 rounded hover:bg-[#E5B200] transition">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
