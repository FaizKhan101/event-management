// frontend/src/pages/CreateEvent.js
import { useState } from "react";
import { createEvent } from "../api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await createEvent(formData, token);
      alert("Event Created Successfully!");
      navigate("/");
    } catch (error) {
      alert("Error creating event. Please try again.");
    }
  };

  return (
    <form onSubmit={handleCreateEvent} encType="multipart/form-data">
      <h2>Create New Event</h2>
      <p>
        <label htmlFor={name}>Event Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </p>
      <p>
        <label htmlFor={description}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor={location}>Loacation</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="concert">Concert</option>
          <option value="sport">Sport</option>
          <option value="theater">Theater</option>
          <option value="music">Music</option>
          <option value="other">Other</option>
        </select>
      </p>
      <p>
        <label htmlFor={date}>Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </p>

      <p>
        <button type="submit">Create Event</button>
      </p>
    </form>
  );
}

export default CreateEvent;
