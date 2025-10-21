import apiClient from "./api";

export const signup = (credential) => {
  return apiClient.post(`/auth/signup`, credential);
};

export const login = (credential) => {
  return apiClient.post(`/auth/login`, credential);
};
export const loginWithGoogle = (credential) => {
  return apiClient.post(`/auth/login/google`, credential);
};
export const verifyLogin = () => {
  return apiClient.get(`/auth/verify`);
};
export const logout = () => {
  return apiClient.post(`/auth/logout`);
};
