import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../Components/Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        email: data.email,
        password: data.password,
      });

      const userData = {
        userId: response.data.id, // Assuming response includes user id
        role: response.data.roles[0],
        email: response.data.email,
      };

      // Dispatch user data to Redux
      dispatch(setUser(userData));

      // Redirect based on user role
      if (userData.role === "ROLE_USER") navigate("/user");
      else if (userData.role === "ROLE_MODERATOR") navigate("/judge");
      else if (userData.role === "ROLE_ADMIN") navigate("/admin");

    } catch (error) {
      console.error(error);
      setErrorMessage("Incorrect Username or Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-screen flex items-center justify-center bg-[#1B1F3B]">
        <div className="container flex justify-center items-center">
          <div className="max-w-md w-full bg-[#2C2F4B] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#FFDD57] mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#FFDD57]" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FFDD57] transition duration-150 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#FFDD57]" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FFDD57] transition duration-150 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* <div className="flex justify-between items-center mb-6">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="text-sm text-[#FFDD57] ml-2">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-[#FFDD57] hover:underline">Forgot password?</Link>
              </div> */}

              {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

              <button
                type="submit"
                className="w-full h-10 bg-[#FFDD57] text-[#1B1F3B] font-medium rounded-md transition-colors duration-200 hover:bg-[#FFD700]"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-[#FFDD57]">Don’t have an account?{' '}
                <Link to="/register" className="text-[#FFD700] hover:underline">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
