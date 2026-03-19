import axios from "axios";

const API = axios.create({
  baseURL: "https://louder-assignment-50dq.onrender.com/api/searches"
});

export const createSearch = (query) => API.post("/", { query });
export const getSearchHistory = () => API.get("/");