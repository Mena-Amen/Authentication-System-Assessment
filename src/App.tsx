import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Registration } from "./pages/Registration";
import AuthProvider from "./context/AuthContext";
import { UserProfile } from "./pages/UserProfile";
import { RequireAuth } from "./context/RequireAuth";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user-profile"
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />
          </Routes>
          <Toaster
            toastOptions={{
              style: {
                marginTop: "70px",
                marginRight: "85px",
              },
            }}
            position="top-right"
          />
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
