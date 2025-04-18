import { useEffect } from "react";
import DriveView from "../components/DriveView";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";
import useFolder from "../hooks/useFolder";
import { useOutletContext } from "react-router";

const Starred = () => {
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

  // Handle error state
  if (error) {
    return <p>{error}</p>;
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
