# Project Overview

This project is a web application built using Node.js, Express, and MongoDB. It provides a backend server that handles authentication, event management, and real-time updates using WebSockets.

## Features

- **Authentication**: Secure user authentication using JWT.
- **Event Management**: Create, update, and manage events.
- **Real-time Updates**: Real-time updates for event attendees using WebSockets.
- **Database**: MongoDB for data storage.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing application data.
- **Socket.io**: Library for real-time web applications.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a .env file.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance running (local or cloud-based).

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tz1123/event-management.git
    ```
2. Navigate to the project directory:
    ```sh
    cd project-name
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    PORT=5000
    ```

### Running the Application

1. Start the server:
    ```sh
    npm start
    ```
2. The server will be running on `http://localhost:5000`.

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.
- `GET /api/events`: Get all events.
- `POST /api/events`: Create a new event.
- `PUT /api/events/:id`: Update an event.
- `DELETE /api/events/:id`: Delete an event.

## WebSocket Events

- `joinEvent`: Join a specific event room.
- `updateAttendees`: Notify all clients in the event room to refresh the attendees list.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Live URL

You can access the live version of the frontend application at the following URL:
[Event Management Frontend](https://event-management-weld-psi.vercel.app/)
