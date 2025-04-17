import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import RecentViewTable from "../components/RecentViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import useFolder from "../hooks/useFolder";
import useRecent from "../hooks/useRecent";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";

const Recent = () => {
  const { recentFiles, loading, error, loadRecent } = useRecent();
  const { addFolder, renameItem, addFiles, trashItem } = useFolder();
  const { updateStarredItem } = useStarred();

  const onAddFiles = async (files) => {
    await addFiles(files);
    await loadRecent();
  };

  const onRenameItem = async (type, itemId, newName) => {
    await renameItem(type, itemId, newName);
    await loadRecent();
  };
  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadRecent();
  };

  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadRecent();
  };

  const onRefresh = async () => {
    await loadRecent();
  };

  useEffect(() => {
    loadRecent();
  }, []);
  // Handle loading state
  if (loading) {
    return (
      <DriveProvider>
        <DriveLayout>
          <SpinLoader classes="mt-16" />
        </DriveLayout>
      </DriveProvider>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DriveProvider>
        <DriveLayout>
          <p>{error}</p>
        </DriveLayout>
      </DriveProvider>
    );
  }

  // Render table with folders and files
  return (
    <DriveProvider>
      <DriveLayout
        onAddFolder={addFolder}
        onAddFiles={onAddFiles}
        onRenameItem={onRenameItem}
        onRefresh={onRefresh}
      >
        <RecentViewTable
          recentFiles={recentFiles}
          onTrashItem={onTrashItem}
          onStarredItem={onStarredItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Recent;
