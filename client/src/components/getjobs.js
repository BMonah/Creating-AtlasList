import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
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
        <Container>
            <h1 className="my-4">Available Jobs</h1>

            {loading && <p>Loading...</p>}
            
            {error && (
                <div className="text-danger">
                    <p>{error}</p>
                    <Button onClick={handleLoginRedirect} variant="primary">
                        Go to Login
                    </Button>
                </div>
            )}

            {!error && !loading && (
                <Row>
                    {jobs.length > 0 ? (
                        jobs.map(job => (
                            <Col key={job.id} sm={12} className="my-3"> {/* Full width for all screen sizes */}
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{job.title}</Card.Title>
                                        <Card.Text>{job.description}</Card.Text>
                                        <Card.Text>{job.rate} Dollars per hour</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No jobs available at the moment.</p>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default AvailableJobsPage;
