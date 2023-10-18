import { Container, Alert } from "react-bootstrap";
import { useAuth } from "./../context/AuthContext";
import { useState } from "react";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function UserProfile() {
  const { currentUser } = useAuth();
  const [error, setError] = useState<string>("");

  const auth = getAuth();

  const navigate = useNavigate();

  // To Logout Function
  const handleLogout = async () => {
    try {
      setError("");
      await signOut(auth);
      toast.success("Logout Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      toast.error("Faild To Logout");
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Profile</h2>
      <h3 className="text-center mt-3">
        Welcome <strong>{currentUser && currentUser.email}</strong> To Your
        Profile
      </h3>
      <div className="alert-error">
        {error! && (
          <Alert
            variant="danger"
            style={{
              width: "30%",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {error}
          </Alert>
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Container>
  );
}
