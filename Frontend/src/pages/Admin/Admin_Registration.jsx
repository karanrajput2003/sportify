import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin_Registration({ eventId }) {
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/event/${eventId}/registrations`);
                setRegistrations(response.data);
            } catch (error) {
                setError('Failed to fetch registrations');
            }
        };

        fetchRegistrations();
    }, [eventId]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="list-disc pl-5">
                    {registrations.map((reg) => (
                        <li key={reg.userId}>
                            <strong>{reg.userName}</strong> - Company: {reg.company}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Admin_Registration;
