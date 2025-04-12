// hooks/useDriveData.js
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export const useDriveData = () => {
  const navigate = useNavigate();
  const params = useParams();
  const folderId = params.folderId || "";
  const [filesFolders, setFilesFolders] = useState({});
  const [trashFilesFolders, setTrashFilesFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
    type: "",
  });
  const [fileFolderModel, setFileFolderModel] = useState({ isVisible: false });

  // ########################## FOLDER #########################
  // #### GET FOLDER CONTENT
  const fetchFolderData = async () => {
    try {
      setLoading(true);
      const endpoint = `${
        import.meta.env.VITE_API_BASE_URL
      }/folder/${folderId}`;

      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message);
      }
      setFilesFolders(data);
    } catch (error) {
      setError(error.message);
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  // #### CREATE NEW FOLDER
  const createNewFolder = async (folderName) => {
    try {
      setError("");
      setLoading(true);
      // Validation
      if (!folderName.trim()) {
        throw new Error("Name cannot be empty");
      }

      if (fileFolderModel.type === "folder" && folderName.length > 30) {
        throw new Error("Name cannot exceed 30 characters");
      }
      // if (fileFolderModel.type === "file" && folderName.length > 50) {
      //   setError("Name cannot exceed 50 characters");
      //   return;
      // }

      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/folder`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ name: folderName }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "Parent-Folder-Id": folderId,
        },
      });

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors?.message || "Creation failed");
      }
      // Success case
      fetchFolderData();
    } finally {
      setLoading(false);
    }
  };

  // #### RENAME FOLDER
  const renameFolder = async (folderName) => {
    try {
      setError("");
      setLoading(true);
      // Validation
      if (!folderName.trim()) {
        throw new Error("Folder Name cannot be empty");
      }

      if (fileFolderModel.type === "folder" && folderName.length > 30) {
        throw new Error("Folder Name cannot exceed 30 characters");
      }

      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/folder/${
        fileFolderModel.item.id
      }`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        body: JSON.stringify({ newName: folderName }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors?.message || "Rename failed");
      }
      // Success case
      fetchFolderData();
    } finally {
      setLoading(false);
    }
  };

  // ########################## FILE #########################
  // #### UPLOAD FILES
  const handleFilesUpload = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file.file);
      });

      if (folderId) {
        formData.append("folderId", folderId);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/file/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
          headers: {
            "File-Count": files.length,
            "Parent-Folder-Id": folderId,
          },
        }
      );

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message || "Upload failed");
      }
      fetchFolderData();
    } catch (error) {
      setError(error.message);
    }
  };

  // #### RENAME FILE
  const renameFile = async (fileName) => {
    try {
      setError("");
      setLoading(true);
      // Validation
      if (!fileName.trim()) {
        throw new Error("Folder Name cannot be empty");
      }

      if (fileName.length > 50) {
        throw new Error("Name cannot exceed 50 characters");
      }

      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/file/${
        fileFolderModel.item.id
      }`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        body: JSON.stringify({ newName: fileName }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors?.message || "Rename failed");
      }
      // Success case
      fetchFolderData();
    } finally {
      setLoading(false);
    }
  };

  // ########################## TRASH #########################

  // #### GET TRASH CONTENT
  const fetchTrashData = async () => {
    try {
      setLoading(true);
      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/trash`;
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message);
      } else {
        setTrashFilesFolders(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // #### MOVE TO TRASH
  const handleMoveToTrash = async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/${type}/${id}/trash`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message || `${type} trashed failed`);
      }
      fetchFolderData();
    } catch (error) {
      setError(error.message);
    }
  };

  // #### RESTORE FROM TRASH
  const handleRestoreFromTrash = async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/${type}/${id}/restore`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message || `${type} restore failed`);
      }
      fetchTrashData();
    } catch (error) {
      setError(error.message);
    }
  };

  // #### RESTORE FROM TRASH
  const handleDeleteFromTrash = async (type, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/${type}/${id}/trash`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!data.status) {
        throw new Error(data.errors.message || `${type} Deletion failed`);
      }

      await fetchTrashData();
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    folderId,
    filesFolders,
    trashFilesFolders,
    selectedFile,
    loading,
    setLoading,
    error,
    setError,
    contextMenu,
    fileFolderModel,
    setFileFolderModel,
    setContextMenu,
    setSelectedFile,
    fetchFolderData,
    createNewFolder,
    renameFolder,
    fetchTrashData,
    handleMoveToTrash,
    handleFilesUpload,
    renameFile,
    handleRestoreFromTrash,
    handleDeleteFromTrash,
  };
};
