import { useEffect } from "react";
import RecentViewTable from "../components/RecentViewTable";
import useFolder from "../hooks/useFolder";
import useRecent from "../hooks/useRecent";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";
import { useOutletContext } from "react-router";

const Recent = () => {
  const { recentFiles, loading, error, loadRecent } = useRecent();
  const { addFolder, renameItem, addFiles, trashItem } = useFolder();
  const { updateStarredItem } = useStarred();
  const { setOnAddFiles, setOnAddFolder, setOnRefresh, setOnRenameItem } =
    useOutletContext();

  useEffect(() => {
    setOnAddFiles(() => async (files) => {
      await addFiles(files);
      await loadRecent();
    });
    setOnAddFolder(() => async (folderName) => {
      await addFolder(folderName);
    });
    setOnRenameItem(() => async (type, itemId, newName) => {
      await renameItem(type, itemId, newName);
      await loadRecent();
    });
    setOnRefresh(() => async () => {
      await loadRecent();
    });
  }, []);

  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadRecent();
  };

  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadRecent();
  };

  useEffect(() => {
    loadRecent();
  }, []);
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
    <RecentViewTable
      recentFiles={recentFiles}
      onTrashItem={onTrashItem}
      onStarredItem={onStarredItem}
    />
  );
};

export default Recent;
