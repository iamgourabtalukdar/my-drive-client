import axiosClient from "./axios";

export const register = (data) => {
  return axiosClient.post(`/auth/register`, data);
};

export const login = (data) => {
  return axiosClient.post(`/auth/login`, data);
};

export const loginWithGoogle = (data) => {
  return axiosClient.post(`/auth/login/google`, data);
};

export const me = () => {
  return axiosClient.get(`/auth/me`);
};

export const logout = () => {
  return axiosClient.post(`/auth/logout`);
};
