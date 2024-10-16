import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EditPlace = () => {
  const { id } = useParams(); // Get the place ID from the URL
  const { currentUser } = useContext(AuthContext); // Get the current user
  const navigate = useNavigate();

  // Get places from localStorage
  const places = JSON.parse(localStorage.getItem("places")) || [];
  // Find the specific place to edit
  const place = places.find((p) => p.id === parseInt(id));

  // Initialize state with existing place data
  const [name, setName] = useState(place ? place.name : "");
  const [title, setTitle] = useState(place ? place.title : "");
  const [description, setDescription] = useState(
    place ? place.description : ""
  );
  const [country, setCountry] = useState(place ? place.country : "");
  const [longitude, setLongitude] = useState(place ? place.longitude : "");
  const [latitude, setLatitude] = useState(place ? place.latitude : "");
  const [image, setImage] = useState(place ? place.image : null); // Load image if available

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

    const updatedPlace = {
      id: parseInt(id), // Keep the same ID
      userId: currentUser.id, // Keep userId same
      name,
      title,
      description,
      country,
      longitude,
      latitude,
      image,
    };

    // Update places array in localStorage
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
            value={name} // Controlled input
            onChange={(e) => setName(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Place Title:</label>
          <input
            type="text"
            value={title} // Controlled input
            onChange={(e) => setTitle(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Place Description:</label>
          <textarea
            value={description} // Controlled textarea
            onChange={(e) => setDescription(e.target.value)} // Allow editing
            required
          ></textarea>
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country} // Controlled input
            onChange={(e) => setCountry(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude} // Controlled input
            onChange={(e) => setLongitude(e.target.value)} // Allow editing
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude} // Controlled input
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
        <button type="submit">Save Changesaaa</button>
      </form>
    </div>
  );
  {
    /* asdasdasdasda*/
  }
};

export default EditPlace;
