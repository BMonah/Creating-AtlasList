import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Form Submitted", { username, email, password, confirmPassword });

        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="container">
            <div className="form">
                <h1>Sign Up</h1>
                <Form onSubmit={submitForm}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Your username"
                            value={username}
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Your email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Your password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                    <br />
                    <Form.Group>
                        <small>Already have an account? <Link to='/login'>Login instead</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default SignUpPage;