import { useEffect } from "react";
import DriveView from "../components/DriveView";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";
import useFolder from "../hooks/useFolder";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";

const Starred = () => {
  const navigate = useNavigate();
  const {
    starredFiles,
    starredFolders,
    loading,
    error,
    loadStarred,
    updateStarredItem,
  } = useStarred();

  const { addFolder, renameItem, addFiles, trashItem } = useFolder();
  const { setOnAddFiles, setOnAddFolder, setOnRefresh, setOnRenameItem } =
    useOutletContext();

  useEffect(() => {
    setOnAddFiles(() => async (files) => {
      await addFiles(files);
      await loadStarred();
    });
    setOnAddFolder(() => async (folderName) => {
      await addFolder(folderName);
      await loadStarred();
    });

    setOnRenameItem(() => async (type, itemId, newName) => {
      await renameItem(type, itemId, newName);
      await loadStarred();
    });

    setOnRefresh(() => async () => {
      await loadStarred();
    });
  }, []);

  useEffect(() => {
    loadStarred();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/signin");
      toast.error(error);
    }
  }, [error]);

  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadStarred();
  };
  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadStarred();
  };

  // Handle loading state
  if (loading) {
    return <SpinLoader classes="mt-16" />;
  }

  // Render table with folders and files
  return (
    <DriveView
      folders={starredFolders}
      files={starredFiles}
      onTrashItem={onTrashItem}
      onStarredItem={onStarredItem}
    />
  );
};

export default Starred;
