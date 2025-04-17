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

  const onAddFiles = async (files) => {
    await addFiles(files);
    await loadStarred();
  };

  const onRenameItem = async (type, GiTeamIdea, newName) => {
    await renameItem(type, GiTeamIdea, newName);
    await loadStarred();
  };
  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadStarred();
  };
  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadStarred();
  };

  const onRefresh = async () => {
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
        onAddFiles={onAddFiles}
        onRenameItem={onRenameItem}
        onRefresh={onRefresh}
      >
        <DriveViewTable
          folders={starredFolders}
          files={starredFiles}
          onTrashItem={onTrashItem}
          onStarredItem={onStarredItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Starred;
