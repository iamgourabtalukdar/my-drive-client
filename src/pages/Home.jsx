import { useEffect } from "react";
import DriveView from "../components/DriveView";
import useFolder from "../hooks/useFolder";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";
import { useNavigate, useOutletContext } from "react-router";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { setOnAddFiles, setOnAddFolder, setOnRefresh, setOnRenameItem } =
    useOutletContext();
  const {
    folderId,
    folders,
    files,
    loading,
    error,
    loadFolder,
    addFolder,
    renameItem,
    addFiles,
    trashItem,
  } = useFolder();
  const { updateStarredItem } = useStarred();

  useEffect(() => {
    setOnAddFiles(() => async (files) => {
      await addFiles(files);
      await loadFolder();
    });
    setOnAddFolder(() => async (folderName) => {
      await addFolder(folderName);
      await loadFolder();
    });

    setOnRenameItem(() => async (type, itemId, newName) => {
      await renameItem(type, itemId, newName);
      await loadFolder();
    });

    setOnRefresh(() => async () => {
      await loadFolder();
    });
  }, []);

  useEffect(() => {
    loadFolder();
  }, [folderId]);

  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadFolder();
  };

  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadFolder();
  };

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
    <DriveView
      folders={folders}
      files={files}
      onTrashItem={onTrashItem}
      onStarredItem={onStarredItem}
    />
  );
};

export default Home;
