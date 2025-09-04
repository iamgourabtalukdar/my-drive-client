import apiClient from "./api";

const driveService = {
  // ######## folder
  getFolderContents: (id, query) => {
    return apiClient.get(`/folder/${id}`, query);
  },
  createFolder: (body) => {
    return apiClient.post(`/folder`, body);
  },

  // ######## file
  uploadFiles: (files) => {
    return apiClient.post(`/file/upload`, files, true);
  },

  //common
  renameItem: (type, id, body) => {
    return apiClient.patch(`/${type}/${id}`, body);
  },
  starItem: (type, id, body) => {
    return apiClient.patch(`/${type}/${id}/starred`, body);
  },
  removeItem: (type, id) => {
    return apiClient.patch(`/${type}/${id}/trash`);
  },
};

export default driveService;
