import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the jobs from the API
    const fetchJobs = async (accessToken) => {
        try {
            const response = await fetch('http://127.0.0.1:8080/jobs/jobs', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 401) {
                throw new Error('Unauthorized. Please log in.');
            }

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            setError('No access token found. Please log in.');
            setLoading(false);
            return;
        }

        // Fetch jobs if the access token is available
        fetchJobs(accessToken);
    }, []);

    // Handle login redirection
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold my-4">Available Jobs</h1>

            {loading && <p className="text-lg">Loading...</p>}
            
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    <p>{error}</p>
                    <button
                        onClick={handleLoginRedirect}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        Go to Login
                    </button>
                </div>
            )}

            {!error && !loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {jobs.length > 0 ? (
                        jobs.map(job => (
                            <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 my-3">
                                <h2 className="text-xl font-semibold">{job.title}</h2>
                                <p className="text-gray-700">{job.description}</p>
                                <p className="font-bold">{job.rate} Dollars per hour</p>
                            </div>
                        ))
                    ) : (
                        <p>No jobs available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AvailableJobsPage;