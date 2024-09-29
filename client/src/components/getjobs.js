import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const AvailableJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    // Fetch the jobs from the API
    useEffect(() => {
        fetch('http://127.0.0.1:8080/recipe/recipe/1')  // Adjust the URL to your backend endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                return response.json();
            })
            .then(data => setJobs(data))
            .catch(error => setError(error.message));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Available Jobs</h1>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <Col key={job.id} sm={12} md={6} lg={4} className="my-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Text>{job.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No jobs available at the moment.</p>
                )}
            </Row>
        </Container>
    );
};

export default AvailableJobsPage;