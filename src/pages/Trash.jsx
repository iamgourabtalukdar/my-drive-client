import { useEffect } from "react";
import TrashView from "../components/TrashView";
import useTrash from "../hooks/useTrash";
import useFolder from "../hooks/useFolder";
import SpinLoader from "../components/SpinLoader";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";

const Trash = () => {
  const navigate = useNavigate();
  const { setOnAddFiles, setOnAddFolder, setOnRefresh } = useOutletContext();
  const { files, folders, loading, error, loadTrash, restoreItem, deleteItem } =
    useTrash();
  const { addFolder, addFiles } = useFolder();

  useEffect(() => {
    setOnAddFiles(() => async (files) => {
      await addFiles(files);
    });
    setOnAddFolder(() => async (folderName) => {
      await addFolder(folderName);
    });
    setOnRefresh(() => async () => {
      await loadTrash();
    });
  }, []);

  const onRestoreItem = async (type, itemId, newName) => {
    await restoreItem(type, itemId, newName);
    await loadTrash();
  };

  const onDeleteItem = async (type, id) => {
    await deleteItem(type, id);
    await loadTrash();
  };

  useEffect(() => {
    loadTrash();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/signin");
      toast.error(error);
    }
  }, [error]);

  // Handle loading state
  if (loading) {
    return <SpinLoader classes="mt-16" />;
  }

  // Render table with folders and files
  return (
    <TrashView
      files={files}
      folders={folders}
      onRestoreItem={onRestoreItem}
      onDeleteItem={onDeleteItem}
    />
  );
};

export default Trash;
