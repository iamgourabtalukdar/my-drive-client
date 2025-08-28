import apiClient from "./api";

const authService = {
  // ######## login
  login: (credentials) => {
    return apiClient.post(`/auth/login`, credentials);
  },
  verifyLogin: () => {
    return apiClient.get(`/auth/verify`);
  },
  // ######## login
  logout: () => {
    return apiClient.post(`/auth/logout`);
  },
};

export default authService;
