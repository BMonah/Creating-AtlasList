import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const loginData = {
            username: username,
            password: password
        };

        // Perform the fetch request
        fetch('http://127.0.0.1:8080/auth/login', {  // Adjust the URL to your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            setSuccess(true);
            setError(null);
            navigate('/getjobs');  // Redirect after successful login
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            console.log(data.access_token)
        })
        .catch(error => {
            console.error('Login error:', error);
            setError(error.message);
        });
    };

    return (
        <div className="container">
            <div className="form">
                <h1>Login</h1>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Login successful!</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <br />
                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>ignup instead</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
