import axios from "axios";

const darkComicsApi = axios.create({
  baseURL: "/api",
});

export default darkComicsApi;
