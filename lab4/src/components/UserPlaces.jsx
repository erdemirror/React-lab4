import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UserPlaces = () => {
  const { userId } = useParams(); // Get the userId from the URL parameters
  const { currentUser, isAuthenticated } = useContext(AuthContext); // Get current user and authentication status
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const placesFromStorage = JSON.parse(localStorage.getItem("places")) || []; // Get places from Local Storage

  const [places, setPlaces] = useState(placesFromStorage); // Use state for places

  const user = users.find((u) => u.id === parseInt(userId)); // Find the user by ID

  // Filter places for the selected user
  const userPlaces = places.filter(
    (place) => place.userId === parseInt(userId)
  );

  const handleDelete = (id) => {
    // Delete place for the logged-in user
    const updatedPlaces = places.filter((place) => place.id !== id);
    setPlaces(updatedPlaces); // Update state instead of reloading
    localStorage.setItem("places", JSON.stringify(updatedPlaces)); // Update Local Storage
  };

  return (
    <div className="container">
      <h2>Places for {user ? user.name : "Unknown User"}</h2>

      {/* Only logged-in users can add a place */}
      {isAuthenticated && currentUser?.id === parseInt(userId) && (
        <Link to="/add-place">Add New Place</Link>
      )}

      {userPlaces.length > 0 ? (
        <ul>
          {userPlaces.map((place) => (
            <li key={place.id}>
              <h3>
                {place.name} - {place.title}
              </h3>
              <p>
                <strong>Description:</strong> {place.description}
              </p>
              <p>
                <strong>Country:</strong> {place.country}
              </p>
              <p>
                <strong>Coordinates:</strong> {place.latitude},{" "}
                {place.longitude}
              </p>
              {place.image && (
                <img
                  src={place.image}
                  alt={place.title}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              )}

              {/* Show Edit and Delete buttons only for the logged-in user */}
              {isAuthenticated && currentUser?.id === parseInt(userId) && (
                <>
                  <Link to={`/edit-place/${place.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(place.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No places found for this user.</p>
      )}
    </div>
  );
};

export default UserPlaces;
