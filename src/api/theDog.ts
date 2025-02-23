import axios from "axios";

export const theDogApi = axios.create({
  baseURL: import.meta.env.VITE_THE_DOG_API,
  headers: {
    "x-api-key": import.meta.env.VITE_THE_DOG_API_KEY,
  },
});
