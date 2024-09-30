import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
        console.log(accessToken)
        
        if (!accessToken) {
            setError('No access token found. Please log in.');
            return;
        }

        const jobData = {
            title,
            description,
            rate: parseFloat(rate),  // Ensure rate is converted to number
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/jobs/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`  // Pass JWT token
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
        <Container>
            <h1 className="my-4">Create New Job</h1>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Job Description</Form.Label>
                    {/* Rich text editor for description */}
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        required
                        placeholder="Enter job description"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRate">
                    <Form.Label>Job Rate ($/hr)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter job rate"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Job
                </Button>
            </Form>
        </Container>
    );
};

export default CreateJobPage;
