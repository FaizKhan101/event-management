// frontend/src/pages/Dashboard.js
import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import classes from "./Dashboard.module.css";

const socket = io("http://localhost:3000");

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleCategoryFilter = (category) => {
    if (category === "all") {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((event) => event.category === category);
    setFilteredEvents(filtered);
  };

  const handleDateFilter = (date) => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      const filterDate = new Date(date).setHours(0, 0, 0, 0);
      return eventDate === filterDate;
    });
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await getEvents();
      setEvents(data);
      setFilteredEvents(data);
    }
    fetchEvents();

    // Listen for real-time updates
    socket.on("refreshAttendees", () => {
      console.log("Received refresh Attendees event");
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
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={(e) => handleCategoryFilter(e.target.value)}>
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
              type="date"
              onChange={(e) => handleDateFilter(e.target.value)}
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
            <th>Category</th>
            <th>Attendees</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.category}</td>
                <td>{event.attendees.length}</td>
                <td>
                  <Link to={`/event/${event._id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
