import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://interview-prep-hub-dpt5.onrender.com",
});

export default instance;