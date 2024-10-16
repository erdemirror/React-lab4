import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null); // State to hold the Base64 string of the uploaded photo
  const navigate = useNavigate();

  // Handle photo upload and convert it to Base64 string
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result); // Set the Base64 string as the photo state
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new user object
    const newUser = {
      id: Date.now(),
      name: username,
      email,
      password,
      photo, // Save the Base64 string of the uploaded photo
    };
    register(newUser); // Register the user
    navigate("/login"); // Redirect to login after registration
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*" // Restrict file input to images only
          onChange={handlePhotoUpload}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
