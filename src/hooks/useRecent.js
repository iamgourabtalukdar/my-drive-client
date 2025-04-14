// src/hooks/useFolder.js
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { fetchRecentFiles } from "../api/driveApi";

const useRecent = () => {
  const params = useParams();
  const folderId = params.folderId || "";

  const [recentFiles, setRecentFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadRecent = async () => {
    try {
      setLoading(true);
      const data = await fetchRecentFiles();

      if (!data.status) throw new Error(data.errors?.message);

      setRecentFiles(data.files || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    folderId,
    recentFiles,
    loading,
    error,
    selectedItem,
    setSelectedItem,
    loadRecent,
  };
};

export default useRecent;
