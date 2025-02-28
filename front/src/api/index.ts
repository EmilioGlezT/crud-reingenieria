import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

