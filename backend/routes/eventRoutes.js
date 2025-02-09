// backend/routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent, addAttendee } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);
router.post('/:id/attend', authMiddleware, addAttendee);

module.exports = router;
    