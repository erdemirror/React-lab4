import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AddPlace = () => {
  const { currentUser } = useContext(AuthContext); // Ensure currentUser is available
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set the Base64 string as the image state
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlace = {
      id: Date.now(),
      userId: currentUser.id,
      name,
      title,
      description,
      country,
      longitude,
      latitude,
      image,
    };

    // Check if currentUser exists before proceeding
    if (!currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const existingPlaces = JSON.parse(localStorage.getItem("places")) || [];
    existingPlaces.push(newPlace);
    localStorage.setItem("places", JSON.stringify(existingPlaces));

    navigate(`/places/${currentUser.id}`);
  };

  return (
    <div className="container">
      <h2>Add a New Place</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Place Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Place Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Place Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Place Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
};

export default AddPlace;
