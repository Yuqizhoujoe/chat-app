import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRoom.css"; // Import the CSS file for styling

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("picture", picture);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:8000/rooms/create-room",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Room Created:", response.data);
      navigate("/"); // Navigate back to /rooms after successful room creation
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="create-room-page">
      <form className="create-room-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Room name"
          className="form-input"
        />
        <input
          type="file"
          name="picture"
          id="picture"
          onChange={(e) => setPicture(e.target.files[0])}
          className="form-input"
        />
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Room Description"
          className="form-textarea"
        ></textarea>
        <button type="submit" className="submit-button">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
