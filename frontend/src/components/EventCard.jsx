// frontend/src/components/EventCard.js
import { Link } from "react-router-dom";
import classes from "./EventCard.module.css";

function EventCard({ event }) {
  return (
    <li className={classes.eventItem}>
      <article>
        <h2>{event.name}</h2>
        <img src={event.image} alt={event.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
        <p>{event.description}</p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <Link to={`/event/${event._id}`}>View Details</Link>
      </article>
    </li>
  );
}

export default EventCard;
