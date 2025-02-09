// backend/controllers/eventController.js
const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, location } = req.body;
        const imageUrl = req.file ? req.file.path : ""; // Get image URL from Cloudinary
        console.log({date});
        
        const newEvent = new Event({
            name,
            description,
            date: new Date(date),
            location,
            image: imageUrl,
            createdBy: req.user.id
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Single Event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.createdBy.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });

        const { name, description, date, location } = req.body;
        event.name = name || event.name;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.createdBy.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });

        await event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addAttendee = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (!event.attendees.includes(req.user.id)) {
            event.attendees.push(req.user.id);
            await event.save();

            // Notify all clients about the update
            // req.io.emit("refreshAttendees");
        }

        res.json(event);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
