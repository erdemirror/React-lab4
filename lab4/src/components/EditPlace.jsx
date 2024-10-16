import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EditPlace = () => {
  const { id } = useParams(); // Get the place ID from the URL
  const { currentUser } = useContext(AuthContext); // Get the current user
  const navigate = useNavigate();

  const places = JSON.parse(localStorage.getItem("places")) || [];
  const place = places.find((p) => p.id === parseInt(id)); // Find the place by ID

  // Initialize state with existing place data or empty strings
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [image, setImage] = useState(null);

  // Pre-fill the form with existing data when the component loads
  useEffect(() => {
    if (place) {
      setName(place.name || "");
      setTitle(place.title || "");
      setDescription(place.description || "");
      setCountry(place.country || "");
      setLongitude(place.longitude || "");
      setLatitude(place.latitude || "");
      setImage(place.image || null); // Set image if available
    }
  }, [place]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Convert the image to Base64 and set it
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPlace = {
      ...place, // Keep other properties the same
      name,
      title,
      description,
      country,
      longitude,
      latitude,
      image, // Update the image if changed
    };

    const updatedPlaces = places.map((p) =>
      p.id === parseInt(id) ? updatedPlace : p
    );

    localStorage.setItem("places", JSON.stringify(updatedPlaces)); // Save updated places to Local Storage
    navigate(`/places/${currentUser.id}`); // Navigate back to the user's places page
  };

  return (
    <div className="container">
      <h2>Edit Place</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Place Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Place Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Place Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Allow editing
            required
          ></textarea>
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Upload Place Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Allow image upload
          />
          {image && (
            <img
              src={image}
              alt="Place Preview"
              style={{ width: "200px", height: "auto", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPlace;
