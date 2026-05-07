import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

export const sendContactForm = (data: ContactFormPayload) =>
  API.post("/api/send-email", data); // ✅ FIXED

export default API;