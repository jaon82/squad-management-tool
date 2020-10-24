import axios from "axios";

const api = axios.create({
  baseURL: "https://v2.api-football.com",
});

api.interceptors.request.use(async (config) => {
  const token = "65547dc076559eaef6b53cdaec5f3241";
  if (token) {
    config.headers["X-RapidAPI-Key"] = `${token}`;
  }
  return config;
});
export default api;
