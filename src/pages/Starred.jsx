import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import DriveViewTable from "../components/DriveViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";
import useFolder from "../hooks/useFolder";

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

  const addFilesFromStarredPage = async (files) => {
    await addFiles(files);
    await loadStarred();
  };

  const renameItemFromStarredPage = async (type, GiTeamIdea, newName) => {
    await renameItem(type, GiTeamIdea, newName);
    await loadStarred();
  };
  const trashItemFromStarredPage = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadStarred();
  };
  const starItemFromStarredPage = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadStarred();
  };

  useEffect(() => {
    loadStarred();
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
        onAddFiles={addFilesFromStarredPage}
        onRenameItem={renameItemFromStarredPage}
      >
        <DriveViewTable
          folders={starredFolders}
          files={starredFiles}
          onTrashItem={trashItemFromStarredPage}
          onStarredItem={starItemFromStarredPage}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Starred;
