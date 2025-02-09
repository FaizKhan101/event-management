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
      <h2 className={classes.eventHeading}>Upcoming Events</h2>
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
