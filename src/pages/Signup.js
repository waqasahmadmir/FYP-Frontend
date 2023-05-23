import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1 className="login-title">Create Your Account</h1>

            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="name-form-group">
              <Form.Label className="name-label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="name-input"
              />
            </Form.Group>

            <Form.Group className="email-form-group">
              <Form.Label className="email-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
            </Form.Group>

            <Form.Group className="password-form-group">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
              />
            </Form.Group>

            <Form.Group className="create-account-form-group">
              <Button
                type="submit"
                disabled={isLoading}
                className="create-account-button"
              >
                Create Account
              </Button>
            </Form.Group>

            <p className="login-redirect">
              Don't have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
