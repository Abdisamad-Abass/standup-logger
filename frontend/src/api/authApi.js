import api from "./axios";

export const loginUser = (data) => api.post("/auth/login", data);

export const createUser = (data) => api.post("/auth/create-user", data);

export const getMemberCount = () => api.get("/auth/member-count");
