import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Login() {
  const { signin } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // To Store Location Path Dynamically
  const redirectPath = location.state?.path || "/user-profile";

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current!.value, passwordRef.current!.value);

      toast.success("Login Successfully!");
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 2000);
    } catch (error) {
      console.log(`signip error: `, (error as Error).message);
      // Handling Signin Errors
      if (
        (error as Error).message ===
        "Firebase: Error (auth/invalid-login-credentials)."
      ) {
        toast.error(`Email Or Password Is Incorrect!`);
      } else if (
        (error as Error).message === "Firebase: Error (auth/missing-password)."
      ) {
        toast.error("Missing Password!");
      } else if (
        (error as Error).message === "Firebase: Error (auth/invalid-email)."
      ) {
        toast.error(`Invalid Email`);
      } else if ((error as Error).message === "") {
        toast.error(`Invalid Email`);
      } else {
        toast.error(`${(error as Error).message}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Container className="w-100 mt-5" style={{ maxWidth: "400px" }}>
        <Card className="shadow-lg">
          <Card.Body>
            <h2 className="text-center mb-5">Login</h2>
            {error! && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control type="email" id="email" ref={emailRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" id="password" ref={passwordRef} />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-3">
          Create a New Account? <Link to="/registration">Signup</Link>
        </div>
      </Container>
    </>
  );
}
