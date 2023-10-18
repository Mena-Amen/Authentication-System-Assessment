import { Nav, Container, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { currentUser } = useAuth();

  return (
    <NavbarBs className="bg-white shadow-sm">
      <Container>
        <Nav className="d-flex align-items-center">
          <Nav.Link
            style={{ color: "#FCCC04" }}
            className="me-3 fw-bold fs-3"
            to="/"
            as={NavLink}
          >
            Mahaseel's Logo
          </Nav.Link>
          <Nav.Link className="fs-4 me-auto" to="/" as={NavLink}>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          {!currentUser ? (
            <>
              <Nav.Link className="fs-4" to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link className="fs-4" to="/registration" as={NavLink}>
                Registration
              </Nav.Link>
            </>
          ) : (
            <Nav.Link className="fs-4" to="/user-profile" as={NavLink}>
              Profile: <small>{currentUser.email}</small>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </NavbarBs>
  );
}
