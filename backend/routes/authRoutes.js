// backend/routes/authRoutes.js
const express = require('express');
const { register, login, guestLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/guest", guestLogin); // Add Guest Login Route

module.exports = router;
