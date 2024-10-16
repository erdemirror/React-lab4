import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import AuthContext from "../context/AuthContext"; // Ensure AuthContext is imported

const Places = () => {
  const [places, setPlaces] = useState([]);
  const { isAuthenticated } = useContext(AuthContext); // Make sure this is from context

  useEffect(() => {
    const savedPlaces = JSON.parse(localStorage.getItem("places")) || [];
    setPlaces(savedPlaces);
  }, []);

  const handleDelete = (id) => {
    const updatedPlaces = places.filter((place) => place.id !== id);
    setPlaces(updatedPlaces);
    localStorage.setItem("places", JSON.stringify(updatedPlaces));
  };

  return (
    <div>
      <h2>Your Places</h2>

      {/* Check if the user is authenticated before showing the Add New Place link */}
      {isAuthenticated ? (
        <Link to="/places/new">Add New Place</Link> // Only authenticated users can add new places
      ) : (
        <p>Login to add a new place.</p> // Show a message for guests
      )}

      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <h3>{place.title}</h3>
            <p>{place.description}</p>

            {/* Only show Edit and Delete for authenticated users */}
            {isAuthenticated ? (
              <>
                <Link to={`/places/${place.id}`}>Edit</Link>
                <button onClick={() => handleDelete(place.id)}>Delete</button>
              </>
            ) : (
              <p>Login to edit or delete this place.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;
