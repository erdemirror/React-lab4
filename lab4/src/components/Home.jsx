import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { users } = useContext(AuthContext); // Get registered users from context

  const handleUserClick = (userId) => {
    navigate(`/places/${userId}`); // Navigate to the user's places
  };

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)} // Handle user click to show places
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "16px",
              cursor: "pointer",
              textAlign: "center",
              width: "150px",
            }}
          >
            {/* Display user photo */}
            {user.photo && (
              <img
                src={user.photo}
                alt={user.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
