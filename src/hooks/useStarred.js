// src/hooks/useFolder.js
import { useState } from "react";
import { useParams } from "react-router";
import { fetchStarredItems, starredItem } from "../api/driveApi";

const useStarred = () => {
  const params = useParams();
  const folderId = params.folderId || "";

  const [starredItems, setStarredItems] = useState({
    folders: [],
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadStarred = async () => {
    try {
      setLoading(true);
      const data = await fetchStarredItems();

      if (!data.status) throw new Error(data.errors?.message);

      setStarredItems({
        folders: data.folders || [],
        files: data.files || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStarredItem = async (type, itemId, isStarred) => {
    try {
      setLoading(true);
      const data = await starredItem(type, itemId, isStarred);
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
    starredFiles: starredItems.files,
    starredFolders: starredItems.folders,
    loading,
    error,
    selectedItem,
    setSelectedItem,
    loadStarred,
    updateStarredItem,
  };
};

export default useStarred;
