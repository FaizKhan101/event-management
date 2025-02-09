// backend/server.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.http_code || 500).json({message: err.message || "Server error"});
});

// WebSocket Logic
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
  });
  socket.on("updateAttendees", (eventId) => {    
    io.emit("refreshAttendees");
  });
});

// Database Connection
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
