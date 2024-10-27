import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Judge/Navbar';

function Judge_LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [topRankers, setTopRankers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:8080/leaderboard');
                setLeaderboard(response.data);
                setTopRankers(response.data.slice(0, 3)); // Get the top 3 rankers
            } catch (error) {
                setError('Failed to fetch leaderboard data');
            }
        };

        fetchLeaderboard();

        // Optional polling to update leaderboard every 5 seconds
        const interval = setInterval(() => {
            fetchLeaderboard();
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    let id = 1; // Initialize id counter for rank display

    return (
        <>
            <Navbar />
            <section className="bg-[#1B1F3B] min-h-screen py-12">
                <div className="container mx-auto px-4 lg:px-16 flex flex-col gap-8">
                    {/* Top Rankers Section */}
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

                    {/* Registered Users Table */}
                    <div className="w-full bg-[#222854] p-8 text-[#E5E7EB]">
                        <h2 className="text-3xl font-bold text-white mt-8">Registered Users</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-[#1B1F3B] border border-gray-700">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-700 text-left">Rank</th>
                                        <th className="py-2 px-4 border-b border-gray-700 text-left">User Id</th>
                                        <th className="py-2 px-4 border-b border-gray-700 text-left">Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-700">
                                            <td className="py-2 px-4 border-b border-gray-600">{index + 1}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{user.userId}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{user.company}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Judge_LeaderBoard;
