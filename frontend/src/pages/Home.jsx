// frontend/src/pages/Home.js
import { useEffect, useState } from "react";
import { getEvents } from "../api";
import EventCard from "../components/EventCard";

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
        <div>
            <h2>Upcoming Events</h2>
            <div>
                {events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default Home;
