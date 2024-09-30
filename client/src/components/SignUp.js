import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            })
        };

        fetch('http://127.0.0.1:8080/auth/signup', requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setServerResponse("Signup successful!");
                    setShow(true); // Optionally hide the alert after success
                    reset(); // Resets the form after successful submission
                } else {
                    setServerResponse(result.message || "Something went wrong!");
                    setShow(true);
                }
            })
            .catch(error => {
                console.error("Signup error:", error);
                setServerResponse("An error occurred during signup.");
                setShow(true); // Show the error message
            });
    };

    return (
        <div className="container">
            <div className="form">
                <h1>Sign Up</h1>
                {show && (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>{serverResponse}</p>
                    </Alert>
                )}
                <Form onSubmit={handleSubmit(submitForm)}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your username"
                            {...register("username", { required: true, maxLength: 25 })}
                        />
                        {errors.username && <small className="text-danger">Username is required (max 25 characters)</small>}
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Your email"
                            {...register("email", { required: true, maxLength: 80 })}
                        />
                        {errors.email && <small className="text-danger">Email is required (max 80 characters)</small>}
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            {...register("password", { required: true, minLength: 8, maxLength: 80 })}
                        />
                        {errors.password && <small className="text-danger">Password must be 8-80 characters</small>}
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", { required: true, minLength: 8, maxLength: 80 })}
                        />
                        {errors.confirmPassword && <small className="text-danger">Please confirm your password (8-80 characters)</small>}
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
