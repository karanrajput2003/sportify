import React, { useState } from 'react';
import Navbar from '../../Components/Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username: data.fullName,
        email: data.email,
        contact_no: data.phoneNo, // Changed to contact_no
        company_name: data.companyName, // Added company_name
        dept_name: data.deptName, // Added dept_name
        password: data.password,
        roles: ["user"],
      });
      console.log(response);
      alert("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("Username or Email already exists");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  return (
    <>
      <Navbar />
      <section className="w-full h-screen flex items-center justify-center bg-[#1B1F3B]">
        <div className="container md:px-8 lg:px-16 flex justify-center items-center">
          <div className="max-w-md w-full bg-[#2C2F4B] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#FFD700] mb-6">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name & Email in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                    {...register('fullName', { required: 'Full Name is required' })}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone No & Company Name in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="phoneNo">
                    Contact No
                  </label>
                  <input
                    type="text"
                    id="phoneNo"
                    placeholder="Enter your contact number"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.phoneNo ? 'border-red-500' : ''
                    }`}
                    {...register('phoneNo', { required: 'Contact No is required' })}
                  />
                  {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="companyName">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company name"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.companyName ? 'border-red-500' : ''
                    }`}
                    {...register('companyName', { required: 'Company Name is required' })}
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                </div>
              </div>

              {/* Department Name & Password in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="deptName">
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="deptName"
                    placeholder="Enter your department name"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.deptName ? 'border-red-500' : ''
                    }`}
                    {...register('deptName', { required: 'Department Name is required' })}
                  />
                  {errors.deptName && <p className="text-red-500 text-sm mt-1">{errors.deptName.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#FFD700]" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#FFD700]" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`mt-1 block w-full px-3 py-2 border border-[#FFD700] rounded-md focus:outline-none focus:ring focus:ring-[#FFD700] transition duration-150 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  {...register('confirmPassword', {
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
              <button
                type="submit"
                className={`w-full bg-[#FFD700] text-[#1A1A1A] font-semibold py-2 rounded-md hover:bg-[#FFA500] transition duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-[#FFD700] underline">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
