// src/hooks/useTrash.js
import { useState } from "react";
import {
  fetchTrashData,
  restoreFromTrash,
  deletePermanently,
} from "../api/driveApi";

const useTrash = () => {
  const [trashItems, setTrashItems] = useState({ files: [], folders: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTrash = async () => {
    try {
      setLoading(true);
      const data = await fetchTrashData();
      if (!data.status) throw new Error(data.errors?.message);
      setTrashItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const restoreItem = async (type, id) => {
    try {
      setLoading(true);
      const data = await restoreFromTrash(type, id);
      if (!data.status) throw new Error(data.errors?.message);
      await loadTrash();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (type, id) => {
    try {
      setLoading(true);
      const data = await deletePermanently(type, id);
      if (!data.status) throw new Error(data.errors?.message);
      await loadTrash();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    files: trashItems.files,
    folders: trashItems.folders,
    loading,
    error,
    loadTrash,
    restoreItem,
    deleteItem,
  };
};

export default useTrash;
