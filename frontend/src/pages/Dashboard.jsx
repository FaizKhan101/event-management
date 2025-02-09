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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,gap: "2rem",width: "80%"}}>
        <div>
          <h2>Event Dashboard</h2>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}> 
          <div>
            <label htmlFor="name">Category: </label>
            <select name="category" id="category">
              <option value="all">All</option>
              <option value="concert">Concert</option>
              <option value="sport">Sport</option>
              <option value="theater">Theater</option>
              <option value="music">Music</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="datetime-local"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table border="1" cellPadding="10" style={{ width: "80%" }}>
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
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.attendees.length}</td>
                <td>
                  <Link to={`/event/${event._id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
