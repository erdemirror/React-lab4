import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import UserPlaces from "./components/UserPlaces";
import AddPlace from "./components/AddPlace"; // Ensure AddPlace is correctly imported
import EditPlace from "./components/EditPlace"; // Import EditPlace component
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext"; // Import AuthContext for RequireAuth

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places/:userId" element={<UserPlaces />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protect AddPlace route */}
          <Route
            path="/add-place"
            element={
              <RequireAuth>
                <AddPlace />
              </RequireAuth>
            }
          />
          {/* Protect EditPlace route */}
          <Route
            path="/edit-place/:id"
            element={
              <RequireAuth>
                <EditPlace />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Component to protect routes
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Check authentication status
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
