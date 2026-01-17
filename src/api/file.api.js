import axiosClient from "./axios";

export const getFile = (fileId) => {
  return axiosClient.get(`/files/${fileId}`);
};

export const updateFile = (fileId, data) => {
  return axiosClient.patch(`/files/${fileId}`, data);
};

export const uploadInitiate = (data) => {
  return axiosClient.post(`/files/upload/initiate`, data);
};

export const uploadComplete = (data) => {
  return axiosClient.post(`/files/upload/complete`, data);
};

export const deleteFile = (fileId) => {
  return axiosClient.delete(`/files/${fileId}`);
};
