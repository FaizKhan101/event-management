// frontend/src/components/EventCard.js
import { Link } from "react-router-dom";

function EventCard({ event }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
            <img src={event.image} alt={event.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <Link to={`/event/${event._id}`} style={{ textDecoration: "none", color: "blue" }}>View Details</Link>
        </div>
    );
}

export default EventCard;
