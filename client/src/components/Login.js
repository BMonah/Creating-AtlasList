import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const LoginPage=()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Form Submitted", {email, password});

        setEmail('')
        setPassword('')
    }

    return(
        <div className="container">
            <div className="form">
                <h1>Login</h1>
                <Form onSubmit={submitForm}>
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
                    <Button variant="primary" type="submit">
                        Login Up
                    </Button>
                    <br />
                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>Create Account</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage