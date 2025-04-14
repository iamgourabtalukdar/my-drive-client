const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ########################## FOLDER #########################
// #### GET FOLDER CONTENT
export const fetchFolderData = async (folderId) => {
  const response = await fetch(`${API_BASE}/folder/${folderId}`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

// #### CREATE NEW FOLDER
export const createFolder = async (folderName, folderId) => {
  const response = await fetch(`${API_BASE}/folder`, {
    method: "POST",
    body: JSON.stringify({ name: folderName }),
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "Parent-Folder-Id": folderId,
    },
  });

  return response.json();
};

// #### RENAME FOLDER
export const renameFolder = async (folderId, folderName) => {
  const response = await fetch(`${API_BASE}/folder/${folderId}`, {
    method: "PATCH",
    body: JSON.stringify({ newName: folderName }),
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  return response.json();
};

// ########################## FILE #########################
// #### UPLOAD FILES
export const uploadFiles = async (files, folderId = "") => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file.file));

  if (folderId) formData.append("folderId", folderId);

  const response = await fetch(`${API_BASE}/file/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
    headers: {
      "File-Count": files.length,
      "Parent-Folder-Id": folderId,
    },
  });

  return response.json();
};

// #### RENAME FILE
export const renameFile = async (fileId, fileName) => {
  const response = await fetch(`${API_BASE}/file/${fileId}`, {
    method: "PATCH",
    body: JSON.stringify({ newName: fileName }),
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  return response.json();
};

// #### GET RECENT FILES
export const fetchRecentFiles = async () => {
  const response = await fetch(`${API_BASE}/file/recent`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

// ########################## TRASH #########################

// #### GET TRASH CONTENT
export const fetchTrashData = async () => {
  const response = await fetch(`${API_BASE}/trash`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

// #### MOVE TO TRASH
export const moveToTrash = async (type, id) => {
  const response = await fetch(`${API_BASE}/${type}/${id}/trash`, {
    method: "PATCH",
    credentials: "include",
  });
  return response.json();
};

// #### RESTORE FROM TRASH
export const restoreFromTrash = async (type, id) => {
  const response = await fetch(`${API_BASE}/${type}/${id}/restore`, {
    method: "PATCH",
    credentials: "include",
  });
  return response.json();
};

// #### DELETE PERMANENTLY FROM TRASH
export const deletePermanently = async (type, id) => {
  const response = await fetch(`${API_BASE}/${type}/${id}/trash`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};
