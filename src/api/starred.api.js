import axiosClient from "./axios";

export const getStarredContents = () => {
  return axiosClient.get(`/starred`);
};
