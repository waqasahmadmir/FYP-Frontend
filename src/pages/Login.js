import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1 className="login-title">Login to your Account</h1>

            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group className="email-form-group">
              <Form.Label className="email-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
            </Form.Group>

            <Form.Group className="mb-3 custom-form-group">
              <Form.Label className="custom-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
              />
            </Form.Group>
            {/* // style={{ height: "10px", width: "560px", marginBottom: "100px" }} */}
            <Form.Group className="login-form-group">
              <Button
                type="submit"
                disabled={isLoading}
                className="login-button"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form.Group>

            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Create account
              </Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Login;
