// frontend/src/pages/CreateEvent.js
import { useState } from "react";
import { createEvent } from "../api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await createEvent({ name, description, date, location }, token);
            alert("Event Created Successfully!");
            navigate("/"); // Redirect to home after creation
        } catch (error) {
            alert("Error creating event. Please try again.");
        }
    };

    return (
        <div>
            <h2>Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
                <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEvent;
