import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://interview-prep-hub-dpt5.onrender.com",
});

console.log("Axios Base URL:", instance.defaults.baseURL);

export default instance;