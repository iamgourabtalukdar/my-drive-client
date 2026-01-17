import axiosClient from "./axios";

export const getTrashContents = () => {
  return axiosClient.get(`/trash`);
};
