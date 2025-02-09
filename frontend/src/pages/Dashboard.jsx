// frontend/src/pages/Dashboard.js
import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import classes from "./Dashboard.module.css";

const socket = io("http://localhost:3000");

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await getEvents();
      setEvents(data);
    }
    fetchEvents();

    // Listen for real-time updates
    socket.on("refreshAttendees", () => {
      console.log("Received refreshAttendees event");
      fetchEvents(); // Fetch updated event list
    });

    return () => socket.off("refreshAttendees");
  }, []);

  return (
    <div className={classes.dashboard}>
      <h2>Event Dashboard</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Attendees</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.location}</td>
              <td>{event.attendees.length}</td>
              <td>
                <Link to={`/event/${event._id}`}>View</Link>
              </td>
            </tr>
          )) : <p>Loading...</p>}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
