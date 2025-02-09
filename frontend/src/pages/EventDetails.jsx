// frontend/src/pages/EventDetails.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById, attendEvent } from "../api";
import { io } from "socket.io-client";
import { jwtDecode } from 'jwt-decode'
import classes from "./EventDetails.module.css";

const socket = io("http://localhost:3000");

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);

        setIsGuest(decoded.guest || false); // Check if the token is a guest token
      } catch (error) {
        console.log(error);

        setIsGuest(false);
      }
    } else {
      setIsGuest(false);
    }

    async function fetchEvent() {
      const { data } = await getEventById(id);
      setEvent(data);
    }
    fetchEvent();

  }, [id, token]);

  const handleAttend = async () => {
    await attendEvent(id, token);
    alert("You have joined the event!");
    // Notify others that an attendee joined
    socket.emit("updateAttendees");
  };

  return event ? (
    <div className={classes.eventDetails}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      {token && !isGuest ? (
        <button onClick={handleAttend}>Join Event</button>
      ) : (
        <p>
          <Link to="/login">Login For Join.</Link>
        </p>
      )}
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>Loading...</p>
  );
}

export default EventDetails;
