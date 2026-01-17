import axiosClient from "./axios";

export const getFolderContents = (folderId = "") => {
  return axiosClient.get(`/folders/${folderId}`);
};

export const createFolder = (data) => {
  return axiosClient.post(`/folders`, data);
};
export const updateFolder = (folderId, data) => {
  return axiosClient.patch(`/folders/${folderId}`, data);
};

export const deleteFolder = (folderId) => {
  return axiosClient.delete(`/folders/${folderId}`);
};
