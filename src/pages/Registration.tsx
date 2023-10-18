import React, { useRef, useState } from "react";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Registration() {
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordRef.current?.value !== confirmpasswordRef.current?.value) {
      return toast.error("Password Dose't Match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current!.value, passwordRef.current!.value);
      toast.success("Account Created Successfully!");

      setTimeout(() => {
        navigate("/user-profile");
      }, 2000);
    } catch (error) {
      console.log(`signup error: `, (error as Error).message);
      // Handling Signup Errors
      if (
        (error as Error).message ===
        "Firebase: Error (auth/email-already-in-use)."
      ) {
        toast.error(`Email Already In Use!`);
      } else if (
        (error as Error).message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        toast.error(`Weak Password: Password should be at least 6 characters`);
      } else if (
        (error as Error).message === "Firebase: Error (auth/invalid-email)."
      ) {
        toast.error(`Invalid Email`);
      } else if ((error as Error).message === "") {
        toast.error(`Invalid Email`);
      } else if (
        (error as Error).message === "Firebase: Error (auth/missing-password)."
      ) {
        toast.error("Missing Password");
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
            <h2 className="text-center mb-5">Signup</h2>
            {error! && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              {/* <Form.Group>
                <Form.Label htmlFor="user">Username</Form.Label>
                <Form.Control type="text" id="user" />
              </Form.Group> */}
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control type="email" id="email" ref={emailRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" id="password" ref={passwordRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password-confirmation">
                  Password Confirmation
                </Form.Label>
                <Form.Control
                  type="password"
                  id="password-confirmation"
                  ref={confirmpasswordRef}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                Signup
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-3">
          Already Have an Account? <Link to="/login">Log In</Link>
        </div>
      </Container>
    </>
  );
}
