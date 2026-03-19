import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/searches"
});

export const createSearch = (query) => API.post("/", { query });
export const getSearchHistory = () => API.get("/");