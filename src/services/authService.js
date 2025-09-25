import apiClient from "./api";

const authService = {
  // ######## signup
  signup: (credential) => {
    return apiClient.post(`/auth/signup`, credential);
  },
  // ######## login
  login: (credential) => {
    return apiClient.post(`/auth/login`, credential);
  },
  loginWithGoogle: (credential) => {
    return apiClient.post(`/auth/login/google`, credential);
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
