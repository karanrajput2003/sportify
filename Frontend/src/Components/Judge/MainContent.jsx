import React from 'react';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ScoreIcon from '@mui/icons-material/Score';
import CertificateIcon from '@mui/icons-material/Assignment';
import AnalyticsIcon from '@mui/icons-material/Assessment';

function MainContent() {
    return (
        <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-4xl font-bold text-[#FFDD57] mb-6">Judge Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#2C2E4E] p-4 rounded-lg shadow-lg flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#FFDD57]">Total Events Judged</h3>
                        <span className="text-3xl text-[#FFDD57]">3</span>
                    </div>
                    <div className="bg-[#2C2E4E] p-4 rounded-lg shadow-lg flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#FFDD57]">Upcoming Events</h3>
                        <span className="text-3xl text-[#FFDD57]">2</span>
                    </div>
                    <div className="bg-[#2C2E4E] p-4 rounded-lg shadow-lg flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#FFDD57]">Ongoing Events</h3>
                        <span className="text-3xl text-[#FFDD57]">1</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* <div className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start">
            <EventIcon className="text-[#FFDD57] text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-[#FFDD57] mb-4">Manage Events</h2>
              <p className="text-[#E5E7EB] mb-4">Create tournaments and events.</p>
              <Link to="/admin/addevents" className="text-[#FFDD57] hover:underline">
                Go to Add Events
              </Link>
            </div>
          </div> */}

                    <div className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start">
                        <AnalyticsIcon className="text-[#FFDD57] text-3xl mr-4" />
                        <div>
                            <h2 className="text-2xl font-semibold text-[#FFDD57] mb-4">All Events</h2>
                            <p className="text-[#E5E7EB] mb-4">View all details for each event.</p>
                            <Link to="/judge/allevents" className="text-[#FFDD57] hover:underline">
                                Go to All Events
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start">
                        <ScoreIcon className="text-[#FFDD57] text-3xl mr-4" />
                        <div>
                            <h2 className="text-2xl font-semibold text-[#FFDD57] mb-4">Scoring & Leaderboards</h2>
                            <p className="text-[#E5E7EB] mb-4">Manage scores and view real-time leaderboards.</p>
                            <Link to="/judge/leaderboard" className="text-[#FFDD57] hover:underline">
                                Manage Scores
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#2C2E4E] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-start">
                        <CertificateIcon className="text-[#FFDD57] text-3xl mr-4" />
                        <div>
                            <h2 className="text-2xl font-semibold text-[#FFDD57] mb-4">Certificates</h2>
                            <p className="text-[#E5E7EB] mb-4">Generate and manage participation certificates for teams.</p>
                            <Link to="/judge/certificates" className="text-[#FFDD57] hover:underline">
                                Manage Certificates
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </section>
    );
}

export default MainContent;
