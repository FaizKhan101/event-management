// frontend/src/api.js
import axios from "axios";

export const domain = "http://localhost:3000"; // Update this with your deployed backend URL

// export const domain = "https://event-management-iapa.onrender.com"

const API_URL = domain + "/api";


export const registerUser = async (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);

export const loginUser = async (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);

export const guestUser = async (userData) =>
  axios.post(`${API_URL}/auth/guest`, userData);

export const getEvents = async () => axios.get(`${API_URL}/events`);

export const getEventById = async (id) => axios.get(`${API_URL}/events/${id}`);

export const createEvent  = async (eventData, token) => 
  axios.post(`${API_URL}/events`, eventData, { 
      headers: { "Authorization": token, "Content-Type": "multipart/form-data" } 
  });

export const attendEvent = async (id, token) =>
  axios.post(
    `${API_URL}/events/${id}/attend`,
    {},
    { headers: { Authorization: token } }
  );
