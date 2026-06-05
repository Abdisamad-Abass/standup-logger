import api from "./axios";

export const getStandups = () => api.get("/standups/");

export const createStandup = (data) =>
  api.post("/standups/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getStats = () => api.get("/standups/stats/");
