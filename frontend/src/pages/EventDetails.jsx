// frontend/src/pages/EventDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById, attendEvent } from "../api";

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchEvent() {
            const { data } = await getEventById(id);
            setEvent(data);
        }
        fetchEvent();
    }, [id]);

    const handleAttend = async () => {
        await attendEvent(id, token);
        alert("You have joined the event!");
    };

    return event ? (
        <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
            <button onClick={handleAttend}>Join Event</button>
        </div>
    ) : <p>Loading...</p>;
}

export default EventDetails;
