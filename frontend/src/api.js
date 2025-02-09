// frontend/src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Update this with your deployed backend URL

export const registerUser = async (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);


export const loginUser = async (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);

export const guestLogin = async (userData) =>
  axios.post(`${API_URL}/auth/guest-login`, userData);

export const getEvents = async () => axios.get(`${API_URL}/events`);

export const getEventById = async (id) => axios.get(`${API_URL}/events/${id}`);

export const createEvent = async (eventData, token) =>
  axios.post(`${API_URL}/events`, eventData, {
    headers: { Authorization: token },
  });
export const attendEvent = async (id, token) =>
  axios.post(
    `${API_URL}/events/${id}/attend`,
    {},
    { headers: { Authorization: token } }
  );
