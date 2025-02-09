// frontend/src/pages/Home.js
import { useEffect, useState } from "react";
import { getEvents } from "../api";
import EventCard from "../components/EventCard";
import classes from "./Home.module.css";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await getEvents();
      setEvents(data);
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
      {events.length > 0 ? (
        <ul className={classes.events}>
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </>
  );
}

export default Home;
