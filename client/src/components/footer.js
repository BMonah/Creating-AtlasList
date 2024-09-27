import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <Row>
                    <Col lg={6} md={12} className="mb-4">
                        <h5 className="text-uppercase">AtlasList</h5>
                        <p>
                            Connecting workers to the healthcare, disability, and daycare industries.
                        </p>
                    </Col>
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-uppercase">Links</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/create_recipe">Create Recipe</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-uppercase">Contact Us</h5>
                        <p>Email: support@atlaslist.com</p>
                        <p>Phone: +123 456 7890</p>
                    </Col>
                </Row>
            </Container>
            <div className="text-center p-3 bg-dark text-white">
                © {new Date().getFullYear()} AtlasList
            </div>
        </footer>
    );
};

export default Footer;