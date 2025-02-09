// frontend/src/pages/Home.js
import { useEffect, useState } from "react";
import { getEvents, getUpcomingEvents } from "../api";
import EventCard from "../components/EventCard";
import classes from "./Home.module.css";

function Home() {
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
    const filtered = events.filter((event) => new Date(event.date) >= new Date(date));
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await getUpcomingEvents();
      setEvents(data);
      setFilteredEvents(data);
    }
    fetchEvents();
  }, []);


  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,gap: "2rem",width: "90%",margin: ".5rem auto"}}>
      <div>

      <h2 className={classes.eventHeading}>Upcoming Events</h2>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}> 
          <div>
            <label htmlFor="category">Category: </label>
            <select
              name="category"
              id="category"
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="concert">Concert</option>
              <option value="sport">Sport</option>
              <option value="theater">Theater</option>
              <option value="music">Music</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
    </div>
      {filteredEvents.length > 0 ? (
        <ul className={classes.events}>
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>No Events Available</p>
      )}
    </>
  );
}

export default Home;
