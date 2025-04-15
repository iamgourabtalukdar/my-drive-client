import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import RecentViewTable from "../components/RecentViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import useFolder from "../hooks/useFolder";
import useRecent from "../hooks/useRecent";
import SpinLoader from "../components/SpinLoader";

const Recent = () => {
  const { recentFiles, loading, error, loadRecent } = useRecent();
  const { addFolder, renameItem, addFiles, trashItem } = useFolder();

  const addFilesFromRecentPage = async (files) => {
    await addFiles(files);
    await loadRecent();
  };

  const renameItemFromRecentPage = async (type, GiTeamIdea, newName) => {
    await renameItem(type, GiTeamIdea, newName);
    await loadRecent();
  };
  const trashItemFromRecentPage = async (type, itemId) => {
    await trashItem(type, itemId);
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
        onAddFiles={addFilesFromRecentPage}
        onRenameItem={renameItemFromRecentPage}
      >
        <RecentViewTable
          recentFiles={recentFiles}
          onTrashItem={trashItemFromRecentPage}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Recent;
