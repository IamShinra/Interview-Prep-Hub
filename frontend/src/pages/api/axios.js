import axios from 'axios';

const instance = axios.create({
  baseURL: "https://interview-prep-hub-backend.vercel.app/",
});

export default instance;