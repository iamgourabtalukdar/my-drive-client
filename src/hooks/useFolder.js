// src/hooks/useFolder.js
import { useState } from "react";
import { useParams } from "react-router";
import {
  fetchFolderData,
  createFolder,
  renameFolder,
  renameFile,
  moveToTrash,
  uploadFiles,
} from "../api/driveApi";

const useFolder = () => {
  const params = useParams();
  const folderId = params.folderId || "";

  const [folderContent, setFolderContent] = useState({
    folders: [],
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadFolder = async () => {
    try {
      setLoading(true);
      const data = await fetchFolderData(folderId);

      if (!data.status) throw new Error(data.errors?.message);
      setFolderContent({
        folders: data.folders || [],
        files: data.files || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFolder = async (folderName) => {
    try {
      setLoading(true);
      const data = await createFolder(folderName, folderId);
      if (!data.status) throw new Error(data.errors?.message);
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to let the calling component handle it
    } finally {
      setLoading(false);
    }
  };

  const renameItem = async (type, itemId, newName) => {
    try {
      setLoading(true);
      const renameFn = type === "folder" ? renameFolder : renameFile;
      const data = await renameFn(itemId, newName);
      if (!data.status) throw new Error(data.errors?.message);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addFiles = async (files) => {
    try {
      setLoading(true);
      const data = await uploadFiles(files, folderId);
      if (!data.status) throw new Error(data.errors?.message);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const trashItem = async (type, itemId) => {
    try {
      setLoading(true);
      const data = await moveToTrash(type, itemId);
      if (!data.status) throw new Error(data.errors?.message);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    folderId,
    folders: folderContent.folders,
    files: folderContent.files,
    loading,
    error,
    selectedItem,
    setSelectedItem,
    loadFolder,
    addFolder,
    renameItem,
    addFiles,
    trashItem,
  };
};

export default useFolder;
