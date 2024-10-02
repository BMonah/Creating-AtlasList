import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'; // Rich Text Editor component

const CreateJobPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken);
        
        if (!accessToken) {
            setError('No access token found. Please log in.');
            return;
        }

        const jobData = {
            title,
            description,
            rate: parseFloat(rate), // Ensure rate is converted to number
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/jobs/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Pass JWT token
                },
                body: JSON.stringify(jobData),
            });

            if (response.status === 401) {
                throw new Error('Unauthorized. Please log in.');
            }

            if (!response.ok) {
                throw new Error('Failed to create job');
            }

            setSuccessMessage('Job created successfully!');
            setError(null);

            // Clear form after successful submission
            setTitle('');
            setDescription('');
            setRate('');

        } catch (err) {
            setError(err.message);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="my-4 text-2xl font-semibold">Create New Job</h1>
            {error && <p className="text-red-600">{error}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="jobTitle" className="block text-gray-700 font-semibold mb-2">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        placeholder="Enter job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="jobDescription" className="block text-gray-700 font-semibold mb-2">Job Description</label>
                    {/* Rich text editor for description */}
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        required
                        placeholder="Enter job description"
                        className="border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="jobRate" className="block text-gray-700 font-semibold mb-2">Job Rate ($/hr)</label>
                    <input
                        type="number"
                        id="jobRate"
                        placeholder="Enter job rate"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
                    Create Job
                </button>
            </form>
        </div>
    );
};

export default CreateJobPage;