import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlaceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { pid } = useParams();
  const navigate = useNavigate();
  const isEditing = !!pid;

  useEffect(() => {
    if (isEditing) {
      const places = JSON.parse(localStorage.getItem("places")) || [];
      const place = places.find((place) => place.id === pid);
      if (place) {
        setTitle(place.title);
        setDescription(place.description);
      }
    }
  }, [pid, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const places = JSON.parse(localStorage.getItem("places")) || [];

    if (isEditing) {
      const updatedPlaces = places.map((place) =>
        place.id === pid ? { ...place, title, description } : place
      );
      localStorage.setItem("places", JSON.stringify(updatedPlaces));
    } else {
      const newPlace = {
        id: Date.now().toString(),
        title,
        description,
      };
      places.push(newPlace);
      localStorage.setItem("places", JSON.stringify(places));
    }

    navigate("/places");
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Place" : "Add New Place"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">
          {isEditing ? "Update Place" : "Add Place"}
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
