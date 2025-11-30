import apiClient from "./api";

// ######## folder
export const getFolderContents = (id, query) => {
  return apiClient.get(`/folder/${id}`, query);
};
export const createFolder = (body) => {
  return apiClient.post(`/folder`, body);
};

// ######## file
export const uploadFiles = (files) => {
  return apiClient.post(`/file/upload`, files, true);
};
export const uploadInitiate = (fileData) => {
  return apiClient.post(`/file/upload/initiate`, fileData);
};

export const uploadComplete = (fileData) => {
  return apiClient.post(`/file/upload/complete`, fileData);
};

// ######## common
export const renameItem = (type, id, body) => {
  return apiClient.patch(`/${type}/${id}`, body);
};

export const starItem = (type, id, body) => {
  return apiClient.patch(`/${type}/${id}/starred`, body);
};

export const removeItem = (type, id) => {
  return apiClient.patch(`/${type}/${id}/trash`);
};

// ######## trash
export const getTrashContents = (query) => {
  return apiClient.get(`/trash`, query);
};

export const restoreItem = (type, id) => {
  return apiClient.patch(`/trash/${type}/${id}`);
};

export const deleteItemForever = (type, id) => {
  return apiClient.delete(`/trash/${type}/${id}`);
};

// ######## starred
export const getStarredContents = (query) => {
  return apiClient.get(`/starred`, query);
};
